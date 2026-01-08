'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export default function ConfirmationTracking() {
  useEffect(() => {
    // Track conversion on page load
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        event_category: 'application',
        event_label: 'application_complete',
      });

      // Also track as a standard event
      window.gtag('event', 'apply_complete', {
        event_category: 'application',
        event_label: 'confirmation_page_view',
      });
    }
  }, []);

  return null;
}
