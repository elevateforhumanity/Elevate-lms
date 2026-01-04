// Store Products Data Model
// This defines what we sell: licensed platform access + deployable apps

export type LicenseType = 'single' | 'school' | 'enterprise';
export type BillingType = 'one_time' | 'subscription';

export interface PlatformApp {
  id: string;
  key: string;
  name: string;
  description: string;
  enabledByDefault: boolean;
  icon?: string;
}

export interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  billingType: BillingType;
  licenseType: LicenseType;
  appsIncluded: string[];
  requiresApproval?: boolean;
  features: string[];
  idealFor: string[];
  stripeProductId?: string;
  stripePriceId?: string;
}

// Platform Apps (Modular Components)
export const PLATFORM_APPS: PlatformApp[] = [
  {
    id: 'lms',
    key: 'lms',
    name: 'Learning Management System',
    description:
      'Courses, SCORM, certifications, progress tracking, quizzes, and assignments.',
    enabledByDefault: true,
    icon: '📚',
  },
  {
    id: 'enrollment',
    key: 'enrollment',
    name: 'Enrollment & Intake',
    description:
      'Applications, approvals, cohort management, and student onboarding.',
    enabledByDefault: true,
    icon: '📝',
  },
  {
    id: 'admin',
    key: 'admin',
    name: 'Admin Dashboard',
    description:
      'User management, reporting, analytics, and system configuration.',
    enabledByDefault: true,
    icon: '⚙️',
  },
  {
    id: 'payments',
    key: 'payments',
    name: 'Payments & Billing',
    description:
      'Stripe integration, invoices, funding sources, and financial tracking.',
    enabledByDefault: true,
    icon: '💳',
  },
  {
    id: 'partner-dashboard',
    key: 'partner-dashboard',
    name: 'Partner Dashboard',
    description:
      'Tools for schools, employers, and workforce partners to manage their programs.',
    enabledByDefault: false,
    icon: '🤝',
  },
  {
    id: 'case-management',
    key: 'case-management',
    name: 'Case Management',
    description:
      'Track barriers, interventions, and wraparound services for learners.',
    enabledByDefault: false,
    icon: '📋',
  },
  {
    id: 'employer-portal',
    key: 'employer-portal',
    name: 'Employer Portal',
    description:
      'Job postings, candidate matching, and hiring pipeline management.',
    enabledByDefault: false,
    icon: '💼',
  },
  {
    id: 'compliance',
    key: 'compliance',
    name: 'Compliance & Reporting',
    description:
      'WIOA, FERPA, and grant reporting with automated data collection.',
    enabledByDefault: false,
    icon: '📊',
  },
  {
    id: 'mobile-app',
    key: 'mobile-app',
    name: 'Mobile PWA',
    description:
      'Progressive web app for iOS and Android with offline support.',
    enabledByDefault: true,
    icon: '📱',
  },
  {
    id: 'ai-tutor',
    key: 'ai-tutor',
    name: 'AI Tutor',
    description:
      'AI-powered tutoring, chat support, and personalized learning assistance.',
    enabledByDefault: false,
    icon: '🤖',
  },
];

