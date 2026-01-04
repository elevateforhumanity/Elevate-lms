import { redirect } from 'next/navigation';

// ACTIVE: This route has been moved to the canonical location
// Redirect to /program-holder/students
export default function PortalStudentsRedirect() {
  redirect('/program-holder/students');
}
