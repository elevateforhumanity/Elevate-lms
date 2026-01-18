import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Serene Comfort Care',
  alternates: { canonical: 'https://www.elevateforhumanity.org/serene-comfort-care' },
};

export default function Page() { redirect('/partners'); }
