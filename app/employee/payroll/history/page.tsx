import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'History',
  alternates: { canonical: 'https://www.elevateforhumanity.org/employee/payroll/history' },
};

export default function Page() {
  redirect('/lms/dashboard');
}
