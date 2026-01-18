import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses',
  alternates: { canonical: 'https://www.elevateforhumanity.org/student/courses' },
};

export default function Page() { redirect('/lms/dashboard'); }
