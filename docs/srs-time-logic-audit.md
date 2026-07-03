# SRS / time-logic audit — why cards can appear (or actually become) due faster than intended

Scope: every code path where cards become due, re-enter the active deck, or appear to
advance through the review schedule faster than the scheduler intends.
Method: full read of `js/domain/srs/*`, `js/app/main.js` (deck primitives + spaced review),
`js/ui/navigation.js`, `js/ui/progress.js`, `js/state/persistence.js`, `js/state/runtime.js`,
`js/state/migrations.js`, `js/ui/render.js` (done-card), `js/ui/keyboard.js`,
`js/domain/deck/filters.js` (progress identity). No code changes are made by this audit.

Terminology used throughout, per the audit brief:

- **schedule mutation** — `dueAt` / `intervalDays` / `srsStage` / `ease` / confidence data actually changes;
- **deck promotion** — cards move into the active pile without their long-term schedule changing;
- **display/perception** — piles are rebuilt so cards *appear* sooner;
- **intended feature** — behaves as documented in code comments (fast-forward, near-due
  backstop, relearn ladders, variant rounds, unspaced daily reset).

The 22-hour first SRS day (`SRS_DAY_MS = 22h`, `constants.js:9`) is treated as intentional;
`msFromDays`/`daysFromMs` (`scheduler.js:22-32`) are exact inverses and nothing elsewhere
contradicts the "pull the first day in 2h, full calendar days after" model.

---

## A. Executive summary

**Yes — there are real, silent schedule mutations that can make cards due sooner than
their recorded schedule, and they are repeatable.** They are distinct from the (correct,
presentation-only) active/middle/deferred pile reshuffling.

Ranked by likely user impact:

1. **The end-of-deck "Next" subtracts 1 hour from *every* scheduled card, without bound**
   (`navigation.js:201` → `advanceScheduledCards`, `main.js:2752`). Each press on the
   "No cards currently due" splash — including an ArrowRight/ArrowDown key press
   (`keyboard.js:61,77`) — permanently pulls the whole deck's `dueAt` earlier by 1h, even
   when zero cards are near-due and the press visibly does nothing. Ten idle presses =
   the entire deck advanced 10 hours. This is the strongest candidate for "cards keep
   coming due faster than they should" and it compounds day after day.

2. **"Next" on an active spaced vocab card is a full Hard lapse, not a skip**
   (`navigation.js:214-220`). `navigate(1)` auto-applies `'again'`: ease −0.2, srsStage −1,
   `lapseCount`+1, a 0-confidence sample, `dueAt = now`, and a 2-step relearn ladder that
   resumes at ½ the old interval. Arrow-key "browsing" through due cards silently
   demolishes mature schedules and (on the relaxed cadence) walks cards into the leech
   drill after 4 presses. Deliberate design per the comments, but it is a hidden,
   navigation-triggered schedule mutation and almost certainly a major source of
   "my cards reset and keep coming back".

3. **Variant "split card" sets collapse to due-now after any incomplete round**
   (`isCardDue`, `main.js:2873-2884`; `applyVariantRoundReview`, `main.js:3500-3581`).
   A set only advances its shared schedule when *every* face is cleared Easy inside one
   2-hour window. One partial attempt parks the shared `dueAt` at round-start+2h; when the
   window lapses, a **read path** (any `getDueCount`/`buildStudyDeck` call, i.e. any
   render) closes the round, records a confidence sample with unreached faces scored 0,
   and puts the whole multi-card set back to due-now. The confidence penalty then keeps
   `getNextEasyIntervalDays` pinned at 1 day (stabilization needs ≥50%). Intended round
   model, but it produces exactly the reported "too many cards reappear after a new day /
   after a partial review", multiplied across all visible sibling faces.

