import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Direct Deposit',
  alternates: { canonical: 'https://www.elevateforhumanity.org/banking/direct-deposit' },
};

export default function Page() { redirect('/banking'); }
