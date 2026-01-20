import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Employer Portal | Elevate for Humanity',
    template: '%s | Elevate Hire',
  },
  description: 'Hire skilled graduates and access workforce solutions.',
  manifest: '/manifest-employer.json',
};

export default function EmployerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
