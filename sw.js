const CACHE_NAME = 'editor-pro-v1';

// We only cache the bare minimum structure to let the app open offline
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  self.clients.claim();
});

// NETWORK-FIRST STRATEGY: Always pulls the latest GitHub changes automatically
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // If the network works, save a copy to the cache and return the fresh page
        if (response && response.status === 200) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseCopy);
          });
        }
        return response;
      })
      .catch(() => {
        // Only if there is NO internet, use the offline cached copy
        return caches.match(e.request);
      })
  );
});
