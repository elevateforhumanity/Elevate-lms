import { redirect } from 'next/navigation';

// ACTIVE: Attendance tracking is Implemented
// Redirect to dashboard
export default function PortalAttendanceRedirect() {
  redirect('/program-holder/dashboard');
}
