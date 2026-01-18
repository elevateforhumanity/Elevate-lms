import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Supersonic Fast Cash',
  alternates: { canonical: 'https://www.elevateforhumanity.org/supersonic-fast-cash' },
};

export default function Page() { redirect('/partners'); }
