const CACHE_NAME = 'leitor-codigos-cache-v1';
const urlsToCache = [
  './index.html',
  './historico.css',
  './leitor.css',
  './vencidos.css',
  './script.js',
  'https://unpkg.com/html5-qrcode@2.3.8/minified/html5-qrcode.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});