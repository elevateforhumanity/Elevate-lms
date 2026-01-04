// SupersonicFastCash Service Worker
// Real offline functionality, caching, and push notifications

const CACHE_NAME = 'supersonic-v1';
const RUNTIME_CACHE = 'supersonic-runtime';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/supersonic-fast-cash',
  '/supersonic-fast-cash/diy/start',
  '/supersonic-fast-cash/portal',
  '/supersonic-fast-cash/training',
  '/offline.html',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // API requests - network first, cache fallback
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache successful responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached version if available
          return caches.match(request);
        })
    );
    return;
  }

  // Static assets - cache first, network fallback
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone and cache
        const responseClone = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, responseClone);
        });

        return response;
      }).catch(() => {
        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-tax-return') {
    event.waitUntil(syncTaxReturn());
  }
  if (event.tag === 'sync-documents') {
    event.waitUntil(syncDocuments());
  }
});

async function syncTaxReturn() {
  // Get pending tax returns from IndexedDB
  const db = await openDB();
  const pending = await db.getAll('pending-returns');

  for (const taxReturn of pending) {
    try {
      const response = await fetch('/api/supersonic-fast-cash/diy/tax-return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taxReturn.data),
      });

      if (response.ok) {
        await db.delete('pending-returns', taxReturn.id);
        // Notify user of success
        self.registration.showNotification('Tax Return Saved', {
          body: 'Your tax return has been synced successfully',
          icon: '/icon-192.png',
          badge: '/icon-96.png',
        });
      }
    } catch (error) {
    }
  }
}

async function syncDocuments() {
  // Sync uploaded documents
  const db = await openDB();
  const pending = await db.getAll('pending-documents');

  for (const doc of pending) {
    try {
      const formData = new FormData();
      formData.append('file', doc.file);
      formData.append('email', doc.email);
      formData.append('phone', doc.phone);

      const response = await fetch('/api/tax/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await db.delete('pending-documents', doc.id);
      }
    } catch (error) {
    }
  }
}

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};

  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icon-192.png',
    badge: '/icon-96.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/supersonic-fast-cash/portal',
    },
    actions: [
      {
        action: 'open',
        title: 'View',
      },
      {
        action: 'close',
        title: 'Dismiss',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'SupersonicFastCash', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    const url = event.notification.data.url;
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Helper: Open IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('supersonic-db', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pending-returns')) {
        db.createObjectStore('pending-returns', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('pending-documents')) {
        db.createObjectStore('pending-documents', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}
