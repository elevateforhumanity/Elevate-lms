import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Request',
  alternates: { canonical: 'https://www.elevateforhumanity.org/apprentice/transfer-hours/request' },
};

export default function Page() {
  redirect('/apprenticeships');
}
