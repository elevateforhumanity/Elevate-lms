import { redirect } from 'next/navigation';

// ACTIVE: This route has been moved to the canonical location
// Redirect to /program-holder/dashboard
export default function PortalRedirect() {
  redirect('/program-holder/dashboard');
}
