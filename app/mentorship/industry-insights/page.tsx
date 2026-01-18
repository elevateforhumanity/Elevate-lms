import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Industry Insights',
  alternates: { canonical: 'https://www.elevateforhumanity.org/mentorship/industry-insights' },
};

export default function Page() { redirect('/mentorship'); }
