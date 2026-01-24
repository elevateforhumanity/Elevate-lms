// Service Worker for Elevate for Humanity PWA
// Version 3.0 - Fixed routing for SPA navigation
const CACHE_VERSION = 'v3';
const STATIC_CACHE = `elevate-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `elevate-dynamic-${CACHE_VERSION}`;
const COURSE_CACHE = `elevate-courses-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// Assets to cache on install (critical path)
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/manifest.json',
];

// Patterns for different caching strategies
const CACHE_STRATEGIES = {
  // Cache-first for static assets
  static: [
    /\.(js|css|woff2?|ttf|eot)$/,
    /\/_next\/static\//,
    /\/images\//,
    /\/icons\//,
  ],
  // Network-first for dynamic content
  networkFirst: [
    /\/courses\//,
    /\/programs\//,
    /\/lms\//,
  ],
  // Stale-while-revalidate for API data
  staleWhileRevalidate: [
    /\/api\/public\//,
  ],
  // Never cache
  noCache: [
    /\/api\/auth\//,
    /\/api\/enroll\//,
    /\/api\/payment\//,
    /supabase/,
    /analytics/,
    /gtag/,
  ],
};

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name.startsWith('elevate-') && 
                     !name.includes(CACHE_VERSION);
            })
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Helper: Check if URL matches any pattern
function matchesPattern(url, patterns) {
  return patterns.some((pattern) => pattern.test(url));
}

// Helper: Cache-first strategy
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return null;
  }
}

// Helper: Network-first strategy
async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return caches.match(request);
  }
}

// Helper: Stale-while-revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);
  
  return cached || fetchPromise;
}

// Fetch event - Smart caching based on request type
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external URLs
  if (url.origin !== self.location.origin) return;
  
  // Skip no-cache patterns
  if (matchesPattern(request.url, CACHE_STRATEGIES.noCache)) return;
  
  // Handle navigation requests (SPA routing)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Try to return cached version first
          return caches.match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL));
        })
    );
    return;
  }
  
  // Determine caching strategy for non-navigation requests
  let responsePromise;
  
  if (matchesPattern(request.url, CACHE_STRATEGIES.static)) {
    // Static assets: cache-first
    responsePromise = cacheFirst(request, STATIC_CACHE);
  } else if (matchesPattern(request.url, CACHE_STRATEGIES.staleWhileRevalidate)) {
    // API data: stale-while-revalidate
    responsePromise = staleWhileRevalidate(request, DYNAMIC_CACHE);
  } else if (matchesPattern(request.url, CACHE_STRATEGIES.networkFirst)) {
    // Course content: network-first with course cache
    responsePromise = networkFirst(request, COURSE_CACHE);
  } else {
    // Default: network-first with dynamic cache
    responsePromise = networkFirst(request, DYNAMIC_CACHE);
  }
  
  event.respondWith(
    responsePromise.then((response) => {
      if (response) return response;
      
      return new Response('Offline', { 
        status: 503,
        statusText: 'Service Unavailable',
      });
    })
  );
});

// Message event - Handle cache management from app
self.addEventListener('message', (event) => {
  const { type, payload } = event.data || {};
  
  switch (type) {
    case 'CACHE_COURSE':
      // Cache a specific course for offline access
      if (payload?.urls) {
        caches.open(COURSE_CACHE).then((cache) => {
          cache.addAll(payload.urls);
        });
      }
      break;
      
    case 'CLEAR_COURSE_CACHE':
      // Clear course cache
      caches.delete(COURSE_CACHE);
      break;
      
    case 'GET_CACHE_SIZE':
      // Report cache size back to app
      Promise.all([
        caches.open(STATIC_CACHE).then(c => c.keys()),
        caches.open(DYNAMIC_CACHE).then(c => c.keys()),
        caches.open(COURSE_CACHE).then(c => c.keys()),
      ]).then(([staticKeys, dynamicKeys, courseKeys]) => {
        event.source.postMessage({
          type: 'CACHE_SIZE',
          payload: {
            static: staticKeys.length,
            dynamic: dynamicKeys.length,
            courses: courseKeys.length,
          },
        });
      });
      break;
  }
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-enrollment') {
    event.waitUntil(syncEnrollmentData());
  }
});

async function syncEnrollmentData() {
  // Get pending enrollments from IndexedDB and sync
  // This would be implemented with actual IndexedDB logic
  console.log('[SW] Syncing enrollment data...');
}
