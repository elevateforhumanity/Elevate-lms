// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "";

if (dsn) {
  Sentry.init({
    dsn,

    // Performance monitoring - sample 10% in production
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,

    // Keep PII off by default for privacy compliance
    sendDefaultPii: false,

    environment: process.env.NODE_ENV || "development",

    // Enable automatic error capturing
    autoSessionTracking: true,

    // Capture unhandled promise rejections
    integrations: [
      Sentry.captureConsoleIntegration({
        levels: ['error'],
      }),
    ],

    // Filter out non-critical errors
    beforeSend(event) {
      // Don't send events in development unless explicitly enabled
      if (process.env.NODE_ENV === 'development' && !process.env.SENTRY_DEBUG) {
        return null;
      }
      return event;
    },
  });
}
