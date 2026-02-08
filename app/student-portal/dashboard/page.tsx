import { redirect } from 'next/navigation';

// Consolidated: All student dashboards redirect to /student/dashboard
export default function StudentPortalDashboardPage() {
  redirect('/student/dashboard');
}