4. **The 2%-per-flip "revival" force-schedules a random deferred card to now**
   (`maybeReturnConfirmedDeferredCard`, `main.js:3807-3824`): `progress.dueAt = Date.now()`
   on a >75%-confidence card that may be a week+ out. When it is then reviewed, it is
   rescheduled from *now*, permanently compressing that card's long-term schedule.
   Intended feature, but it is genuine schedule mutation, not presentation.

5. **The near-due backstop mutates from every rebuild path**
   (`buildStudyDeck`, `main.js:3204-3218`): when nothing is due, cards within 30 minutes
   get `dueAt = now; intervalDays = 0`. Bounded to 30 minutes so mostly benign, but it
   fires from pure display paths (reload, mode/direction/shuffle toggles, undo restores).

6. **Importing an old export rescales long intervals down** (migration
   `srs-interval-cap-30-to-14-alignment`, `migrations.js:599-651`): any save without the
   `srsIntervalCapAlignedV1` stamp has intervals >14d scaled by 14/30 and `dueAt` pulled
   earlier. Intended one-time alignment; explains "imported an older backup and a batch
   came due".

**Verified clean (presentation-only):** the 5-hour idle window, `restoreState`,
`loadDeckFromKeys` deck-bank resume, `reorderDeckFromIds`, mode/direction switches,
required-only and spaced/unspaced toggles, manual reshuffle, and the unspaced 5 AM
daily reset **never write `dueAt`/`intervalDays`** (except insofar as they route through
`buildStudyDeck`, where items 3 and 5 above can fire). They only re-partition
active/middle/deferred. The perceived "everything came back after reopening" after an
idle gap is the correct union of (cards that became due while away) + (middle dumped into
active on fresh start) — deck promotion / display, not schedule change.

---

## B. Findings table

Progress-entry identity note: derived/irregular faces share one progress entry via
`progressCardId` (`filters.js:41`), so any write below marked "sibling set" moves the
schedule of every visible face at once.

