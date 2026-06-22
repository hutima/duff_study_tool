// Service worker for the Greek Flashcards PWA.
//
// GitHub Pages note: all app-shell URLs are resolved relative to the
// service worker registration scope so this works both at a domain root
// and at a project path such as https://user.github.io/repository/.
const CACHE_NAME = 'greek-flashcards-pwa-v314-github-pages';
const BASE_URL = new URL('./', self.registration.scope);

const APP_SHELL_PATHS = [
  './',
  'index.html',
  'pages/memorization.html',
  'styles.css?v=314',
  'fonts/gentium-plus-latin-400-normal.woff2?v=314',
  'fonts/gentium-plus-latin-ext-400-normal.woff2?v=314',
  'fonts/gentium-plus-greek-400-normal.woff2?v=314',
  'fonts/gentium-plus-greek-ext-400-normal.woff2?v=314',
  'fonts/gentium-plus-latin-400-italic.woff2?v=314',
  'fonts/gentium-plus-latin-ext-400-italic.woff2?v=314',
  'fonts/gentium-plus-greek-400-italic.woff2?v=314',
  'fonts/gentium-plus-greek-ext-400-italic.woff2?v=314',
  'fonts/gentium-plus-latin-700-normal.woff2?v=314',
  'fonts/gentium-plus-latin-ext-700-normal.woff2?v=314',
  'fonts/gentium-plus-greek-700-normal.woff2?v=314',
  'fonts/gentium-plus-greek-ext-700-normal.woff2?v=314',
  'fonts/gentium-plus-latin-700-italic.woff2?v=314',
  'fonts/gentium-plus-latin-ext-700-italic.woff2?v=314',
  'fonts/gentium-plus-greek-700-italic.woff2?v=314',
  'fonts/gentium-plus-greek-ext-700-italic.woff2?v=314',
  'fonts/noto-sans-latin-normal.woff2?v=314',
  'fonts/noto-sans-latin-ext-normal.woff2?v=314',
  'fonts/noto-sans-greek-normal.woff2?v=314',
  'fonts/noto-sans-greek-ext-normal.woff2?v=314',
  'fonts/noto-sans-latin-italic.woff2?v=314',
  'fonts/noto-sans-latin-ext-italic.woff2?v=314',
  'fonts/noto-sans-greek-italic.woff2?v=314',
  'fonts/noto-sans-greek-ext-italic.woff2?v=314',
  'manifest.json?v=314',
  'favicon.svg?v=314',
  'js/data/words.js?v=314',
  'js/data/morphology.js?v=314',
  'js/data/lemma_inventory.js?v=314',
  'js/data/supplemental.js?v=314',
  'js/data/grammar.js?v=314',
  'js/data/parsing_examples.js?v=314',
  'js/data/concept_examples.js?v=314',
  'js/data/grammar_examples.js?v=314',
  'js/data/setMeta.js?v=314',
  'js/logic/pos_logic.js?v=314',
  'js/data/nt_book_vocab.js?v=314',
  'js/data/reader.js?v=314',
  'js/data/reader_verse_literals.js?v=314',
  'js/data/reader_translations.js?v=314',
  'js/app/main.js?v=314',
  'js/data/supplementals/week_1_paradigms.js?v=314',
  'js/data/supplementals/week_2_paradigms.js?v=314',
  'js/data/supplementals/week_3_paradigms.js?v=314',
  'js/data/supplementals/week_4_paradigms.js?v=314',
  'js/data/supplementals/second_aorist_flip.js?v=314',
  'js/data/supplementals/liquid_future_flip.js?v=314',
  'js/data/supplementals/week_5_paradigms.js?v=314',
  'js/data/supplementals/w6_aorist_passive_flip.js?v=314',
  'js/data/supplementals/w6_perfect_active_flip.js?v=314',
  'js/data/supplementals/w8_mi_verb_principal_parts_flip.js?v=314',
  'js/data/supplementals/week_6_paradigms.js?v=314',
  'js/data/supplementals/week_7_paradigms.js?v=314',
  'js/data/supplementals/week_8_paradigms.js?v=314',
  'js/data/supplementals/adj_paradigms.js?v=314',
  'js/data/supplementals/paradigm_morphology.js?v=314',
  'js/data/supplementals/stem_change_drills.js?v=314',
  'js/data/advanced/advanced_01.js?v=314',
  'js/data/advanced/advanced_02.js?v=314',
  'js/data/advanced/advanced_03.js?v=314',
  'js/data/advanced/advanced_04.js?v=314',
  'js/data/advanced/advanced_05.js?v=314',
  'js/data/advanced/advanced_06.js?v=314',
  'js/data/advanced/advanced_07.js?v=314',
  'js/data/advanced/advanced_08.js?v=314',
  'js/data/advanced/advanced_09.js?v=314',
  'js/data/advanced/advanced_10.js?v=314',
  'js/data/advanced/advanced_11.js?v=314',
  'js/data/advanced/advanced_12.js?v=314',
  'js/data/advanced/advanced_13.js?v=314',
  'js/data/advanced/advanced_14.js?v=314',
  'js/data/advanced/advanced_15.js?v=314',
  'js/data/advanced/advanced_16.js?v=314',
  'js/data/advanced/advanced_17.js?v=314',
  'js/data/advanced/advanced_18.js?v=314',
  'js/data/advanced/advanced_19.js?v=314',
  'js/data/advanced/advanced_20.js?v=314',
  'js/data/advanced/advanced_21.js?v=314',
  'js/data/advanced/advanced_22.js?v=314',
  'js/data/advanced/advanced_23.js?v=314',
  'js/data/advanced/advanced_24.js?v=314',
  'js/data/advanced/advanced_25.js?v=314',
  'js/utils/helpers.js?v=314',
  'js/utils/time.js?v=314',
  'js/utils/storage.js?v=314',
  'js/utils/greekSort.js?v=314',
  'js/utils/clickShield.js?v=314',
  'js/domain/srs/constants.js?v=314',
  'js/domain/srs/scheduler.js?v=314',
  'js/domain/srs/confidence.js?v=314',
  'js/domain/gamification/levels.js?v=314',
  'js/domain/gamification/usageStats.js?v=314',
  'js/domain/gamification/xp.js?v=314',
  'js/domain/deck/ordering.js?v=314',
  'js/domain/deck/filters.js?v=314',
  'js/domain/grammar/explanations.js?v=314',
  'js/domain/grammar/morph_steps.js?v=314',
  'js/domain/grammar/paradigm_focus.js?v=314',
  'js/domain/grammar/morph_lookup.js?v=314',
  'js/ui/reader.js?v=314',
  'js/ui/keyboard.js?v=314',
  'js/ui/toast.js?v=314',
  'js/ui/touchTapBridge.js?v=314',
  'js/ui/charts.js?v=314',
  'js/ui/modals.js?v=314',
  'js/ui/progress.js?v=314',
  'js/ui/render.js?v=314',
  'js/ui/selectors.js?v=314',
  'js/ui/navigation.js?v=314',
  'js/ui/analytics.js?v=314',
  'js/state/migrations.js?v=314',
  'js/state/store.js?v=314',
  'js/state/runtime.js?v=314',
  'js/state/persistence.js?v=314',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png?v=314'
];

