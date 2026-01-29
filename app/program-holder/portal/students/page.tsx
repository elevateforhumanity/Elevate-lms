import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { generateInternalMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateInternalMetadata({
  title: 'Program-Holder Portal Students',
  description: 'Internal page for Program-Holder Portal Students',
  path: '/program-holder/portal/students',
});

import { redirect } from 'next/navigation';

// ACTIVE: This route has been moved to the canonical location
// Redirect to /program-holder/students
export default function PortalStudentsRedirect() {
  redirect('/program-holder/students');
}
