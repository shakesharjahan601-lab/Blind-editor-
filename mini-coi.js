/*! mini-coi - MIT License - https://github.com/WebReflection/mini-coi */
if (typeof window === 'undefined') {
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
  self.addEventListener('fetch', e => {
    if (e.request.mode === 'navigate') {
      e.respondWith(fetch(e.request).then(r => {
        const h = new Headers(r.headers);
        h.set('Cross-Origin-Opener-Policy', 'same-origin');
        h.set('Cross-Origin-Embedder-Policy', 'require-corp');
        return new Response(r.body, { status: r.status, statusText: r.statusText, headers: h });
      }));
    }
  });
} else if (!window.crossOriginIsolated && location.protocol === 'https:') {
  navigator.serviceWorker.register(document.currentScript.src, { scope: './' }).then(() => location.reload());
}
