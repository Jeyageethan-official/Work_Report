const CACHE_VERSION = 'work-report-cache-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  './icons/icon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key !== CACHE_VERSION ? caches.delete(key) : Promise.resolve())))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isDocument = request.mode === 'navigate' || request.destination === 'document';

  if (isDocument) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const clone = networkResponse.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put('./index.html', clone));
          return networkResponse;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  if (!isSameOrigin) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const networkFetch = fetch(request)
        .then((networkResponse) => {
          const clone = networkResponse.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
          return networkResponse;
        })
        .catch(() => cachedResponse);
      return cachedResponse || networkFetch;
    })
  );
});
