/**
 * Demo Data for Buyer Demo Pages
 * Realistic sample data for /demo/learner, /demo/admin, /demo/employer
 */

// Sample Programs
export const demoPrograms = [
  {
    id: 'barber-apprenticeship',
    name: 'Barber Apprenticeship',
    description: 'State-approved apprenticeship program combining classroom instruction with hands-on training at partner barbershops.',
    duration: '12 months',
    format: 'Hybrid (Online + In-Person)',
    modules: 8,
    completedModules: 5,
    status: 'active',
    nextLesson: 'Advanced Cutting Techniques',
    schedule: 'Mon/Wed 6-9pm + Saturday practicum',
    certification: 'State Barber License Eligible',
    fundingEligible: ['WIOA', 'WRG', 'Apprenticeship Grant'],
  },
  {
    id: 'cna-training',
    name: 'Certified Nursing Assistant (CNA)',
    description: 'Comprehensive CNA training program meeting state requirements for certification examination.',
    duration: '6 weeks',
    format: 'Hybrid (Online + Clinical)',
    modules: 6,
    completedModules: 6,
    status: 'completed',
    nextLesson: null,
    schedule: 'Tue/Thu 9am-3pm',
    certification: 'CNA Certification',
    fundingEligible: ['WIOA', 'Healthcare Workforce Grant'],
  },
  {
    id: 'workforce-readiness',
    name: 'Workforce Readiness',
    description: 'Essential skills for workplace success including communication, digital literacy, and professional development.',
    duration: '4 weeks',
    format: 'Online Self-Paced',
    modules: 4,
    completedModules: 2,
    status: 'active',
    nextLesson: 'Professional Communication',
    schedule: 'Self-paced with weekly check-ins',
    certification: 'Workforce Readiness Certificate',
    fundingEligible: ['WIOA', 'TANF', 'Reentry Programs'],
  },
];

// Sample Learner Profile
export const demoLearner = {
  id: 'learner-001',
  name: 'Marcus Johnson',
  email: 'marcus.j@example.com',
  enrolledProgram: demoPrograms[0],
  progress: {
    overallPercent: 62,
    modulesCompleted: 5,
    totalModules: 8,
    hoursCompleted: 156,
    totalHours: 250,
    lastActivity: '2 hours ago',
  },
  funding: {
    status: 'Eligibility-based',
    type: 'WIOA Adult',
    note: 'Funding eligibility determined by local workforce board',
  },
  support: {
    mentor: 'Available through program',
    careerServices: 'Resume review, interview prep, job placement assistance',
    nextMilestone: 'Complete Module 6 by end of month',
  },
  upcomingEvents: [
    { date: 'Tomorrow', event: 'Live Q&A Session', time: '6:00 PM' },
    { date: 'Saturday', event: 'In-Person Practicum', time: '9:00 AM' },
  ],
};

// Sample Employer Profile
export const demoEmployer = {
  id: 'employer-001',
  company: 'Metro Healthcare Partners',
  industry: 'Healthcare',
  openRoles: [
    { title: 'CNA - Day Shift', location: 'Downtown Campus', status: 'Active' },
    { title: 'CNA - Night Shift', location: 'West Campus', status: 'Active' },
    { title: 'Medical Assistant', location: 'Main Office', status: 'Pending' },
  ],
  candidates: [
    { name: 'Sarah M.', program: 'CNA Training', status: 'Interview Scheduled', match: 95 },
    { name: 'James T.', program: 'CNA Training', status: 'Application Review', match: 88 },
    { name: 'Lisa R.', program: 'Medical Assistant', status: 'Screening', match: 82 },
  ],
  hiringSupport: {
    incentive: 'May be eligible for up to $5,000 per hire',
    maxTotal: 'Up to $50,000 total per year',
    disclaimer: 'Eligibility and approval requirements apply. Contact your workforce representative for details.',
    programs: ['Work Opportunity Tax Credit', 'On-the-Job Training Reimbursement', 'Apprenticeship Tax Credits'],
  },
  apprenticeship: {
    active: true,
    registeredWith: 'State Apprenticeship Agency',
    currentApprentices: 3,
    structure: 'Structured training plan with wage progression',
  },
};

// Sample Admin Dashboard Data
export const demoAdminDashboard = {
  summary: {
    activePrograms: 12,
    totalEnrollments: 'Multiple cohorts',
    completionRate: 'Tracked per program',
    activePartners: 8,
  },
  enrollmentPipeline: [
    { stage: 'Intake', count: 'New applications', color: 'bg-slate-500' },
    { stage: 'Eligibility Review', count: 'Pending verification', color: 'bg-yellow-500' },
    { stage: 'Enrolled', count: 'Active learners', color: 'bg-blue-500' },
    { stage: 'In Progress', count: 'Currently training', color: 'bg-green-500' },
    { stage: 'Completed', count: 'Program graduates', color: 'bg-purple-500' },
  ],
  recentActivity: [
    { action: 'New enrollment', detail: 'Barber Apprenticeship cohort', time: '2 hours ago' },
    { action: 'Completion', detail: 'CNA Training - 8 graduates', time: '1 day ago' },
    { action: 'Partner added', detail: 'New employer partner onboarded', time: '2 days ago' },
    { action: 'Report generated', detail: 'Monthly compliance export', time: '3 days ago' },
  ],
  alerts: [
    { type: 'info', message: 'Quarterly reporting deadline approaching' },
    { type: 'success', message: 'All active programs meeting completion targets' },
  ],
  compliance: {
    note: 'Reporting requirements vary by funding source and region',
    exports: ['Enrollment reports', 'Completion certificates', 'Attendance records', 'Outcome tracking'],
  },
};

// Funding Options (for display purposes)
export const fundingOptions = [
  {
    name: 'WIOA (Workforce Innovation and Opportunity Act)',
    description: 'Federal funding for eligible adults and dislocated workers',
    eligibility: 'Income and employment status requirements apply',
  },
  {
    name: 'WRG (Workforce Readiness Grant)',
    description: 'State-level funding for workforce training programs',
    eligibility: 'Varies by state and program',
  },
  {
    name: 'JRI (Justice Reinvestment Initiative)',
    description: 'Funding for reentry and justice-impacted populations',
    eligibility: 'Justice system involvement required',
  },
  {
    name: 'Apprenticeship Grants',
    description: 'Federal and state funding for registered apprenticeships',
    eligibility: 'Must be enrolled in registered apprenticeship program',
  },
];
