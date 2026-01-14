import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apprenticeship Programs | Earn While You Learn | Elevate For Humanity',
  description:
    'Paid apprenticeship programs in barbering, HVAC, electrical, and more. Earn while you learn with hands-on training and job placement.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/apprenticeships',
  },
  openGraph: {
    title: 'Apprenticeship Programs - Earn While You Learn',
    description: 'Paid apprenticeships in barbering, HVAC, electrical, and more. Hands-on training with job placement.',
    url: 'https://www.elevateforhumanity.org/apprenticeships',
    siteName: 'Elevate for Humanity',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630, alt: 'Apprenticeship Programs' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apprenticeship Programs - Earn While You Learn',
    description: 'Paid apprenticeships with hands-on training and job placement.',
    images: ['/og-default.jpg'],
  },
};

export default function ApprenticeshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
