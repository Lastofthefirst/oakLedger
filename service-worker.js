const CACHE_NAME = 'oak-ledger-v2';
const urlsToCache = [
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdn.tailwindcss.com'
];

// Install service worker and cache static resources (not HTML)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('Cache installation failed:', err);
      })
  );
  self.skipWaiting();
});

// Fetch: network-first for HTML (always get fresh), cache-first for everything else
self.addEventListener('fetch', event => {
  // Skip non-GET and non-same-origin requests
  if (event.request.method !== 'GET') return;

  const isHtml = event.request.destination === 'document' ||
    event.request.headers.get('accept')?.includes('text/html');

  if (isHtml) {
    // Network-first for HTML pages — always fetch fresh, fall back to cache
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Cache the fresh HTML for next time
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Stale-while-revalidate for assets — serve cache, update in background
    event.respondWith(
      caches.match(event.request)
        .then(cached => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              if (networkResponse.status === 200) {
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(event.request, networkResponse.clone());
                });
              }
              return networkResponse;
            })
            .catch(() => {});
          return cached || fetchPromise;
        })
    );
  }
});

// Activate: delete old caches and take control immediately
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
