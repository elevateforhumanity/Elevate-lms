import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { generateInternalMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateInternalMetadata({
  title: 'Program-Holder Portal',
  description: 'Internal page for Program-Holder Portal',
  path: '/program-holder/portal',
});

import { redirect } from 'next/navigation';

// ACTIVE: This route has been moved to the canonical location
// Redirect to /program-holder/dashboard
export default function PortalRedirect() {
  redirect('/program-holder/dashboard');
}
