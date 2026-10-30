// Clear the obsolete WorkReport cache left by earlier deployments.
// The app owns its own explicit offline cache; this worker must not intercept
// OAuth callbacks or app navigations.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});
