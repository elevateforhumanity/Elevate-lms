import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Archived',
  alternates: { canonical: 'https://www.elevateforhumanity.org/messages/archived' },
};

export default function Page() { redirect('/messages'); }
