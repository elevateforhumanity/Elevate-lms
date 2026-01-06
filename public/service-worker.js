// NUCLEAR SERVICE WORKER KILL SWITCH
// This service worker immediately unregisters itself and clears ALL caches
// Deploy this to /sw.js to override any existing service worker

const VERSION = 'kill-switch-2026-01-06';

console.log('[SW KILL] Service worker kill switch activated');

// Immediately skip waiting and activate
self.addEventListener('install', (event) => {
  console.log('[SW KILL] Installing kill switch');
  self.skipWaiting();
});

// Delete ALL caches and unregister
self.addEventListener('activate', (event) => {
  console.log('[SW KILL] Activating kill switch - clearing all caches');
  
  event.waitUntil(
    Promise.all([
      // Delete ALL caches
      caches.keys().then((cacheNames) => {
        console.log(`[SW KILL] Found ${cacheNames.length} caches to delete`);
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log(`[SW KILL] Deleting cache: ${cacheName}`);
            return caches.delete(cacheName);
          })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim(),
    ]).then(() => {
      console.log('[SW KILL] All caches cleared, unregistering service worker');
      // Unregister this service worker
      return self.registration.unregister();
    }).then(() => {
      console.log('[SW KILL] Service worker unregistered successfully');
      // Notify all clients to reload
      return self.clients.matchAll();
    }).then((clients) => {
      clients.forEach((client) => {
        console.log('[SW KILL] Notifying client to reload');
        client.postMessage({
          type: 'SW_KILLED',
          message: 'Service worker unregistered, please reload'
        });
      });
    })
  );
});

// Pass through all fetch requests without caching
self.addEventListener('fetch', (event) => {
  // Do nothing - let requests go straight to network
  return;
});

// Log any messages
self.addEventListener('message', (event) => {
  console.log('[SW KILL] Received message:', event.data);
});
