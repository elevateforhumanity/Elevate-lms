import { redirect } from 'next/navigation';

// Redirect to the main student profile
export default function StudentPortalProfilePage() {
  redirect('/student/profile');
}
