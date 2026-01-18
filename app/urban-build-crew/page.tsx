import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Urban Build Crew',
  alternates: { canonical: 'https://www.elevateforhumanity.org/urban-build-crew' },
};

export default function Page() { redirect('/partners'); }
