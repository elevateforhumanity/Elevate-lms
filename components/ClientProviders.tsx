'use client';

import dynamic from 'next/dynamic';

// Lazy load non-critical components
// NOTE: GoogleAnalytics is loaded in layout.tsx - don't duplicate here
// NOTE: LiveChatWidget is loaded in layout.tsx - don't duplicate here
// NOTE: CookieConsent is loaded in layout.tsx - don't duplicate here

const FacebookPixel = dynamic(() => import('@/components/FacebookPixel'), {
  ssr: false,
});

const PerformanceMonitor = dynamic(
  () => import('@/components/PerformanceMonitor').then((mod) => ({ default: mod.PerformanceMonitor })),
  { ssr: false }
);

const ScraperDetection = dynamic(
  () => import('@/components/ScraperDetection').then((mod) => ({ default: mod.ScraperDetection })),
  { ssr: false }
);

const CopyrightProtection = dynamic(
  () => import('@/components/CopyrightProtection').then((mod) => ({ default: mod.CopyrightProtection })),
  { ssr: false }
);

const SecurityMonitor = dynamic(
  () => import('@/components/SecurityMonitor').then((mod) => ({ default: mod.SecurityMonitor })),
  { ssr: false }
);

export function ClientProviders() {
  return (
    <>
      <FacebookPixel />
      <PerformanceMonitor />
      <ScraperDetection />
      <CopyrightProtection />
      <SecurityMonitor />
    </>
  );
}
