import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Payroll',
  alternates: { canonical: 'https://www.elevateforhumanity.org/employee/payroll' },
};

export default function Page() {
  redirect('/lms/dashboard');
}
