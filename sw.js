/* RecordVoiceNow V2.5 — offline shell + share target */
const CACHE_VERSION = 'recvoicenow-v2.5';
const APP_SHELL = [
  './', './index.html', './manifest.json',
  './logo.svg', './logo-header.png', './icon-192.png', './icon-512.png', './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_VERSION).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION && !k.includes('-shared')).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method === 'POST' && (url.pathname.endsWith('/') || url.pathname.endsWith('/index.html'))) {
    event.respondWith((async () => {
      try {
        const formData = await req.formData();
        const file = formData.get('media') || formData.get('file');
        if (file && file.size) {
          const cache = await caches.open(CACHE_VERSION + '-shared');
          const key = './shared-' + Date.now();
          await cache.put(key, new Response(file, {
            headers: {
              'Content-Type': file.type || 'application/octet-stream',
              'X-Filename': file.name || 'shared-recording'
            }
          }));
          return Response.redirect(url.origin + url.pathname + '?shared=1&key=' + encodeURIComponent(key), 303);
        }
      } catch (_) {}
      return Response.redirect(url.origin + url.pathname, 303);
    })());
    return;
  }

  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then(cached =>
      cached || fetch(req).then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'))
    )
  );
});
