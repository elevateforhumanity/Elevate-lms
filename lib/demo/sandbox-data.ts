/**
 * Demo Sandbox Data
 * 
 * Read-only sample data for demo/trial users.
 * This data is used when demo_mode=true to show realistic examples
 * without affecting production data.
 */

export const DEMO_ORGANIZATION = {
  id: 'demo-org-001',
  name: 'Acme Training Academy',
  type: 'training_provider',
  domain: 'demo.elevateforhumanity.org',
  contact_name: 'Demo Admin',
  contact_email: 'elevate4humanityedu@gmail.com',
  branding: {
    logo_url: '/images/demo/acme-logo.png',
    primary_color: '#4F46E5',
    secondary_color: '#10B981',
  },
};

export const DEMO_LICENSE = {
  id: 'demo-license-001',
  organization_id: 'demo-org-001',
  status: 'trial' as const,
  plan_id: 'pro',
  trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
  current_period_end: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
};

export const DEMO_USAGE = {
  student_count: 47,
  student_limit: 200,
  admin_count: 3,
  admin_limit: 10,
  program_count: 8,
  program_limit: 25,
};

export const DEMO_STUDENTS = [
  {
    id: 'demo-student-001',
    full_name: 'Marcus Johnson',
    email: 'marcus.j@example.com',
    program: 'Barber Apprenticeship',
    status: 'active',
    hours_completed: 847,
    hours_required: 2000,
    start_date: '2025-06-15',
    mentor: 'James Williams',
    shop: 'Elite Cuts Barbershop',
  },
  {
    id: 'demo-student-002',
    full_name: 'Aaliyah Thompson',
    email: 'aaliyah.t@example.com',
    program: 'Cosmetology Apprenticeship',
    status: 'active',
    hours_completed: 1203,
    hours_required: 1500,
    start_date: '2025-03-01',
    mentor: 'Lisa Chen',
    shop: 'Glamour Studio',
  },
  {
    id: 'demo-student-003',
    full_name: 'DeShawn Williams',
    email: 'deshawn.w@example.com',
    program: 'HVAC Technician',
    status: 'active',
    hours_completed: 2450,
    hours_required: 8000,
    start_date: '2024-09-01',
    mentor: 'Robert Martinez',
    shop: 'Cool Air Solutions',
  },
  {
    id: 'demo-student-004',
    full_name: 'Jasmine Davis',
    email: 'jasmine.d@example.com',
    program: 'CNA Training',
    status: 'completed',
    hours_completed: 120,
    hours_required: 120,
    start_date: '2025-10-01',
    completion_date: '2025-12-15',
    certification: 'Indiana CNA License',
  },
  {
    id: 'demo-student-005',
    full_name: 'Tyler Robinson',
    email: 'tyler.r@example.com',
    program: 'CDL Class A',
    status: 'active',
    hours_completed: 80,
    hours_required: 160,
    start_date: '2025-12-01',
    mentor: 'Mike Johnson',
    company: 'Swift Transport',
  },
];

export const DEMO_PROGRAMS = [
  {
    id: 'demo-prog-001',
    name: 'Barber Apprenticeship',
    type: 'apprenticeship',
    hours: 2000,
    duration: '15-24 months',
    enrolled: 12,
    capacity: 20,
    funding: ['WIOA', 'WRG', 'Self-Pay'],
    status: 'active',
  },
  {
    id: 'demo-prog-002',
    name: 'Cosmetology Apprenticeship',
    type: 'apprenticeship',
    hours: 1500,
    duration: '12-18 months',
    enrolled: 8,
    capacity: 15,
    funding: ['WIOA', 'Self-Pay'],
    status: 'active',
  },
  {
    id: 'demo-prog-003',
    name: 'CNA Training',
    type: 'certification',
    hours: 120,
    duration: '4-8 weeks',
    enrolled: 15,
    capacity: 25,
    funding: ['WIOA', 'Employer'],
    status: 'active',
  },
  {
    id: 'demo-prog-004',
    name: 'CDL Class A',
    type: 'certification',
    hours: 160,
    duration: '4-6 weeks',
    enrolled: 6,
    capacity: 10,
    funding: ['WIOA', 'Employer'],
    status: 'active',
  },
  {
    id: 'demo-prog-005',
    name: 'HVAC Technician',
    type: 'apprenticeship',
    hours: 8000,
    duration: '3-4 years',
    enrolled: 4,
    capacity: 8,
    funding: ['Apprenticeship Grant'],
    status: 'active',
  },
];

