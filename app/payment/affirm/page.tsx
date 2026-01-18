import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Affirm',
  alternates: { canonical: 'https://www.elevateforhumanity.org/payment/affirm' },
};

export default function Page() {
  redirect('/apply');
}
