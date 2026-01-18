import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support',
  alternates: { canonical: 'https://www.elevateforhumanity.org/student/support' },
};

export default function Page() { redirect('/lms/dashboard'); }
