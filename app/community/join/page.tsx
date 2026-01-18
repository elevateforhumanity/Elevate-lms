import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join',
  alternates: { canonical: 'https://www.elevateforhumanity.org/community/join' },
};

export default function Page() { redirect('/community'); }
