import { redirect } from 'next/navigation';

// Consolidated: /student-portal redirects to /student/dashboard
export default function StudentPortalPage() {
  redirect('/student/dashboard');
}
