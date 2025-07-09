// Nombre del cache
const CACHE_NAME = 'Facturacion-PWA-V1';

// Archivos que se guardan para usarse sin conexion
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/app.js',
  '/icono.png',
  '/icono2.png'
  
];

// Evento de instalacion: guarda archivos en cache
self.addEventListener('install', (event)=> {
  console.log('Servicio Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
       console.log('Servicio Worker: Cacheando archivos...ok');
        return cache.addAll(archivosParaCachear);
      })
  );
});

// evento fetch que se ejecuta cuando se hace una petición a la PWA
self.addEventListener('fetch', (event) => {
    console.log('Servicio Worker: Interceptando petición a:', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then((respuestaCache) => {
                // si hay respuesta en el cache, la devuelve
                if (respuestaCache) {
                    console.log('Servicio Worker: Devolviendo del cache:', event.request.url);
                    return respuestaCache;
                }
                // si no hay respuesta en el cache, hace la petición a la red
                console.log('Servicio Worker: Haciendo petición a la red:', event.request.url);
                return fetch(event.request);
            })
    );
});
