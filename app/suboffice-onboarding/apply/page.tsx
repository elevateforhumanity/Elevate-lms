import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply',
  alternates: { canonical: 'https://www.elevateforhumanity.org/suboffice-onboarding/apply' },
};

export default function Page() { redirect('/franchise'); }
