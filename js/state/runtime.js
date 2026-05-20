// The application's mutable runtime state — every binding that used to live
// as a top-level `let` in main.js. Modules that need read or write access
// import this object directly and operate on its properties. Mutations on
// object/array properties propagate because there's a single shared
// reference; reassignments to primitive fields (e.g. `runtime.studyMode =
// 'morph'`) work because callers always go through this object.
//
// Initial values match what main.js used to declare. Anything that needs to
// be reset later (resetAllStats, restoreState) reassigns runtime.foo just
// like main.js used to reassign the bare `foo`.

import { ANALYTICS_COLLAPSED_DEFAULTS } from './store.js';

export const runtime = {
  // ── Usage / gamification ────────────────────────────────────────────
  appUsageStats: {
    totalMs: 0,
    dailyMs: {},
    activeStudyMs: 0,
    activeDailyMs: {},
    lastActiveAt: 0,
    lastStudyInteractionAt: 0,
    lastStudyCountedAt: 0,
    firstStudyAt: 0,
    studySessionHistory: [],
    currentStudySession: null
  },
  appProfile: 'vocab_grammar',
  appGamification: { lastCelebratedLevel: null, lastCelebratedBadgeDay: null, lastEarnedAchievementIds: [] },
  usageTickHandle: null,
  usageVisibilityBound: false,
  usageTickCounter: 0,
  analyticsExpandedChapter: null,
  analyticsExpandedWord: null,
  analyticsChapterSort: 'confidence', // 'confidence' | 'alphabetical'
  analyticsGrammarExpandedChapter: null,
  analyticsGrammarExpandedConcept: null,
  analyticsGrammarExpandedCard: null,
  analyticsGrammarConceptSort: 'confidence', // 'confidence' | 'alphabetical'
  // Word IDs currently expanded inside the stubborn / improved / slipping
  // lists. Keyed by the list's collapseKey so each list tracks its own
  // expansion independently — opening a row in "Most stubborn" doesn't
  // close one in "Slipping list".
  analyticsExpandedListWords: {},
  // Analytics-page-local vocab view (separate from the study deck's
  // directionToGreek / requiredOnly so analyzing one direction doesn't force
  // a deck rebuild).
  analyticsVocabDirection: 'g2e',     // 'g2e' | 'e2g'
  analyticsVocabScope: 'required',    // 'required' | 'all'
  // Per-section open/closed state for the analytics overlay's collapsibles.
  // Defaults live in ANALYTICS_COLLAPSED_DEFAULTS (store.js) so migrations
  // and compaction can share the canonical key list.
  analyticsCollapsed: { ...ANALYTICS_COLLAPSED_DEFAULTS },

  // ── Modal / disclaimer / transfer / theme ───────────────────────────
  hasAcceptedDisclaimer: false,
  disclaimerModalRequiresAgreement: false,
  transferModalMode: '',
  transferPrimaryAction: null,
  transferSecondaryAction: null,
  themeMode: 'system',
  fontFamily: 'serif',  // 'serif' | 'sans'
  textSize: 'medium',   // 'small' | 'medium' | 'large' | 'x-large'

  // ── Study mode / morphology answer state ────────────────────────────
  studyMode: 'vocab',
  morphSelfCheck: false,
  morphAnswerState: { answered: false, revealed: false, selfRated: false, selectedIndex: -1, isCorrect: null },
  morphPendingAdvance: false,

  // ── Persisted directional stores (rebuilt from localStorage) ────────
  deckStates: {},
  globalWordMarks: {},
  globalWordProgress: {},

  // ── Current study session + deck cursor ─────────────────────────────
  currentSession: null,
  selectedKeys: [],
  splitSelection: false,    // separate chapter selections for vocab vs grammar
  modeSelections: {},       // { vocab: {selectedKeys, currentSessionId}, morph: {...} }
  deck: [],
  originalDeck: [],
  // Identity of the deck currently in `deck` — which deck-state-bank entry it
  // belongs to. Set whenever a deck is freshly built; consulted by
  // saveCurrentDeckStateToBank so the in-flight deck is always filed under its
  // own key even when callers have already mutated studyMode / direction /
  // selectedKeys ahead of the rebuild.
  activeDeckRef: null,      // { key, selectedKeys, currentSessionId }
  currentIdx: 0,
  isFlipped: false,
  shuffled: true,           // shuffle on by default
  requiredOnly: true,
  directionToGreek: false,  // false = Greek→English, true = English→Greek
  spacedRepetition: true,
  hardVocabReviewMode: false, // restrict vocab deck to cards missed >10× and still under 40% confidence
  activeDeckCount: 0,
  unspacedPendingRecycle: false,
  unspacedCycleState: {},
  unspacedDeferredIds: new Set(), // 'pass' and 'again' cards excluded from current pass; reappear in next cycle
  flipsSinceReshuffle: 0,         // forward navigations since last periodic reshuffle (legacy; see lastPeriodicReshuffleAt)
  lastPeriodicReshuffleAt: 0,     // timestamp (ms) of the last periodic reshuffle; throttled to ≥ 1 hour
  spacedUndoSnapshot: null,

  // ── Per-direction mark store for the active study mode ──────────────
  marks: {}
};
