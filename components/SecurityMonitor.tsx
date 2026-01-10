"use client";

import React from 'react';

import { useEffect } from 'react';

/**
 * Security Monitor Component
 * Monitors and logs security events in real-time
 */
export function SecurityMonitor() {
  useEffect(() => {
    // Safety check - only run in browser
    if (typeof window === 'undefined') return;

    // 1. Monitor for suspicious activity
    const monitorActivity = () => {
      // Track rapid page navigation (potential scraping)
      let pageViews = 0;
      let lastView = Date.now();

      const trackPageView = () => {
        const now = Date.now();
        if (now - lastView < 1000) {
          pageViews++;
          if (pageViews > 10) {
            logSecurityEvent('RAPID_NAVIGATION', {
              count: pageViews,
              timeWindow: now - lastView,
            });
          }
        } else {
          pageViews = 0;
        }
        lastView = now;
      };

      window.addEventListener('popstate', trackPageView);
      return () => window.removeEventListener('popstate', trackPageView);
    };

    // 2. Detect automated tools
    const detectAutomation = () => {
      if (typeof navigator === 'undefined') return;
      // Check for common automation indicators
      const win = window as any;
      const indicators = {
        webdriver: !!navigator.webdriver,
        phantom: !!win._phantom || !!win.callPhantom,
        selenium: !!win.document?.$cdc_asdjflasutopfhvcZLmcfl_,
        headless: /HeadlessChrome/.test(navigator.userAgent),
      };

      if (Object.values(indicators).some((v) => v)) {
        logSecurityEvent('AUTOMATION_DETECTED', indicators);
      }
    };

    // 3. Monitor console access - disabled for performance

    // 4. Detect DevTools opening
    const detectDevTools = () => {
      const threshold = 160;
      const check = () => {
        const widthThreshold =
          window.outerWidth - window.innerWidth > threshold;
        const heightThreshold =
          window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
          logSecurityEvent('DEVTOOLS_OPENED', {
            outerWidth: window.outerWidth,
            innerWidth: window.innerWidth,
            outerHeight: window.outerHeight,
            innerHeight: window.innerHeight,
          });
        }
      };

      const interval = setInterval(check, 1000);
      return () => clearInterval(interval);
    };

    // 5. Monitor for iframe embedding attempts
    const detectIframeEmbedding = () => {
      if (typeof document === 'undefined') return;
      if (window.self !== window.top) {
        logSecurityEvent('IFRAME_EMBEDDING_DETECTED', {
          parentOrigin: document.referrer,
        });

        // Attempt to break out of iframe
        try {
          window.top!.location = window.self.location;
        } catch (e) {
          // If we can't break out, at least log it
        }
      }
    };

    // 6. Track failed resource loads (potential tampering)
    const monitorResourceLoading = () => {
      window.addEventListener(
        'error',
        (e) => {
          const target = e.target as any;
          if (target && target.src) {
            logSecurityEvent('RESOURCE_LOAD_FAILED', {
              resource: target.src,
              type: target.tagName,
            });
          }
        },
        true
      );
    };

    // 7. Monitor for clipboard access
    const monitorClipboard = () => {
      if (typeof document === 'undefined') return;
      document.addEventListener('paste', (e) => {
        logSecurityEvent('CLIPBOARD_PASTE', {
          dataLength: e.clipboardData?.getData('text').length || 0,
        });
      });
    };

    // 8. Detect screen recording software
    const detectScreenRecording = () => {
      if (typeof navigator === 'undefined') return;
      if (
        'mediaDevices' in navigator &&
        'getDisplayMedia' in navigator.mediaDevices
      ) {
        // Screen recording API is available
        logSecurityEvent('SCREEN_RECORDING_API_AVAILABLE', {});
      }
    };

    // Initialize all monitors
    const cleanup1 = monitorActivity();
    detectAutomation();
    monitorConsole();
    const cleanup2 = detectDevTools();
    detectIframeEmbedding();
    monitorResourceLoading();
    monitorClipboard();
    detectScreenRecording();

    // Cleanup
    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Log security events
 */
function logSecurityEvent(eventType: string, data: unknown) {
  // Safety checks for SSR
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

  const event = {
    type: eventType,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    data,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
  }

  // Send to analytics/monitoring service
  try {
    // Send to your backend API
    fetch('/api/security/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    }).catch(() => {
      // Silently fail if API is not available
    });

    // Also send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'security_event', {
        event_category: 'Security',
        event_label: eventType,
        value: 1,
      });
    }
  } catch (error: unknown) {
    // Silently fail
  }
}

/**
 * Security Badge Component
 * Shows security status to users
 */
export function SecurityBadge() {
  // Only show on secure/application routes, not marketing pages
  // Removed from homepage to avoid "internal system" feel
  return null;
}