// Store Products (What We Sell)
export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'efh-core',
    slug: 'efh-core-platform',
    name: 'EFH Core Workforce Platform',
    description:
      'Full workforce-ready LMS, enrollment, payments, and admin system.',
    longDescription:
      'The complete Elevate For Humanity platform with everything you need to launch and manage workforce training programs. Includes LMS, student enrollment, payment processing, admin dashboard, and mobile app.',
    price: 4999,
    billingType: 'one_time',
    licenseType: 'single',
    appsIncluded: ['lms', 'enrollment', 'admin', 'payments', 'mobile-app'],
    features: [
      'Unlimited students and courses',
      'SCORM and xAPI support',
      'Stripe payment integration',
      'Mobile-responsive design',
      'Progress tracking and certificates',
      'Email notifications',
      'Basic reporting and analytics',
      '1 year of updates and support',
    ],
    idealFor: [
      'Small training providers',
      'Nonprofits starting workforce programs',
      'Individual instructors',
      'Pilot programs',
    ],
    requiresApproval: false,
    stripeProductId: 'prod_efh_core_platform',
    stripePriceId: 'price_efh_core_4999',
  },
  {
    id: 'efh-school-license',
    slug: 'school-license',
    name: 'School / Training Provider License',
    description:
      'White-label license for schools, nonprofits, and workforce providers.',
    longDescription:
      'Full platform access with white-labeling, partner dashboard, case management, and compliance tools. Perfect for schools and training providers serving multiple programs and funding sources.',
    price: 15000,
    billingType: 'one_time',
    licenseType: 'school',
    appsIncluded: [
      'lms',
      'enrollment',
      'admin',
      'payments',
      'partner-dashboard',
      'case-management',
      'compliance',
      'mobile-app',
    ],
    features: [
      'Everything in Core Platform',
      'White-label branding',
      'Partner dashboard for instructors',
      'Case management tools',
      'WIOA and grant compliance reporting',
      'Multi-program management',
      'Advanced analytics',
      'Priority support',
      'Lifetime updates',
    ],
    idealFor: [
      'Community colleges',
      'Workforce development boards',
      'Training providers with WIOA contracts',
      'Nonprofits with multiple programs',
    ],
    requiresApproval: true,
    stripeProductId: 'prod_efh_school_license',
    stripePriceId: 'price_efh_school_15000',
  },
  {
    id: 'efh-enterprise',
    slug: 'enterprise-license',
    name: 'Enterprise Workforce Solution',
    description:
      'Full enterprise deployment with employer portal, AI tutor, and custom integrations.',
    longDescription:
      'The complete workforce ecosystem with employer partnerships, AI-powered learning, custom integrations, and dedicated support. Built for large-scale workforce initiatives.',
    price: 50000,
    billingType: 'one_time',
    licenseType: 'enterprise',
    appsIncluded: [
      'lms',
      'enrollment',
      'admin',
      'payments',
      'partner-dashboard',
      'case-management',
      'employer-portal',
      'compliance',
      'mobile-app',
      'ai-tutor',
    ],
    features: [
      'Everything in School License',
      'Employer portal and job matching',
      'AI tutor and personalized learning',
      'Custom integrations (API access)',
      'Multi-tenant architecture',
      'Dedicated account manager',
      'Custom training and onboarding',
      'SLA with 99.9% uptime',
      'Lifetime updates and priority support',
    ],
    idealFor: [
      'State workforce agencies',
      'Large workforce boards',
      'Multi-state training networks',
      'Enterprise employers with training programs',
    ],
    requiresApproval: true,
    stripeProductId: 'prod_efh_enterprise',
    stripePriceId: 'price_efh_enterprise_50000',
  },
  {
    id: 'efh-monthly',
    slug: 'monthly-subscription',
    name: 'Monthly Subscription',
    description:
      'Pay-as-you-go access to the core platform with monthly billing.',
    longDescription:
      'Get started with no upfront cost. Monthly subscription includes the core platform with LMS, enrollment, and admin tools. Cancel anytime.',
    price: 499,
    billingType: 'subscription',
    licenseType: 'single',
    appsIncluded: ['lms', 'enrollment', 'admin', 'payments', 'mobile-app'],
    features: [
      'All core platform features',
      'Up to 100 active students',
      'Basic support',
      'Monthly updates',
      'Cancel anytime',
    ],
    idealFor: [
      'New training providers testing the platform',
      'Seasonal programs',
      'Small cohorts',
      'Budget-conscious organizations',
    ],
    requiresApproval: false,
    stripeProductId: 'prod_efh_monthly_subscription',
    stripePriceId: 'price_efh_monthly_499',
  },
];

