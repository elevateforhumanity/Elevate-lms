import { redirect } from 'next/navigation';

// Redirect /programs to WIOA eligibility
export default function ProgramsPage() {
  redirect('/wioa-eligibility');
}
