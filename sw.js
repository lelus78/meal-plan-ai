// Service Worker per Meal Plan AI
// Versione cache - incrementa ad ogni modifica importante
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `meal-plan-ai-${CACHE_VERSION}`;

// File da cachare per funzionamento offline
const urlsToCache = [
  './piano_dieta_mensile_IA.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
];

// Installazione Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installazione Service Worker...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache aperta');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] Tutti i file cachati con successo');
        return self.skipWaiting(); // Attiva immediatamente
      })
      .catch((error) => {
        console.error('[SW] Errore durante il caching:', error);
      })
  );
});

// Attivazione Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Attivazione Service Worker...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Elimina vecchie cache
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Eliminazione vecchia cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker attivato');
        return self.clients.claim(); // Prendi controllo di tutte le pagine
      })
  );
});

// Strategia di caching: Network First, fallback su Cache
self.addEventListener('fetch', (event) => {
  // Ignora richieste non-GET e API esterne (Gemini)
  if (event.request.method !== 'GET' ||
      event.request.url.includes('generativelanguage.googleapis.com')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se la risposta è valida, clonala e salvala in cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Se il network fallisce, usa la cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              console.log('[SW] Serving from cache:', event.request.url);
              return response;
            }
            // Se non c'è in cache, mostra pagina offline (opzionale)
            return caches.match('./piano_dieta_mensile_IA.html');
          });
      })
  );
});

// Gestione messaggi dal client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        console.log('[SW] Cache pulita');
      })
    );
  }
});

// Notifiche push (per future implementazioni)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nuovo aggiornamento disponibile!',
    icon: './icon-192.png',
    badge: './icon-192.png',
    vibrate: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification('Piano Dieta Ambra', options)
  );
});

console.log('[SW] Service Worker registrato - Versione:', CACHE_VERSION);