| # | Title | File / function | Trigger | Fields changed | Changes `dueAt` sooner? | Scope | Verdict | Repro | Suggested fix / instrumentation |
|---|-------|-----------------|---------|----------------|------------------------|-------|---------|-------|---------------------------------|
| F1 | End-of-deck Next advances *all* cards 1h, unbounded | `navigation.js:179-211` → `advanceScheduledCards` `main.js:2752-2767` | Next / ArrowRight / ArrowDown while `currentIdx >= activeDeckCount` and middle empty (spaced vocab *and* spaced grammar) | `dueAt` −1h, `intervalDays` rewritten to remaining time, on **every** future-scheduled entry | **Yes**, permanently, every press | Whole selected deck (dedup per shared progress entry) | Intended feature ("advance the review clock") but **unbounded, global, and silent when it surfaces nothing** | Finish all due cards → splash → press Next N times → every deferred card's `dueAt` is N h earlier; verify in Review panel "due in …" | Make the advance bounded & purposeful: no-op (or toast) when `getNearDueCount()===0`; or advance only by `min(1h, time-until-nearest-due)`; or promote only the nearest cohort (set just their `dueAt=now`) instead of shifting the entire deck. Log every call with press count. |
| F2 | Next on an active spaced card = silent Hard lapse | `navigation.js:214-220` (auto-`'again'`), `applyHardLapse` `main.js:3372-3398` | `navigate(1)` on a due card in spaced vocab (button or arrow keys) | `streak=0`, `easyStreak=0`, `srsStage`−1, `ease`−0.2, `lapseCount`+1, `inRelearn=true`, `relearnLeft=2`, `dueAt=now`, 0-confidence sample, mark `'unsure'` | **Yes** (due now + relearn ladder; resume at ½ pre-lapse) | One card per press (sibling set if variant) | Deliberate ("auto-'again'"), but a hidden grading action on a navigation control; feeds leech on relaxed cadence | Mature 14d card due; press ArrowRight instead of a grade → card due now, ladder 1d+1d, resumes at 7d; `lapseCount` grew | Make Next a neutral requeue (drop from active into middle without `applySpacedReview`), or require an explicit grade; at minimum surface "marked Hard" feedback. Instrument `applySpacedReview` with the calling action. |
| F3 | Incomplete variant round resets whole set to due-now, from render paths | `isCardDue` `main.js:2873-2884`, `endVariantRound` `main.js:2899`, `applyVariantRoundReview` `main.js:3500-3581` | 2h window (`SRS_VARIANT_HOLD_MS`) lapses with faces pending; detected on any `getDueCount`/`buildStudyDeck` (i.e. any render) | `confidenceHistory` (+1 sample, unreached faces = 0), `confidence`, `cycleFaces*` cleared, `cycleStartedAt=0`, `dueAt=Date.now()`, `intervalDays=0` | `dueAt` moves *up* to now (was already ≤ now), but the **scheduled interval the set would have earned is forfeited** and low confidence pins future growth at 1 day | Whole sibling set (shared entry, multiple visible cards) | Intended round model; the *side effects* (confidence 0s from a read path; mutation inside `filter(isCardDue)`) are suspicious | Enable "aorist as cards" for λέγω; review only the base face Easy; wait >2h; reopen → all faces due again, confidence dropped | Don't score unreached faces 0 on idle-window expiry (only on an explicitly abandoned-in-session round), or weight the sample by faces attempted. Move the close-out out of `isCardDue` into an explicit sweep at deck-build start. Log `endVariantRound` with reason (window-expiry vs completed). |
| F4 | 2% revival force-dues a deferred card | `maybeReturnConfirmedDeferredCard` `main.js:3807-3824` | ~1/50 chance per spaced-vocab flip (shuffle on) | `dueAt = Date.now()` (note: `intervalDays` left stale), `spacedActiveIds` +1 | **Yes**, by up to the card's full remaining interval; next review reschedules from now | One random card per trigger | Intended feature; still true schedule mutation & long-term compression | Study 100+ flips with high-confidence deferred cards → ~2 pulled in; their next dueAt is (now + interval), not (old dueAt + interval) | Make revival presentation-only: insert into active without touching `dueAt` (needs `isCardDue` override list), or on review reschedule from the original `dueAt`. Also zero `intervalDays` for consistency if kept. Log picks. |
| F5 | Near-due backstop fires from every rebuild | `buildStudyDeck` `main.js:3204-3218` | Any deck rebuild with 0 due cards and ≥1 card within `SRS_NEAR_WINDOW_MS` (30 min): reload, mode/direction/shuffle/spaced toggles, undo, revival's inner rebuild, `returnSeenCardToDeck` | `dueAt = now`, `intervalDays = 0` for each near card | **Yes**, ≤30 min | All near-due cards | Intended backstop ("never a dead deck"); triggering from passive paths is the suspicious part | With one card due in 20 min and nothing due, toggle shuffle (or reload) → card is due immediately | Acceptable to keep; optionally restrict to interactive contexts (deck-empty Next / initial load) and skip on toggle-driven rebuilds. Log with caller. |
| F6 | Old-export import shrinks long schedules | `migrations.js:599-651` (`srs-interval-cap-30-to-14-alignment`), applied in `restoreState` `persistence.js:1122-1128` | Importing/restoring any save lacking `srsIntervalCapAlignedV1` | `intervalDays`, `lastEasyIntervalDays` (×14/30 if >14), `dueAt` (gap scaled or clamped to now+14d) | **Yes**, for >14d cards | Every progress entry in the save | Intended one-time cap alignment | Import a pre-May-2026 export with 30d intervals → they land at ≤14d | Keep; but log a per-import summary ("N entries rescaled") so support can distinguish this from a bug. Guard is correct for current-format exports (always stamped, `persistence.js:325`). |
| F7 | Fast-forward 1 day is one unconfirmed tap | `navigation.js:1383-1385` → `advanceScheduledCards(msFromDays(1))` | Advanced-settings button | `dueAt` −22h, `intervalDays` rewritten, all cards | **Yes** | Whole deck | Intended, explicit; 1-week has a confirm (`navigation.js:1387-1397`), 1-day doesn't and is repeatable | Tap ×7 = a silent week | Add the same confirm (or a throttle/toast with running total) to 1-day. |
| F8 | Review-panel ✕ returns a card due-now | `returnSeenCardToDeck` `progress.js:785-819` | Explicit ✕ click | `dueAt=now`, `intervalDays=0`, `streak=0`, `easyStreak=0`, `srsStage`−1 | **Yes** | One card | Intended, explicit | — | Fine as-is. |
| F9 | Uncertain/Hard lapse ladders shorten schedules | `applyUncertainLapse` `main.js:3402-3409`, `applyHardLapse`, `resumeAfterLapse` `main.js:3356-3364` | Grading Hard/Uncertain | `dueAt` (0 / 2h / 1d steps), `inRelearn`, `relearnLeft`, `preLapseIntervalDays`, `lastEasyIntervalDays=resumeDays` | **Yes**, by design | One card (or sibling set) | Intended (½-resume capped at 7d/14d preserves most spacing; re-lapse mid-ladder keeps the *original* pre-lapse interval, `main.js:3391-3393` — correct) | Hard on 14d card → now, 1d, 1d, then 7d | No change; cover with tests (§E). |
| F10 | Unspaced 5 AM reset clears `'known'` marks shared with spaced display | `maybeAutoResetUnspacedArchives` `main.js:2413-2438`; runs in `restoreState` (`persistence.js:1268`) and on visibilitychange | Opt-in toggle + day-key rollover | Deletes `'known'` marks in `g2e`/`e2g` mark buckets | **No** — never touches `globalWordProgress` | All unspaced archives, both directions | Intended, correctly isolated from SRS. Perception risk only: spaced mode writes `'known'` marks on Easy (`applySpacedReview`, `main.js:3477`) so the spaced "Confirmed" count also drops after the reset, which can be mistaken for lost SRS progress | Enable daily reset, mark spaced cards Easy, pass 5 AM → Confirmed count drops; due dates unchanged | Either exclude spaced-written marks from the wipe, or accept and document; instrumentation should confirm no `dueAt` deltas here. |
| F11 | Idle-gap / restore paths | `buildStudyDeck` freshStart `main.js:3238-3245`, `restoreState` `persistence.js:1236-1251`, `loadDeckFromKeys` `selectors.js:852-908`, deck bank `persistence.js:1002-1028` | Reload, >5h idle, mode/toggle round-trips | `spacedActiveIds`, `unspacedMiddleIds`, cursor only | **No** | — | Intended; presentation only. Stale bank entries: `savedAt` gate (5h) + `reorderDeckFromIds` zero-overlap null + cursor clamp to `activeDeckCount` prevent skipping into a larger due batch | Reload after 6h idle → all currently-due cards collapse into one shuffled active pile; schedules untouched | No change. |
| F12 | `advanceScheduledCards` rewrites `intervalDays` to remaining time | `main.js:2764` | F1/F7 triggers | `intervalDays` shrinks (earned interval lost from that field) | n/a | All advanced cards | Mostly harmless — growth reads `max(lastEasyIntervalDays, intervalDays)` (`scheduler.js:104-108`) so `lastEasyIntervalDays` protects the ramp — but analytics/review "interval" readouts understate | — | If F1/F7 are kept, consider not rewriting `intervalDays` (keep the earned value; `dueAt` alone is authoritative for dueness). |
| F13 | Dead code: `applyUnspacedSchedule` / `setMinimumProgressDelay` | `scheduler.js:38-56,139-158` | none (no callers outside scheduler.js) | would write `dueAt`/`intervalDays` from unspaced reviews | — | — | Legacy remnant; the live unspaced path (`applyUnspacedSharedSchedule`, `main.js:2465-2481`) deliberately does **not** touch the SRS schedule | — | Remove or mark deprecated so it isn't re-wired accidentally. |
| F14 | Progress-store merges take the *later* dueAt | `mergeProgressEntry` `migrations.js:99-122` | grammar/morph id-migration merges | `dueAt: Math.max`, `intervalDays: Math.max` | No (safe direction) | merged entries | Intended | — | No change. |

