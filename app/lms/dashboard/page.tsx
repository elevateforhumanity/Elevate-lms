import { redirect } from 'next/navigation';

/**
 * Redirect /lms/dashboard to the actual dashboard in the (app) route group
 */
export default function LMSDashboardRedirect() {
  redirect('/lms/(app)/dashboard');
}
