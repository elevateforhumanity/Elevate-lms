'use client';

import React from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown).gtag) {
      (window as unknown).gtag('config', GA_MEASUREMENT_ID, {
        page_path:
          pathname +
          (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      {/* Safe: Google Analytics tracking script */}
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  );
}

// Event tracking helper
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, unknown>
) {
  if (typeof window !== 'undefined' && (window as unknown).gtag) {
    (window as unknown).gtag('event', eventName, eventParams);
  }
}

// Conversion tracking
export function trackConversion(
  conversionType: 'application' | 'enrollment' | 'contact' | 'download'
) {
  trackEvent('conversion', {
    conversion_type: conversionType,
    timestamp: new Date().toISOString(),
  });
}
