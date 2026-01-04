import { redirect } from 'next/navigation';

/**
 * WORKFORCE BOARD DASHBOARD REDIRECT
 *
 * Workforce board members don't have a dedicated dashboard yet.
 * Redirecting to main dashboard router.
 */
export default function WorkforceBoardDashboardRedirect() {
  redirect('/dashboard');
}
