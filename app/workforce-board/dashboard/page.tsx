import { Metadata } from 'next';
import { generateInternalMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateInternalMetadata({
  title: 'Workforce-Board Dashboard',
  description: 'Internal page for Workforce-Board Dashboard',
  path: '/workforce-board/dashboard',
});

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
