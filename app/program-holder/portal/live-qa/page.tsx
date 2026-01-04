import { redirect } from 'next/navigation';

// ACTIVE: Live Q&A is Implemented
// Redirect to support
export default function PortalLiveQARedirect() {
  redirect('/program-holder/support');
}
