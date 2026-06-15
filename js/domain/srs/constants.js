// SRS scheduling constants

export const SRS_DAY_MS = 20 * 60 * 60 * 1000;
export const SRS_AGAIN_MS = 5 * 60 * 1000;
export const SRS_UNCERTAIN_MIN_MS = 2 * 60 * 60 * 1000;    // 2h floor for uncertain (spaced)
export const SRS_UNCERTAIN_MAX_MS = 7 * 24 * 60 * 60 * 1000; // 1-week ceiling for uncertain cards (scaled by certainty)
export const SRS_UNCERTAIN_CAP_MS = SRS_UNCERTAIN_MIN_MS;  // legacy alias
// Unspaced recovery delay is decoupled from the spaced uncertain floor — bumping
// the spaced floor (to give Again's middle-dump behaviour room) shouldn't slow
// the unspaced flip-deck cycle down.
export const SRS_UNSPACED_RECOVERY_MS = 60 * 60 * 1000;    // 1h
// Stabilization rule (in scheduler.js): "easy" caps at 1 day until the card
// has 5+ recent flips AND ≥50% confidence. Then confidence-scaled growth
// ramps 1 → 3 → 8 → 14 at top confidence rather than jumping to the cap.
export const SRS_MAX_INTERVAL_DAYS = 14;

// ── Spacing-cadence presets ──────────────────────────────────────────────
// The "easy" interval growth and the hard cap are tuned to how long the
// course runs. A 2-month intensive wants tight intervals so everything
// resurfaces before the next weekly quiz; an 8-month course can let
// well-known cards rest far longer between reviews. Each preset supplies:
//   maxIntervalDays      — hard cap on any scheduled interval (in 20 h days)
//   uncertainCeilingDays — ceiling that scales pass/uncertain intervals
//   easyCurve            — confidence → "easy" growth multiplier, piecewise:
//                          ≥90% → high; 70–89% → midBase+(pct-70)/midDiv;
//                          50–69% → lowBase+(pct-50)/lowDiv
// `intensive` reproduces the historical hard-coded behaviour exactly, so it
// stays the default and existing schedules are unchanged.
export const SRS_CADENCE_PRESETS = {
  intensive: {
    id: 'intensive',
    label: '2-month intensive',
    maxIntervalDays: SRS_MAX_INTERVAL_DAYS,      // top-confidence ramp 1 → 3 → 8 → 14
    uncertainCeilingDays: 7,
    easyCurve: { high: 2.5, midBase: 1.5, midDiv: 40, lowBase: 1.2, lowDiv: 100 }
  },
  relaxed: {
    id: 'relaxed',
    label: '8-month course',
    maxIntervalDays: 60,                          // top-confidence ramp 1 → 4 → 14 → 49 → 60
    uncertainCeilingDays: 21,
    easyCurve: { high: 3.5, midBase: 2.0, midDiv: 20, lowBase: 1.3, lowDiv: 40 }
  }
};
export const DEFAULT_SRS_CADENCE = 'intensive';
export function getCadencePreset(id) {
  return SRS_CADENCE_PRESETS[id] || SRS_CADENCE_PRESETS[DEFAULT_SRS_CADENCE];
}

export const SRS_NEAR_WINDOW_MS = 30 * 60 * 1000;
export const SRS_CYCLE_ADVANCE_MS = 60 * 60 * 1000;
// Idle gap that ends a study session. Used by spaced-mode buildStudyDeck to
// decide "fresh start" (middle → active dump + reshuffle), and by the
// persistence layer to decide whether to restore the saved active/middle
// membership across reloads. Resets on any study interaction (vocab,
// grammar, or reader — anything that fires noteStudyInteraction).
export const SESSION_IDLE_RESET_MS = 5 * 60 * 60 * 1000;
