import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Attendance',
  alternates: { canonical: 'https://www.elevateforhumanity.org/partner/attendance' },
};

export default function Page() {
  redirect('/partners');
}
