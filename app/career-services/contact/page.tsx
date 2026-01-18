import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: 'https://www.elevateforhumanity.org/career-services/contact' },
};

export default function Page() { redirect('/contact'); }
