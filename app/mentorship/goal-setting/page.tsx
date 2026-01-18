import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Goal Setting',
  alternates: { canonical: 'https://www.elevateforhumanity.org/mentorship/goal-setting' },
};

export default function Page() { redirect('/mentorship'); }
