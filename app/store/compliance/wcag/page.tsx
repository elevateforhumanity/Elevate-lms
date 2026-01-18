import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wcag',
  alternates: { canonical: 'https://www.elevateforhumanity.org/store/compliance/wcag' },
};

export default function Page() { redirect('/store'); }
