import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Groups',
  alternates: { canonical: 'https://www.elevateforhumanity.org/community/groups' },
};

export default function Page() {
  redirect('/community');
}