---

## C. High-risk code paths

1. **`navigate(1)` spaced branch (`navigation.js:120-262`)** — one function multiplexes:
   auto-Hard on active cards (F2), middle-dump, *and* the global 1h clock advance (F1),
   all reachable from arrow keys. It both mutates schedules and rebuilds piles, so any
   perception bug and any real mutation bug meet here.
2. **`advanceScheduledCards` (`main.js:2752`)** — the only function that moves *every*
   card's schedule earlier; three callers with very different intents (implicit end-of-deck
   Next vs explicit fast-forwards).
3. **`buildStudyDeck` (`main.js:3143-3282`)** — supposed to be a pure pile-builder but
   contains two mutation sites (near-due backstop; variant round close-outs via
   `isCardDue`). It is called from at least a dozen contexts, including read-ish ones.
4. **`isCardDue` (`main.js:2846-2892`)** — a predicate with side effects
   (`endVariantRound` + `dueAt=now`) that runs inside `Array.filter` from
   `getDueCount`/render. Mutation-on-read makes "how did this change?" undiagnosable.
5. **`applyVariantRoundReview` + shared `progressCardId` entries** — one grade moves the
   schedule of N visible cards; combined with the 2h window it is the main driver of
   sibling-set churn.
6. **`maybeReturnConfirmedDeferredCard`** — random, silent `dueAt=now` on long-scheduled
   cards.

