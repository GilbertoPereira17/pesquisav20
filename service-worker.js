const cacheName = 'site-static-v20';
const assets = [
    '/',
    '/pesquisav20/index.html',
    '/pesquisav20/styles.css',
    '/pesquisav20/script.js',
    '/pesquisav20/manifest.json',
    '/pesquisav20/images/icon-192x192.png',
    '/pesquisav20/images/icon-512x512.png',
    // Adicione outros recursos necessários
];

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache se disponível
        return response || fetch(event.request).then(fetchResponse => {
          // Se o recurso for buscado com sucesso na rede, adicione-o ao cache
          return caches.open(cacheName).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
  );
});