import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Privacy',
  alternates: { canonical: 'https://www.elevateforhumanity.org/legal/privacy' },
};

export default function Page() {
  redirect('/privacy-policy');
}
