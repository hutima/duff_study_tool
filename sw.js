// Service worker for the Greek Flashcards PWA.
//
// GitHub Pages note: all app-shell URLs are resolved relative to the
// service worker registration scope so this works both at a domain root
// and at a project path such as https://user.github.io/repository/.
const CACHE_NAME = 'greek-flashcards-pwa-v48-github-pages';
const BASE_URL = new URL('./', self.registration.scope);

const APP_SHELL_PATHS = [
  './',
  'index.html',
  'pages/memorization.html',
  'styles.css?v=40',
  'manifest.json?v=25',
  'favicon.svg?v=25',
  'js/data/words.js?v=32',
  'js/data/morphology.js?v=34',
  'js/data/supplemental.js?v=31',
  'js/data/grammar.js?v=32',
  'js/data/memorization.js?v=32',
  'js/data/parsing_examples.js?v=26',
  'js/data/concept_examples.js?v=32',
  'js/data/grammar_examples.js?v=26',
  'js/data/setMeta.js?v=26',
  'js/logic/pos_logic.js?v=33',
  'js/data/reader.js?v=33',
  'js/data/reader_verse_literals.js?v=3',
  'js/data/reader_translations.js?v=4',
  'js/app/main.js?v=45',
  'js/data/supplementals/week_1_paradigms.js?v=2',
  'js/data/supplementals/week_2_paradigms.js?v=2',
  'js/data/supplementals/week_3_paradigms.js?v=2',
  'js/data/supplementals/week_4_paradigms.js?v=2',
  'js/data/supplementals/week_5_paradigms.js?v=2',
  'js/data/supplementals/week_6_paradigms.js?v=2',
  'js/data/supplementals/week_7_paradigms.js?v=2',
  'js/data/supplementals/week_8_paradigms.js?v=2',
  'js/data/supplementals/week_1_supplemental.js?v=3',
  'js/data/supplementals/adj_paradigms.js?v=3',
  'js/data/supplementals/w3o_supplemental.js?v=2',
  'js/data/supplementals/w6o_supplemental.js?v=2',
  'js/data/supplementals/w7o_supplemental.js?v=2',
  'js/data/supplementals/w8o_supplemental.js?v=2',
  'js/data/supplementals/paradigm_morphology.js?v=2',
  'js/app/main.bundle.js?v=31',
  'js/utils/helpers.js?v=26',
  'js/utils/time.js?v=26',
  'js/utils/storage.js?v=26',
  'js/utils/greekSort.js?v=26',
  'js/domain/srs/constants.js?v=26',
  'js/domain/srs/scheduler.js?v=26',
  'js/domain/srs/confidence.js?v=26',
  'js/domain/gamification/levels.js?v=26',
  'js/domain/gamification/usageStats.js?v=30',
  'js/domain/deck/ordering.js?v=32',
  'js/domain/deck/filters.js?v=33',
  'js/domain/grammar/explanations.js?v=27',
  'js/state/migrations.js?v=26',
  'js/state/store.js?v=26',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png?v=25'
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
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then(cached => cached || caches.match(INDEX_URL)))
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
