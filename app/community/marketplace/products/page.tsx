import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  alternates: { canonical: 'https://www.elevateforhumanity.org/community/marketplace/products' },
};

export default function Page() { redirect('/community'); }
