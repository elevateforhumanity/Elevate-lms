import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Networking',
  alternates: { canonical: 'https://www.elevateforhumanity.org/mentorship/networking' },
};

export default function Page() { redirect('/mentorship'); }
