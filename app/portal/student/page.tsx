import { redirect } from 'next/navigation';

// Consolidated: /portal/student redirects to /student/dashboard
export default function PortalStudentPage() {
  redirect('/student/dashboard');
}
