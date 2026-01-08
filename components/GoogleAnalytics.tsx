"use client";

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-SWPG2HVYVH';
  const pathname = usePathname();

  // Don't track admin, student portal, or private pages
  const isPrivatePage = pathname?.startsWith('/admin') ||
                        pathname?.startsWith('/student') ||
                        pathname?.startsWith('/portal') ||
                        pathname?.startsWith('/delegate') ||
                        pathname?.startsWith('/course/') ||
                        pathname?.startsWith('/lms/profile') ||
                        pathname?.startsWith('/lms/messages') ||
                        pathname?.startsWith('/lms/notifications');

  if (isPrivatePage) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
