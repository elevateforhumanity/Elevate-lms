import { redirect } from 'next/navigation';

// Consolidated: /learner redirects to /student/dashboard
export default function LearnerPage() {
  redirect('/student/dashboard');
}
