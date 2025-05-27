
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('fafa-training-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/script_final.js',
        '/manifest.json',
        '/favicon.ico',
        '/icon-pwa-512.png',
        '/defis.json',
        '/exercices_fafa.json',
        '/fr.json',
        '/en.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