export const DEMO_EMPLOYERS = [
  {
    id: 'demo-emp-001',
    name: 'Elite Cuts Barbershop',
    type: 'barbershop',
    contact: 'James Williams',
    email: 'james@elitecuts.com',
    phone: '(317) 555-0101',
    address: '123 Main St, Indianapolis, IN 46204',
    apprentices: 4,
    status: 'active',
  },
  {
    id: 'demo-emp-002',
    name: 'Glamour Studio',
    type: 'salon',
    contact: 'Lisa Chen',
    email: 'lisa@glamourstudio.com',
    phone: '(317) 555-0102',
    address: '456 Fashion Ave, Indianapolis, IN 46205',
    apprentices: 3,
    status: 'active',
  },
  {
    id: 'demo-emp-003',
    name: 'Cool Air Solutions',
    type: 'hvac',
    contact: 'Robert Martinez',
    email: 'robert@coolairsolutions.com',
    phone: '(317) 555-0103',
    address: '789 Industrial Blvd, Indianapolis, IN 46206',
    apprentices: 2,
    status: 'active',
  },
];

export const DEMO_METRICS = {
  totalStudents: 47,
  activeEnrollments: 38,
  completedThisYear: 23,
  placementRate: 94,
  averageWage: 18.50,
  totalHoursLogged: 45230,
  fundingReceived: 287500,
  employerPartners: 12,
};

export const DEMO_RECENT_ACTIVITY = [
  {
    id: 'act-001',
    type: 'enrollment',
    message: 'Marcus Johnson enrolled in Barber Apprenticeship',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-002',
    type: 'hours',
    message: 'Aaliyah Thompson logged 8 hours at Glamour Studio',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-003',
    type: 'completion',
    message: 'Jasmine Davis completed CNA Training',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-004',
    type: 'employer',
    message: 'New employer partner: Swift Transport',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'act-005',
    type: 'funding',
    message: 'WIOA funding approved for Q1 2026',
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
];

export const DEMO_COURSES = [
  {
    id: 'course-001',
    title: 'Barbering Fundamentals',
    description: 'Introduction to professional barbering techniques',
    modules: 12,
    duration: '40 hours',
    enrolled: 12,
    completion_rate: 78,
  },
  {
    id: 'course-002',
    title: 'Sanitation & Safety',
    description: 'State board requirements for sanitation',
    modules: 6,
    duration: '8 hours',
    enrolled: 20,
    completion_rate: 95,
  },
  {
    id: 'course-003',
    title: 'Business of Barbering',
    description: 'Building your client base and managing finances',
    modules: 8,
    duration: '16 hours',
    enrolled: 8,
    completion_rate: 62,
  },
];

/**
 * Check if current session is in demo mode
 */
export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.startsWith('/store/demo') ||
         window.location.search.includes('demo=true');
}

/**
 * Get demo data for a specific entity type
 */
export function getDemoData<T>(
  entityType: 'students' | 'programs' | 'employers' | 'courses' | 'metrics' | 'activity'
): T {
  const dataMap = {
    students: DEMO_STUDENTS,
    programs: DEMO_PROGRAMS,
    employers: DEMO_EMPLOYERS,
    courses: DEMO_COURSES,
    metrics: DEMO_METRICS,
    activity: DEMO_RECENT_ACTIVITY,
  };
  return dataMap[entityType] as T;
}
