import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Selfish Inc',
  alternates: { canonical: 'https://www.elevateforhumanity.org/selfish-inc' },
};

export default function Page() { redirect('/partners'); }
