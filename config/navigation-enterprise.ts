/**
 * ENTERPRISE NAVIGATION CONFIG
 *
 * Rules:
 * - Maximum 5 top-level items (pre-login)
 * - ONE CTA (Apply Now)
 * - Login in top-right corner (unobtrusive)
 * - Two-phase: Pre-intent vs Post-intent
 * - Benefit-driven labels
 */

export type NavItem = {
  label: string;
  href: string;
};

export type NavSection = {
  label: string;
  href?: string;
  items?: NavItem[];
};

/**
 * PHASE 1: PRE-INTENT NAVIGATION (Not Logged In)
 * Maximum 5 items. ONE CTA.
 */
export const preIntentNav: NavSection[] = [
  {
    label: 'Programs',
    items: [
      { label: 'Healthcare', href: '/programs#healthcare' },
      { label: 'Skilled Trades', href: '/programs#trades' },
      { label: 'Transportation', href: '/programs#transportation' },
      { label: 'Business & Recovery', href: '/programs#business' },
      { label: 'Workforce Readiness', href: '/programs/workforce-readiness' },
      { label: 'View All Programs', href: '/programs' },
    ],
  },
  {
    label: 'How It Works',
    href: '/how-it-works',
  },
  {
    label: 'About',
    href: '/about',
  },
];

/**
 * PHASE 2: POST-INTENT NAVIGATION (Logged In)
 * Role-specific dashboard replaces "Apply Now"
 */
export const postIntentNav: NavSection[] = [
  {
    label: 'Programs',
    items: [
      { label: 'Healthcare', href: '/programs#healthcare' },
      { label: 'Skilled Trades', href: '/programs#trades' },
      { label: 'Transportation', href: '/programs#transportation' },
      { label: 'Business & Recovery', href: '/programs#business' },
      { label: 'Workforce Readiness', href: '/programs/workforce-readiness' },
      { label: 'View All Programs', href: '/programs' },
    ],
  },
  {
    label: 'My Dashboard',
    href: '/dashboard', // Will be replaced with role-specific URL
  },
  {
    label: 'Resources',
    items: [
      { label: 'Student Support', href: '/support' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Technical Help', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

/**
 * Get dashboard URL based on user role
 */
export function getDashboardUrl(user: { role?: string } | null): string {
  if (!user || !user.role) return '/student/dashboard';

  switch (user.role) {
    case 'admin':
    case 'super_admin':
      return '/admin';
    case 'program_holder':
      return '/program-holder/dashboard';
    case 'partner':
      return '/partner';
    case 'employer':
      return '/employer';
    case 'workforce_board':
      return '/workforce-board';
    case 'student':
    default:
      return '/student/dashboard';
  }
}

/**
 * Get navigation based on authentication state
 */
export function getEnterpriseNavigation(
  user?: { role?: string } | null
): NavSection[] {
  if (user) {
    // Logged in: Use post-intent navigation
    const nav = [...postIntentNav];

    // Update dashboard URL based on role
    const dashboardIndex = nav.findIndex(
      (section) => section.label === 'My Dashboard'
    );
    if (dashboardIndex !== -1) {
      nav[dashboardIndex] = {
        ...nav[dashboardIndex],
        href: getDashboardUrl(user),
      };
    }

    return nav;
  }

  // Not logged in: Use pre-intent navigation
  return preIntentNav;
}

/**
 * Export for backward compatibility
 */
export const enterpriseNav = preIntentNav;
export default getEnterpriseNavigation;
