import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kingdom Konnect',
  alternates: { canonical: 'https://www.elevateforhumanity.org/kingdom-konnect' },
};

export default function Page() { redirect('/partners'); }
