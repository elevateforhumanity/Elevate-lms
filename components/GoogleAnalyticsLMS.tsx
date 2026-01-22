"use client";

import Script from 'next/script';
import { usePathname } from 'next/navigation';

/**
 * Google Analytics for LMS public pages only
 * Tracks marketing pages and public LMS content
 * Excludes private student/admin areas
 */
export default function GoogleAnalyticsLMS() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-SWPG2HVYVH';
  const pathname = usePathname();

  // Only track public LMS pages (courses catalog, public course pages)
  const isPublicLMSPage = pathname?.startsWith('/lms/courses') &&
                          !pathname?.includes('/profile') &&
                          !pathname?.includes('/messages') &&
                          !pathname?.includes('/notifications');

  if (!isPublicLMSPage) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-lms" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
