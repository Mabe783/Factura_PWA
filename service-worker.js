// Nombre del cache
const CACHE_NAME = 'facturacion-cache-v1';

// Archivos que se guardan para usarse sin conexion
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  
];

// Evento de instalacion: guarda archivos en cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos guardados en cache.');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento de activacion: limpia caches viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Cache viejo eliminado:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Evento de fetch: responde con cache o va a la red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