const APP_SHELL = APP_SHELL_PATHS.map(path => new URL(path, BASE_URL).toString());
const INDEX_URL = new URL('index.html', BASE_URL).toString();

self.addEventListener('install', event => {
  // Self-heal stuck-cache PWAs: a SW that just installed should take over
  // immediately rather than parking in `waiting` until every tab closes.
  // Without this, a user whose previous SW was the buggy ignoreSearch
  // version below couldn't escape the version-mismatch loop just by
  // hitting refresh — the popup helps but isn't guaranteed to fire.
  // controllerchange in main.js still triggers a single full reload after
  // claim, so the user lands on the new app shell.
  self.skipWaiting();
  event.waitUntil(
    // cache: 'reload' bypasses the HTTP cache during install so each release
    // precaches fresh copies even if a ?v= bump was missed for some file.
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(APP_SHELL.map(url => new Request(url, { cache: 'reload' })))
    )
  );
});

// Kept for the in-app "Refresh now" overlay button. Redundant with
// skipWaiting on install above, but harmless — calling it on an already-
// activating worker is a no-op.
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', event => {
  // Drop stale caches, then take control. We intentionally do NOT
  // force-navigate clients here. clients.claim() already fires
  // `controllerchange` in every controlled page, and the single reload is
  // owned by main.js's controllerchange listener. Calling client.navigate()
  // as well raced that reload: on iOS WebKit / standalone PWAs the two
  // competing navigations on the same URL could wedge the webview on a
  // half-finished load — a frozen launch that only cleared after a
  // force-quit or manual refresh. One reload, one owner, no race.
  //
  // Tradeoff: a user whose cached main.js predates the controllerchange
  // listener (PR 206) won't auto-reload on claim, but the "new version
  // ready" banner still lets them refresh on demand.
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
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
          // Only cache good responses — a 404/500 (e.g. a Pages outage)
          // must not overwrite the working cached shell.
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req).then(cached => cached || caches.match(INDEX_URL)))
    );
    return;
  }

  // Static assets: cache first, then network. The earlier all-routes
  // ignoreSearch:true caused cross-version pollution — a request for
  // `main.js?v=199` matched a cached `main.js?v=197` and served stale JS
  // against fresh HTML. Now: when the URL carries an explicit `?v=N`
  // cache-bust, match exactly so a version bump always falls through to
  // network. When it doesn't (bare ES-module imports from main.js have no
  // query string), keep ignoreSearch so they still resolve to the
  // precached versioned entry.
  const reqUrl = new URL(req.url);
  const isVersioned = reqUrl.searchParams.has('v');
  const matchOpts = isVersioned ? {} : { ignoreSearch: true };
  event.respondWith(
    caches.match(req, matchOpts).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // Cache only good same-origin responses; error pages cached here
        // would be served as the asset on every later hit.
        if (res.ok && req.url.startsWith(BASE_URL.origin)) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        }
        return res;
      });
    })
  );
});
