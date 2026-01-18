import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Barber Apprenticeship',
  alternates: { canonical: 'https://www.elevateforhumanity.org/barber-apprenticeship' },
};

export default function BarberApprenticeshipRedirect() {
  redirect('/programs/barber-apprenticeship');
}
