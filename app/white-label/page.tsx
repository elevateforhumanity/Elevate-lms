import { Metadata } from 'next';
import { redirect } from 'next/navigation';

// White-label is not offered - redirect to licensing

export const metadata: Metadata = {
  title: 'White Label | Elevate for Humanity',
  description: 'Elevate for Humanity - Career training and workforce development programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/white-label',
  },
};

export default function WhiteLabelRedirect() {
  redirect('/licenses');
}
