Greek Flashcards PWA for Netlify
================================

Seventh-pass revision (based on the sixth-pass consolidation below).
Adds wrong-answer explanations to grammar questions: when a learner
picks a wrong multiple-choice option, an inline block shows a short
Greek + English example of what that wrong option would actually
mean, with a one-line note on the distinctive morphological or
conceptual marker. Also fixes two small content bugs.


WHAT CHANGED FROM THE SIXTH PASS
--------------------------------

Bug fixes
- js/data/morphology.js — W1O εἰμί paradigm: `ἐστίν(ν)` and
  `εἰσίν(ν)` had the movable nu written twice (once on the word,
  once in parens). Corrected to `ἐστί(ν)` and `εἰσί(ν)`, matching
  the convention used elsewhere in the file (e.g. `φιλοῦσι(ν)`).
- js/data/grammar.js — Chapter 1 Breathings: the lemma string
  mixed U+1FFE (Greek rough breathing) with U+1FBF (coronis).
  These rendered as floating glyphs and didn't travel through
  the URL-safe card-id generator cleanly. Replaced with plain
  English descriptors; the breathings are still shown in context
  on the example forms (ὁ, ἀ, ῥ).

Wrong-answer explanations (new feature)
- js/app.js — Added two lookup libraries:
    PARSING_EXAMPLES  — keyed by a canonicalized parsing label
                        (~100 entries: tenses, moods, voice,
                        participles, article / pronoun cases).
    CONCEPT_EXAMPLES  — keyed by exact distractor text
                        (~170 entries: case names and functions,
                        gender, stem classes, mood functions,
                        adjective / participle positions, voice
                        meanings, preposition meanings, conjunction
                        types, personal pronouns, clause types,
                        aspect phrasings, αὐτός uses, and more).
  Each entry has { greek, english, why }. The new
  buildWrongAnswerExplanation() checks, in order:
    1. `card.explanations[selectedChoice]`  (per-question, authored)
    2. CONCEPT_EXAMPLES (exact match)
    3. PARSING_EXAMPLES (normalized match via normalizeParsingLabel)
  If all three miss, the block stays silent — filler would be
  worse than nothing.
- The grammar.js card shape now carries two new optional
  passthrough fields from each question: `explanations` (an
  object mapping wrong-choice text to `{greek, english, why}`)
  and `rationale` (a short free-text line about why the
  correct answer is correct). No existing questions use these
  yet; they are for targeted hand-authored explanations in
  future passes.
- styles.css — Added `.morph-wrong-explanation`,
  `.morph-wrong-label`, `.morph-wrong-greek`,
  `.morph-wrong-english`, `.morph-wrong-why`, and
  `.morph-rationale` classes.

Coverage
- Distractors with an explanation: 438 / 684 (64.0% overall).
- Excluding Ch 1 alphabet drills (which are intentionally
  silent — a Greek example doesn't help disambiguate "δ" from
  "lambda"): 438 / 609 (71.9%).
- Strongest coverage in conceptual-heavy chapters (3, 4, 7, 10,
  13, 14, 16, 18, 19) and in parsing-heavy week supplements
  (W2O, W6O, W7O, W8O).
- Weaker coverage where distractors are highly question-specific
  (Ch 11 second-aorist suppletive stems where Greek forms
  themselves are the distractors; Ch 20 mixed review with
  specific-sentence translations). These would benefit from
  per-question `explanations` objects added directly in
  grammar.js.

Cache / storage
- sw.js — CACHE_NAME bumped v10 → v11 so existing deployments
  re-fetch the updated js/app.js, js/data/grammar.js,
  js/data/morphology.js, and styles.css.
- STORAGE_KEY is unchanged (still V18). The new `explanations`
  and `rationale` fields are purely additive on the card shape
  (they do not enter persisted progress), and card IDs are
  unchanged, so no state migration is needed.

Code cleanup
- Removed the stale duplicate header comment block at the very
  top of js/app.js (`// VOCABULARY DATA` / `// STATE` were
  present as two consecutive empty headers; kept just the
  `// STATE` one).


THE SIXTH PASS (previous changes, retained)
-------------------------------------------

Sixth-pass refactor. Consolidates the previous three-file grammar
layout into one file, removes the duplicate buildChapterSelector
in app.js, and rebuilds grammar coverage to match the textbook
chapters and the lecture-week beats for Wycliffe WYB1513YY.


FILES
-----
- index.html
- styles.css
- manifest.json
- sw.js
- favicon.svg
- icons/
- netlify.toml
- js/data/words.js          (unchanged — vocabulary preserved)
- js/data/morphology.js     (unchanged — parsing drills preserved)
- js/data/grammar.js        (NEW — single consolidated grammar file)
- js/logic/pos_logic.js     (unchanged — POS parsing preserved)
- js/app.js                 (refactored — see below)


WHAT CHANGED FROM THE FIFTH PASS
--------------------------------

