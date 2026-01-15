import React from 'react';
import { Metadata } from 'next';
// Image asset: /images/programs-new/program-16.jpg

export const metadata: Metadata = {
  title: "Government & Workforce Boards - Partner Portal",
  description: "Access compliance data, contracts, and reporting for workforce boards and government partners. Track outcomes and program performance.",
  keywords: ["government portal", "workforce board", "compliance reporting", "WIOA compliance", "government contracts"],
  openGraph: {
    title: "Government & Workforce Boards Portal | Elevate for Humanity",
    description: "Access compliance data, contracts, and reporting for workforce boards and government partners.",
    images: ["/images/artlist/cropped/hero-training-1-wide.jpg"],
    type: "website",
  },
};

export default function GovernmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
