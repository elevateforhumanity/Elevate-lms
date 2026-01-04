import React from 'react';
import { WorkOneBanner } from '@/components/banners/WorkOneBanner';
import { ProgramBanner } from '@/components/programs/ProgramBanner';

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WorkOneBanner />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <ProgramBanner />
        {children}
      </div>
    </>
  );
}
