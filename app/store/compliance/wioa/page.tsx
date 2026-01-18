import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wioa',
  alternates: { canonical: 'https://www.elevateforhumanity.org/store/compliance/wioa' },
};

export default function Page() { redirect('/store'); }
