import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enroll in Training Programs | Elevate for Humanity',
  description: 'Enroll in free career training programs. Choose from healthcare, skilled trades, technology, and business programs with WIOA funding available.',
  alternates: { canonical: 'https://www.elevateforhumanity.org/programs' },
};

// Redirect /enroll to /programs - the canonical program listing
// Users can then select a program and begin enrollment from there
export default function EnrollPage() {
  redirect('/programs');
}
