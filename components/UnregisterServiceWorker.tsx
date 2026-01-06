"use client";

import { useEffect } from 'react';

export function UnregisterServiceWorker() {
  useEffect(() => {
    // AGGRESSIVE SERVICE WORKER CLEANUP
    // Force unregister ALL service workers and clear ALL caches
    
    if ('serviceWorker' in navigator) {
      // Unregister all service workers
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        console.log(`[SW Cleanup] Found ${registrations.length} service workers`);
        for (const registration of registrations) {
          registration.unregister().then((success) => {
            if (success) {
              console.log('[SW Cleanup] Service worker unregistered successfully');
              // Force reload after unregistering to get fresh content
              if (registrations.length > 0) {
                window.location.reload();
              }
            }
          });
        }
      });

      // Clear ALL caches aggressively
      if ('caches' in window) {
        caches.keys().then((cacheNames) => {
          console.log(`[SW Cleanup] Clearing ${cacheNames.length} caches`);
          return Promise.all(
            cacheNames.map((cacheName) => {
              console.log(`[SW Cleanup] Deleting cache: ${cacheName}`);
              return caches.delete(cacheName);
            })
          );
        }).then(() => {
          console.log('[SW Cleanup] All caches cleared');
        });
      }
    }
  }, []);

  return null;
}
