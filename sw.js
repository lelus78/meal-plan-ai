// Service Worker per Meal Plan AI - Ottimizzato
// Versione cache - incrementa ad ogni modifica importante
const CACHE_VERSION = 'v1.1.0';
const CACHE_NAME = `meal-plan-ai-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

// File da cachare per funzionamento offline
const urlsToCache = [
  './piano_dieta_mensile_IA.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

// Assets esterni - cachati runtime
const EXTERNAL_RESOURCES = [
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.gstatic.com'
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
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
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

// Strategia di caching ottimizzata
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora richieste non-GET, chrome-extension, e non-http
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Strategia per API Gemini: Network Only (no cache per dati dinamici)
  if (url.hostname.includes('generativelanguage.googleapis.com')) {
    event.respondWith(fetch(request));
    return;
  }

  // Strategia per assets statici: Cache First con network fallback
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.webmanifest') || url.pathname === './' || url.pathname === '') {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[SW] Cache hit:', url.pathname);
            return cachedResponse;
          }
          return fetch(request).then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          });
        })
    );
    return;
  }

  // Strategia per risorse esterne (CDN, fonts): Stale-While-Revalidate
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseToCache);
              });
            }
            return response;
          })
          .catch(() => cachedResponse); // Fallback a cache se network fails

        // Ritorna cache immediatamente, aggiorna in background
        return cachedResponse || fetchPromise;
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
