import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prepaid Card',
  alternates: { canonical: 'https://www.elevateforhumanity.org/banking/prepaid-card' },
};

export default function Page() { redirect('/banking'); }
