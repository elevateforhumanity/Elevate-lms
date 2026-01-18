import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'For Employers',
  alternates: { canonical: 'https://www.elevateforhumanity.org/for-employers' },
};

export default function ForEmployersRedirect() {
  redirect('/employers');
}