---

## D. Recommended minimal fixes (not implemented — proposals)

Preserving intended features: keep the 22h first day; keep the 5h fresh-session behaviour
(it is presentation-only); keep relearn ladders and the variant round model; keep the
near-due backstop's purpose.

1. **Bound the end-of-deck advance (F1).** In `navigate`'s end-of-active branch:
   - if `getNearDueCount() === 0` *and* the near-due backstop would find nothing, make
     Next a no-op (keep the splash; optionally toast "next card due in 3h 12m");
   - otherwise advance by `min(SRS_CYCLE_ADVANCE_MS, nearestRemainingMs)` — or better,
     promote only the cards inside the 1h window (`dueAt = now` for them) and leave the
     rest of the deck untouched.
   Small, testable, removes the unbounded global shift while keeping "pull the next
   cohort in" exactly as the splash describes.
2. **Make Next a neutral skip in spaced vocab (F2).** Replace the auto-`applySpacedReview(card,'again')`
   with a queue-only move (drop the id from `spacedActiveIds`, let it re-enter via middle),
   mirroring unspaced Next's `skipRecording` semantics. If the auto-Hard is wanted
   pedagogy, at minimum render "marked Hard" feedback and exclude arrow-key repeats.
3. **Soften incomplete variant rounds (F3).** On window-expiry close-out, either skip the
   confidence sample entirely (reset the round silently) or compute the mean over
   *attempted* faces only; keep the 0-scoring for rounds abandoned mid-session if desired.
   Separately, move the close-out from `isCardDue` into one explicit pass at the top of
   `buildStudyDeck` so reads stop mutating.
4. **Make the 2% revival presentation-only (F4).** Keep a `revivedIds` set consulted by
   `isCardDue`/deck build instead of overwriting `dueAt`; or, on review of a revived card,
   schedule the next interval from `max(now, originalDueAt)`.
5. **Confirm (or throttle) fast-forward 1 day (F7)** to match the 1-week confirm.
6. **Delete the dead `applyUnspacedSchedule`/`setMinimumProgressDelay` (F13).**
7. Optional hygiene: stop rewriting `intervalDays` in `advanceScheduledCards` (F12).

