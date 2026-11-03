/* RecVoiceNow Service Worker — offline shell + share target handler.
   Bump CACHE_VERSION when publishing updates. */
const CACHE_VERSION = 'recvoicenow-v1.6.0';
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

// Handle Share Target POST from iOS Photos / Files
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Share Target: POST with multipart file
  if (req.method === 'POST' && url.pathname.endsWith('/') || url.pathname.endsWith('/index.html')) {
    event.respondWith((async () => {
      try {
        const formData = await req.formData();
        const file = formData.get('media') || formData.get('file') || formData.get('shared');
        if (file && file.size) {
          // Store temporarily in Cache so the page can pick it up
          const cache = await caches.open(CACHE_VERSION + '-shared');
          const key = './shared-import-' + Date.now();
          await cache.put(key, new Response(file, {
            headers: {
              'Content-Type': file.type || 'application/octet-stream',
              'X-Filename': file.name || 'shared-recording',
              'X-Size': String(file.size)
            }
          }));
          // Redirect to app with a flag so it can import the shared file
          return Response.redirect(url.origin + url.pathname + '?shared=1&key=' + encodeURIComponent(key), 303);
        }
      } catch (e) {
        // fall through
      }
      return Response.redirect(url.origin + url.pathname, 303);
    })());
    return;
  }

  // Normal GET caching
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
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
