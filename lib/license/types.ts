/**
 * License Types and Pricing Tiers
 * 
 * Three categories:
 * 1. Self-Serve (Stripe checkout, auto-activation)
 * 2. Professional (Stripe checkout, higher limits)
 * 3. Enterprise (Contact sales, contracts, invoicing)
 */

export type LicenseStatus = 
  | 'trial'      // Active trial period
  | 'active'     // Paid and current
  | 'past_due'   // Payment failed, grace period
  | 'canceled'   // User canceled, access until period end
  | 'suspended'; // Payment failed after grace, locked out

export type PlanId = 
  // Self-Serve Tiers (Stripe checkout)
  | 'starter_monthly'    // $99/month
  | 'starter_annual'     // $899/year
  | 'professional_monthly' // $299/month
  | 'professional_annual'  // $2,499/year
  // Enterprise Tiers (Contact sales)
  | 'implementation'     // $35,000 - $50,000 one-time
  | 'implementation_plus_annual' // $60,000 - $90,000 Year 1
  | 'annual_renewal';    // $15,000 - $30,000/year

export type PlanCategory = 'self_serve' | 'professional' | 'enterprise';

export interface License {
  id: string;
  organizationId: string;
  status: LicenseStatus;
  planId: PlanId;
  
  // Trial tracking
  trialStartedAt: Date | null;
  trialEndsAt: Date | null;
  
  // Stripe integration (for self-serve/professional)
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  
  // Billing period
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  
  // Payment tracking
  lastPaymentStatus: string | null;
  lastInvoiceUrl: string | null;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  canceledAt: Date | null;
  suspendedAt: Date | null;
}

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  domain: string | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type OrganizationType = 
  | 'workforce_board'
  | 'nonprofit'
  | 'training_provider'
  | 'apprenticeship_sponsor'
  | 'government'
  | 'other';

/**
 * Trial configuration
 */
export const TRIAL_DAYS = 14;

/**
 * Grace period after payment failure (days)
 */
export const GRACE_PERIOD_DAYS = 3;

/**
 * Plan definitions
 */
export interface PlanDefinition {
  id: PlanId;
  name: string;
  category: PlanCategory;
  price: number;
  priceDisplay: string;
  interval: 'month' | 'year' | 'one_time';
  stripePriceId?: string;
  trialDays: number;
  features: string[];
  limits: {
    students: number | 'unlimited';
    admins: number | 'unlimited';
    programs: number | 'unlimited';
  };
  bestFor: string[];
  highlighted?: boolean;
  savings?: string;
  requiresContact?: boolean;
}

