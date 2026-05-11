Elementary NT Greek — Flashcards (PWA)
=====================================

A static, offline-capable progressive web app for studying Koine Greek
alongside Duff's *Elements of New Testament Greek* (Wycliffe WYB1513YY
lecture beats). Hosted on GitHub Pages; works at a domain root or under
a project subpath.


FEATURE SET
-----------

Study modes
- Vocab — Greek ↔ English flashcards with optional direction reversal.
- Grammar — multiple-choice parsing / morphology / concept questions
  with inline wrong-answer explanations and an optional "self-check"
  mode that reveals the answer without grading.
- Reader — NT verses sequenced so each chapter is readable after
  finishing the corresponding Duff chapter (Textus Receptus text).
- Memorization — separate page (`pages/memorization.html`) for guided
  paradigm memorization aligned to the lecture weeks.

Session / set selectors
- Preset Sessions — weekly study days (wk1t, wk1f, wk2t, …),
  Mid-Term Prep (Ch 1–11), and Final Exam Prep (Ch 1–20). Sessions
  expand to chapters plus the per-week odd supplements (W1O–W8O);
  paradigm breakdown sets are opt-in via the supplemental selector.
- Manual chapter selection — toggle individual chapters 1–20.
- Supplemental selector — grouped by week, with each week expandable
  into the per-week odd supplement (W1O–W8O), the "all of set X"
  button, and individual paradigm rows (Morphology / Grammar items).
  A "Deselect all supplementals" control at the top clears every
  supplemental selection while leaving chapter selections intact.
  Multiple supplementals from any combination of weeks can be active
  at once.

Deck controls
- Shuffle, Required-only, Direction (Gk → En / En → Gk),
  Spaced review (SRS), Self-check (grammar mode).
- Reshuffle eligible cards, reset the current deck, or reset all
  stats from the advanced-settings panel.

Spaced repetition
- Per-card SRS scheduler with ease-based intervals and a confidence
  signal. Due-only counts drive the visible deck length when spaced
  review is on. An undo affordance restores the last spaced action.

Progress tracking
- Marks per direction (known / uncertain / again) persist across
  sessions and survive deck reshuffles.
- Analytics overlay: hero summary, course completion, heatmap,
  achievements, time ledger (active study time, session history,
  foreground totals), per-chapter vocab / grammar breakdowns.
- Gamification: levels and usage stats fed by the analytics module.

Progress portability
- Export progress to a JSON file (download or copy from textarea).
- Import progress from text or a chosen JSON file. Schema-versioned
  with forward-compatible migrations in `js/state/migrations.js`.

App shell
- Theme switcher (System / Dark / Light) with first-paint inline
  theme bootstrap to avoid flashes.
- Keyboard shortcuts modal.
- Disclaimer / consent modal ("unofficial student-made AI study aid").
- Service-worker caching with a versioned `CACHE_NAME` and per-asset
  `?v=` query strings so deployments invalidate cleanly.


REPOSITORY LAYOUT
-----------------
- index.html, styles.css, manifest.json, sw.js, favicon.svg, icons/
- pages/memorization.html
- js/app/main.js              — entry point (ES module)
- js/data/                    — vocabulary, morphology, grammar,
                                 reader, memorization, parsing /
                                 concept / grammar examples, set
                                 metadata
- js/data/supplementals/      — per-week paradigm files plus the
                                 W3O/W6O/W7O/W8O supplements,
                                 adjective paradigms, custom
                                 supplement, and paradigm morphology
- js/logic/pos_logic.js       — parsing helpers
- js/utils/                   — helpers, time, storage, Greek sort
- js/domain/srs/              — SRS constants, scheduler, confidence
- js/domain/deck/             — ordering, filters
- js/domain/grammar/          — explanations
- js/domain/gamification/     — levels, usage stats
- js/state/                   — store, migrations


DEPLOYMENT
----------
1. Push to the branch configured for GitHub Pages.
2. Wait for the Pages deploy to finish.
3. Open the published URL once online so the service worker caches
   the new app shell.

When any cached file changes, bump a single shared version number:
- the `vNN` suffix in `CACHE_NAME` (e.g. `…-pwa-v54-github-pages`),
- every `?v=NN` query string in `sw.js` and `index.html`.

The simplest way is a search-and-replace from the previous version
to the next across both files (e.g. `v54` → `v55`). The service
worker uses `caches.match(req, { ignoreSearch: true })` so bare ES
module imports still resolve to the versioned precache entries.

Without those bumps the service worker will keep serving the old
cached assets after redeploy.


KNOWN BEHAVIOR
--------------
- Vocabulary progress is keyed by stable card IDs and survives most
  upgrades.
- Grammar / morphology IDs depend on item ordering within a chapter;
  large content reorderings are handled by versioned migrations
  (`STATE_MIGRATIONS`) that drop orphaned entries cleanly.
- This is an unofficial student-built study aid. Verify against
  course content and official materials before relying on anything
  it says.
