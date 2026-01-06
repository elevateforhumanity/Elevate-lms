// Service Worker - FORCE UNREGISTER AND CLEAR ALL CACHES
// Version: 2026-01-06-FORCE-CLEAR
// This service worker immediately unregisters itself and clears all caches
// to prevent stale content issues

const CACHE_VERSION = 'v2026-01-06-clear-all';

self.addEventListener('install', (event) => {
  console.log('[SW] Force clearing all caches and unregistering');
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Delete all caches
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => caches.delete(cacheName))
      );
    }).then(() => {
      // Unregister this service worker
      return self.registration.unregister();
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Pass through all requests without any caching
  // Just let the browser handle it normally
  return;
});
