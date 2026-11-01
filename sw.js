/* Offline app shell. Bump CACHE_VERSION when publishing updates. */
const CACHE_VERSION = 'recordvoicenow-v1.3.0';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './logo.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(req).then(cached =>
      cached ||
      fetch(req).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(req, copy));
        }
        return response;
      }).catch(() => caches.match('./index.html'))
    )
  );
});
