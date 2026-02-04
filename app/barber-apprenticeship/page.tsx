import { redirect } from 'next/navigation';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Barber Apprenticeship Program | Elevate for Humanity',
  description: 'Become a licensed barber through our apprenticeship program. Earn while you learn with hands-on training and state certification preparation.',
  alternates: { canonical: 'https://www.elevateforhumanity.org/programs/barber-apprenticeship' },
};

export default function BarberApprenticeshipRedirect() {
  redirect('/programs/barber-apprenticeship');
}
