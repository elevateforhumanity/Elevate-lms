// Admin Demo Data

export const adminStats = {
  activePrograms: 12,
  totalEnrollments: 847,
  activeStudents: 312,
  completionRate: 78,
  activePartners: 24,
  pendingApplications: 45,
};

export const programs = [
  { id: 1, name: 'USDOL Registered Barber Apprenticeship', category: 'Skilled Trades', format: 'Hybrid', duration: '15-18 months', modules: 12, enrolled: 48, completed: 12, status: 'active' },
  { id: 2, name: 'Certified Nursing Assistant (CNA)', category: 'Healthcare', format: 'Hybrid', duration: '6-8 weeks', modules: 8, enrolled: 124, completed: 89, status: 'active' },
  { id: 3, name: 'HVAC Technician Training', category: 'Skilled Trades', format: 'Hybrid', duration: '6-12 months', modules: 10, enrolled: 36, completed: 8, status: 'active' },
  { id: 4, name: 'Medical Assistant', category: 'Healthcare', format: 'Hybrid', duration: '12-16 weeks', modules: 10, enrolled: 67, completed: 45, status: 'active' },
  { id: 5, name: 'Phlebotomy Technician', category: 'Healthcare', format: 'Hybrid', duration: '4-6 weeks', modules: 6, enrolled: 52, completed: 38, status: 'active' },
  { id: 6, name: 'Commercial Driver License (CDL)', category: 'Transportation', format: 'In-Person', duration: '4-8 weeks', modules: 5, enrolled: 28, completed: 22, status: 'active' },
];

export const pipeline = [
  { stage: 'Intake', count: 45, color: 'bg-slate-500' },
  { stage: 'Eligibility', count: 32, color: 'bg-yellow-500' },
  { stage: 'Enrolled', count: 28, color: 'bg-blue-500' },
  { stage: 'In Progress', count: 312, color: 'bg-green-500' },
  { stage: 'Completed', count: 214, color: 'bg-purple-500' },
];

export const recentActivity = [
  { id: 1, action: 'New enrollment', detail: 'Marcus J. enrolled in Barber Apprenticeship', time: '15 min ago', type: 'enrollment' },
  { id: 2, action: 'Completion', detail: 'Sarah M. completed CNA Training', time: '1 hour ago', type: 'completion' },
  { id: 3, action: 'Hours verified', detail: '24 OJT hours verified for HVAC cohort', time: '2 hours ago', type: 'verification' },
  { id: 4, action: 'Partner added', detail: 'Metro Healthcare Partners onboarded', time: '4 hours ago', type: 'partner' },
  { id: 5, action: 'Report generated', detail: 'Q4 2024 compliance report exported', time: '1 day ago', type: 'report' },
];

export const alerts = [
  { id: 1, type: 'warning', message: 'Quarterly WIOA reporting deadline: January 31, 2025', priority: 'high' },
  { id: 2, type: 'info', message: '12 students approaching program completion', priority: 'medium' },
  { id: 3, type: 'success', message: 'All active programs meeting completion targets', priority: 'low' },
];

export const students = [
  { id: 1, name: 'Darius Williams', email: 'd.williams@email.com', program: 'Barber Apprenticeship', progress: 42, status: 'active', enrolled: 'Sep 2024', avatar: '/images/testimonials/student-marcus.jpg' },
  { id: 2, name: 'Sarah Mitchell', email: 's.mitchell@email.com', program: 'CNA Training', progress: 95, status: 'active', enrolled: 'Nov 2024', avatar: '/images/testimonials/student-sarah.jpg' },
  { id: 3, name: 'Marcus Johnson', email: 'm.johnson@email.com', program: 'HVAC Training', progress: 28, status: 'active', enrolled: 'Oct 2024', avatar: '/images/testimonials/student-david.jpg' },
  { id: 4, name: 'Lisa Rodriguez', email: 'l.rodriguez@email.com', program: 'Medical Assistant', progress: 67, status: 'active', enrolled: 'Oct 2024', avatar: '/images/testimonials/testimonial-medical-assistant.png' },
  { id: 5, name: 'James Thompson', email: 'j.thompson@email.com', program: 'CDL Training', progress: 85, status: 'active', enrolled: 'Dec 2024', avatar: '/images/testimonials/student-graduate-testimonial.jpg' },
];

export const cohorts = [
  { id: 1, name: 'CNA Cohort 2025-01', program: 'CNA Training', students: 24, startDate: 'Jan 13, 2025', status: 'active' },
  { id: 2, name: 'Barber Cohort 2024-09', program: 'Barber Apprenticeship', students: 18, startDate: 'Sep 15, 2024', status: 'active' },
  { id: 3, name: 'HVAC Cohort 2024-10', program: 'HVAC Training', students: 12, startDate: 'Oct 1, 2024', status: 'active' },
  { id: 4, name: 'CNA Cohort 2024-11', program: 'CNA Training', students: 22, startDate: 'Nov 4, 2024', status: 'completed' },
];

export const reportTypes = [
  { id: 1, name: 'Enrollment Report', description: 'Student enrollment data by program', icon: 'users' },
  { id: 2, name: 'Completion Report', description: 'Program completions and outcomes', icon: 'check' },
  { id: 3, name: 'Attendance Records', description: 'Training hours and attendance', icon: 'clock' },
  { id: 4, name: 'WIOA Compliance', description: 'Required data for WIOA reporting', icon: 'file' },
  { id: 5, name: 'Partner Activity', description: 'Employer partner engagement', icon: 'building' },
  { id: 6, name: 'Financial Summary', description: 'Tuition, funding, and payments', icon: 'dollar' },
];
