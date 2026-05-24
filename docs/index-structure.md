# `index.html` structure notes

Navigation map for the root `index.html` (currently ~753 lines). Keep this in
sync when you change the file — see "Maintenance" at the bottom.

Line numbers are approximate (drift a few lines between edits). When in doubt,
grep for the `id` rather than jumping to a line.

---

## Top-level layout

```
1   <!DOCTYPE html> / <head>           ← analytics, meta/PWA, manifest, theme bootstrap
46  <body>
47    <div class="app">                ← main shell (in-flow UI)
48      header, notice, quick-start, settings, deck, modals trigger
196   </div>
198   overlays (modals)                ← siblings of .app, position:fixed
697   <script defer …>                 ← data + entry point
752 </body>
```

The `<div class="app">` shell is everything that scrolls in the page. Every
`<div class="consent-overlay" …>` is a top-level sibling of `.app` and is
shown/hidden by JS — never nest a new overlay inside `.app`.

---

## `<head>` (1–45)

- 5–11   Google Analytics tag
- 12–19  PWA / icon / manifest meta (`?v=N` cache-bust param appears here and on every script/stylesheet)
- 21     `<link rel="stylesheet" href="styles.css?v=N">`
- 22–44  **Pre-paint inline script.** Reads `localStorage` and sets
         `data-theme` / `data-font-family` / `data-text-size` on `<html>`
         before first paint to avoid flash-of-wrong-theme. Don't move this.

> Cache-bust: every asset URL ends in `?v=NNN`. Bump the number on release.
> Same number lives in `sw.js` (`CACHE_NAME` / asset list). Both must agree.

---

## `<div class="app">` (47–196)

In-document order (these all render in the main column):

| Lines    | Element                                   | Notes |
|---------:|-------------------------------------------|-------|
| 49–62    | `<header>`                                | Theme switcher (System/Dark/Light), Greek + English title, `#appSubtitle`, "Koine Greek Study Tool" tag |
| 64–67    | `.notice-row`                             | Disclaimer button + `#appNotice` |
| 69–81    | `.quick-start`                            | Choose session / Start studying / mode strip (`#modeShortcutVocabBtn`, `…MorphBtn`, `…ParsingBtn`, `…ReaderBtn`) / Progress / User guide / `#modeShortcutMemorizationBtn` link to `pages/memorization.html` |
| 83–87    | `<details>` Progress tools                | Export/Import progress buttons (open the transfer modal) |
| 89       | `.ornament`                               | Decorative `✦ · · · ✦` |
| 91–150   | `<details id="advancedSettingsDetails">`  | Wraps **both** font/text-size prefs *and* `#controlsBar` toggles. The controls bar is not a separate section — it lives inside this `<details>`. |
| 110–148  | └ `#controlsBar`                          | Non-parsing toggles: `#shuffleToggle`, `#requiredToggle`, `#hardReviewToggle`, `#directionToggle`, `#spacedToggle`, `#unspacedDailyResetToggle`, `#splitSelectionToggle`, `#selfCheckToggle` (hidden by default). Then a nested `<details id="parsingOptionsDetails">` ("Parsing options") groups every parsing-specific toggle (`#aspectStepToggle`, `#tenseStepToggle`, `#voiceStepToggle`, `#moodStepToggle`, `#personStepToggle`, `#numberStepToggle`, `#caseStepToggle`, `#genderStepToggle`, `#optionalFormsToggle` — label "Optional paradigm") so the controls bar stays scannable. Each of the eight parsing-step master toggles is followed by its own nested `<details id="<dim>ValuesFiltersDetails">` ("Filter <dim> values…") containing per-value sub-toggles with IDs `#dimValueFilter_<dim>_<value>_Toggle` (e.g. `#dimValueFilter_tense_aorist_Toggle`, `#dimValueFilter_case_dative_Toggle`). Handler: `toggleDimValueFilter('<dim>','<value>')`. Under the optional-forms toggle is a further nested `<details id="optionalFormsFiltersDetails">` ("Filter optional forms by category…") with seven category sub-toggles (`#optionalFilter_imperative_Toggle`, `…_subjunctive_…`, `…_infinitive_…`, `…_participle_…`, `…_thirdPerson_…`, `…_futureTense_…`, `…_perfectTense_…`). Reset action grid (`#resetDeckBtn`, `#resetRequiredBtn`, Reshuffle, Reset stats) follows. |
| 152      | `#readerView`                             | Empty mount point. Reader mode JS injects content here. |
| 154–157  | `#paradigmFocusRowPrimary`                | Focused-paradigm dropdown (`#paradigmFocusSelectPrimary`) — hidden unless in a mode that uses it |
| 159–164  | `#cardArea`                               | **Main flashcard mount.** Contains a placeholder `.empty-state`; JS replaces it. |
| 166–171  | `#navRow`                                 | Prev / `#spacedUndoBtn` / `#navResetBtn` / `#navNextBtn` |
| 173–177  | `#markRow`                                | Mark buttons: Hard (`again`) / Uncertain (`pass`) / Easy |
| 179–182  | `#ffRow`                                  | Fast-forward 1 day / 1 week (debug-ish) |
| 184–194  | `<section class="review-shell">`          | Bottom progress panel: `#reviewPanel` → `#reviewDeckTag`, `#reviewStats`, `#reviewSortRow`, `#reviewList` |

