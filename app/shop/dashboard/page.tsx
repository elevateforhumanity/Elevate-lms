import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  alternates: { canonical: 'https://www.elevateforhumanity.org/shop/dashboard' },
};

export default function Page() { redirect('/shop'); }
