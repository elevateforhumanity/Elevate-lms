import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demo',
  alternates: { canonical: 'https://www.elevateforhumanity.org/client-portal/demo' },
};

export default function Page() { redirect('/client-portal'); }
