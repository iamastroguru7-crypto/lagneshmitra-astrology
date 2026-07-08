self.addEventListener('install', (e) => {
  e.waitUntil(caches.open('lme-store').then((cache) => cache.addAll(['index.html', 'icon.png'])));
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});
