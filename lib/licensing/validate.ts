import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export interface License {
  id: string;
  organization_id: string;
  status: 'trial' | 'active' | 'past_due' | 'canceled' | 'suspended';
  plan_id: string;
  trial_ends_at: string | null;
  current_period_end: string;
  stripe_subscription_id: string | null;
}

export interface LicenseUsage {
  student_count: number;
  student_limit: number;
  admin_count: number;
  admin_limit: number;
  program_count: number;
  program_limit: number;
}

export interface LicenseValidation {
  valid: boolean;
  license: License | null;
  usage: LicenseUsage | null;
  reason?: string;
  daysRemaining?: number;
  isTrialExpired?: boolean;
  isPastDue?: boolean;
  limitReached?: {
    students?: boolean;
    admins?: boolean;
    programs?: boolean;
  };
}

/**
 * Validate a license by organization ID
 */
export async function validateLicense(organizationId: string): Promise<LicenseValidation> {
  const supabase = await createClient();
  
  if (!supabase) {
    return { valid: false, license: null, usage: null, reason: 'Database unavailable' };
  }

  // Get license
  const { data: license, error: licenseError } = await supabase
    .from('licenses')
    .select('*')
    .eq('organization_id', organizationId)
    .single();

  if (licenseError || !license) {
    return { valid: false, license: null, usage: null, reason: 'No license found' };
  }

  // Get usage
  const { data: usage } = await supabase
    .from('license_usage')
    .select('*')
    .eq('license_id', license.id)
    .single();

  const now = new Date();

  // Check trial expiration
  if (license.status === 'trial' && license.trial_ends_at) {
    const trialEnd = new Date(license.trial_ends_at);
    if (trialEnd < now) {
      return {
        valid: false,
        license,
        usage,
        reason: 'Trial expired',
        isTrialExpired: true,
        daysRemaining: 0,
      };
    }
    const daysRemaining = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return {
      valid: true,
      license,
      usage,
      daysRemaining,
    };
  }

  // Check canceled/suspended
  if (license.status === 'canceled' || license.status === 'suspended') {
    return {
      valid: false,
      license,
      usage,
      reason: `License ${license.status}`,
    };
  }

  // Check past due (allow grace period of 7 days)
  if (license.status === 'past_due') {
    const periodEnd = new Date(license.current_period_end);
    const gracePeriodEnd = new Date(periodEnd.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    if (now > gracePeriodEnd) {
      return {
        valid: false,
        license,
        usage,
        reason: 'Payment overdue - grace period expired',
        isPastDue: true,
      };
    }
    
    // Still in grace period
    return {
      valid: true,
      license,
      usage,
      isPastDue: true,
      reason: 'Payment overdue - please update payment method',
    };
  }

  // Check subscription expiration
  if (license.current_period_end) {
    const periodEnd = new Date(license.current_period_end);
    if (periodEnd < now) {
      return {
        valid: false,
        license,
        usage,
        reason: 'License expired',
      };
    }
    const daysRemaining = Math.ceil((periodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return {
      valid: true,
      license,
      usage,
      daysRemaining,
    };
  }

  return { valid: true, license, usage };
}

/**
 * Check if a specific limit has been reached
 */
export async function checkLicenseLimit(
  organizationId: string,
  limitType: 'students' | 'admins' | 'programs'
): Promise<{ allowed: boolean; current: number; limit: number; reason?: string }> {
  const validation = await validateLicense(organizationId);
  
  if (!validation.valid) {
    return { allowed: false, current: 0, limit: 0, reason: validation.reason };
  }

  if (!validation.usage) {
    return { allowed: true, current: 0, limit: -1 }; // No usage tracking = unlimited
  }

  const countKey = `${limitType.slice(0, -1)}_count` as keyof LicenseUsage;
  const limitKey = `${limitType.slice(0, -1)}_limit` as keyof LicenseUsage;
  
  const current = validation.usage[countKey] as number;
  const limit = validation.usage[limitKey] as number;

  // -1 means unlimited
  if (limit === -1) {
    return { allowed: true, current, limit };
  }

  if (current >= limit) {
    return {
      allowed: false,
      current,
      limit,
      reason: `${limitType} limit reached (${current}/${limit})`,
    };
  }

  return { allowed: true, current, limit };
}

/**
 * Increment usage counter
 */
export async function incrementUsage(
  organizationId: string,
  usageType: 'student' | 'admin' | 'program'
): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;

  // Get license
  const { data: license } = await supabase
    .from('licenses')
    .select('id')
    .eq('organization_id', organizationId)
    .single();

  if (!license) return false;

  const countColumn = `${usageType}_count`;
  
  const { error } = await supabase.rpc('increment_license_usage', {
    p_license_id: license.id,
    p_column: countColumn,
  });

  return !error;
}

/**
 * Decrement usage counter
 */
export async function decrementUsage(
  organizationId: string,
  usageType: 'student' | 'admin' | 'program'
): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;

  // Get license
  const { data: license } = await supabase
    .from('licenses')
    .select('id')
    .eq('organization_id', organizationId)
    .single();

  if (!license) return false;

  const countColumn = `${usageType}_count`;
  
  const { error } = await supabase.rpc('decrement_license_usage', {
    p_license_id: license.id,
    p_column: countColumn,
  });

  return !error;
}

/**
 * Server component helper - validate license and redirect if invalid
 */
export async function requireValidLicense(organizationId: string): Promise<License> {
  const validation = await validateLicense(organizationId);
  
  if (!validation.valid) {
    if (validation.isTrialExpired) {
      redirect('/store/licenses?expired=trial');
    }
    if (validation.isPastDue) {
      redirect('/account/billing?status=past_due');
    }
    redirect('/store/licenses?status=invalid');
  }

  return validation.license!;
}

/**
 * Get license by license key
 */
export async function getLicenseByKey(licenseKey: string): Promise<License | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data: keyRecord } = await supabase
    .from('license_keys')
    .select('license_id, status')
    .eq('key', licenseKey)
    .single();

  if (!keyRecord || keyRecord.status !== 'active') {
    return null;
  }

  const { data: license } = await supabase
    .from('licenses')
    .select('*')
    .eq('id', keyRecord.license_id)
    .single();

  return license;
}
