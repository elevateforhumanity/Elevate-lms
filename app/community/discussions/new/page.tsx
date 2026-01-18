import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New',
  alternates: { canonical: 'https://www.elevateforhumanity.org/community/discussions/new' },
};

export default function Page() { redirect('/community'); }
