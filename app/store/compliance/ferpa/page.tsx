import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ferpa',
  alternates: { canonical: 'https://www.elevateforhumanity.org/store/compliance/ferpa' },
};

export default function Page() { redirect('/store'); }
