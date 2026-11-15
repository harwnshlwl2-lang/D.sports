const CACHE = 'dsports-v2';
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(['/', '/index.html', '/config.js']).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin || u.pathname.startsWith('/api/') || u.pathname.startsWith('/.netlify/')) return;
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        // نخزّن الردود الناجحة فقط (لا 404 ولا 206)
        if (r.ok && r.status === 200) { const c = r.clone(); caches.open(CACHE).then((x) => x.put(e.request, c)).catch(() => {}); }
        return r;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('/index.html')))
  );
});
// الضغط على الإشعار يفتح الموقع (أو ينتقل لتبويب مفتوح)
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) { c.navigate && c.navigate(url).catch(() => {}); return c.focus(); } }
      return self.clients.openWindow(url);
    })
  );
});
