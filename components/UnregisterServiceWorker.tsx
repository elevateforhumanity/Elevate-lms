"use client";

import { useEffect } from 'react';

export function UnregisterServiceWorker() {
  useEffect(() => {
    // NUCLEAR SERVICE WORKER CLEANUP
    // This runs IMMEDIATELY on page load to kill any service workers
    // before they can serve cached content
    
    if ('serviceWorker' in navigator) {
      
      // Step 1: Unregister ALL service workers immediately
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        
        const unregisterPromises = registrations.map((registration) => {
          return registration.unregister();
        });
        
        return Promise.all(unregisterPromises);
      }).then((results) => {
        const successCount = results.filter(Boolean).length;
      }).catch((error) => {
      });

      // Step 2: Clear ALL caches aggressively
      if ('caches' in window) {
        caches.keys().then((cacheNames) => {
          
          const deletePromises = cacheNames.map((cacheName) => {
            return caches.delete(cacheName);
          });
          
          return Promise.all(deletePromises);
        }).then(() => {
        }).catch((error) => {
        });
      }
      
      // Step 3: Listen for service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_KILLED') {
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
