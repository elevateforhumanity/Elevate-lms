import { redirect } from 'next/navigation';

// Redirect /programs to the first program category
export default function ProgramsPage() {
  redirect('/programs/healthcare');
}
