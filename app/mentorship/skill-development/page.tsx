import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skill Development',
  alternates: { canonical: 'https://www.elevateforhumanity.org/mentorship/skill-development' },
};

export default function Page() { redirect('/mentorship'); }