---

## Overlays (198–696) — siblings of `.app`

All use `class="consent-overlay"` + an `aria-hidden` toggle. Most use
`class="consent-modal"` inside. Open/close handlers live in JS.

| Lines    | id                          | Purpose |
|---------:|------------------------------|---------|
| 198–214  | `#transferOverlay`           | Import/export progress (textarea + file picker) |
| 216–424  | `#analyticsOverlay`          | "Progress and study time". Large; contains many `<details class="analytics-collapse" data-collapse-key="…">` sections — achievements, totalVocab, selectedVocab, totalGrammar (incl. `#analyticsParadigmStepStatsBody`), selectedGrammar, etc. Each section has a `…SummaryStatus` element JS updates. |
| 426–471  | `#studySelectorOverlay`      | "Choose session" — deselect buttons, `#sessionsGrid`, `#chaptersGrid`, `#supplementalGrid`, `#advancedGrid` (inside `#advancedSectionShell` `<details>`) |
| 473–597  | `#shortcutsOverlay`          | User guide. **Contains the inline changelog** (`details.user-guide-changelog` → one `details.user-guide-changelog-version` per release). Add new release entries at the top. |
| 599–617  | `#consentOverlay`            | First-run "Before you begin" consent |
| 619–641  | `#resetSpacedOverlay`        | Confirm reset of spaced review |
| 643–657  | `#resetStatsOverlay`         | Confirm reset of stats |
| 659–677  | `#resetUnspacedOverlay`      | Confirm reset of current (unspaced) deck |
| 679–696  | `#whatsNewV1_4Overlay`       | Version popup. Each release gets a fresh `#whatsNewVX_Y` overlay; the old one is removed once the next release ships. |

When adding a release:
1. Bump `?v=NNN` on every `<link>` and `<script>` URL (and in `sw.js`).
2. Replace the previous `#whatsNewVX_YOverlay` (679–696) with a new one for the current version.
3. Prepend a new `<details class="user-guide-changelog-version" open>` to the changelog inside `#shortcutsOverlay` (480-ish).
4. Older `user-guide-changelog-version` entries lose `open`.

---

## Scripts (698–752)

Load order matters — `main.js` is the only `type="module"` and runs last. All
data files are plain `defer` globals that publish onto `window`.

Groups, in order:

- **Core data (698–702):** `words.js`, `morphology.js`, `lemma_inventory.js`, `supplemental.js`, `grammar.js`
- **Per-week supplementals + paradigms (703–722):** `week_N_supplemental.js`, `week_N_paradigms.js`, plus stem-change flips (`second_aorist_flip.js`, `w6_aorist_passive_flip.js`, `w6_perfect_active_flip.js`, `w8_mi_verb_principal_parts_flip.js`), `adj_paradigms.js`, `wNo_supplemental.js`, `paradigm_morphology.js`, `stem_change_drills.js`
- **Advanced vocabulary buckets (723–747):** `advanced/advanced_NN.js` (currently 01–25)
- **Reader (748–750):** `reader.js`, `reader_verse_literals.js`, `reader_translations.js`
- **Logic (751):** `pos_logic.js` (intentionally loaded before main)
- **Entry point (752):** `js/app/main.js` — the only ES module

When adding a new week / advanced bucket / supplemental, add the `<script>`
tag in the matching group and keep the `?v=NNN` aligned.

---

## Related files (not in this doc)

- `styles.css` — single ~4.1k-line stylesheet, also `?v=NNN`-busted.
- `sw.js` — service worker. `CACHE_NAME` + precache list must agree with `?v=NNN`.
- `manifest.json` — PWA manifest.
- `pages/memorization.html` — Paradigms page (linked from `.quick-start`). Has its own structure; not covered here.
- `js/`
  - `app/` — entry (`main.js`) and bootstrap
  - `data/` — vocab, morphology, paradigm tables, reader text, plus `supplementals/` and `advanced/`
  - `domain/` — model objects (cards, decks, paradigms)
  - `logic/` — POS / parsing logic
  - `state/` — global state, persistence
  - `ui/` — DOM rendering, modals, overlays
  - `utils/` — shared helpers

---

## Maintenance

**If you edit `index.html` and any of the following change, update this doc in
the same commit:**

- A section in `.app` is added, removed, reordered, or renamed.
- An overlay (`consent-overlay`) is added or removed.
- An `id` that other code refers to is added, removed, or renamed.
- The script load order or grouping changes (new data file, new bucket, etc.).
- The cache-bust scheme (`?v=NNN`) changes.

Line numbers drift — don't chase them obsessively, just keep them in the right
neighborhood. The tables above are the source of truth for *what exists*; line
numbers are a convenience.
