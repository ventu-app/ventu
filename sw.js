const CACHE_NAME = 'ventu-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/biblioteca.html',
  '/assets/css/tokens.css',
  '/assets/css/header.css',
  '/assets/js/header.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});