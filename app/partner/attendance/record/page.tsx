import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Record',
  alternates: { canonical: 'https://www.elevateforhumanity.org/partner/attendance/record' },
};

export default function Page() {
  redirect('/partners');
}
