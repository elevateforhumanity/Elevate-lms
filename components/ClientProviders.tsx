'use client';

import dynamic from 'next/dynamic';

// Lazy load analytics and tracking (non-critical)
const GoogleAnalytics = dynamic(() => import('@/components/GoogleAnalytics'), {
  ssr: false,
});

const FacebookPixel = dynamic(() => import('@/components/FacebookPixel'), {
  ssr: false,
});

const AILiveChat = dynamic(() => import('@/components/chat/AILiveChat'), {
  ssr: false,
});

const CookieBanner = dynamic(
  () => import('@/components/CookieBanner').then((mod) => ({ default: mod.CookieBanner })),
  { ssr: false }
);

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
      <GoogleAnalytics />
      <FacebookPixel />
      <AILiveChat />
      <CookieBanner />
      <PerformanceMonitor />
      <ScraperDetection />
      <CopyrightProtection />
      <SecurityMonitor />
    </>
  );
}
