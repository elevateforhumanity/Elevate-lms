'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const [mounted, setMounted] = useState(false);
  const [pathname, setPathname] = useState('');

  // Mount on client only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get pathname safely after mount
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      try {
        setPathname(window.location.pathname);
      } catch (error) {
        console.warn('Failed to get pathname:', error);
      }
    }
  }, [mounted]);

  // Track page views on route change (only after mounted)
  useEffect(() => {
    if (!mounted || !GA_MEASUREMENT_ID || typeof window === 'undefined') return;

    try {
      // Track page view
      if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: pathname,
        });
      }
    } catch (error) {
      console.warn('GA tracking failed:', error);
    }
  }, [mounted, pathname]);

  // Critical: server render and first client render both return null
  if (!mounted || !GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return null;
  }

  try {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            try {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname
              });
            } catch (e) {
              console.warn('GA init failed:', e);
            }
          `}
        </Script>
      </>
    );
  } catch (error) {
    console.warn('GoogleAnalytics render failed:', error);
    return null;
  }
}
