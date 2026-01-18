import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sent',
  alternates: { canonical: 'https://www.elevateforhumanity.org/messages/sent' },
};

export default function Page() { redirect('/messages'); }
