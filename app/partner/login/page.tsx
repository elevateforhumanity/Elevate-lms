import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  robots: { index: false, follow: false },
};

export default function Page() { redirect('/partners'); }
