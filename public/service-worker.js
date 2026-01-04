// Service Worker - Network First Strategy for HTML, Cache for Assets
const CACHE_NAME = 'elevateedu-v2-' + Date.now();
const STATIC_CACHE = 'static-v2';

// Only cache static assets, never HTML pages
const STATIC_ASSETS = ['/manifest.json', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Ignore cache errors during install
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Never cache HTML pages - always fetch from network
  if (
    request.headers.get('accept')?.includes('text/html') ||
    url.pathname === '/'
  ) {
    event.respondWith(
      fetch(request).catch(() => {
        // If offline, show a basic offline page
        return new Response('Offline', { status: 503 });
      })
    );
    return;
  }

  // For static assets: Cache first, then network
  if (
    url.pathname.startsWith('/_next/static') ||
    url.pathname.startsWith('/images') ||
    url.pathname.startsWith('/videos') ||
    STATIC_ASSETS.includes(url.pathname)
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request).then((fetchResponse) => {
            if (fetchResponse && fetchResponse.status === 200) {
              const responseToCache = fetchResponse.clone();
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return fetchResponse;
          })
        );
      })
    );
    return;
  }

  // For everything else: Network first
  event.respondWith(fetch(request));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches
          if (cacheName !== STATIC_CACHE && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
