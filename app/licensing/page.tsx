import { Metadata } from 'next';
import { redirect } from 'next/navigation';

// Canonical licensing URL is /store/licenses/managed

export const metadata: Metadata = {
  title: 'Licensing | Elevate for Humanity',
  description: 'Elevate for Humanity - Career training and workforce development programs.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/licensing',
  },
};

export default function LicensingRedirect() {
  redirect('/store/licenses/managed');
}
