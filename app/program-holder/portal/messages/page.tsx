import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { generateInternalMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateInternalMetadata({
  title: 'Program-Holder Portal Messages',
  description: 'Internal page for Program-Holder Portal Messages',
  path: '/program-holder/portal/messages',
});

import { redirect } from 'next/navigation';

// ACTIVE: Messaging is Implemented
// Redirect to support
export default function PortalMessagesRedirect() {
  redirect('/program-holder/support');
}
