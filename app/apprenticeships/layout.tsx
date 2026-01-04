import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apprenticeships',
  description:
    'Earn While You Learn pathways with real shops and employers. Get matched to training, funding, and support services.',
};

export default function ApprenticeshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