---

## E. Test plan (fake `Date.now()` via injectable clock or `vi.setSystemTime`)

Notation: `T0` = start; day = 22h for the first day then 24h (`msFromDays`). Cadence
intensive unless noted. All tests seed `globalWordProgress.g2e` directly and call the
function under test; assert `dueAt`, `intervalDays`, `activeDeckCount`,
`middleDeckCount`, deferred count, and `getDueCount`.

1. **First-day model (baseline, intended):** Easy on a stabilized card
   (`confidenceHistory` = 10×1) with `lastEasyIntervalDays=0` → expect
   `dueAt = T0 + 22h`, `intervalDays = 1`. Easy again at T0+22h → `intervalDays = 3`
   (curve 2.5× rounded, minNext 2 → 3), `dueAt = +22h+2×24h = +70h`.
2. **F1 — end-of-deck Next advance:** 10 cards, all `dueAt = T0 + 10h`. At T0,
   `buildStudyDeck` → active 0, deferred 10, `getDueCount()=0`, `getNearDueCount()=0`.
   Call the end-of-active `navigate(1)` once → every `dueAt = T0 + 9h`; press 9 more
   times → all due now, `activeDeckCount = 10`. Expected-after-fix: first press is a
   no-op (or bounded), `dueAt` unchanged.
3. **F1+F5 interaction:** cards at `dueAt = T0 + 85m`. One Next press: advance 60m →
   remaining 25m → backstop fires → `dueAt = T0`, `intervalDays = 0`, all active.
   Assert current behaviour, then the fixed bound.
4. **F2 — Next as Hard:** stabilized card, `intervalDays = 14`, `lastEasyIntervalDays = 14`,
   due now. `navigate(1)` → expect (current) `ease = 2.3−0.2`, `srsStage` −1,
   `lapseCount = 1`, `inRelearn = true`, `relearnLeft = 2`, `dueAt = T0` (due now),
   0 appended to `confidenceHistory`. Then Easy at T0+5m → `relearnLeft = 1`,
   `dueAt = +22h`; Easy next day → `relearnLeft = 0`, `dueAt = +22h`; Easy again →
   resume: `lastEasyIntervalDays = 7` (½×14 capped 7), `dueAt = +22h+6×24h`.
   Expected-after-fix: `navigate(1)` leaves progress untouched and the card re-enters
   via middle.
5. **F3 — variant window expiry:** two faces sharing entry `X` (base + `::2aor`),
   set due now. Easy on base at T0 → `cycleStartedAt = T0`,
   `cycleFacesPassed = ['base']`, shared `dueAt = T0 + 2h`, base face not due
   (`isCardDue` false), sibling still due. At T0+2h+1s call `getDueCount` → round closes:
   `confidenceHistory` gains one sample = mean(1, 0)/2 = 0.5, `cycleStartedAt = 0`,
   `dueAt ≈ T0+2h+1s` (now), both faces due. Assert Review-panel due count == active count
   (no overstatement). Expected-after-fix: no 0-weighted sample (or attempted-only mean).
6. **F3 — clean round:** Easy both faces within window → `applyCorrectOutcome` growth,
   one confidence sample = 1, `dueAt = +22h`, neither face due.
7. **F4 — revival:** force `Math.random` → 0. Deferred card `dueAt = T0 + 14d`,
   confidence 100%. One flip → (current) `dueAt = T0`, card in `spacedActiveIds`.
   Expected-after-fix: `dueAt` still `T0 + 14d`, card present in active pile anyway.
8. **F6 — import migration:** payload without `srsIntervalCapAlignedV1`, entry
   `intervalDays = 30`, `lastReviewedAt = T0 − 10d`, `dueAt = T0 + 20d` → after restore,
   `intervalDays = 14`, `dueAt = lastReviewedAt + 14d` (i.e. `T0 + 4d`). Stamped payload:
   unchanged.
