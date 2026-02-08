import { redirect } from 'next/navigation';

// Consolidated: Redirect to main programs page for enrollment
export default function LmsEnrollPage() {
  redirect('/programs');
}
