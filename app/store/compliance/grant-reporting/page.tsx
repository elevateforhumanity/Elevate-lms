import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grant Reporting',
  alternates: { canonical: 'https://www.elevateforhumanity.org/store/compliance/grant-reporting' },
};

export default function Page() { redirect('/store'); }