export const PLANS: Record<PlanId, PlanDefinition> = {
  // ============================================
  // SELF-SERVE TIERS (Small orgs, instant access)
  // ============================================
  starter_monthly: {
    id: 'starter_monthly',
    name: 'Starter',
    category: 'self_serve',
    price: 99,
    priceDisplay: '$99',
    interval: 'month',
    stripePriceId: process.env.STRIPE_PRICE_STARTER_MONTHLY || 'price_1Ss3ZWIRNf5vPH3AuVbnrr9f',
    trialDays: TRIAL_DAYS,
    features: [
      'Up to 100 active students',
      '1 admin user',
      '3 programs',
      'Core LMS features',
      'Email support',
      'Basic reporting',
    ],
    limits: {
      students: 100,
      admins: 1,
      programs: 3,
    },
    bestFor: ['Small training providers', 'Pilot programs', 'Individual instructors'],
  },
  starter_annual: {
    id: 'starter_annual',
    name: 'Starter',
    category: 'self_serve',
    price: 899,
    priceDisplay: '$899',
    interval: 'year',
    stripePriceId: process.env.STRIPE_PRICE_STARTER_ANNUAL || 'price_1Ss3ZbIRNf5vPH3A3uBdM51z',
    trialDays: TRIAL_DAYS,
    savings: 'Save $289',
    features: [
      'Up to 100 active students',
      '1 admin user',
      '3 programs',
      'Core LMS features',
      'Email support',
      'Basic reporting',
    ],
    limits: {
      students: 100,
      admins: 1,
      programs: 3,
    },
    bestFor: ['Small training providers', 'Pilot programs', 'Individual instructors'],
  },

  // ============================================
  // PROFESSIONAL TIERS (Growing orgs)
  // ============================================
  professional_monthly: {
    id: 'professional_monthly',
    name: 'Professional',
    category: 'professional',
    price: 299,
    priceDisplay: '$299',
    interval: 'month',
    stripePriceId: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY || 'price_1Ss3ZnIRNf5vPH3AO9AOYaqR',
    trialDays: TRIAL_DAYS,
    highlighted: true,
    features: [
      'Up to 500 active students',
      '5 admin users',
      'Unlimited programs',
      'All platform features',
      'Priority support',
      'Advanced reporting',
      'API access',
      'Custom branding',
    ],
    limits: {
      students: 500,
      admins: 5,
      programs: 'unlimited',
    },
    bestFor: ['Growing training providers', 'Nonprofits', 'Regional programs'],
  },
  professional_annual: {
    id: 'professional_annual',
    name: 'Professional',
    category: 'professional',
    price: 2499,
    priceDisplay: '$2,499',
    interval: 'year',
    stripePriceId: process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL || 'price_1Ss3ZxIRNf5vPH3AG1bn8tRu',
    trialDays: TRIAL_DAYS,
    highlighted: true,
    savings: 'Save $1,089',
    features: [
      'Up to 500 active students',
      '5 admin users',
      'Unlimited programs',
      'All platform features',
      'Priority support',
      'Advanced reporting',
      'API access',
      'Custom branding',
    ],
    limits: {
      students: 500,
      admins: 5,
      programs: 'unlimited',
    },
    bestFor: ['Growing training providers', 'Nonprofits', 'Regional programs'],
  },

  // ============================================
  // ENTERPRISE TIERS (Large orgs, contact sales)
  // ============================================
  implementation: {
    id: 'implementation',
    name: 'Implementation License',
    category: 'enterprise',
    price: 35000,
    priceDisplay: '$35,000 – $50,000',
    interval: 'one_time',
    trialDays: 0,
    requiresContact: true,
    features: [
      'Licensed deployment of the platform',
      'Source code access for your instance',
      'Configuration documentation',
      'Environment setup guidance',
      '30–60 day warranty support',
      'Unlimited students',
      'Unlimited admins',
      'Single-tenant deployment',
    ],
    limits: {
      students: 'unlimited',
      admins: 'unlimited',
      programs: 'unlimited',
    },
    bestFor: ['Workforce boards', 'Training providers', 'Nonprofits'],
  },
  implementation_plus_annual: {
    id: 'implementation_plus_annual',
    name: 'Implementation + Annual Support',
    category: 'enterprise',
    price: 60000,
    priceDisplay: '$60,000 – $90,000',
    interval: 'year',
    trialDays: 0,
    requiresContact: true,
    highlighted: true,
    features: [
      'Everything in Implementation License',
      'Platform updates',
      'Security patches',
      'Compatibility upgrades',
      'Standard support (email/ticket)',
      'Dedicated onboarding',
      'Quarterly check-ins',
    ],
    limits: {
      students: 'unlimited',
      admins: 'unlimited',
      programs: 'unlimited',
    },
    bestFor: ['Organizations needing ongoing support', 'Multi-year initiatives', 'Government contracts'],
  },
  annual_renewal: {
    id: 'annual_renewal',
    name: 'Annual License Renewal',
    category: 'enterprise',
    price: 15000,
    priceDisplay: '$15,000 – $30,000',
    interval: 'year',
    trialDays: 0,
    requiresContact: true,
    features: [
      'Continued platform updates',
      'Security maintenance',
      'Limited support',
      'Access to new features',
    ],
    limits: {
      students: 'unlimited',
      admins: 'unlimited',
      programs: 'unlimited',
    },
    bestFor: ['Existing licensees'],
  },
};

/**
 * Get plans by category
 */
export function getPlansByCategory(category: PlanCategory): PlanDefinition[] {
  return Object.values(PLANS).filter(plan => plan.category === category);
}

/**
 * Get self-serve plans (can checkout via Stripe)
 */
export function getSelfServePlans(): PlanDefinition[] {
  return Object.values(PLANS).filter(
    plan => plan.category === 'self_serve' || plan.category === 'professional'
  );
}

/**
 * Get enterprise plans (require contact)
 */
export function getEnterprisePlans(): PlanDefinition[] {
  return Object.values(PLANS).filter(plan => plan.category === 'enterprise');
}

/**
 * Check if plan requires contact/sales
 */
export function requiresContact(planId: PlanId): boolean {
  return PLANS[planId]?.requiresContact === true;
}

/**
 * Check if license allows admin actions
 */
export function canPerformAdminActions(status: LicenseStatus): boolean {
  return status === 'trial' || status === 'active' || status === 'past_due';
}

/**
 * Check if license is in good standing
 */
export function isLicenseActive(status: LicenseStatus): boolean {
  return status === 'trial' || status === 'active';
}

/**
 * Get status message for UI
 */
export function getStatusMessage(license: License): string {
  switch (license.status) {
    case 'trial':
      if (license.trialEndsAt) {
        const days = Math.ceil((license.trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        return `Trial: ${days} day${days !== 1 ? 's' : ''} remaining`;
      }
      return 'Trial active';
    case 'active':
      return 'License active';
    case 'past_due':
      return 'Payment past due - please update billing';
    case 'canceled':
      if (license.currentPeriodEnd) {
        return `Canceled - access until ${license.currentPeriodEnd.toLocaleDateString()}`;
      }
      return 'Canceled';
    case 'suspended':
      return 'License suspended - payment required';
    default:
      return 'Unknown status';
  }
}

/**
 * Get banner type for status
 */
export function getStatusBannerType(status: LicenseStatus): 'info' | 'warning' | 'error' | null {
  switch (status) {
    case 'trial': return 'info';
    case 'active': return null;
    case 'past_due': return 'warning';
    case 'canceled': return 'warning';
    case 'suspended': return 'error';
    default: return null;
  }
}
