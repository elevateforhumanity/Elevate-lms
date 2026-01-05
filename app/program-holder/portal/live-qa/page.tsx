import { Metadata } from 'next';
import { generateInternalMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateInternalMetadata({
  title: 'Program-Holder Portal Live-Qa',
  description: 'Internal page for Program-Holder Portal Live-Qa',
  path: '/program-holder/portal/live-qa',
});

import { redirect } from 'next/navigation';

// ACTIVE: Live Q&A is Implemented
// Redirect to support
export default function PortalLiveQARedirect() {
  redirect('/program-holder/support');
}
