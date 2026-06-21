const CACHE_NAME = 'blind-editor-v2';
const ASSETS = [
  'index.html',
  'manifest.json',
  'sw.js'
];

// Installs the app files straight into the phone's local storage cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Controls loading files from the local storage cache instead of the internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
