import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners Dashboard | Elevate For Humanity',
  description: 'Elevate For Humanity - Career training and workforce development',
};

import { redirect } from 'next/navigation';

/**
 * LEGACY PARTNERS DASHBOARD REDIRECT
 *
 * This route group used an alternate partner path structure.
 * Partner and Program Holder are the same role - redirecting to canonical route.
 */
export default function LegacyPartnersDashboard() {
  redirect('/program-holder/dashboard');
}
