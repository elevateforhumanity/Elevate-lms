import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup',
  robots: { index: false, follow: false },
};

export default function Page() { redirect('/client-portal'); }
