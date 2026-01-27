import { describe, it, expect } from 'vitest';
import { 
  isLicenseActiveNow, 
  isSubscriptionTier, 
  getBillingAuthority,
  type License 
} from '@/lib/licensing/billing-authority';

describe('billing-authority', () => {
  const now = new Date('2026-01-27T12:00:00Z');
  const future = new Date('2026-02-15T12:00:00Z');
  const past = new Date('2026-01-01T12:00:00Z');

  describe('isSubscriptionTier', () => {
    it('returns true for subscription tiers', () => {
      expect(isSubscriptionTier('managed_monthly')).toBe(true);
      expect(isSubscriptionTier('managed_annual')).toBe(true);
      expect(isSubscriptionTier('pro_monthly')).toBe(true);
    });

    it('returns false for DB tiers', () => {
      expect(isSubscriptionTier('trial')).toBe(false);
      expect(isSubscriptionTier('lifetime')).toBe(false);
      expect(isSubscriptionTier('basic')).toBe(false);
    });

    it('returns false for null/undefined', () => {
      expect(isSubscriptionTier(null)).toBe(false);
      expect(isSubscriptionTier(undefined)).toBe(false);
    });
  });

  describe('getBillingAuthority', () => {
    it('returns stripe for subscription tiers', () => {
      expect(getBillingAuthority('managed_monthly')).toBe('stripe');
    });

    it('returns database for DB tiers', () => {
      expect(getBillingAuthority('trial')).toBe('database');
      expect(getBillingAuthority('lifetime')).toBe('database');
    });
  });

  describe('isLicenseActiveNow - Trial (DB-authoritative)', () => {
    it('allows trial with future expires_at', () => {
      const license: License = {
        status: 'active',
        tier: 'trial',
        expires_at: future.toISOString(),
        current_period_end: null,
        stripe_subscription_id: null,
      };
      const result = isLicenseActiveNow(license, now);
      expect(result.ok).toBe(true);
      expect(result.reason).toBe('db_active');
      expect(result.authority).toBe('database');
    });

    it('denies trial with past expires_at', () => {
      const license: License = {
        status: 'active',
        tier: 'trial',
        expires_at: past.toISOString(),
        current_period_end: null,
        stripe_subscription_id: null,
      };
      const result = isLicenseActiveNow(license, now);
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('license_expired');
      expect(result.authority).toBe('database');
    });

    it('allows lifetime with no expires_at', () => {
      const license: License = {
        status: 'active',
        tier: 'lifetime',
        expires_at: null,
        current_period_end: null,
        stripe_subscription_id: null,
      };
      const result = isLicenseActiveNow(license, now);
      expect(result.ok).toBe(true);
      expect(result.reason).toBe('db_perpetual');
    });
  });

  describe('isLicenseActiveNow - Subscription (Stripe-authoritative)', () => {
    it('allows subscription with valid data and future cpe', () => {
      const license: License = {
        status: 'active',
        tier: 'managed_monthly',
        expires_at: null,
        current_period_end: future.toISOString(),
        stripe_subscription_id: 'sub_123',
      };
      const result = isLicenseActiveNow(license, now);
      expect(result.ok).toBe(true);
      expect(result.reason).toBe('subscription_active');
      expect(result.authority).toBe('stripe');
    });

    it('denies subscription with missing stripe_subscription_id', () => {
      const license: License = {
        status: 'active',
        tier: 'managed_monthly',
        expires_at: null,
        current_period_end: future.toISOString(),
        stripe_subscription_id: null,
      };
      const result = isLicenseActiveNow(license, now);
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('missing_subscription_id');
    });

    it('denies subscription with missing current_period_end', () => {
      const license: License = {
        status: 'active',
        tier: 'managed_monthly',
        expires_at: null,
        current_period_end: null,
        stripe_subscription_id: 'sub_123',
      };
      const result = isLicenseActiveNow(license, now);
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('missing_current_period_end');
    });

    it('denies subscription with past current_period_end', () => {
      const license: License = {
        status: 'active',
        tier: 'managed_monthly',
        expires_at: null,
        current_period_end: past.toISOString(),
        stripe_subscription_id: 'sub_123',
      };
      const result = isLicenseActiveNow(license, now);
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('subscription_expired');
    });
  });

  describe('isLicenseActiveNow - Status checks', () => {
    it('denies inactive status', () => {
      const license: License = {
        status: 'suspended',
        tier: 'trial',
        expires_at: future.toISOString(),
        current_period_end: null,
        stripe_subscription_id: null,
      };
      const result = isLicenseActiveNow(license, now);
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('status_suspended');
    });

    it('denies null license', () => {
      const result = isLicenseActiveNow(null, now);
      expect(result.ok).toBe(false);
      expect(result.reason).toBe('no_license');
    });
  });
});