Code cleanup
- Removed the duplicate `buildChapterSelector` patch at the bottom
  of app.js. The canonical version now incorporates the patch's
  better behavior: an empty-grid guard, support for chapters that
  have only grammar/morphology and no vocab, and a final
  `setActiveSetButtons()` call.
- Collapsed the four-source grammar fan-out down to one. `getSelectedCards`
  and `buildChapterSelector` no longer reference the deprecated
  `getExtraGrammarCountForKey`, `getThirdPassGrammarCountForKey`,
  `buildExtraGrammarCardsForKeys`, or `buildThirdPassGrammarCardsForKeys`.
- Documented the silent V12 -> V16 schema bumps in `STATE_MIGRATIONS`
  (they were forward-compatible additions, no migration was needed).
- Bumped `STORAGE_KEY` to V17 and added a `grammar-consolidation-clear-orphans`
  migration. Vocabulary progress is preserved; orphaned grammar/morph
  entries (whose IDs reference the old item-index layout) are dropped.

Grammar consolidation
- `grammar.js`, `grammar_extra.js`, and `grammar_focus.js` are now
  one file: `js/data/grammar.js`.
- Single IIFE, one `GRAMMAR_SETS` object, exposes only:
    window.GRAMMAR_SETS
    window.buildGrammarCardsForKeys
    window.getGrammarCountForKey
- Index.html and sw.js updated to drop the two removed scripts.
- sw.js cache name bumped v9 -> v10.

Grammar content
- Coverage rebuilt around the Wycliffe textbook chapters (1-20) and
  the lecture-week supplements (W1O-W8O).
- Multiple-choice only. Forms are stored explicitly rather than
  generated, so accents stay honest.
- Total: 228 grammar questions.

  Chapter coverage
  ----------------
   1  Alphabet, breathings, diphthongs, iota subscript
   2  Basic sentences, present-tense recognition, eimi
   3  The five cases and their functions; gender; article ID
   4  Prepositions and the cases they govern (single + multi-case)
   5  Adjective agreement, attributive vs predicate vs substantive position
   6  The tenses, time vs aspect, augment, future sigma marker
   7  The five moods and their core functions
   8  Contract verb rules (e/a/o), liquid stems
   9  Personal, demonstrative, and relative pronouns; conjunctions
  10  ina + subjunctive, hoti, ei vs ean (conditional types)
  11  Second aorist (suppletive stems), liquid futures
  12  Third declension Part 1 (k, nt, n, mat stems)
  13  Third declension Part 2 (s-stem, i-stem, eu-stem)
  14  Participles: attributive, substantive, adverbial, genitive absolute
  15  Voice; aorist passive theta-eta marker; square of stops
  16  Perfect: reduplication, aspect; pluperfect
  17  Subjunctive: long-vowel marker, hortatory, prohibition, indefinite
  18  Periphrastic constructions; aspect choice in commands
  19  -mi verbs: didomi pattern (present/future/aorist/perfect)
  20  Mixed review across the course

  Week supplements (aligned with the lecture beats)
  -------------------------------------------------
  W1O  Alphabet, luo/phileo present, article + noun patterns, autos, eimi
  W2O  Master indicative paradigm, mood ID, imperative, active masc participles
  W3O  Middle voice, eimi infinitive/participle, demonstratives, personal pronouns
  W4O  Relative-pronoun agreement, second aorist, liquid futures
  W5O  Third-declension stem ID, participial paradigms
  W6O  Aorist passive, passive participles, perfect, pluperfect
  W7O  Subjunctive, indefinite constructions, 3rd-person imperative, aspect
  W8O  -mi present active, other -mi tenses, -mi middle/passive

Morphology
- Preserved unchanged. The week-aligned morphology supplements (W1O-W8O)
  in js/data/morphology.js were already well-built; nothing in this
  pass touches them.


CARD-SHAPE CONTRACT
-------------------
Both morphology.js and grammar.js produce the same card shape, which
app.js / pos_logic.js consumes:

  {
    id:        string  (regenerated each session)
    kind:      'morph' (multiple-choice prompt)
    required:  true
    sourceKey: string  ("1"-"20" or "W1O"-"W8O")
    sourceLabel, chapter, family, lemma, gloss,
    form, prompt, context, note, answer, choices[]
  }


DEPLOYMENT
----------
Drag this folder (or a zip of its contents) into Netlify Drop.
On iPhone: open the deployed site in Safari, then Share > Add to
Home Screen. Open the home-screen app once while online so the
service worker caches the app shell, then it works offline.

If you change any file in js/data/ or js/logic/, bump CACHE_NAME in
sw.js (currently v10). Without that, the service worker will keep
serving the old cached files even after you redeploy.


KNOWN BEHAVIOR
--------------
- Vocabulary progress survives the upgrade (vocab card IDs are stable).
- Grammar/morphology progress resets, because the consolidation
  changed the within-chapter item ordering and therefore the IDs.
  The V17 migration drops the orphaned entries cleanly so they don't
  pile up in localStorage.
