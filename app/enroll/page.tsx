import { redirect } from 'next/navigation';

// Redirect /enroll to /programs - the canonical program listing
// Users can then select a program and begin enrollment from there
export default function EnrollPage() {
  redirect('/programs');
}
