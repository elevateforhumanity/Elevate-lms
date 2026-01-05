import { Metadata } from 'next';
import { generateInternalMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateInternalMetadata({
  title: 'Program-Holder Portal Reports',
  description: 'Internal page for Program-Holder Portal Reports',
  path: '/program-holder/portal/reports',
});

import { redirect } from 'next/navigation';

// ACTIVE: This route has been moved to the canonical location
// Redirect to /program-holder/reports
export default function PortalReportsRedirect() {
  redirect('/program-holder/reports');
}