// Community Edition Add-Ons (Monthly subscriptions for license holders)
export const COMMUNITY_ADDONS: StoreProduct[] = [
  {
    id: 'community-basic',
    slug: 'community-basic',
    name: 'Community Edition - Basic',
    description: 'Add community marketplace features to your platform.',
    longDescription:
      'Enable your program owners to create and sell courses, build communities, and engage students. Perfect for training providers who want to offer additional programs.',
    price: 9900, // $99/month
    billingType: 'subscription',
    licenseType: 'single',
    appsIncluded: ['creator-dashboard', 'community-marketplace'],
    features: [
      '1 program owner account',
      'Create unlimited courses',
      'Community marketplace listing',
      'Up to 100 community members',
      'Discussion forums',
      'Basic analytics',
    ],
    idealFor: [
      'Single program owners',
      'Small training providers',
      'Testing community features',
    ],
    requiresApproval: false,
    stripeProductId: 'prod_community_basic',
    stripePriceId: 'price_community_basic_99',
  },
  {
    id: 'community-pro',
    slug: 'community-pro',
    name: 'Community Edition - Pro',
    description: 'Full community platform with multiple program owners.',
    longDescription:
      'Complete community solution for training providers with multiple programs. Includes creator marketplace, shop features, and advanced moderation tools.',
    price: 19900, // $199/month
    billingType: 'subscription',
    licenseType: 'school',
    appsIncluded: [
      'creator-dashboard',
      'delegate-dashboard',
      'shop-dashboard',
      'community-marketplace',
    ],
    features: [
      'Up to 5 program owner accounts',
      'Unlimited courses and products',
      'Community marketplace',
      'Up to 500 community members',
      'Discussion forums with moderation',
      'Shop marketplace',
      'Advanced analytics',
      'Priority support',
    ],
    idealFor: [
      'Multi-program training providers',
      'Community colleges',
      'Workforce boards',
    ],
    requiresApproval: false,
    stripeProductId: 'prod_community_pro',
    stripePriceId: 'price_community_pro_199',
  },
  {
    id: 'community-enterprise',
    slug: 'community-enterprise',
    name: 'Community Edition - Enterprise',
    description: 'Unlimited community features for large organizations.',
    longDescription:
      'Enterprise-grade community platform with unlimited program owners, members, and advanced features. Includes white-label branding and dedicated support.',
    price: 29900, // $299/month
    billingType: 'subscription',
    licenseType: 'enterprise',
    appsIncluded: [
      'creator-dashboard',
      'delegate-dashboard',
      'shop-dashboard',
      'community-marketplace',
      'white-label-community',
    ],
    features: [
      'Unlimited program owners',
      'Unlimited courses and products',
      'Unlimited community members',
      'White-label community branding',
      'Advanced moderation tools',
      'Shop marketplace with revenue sharing',
      'Custom integrations',
      'Dedicated account manager',
      'SLA with 99.9% uptime',
    ],
    idealFor: [
      'State workforce agencies',
      'Large training networks',
      'Multi-state programs',
    ],
    requiresApproval: true,
    stripeProductId: 'prod_community_enterprise',
    stripePriceId: 'price_community_enterprise_299',
  },
];

// Helper Functions
export function getProductBySlug(slug: string): StoreProduct | undefined {
  return STORE_PRODUCTS.find((p) => p.slug === slug);
}

export function getAppByKey(key: string): PlatformApp | undefined {
  return PLATFORM_APPS.find((a) => a.key === key);
}

export function getAppsForProduct(product: StoreProduct): PlatformApp[] {
  return product.appsIncluded
    .map((key) => getAppByKey(key))
    .filter((app): app is PlatformApp => app !== undefined);
}

export function getLicenseDescription(licenseType: LicenseType): string {
  switch (licenseType) {
    case 'single':
      return 'Single organization license. Deploy on one domain with one brand.';
    case 'school':
      return 'School/training provider license. White-label for your organization with multi-program support.';
    case 'enterprise':
      return 'Enterprise license. Multi-tenant deployment with unlimited programs and custom integrations.';
  }
}
