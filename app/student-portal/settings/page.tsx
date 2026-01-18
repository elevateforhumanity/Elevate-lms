import { redirect } from 'next/navigation';

// Redirect to the main LMS settings
export default function StudentPortalSettingsPage() {
  redirect('/lms/settings');
}
