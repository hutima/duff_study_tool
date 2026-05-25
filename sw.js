// Service worker for the Greek Flashcards PWA.
//
// GitHub Pages note: all app-shell URLs are resolved relative to the
// service worker registration scope so this works both at a domain root
// and at a project path such as https://user.github.io/repository/.
const CACHE_NAME = 'greek-flashcards-pwa-v181-github-pages';
const BASE_URL = new URL('./', self.registration.scope);

const APP_SHELL_PATHS = [
  './',
  'index.html',
  'pages/memorization.html',
  'styles.css?v=181',
  'manifest.json?v=181',
  'favicon.svg?v=181',
  'js/data/words.js?v=181',
  'js/data/morphology.js?v=181',
  'js/data/lemma_inventory.js?v=181',
  'js/data/supplemental.js?v=181',
  'js/data/grammar.js?v=181',
  'js/data/parsing_examples.js?v=181',
  'js/data/concept_examples.js?v=181',
  'js/data/grammar_examples.js?v=181',
  'js/data/setMeta.js?v=181',
  'js/logic/pos_logic.js?v=181',
  'js/data/reader.js?v=181',
  'js/data/reader_verse_literals.js?v=181',
  'js/data/reader_translations.js?v=181',
  'js/app/main.js?v=181',
  'js/data/supplementals/week_1_paradigms.js?v=181',
  'js/data/supplementals/week_2_paradigms.js?v=181',
  'js/data/supplementals/week_3_paradigms.js?v=181',
  'js/data/supplementals/week_4_paradigms.js?v=181',
  'js/data/supplementals/second_aorist_flip.js?v=181',
  'js/data/supplementals/week_5_paradigms.js?v=181',
  'js/data/supplementals/w6_aorist_passive_flip.js?v=181',
  'js/data/supplementals/w6_perfect_active_flip.js?v=181',
  'js/data/supplementals/w8_mi_verb_principal_parts_flip.js?v=181',
  'js/data/supplementals/week_6_paradigms.js?v=181',
  'js/data/supplementals/week_7_paradigms.js?v=181',
  'js/data/supplementals/week_8_paradigms.js?v=181',
  'js/data/supplementals/week_1_supplemental.js?v=181',
  'js/data/supplementals/adj_paradigms.js?v=181',
  'js/data/supplementals/w3o_supplemental.js?v=181',
  'js/data/supplementals/w6o_supplemental.js?v=181',
  'js/data/supplementals/w7o_supplemental.js?v=181',
  'js/data/supplementals/w8o_supplemental.js?v=181',
  'js/data/supplementals/paradigm_morphology.js?v=181',
  'js/data/supplementals/stem_change_drills.js?v=181',
  'js/data/advanced/advanced_01.js?v=181',
  'js/data/advanced/advanced_02.js?v=181',
  'js/data/advanced/advanced_03.js?v=181',
  'js/data/advanced/advanced_04.js?v=181',
  'js/data/advanced/advanced_05.js?v=181',
  'js/data/advanced/advanced_06.js?v=181',
  'js/data/advanced/advanced_07.js?v=181',
  'js/data/advanced/advanced_08.js?v=181',
  'js/data/advanced/advanced_09.js?v=181',
  'js/data/advanced/advanced_10.js?v=181',
  'js/data/advanced/advanced_11.js?v=181',
  'js/data/advanced/advanced_12.js?v=181',
  'js/data/advanced/advanced_13.js?v=181',
  'js/data/advanced/advanced_14.js?v=181',
  'js/data/advanced/advanced_15.js?v=181',
  'js/data/advanced/advanced_16.js?v=181',
  'js/data/advanced/advanced_17.js?v=181',
  'js/data/advanced/advanced_18.js?v=181',
  'js/data/advanced/advanced_19.js?v=181',
  'js/data/advanced/advanced_20.js?v=181',
  'js/data/advanced/advanced_21.js?v=181',
  'js/data/advanced/advanced_22.js?v=181',
  'js/data/advanced/advanced_23.js?v=181',
  'js/data/advanced/advanced_24.js?v=181',
  'js/data/advanced/advanced_25.js?v=181',
  'js/utils/helpers.js?v=181',
  'js/utils/time.js?v=181',
  'js/utils/storage.js?v=181',
  'js/utils/greekSort.js?v=181',
  'js/utils/clickShield.js?v=181',
  'js/domain/srs/constants.js?v=181',
  'js/domain/srs/scheduler.js?v=181',
  'js/domain/srs/confidence.js?v=181',
  'js/domain/gamification/levels.js?v=181',
  'js/domain/gamification/usageStats.js?v=181',
  'js/domain/gamification/xp.js?v=181',
  'js/domain/deck/ordering.js?v=181',
  'js/domain/deck/filters.js?v=181',
  'js/domain/grammar/explanations.js?v=181',
  'js/domain/grammar/morph_steps.js?v=181',
  'js/domain/grammar/paradigm_focus.js?v=181',
  'js/ui/reader.js?v=181',
  'js/ui/keyboard.js?v=181',
  'js/ui/toast.js?v=181',
  'js/ui/touchTapBridge.js?v=181',
  'js/ui/charts.js?v=181',
  'js/ui/modals.js?v=181',
  'js/ui/progress.js?v=181',
  'js/ui/render.js?v=181',
  'js/ui/selectors.js?v=181',
  'js/ui/navigation.js?v=181',
  'js/ui/analytics.js?v=181',
  'js/state/migrations.js?v=181',
  'js/state/store.js?v=181',
  'js/state/runtime.js?v=181',
  'js/state/persistence.js?v=181',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png?v=181'
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

  // Static assets: cache first, then network. ignoreSearch lets bare ES
  // module imports (no ?v=) match precached entries that include ?v=N.
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => {
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
