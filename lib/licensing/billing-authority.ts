/**
 * Billing Authority Rules
 * 
 * SINGLE SOURCE OF TRUTH for license access decisions.
 * 
 * Two billing authorities:
 * 1. DB-Authoritative: Access controlled by expires_at (trial, lifetime, one_time)
 * 2. Stripe-Authoritative: Access controlled by current_period_end (subscriptions)
 * 
 * Rule: Subscription tiers MUST have stripe_subscription_id AND current_period_end.
 *       Missing either = DENY (fail closed, not open).
 */

// Explicit set of subscription tiers - add new subscription tiers here
const SUBSCRIPTION_TIERS = new Set([
  'managed_monthly',
  'managed_annual',
  'pro_monthly',
  'pro_annual',
  'professional_monthly',
  'professional_annual',
  'enterprise_monthly',
  'enterprise_annual',
  'org_monthly',
  'org_annual',
  'team_monthly',
  'team_annual',
]);

export type BillingAuthority = 'database' | 'stripe';

export interface License {
  id?: string;
  status: string | null;
  tier: string | null;
  expires_at: string | Date | null;
  current_period_end: string | Date | null;
  stripe_subscription_id: string | null;
  stripe_customer_id?: string | null;
}

export interface AccessResult {
  ok: boolean;
  reason: string;
  authority: BillingAuthority;
  expiresAt: Date | null;
}

/**
 * Check if a tier is subscription-based (Stripe-authoritative)
 */
export function isSubscriptionTier(tier: string | null | undefined): boolean {
  return !!tier && SUBSCRIPTION_TIERS.has(tier);
}

/**
 * Check if a tier is DB-authoritative
 */
export function isDbAuthoritativeTier(tier: string | null | undefined): boolean {
  return !isSubscriptionTier(tier);
}

/**
 * Get billing authority for a tier
 */
export function getBillingAuthority(tier: string | null | undefined): BillingAuthority {
  return isSubscriptionTier(tier) ? 'stripe' : 'database';
}

/**
 * Safely convert to Date, returns null if invalid
 */
function toDate(d: string | Date | null | undefined): Date | null {
  if (!d) return null;
  const dt = d instanceof Date ? d : new Date(d);
  return isNaN(dt.getTime()) ? null : dt;
}

/**
 * CANONICAL LICENSE ACCESS CHECK
 * 
 * This is THE function that decides if a license grants access.
 * All other access checks should delegate to this.
 * 
 * Rules:
 * - status must be 'active'
 * - Subscription tiers: require stripe_subscription_id AND current_period_end > now
 * - DB tiers: require expires_at IS NULL OR expires_at > now
 * - Missing required fields = DENY (fail closed)
 */
export function isLicenseActiveNow(
  license: License | null | undefined,
  now: Date = new Date()
): AccessResult {
  // No license = deny
  if (!license) {
    return { ok: false, reason: 'no_license', authority: 'database', expiresAt: null };
  }

  // Status must be 'active'
  if (license.status !== 'active') {
    return { 
      ok: false, 
      reason: `status_${license.status || 'null'}`, 
      authority: getBillingAuthority(license.tier),
      expiresAt: null,
    };
  }

  const tier = license.tier ?? '';
  const authority = getBillingAuthority(tier);

  if (isSubscriptionTier(tier)) {
    // STRIPE-AUTHORITATIVE: Subscription tiers
    // MUST have stripe_subscription_id
    if (!license.stripe_subscription_id) {
      console.error('[billing-authority] Subscription tier missing stripe_subscription_id', {
        tier,
        licenseId: license.id,
      });
      return { 
        ok: false, 
        reason: 'missing_subscription_id', 
        authority: 'stripe',
        expiresAt: null,
      };
    }

    // MUST have current_period_end
    const cpe = toDate(license.current_period_end);
    if (!cpe) {
      console.error('[billing-authority] Subscription tier missing current_period_end', {
        tier,
        licenseId: license.id,
      });
      return { 
        ok: false, 
        reason: 'missing_current_period_end', 
        authority: 'stripe',
        expiresAt: null,
      };
    }

    // current_period_end must be in the future
    if (cpe <= now) {
      return { 
        ok: false, 
        reason: 'subscription_expired', 
        authority: 'stripe',
        expiresAt: cpe,
      };
    }

    return { 
      ok: true, 
      reason: 'subscription_active', 
      authority: 'stripe',
      expiresAt: cpe,
    };
  }

  // DB-AUTHORITATIVE: Trial, lifetime, one-time, etc.
  const exp = toDate(license.expires_at);
  
  // If expires_at is set, it must be in the future
  if (exp && exp <= now) {
    return { 
      ok: false, 
      reason: 'license_expired', 
      authority: 'database',
      expiresAt: exp,
    };
  }

  // No expiration = perpetual/lifetime
  return { 
    ok: true, 
    reason: exp ? 'db_active' : 'db_perpetual', 
    authority: 'database',
    expiresAt: exp,
  };
}

