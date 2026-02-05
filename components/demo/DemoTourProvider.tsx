'use client';

import { Suspense } from 'react';
import { TourOverlayWrapper } from './TourOverlay';

/**
 * Provider component that adds demo tour overlay to any layout
 * Wraps in Suspense because it uses useSearchParams
 */
export function DemoTourProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <TourOverlayWrapper />
      </Suspense>
    </>
  );
}
