import { redirect } from 'next/navigation';

// Consolidated: Redirect to main profile settings
export default function PortalStudentProfilePage() {
  redirect('/settings/profile');
}
