import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Career Training Programs | Elevate for Humanity',
  description: 'Explore free career training programs in healthcare, skilled trades, and technology. WIOA-funded programs with job placement support in Indianapolis.',
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/programs',
  },
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
