import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Log',
  alternates: { canonical: 'https://www.elevateforhumanity.org/student/hours/log' },
};

export default function Page() {
  redirect('/lms/dashboard');
}
