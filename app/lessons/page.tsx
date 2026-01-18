import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Lessons',
  alternates: { canonical: 'https://www.elevateforhumanity.org/lessons' },
};

export default function Page() {
  redirect('/lms/courses');
}
