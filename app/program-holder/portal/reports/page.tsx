import { redirect } from 'next/navigation';

// ACTIVE: This route has been moved to the canonical location
// Redirect to /program-holder/reports
export default function PortalReportsRedirect() {
  redirect('/program-holder/reports');
}
