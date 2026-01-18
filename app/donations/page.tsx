import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Donations',
  alternates: { canonical: 'https://www.elevateforhumanity.org/donations' },
};

export default function DonationsRedirect() {
  redirect('/donate');
}
