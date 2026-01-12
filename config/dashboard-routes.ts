import { UserRole } from '@/types/user';

export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  student: '/student/dashboard',
  instructor: '/instructor/dashboard',
  program_holder: '/program-holder/dashboard',
  employer: '/employer/dashboard',
  staff: '/staff/dashboard',
  admin: '/admin',
  super_admin: '/admin',
};

export function getDashboardUrl(role?: UserRole): string {
  if (!role) return '/student/dashboard';
  return DASHBOARD_ROUTES[role] || '/student/dashboard';
}
