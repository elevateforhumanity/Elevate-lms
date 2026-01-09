// config/navigation-clean.ts
// Clean navigation following developer-ready spec
// ≤ 6 top-level items, auth-gated dashboards

export type NavItem = {
  label: string;
  href: string;
  isHeader?: boolean;
};

export type NavSection = {
  label: string;
  href?: string;
  items?: NavItem[];
  requiresAuth?: boolean; // New: mark sections that need authentication
};

/**
 * PUBLIC NAVIGATION - Visible to all users
 * Simple navigation - each item goes to its own landing page
 */
export const publicNav: NavSection[] = [
  {
    label: 'Programs',
    items: [
      { label: 'All Programs', href: '/programs' },
      { label: 'Healthcare', href: '/programs/healthcare' },
      { label: 'Skilled Trades', href: '/programs/skilled-trades' },
      { label: 'Technology', href: '/programs/technology' },
      { label: 'Business', href: '/programs/business' },
      { label: 'CDL & Transportation', href: '/programs/cdl-transportation' },
      { label: 'Barber Apprenticeship', href: '/programs/barber-apprenticeship' },
      { label: 'Apprenticeships', href: '/apprenticeships' },
    ],
  },
  {
    label: 'Get Started',
    items: [
      { label: 'Apply Now', href: '/apply' },
      { label: 'Check WIOA Eligibility', href: '/wioa-eligibility' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Pathways', href: '/pathways' },
      { label: 'Funding Options', href: '/funding' },
    ],
  },
  {
    label: 'Services',
    items: [
      { label: 'Career Services', href: '/career-services' },
      { label: 'Job Placement', href: '/career-services/job-placement' },
      { label: 'Resume Building', href: '/career-services/resume-building' },
      { label: 'Interview Prep', href: '/career-services/interview-prep' },
      { label: 'Career Counseling', href: '/career-services/career-counseling' },
      { label: 'Advising', href: '/advising' },
    ],
  },
  {
    label: 'Partners',
    items: [
      { label: 'Employers', href: '/employer' },
      { label: 'Hire Graduates', href: '/hire-graduates' },
      { label: 'Workforce Partners', href: '/workforce-partners' },
      { label: 'Training Providers', href: '/training-providers' },
      { label: 'Government Agencies', href: '/agencies' },
    ],
  },
  {
    label: 'About',
    items: [
      { label: 'About Us', href: '/about' },
      { label: 'Success Stories', href: '/success-stories' },
      { label: 'Impact', href: '/impact' },
      { label: 'Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

/**
 * STUDENT NAVIGATION - For students
 */
export const studentNav: NavSection[] = [
  {
    label: 'Dashboard',
    requiresAuth: true,
    items: [
      { label: 'My Dashboard', href: '/student/dashboard' },
      { label: 'My Courses', href: '/student/courses' },
      { label: 'My Progress', href: '/student/progress' },
      { label: 'Assignments', href: '/student/assignments' },
      { label: 'Grades', href: '/student/grades' },
      { label: 'Certificates', href: '/student/certificates' },
      { label: 'Career Counseling', href: '/student/career-counseling' },
    ],
  },
];

/**
 * ADMIN NAVIGATION - Only for admin users
 */
export const adminNav: NavSection[] = [
  {
    label: 'Admin',
    requiresAuth: true,
    items: [
      { label: 'Admin Dashboard', href: '/admin' },
      { label: 'Applications', href: '/admin/applications' },
      { label: 'Students', href: '/admin/students' },
      { label: 'Enrollments', href: '/admin/enrollments' },
      { label: 'Programs', href: '/admin/programs' },
      { label: 'Program Holders', href: '/admin/program-holders' },
      { label: 'Reports', href: '/admin/reports' },
      { label: 'Compliance', href: '/admin/compliance' },
    ],
  },
];

/**
 * PROGRAM HOLDER NAVIGATION - For program holders
 */
export const programHolderNav: NavSection[] = [
  {
    label: 'Portal',
    requiresAuth: true,
    items: [
      { label: 'My Dashboard', href: '/program-holder/dashboard' },
      { label: 'Students', href: '/program-holder/portal/students' },
      { label: 'Attendance', href: '/program-holder/portal/attendance' },
      { label: 'Documents', href: '/program-holder/documents' },
      { label: 'Reports', href: '/program-holder/portal/reports' },
      { label: 'Messages', href: '/program-holder/portal/messages' },
      { label: 'Training', href: '/program-holder/training' },
    ],
  },
];

/**
 * PARTNER NAVIGATION - For training partners
 */
export const partnerNav: NavSection[] = [
  {
    label: 'Partner Portal',
    requiresAuth: true,
    items: [
      { label: 'Partner Dashboard', href: '/partner' },
      { label: 'Students', href: '/partner/students' },
      { label: 'Reports', href: '/partner/reports' },
      { label: 'Resources', href: '/partner/resources' },
    ],
  },
];

/**
 * EMPLOYER NAVIGATION - For employers
 */
export const employerNav: NavSection[] = [
  {
    label: 'Employer Portal',
    requiresAuth: true,
    items: [
      { label: 'Employer Dashboard', href: '/employer' },
      { label: 'Placements', href: '/employer/placements' },
      { label: 'Candidates', href: '/employer/candidates' },
      { label: 'Reports', href: '/employer/reports' },
    ],
  },
];

/**
 * WORKFORCE BOARD NAVIGATION - For workforce boards
 */
export const workforceBoardNav: NavSection[] = [
  {
    label: 'Workforce Board',
    requiresAuth: true,
    items: [
      { label: 'Board Dashboard', href: '/workforce-board' },
      { label: 'Programs', href: '/workforce-board/programs' },
      { label: 'Reports', href: '/workforce-board/reports' },
      { label: 'Compliance', href: '/workforce-board/compliance' },
    ],
  },
];

/**
 * Get navigation based on user authentication and role
 *
 * NOTE: Dashboard-specific navigation is now handled INSIDE each dashboard
 * via sidebar/internal navigation, NOT in the header dropdown.
 * The header only shows public navigation items.
 */
export function getNavigation(user?: { role?: string } | null) {
  // Always return public navigation only
  // Dashboard features are accessed via the Dashboard button and internal navigation
  return [...publicNav];
}

// Export for backward compatibility
export const headerNav = publicNav;
