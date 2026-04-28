// Service worker for the Greek Flashcards PWA.
//
// GitHub Pages note: all app-shell URLs are resolved relative to the
// service worker registration scope so this works both at a domain root
// and at a project path such as https://user.github.io/repository/.
const CACHE_NAME = 'greek-flashcards-pwa-v28-github-pages';
const BASE_URL = new URL('./', self.registration.scope);

const APP_SHELL_PATHS = [
  './',
  'index.html',
  'styles.css?v=27',
  'manifest.json?v=24',
  'favicon.svg?v=24',
  'js/data/words.js?v=27',
  'js/data/morphology.js?v=27',
  'js/data/supplemental.js?v=27',
  'js/data/grammar.js?v=27',
  'js/data/parsing_examples.js?v=25',
  'js/data/concept_examples.js?v=25',
  'js/data/grammar_examples.js?v=25',
  'js/data/setMeta.js?v=25',
  'js/logic/pos_logic.js?v=27',
  'js/app/main.js?v=27',
  'js/app/main.bundle.js?v=27',
  'js/utils/helpers.js?v=25',
  'js/utils/time.js?v=25',
  'js/utils/storage.js?v=25',
  'js/utils/greekSort.js?v=25',
  'js/domain/srs/constants.js?v=25',
  'js/domain/srs/scheduler.js?v=25',
  'js/domain/srs/confidence.js?v=25',
  'js/domain/gamification/levels.js?v=25',
  'js/domain/deck/ordering.js?v=27',
  'js/domain/deck/filters.js?v=25',
  'js/domain/grammar/explanations.js?v=25',
  'js/state/migrations.js?v=25',
  'js/state/store.js?v=25',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png?v=24'
];

const APP_SHELL = APP_SHELL_PATHS.map(path => new URL(path, BASE_URL).toString());
const INDEX_URL = new URL('index.html', BASE_URL).toString();

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Navigation: network first, then cached app shell.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(INDEX_URL, copy));
          return res;
        })
        .catch(() => caches.match(INDEX_URL))
    );
    return;
  }

  // Static assets: cache first, then network.
  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        const copy = res.clone();
        if (req.url.startsWith(BASE_URL.origin)) {
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});