9. **Idle restore is presentation-only (F11):** 5 cards due, 5 deferred;
   `lastStudyActivityAt = T0 − 6h`, saved `spacedActiveIds` of 2 cards. Restore at T0 →
   `spacedActiveIds` rebuilt to all 5 due (fresh start), `middleDeckCount = 0`,
   **every `dueAt` byte-identical** before/after. Same assertion for
   mode-switch → mode-switch-back within 5h (piles resume, schedules untouched).
10. **F10 — 5 AM reset isolation:** enable auto-reset, spaced-Easy 3 cards
    (marks `'known'`, `dueAt` future), roll `lastUnspacedArchiveDayKey` back one day,
    run `maybeAutoResetUnspacedArchives` → marks cleared, `globalWordProgress` deep-equal
    unchanged, `getDueCount` unchanged.
11. **Late-night Easy / next-morning reopen (scenario check):** Easy 5 fresh-stabilized
    cards at 23:00 → `dueAt = next day 21:00`. Reopen 08:00: `getDueCount() = 0`;
    restore performs no writes; splash shows 0 near-due; (after F1 fix) Next is a no-op.

---

## F. Instrumentation suggestion

A dev-only mutation audit that wraps every schedule write, to prove in the field whether
a given "cards came early" report is real mutation (F1–F7) or pile rebuilding (F11):

```js
// js/domain/srs/audit.js — dev-only; enabled via localStorage flag 'srsAuditLog'
const LOG_KEY = 'srsAuditLogEntries';
export function auditScheduleWrite(progressId, progress, action, reason, extra = {}) {
  if (!localStorage.getItem('srsAuditLog')) return { commit() {} };
  const before = { dueAt: progress.dueAt, intervalDays: progress.intervalDays,
                   srsStage: progress.srsStage, ease: progress.ease,
                   inRelearn: progress.inRelearn, relearnLeft: progress.relearnLeft };
  return {
    commit() {
      if (before.dueAt === progress.dueAt && before.intervalDays === progress.intervalDays
          && before.srsStage === progress.srsStage && before.ease === progress.ease) return;
      const entry = { t: Date.now(), progressId, action, reason,
                      old: before,
                      new: { dueAt: progress.dueAt, intervalDays: progress.intervalDays,
                             srsStage: progress.srsStage, ease: progress.ease },
                      deltaDueMs: (progress.dueAt || 0) - (before.dueAt || 0), ...extra };
      const log = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
      log.push(entry);
      localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(-500)));
      if (entry.deltaDueMs < 0) console.warn('[srs-audit] dueAt moved EARLIER', entry);
    }
  };
}
```

Instrument (begin/commit around each write) with these `action`/`reason` tags:

| Call site | action | reason detail |
|---|---|---|
| `applyEasyGrowth` / `resumeAfterLapse` / ladder steps / leech | `review` | outcome, `relearnLeft`, cadence |
| `applyVariantRoundReview` / `endVariantRound` | `variant` | face, round age, faces attempted/total, close cause (completed / window-expiry / read-path) |
| `advanceScheduledCards` | `advance` | caller (`end-of-deck-next` \| `ff-1d` \| `ff-1w`), advanceMs, per-turn press counter |
| near-due backstop in `buildStudyDeck` | `backstop` | rebuild caller (thread a `context` string through `buildStudyDeck` options) |
| `maybeReturnConfirmedDeferredCard` | `revival` | old remaining ms |
| `returnSeenCardToDeck` | `manual-return` | — |
| resets / smooth / migration | `reset` / `smooth` / `migration` | scope, entries touched |

A one-line summary helper (`window.srsAuditSummary()`) grouping entries by `action` and
summing negative `deltaDueMs` per day will show at a glance whether observed acceleration
is dominated by `advance` (F1), `review` via auto-again (F2 — tag `applySpacedReview`
calls with the initiating UI action), `variant`, or nothing at all (pure pile rebuilds,
which produce zero log entries by construction).
