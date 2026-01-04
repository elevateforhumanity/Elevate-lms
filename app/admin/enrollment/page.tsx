import { redirect } from 'next/navigation';

// Redirect to enrollments (plural)
export default function EnrollmentPage() {
  redirect('/admin/enrollments');
}
