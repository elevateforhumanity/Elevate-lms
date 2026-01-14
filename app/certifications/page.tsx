import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Certifications | Elevate For Humanity',
  description: 'Elevate For Humanity - Certifications page',
  alternates: { canonical: 'https://www.elevateforhumanity.org/certifications' },
};

import { redirect } from 'next/navigation';

export default function CertificationsPage() {
  redirect('/training/certifications');
}
