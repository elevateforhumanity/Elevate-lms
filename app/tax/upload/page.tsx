import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Upload',
  alternates: { canonical: 'https://www.elevateforhumanity.org/tax/upload' },
};

export default function Page() {
  redirect('/vita');
}
