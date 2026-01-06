"use client";

import { useEffect } from 'react';

export function UnregisterServiceWorker() {
  useEffect(() => {
    // NUCLEAR SERVICE WORKER CLEANUP
    // This runs IMMEDIATELY on page load to kill any service workers
    // before they can serve cached content
    
    if ('serviceWorker' in navigator) {
      console.log('[SW KILL] Starting aggressive service worker cleanup');
      
      // Step 1: Unregister ALL service workers immediately
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        console.log(`[SW KILL] Found ${registrations.length} service workers to kill`);
        
        const unregisterPromises = registrations.map((registration) => {
          console.log(`[SW KILL] Unregistering: ${registration.scope}`);
          return registration.unregister();
        });
        
        return Promise.all(unregisterPromises);
      }).then((results) => {
        const successCount = results.filter(Boolean).length;
        console.log(`[SW KILL] Successfully unregistered ${successCount} service workers`);
      }).catch((error) => {
        console.error('[SW KILL] Error unregistering service workers:', error);
      });

      // Step 2: Clear ALL caches aggressively
      if ('caches' in window) {
        caches.keys().then((cacheNames) => {
          console.log(`[SW KILL] Found ${cacheNames.length} caches to delete`);
          
          const deletePromises = cacheNames.map((cacheName) => {
            console.log(`[SW KILL] Deleting cache: ${cacheName}`);
            return caches.delete(cacheName);
          });
          
          return Promise.all(deletePromises);
        }).then(() => {
          console.log('[SW KILL] All caches cleared successfully');
        }).catch((error) => {
          console.error('[SW KILL] Error clearing caches:', error);
        });
      }
      
      // Step 3: Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_KILLED') {
          console.log('[SW KILL] Service worker confirmed killed, reloading page');
          // Give it a moment to fully unregister
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
      });
    }
  }, []);

  return null;
}
