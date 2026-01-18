import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ongoing Support',
  alternates: { canonical: 'https://www.elevateforhumanity.org/mentorship/ongoing-support' },
};

export default function Page() { redirect('/mentorship'); }
