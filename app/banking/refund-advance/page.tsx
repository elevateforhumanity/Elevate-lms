import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Advance',
  alternates: { canonical: 'https://www.elevateforhumanity.org/banking/refund-advance' },
};

export default function Page() { redirect('/banking'); }
