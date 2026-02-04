import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Lessons | Elevate for Humanity',
  description: 'Access your training lessons and course materials. Complete modules, watch videos, and track your learning progress.',
  alternates: { canonical: 'https://www.elevateforhumanity.org/lms/courses' },
};

export default function Page() {
  redirect('/lms/courses');
}
