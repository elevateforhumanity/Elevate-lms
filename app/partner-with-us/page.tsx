import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner With Us',
  alternates: { canonical: 'https://www.elevateforhumanity.org/partner-with-us' },
};

export default function Page() { redirect('/partners'); }
