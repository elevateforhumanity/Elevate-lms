import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Request',
  alternates: { canonical: 'https://www.elevateforhumanity.org/employee/time-off/request' },
};

export default function Page() {
  redirect('/lms/dashboard');
}
