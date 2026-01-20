import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Partner Portal | Elevate for Humanity',
    template: '%s | Elevate Partner',
  },
  description: 'Workforce board and training provider partnership portal.',
  manifest: '/manifest-partner.json',
};

export default function PartnerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
