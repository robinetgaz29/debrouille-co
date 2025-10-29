const CACHE = 'debrouille-v1';
const ASSETS = ['/', '/index.html', '/css/styles.css', '/js/app.js', '/catalog.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r=>r || fetch(e.request)));
});
