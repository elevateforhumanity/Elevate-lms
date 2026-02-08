import { redirect } from 'next/navigation';

// Consolidated: All student dashboards redirect to /student/dashboard
export default function LearnerDashboardPage() {
  redirect('/student/dashboard');
}