/**
 * Validate license data integrity
 * Returns warnings for inconsistent data (for monitoring/alerting)
 */
export function validateLicenseIntegrity(license: License): string[] {
  const warnings: string[] = [];
  const tier = license.tier ?? '';

  if (isSubscriptionTier(tier)) {
    if (!license.stripe_subscription_id) {
      warnings.push(`Subscription tier "${tier}" missing stripe_subscription_id`);
    }
    if (!license.current_period_end) {
      warnings.push(`Subscription tier "${tier}" missing current_period_end`);
    }
  } else {
    // DB-authoritative with subscription fields is suspicious but not invalid
    if (license.stripe_subscription_id && !license.expires_at) {
      warnings.push(`DB tier "${tier}" has subscription_id but no expires_at - may grant perpetual access`);
    }
  }

  return warnings;
}

/**
 * Get days remaining for a license
 */
export function getDaysRemaining(license: License, now: Date = new Date()): number | null {
  const result = isLicenseActiveNow(license, now);
  if (!result.expiresAt) return null;
  
  const diffMs = result.expiresAt.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Assert subscription data exists (throws if missing)
 * Use in webhook handlers to catch data issues early
 */
export function assertSubscriptionData(license: License): void {
  if (!isSubscriptionTier(license.tier)) return;

  if (!license.stripe_subscription_id) {
    throw new Error(`Subscription tier "${license.tier}" requires stripe_subscription_id`);
  }
  if (!license.current_period_end) {
    throw new Error(`Subscription tier "${license.tier}" requires current_period_end`);
  }
}

/**
 * Determine which fields Stripe webhooks should update based on tier
 * Prevents Stripe from overwriting DB-authoritative fields
 */
export function getStripeUpdatableFields(
  tier: string | null | undefined,
  stripeData: {
    status?: string;
    current_period_end?: string;
    stripe_subscription_id?: string;
    stripe_customer_id?: string;
  }
): Record<string, unknown> {
  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  // Always safe to update customer_id (informational)
  if (stripeData.stripe_customer_id) {
    updates.stripe_customer_id = stripeData.stripe_customer_id;
  }

  if (isSubscriptionTier(tier)) {
    // Stripe controls lifecycle for subscription tiers
    if (stripeData.status) updates.status = stripeData.status;
    if (stripeData.current_period_end) updates.current_period_end = stripeData.current_period_end;
    if (stripeData.stripe_subscription_id) updates.stripe_subscription_id = stripeData.stripe_subscription_id;
  } else {
    // DB-authoritative: Stripe should NOT update status or expiration
    console.info('[billing-authority] Skipping Stripe lifecycle fields for DB tier', { tier });
  }

  return updates;
}

// Legacy alias for backward compatibility
export function checkLicenseAccess(license: License): AccessResult & { hasAccess: boolean } {
  const result = isLicenseActiveNow(license);
  return {
    ...result,
    hasAccess: result.ok,
  };
}

// Legacy alias
export const getUpdatableFields = getStripeUpdatableFields;
