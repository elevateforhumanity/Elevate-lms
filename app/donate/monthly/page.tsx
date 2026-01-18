import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Monthly',
  alternates: { canonical: 'https://www.elevateforhumanity.org/donate/monthly' },
};

export default function Page() {
  redirect('/donate');
}
