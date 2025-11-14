'use client';

import { useEffect } from 'react';

export default function LoginTracker() {
  useEffect(() => {
    (async () => {
      try {
        await fetch('/api/events/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ source: 'LMS_DASHBOARD' })
        });
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.error('Failed to track login:', error);
      }
    })();
  }, []);

  return null;
}
