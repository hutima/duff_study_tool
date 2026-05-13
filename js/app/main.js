// ═══════════════════════════════════════════════════════
//  GREEK FLASHCARDS — Modular Entry Point
// ═══════════════════════════════════════════════════════

// Utils
import { clamp, isPlainObject, shuffleArray, escapeHtml, cloneForUndo } from '../utils/helpers.js';
import { formatUsageDuration, formatAnalyticsDate, formatAnalyticsDateTime, getUsageDayKey } from '../utils/time.js';
import { getStorage, isLikelyIOS } from '../utils/storage.js';
import { compareGreekAlphabetical } from '../utils/greekSort.js';

// Domain — SRS
import { SRS_DAY_MS, SRS_AGAIN_MS, SRS_UNCERTAIN_MIN_MS, SRS_NEAR_WINDOW_MS, SRS_CYCLE_ADVANCE_MS } from '../domain/srs/constants.js';
import { msFromDays, setProgressDelay, setMinimumProgressDelay,
         getSrsEase, getSrsStage, getLastEasyIntervalDays, getNextEasyIntervalDays,
         getEasyDelayMs, getUncertainDelayMs, formatRemainingForTable } from '../domain/srs/scheduler.js';
import { recordConfidenceSample, getConfidencePct, computeCardXpAward } from '../domain/srs/confidence.js';

// Domain — Gamification
import { XP_LEVELS, REVIEW_XP_SCHEDULE } from '../domain/gamification/levels.js';
import {
  sanitizeUsageStats,
  accumulateUsageTime as accumulateUsageTimeForStats,
  accumulateActiveStudyTime as accumulateActiveStudyTimeForStats,
  finalizeStudySession as finalizeStudySessionForStats,
  noteStudyInteraction as noteStudyInteractionForStats,
  getUsageMsForDay,
  getActiveStudyMsForDay
} from '../domain/gamification/usageStats.js';
import {
  migrateLegacyXp as migrateLegacyXpPure,
  computeStudyStreaks,
  computeXpAndLevel as computeXpAndLevelPure,
  computeTodayStats,
  computeAchievements as computeAchievementsPure,
  getRegressionProjection
} from '../domain/gamification/xp.js';

// Domain — Deck
import { isChapterKey, isAdvancedKey, sortSetKeys, sourceHint, expandSessionSets } from '../domain/deck/ordering.js';
import { getSelectedVocabCards, getSelectedGrammarCards, getAllVocabKeys, getAllChapterKeys,
         getAllVocabCards, getAllGrammarCards, getChapterVocabCards,
         getCardReviewLeft, getCardReviewRight, getCardMetaLine, getCardAuxLine } from '../domain/deck/filters.js';

// Domain — Grammar
import { buildGrammarSupportHtml } from '../domain/grammar/explanations.js';

// UI
import {
  configureReader,
  renderReaderModule,
  advanceReaderDrill,
  selectReaderDrillChoice,
  openReaderTab
} from '../ui/reader.js';
import { installKeyboardShortcuts } from '../ui/keyboard.js';
import { showLevelToast, showBadgeToast } from '../ui/toast.js';
import { installTouchSafeTapBridge } from '../ui/touchTapBridge.js';
import {
  configureModals,
  updateConsentButtonState,
  openDisclaimerModal,
  closeDisclaimerModal,
  handleConsentAction,
  initializeConsentGate,
  showDisclaimerModal,
  isDisclaimerModalOpen,
  maybeShowWhatsNewV1_1Modal,
  openWhatsNewV1_1Modal,
  closeWhatsNewV1_1Modal,
  isWhatsNewV1_1ModalOpen,
  isTransferModalOpen,
  isStudySelectorOpen,
  openStudySelector,
  closeStudySelector,
  isShortcutsModalOpen,
  openShortcutsModal,
  closeShortcutsModal,
  isAnalyticsModalOpen,
  openAnalyticsOverlay,
  closeAnalyticsOverlay,
  startStudying
} from '../ui/modals.js';
import {
  configureProgress,
  renderProgress,
  renderReview,
  returnSeenCardToDeck
} from '../ui/progress.js';
import { configureRender, renderCard, flipCard } from '../ui/render.js';
import {
  backfillConfirmedMilestones,
  buildDailyCumulativeSeriesFromMap,
  buildCumulativeConfirmationSeries,
  getCertaintyBucketForCard,
  buildCertaintyBuckets,
  buildConfirmationHistogram,
  buildHistogramSvg,
  buildLineChartSvg,
  buildBarChartSvg,
  buildHeatmapSvg,
  buildCircularProgressSvg,
  buildLevelBarHtml,
  buildTitleLadderHtml,
  buildWordStatCardHtml
} from '../ui/charts.js';

// State
import { STATE_MIGRATIONS, summarizePersistedState, formatPersistedStateSummary } from '../state/migrations.js';
import {
  sanitizeGamificationState,
  STORAGE_KEY,
  CONSENT_STORAGE_KEY,
  WHATS_NEW_V1_1_STORAGE_KEY,
  THEME_STORAGE_KEY,
  PROGRESS_EXPORT_FORMAT,
  PROGRESS_EXPORT_VERSION,
  STUDY_IDLE_MS,
  STUDY_SESSION_BREAK_MS,
  MAX_STUDY_SESSION_HISTORY
} from '../state/store.js';

// Wire UI modules with the host helpers they call back into.
// Function declarations are hoisted; getter/setter closures defer reads to
// invocation time, so let-binding values are valid by the time they're called.
configureReader({ noteStudyInteraction, setStudyMode });
configureModals({
  renderAnalyticsOverlay: () => renderAnalyticsOverlay(),
  buildSessions: () => buildSessions(),
  buildChapterSelector: () => buildChapterSelector(),
  buildSupplementalSelector: () => buildSupplementalSelector(),
  buildAdvancedSelector: () => buildAdvancedSelector(),
  getHasAcceptedDisclaimer: () => runtime.hasAcceptedDisclaimer,
  setHasAcceptedDisclaimer: (v) => { runtime.hasAcceptedDisclaimer = v; },
  getDisclaimerModalRequiresAgreement: () => runtime.disclaimerModalRequiresAgreement,
  setDisclaimerModalRequiresAgreement: (v) => { runtime.disclaimerModalRequiresAgreement = v; },
  hasSelectedKeys: () => runtime.selectedKeys.length > 0
});
configureProgress({
  accumulateUsageTime: () => accumulateUsageTime(),
  accumulateActiveStudyTime: () => accumulateActiveStudyTime(),
  updateUsageMeta: () => updateUsageMeta(),
  getKnownCount: () => getKnownCount(),
  getDueCount: (cards) => getDueCount(cards),
  getRemainingCards: () => getRemainingCards(),
  getHighConfidenceCount: () => getHighConfidenceCount(),
  getDeckAggregateStats: (cards) => getDeckAggregateStats(cards),
  getWordProgress: (id) => getWordProgress(id),
  isMorphologyMode: () => isMorphologyMode(),
  renderAnalyticsOverlay: () => renderAnalyticsOverlay(),
  moveCardToBackOfActivePile: (card) => moveCardToBackOfActivePile(card),
  buildStudyDeck: (cards, opts) => buildStudyDeck(cards, opts),
  renderCard: () => renderCard(),
  saveState: () => saveState()
});
configureRender({
  saveState: () => saveState(),
  syncLayoutVisibility: () => syncLayoutVisibility(),
  noteStudyInteraction: () => noteStudyInteraction(),
  isMorphologyMode: () => isMorphologyMode(),
  isReverseGrammarActive: () => isReverseGrammarActive(),
  isMorphCard: (card) => isMorphCard(card),
  reverseDisplayActive: (card) => reverseDisplayActive(card),
  startNextCycle: (mode) => startNextCycle(mode),
  resetMorphAnswerState: () => resetMorphAnswerState(),
  maybeReturnKnownCardToActivePile: () => maybeReturnKnownCardToActivePile(),
  formatGreekHeadword: (g) => typeof window !== 'undefined' && typeof window.formatGreekHeadword === 'function' ? window.formatGreekHeadword(g) : (g || '—'),
  transliterateGreek: (s) => typeof window !== 'undefined' && typeof window.transliterateGreek === 'function' ? window.transliterateGreek(s) : s,
  detectPartOfSpeech: (card) => typeof window !== 'undefined' && typeof window.detectPartOfSpeech === 'function' ? window.detectPartOfSpeech(card) : ''
});


function getDirectionKey() {
  return runtime.directionToGreek ? 'e2g' : 'g2e';
}

function getStudyStoreKey() {
  if (runtime.studyMode === 'morph') {
    return runtime.directionToGreek ? 'morph_e2g' : 'morph';
  }
  return getDirectionKey();
}

function isReverseGrammarActive() {
  return runtime.studyMode === 'morph' && runtime.directionToGreek;
}

function reverseDisplayActive(card) {
  return isReverseGrammarActive() && !!card && card.reversible === true;
}

function ensureDirectionalStores() {
  if (!runtime.globalWordMarks || typeof runtime.globalWordMarks !== 'object' || Array.isArray(runtime.globalWordMarks)) runtime.globalWordMarks = {};
  if (!runtime.globalWordProgress || typeof runtime.globalWordProgress !== 'object' || Array.isArray(runtime.globalWordProgress)) runtime.globalWordProgress = {};

  const migrateLegacyBucket = (bucketObj) => {
    const keys = Object.keys(bucketObj || {});
    if (keys.length && !('g2e' in bucketObj) && !('e2g' in bucketObj) && !('morph' in bucketObj)) {
      return { g2e: { ...bucketObj }, e2g: {}, morph: {} };
    }
    return bucketObj;
  };

  runtime.globalWordMarks = migrateLegacyBucket(runtime.globalWordMarks);
  runtime.globalWordProgress = migrateLegacyBucket(runtime.globalWordProgress);

  if (!runtime.globalWordMarks.g2e || typeof runtime.globalWordMarks.g2e !== 'object') runtime.globalWordMarks.g2e = {};
  if (!runtime.globalWordMarks.e2g || typeof runtime.globalWordMarks.e2g !== 'object') runtime.globalWordMarks.e2g = {};
  if (!runtime.globalWordMarks.morph || typeof runtime.globalWordMarks.morph !== 'object') runtime.globalWordMarks.morph = {};
  if (!runtime.globalWordMarks.morph_e2g || typeof runtime.globalWordMarks.morph_e2g !== 'object') runtime.globalWordMarks.morph_e2g = {};
  if (!runtime.globalWordProgress.g2e || typeof runtime.globalWordProgress.g2e !== 'object') runtime.globalWordProgress.g2e = {};
  if (!runtime.globalWordProgress.e2g || typeof runtime.globalWordProgress.e2g !== 'object') runtime.globalWordProgress.e2g = {};
  if (!runtime.globalWordProgress.morph || typeof runtime.globalWordProgress.morph !== 'object') runtime.globalWordProgress.morph = {};
  if (!runtime.globalWordProgress.morph_e2g || typeof runtime.globalWordProgress.morph_e2g !== 'object') runtime.globalWordProgress.morph_e2g = {};
}

function getDirectionalMarksStore() {
  ensureDirectionalStores();
  return runtime.globalWordMarks[getStudyStoreKey()];
}

function getDirectionalProgressStore() {
  ensureDirectionalStores();
  return runtime.globalWordProgress[getStudyStoreKey()];
}


// Fixed 1-in-N chance per flip (not scaled by pool size) to return one
// random known card to the active pile. 50 → ~1 return per 50 flips (2%).
const KNOWN_CARD_RANDOM_RETURN_FLIP_ODDS = 50;


function isMorphologyMode() {
  return runtime.studyMode === 'morph';
}

function isReaderMode() {
  return runtime.studyMode === 'reader';
}

function isCardStudyMode() {
  return runtime.studyMode === 'vocab' || runtime.studyMode === 'morph' || runtime.studyMode === 'reader';
}

function isReviewDeckMode() {
  return runtime.studyMode === 'vocab' || runtime.studyMode === 'morph';
}

function isVocabOnlyProfile() {
  return false;
}

function canAccessGrammarUi() {
  return !isVocabOnlyProfile();
}

function getSessions() {
  return Array.isArray(window.SESSIONS) ? window.SESSIONS : [];
}

function getProfileDescription() {
  return 'Full layout with vocabulary, grammar, reader, and memorization. Time totals stay shared, while progress remains separate by module.';
}

function normalizeStudyMode(mode) {
  if (mode === 'morph' && canAccessGrammarUi()) return 'morph';
  if (mode === 'reader') return 'reader';
  return 'vocab';
}

function isMorphCard(card) {
  return !!card && card.kind === 'morph';
}

function resetMorphAnswerState() {
  runtime.morphAnswerState = { answered: false, revealed: false, selfRated: false, selectedIndex: -1, isCorrect: null };
  runtime.morphPendingAdvance = false;
}

function getModeDescription() {
  if (isMorphologyMode()) return 'Grammar Quiz';
  if (isReaderMode()) return 'Reader';
  return 'Vocabulary Flashcards';
}

function resolveThemeMode(mode = runtime.themeMode) {
  if (mode === 'light' || mode === 'dark') return mode;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

function applyThemeMode(mode = runtime.themeMode, persist = true) {
  runtime.themeMode = mode === 'light' || mode === 'dark' ? mode : 'system';
  const resolved = resolveThemeMode(runtime.themeMode);
  document.documentElement.setAttribute('data-theme', resolved);

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute('content', resolved === 'light' ? '#f4efe3' : '#0e0f14');

  const storage = getStorage();
  if (persist && storage) storage.setItem(THEME_STORAGE_KEY, runtime.themeMode);
  syncThemeButtons();
}

function syncThemeButtons() {
  const systemBtn = document.getElementById('themeSystemBtn');
  const darkBtn = document.getElementById('themeDarkBtn');
  const lightBtn = document.getElementById('themeLightBtn');
  if (systemBtn) systemBtn.classList.toggle('active', runtime.themeMode === 'system');
  if (darkBtn) darkBtn.classList.toggle('active', runtime.themeMode === 'dark');
  if (lightBtn) lightBtn.classList.toggle('active', runtime.themeMode === 'light');
}

function setThemeMode(mode) {
  applyThemeMode(mode, true);
}

function initializeThemeMode() {
  const storage = getStorage();
  const savedMode = storage ? storage.getItem(THEME_STORAGE_KEY) : null;
  runtime.themeMode = savedMode === 'light' || savedMode === 'dark' || savedMode === 'system' ? savedMode : 'system';
  applyThemeMode(runtime.themeMode, false);

  if (window.matchMedia) {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (runtime.themeMode === 'system') applyThemeMode('system', false);
    };
    if (typeof media.addEventListener === 'function') media.addEventListener('change', handleChange);
    else if (typeof media.addListener === 'function') media.addListener(handleChange);
  }
}

function syncToggleButtons() {
  const requiredSwitch  = document.getElementById('requiredBtn');
  const shuffleSwitch   = document.getElementById('shuffleBtn');
  const directionSwitch = document.getElementById('directionBtn');
  const spacedSwitch    = document.getElementById('spacedBtn');
  const selfCheckBtn    = document.getElementById('selfCheckBtn');
  const shuffleToggle   = document.getElementById('shuffleToggle');
  const requiredToggle  = document.getElementById('requiredToggle');
  const directionToggle = document.getElementById('directionToggle');
  const spacedToggle    = document.getElementById('spacedToggle');
  const selfCheckToggle = document.getElementById('selfCheckToggle');
  const modeVocabBtn    = document.getElementById('modeVocabBtn');
  const modeMorphBtn    = document.getElementById('modeMorphBtn');
  const modeReaderBtn   = document.getElementById('modeReaderBtn');
  const modeShortcutVocabBtn = document.getElementById('modeShortcutVocabBtn');
  const modeShortcutMorphBtn = document.getElementById('modeShortcutMorphBtn');
  const modeShortcutReaderBtn = document.getElementById('modeShortcutReaderBtn');
  const resetDeckBtn = document.getElementById('resetDeckBtn');

  if (shuffleSwitch)   shuffleSwitch.classList.toggle('on',   !!runtime.shuffled);
  if (requiredSwitch)  requiredSwitch.classList.toggle('on',  !!runtime.requiredOnly);
  if (directionSwitch) directionSwitch.classList.toggle('on', !!runtime.directionToGreek);
  if (spacedSwitch)    spacedSwitch.classList.toggle('on',    !!runtime.spacedRepetition);
  if (selfCheckBtn)    selfCheckBtn.classList.toggle('on',    !!runtime.morphSelfCheck && isMorphologyMode());
  if (shuffleToggle)   shuffleToggle.setAttribute('aria-checked',   runtime.shuffled ? 'true' : 'false');
  if (requiredToggle)  requiredToggle.setAttribute('aria-checked',  runtime.requiredOnly ? 'true' : 'false');
  if (directionToggle) directionToggle.setAttribute('aria-checked', runtime.directionToGreek ? 'true' : 'false');
  if (spacedToggle)    spacedToggle.setAttribute('aria-checked',    runtime.spacedRepetition ? 'true' : 'false');
  if (selfCheckToggle) selfCheckToggle.setAttribute('aria-checked', (runtime.morphSelfCheck && isMorphologyMode()) ? 'true' : 'false');

  if (directionToggle) {
    const directionLabel = directionToggle.querySelector('.toggle-text');
    if (directionLabel) {
      directionLabel.textContent = isMorphologyMode()
        ? 'English → Greek'
        : 'Eng → Gk';
    }
  }
  if (modeVocabBtn)    modeVocabBtn.classList.toggle('active', runtime.studyMode === 'vocab');
  if (modeMorphBtn)    modeMorphBtn.classList.toggle('active', runtime.studyMode === 'morph');
  if (modeReaderBtn)   modeReaderBtn.classList.toggle('active', runtime.studyMode === 'reader');
  if (modeShortcutVocabBtn) modeShortcutVocabBtn.classList.toggle('active', runtime.studyMode === 'vocab');
  if (modeShortcutMorphBtn) modeShortcutMorphBtn.classList.toggle('active', runtime.studyMode === 'morph');
  if (modeShortcutReaderBtn) modeShortcutReaderBtn.classList.toggle('active', runtime.studyMode === 'reader');
  syncThemeButtons();
  if (resetDeckBtn) {
    resetDeckBtn.textContent = runtime.spacedRepetition ? 'Reset spaced' : 'Reset unspaced';
    resetDeckBtn.title = runtime.spacedRepetition
      ? 'Reset spaced-review scheduling for this deck only'
      : 'Reset unspaced marks for this deck only';
  }

  const subtitle = document.getElementById('appSubtitle');
  if (subtitle) subtitle.textContent = getModeDescription();

  syncLayoutVisibility();
}

function syncLayoutVisibility() {
  const controlsBar = document.getElementById('controlsBar');
  const navRow = document.getElementById('navRow');
  const markRow = document.getElementById('markRow');
  const ffRow = document.getElementById('ffRow');
  const prevBtn = navRow ? navRow.querySelector('.nav-prev') : null;
  const nextBtn = navRow ? navRow.querySelector('.nav-next') : null;
  const undoBtn = document.getElementById('spacedUndoBtn');
  const directionToggle = document.getElementById('directionToggle');
  const requiredToggle = document.getElementById('requiredToggle');
  const selfCheckToggle = document.getElementById('selfCheckToggle');
  const shuffleToggle = document.getElementById('shuffleToggle');
  const spacedToggle = document.getElementById('spacedToggle');
  const modeGroup = document.querySelector('.mode-group[aria-label="Study mode"]');
  const cardArea = document.getElementById('cardArea');
  const reviewShell = document.querySelector('.review-shell');
  const cardMode = isCardStudyMode();
  const reviewDeckMode = isReviewDeckMode();

  if (controlsBar) controlsBar.style.display = 'flex';
  if (cardArea) cardArea.style.display = cardMode ? '' : 'none';
  if (reviewShell) reviewShell.style.display = reviewDeckMode ? '' : 'none';
  if (navRow) navRow.style.display = reviewDeckMode && runtime.selectedKeys.length ? 'flex' : 'none';
  if (markRow) markRow.style.display = reviewDeckMode && runtime.selectedKeys.length && !isMorphologyMode() ? 'flex' : 'none';
  if (ffRow) ffRow.style.display = reviewDeckMode && runtime.selectedKeys.length && runtime.spacedRepetition ? 'flex' : 'none';
  if (directionToggle) directionToggle.style.display = (runtime.studyMode === 'vocab' || runtime.studyMode === 'morph') ? 'flex' : 'none';
  if (requiredToggle) requiredToggle.style.display = runtime.studyMode === 'vocab' ? 'flex' : 'none';
  if (selfCheckToggle) selfCheckToggle.style.display = isMorphologyMode() && canAccessGrammarUi() ? 'flex' : 'none';
  if (shuffleToggle) shuffleToggle.style.display = reviewDeckMode ? 'flex' : 'none';
  if (spacedToggle) spacedToggle.style.display = reviewDeckMode ? 'flex' : 'none';
  if (modeGroup) modeGroup.style.display = canAccessGrammarUi() ? 'inline-flex' : 'none';
  if (!reviewDeckMode) return;
  if (prevBtn) {
    const hidePrev = isMorphologyMode() || (runtime.spacedRepetition && !isMorphologyMode());
    prevBtn.style.display = hidePrev ? 'none' : '';
    const atStart = !runtime.deck.length || runtime.currentIdx <= 0;
    prevBtn.disabled = atStart;
    prevBtn.classList.toggle('nav-disabled', atStart);
  }
  if (undoBtn) {
    const morphUndoActive = isMorphologyMode() && runtime.morphAnswerState.answered && !!runtime.spacedUndoSnapshot;
    const vocabUndoActive = runtime.spacedRepetition && !isMorphologyMode() && !!runtime.spacedUndoSnapshot;
    undoBtn.style.display = (morphUndoActive || vocabUndoActive) ? '' : 'none';
  }
  if (nextBtn) {
    if (isMorphologyMode()) {
      nextBtn.textContent = 'Next →';
      nextBtn.classList.remove('spaced-again');
    } else {
      nextBtn.textContent = runtime.spacedRepetition ? 'Again →' : 'Next →';
      nextBtn.classList.toggle('spaced-again', !!runtime.spacedRepetition);
    }
  }

}

function ensureUsageStats(stats = runtime.appUsageStats) {
  const safe = sanitizeUsageStats(stats, MAX_STUDY_SESSION_HISTORY);
  if (stats !== safe) runtime.appUsageStats = safe;
  return safe;
}

function accumulateUsageTime(now = Date.now()) {
  const usage = ensureUsageStats();
  return accumulateUsageTimeForStats(usage, now);
}

function accumulateActiveStudyTime(now = Date.now()) {
  const usage = ensureUsageStats();
  return accumulateActiveStudyTimeForStats(usage, STUDY_IDLE_MS, now);
}

function finalizeStudySession(now = Date.now()) {
  const usage = ensureUsageStats();
  finalizeStudySessionForStats(usage, STUDY_IDLE_MS, MAX_STUDY_SESSION_HISTORY, now);
}

function noteStudyInteraction(now = Date.now()) {
  const usage = ensureUsageStats();
  noteStudyInteractionForStats(usage, {
    now,
    documentHidden: document.hidden,
    hasSelectedCards: runtime.selectedKeys.length > 0,
    studyIdleMs: STUDY_IDLE_MS,
    studySessionBreakMs: STUDY_SESSION_BREAK_MS,
    maxStudySessionHistory: MAX_STUDY_SESSION_HISTORY
  });
}

function getTodayUsageMs() {
  const usage = ensureUsageStats();
  return getUsageMsForDay(usage, getUsageDayKey());
}

function getTodayActiveStudyMs() {
  const usage = ensureUsageStats();
  return getActiveStudyMsForDay(usage, getUsageDayKey());
}

function updateUsageMeta() {
  const el = document.getElementById('progressMeta');
  if (!el) return;
  const usage = ensureUsageStats();
  el.textContent = `Today ${formatUsageDuration(getTodayActiveStudyMs())} · Study ${formatUsageDuration(usage.activeStudyMs)} · Total ${formatUsageDuration(usage.totalMs)}`;
}

function startUsageTracking() {
  ensureUsageStats();
  if (!document.hidden && !runtime.appUsageStats.lastActiveAt) {
    runtime.appUsageStats.lastActiveAt = Date.now();
  }

  if (!runtime.usageVisibilityBound) {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        const now = Date.now();
        accumulateUsageTime(now);
        finalizeStudySession(now);
        runtime.appUsageStats.lastActiveAt = 0;
        updateUsageMeta();
        saveState();
      } else {
        runtime.appUsageStats.lastActiveAt = Date.now();
        updateUsageMeta();
      }
    });

    window.addEventListener('pagehide', () => {
      const now = Date.now();
      accumulateUsageTime(now);
      finalizeStudySession(now);
      runtime.appUsageStats.lastActiveAt = 0;
      saveState();
    });

    runtime.usageVisibilityBound = true;
  }

  if (!runtime.usageTickHandle) {
    runtime.usageTickHandle = window.setInterval(() => {
      if (document.hidden) return;
      const now = Date.now();
      const delta = accumulateUsageTime(now);
      const activeDelta = accumulateActiveStudyTime(now);
      if (delta > 0 || activeDelta > 0) {
        updateUsageMeta();
        if (isAnalyticsModalOpen()) renderAnalyticsOverlay();
        runtime.usageTickCounter += 1;
        if (runtime.usageTickCounter >= 4) {
          runtime.usageTickCounter = 0;
          saveState();
        }
      }
    }, 15000);
  }
}


// ── Unspaced cycle state helpers (state-coupled) ──

function resetUnspacedCycleState() {
  runtime.unspacedCycleState = {};
  runtime.unspacedDeferredIds = new Set();
  runtime.flipsSinceReshuffle = 0;
}

function getUnspacedCycleEntry(cardId) {
  if (!runtime.unspacedCycleState[cardId] || typeof runtime.unspacedCycleState[cardId] !== 'object') {
    runtime.unspacedCycleState[cardId] = { wrongThisCycle: false, correctCount: 0, lastOutcome: null };
  }
  return runtime.unspacedCycleState[cardId];
}

function applyUnspacedSharedSchedule(card, outcome, reviewedAt = Date.now()) {
  const progress = getWordProgress(card.id);
  const cycleEntry = getUnspacedCycleEntry(card.id);
  const normalizedOutcome = outcome === 'easy' ? 'easy' : outcome === 'pass' ? 'pass' : 'again';

  if (normalizedOutcome === 'again') {
    cycleEntry.wrongThisCycle = true;
    cycleEntry.lastOutcome = 'again';
    setProgressDelay(progress, SRS_AGAIN_MS, reviewedAt);
    return progress;
  }

  const recoveringFromMiss = cycleEntry.wrongThisCycle;
  const minimumDelayMs = (normalizedOutcome === 'pass' || recoveringFromMiss)
    ? SRS_UNCERTAIN_MIN_MS
    : SRS_DAY_MS;

  cycleEntry.correctCount += 1;
  cycleEntry.lastOutcome = normalizedOutcome;
  setMinimumProgressDelay(progress, minimumDelayMs, reviewedAt);
  return progress;
}

// ── Card selection wrapper (state-coupled) ──

function getSelectedCards(keys) {
  if (isMorphologyMode()) {
    const cards = getSelectedGrammarCards(keys);
    if (isReverseGrammarActive()) {
      return cards.filter(card => card && card.reversible === true);
    }
    return cards;
  }
  return getSelectedVocabCards(keys, false);
}


function isSupplementalCard(card) {
  const key = String((card && card.sourceKey) || '');
  const set = key && window.SETS && typeof window.SETS === 'object' ? window.SETS[key] : null;
  return !!(
    card && (
      card.supplemental ||
      (set && (set.supplemental || set.type === 'supplemental')) ||
      /^W\d+O$/.test(key) ||
      /^W\d+_/.test(key)
    )
  );
}

function isAdvancedCard(card) {
  const key = String((card && card.sourceKey) || '');
  const set = key && window.SETS && typeof window.SETS === 'object' ? window.SETS[key] : null;
  return !!(
    card && (
      card.advanced ||
      (set && (set.advanced || set.type === 'advanced')) ||
      isAdvancedKey(key)
    )
  );
}

function advanceScheduledCards(cards = runtime.originalDeck, advanceMs = SRS_CYCLE_ADVANCE_MS) {
  const now = Date.now();
  (cards || []).forEach(card => {
    const progress = getWordProgress(card.id);
    if (progress.dueAt && progress.dueAt > now) {
      progress.dueAt = Math.max(now, progress.dueAt - advanceMs);
      progress.intervalDays = Math.max(0, (progress.dueAt - now) / SRS_DAY_MS);
    }
  });
}

function getWordProgress(cardId) {
  const progressStore = getDirectionalProgressStore();
  const existing = progressStore[cardId];
  if (existing && typeof existing === 'object') {
    existing.seenCount = Number.isFinite(existing.seenCount) ? Math.max(0, existing.seenCount) : 0;
    existing.passCount = Number.isFinite(existing.passCount) ? Math.max(0, existing.passCount) : 0;
    existing.failCount = Number.isFinite(existing.failCount) ? Math.max(0, existing.failCount) : 0;
    existing.streak = Number.isFinite(existing.streak) ? Math.max(0, existing.streak) : 0;
    existing.easyStreak = Number.isFinite(existing.easyStreak) ? Math.max(0, existing.easyStreak) : 0;
    existing.srsStage = Number.isFinite(existing.srsStage) ? Math.max(0, Math.floor(existing.srsStage)) : 0;
    existing.ease = clamp(Number.isFinite(existing.ease) ? existing.ease : 2.3, 1.3, 3.0);
    existing.intervalDays = Number.isFinite(existing.intervalDays) ? Math.max(0, existing.intervalDays) : 0;
    existing.lastEasyIntervalDays = Number.isFinite(existing.lastEasyIntervalDays) ? Math.max(0, existing.lastEasyIntervalDays) : 0;
    existing.dueAt = Number.isFinite(existing.dueAt) ? Math.max(0, existing.dueAt) : 0;
    existing.lastReviewedAt = Number.isFinite(existing.lastReviewedAt) ? Math.max(0, existing.lastReviewedAt) : 0;
    existing.firstSeenAt = Number.isFinite(existing.firstSeenAt) ? Math.max(0, existing.firstSeenAt) : 0;
    existing.firstConfirmedAt = Number.isFinite(existing.firstConfirmedAt) ? Math.max(0, existing.firstConfirmedAt) : 0;
    existing.confidence = Number.isFinite(existing.confidence) ? Math.max(0, existing.confidence) : 0;
    existing.confidenceHistory = Array.isArray(existing.confidenceHistory) ? existing.confidenceHistory.filter(value => Number.isFinite(value)).slice(-10) : [];
    return existing;
  }
  const fresh = {
    seenCount: 0,
    passCount: 0,
    failCount: 0,
    streak: 0,
    easyStreak: 0,
    srsStage: 0,
    ease: 2.3,
    intervalDays: 0,
    lastEasyIntervalDays: 0,
    dueAt: 0,
    lastReviewedAt: 0,
    firstSeenAt: 0,
    firstConfirmedAt: 0,
    confidence: 0,
    confidenceHistory: []
  };
  progressStore[cardId] = fresh;
  return fresh;
}

function isCardDue(card) {
  if (!runtime.spacedRepetition) return true;
  const progress = getWordProgress(card.id);
  return !progress.dueAt || progress.dueAt <= Date.now();
}

function sortCardsByDue(cards) {
  return [...cards].sort((a, b) => {
    const aDue = getWordProgress(a.id).dueAt || 0;
    const bDue = getWordProgress(b.id).dueAt || 0;
    if (aDue !== bDue) return aDue - bDue;
    return a.id.localeCompare(b.id);
  });
}

function clearSpacedUndoSnapshot() {
  runtime.spacedUndoSnapshot = null;
}

function captureSpacedUndoSnapshot() {
  if (!runtime.selectedKeys.length || !runtime.deck[runtime.currentIdx]) {
    clearSpacedUndoSnapshot();
    return;
  }
  if (runtime.spacedRepetition && runtime.currentIdx >= runtime.activeDeckCount) {
    clearSpacedUndoSnapshot();
    return;
  }
  runtime.spacedUndoSnapshot = {
    selectedKeys: cloneForUndo(runtime.selectedKeys),
    currentSessionId: runtime.currentSession ? runtime.currentSession.id : null,
    studyMode: runtime.studyMode,
    directionToGreek: runtime.directionToGreek,
    requiredOnly: runtime.requiredOnly,
    shuffled: runtime.shuffled,
    spacedRepetition: runtime.spacedRepetition,
    currentIdx: runtime.currentIdx,
    activeDeckCount: runtime.activeDeckCount,
    isFlipped: runtime.isFlipped,
    unspacedPendingRecycle: runtime.unspacedPendingRecycle,
    morphAnswerState: cloneForUndo(runtime.morphAnswerState),
    morphPendingAdvance: runtime.morphPendingAdvance,
    deck: cloneForUndo(runtime.deck),
    originalDeck: cloneForUndo(runtime.originalDeck),
    marksStore: cloneForUndo(getDirectionalMarksStore()),
    progressStore: cloneForUndo(getDirectionalProgressStore()),
    appUsageStats: cloneForUndo(runtime.appUsageStats),
    appGamification: cloneForUndo(runtime.appGamification)
  };
}

function restoreSpacedUndo() {
  if (!runtime.spacedUndoSnapshot) return;
  if (runtime.studyMode !== runtime.spacedUndoSnapshot.studyMode) return;
  if (runtime.directionToGreek !== runtime.spacedUndoSnapshot.directionToGreek) return;
  if (runtime.requiredOnly !== runtime.spacedUndoSnapshot.requiredOnly) return;
  if (runtime.shuffled !== runtime.spacedUndoSnapshot.shuffled) return;
  if (runtime.spacedRepetition !== runtime.spacedUndoSnapshot.spacedRepetition) return;
  if (JSON.stringify(runtime.selectedKeys) !== JSON.stringify(runtime.spacedUndoSnapshot.selectedKeys || [])) return;
  if ((runtime.currentSession ? runtime.currentSession.id : null) !== (runtime.spacedUndoSnapshot.currentSessionId || null)) return;

  const marksStore = getDirectionalMarksStore();
  Object.keys(marksStore).forEach(key => delete marksStore[key]);
  Object.assign(marksStore, cloneForUndo(runtime.spacedUndoSnapshot.marksStore) || {});

  const progressStore = getDirectionalProgressStore();
  Object.keys(progressStore).forEach(key => delete progressStore[key]);
  Object.assign(progressStore, cloneForUndo(runtime.spacedUndoSnapshot.progressStore) || {});

  runtime.marks = marksStore;
  runtime.originalDeck = cloneForUndo(runtime.spacedUndoSnapshot.originalDeck) || [];
  runtime.deck = cloneForUndo(runtime.spacedUndoSnapshot.deck) || [];
  runtime.appUsageStats = ensureUsageStats(cloneForUndo(runtime.spacedUndoSnapshot.appUsageStats));
  runtime.appGamification = sanitizeGamificationState(cloneForUndo(runtime.spacedUndoSnapshot.appGamification));
  const restoredLevel = computeXpAndLevel(runtime.appUsageStats).currentLevel.level;
  if (!Number.isFinite(runtime.appGamification.lastCelebratedLevel) || runtime.appGamification.lastCelebratedLevel < 1 || runtime.appGamification.lastCelebratedLevel > restoredLevel) {
    runtime.appGamification.lastCelebratedLevel = restoredLevel;
  }
  runtime.currentIdx = Math.max(0, Math.min(runtime.spacedUndoSnapshot.currentIdx || 0, runtime.deck.length ? runtime.deck.length - 1 : 0));
  runtime.activeDeckCount = Math.max(0, runtime.spacedUndoSnapshot.activeDeckCount || 0);
  runtime.isFlipped = !!runtime.spacedUndoSnapshot.isFlipped;
  runtime.unspacedPendingRecycle = !!runtime.spacedUndoSnapshot.unspacedPendingRecycle;
  if (isMorphologyMode() && runtime.spacedUndoSnapshot.morphAnswerState) {
    runtime.morphAnswerState = cloneForUndo(runtime.spacedUndoSnapshot.morphAnswerState);
    runtime.morphPendingAdvance = !!runtime.spacedUndoSnapshot.morphPendingAdvance;
  } else {
    resetMorphAnswerState();
  }
  clearSpacedUndoSnapshot();
  renderCard();
  renderReview();
  renderProgress();
  syncLayoutVisibility();
  saveState();
}

function buildStudyDeck(cards, options = {}) {
  if (!runtime.spacedRepetition) {
    runtime.activeDeckCount = cards.filter(card => runtime.marks[card.id] !== 'known').length;
    return runtime.shuffled ? shuffleArray([...cards]) : [...cards];
  }

  const forceShuffle = !!options.forceShuffle;
  let promotedNearCards = false;
  let dueCards = cards.filter(isCardDue);

  // Backstop: if nothing is due but cards are deferred within 1 hour,
  // promote them to due immediately so the user never hits a dead runtime.deck.
  if (!dueCards.length) {
    const now = Date.now();
    const nearCards = cards.filter(card => {
      const p = getWordProgress(card.id);
      return p.dueAt && p.dueAt > now && p.dueAt <= now + SRS_NEAR_WINDOW_MS;
    });
    if (nearCards.length) {
      nearCards.forEach(card => {
        const progress = getWordProgress(card.id);
        progress.dueAt = now;
        progress.intervalDays = 0;
      });
      promotedNearCards = true;
      dueCards = cards.filter(isCardDue);
    }
  }

  const deferredCards = cards.filter(card => !isCardDue(card));

  // Preserve existing order of due cards already in the current runtime.deck;
  // append newly-eligible cards (including "(x) return to runtime.deck" and
  // time-promoted cards) at the back.
  const prevDueIds = new Set(
    (runtime.deck || []).slice(0, runtime.activeDeckCount || 0)
      .filter(card => card && dueCards.some(d => d.id === card.id))
      .map(card => card.id)
  );

  const existingInOrder = [];
  (runtime.deck || []).forEach(card => {
    if (card && prevDueIds.has(card.id)) {
      const match = dueCards.find(d => d.id === card.id);
      if (match) existingInOrder.push(match);
    }
  });
  const newlyDue = dueCards.filter(card => !prevDueIds.has(card.id));

  let orderedDue;
  if (forceShuffle || promotedNearCards) {
    orderedDue = shuffleArray([...dueCards]);
  } else if (!existingInOrder.length) {
    // First build for this runtime.deck — apply shuffle preference if set.
    orderedDue = runtime.shuffled ? shuffleArray([...dueCards]) : sortCardsByDue(dueCards);
  } else {
    // Keep in-flight order stable; newly eligible cards go to the back.
    orderedDue = [...existingInOrder, ...newlyDue];
  }

  const orderedDeferred = sortCardsByDue(deferredCards);
  runtime.activeDeckCount = orderedDue.length;
  return [...orderedDue, ...orderedDeferred];
}

function recordStudyOutcome(cardId, outcome, reviewedAt = Date.now()) {
  const progress = getWordProgress(cardId);
  const isFirstConfirmation = !progress.firstConfirmedAt;
  const xpAward = computeCardXpAward(outcome, isFirstConfirmation, runtime.spacedRepetition);
  const usage = ensureUsageStats();
  if (usage.cardXpEarned < 0) migrateLegacyXp(usage);
  usage.cardXpEarned = (usage.cardXpEarned || 0) + xpAward;
  progress.seenCount += 1;
  progress.lastReviewedAt = reviewedAt;
  progress.firstSeenAt = progress.firstSeenAt || reviewedAt;
  recordConfidenceSample(progress, outcome);
  if (!progress.firstConfirmedAt) {
    const pct = getConfidencePct(progress);
    if (pct !== null && pct >= 70) progress.firstConfirmedAt = reviewedAt;
  }
  if (outcome === 'easy' || outcome === 'known') {
    progress.passCount += 1;
    progress.firstConfirmedAt = progress.firstConfirmedAt || reviewedAt;
  } else {
    progress.failCount += 1;
  }
  return progress;
}

function seedMinimumUncertainSchedule(cardId, reviewedAt = Date.now()) {
  const progress = getWordProgress(cardId);
  const minimumDelayMs = getUncertainDelayMs(progress);
  const minimumDueAt = reviewedAt + minimumDelayMs;
  if (!progress.dueAt || progress.dueAt < minimumDueAt) {
    setProgressDelay(progress, minimumDelayMs, reviewedAt);
  }
  return progress;
}

function getDeckAggregateStats(cards = runtime.originalDeck) {
  return (cards || []).reduce((totals, card) => {
    const progress = getWordProgress(card.id);
    totals.seenCount += progress.seenCount || 0;
    totals.passCount += progress.passCount || 0;
    totals.failCount += progress.failCount || 0;
    return totals;
  }, { seenCount: 0, passCount: 0, failCount: 0 });
}

function applySpacedReview(card, outcome) {
  const now = Date.now();
  const normalizedOutcome = outcome === 'pass' ? 'pass' : outcome === 'easy' ? 'easy' : 'again';
  const progress = recordStudyOutcome(card.id, normalizedOutcome, now);

  if (normalizedOutcome === 'easy') {
    const nextIntervalDays = getNextEasyIntervalDays(progress);
    progress.streak += 1;
    progress.easyStreak = (progress.easyStreak || 0) + 1;
    progress.srsStage = getSrsStage(progress) + 1;
    progress.ease = clamp(getSrsEase(progress) + 0.08, 1.3, 3.0);
    progress.lastEasyIntervalDays = nextIntervalDays;
    progress.firstConfirmedAt = progress.firstConfirmedAt || now;
    setProgressDelay(progress, msFromDays(nextIntervalDays), now);
    getDirectionalMarksStore()[card.id] = 'known';
  } else if (normalizedOutcome === 'pass') {
    progress.streak += 1;
    progress.easyStreak = 0;
    progress.ease = clamp(getSrsEase(progress) - 0.05, 1.3, 3.0);
    progress.lastEasyIntervalDays = Math.max(getLastEasyIntervalDays(progress), progress.intervalDays || 0);
    setProgressDelay(progress, getUncertainDelayMs(progress), now);
    getDirectionalMarksStore()[card.id] = 'unsure';
  } else {
    // 'again' (default for any unknown outcome)
    progress.streak = 0;
    progress.easyStreak = 0;
    progress.srsStage = Math.max(0, getSrsStage(progress) - 1);
    progress.ease = clamp(getSrsEase(progress) - 0.2, 1.3, 3.0);
    progress.lastEasyIntervalDays = Math.max(getLastEasyIntervalDays(progress), progress.intervalDays || 0);
    setProgressDelay(progress, SRS_AGAIN_MS, now);
    getDirectionalMarksStore()[card.id] = 'unsure';
  }

  progress.lastSpacedOutcome = normalizedOutcome;
  runtime.marks = getDirectionalMarksStore();
}

function getDueCount(cards = runtime.originalDeck) {
  return (cards || []).filter(isCardDue).length;
}




function getMorphSpacedOutcome(card, isCorrect) {
  if (!isCorrect) return 'again';
  const progress = getWordProgress(card.id);
  return progress.lastSpacedOutcome === 'again' ? 'pass' : 'easy';
}

function answerMorphologyChoice(choiceIndex) {
  if (!isMorphologyMode()) return;
  noteStudyInteraction();
  const card = runtime.deck[runtime.currentIdx];
  if (!card || runtime.morphAnswerState.answered) return;

  const reversed = reverseDisplayActive(card);
  const choices = reversed ? card.reverseChoices : card.choices;
  if (!Array.isArray(choices)) return;

  captureSpacedUndoSnapshot();

  const selected = choices[choiceIndex];
  const correctAnswer = reversed ? card.form : card.answer;
  const isCorrect = selected === correctAnswer;
  runtime.morphAnswerState = {
    answered: true,
    revealed: true,
    selfRated: true,
    selectedIndex: choiceIndex,
    isCorrect
  };

  if (runtime.spacedRepetition) {
    applySpacedReview(card, getMorphSpacedOutcome(card, isCorrect));
    runtime.morphPendingAdvance = true;
  } else {
    const mark = isCorrect ? 'known' : 'unsure';
    const reviewedAt = Date.now();
    recordStudyOutcome(card.id, isCorrect ? 'known' : 'review', reviewedAt);
    applyUnspacedSharedSchedule(card, isCorrect ? 'easy' : 'again', reviewedAt);
    getDirectionalMarksStore()[card.id] = mark;
    runtime.marks = getDirectionalMarksStore();
  }

  renderCard();
  renderProgress();
  renderReview();
  saveState();
}

function revealMorphologyAnswer() {
  if (!isMorphologyMode()) return;
  noteStudyInteraction();
  const card = runtime.deck[runtime.currentIdx];
  if (!card || runtime.morphAnswerState.revealed) return;
  runtime.morphAnswerState = {
    ...morphAnswerState,
    revealed: true
  };
  renderCard();
}

function rateMorphologySelfCheck(isCorrect) {
  if (!isMorphologyMode()) return;
  noteStudyInteraction();
  const card = runtime.deck[runtime.currentIdx];
  if (!card || !runtime.morphAnswerState.revealed || runtime.morphAnswerState.answered) return;

  captureSpacedUndoSnapshot();

  runtime.morphAnswerState = {
    answered: true,
    revealed: true,
    selfRated: true,
    selectedIndex: -1,
    isCorrect: !!isCorrect
  };

  if (runtime.spacedRepetition) {
    applySpacedReview(card, getMorphSpacedOutcome(card, isCorrect));
    runtime.morphPendingAdvance = true;
  } else {
    const mark = isCorrect ? 'known' : 'unsure';
    const reviewedAt = Date.now();
    recordStudyOutcome(card.id, isCorrect ? 'known' : 'review', reviewedAt);
    applyUnspacedSharedSchedule(card, isCorrect ? 'easy' : 'again', reviewedAt);
    getDirectionalMarksStore()[card.id] = mark;
    runtime.marks = getDirectionalMarksStore();
  }

  renderCard();
  renderProgress();
  renderReview();
  saveState();
}

function markMorphologyDontKnow() {
  if (!isMorphologyMode()) return;
  noteStudyInteraction();
  const card = runtime.deck[runtime.currentIdx];
  if (!card || runtime.morphAnswerState.answered) return;

  captureSpacedUndoSnapshot();

  runtime.morphAnswerState = {
    answered: true,
    revealed: true,
    selfRated: true,
    selectedIndex: -1,
    isCorrect: false
  };

  if (runtime.spacedRepetition) {
    applySpacedReview(card, getMorphSpacedOutcome(card, false));
    runtime.morphPendingAdvance = true;
  } else {
    const reviewedAt = Date.now();
    recordStudyOutcome(card.id, 'review', reviewedAt);
    applyUnspacedSharedSchedule(card, 'again', reviewedAt);
    getDirectionalMarksStore()[card.id] = 'unsure';
    runtime.marks = getDirectionalMarksStore();
  }

  renderCard();
  renderProgress();
  renderReview();
  saveState();
}



function getKnownCount() {
  return runtime.originalDeck.filter(card => runtime.marks[card.id] === 'known').length;
}

function getHighConfidenceCount() {
  return runtime.originalDeck.filter(card => {
    const pct = getConfidencePct(getWordProgress(card.id));
    return pct !== null && pct > 75;
  }).length;
}

function getRemainingCards() {
  if (runtime.spacedRepetition) {
    return runtime.deck.slice(0, runtime.activeDeckCount);
  }
  return runtime.deck.filter(card => runtime.marks[card.id] !== 'known');
}

function moveCardToBackOfActivePile(card) {
  if (!card) return false;
  const directionalMarks = getDirectionalMarksStore();

  const currentCardId = runtime.deck[runtime.currentIdx]?.id || null;
  directionalMarks[card.id] = 'unsure';
  runtime.marks = directionalMarks;

  runtime.deck = runtime.deck.filter(candidate => candidate.id !== card.id);
  const splitAt = runtime.deck.findIndex(candidate => runtime.marks[candidate.id] === 'known');
  const insertAt = splitAt === -1 ? runtime.deck.length : splitAt;
  runtime.deck.splice(insertAt, 0, card);

  runtime.activeDeckCount = runtime.originalDeck.filter(candidate => runtime.marks[candidate.id] !== 'known').length;
  if (currentCardId) {
    const restoredIdx = runtime.deck.findIndex(candidate => candidate.id === currentCardId);
    if (restoredIdx >= 0) runtime.currentIdx = restoredIdx;
  }
  runtime.unspacedPendingRecycle = false;
  return true;
}

function maybePeriodicReshuffle() {
  if (!runtime.shuffled) return;
  runtime.flipsSinceReshuffle++;
  if (runtime.flipsSinceReshuffle >= 10) {
    runtime.flipsSinceReshuffle = 0;
    reshuffleUpcomingCards();
  }
}

// Per-flip ~1/50 (2%) chance to bring one high-confidence (>75%) deferred card
// back into the active pile. Skipped when shuffle is off or in morphology mode.
function maybeReturnConfirmedDeferredCard() {
  if (!runtime.spacedRepetition || !runtime.shuffled || isMorphologyMode()) return false;
  if (KNOWN_CARD_RANDOM_RETURN_FLIP_ODDS <= 0) return false;
  if (Math.random() >= 1 / KNOWN_CARD_RANDOM_RETURN_FLIP_ODDS) return false;

  const eligible = (runtime.originalDeck || []).filter(card => {
    if (isCardDue(card)) return false;
    const pct = getConfidencePct(getWordProgress(card.id));
    return pct !== null && pct > 75;
  });
  if (!eligible.length) return false;

  const pick = eligible[Math.floor(Math.random() * eligible.length)];
  getWordProgress(pick.id).dueAt = Date.now();
  runtime.deck = buildStudyDeck(runtime.originalDeck);
  return true;
}

function reshuffleUpcomingCards() {
  const start = runtime.currentIdx + 1;
  // In spaced mode keep deferred (not-yet-due) cards in their dueAt order at
  // the tail; only reshuffle the active (due) portion ahead of runtime.currentIdx.
  const end = runtime.spacedRepetition
    ? Math.min(runtime.activeDeckCount, runtime.deck.length)
    : runtime.deck.length;
  if (start >= end) return;
  const upcoming = [];
  const pinned = [];
  for (let i = start; i < end; i++) {
    const id = runtime.deck[i].id;
    if (runtime.marks[id] === 'known' || runtime.unspacedDeferredIds.has(id)) pinned.push(runtime.deck[i]);
    else upcoming.push(runtime.deck[i]);
  }
  if (upcoming.length < 2) return;
  const tail = runtime.deck.slice(end);
  runtime.deck = [...runtime.deck.slice(0, start), ...shuffleArray(upcoming), ...pinned, ...tail];
}

function maybeReturnKnownCardToActivePile() {
  if (runtime.spacedRepetition || isMorphologyMode() || KNOWN_CARD_RANDOM_RETURN_FLIP_ODDS <= 0) return false;
  if (!runtime.originalDeck.length || runtime.currentIdx >= runtime.deck.length) return false;

  const currentCardId = runtime.deck[runtime.currentIdx]?.id || null;
  const knownCards = runtime.originalDeck.filter(card => card.id !== currentCardId && runtime.marks[card.id] === 'known');
  if (!knownCards.length) return false;

  const returnChance = 1 / KNOWN_CARD_RANDOM_RETURN_FLIP_ODDS;
  if (Math.random() >= returnChance) return false;

  const card = knownCards[Math.floor(Math.random() * knownCards.length)];
  return moveCardToBackOfActivePile(card);
}


function buildPersistedStatePayload() {
  saveCurrentDeckStateToBank();
  const usage = ensureUsageStats();
  return {
    currentSessionId: runtime.currentSession ? runtime.currentSession.id : null,
    selectedKeys: [...runtime.selectedKeys],
    shuffled: runtime.shuffled,
    requiredOnly: runtime.requiredOnly,
    requiredOnlyDefaultedV1: true,
    srsIntervalCapAlignedV1: true,
    directionToGreek: runtime.directionToGreek,
    spacedRepetition: runtime.spacedRepetition,
    studyMode: runtime.studyMode,
    appProfile: runtime.appProfile,
    morphSelfCheck: runtime.morphSelfCheck,
    gamification: sanitizeGamificationState(runtime.appGamification),
    deckStates: runtime.deckStates,
    globalWordMarks: runtime.globalWordMarks,
    globalWordProgress: runtime.globalWordProgress,
    appUsageStats: {
      totalMs: usage.totalMs,
      dailyMs: usage.dailyMs,
      activeStudyMs: usage.activeStudyMs,
      activeDailyMs: usage.activeDailyMs,
      firstStudyAt: usage.firstStudyAt,
      studySessionHistory: usage.studySessionHistory,
      cardXpEarned: usage.cardXpEarned,
      lastActiveAt: 0,
      lastStudyInteractionAt: 0,
      lastStudyCountedAt: 0,
      currentStudySession: null
    }
  };
}

function sanitizeImportedState(candidate) {
  if (!isPlainObject(candidate)) return null;
  // These are persisted-JSON property names — they must stay as the bare
  // identifiers used in saveState's payload, not the runtime.* references.
  const hasRecognizedStateShape = ['selectedKeys', 'deckStates', 'globalWordMarks', 'globalWordProgress', 'appUsageStats']
    .some(key => key in candidate);
  if (!hasRecognizedStateShape) return null;

  const state = { ...candidate };
  state.selectedKeys = Array.isArray(candidate.selectedKeys) ? candidate.selectedKeys.map(String) : [];
  state.deckStates = isPlainObject(candidate.deckStates) ? candidate.deckStates : {};
  state.globalWordMarks = isPlainObject(candidate.globalWordMarks) ? candidate.globalWordMarks : {};
  state.globalWordProgress = isPlainObject(candidate.globalWordProgress) ? candidate.globalWordProgress : {};
  state.studyMode = normalizeStudyMode(candidate.studyMode);
  state.appProfile = 'vocab_grammar';
  state.gamification = sanitizeGamificationState(candidate.gamification);
  state.shuffled = candidate.shuffled !== false;
  state.requiredOnly = candidate.requiredOnly !== false;
  state.directionToGreek = !!candidate.directionToGreek;
  state.spacedRepetition = candidate.spacedRepetition !== false;
  state.morphSelfCheck = !!candidate.morphSelfCheck;

  const usage = ensureUsageStats(candidate.appUsageStats);
  state.appUsageStats = {
    totalMs: usage.totalMs,
    dailyMs: usage.dailyMs,
    activeStudyMs: usage.activeStudyMs,
    activeDailyMs: usage.activeDailyMs,
    firstStudyAt: usage.firstStudyAt,
    studySessionHistory: usage.studySessionHistory,
    cardXpEarned: usage.cardXpEarned,
    lastActiveAt: 0,
    lastStudyInteractionAt: 0,
    lastStudyCountedAt: 0,
    currentStudySession: null
  };

  return state;
}

function applyImportedState(state, options = {}) {
  const storage = getStorage();
  if (!storage) return false;

  const sanitized = sanitizeImportedState(state);
  if (!sanitized) return false;

  storage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  if (options.disclaimerAccepted) {
    storage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    runtime.hasAcceptedDisclaimer = true;
  }

  const restored = restoreState();
  if (!restored) {
    runtime.currentSession = null;
    runtime.selectedKeys = [];
    runtime.deck = [];
    runtime.originalDeck = [];
    runtime.currentIdx = 0;
    runtime.isFlipped = false;
    runtime.marks = getDirectionalMarksStore();
    resetMorphAnswerState();
    resetUnspacedCycleState();
    runtime.unspacedPendingRecycle = false;
    runtime.activeDeckCount = 0;
    setActiveSessionButton();
    setActiveSetButtons();
    syncToggleButtons();
    syncLayoutVisibility();
    renderCard();
    renderProgress();
    renderReview();
  } else {
    syncLayoutVisibility();
  }

  saveState();
  return true;
}

function buildProgressExportPayload() {
  const storage = getStorage();
  if (!storage) return null;

  // Flush any uncounted time so the export captures the latest totals
  accumulateUsageTime();
  accumulateActiveStudyTime();

  const appState = buildPersistedStatePayload();

  // The persisted payload zeros currentStudySession. If there was an
  // in-progress session, push a snapshot into the exported history so
  // session time is not lost on import.
  const liveSession = runtime.appUsageStats.currentStudySession;
  if (liveSession && liveSession.startedAt && liveSession.durationMs > 0) {
    const sessionSnapshot = {
      startedAt: liveSession.startedAt,
      endedAt: runtime.appUsageStats.lastStudyCountedAt || Date.now(),
      durationMs: liveSession.durationMs,
      interactionCount: liveSession.interactionCount || 0
    };
    if (!appState.appUsageStats.studySessionHistory) appState.appUsageStats.studySessionHistory = [];
    appState.appUsageStats.studySessionHistory.push(sessionSnapshot);
  }

  return {
    format: PROGRESS_EXPORT_FORMAT,
    version: PROGRESS_EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    disclaimerAccepted: storage.getItem(CONSENT_STORAGE_KEY) === 'accepted',
    summary: summarizePersistedState(appState),
    appState
  };
}

function createProgressExportBundle() {
  const payload = buildProgressExportPayload();
  if (!payload) return null;
  const jsonText = JSON.stringify(payload, null, 2);
  const stamp = payload.exportedAt.slice(0, 19).replace(/[:T]/g, '-');
  return {
    payload,
    jsonText,
    filename: `greek-flashcards-progress-${stamp}.json`
  };
}

async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {}
  return false;
}

function setTransferModalContent({ label = 'Progress tools', title = '', copy = '', textareaValue = '', textareaPlaceholder = '', primaryText = 'Close', secondaryText = '', showTextarea = false }) {
  const labelEl = document.getElementById('transferLabel');
  const titleEl = document.getElementById('transferTitle');
  const copyEl = document.getElementById('transferCopy');
  const textarea = document.getElementById('transferTextarea');
  const primaryBtn = document.getElementById('transferPrimaryBtn');
  const secondaryBtn = document.getElementById('transferSecondaryBtn');

  if (labelEl) labelEl.textContent = label;
  if (titleEl) titleEl.textContent = title;
  if (copyEl) copyEl.textContent = copy;
  if (textarea) {
    textarea.value = textareaValue;
    textarea.placeholder = textareaPlaceholder;
    textarea.style.display = showTextarea ? 'block' : 'none';
  }
  if (primaryBtn) {
    primaryBtn.textContent = primaryText;
    primaryBtn.style.display = primaryText ? 'inline-flex' : 'none';
  }
  if (secondaryBtn) {
    secondaryBtn.textContent = secondaryText;
    secondaryBtn.style.display = secondaryText ? 'inline-flex' : 'none';
  }
}

function openTransferModal(config) {
  const overlay = document.getElementById('transferOverlay');
  if (!overlay) return;

  runtime.transferModalMode = config?.mode || '';
  runtime.transferPrimaryAction = typeof config?.primaryAction === 'function' ? config.primaryAction : null;
  runtime.transferSecondaryAction = typeof config?.secondaryAction === 'function' ? config.secondaryAction : null;
  setTransferModalContent(config || {});
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  const textarea = document.getElementById('transferTextarea');
  if (config?.showTextarea && textarea) {
    setTimeout(() => textarea.focus(), 0);
  }
}

function closeTransferModal() {
  const overlay = document.getElementById('transferOverlay');
  if (!overlay) return;
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');
  runtime.transferModalMode = '';
  runtime.transferPrimaryAction = null;
  runtime.transferSecondaryAction = null;
  if (!isDisclaimerModalOpen() && !isAnalyticsModalOpen()) document.body.classList.remove('modal-open');
}

function handleTransferPrimaryAction() {
  if (typeof runtime.transferPrimaryAction === 'function') runtime.transferPrimaryAction();
}

function handleTransferSecondaryAction() {
  if (typeof runtime.transferSecondaryAction === 'function') runtime.transferSecondaryAction();
}

function tryDownloadProgressJsonFile(jsonText, filename) {
  if (isLikelyIOS()) return false;

  try {
    const blob = new Blob([jsonText], { type: 'application/json' });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    return true;
  } catch (err) {
    return false;
  }
}

async function tryShareProgressJsonFile(jsonText, filename) {
  if (!navigator.share || typeof File === 'undefined') return false;

  try {
    const file = new File([jsonText], filename, { type: 'application/json' });
    if (navigator.canShare && !navigator.canShare({ files: [file] })) return false;
    await navigator.share({
      title: 'Greek flashcards progress export',
      text: 'Progress backup exported from the Greek flashcards app.',
      files: [file]
    });
    return true;
  } catch (err) {
    return err?.name === 'AbortError' ? true : false;
  }
}

function showExportFallbackModal(jsonText, filename) {
  openTransferModal({
    mode: 'export',
    label: 'Progress export',
    title: 'Save your progress JSON',
    copy: 'iPhone Safari and standalone web apps are temperamental about file downloads. Use the button below to copy the JSON, then paste it into a new plain-text file in Files, Notes, or another app.',
    textareaValue: jsonText,
    primaryText: 'Copy JSON',
    secondaryText: '',
    showTextarea: true,
    primaryAction: async () => {
      const textarea = document.getElementById('transferTextarea');
      const text = textarea?.value || jsonText;
      let copied = await copyTextToClipboard(text);
      if (!copied && textarea) {
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        try { copied = document.execCommand('copy'); } catch (err) {}
      }
      window.alert(copied
        ? `JSON copied. Save it as ${filename} somewhere you can reach from your iPhone.`
        : 'Copy did not complete automatically. The JSON is shown in the box so you can select and copy it manually.');
    }
  });
}

async function exportProgressJson() {
  const storage = getStorage();
  if (!storage) {
    window.alert('Local storage is unavailable, so progress export cannot run on this device.');
    return;
  }

  const bundle = createProgressExportBundle();
  if (!bundle) {
    window.alert('Progress export could not be prepared on this device.');
    return;
  }

  const { jsonText, filename } = bundle;

  if (await tryShareProgressJsonFile(jsonText, filename)) return;
  if (tryDownloadProgressJsonFile(jsonText, filename)) return;

  showExportFallbackModal(jsonText, filename);
}

function importProgressFromJsonText(rawText, options = {}) {
  const parsed = JSON.parse(String(rawText || '{}'));
  const wrappedState = parsed?.format === PROGRESS_EXPORT_FORMAT && isPlainObject(parsed.appState)
    ? parsed.appState
    : parsed;
  const disclaimerAccepted = parsed?.format === PROGRESS_EXPORT_FORMAT
    ? !!parsed.disclaimerAccepted
    : !!options.disclaimerAccepted;
  const summary = parsed?.format === PROGRESS_EXPORT_FORMAT && isPlainObject(parsed.summary)
    ? parsed.summary
    : summarizePersistedState(wrappedState);

  const success = applyImportedState(wrappedState, { disclaimerAccepted });
  if (!success) throw new Error('Invalid progress file shape.');
  return summary;
}

function openNativeImportPicker() {
  try {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    input.style.width = '1px';
    input.style.height = '1px';
    input.style.opacity = '0';

    const cleanup = () => {
      if (input.parentNode) input.parentNode.removeChild(input);
    };

    input.addEventListener('change', event => {
      handleImportedProgressFile(event);
      setTimeout(cleanup, 0);
    }, { once: true });

    document.body.appendChild(input);
    if (typeof input.showPicker === 'function') {
      input.showPicker();
    } else {
      input.click();
    }
    return true;
  } catch (err) {
    return false;
  }
}

function triggerImportProgress() {
  openTransferModal({
    mode: 'import',
    label: 'Progress import',
    title: 'Import saved progress',
    copy: 'Choose a progress JSON file. If your iPhone does not open the file picker, paste the exported JSON into the box below instead.',
    textareaValue: '',
    textareaPlaceholder: 'Paste exported progress JSON here…',
    primaryText: 'Import pasted JSON',
    secondaryText: 'Choose JSON file',
    showTextarea: true,
    primaryAction: () => {
      const textarea = document.getElementById('transferTextarea');
      const rawText = textarea?.value?.trim() || '';
      if (!rawText) {
        window.alert('Paste the exported JSON into the box first, or use “Choose JSON file.”');
        return;
      }

      try {
        const summary = importProgressFromJsonText(rawText);
        closeTransferModal();
        window.alert(`Progress imported successfully. ${formatPersistedStateSummary(summary)}`);
      } catch (err) {
        window.alert('Import failed. Please paste a valid progress JSON exported from this app.');
      }
    },
    secondaryAction: () => {
      const opened = openNativeImportPicker();
      if (!opened) {
        window.alert('This device would not open the file picker. Please paste the exported JSON into the box instead.');
      }
    }
  });
}

function handleImportedProgressFile(event) {
  const file = event?.target?.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const summary = importProgressFromJsonText(reader.result);
      closeTransferModal();
      window.alert(`Progress imported successfully. ${formatPersistedStateSummary(summary)}`);
    } catch (err) {
      window.alert('Import failed. Please choose a valid progress JSON exported from this app.');
    } finally {
      if (event?.target) event.target.value = '';
    }
  };
  reader.onerror = () => {
    window.alert('Import failed because the selected file could not be read.');
    if (event?.target) event.target.value = '';
  };
  reader.readAsText(file);
}

function getDeckStateKey(keys = runtime.selectedKeys, requiredFlag = runtime.requiredOnly, spacedFlag = runtime.spacedRepetition) {
  const normalizedKeys = sortSetKeys((keys || []).map(String));
  return JSON.stringify({
    keys: normalizedKeys,
    requiredOnly: !!requiredFlag,
    spacedRepetition: !!spacedFlag,
    direction: getStudyStoreKey(),
    mode: runtime.studyMode
  });
}

function saveCurrentDeckStateToBank() {
  if (!runtime.selectedKeys.length) return;

  const deckKey = getDeckStateKey(runtime.selectedKeys, runtime.requiredOnly);
  runtime.deckStates[deckKey] = {
    currentSessionId: runtime.currentSession ? runtime.currentSession.id : null,
    selectedKeys: [...runtime.selectedKeys],
    deckIds: runtime.deck.map(card => card.id),
    currentIdx: runtime.currentIdx,
    unspacedPendingRecycle: !runtime.spacedRepetition && !!runtime.unspacedPendingRecycle
  };
}

function saveState() {
  const storage = getStorage();
  if (!storage) return;
  maybeCelebrateLevelUp();
  maybeCelebrateAchievements();
  storage.setItem(STORAGE_KEY, JSON.stringify(buildPersistedStatePayload()));
}

function clearSavedState() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEY);
}

function reorderDeckFromIds(cards, deckIds) {
  if (!Array.isArray(deckIds) || !deckIds.length) return null;
  const byId = new Map(cards.map(card => [card.id, card]));
  const ordered = [];
  deckIds.forEach(id => {
    const match = byId.get(id);
    if (match) {
      ordered.push(match);
      byId.delete(id);
    }
  });
  ordered.push(...byId.values());
  return ordered;
}

function restoreState() {
  const storage = getStorage();
  if (!storage) return false;

  let raw = storage.getItem(STORAGE_KEY);
  // One-time fallback: if no V16 data exists yet, load older saved data and migrate it.
  if (!raw) {
    const legacyV17 = storage.getItem('greekFlashcardsStateV17');
    if (legacyV17) raw = legacyV17;
  }
  if (!raw) {
    const legacyV15 = storage.getItem('greekFlashcardsStateV15');
    if (legacyV15) raw = legacyV15;
  }
  if (!raw) {
    const legacyV14 = storage.getItem('greekFlashcardsStateV14');
    if (legacyV14) raw = legacyV14;
  }
  if (!raw) {
    const legacyV12 = storage.getItem('greekFlashcardsStateV12');
    if (legacyV12) raw = legacyV12;
  }
  if (!raw) {
    const legacyV11 = storage.getItem('greekFlashcardsStateV11');
    if (legacyV11) raw = legacyV11;
  }
  if (!raw) {
    const legacyV10 = storage.getItem('greekFlashcardsStateV10');
    if (legacyV10) raw = legacyV10;
  }
  if (!raw) return false;

  try {
    let saved = JSON.parse(raw);

    // Run any applicable migrations.
    for (const migration of STATE_MIGRATIONS) {
      try {
        if (migration.match(saved)) saved = migration.migrate(saved);
      } catch (err) {
        console.warn(`Migration "${migration.name}" failed:`, err);
      }
    }

    runtime.selectedKeys = Array.isArray(saved.selectedKeys) ? sortSetKeys(saved.selectedKeys.map(String)) : [];
    runtime.requiredOnly = saved.requiredOnly !== false;
    runtime.directionToGreek = !!saved.directionToGreek;
    runtime.spacedRepetition = saved.spacedRepetition !== false;
    runtime.appProfile = 'vocab_grammar';
    const hadSavedAchievementSnapshot = Array.isArray(saved?.gamification?.lastEarnedAchievementIds);
    runtime.appGamification = sanitizeGamificationState(saved.gamification);
    runtime.studyMode = normalizeStudyMode(saved.studyMode);
    runtime.morphSelfCheck = !!saved.morphSelfCheck;
    runtime.shuffled = saved.shuffled !== false;
    runtime.deckStates = saved.deckStates && typeof saved.deckStates === 'object' ? saved.deckStates : {};
    runtime.globalWordMarks = saved.globalWordMarks && typeof saved.globalWordMarks === 'object' ? saved.globalWordMarks : {};
    runtime.globalWordProgress = saved.globalWordProgress && typeof saved.globalWordProgress === 'object' ? saved.globalWordProgress : {};
    runtime.appUsageStats = ensureUsageStats(saved.appUsageStats);
    runtime.appUsageStats.lastActiveAt = 0;
    const restoredLevel = computeXpAndLevel(runtime.appUsageStats).currentLevel.level;
    if (!Number.isFinite(runtime.appGamification.lastCelebratedLevel) || runtime.appGamification.lastCelebratedLevel < 1 || runtime.appGamification.lastCelebratedLevel > restoredLevel) {
      runtime.appGamification.lastCelebratedLevel = restoredLevel;
    }
    if (runtime.appGamification.lastCelebratedBadgeDay && !/^\d{4}-\d{2}-\d{2}$/.test(runtime.appGamification.lastCelebratedBadgeDay)) {
      runtime.appGamification.lastCelebratedBadgeDay = null;
    }
    ensureDirectionalStores();
    if (hadSavedAchievementSnapshot && !Array.isArray(runtime.appGamification.lastEarnedAchievementIds)) {
      runtime.appGamification.lastEarnedAchievementIds = [];
    }

    if (!runtime.selectedKeys.length) {
      clearSpacedUndoSnapshot();
      syncToggleButtons();
      return false;
    }

    runtime.currentSession = saved.currentSessionId ? getSessions().find(s => s.id === saved.currentSessionId) || null : null;

    const selectedCards = getSelectedCards(runtime.selectedKeys);
    runtime.originalDeck = runtime.requiredOnly ? selectedCards.filter(card => card.required) : selectedCards;
    resetMorphAnswerState();
    const savedDeckState = runtime.deckStates[getDeckStateKey(runtime.selectedKeys, runtime.requiredOnly)] || null;
    runtime.marks = getDirectionalMarksStore();
    const restoredDeck = savedDeckState ? reorderDeckFromIds(runtime.originalDeck, savedDeckState.deckIds) : null;
    if (runtime.spacedRepetition && restoredDeck) {
      runtime.deck = restoredDeck;
      runtime.activeDeckCount = restoredDeck.length;
      runtime.deck = buildStudyDeck(runtime.originalDeck, { forceShuffle: runtime.shuffled });
    } else if (restoredDeck) {
      runtime.deck = runtime.shuffled ? shuffleArray([...restoredDeck]) : restoredDeck;
    } else {
      runtime.deck = buildStudyDeck(runtime.originalDeck);
    }
    resetUnspacedCycleState();
    runtime.activeDeckCount = runtime.spacedRepetition ? getDueCount(runtime.originalDeck) : runtime.originalDeck.filter(card => runtime.marks[card.id] !== 'known').length;
    runtime.currentIdx = savedDeckState && Number.isInteger(savedDeckState.currentIdx)
      ? Math.min(Math.max(savedDeckState.currentIdx, 0), runtime.spacedRepetition ? runtime.activeDeckCount : runtime.deck.length)
      : 0;
    runtime.unspacedPendingRecycle = !runtime.spacedRepetition && !!(savedDeckState && savedDeckState.unspacedPendingRecycle);
    runtime.isFlipped = false;
    clearSpacedUndoSnapshot();

    setActiveSessionButton();
    setActiveSetButtons();
    syncToggleButtons();
    renderCard();
    renderProgress();
    renderReview();
    return true;
  } catch (err) {
    clearSavedState();
    return false;
  }
}

function startNextCycle(mode = 'remaining') {
  runtime.unspacedDeferredIds = new Set();
  runtime.flipsSinceReshuffle = 0;
  if (mode === 'full') {
    const directionalMarks = getDirectionalMarksStore();
    (runtime.originalDeck || []).forEach(card => {
      delete directionalMarks[card.id];
    });
    runtime.marks = directionalMarks;
    const fullDeck = shuffleArray([...(runtime.originalDeck || [])]);
    runtime.deck = fullDeck;
    runtime.currentIdx = fullDeck.length ? 0 : runtime.deck.length;
  } else {
    const remaining = shuffleArray([...getRemainingCards()]);
    const known = (runtime.originalDeck || []).filter(card => runtime.marks[card.id] === 'known');
    runtime.deck = [...remaining, ...known];
    runtime.currentIdx = remaining.length ? 0 : runtime.deck.length;
  }
  resetUnspacedCycleState();
  runtime.unspacedPendingRecycle = false;
  saveState();
}

function resetStudyState() {
  runtime.marks = getDirectionalMarksStore();
  runtime.currentIdx = 0;
  runtime.activeDeckCount = runtime.spacedRepetition ? getDueCount(runtime.originalDeck) : runtime.originalDeck.filter(card => runtime.marks[card.id] !== 'known').length;
  resetUnspacedCycleState();
  runtime.unspacedPendingRecycle = false;
  runtime.isFlipped = false;
}

function isSessionFullySelected(session, keys = runtime.selectedKeys) {
  const sessionKeys = expandSessionSets(session);
  return sessionKeys.length > 0 && sessionKeys.every(key => keys.includes(String(key)));
}

function findExactSessionMatch(keys = runtime.selectedKeys) {
  const normalizedKeys = sortSetKeys((keys || []).map(String));
  return getSessions().find(session => {
    const sessionKeys = expandSessionSets(session);
    return sessionKeys.length === normalizedKeys.length && sessionKeys.every((key, idx) => key === normalizedKeys[idx]);
  }) || null;
}

function setActiveSessionButton() {
  document.querySelectorAll('.session-btn').forEach(btn => {
    const session = getSessions().find(s => s.id === btn.dataset.sessionId);
    btn.classList.toggle('active', !!session && isSessionFullySelected(session));
  });
}

function setActiveSetButtons() {
  document.querySelectorAll('.chapter-btn').forEach(btn => {
    const key = btn.dataset.key;
    btn.classList.toggle('active', runtime.selectedKeys.includes(key));
  });
}

// ═══════════════════════════════════════════════════════
//  BUILD SELECTORS
// ═══════════════════════════════════════════════════════
function buildSessions() {
  const grid = document.getElementById('sessionsGrid');
  grid.innerHTML = '';
  getSessions().forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'session-btn' + (s.special ? ' special' : '');
    btn.id = 'sess-' + s.id;
    btn.dataset.sessionId = s.id;
    const summaryHtml = canAccessGrammarUi()
      ? `<br><span class="session-chapters">${s.summary}</span>`
      : '';
    btn.innerHTML = `<span class="session-tag">${s.tag}</span>${s.label}${summaryHtml}`;
    btn.onclick = () => toggleSession(s);
    grid.appendChild(btn);
  });

  const deselectBtn = document.createElement('button');
  deselectBtn.type = 'button';
  deselectBtn.className = 'chapter-btn supplemental-deselect-all';
  deselectBtn.textContent = 'Deselect all sessions';
  deselectBtn.onclick = () => deselectAllChapters();
  grid.appendChild(deselectBtn);

  setActiveSessionButton();
}

function buildChapterSelector() {
  const grid = document.getElementById('chaptersGrid');
  if (!grid) return;
  grid.innerHTML = '';
  grid.classList.add('chapters-grid');

  const sets = window.SETS && typeof window.SETS === 'object' ? window.SETS : {};
  const chapterKeys = Object.keys(sets).filter(isChapterKey).sort((a, b) => Number(a) - Number(b));

  const deselectBtn = document.createElement('button');
  deselectBtn.type = 'button';
  deselectBtn.className = 'chapter-btn supplemental-deselect-all';
  deselectBtn.textContent = 'Deselect all chapters';
  deselectBtn.onclick = () => deselectAllChapters();
  grid.appendChild(deselectBtn);

  chapterKeys.forEach(key => {
    const set = sets[key];
    if (!set) return;
    const morphCount = window.getMorphologyCountForKey ? window.getMorphologyCountForKey(key) : 0;
    const grammarCount = window.getGrammarCountForKey ? window.getGrammarCountForKey(key) : 0;
    const studyCount = morphCount + grammarCount;
    const vocabCount = Array.isArray(set.cards) ? set.cards.length : 0;
    if (!vocabCount && !studyCount) return;
    if (!canAccessGrammarUi() && !vocabCount) return;

    const btn = document.createElement('button');
    btn.className = 'chapter-btn';
    btn.dataset.key = key;
    const countLabel = canAccessGrammarUi()
      ? `${vocabCount} vocab${studyCount ? ` · ${studyCount} grammar` : ''}`
      : `${vocabCount} vocab`;
    btn.innerHTML = `${set.label}<span class="chapter-count">${countLabel}</span>`;
    btn.onclick = () => toggleSet(key);
    grid.appendChild(btn);
  });

  setActiveSetButtons();
}

function getSupplementalParadigmsForKey(key) {
  const raw = String(key);
  const paradigms = [];
  const morphSet = window.MORPHOLOGY_SETS?.[raw];
  if (morphSet && Array.isArray(morphSet.items)) {
    morphSet.items.forEach((item, idx) => {
      paradigms.push({
        key: `${raw}::morph::${idx}`,
        type: 'Morphology',
        label: item.family || item.lemma || `Morphology ${idx + 1}`,
        count: Array.isArray(item.questions) ? item.questions.length : 0
      });
    });
  }

  const grammarSet = window.GRAMMAR_SETS?.[raw];
  if (grammarSet && Array.isArray(grammarSet.items)) {
    grammarSet.items.forEach((item, idx) => {
      paradigms.push({
        key: `${raw}::grammar::${idx}`,
        type: 'Grammar',
        label: item.family || item.lemma || `Grammar ${idx + 1}`,
        count: Array.isArray(item.questions) ? item.questions.length : 0
      });
    });
  }

  return paradigms.filter(paradigm => paradigm.count > 0);
}

function deselectAllSupplementals() {
  const remaining = runtime.selectedKeys.filter(k => {
    const base = getParadigmBaseKey(k) || k;
    return isChapterKey(base) || isAdvancedKey(base);
  });
  if (remaining.length === runtime.selectedKeys.length) return;
  saveCurrentDeckStateToBank();
  runtime.currentSession = null;
  runtime.selectedKeys = remaining;
  if (!runtime.selectedKeys.length) {
    setActiveSessionButton();
    setActiveSetButtons();
    runtime.deck = [];
    runtime.originalDeck = [];
    runtime.marks = {};
    runtime.currentIdx = 0;
    document.getElementById('cardArea').innerHTML = '<div class="empty-state"><div class="big">αβγ</div>Tap to choose a session and start studying.</div>';
    clearSpacedUndoSnapshot();
    syncToggleButtons();
    renderReview();
    saveState();
    return;
  }
  loadDeckFromKeys(runtime.selectedKeys, null);
}

function buildSupplementalSelector() {
  const list = document.getElementById('supplementalGrid');
  if (!list) return;
  list.innerHTML = '';

  const sets = window.SETS && typeof window.SETS === 'object' ? window.SETS : {};
  const supplementalKeys = sortSetKeys(Object.keys(sets).filter(k => !isChapterKey(k) && !isAdvancedKey(k)));

  const deselectBtn = document.createElement('button');
  deselectBtn.type = 'button';
  deselectBtn.className = 'chapter-btn supplemental-deselect-all';
  deselectBtn.textContent = 'Deselect all supplementals';
  deselectBtn.onclick = () => deselectAllSupplementals();
  list.appendChild(deselectBtn);

  const weekGroups = new Map();
  supplementalKeys.forEach(key => {
    const set = sets[key];
    if (!set) return;
    const vocabCount = Array.isArray(set.cards) ? set.cards.length : 0;
    const morphCount = window.getMorphologyCountForKey ? window.getMorphologyCountForKey(key) : 0;
    const grammarCount = window.getGrammarCountForKey ? window.getGrammarCountForKey(key) : 0;
    const studyCount = morphCount + grammarCount;
    if (!vocabCount && !studyCount) return;
    if (!canAccessGrammarUi() && !vocabCount) return;

    const weekNum = Number.isFinite(Number(set.week)) ? Number(set.week) : null;
    if (!weekGroups.has(weekNum)) weekGroups.set(weekNum, []);
    weekGroups.get(weekNum).push({ key, set, vocabCount, studyCount });
  });

  const orderedWeeks = [...weekGroups.keys()].sort((a, b) => {
    if (a === null && b === null) return 0;
    if (a === null) return 1;
    if (b === null) return -1;
    return a - b;
  });

  orderedWeeks.forEach(weekNum => {
    const entries = weekGroups.get(weekNum);
    if (!entries || !entries.length) return;
    const weekDetails = document.createElement('details');
    weekDetails.className = 'supplemental-week';
    const weekKeys = entries.map(e => String(e.key));
    weekDetails.open = entries.some(({ key }) =>
      runtime.selectedKeys.includes(String(key)) ||
      getSupplementalParadigmsForKey(key).some(p => runtime.selectedKeys.includes(p.key))
    );
    const weekSummary = document.createElement('summary');
    weekSummary.className = 'supplemental-week-summary';
    const totalVocab = entries.reduce((s, e) => s + e.vocabCount, 0);
    const totalStudy = entries.reduce((s, e) => s + e.studyCount, 0);
    const weekLabel = weekNum == null ? 'Other supplements' : `Week ${weekNum}`;
    const weekCount = canAccessGrammarUi()
      ? `${entries.length} paradigm${entries.length === 1 ? '' : 's'} · ${totalVocab} vocab${totalStudy ? ` · ${totalStudy} grammar` : ''}`
      : `${entries.length} paradigm${entries.length === 1 ? '' : 's'} · ${totalVocab} vocab`;
    weekSummary.innerHTML = `<span>${weekLabel}</span><span class="chapter-count">${weekCount}</span>`;
    weekDetails.appendChild(weekSummary);

    const weekBody = document.createElement('div');
    weekBody.className = 'supplemental-week-body';

    entries.forEach(({ key, set, vocabCount, studyCount }) => {
      const countLabel = canAccessGrammarUi()
        ? `${vocabCount} vocab${studyCount ? ` · ${studyCount} grammar` : ''}`
        : `${vocabCount} vocab`;
      const paradigmList = canAccessGrammarUi() ? getSupplementalParadigmsForKey(key) : [];

      if (paradigmList.length <= 1) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chapter-btn supplemental-set-flat';
        btn.dataset.key = key;
        btn.innerHTML = `<span>${set.label}</span><span class="chapter-count">${countLabel}</span>`;
        btn.onclick = () => toggleSet(key);
        weekBody.appendChild(btn);
        return;
      }

      const details = document.createElement('details');
      details.className = 'supplemental-set';
      details.open = runtime.selectedKeys.includes(String(key)) || paradigmList.some(paradigm => runtime.selectedKeys.includes(paradigm.key));

      const summary = document.createElement('summary');
      summary.className = 'supplemental-summary';
      summary.innerHTML = `<span>${set.label}</span><span class="chapter-count">${countLabel}</span>`;
      details.appendChild(summary);

      const controls = document.createElement('div');
      controls.className = 'supplemental-paradigm-list';

      const allBtn = document.createElement('button');
      allBtn.className = 'chapter-btn supplemental-all-btn';
      allBtn.dataset.key = key;
      allBtn.innerHTML = `All ${set.label}<span class="chapter-count">${countLabel}</span>`;
      allBtn.onclick = () => toggleSet(key);
      controls.appendChild(allBtn);

      paradigmList.forEach(paradigm => {
        const btn = document.createElement('button');
        btn.className = 'chapter-btn supplemental-paradigm-btn';
        btn.dataset.key = paradigm.key;
        btn.innerHTML = `${paradigm.label}<span class="chapter-count">${paradigm.type} · ${paradigm.count} card${paradigm.count === 1 ? '' : 's'}</span>`;
        btn.onclick = () => toggleSet(paradigm.key);
        controls.appendChild(btn);
      });

      details.appendChild(controls);
      weekBody.appendChild(details);
    });

    weekDetails.appendChild(weekBody);
    list.appendChild(weekDetails);
  });

  setActiveSetButtons();
}

function getAdvancedSubGroups(set) {
  const cards = Array.isArray(set?.cards) ? set.cards : [];
  if (!cards.length) return [];
  const groups = new Map();
  cards.forEach((card, index) => {
    const sub = card && card.sub ? String(card.sub) : 'group';
    if (!groups.has(sub)) groups.set(sub, { sub, count: 0, firstIndex: index });
    groups.get(sub).count += 1;
  });
  return [...groups.values()].sort((a, b) => a.firstIndex - b.firstIndex);
}

function buildAdvancedSelector() {
  const list = document.getElementById('advancedGrid');
  if (!list) return;
  list.innerHTML = '';

  const sets = window.SETS && typeof window.SETS === 'object' ? window.SETS : {};
  const advancedKeys = sortSetKeys(Object.keys(sets).filter(isAdvancedKey));

  const meta = document.getElementById('advancedSectionMeta');
  if (meta) {
    if (!advancedKeys.length) {
      meta.textContent = '';
    } else {
      const totalCards = advancedKeys.reduce((sum, key) => sum + (Array.isArray(sets[key]?.cards) ? sets[key].cards.length : 0), 0);
      meta.textContent = `${advancedKeys.length} buckets · ${totalCards.toLocaleString()} lemmas`;
    }
  }

  if (!advancedKeys.length) {
    const empty = document.createElement('div');
    empty.className = 'advanced-empty';
    empty.textContent = 'Advanced vocabulary data has not loaded yet.';
    list.appendChild(empty);
    return;
  }

  const deselectBtn = document.createElement('button');
  deselectBtn.type = 'button';
  deselectBtn.className = 'chapter-btn supplemental-deselect-all';
  deselectBtn.textContent = 'Deselect all advanced';
  deselectBtn.onclick = () => deselectAllAdvanced();
  list.appendChild(deselectBtn);

  const body = document.createElement('div');
  body.className = 'advanced-week-body';

  advancedKeys.forEach(key => {
    const set = sets[key];
    if (!set) return;
    const cardCount = Array.isArray(set.cards) ? set.cards.length : 0;
    if (!cardCount) return;
    const subGroups = getAdvancedSubGroups(set);
    const countLabel = `${cardCount} lemmas${set.notes ? '' : ''}`;

    const details = document.createElement('details');
    details.className = 'supplemental-set advanced-set';
    details.open = runtime.selectedKeys.includes(String(key));

    const summary = document.createElement('summary');
    summary.className = 'supplemental-summary advanced-summary';
    summary.innerHTML = `<span>${set.label || key}</span><span class="chapter-count">${countLabel}</span>`;
    details.appendChild(summary);

    if (set.notes) {
      const notes = document.createElement('div');
      notes.className = 'advanced-notes';
      notes.textContent = set.notes;
      details.appendChild(notes);
    }

    const controls = document.createElement('div');
    controls.className = 'supplemental-paradigm-list advanced-sub-list';

    const allBtn = document.createElement('button');
    allBtn.className = 'chapter-btn supplemental-all-btn';
    allBtn.dataset.key = key;
    allBtn.innerHTML = `All of ${set.label || key}<span class="chapter-count">${cardCount} lemmas</span>`;
    allBtn.onclick = () => toggleSet(key);
    controls.appendChild(allBtn);

    subGroups.forEach(group => {
      const btn = document.createElement('button');
      btn.className = 'chapter-btn supplemental-paradigm-btn advanced-sub-btn';
      btn.dataset.key = `${key}::sub::${group.sub}`;
      btn.innerHTML = `Sub ${group.sub}<span class="chapter-count">${group.count} lemmas</span>`;
      btn.onclick = () => toggleAdvancedSubGroup(key, group.sub);
      controls.appendChild(btn);
    });

    details.appendChild(controls);
    body.appendChild(details);
  });

  list.appendChild(body);
  setActiveSetButtons();
}

function deselectAllAdvanced() {
  const remaining = runtime.selectedKeys.filter(k => {
    const base = getParadigmBaseKey(k) || k;
    return !isAdvancedKey(base);
  });
  if (remaining.length === runtime.selectedKeys.length) return;
  saveCurrentDeckStateToBank();
  runtime.currentSession = null;
  runtime.selectedKeys = remaining;
  if (!runtime.selectedKeys.length) {
    setActiveSessionButton();
    setActiveSetButtons();
    runtime.deck = [];
    runtime.originalDeck = [];
    runtime.marks = {};
    runtime.currentIdx = 0;
    document.getElementById('cardArea').innerHTML = '<div class="empty-state"><div class="big">αβγ</div>Tap to choose a session and start studying.</div>';
    clearSpacedUndoSnapshot();
    syncToggleButtons();
    renderReview();
    saveState();
    return;
  }
  loadDeckFromKeys(runtime.selectedKeys, null);
}

function deselectAllChapters() {
  const remaining = runtime.selectedKeys.filter(k => {
    const base = getParadigmBaseKey(k) || k;
    return !isChapterKey(base);
  });
  const sessionWasActive = !!runtime.currentSession;
  if (remaining.length === runtime.selectedKeys.length && !sessionWasActive) return;
  saveCurrentDeckStateToBank();
  runtime.currentSession = null;
  runtime.selectedKeys = remaining;
  if (!runtime.selectedKeys.length) {
    setActiveSessionButton();
    setActiveSetButtons();
    runtime.deck = [];
    runtime.originalDeck = [];
    runtime.marks = {};
    runtime.currentIdx = 0;
    document.getElementById('cardArea').innerHTML = '<div class="empty-state"><div class="big">αβγ</div>Tap to choose a session and start studying.</div>';
    clearSpacedUndoSnapshot();
    syncToggleButtons();
    renderReview();
    saveState();
    return;
  }
  loadDeckFromKeys(runtime.selectedKeys, null);
}

function deselectAll() {
  if (!runtime.selectedKeys.length && !runtime.currentSession) return;
  saveCurrentDeckStateToBank();
  runtime.currentSession = null;
  runtime.selectedKeys = [];
  setActiveSessionButton();
  setActiveSetButtons();
  runtime.deck = [];
  runtime.originalDeck = [];
  runtime.marks = {};
  runtime.currentIdx = 0;
  document.getElementById('cardArea').innerHTML = '<div class="empty-state"><div class="big">αβγ</div>Tap to choose a session and start studying.</div>';
  clearSpacedUndoSnapshot();
  syncToggleButtons();
  renderReview();
  saveState();
}

function toggleAdvancedSubGroup(setKey, subKey) {
  // Sub-groups load only the cards in that sub-bucket. We model this as a
  // pseudo-key that getAdvancedSubKeyCards expands at runtime.deck-build time.
  const pseudoKey = `${setKey}::sub::${subKey}`;
  toggleSet(pseudoKey);
}

function loadDeckFromKeys(keys, sessionId = null) {
  saveCurrentDeckStateToBank();
  clearSpacedUndoSnapshot();

  runtime.selectedKeys = sortSetKeys(keys.map(String));
  runtime.currentSession = sessionId
    ? getSessions().find(s => s.id === sessionId) || findExactSessionMatch(runtime.selectedKeys)
    : findExactSessionMatch(runtime.selectedKeys);

  const selectedCards = getSelectedCards(runtime.selectedKeys);
  runtime.originalDeck = runtime.requiredOnly ? selectedCards.filter(card => card.required) : selectedCards;
  resetMorphAnswerState();

  const savedDeckState = runtime.deckStates[getDeckStateKey(runtime.selectedKeys, runtime.requiredOnly)] || null;
  runtime.marks = getDirectionalMarksStore();
  if (savedDeckState) {
    const restoredDeck = reorderDeckFromIds(runtime.originalDeck, savedDeckState.deckIds);
    if (runtime.spacedRepetition && restoredDeck) {
      runtime.deck = restoredDeck;
      runtime.activeDeckCount = restoredDeck.length;
      runtime.deck = buildStudyDeck(runtime.originalDeck, { forceShuffle: runtime.shuffled });
    } else if (restoredDeck) {
      runtime.deck = runtime.shuffled ? shuffleArray([...restoredDeck]) : restoredDeck;
    } else {
      runtime.deck = buildStudyDeck(runtime.originalDeck);
    }
    runtime.activeDeckCount = runtime.spacedRepetition ? getDueCount(runtime.originalDeck) : runtime.originalDeck.filter(card => runtime.marks[card.id] !== 'known').length;
    runtime.currentIdx = Number.isInteger(savedDeckState.currentIdx)
      ? Math.min(Math.max(savedDeckState.currentIdx, 0), runtime.spacedRepetition ? runtime.activeDeckCount : runtime.deck.length)
      : 0;
    runtime.unspacedPendingRecycle = !runtime.spacedRepetition && !!savedDeckState.unspacedPendingRecycle;
    resetUnspacedCycleState();
    runtime.isFlipped = false;
  } else {
    resetStudyState();
    runtime.deck = buildStudyDeck(runtime.originalDeck);
  }

  setActiveSessionButton();
  setActiveSetButtons();

  syncToggleButtons();

  resetMorphAnswerState();
  renderCard();
  renderProgress();
  renderReview();
  saveState();
}

function loadSession(session) {
  runtime.currentSession = session;
  loadDeckFromKeys(expandSessionSets(session), session.id);
}

function toggleSession(session) {
  saveCurrentDeckStateToBank();

  const sessionKeys = expandSessionSets(session);
  if (!sessionKeys.length) return;

  const alreadySelected = isSessionFullySelected(session);
  const nextKeys = alreadySelected
    ? runtime.selectedKeys.filter(key => !sessionKeys.includes(key))
    : sortSetKeys([...new Set([...runtime.selectedKeys, ...sessionKeys])]);

  runtime.currentSession = null;

  if (!nextKeys.length) {
    runtime.selectedKeys = [];
    setActiveSessionButton();
    setActiveSetButtons();
    runtime.deck = [];
    runtime.originalDeck = [];
    runtime.marks = getDirectionalMarksStore();
    runtime.currentIdx = 0;
    document.getElementById('cardArea').innerHTML = '<div class="empty-state"><div class="big">αβγ</div>Tap to choose a session and start studying.</div>';
    clearSpacedUndoSnapshot();
    syncToggleButtons();
    renderReview();
    saveState();
    return;
  }

  loadDeckFromKeys(nextKeys, null);
}

function getParadigmBaseKey(key) {
  const match = String(key).match(/^(.+)::(grammar|morph)::\d+$/);
  if (match) return match[1];
  const subMatch = String(key).match(/^(.+)::sub::.+$/);
  return subMatch ? subMatch[1] : null;
}

function toggleSet(key) {
  saveCurrentDeckStateToBank();
  runtime.currentSession = null;
  const raw = String(key);
  const baseKey = getParadigmBaseKey(raw);
  if (runtime.selectedKeys.includes(raw)) {
    runtime.selectedKeys = runtime.selectedKeys.filter(k => k !== raw);
  } else if (baseKey) {
    runtime.selectedKeys = [...runtime.selectedKeys.filter(k => k !== baseKey), raw];
  } else {
    runtime.selectedKeys = [...runtime.selectedKeys.filter(k => getParadigmBaseKey(k) !== raw), raw];
  }

  if (!runtime.selectedKeys.length) {
    setActiveSessionButton();
    setActiveSetButtons();
    runtime.deck = [];
    runtime.originalDeck = [];
    runtime.marks = {};
    runtime.currentIdx = 0;
    document.getElementById('cardArea').innerHTML = '<div class="empty-state"><div class="big">αβγ</div>Tap to choose a session and start studying.</div>';
    clearSpacedUndoSnapshot();
    syncToggleButtons();
    renderReview();
    saveState();
    return;
  }

  loadDeckFromKeys(runtime.selectedKeys, null);
}
// Reader UI (drills + verses) lives in js/ui/reader.js; configured at module-top above.
// ═══════════════════════════════════════════════════════
//  RENDER
// ═══════════════════════════════════════════════════════
// renderCard and flipCard live in js/ui/render.js

// ═══════════════════════════════════════════════════════
//  NAVIGATE + MARK
// ═══════════════════════════════════════════════════════
function navigate(dir, options = {}) {
  if (!runtime.deck.length) return;
  noteStudyInteraction();

  if (dir < 0) {
    runtime.currentIdx = Math.max(0, runtime.currentIdx - 1);
    resetMorphAnswerState();
    renderCard();
    return;
  }

  if (!runtime.spacedRepetition && runtime.currentIdx >= runtime.deck.length) {
    if (runtime.unspacedPendingRecycle) {
      startNextCycle('remaining');
      resetMorphAnswerState();
      renderCard();
      renderReview();
      renderProgress();
      saveState();
    } else if (getKnownCount() === runtime.originalDeck.length) {
      startNextCycle('full');
      resetMorphAnswerState();
      renderCard();
      renderReview();
      renderProgress();
      saveState();
    }
    return;
  }

  if (runtime.spacedRepetition && runtime.currentIdx >= runtime.activeDeckCount) {
    advanceScheduledCards(runtime.originalDeck, SRS_CYCLE_ADVANCE_MS);
    runtime.deck = buildStudyDeck(runtime.originalDeck);
    runtime.currentIdx = 0;
    resetMorphAnswerState();
    renderCard();
    renderReview();
    renderProgress();
    saveState();
    return;
  }

  if (runtime.spacedRepetition && runtime.currentIdx < runtime.activeDeckCount && !options.skipAutoReview && !isMorphologyMode()) {
    captureSpacedUndoSnapshot();
    applySpacedReview(runtime.deck[runtime.currentIdx], 'again');
    runtime.deck = buildStudyDeck(runtime.originalDeck);
  }

  if (runtime.spacedRepetition) {
    if (isMorphologyMode()) {
      if (runtime.morphPendingAdvance) {
        runtime.deck = buildStudyDeck(runtime.originalDeck);
        runtime.currentIdx = Math.min(runtime.currentIdx, runtime.activeDeckCount);
      } else {
        runtime.currentIdx = Math.min(runtime.currentIdx + 1, runtime.activeDeckCount);
      }
      clearSpacedUndoSnapshot();
    } else {
      runtime.currentIdx = Math.min(runtime.currentIdx, runtime.activeDeckCount);
      maybeReturnConfirmedDeferredCard();
      maybePeriodicReshuffle();
    }
    resetMorphAnswerState();
    renderCard();
    renderReview();
    renderProgress();
    saveState();
    return;
  }

  if (isMorphologyMode()) {
    const nextIdx = runtime.currentIdx + 1;
    if (nextIdx >= runtime.deck.length) {
      if (getKnownCount() === runtime.originalDeck.length) {
        runtime.currentIdx = runtime.deck.length;
        runtime.unspacedPendingRecycle = false;
      } else {
        runtime.currentIdx = runtime.deck.length;
        runtime.unspacedPendingRecycle = true;
      }
    } else {
      runtime.currentIdx = nextIdx;
      runtime.unspacedPendingRecycle = false;
    }
    clearSpacedUndoSnapshot();
    resetMorphAnswerState();
    renderCard();
    renderReview();
    renderProgress();
    saveState();
    return;
  }

  for (let i = runtime.currentIdx + 1; i < runtime.deck.length; i++) {
    if (runtime.marks[runtime.deck[i].id] !== 'known' && !runtime.unspacedDeferredIds.has(runtime.deck[i].id)) {
      runtime.currentIdx = i;
      maybePeriodicReshuffle();
      renderCard();
      return;
    }
  }

  if (getKnownCount() === runtime.originalDeck.length && runtime.unspacedDeferredIds.size === 0) {
    runtime.currentIdx = runtime.deck.length;
    runtime.unspacedPendingRecycle = false;
  } else {
    runtime.currentIdx = runtime.deck.length;
    runtime.unspacedPendingRecycle = true;
  }

  resetMorphAnswerState();
  renderCard();
}

function markCard(outcome) {
  // outcome: 'again' | 'pass' | 'easy'
  if (isMorphologyMode()) return;
  noteStudyInteraction();
  if ((!runtime.spacedRepetition && runtime.currentIdx >= runtime.deck.length) || (runtime.spacedRepetition && runtime.currentIdx >= runtime.activeDeckCount)) return;
  const currentCard = runtime.deck[runtime.currentIdx];
  if (runtime.spacedRepetition) {
    captureSpacedUndoSnapshot();
    applySpacedReview(currentCard, outcome);
    runtime.deck = buildStudyDeck(runtime.originalDeck);
    if (runtime.activeDeckCount <= 0) {
      runtime.currentIdx = runtime.activeDeckCount;
      resetMorphAnswerState();
      renderCard();
    } else {
      navigate(1, { skipAutoReview: true });
    }
  } else {
    // Non-SRS cards still write to the same shared schedule used by spaced review.
    // Deck behaviour:
    // - 'again' (wrong)    → immediately moved to back of active pile for same-pass retry.
    // - 'pass' (uncertain) → deferred until the end of the pile; reappears next cycle.
    // - 'easy' (known)     → pushed out of active pile as usual.
    const mark = outcome === 'easy' ? 'known' : 'unsure';
    const recordedOutcome = outcome === 'easy' ? 'known' : outcome === 'pass' ? 'pass' : 'review';
    const reviewedAt = Date.now();
    recordStudyOutcome(currentCard.id, recordedOutcome, reviewedAt);
    applyUnspacedSharedSchedule(currentCard, outcome, reviewedAt);
    getDirectionalMarksStore()[currentCard.id] = mark;
    runtime.marks = getDirectionalMarksStore();

    if (outcome === 'again') {
      // Remove from current position; remaining cards shift down by 1,
      // so runtime.currentIdx now points to what was the next card.
      const cardToReturn = currentCard;
      runtime.deck.splice(runtime.currentIdx, 1);
      // Find the last non-known, non-deferred card that comes after runtime.currentIdx.
      let lastActiveIdx = -1;
      for (let i = runtime.currentIdx; i < runtime.deck.length; i++) {
        if (runtime.marks[runtime.deck[i].id] !== 'known' && !runtime.unspacedDeferredIds.has(runtime.deck[i].id)) lastActiveIdx = i;
      }
      runtime.deck.splice(lastActiveIdx >= 0 ? lastActiveIdx + 1 : runtime.deck.length, 0, cardToReturn);
      // runtime.currentIdx already points to the correct next card (or loops if it was the last).
      renderCard();
    } else {
      if (outcome === 'pass') runtime.unspacedDeferredIds.add(currentCard.id);
      navigate(1);
    }
  }
  renderReview();
  renderProgress();
  saveState();
}


function setStudyMode(mode) {
  const nextMode = normalizeStudyMode(mode);
  if (runtime.studyMode === nextMode) return;

  saveCurrentDeckStateToBank();
  runtime.studyMode = nextMode;
  clearSpacedUndoSnapshot();
  resetMorphAnswerState();
  ensureDirectionalStores();
  runtime.marks = getDirectionalMarksStore();
  syncToggleButtons();

  if (isReaderMode()) {
    renderReaderModule();
    renderProgress();
    saveState();
    return;
  }

  if (!runtime.selectedKeys.length) {
    saveState();
    renderCard();
    renderProgress();
    renderReview();
    return;
  }

  const keysToLoad = runtime.currentSession ? expandSessionSets(runtime.currentSession) : runtime.selectedKeys;
  loadDeckFromKeys(keysToLoad, runtime.currentSession ? runtime.currentSession.id : null);
}

function setAppProfile(profile) {
  const nextProfile = 'vocab_grammar';
  if (runtime.appProfile === nextProfile) return;

  saveCurrentDeckStateToBank();
  runtime.appProfile = nextProfile;
  clearSpacedUndoSnapshot();

  ensureDirectionalStores();
  runtime.marks = getDirectionalMarksStore();
  buildSessions();
  buildChapterSelector();
  buildSupplementalSelector();
  buildAdvancedSelector();
  syncToggleButtons();

  if (!runtime.selectedKeys.length) {
    renderCard();
    renderProgress();
    renderReview();
    saveState();
    return;
  }

  const keysToLoad = runtime.currentSession ? expandSessionSets(runtime.currentSession) : runtime.selectedKeys;
  loadDeckFromKeys(keysToLoad, runtime.currentSession ? runtime.currentSession.id : null);
}

function toggleMorphSelfCheck() {
  if (!isMorphologyMode()) return;
  runtime.morphSelfCheck = !runtime.morphSelfCheck;
  resetMorphAnswerState();
  syncToggleButtons();
  renderCard();
  saveState();
}

function toggleShuffle() {
  if (isReaderMode()) return;
  runtime.shuffled = !runtime.shuffled;
  runtime.flipsSinceReshuffle = 0;
  syncToggleButtons();

  if (runtime.spacedRepetition) {
    runtime.deck = buildStudyDeck(runtime.originalDeck, { forceShuffle: runtime.shuffled });
    runtime.currentIdx = Math.min(runtime.currentIdx, runtime.activeDeckCount);
  } else {
    const activeCards = getRemainingCards();
    const knownCards = runtime.deck.filter(card => runtime.marks[card.id] === 'known');
    runtime.deck = runtime.shuffled ? [...shuffleArray([...activeCards]), ...knownCards] : [...activeCards, ...knownCards];

    if (runtime.currentIdx >= activeCards.length) {
      runtime.currentIdx = activeCards.length ? 0 : runtime.deck.length;
    }
  }

  runtime.isFlipped = false;
  renderCard();
  renderProgress();
  renderReview();
  saveState();
}

function toggleRequiredOnly() {
  runtime.requiredOnly = !runtime.requiredOnly;
  syncToggleButtons();
  if (!runtime.selectedKeys.length) {
    saveState();
    return;
  }
  const keysToLoad = runtime.currentSession ? expandSessionSets(runtime.currentSession) : runtime.selectedKeys;
  loadDeckFromKeys(keysToLoad, runtime.currentSession ? runtime.currentSession.id : null);
}

function toggleDirection() {
  runtime.directionToGreek = !runtime.directionToGreek;
  clearSpacedUndoSnapshot();
  ensureDirectionalStores();
  runtime.marks = getDirectionalMarksStore();
  resetMorphAnswerState();
  syncToggleButtons();
  if (runtime.selectedKeys.length) {
    const keysToLoad = runtime.currentSession ? expandSessionSets(runtime.currentSession) : runtime.selectedKeys;
    loadDeckFromKeys(keysToLoad, runtime.currentSession ? runtime.currentSession.id : null);
    return;
  }
  runtime.isFlipped = false;
  renderCard();
  renderProgress();
  renderReview();
  saveState();
}

function toggleSpacedRepetition() {
  if (isReaderMode()) return;
  runtime.spacedRepetition = !runtime.spacedRepetition;
  clearSpacedUndoSnapshot();
  resetUnspacedCycleState();
  syncToggleButtons();
  if (!runtime.selectedKeys.length) {
    saveState();
    return;
  }
  runtime.deck = buildStudyDeck(runtime.originalDeck);
  runtime.currentIdx = 0;
  resetMorphAnswerState();
  runtime.isFlipped = false;
  renderCard();
  renderProgress();
  renderReview();
  saveState();
}

function reshuffleEligible() {
  if (!runtime.selectedKeys.length) return;

  if (runtime.spacedRepetition) {
    // Shuffle only currently-eligible (due) cards. SRS progress and
    // scheduled-ahead deferrals are left untouched.
    runtime.deck = buildStudyDeck(runtime.originalDeck, { forceShuffle: true });
    runtime.currentIdx = runtime.activeDeckCount ? 0 : runtime.currentIdx;
  } else {
    // Non-spaced: shuffle the still-active (not-yet-known) portion only;
    // known cards stay pinned to the end of the cycle.
    const activeCards = getRemainingCards();
    const knownCards = runtime.deck.filter(card => runtime.marks[card.id] === 'known');
    runtime.deck = [...shuffleArray([...activeCards]), ...knownCards];
    runtime.currentIdx = activeCards.length ? 0 : runtime.deck.length;
  }

  runtime.isFlipped = false;
  renderCard();
  renderProgress();
  renderReview();
  saveState();
}

function fastForwardScheduling(advanceMs) {
  if (!runtime.spacedRepetition || !runtime.originalDeck.length) return;
  advanceScheduledCards(runtime.originalDeck, advanceMs);
  runtime.deck = buildStudyDeck(runtime.originalDeck);
  runtime.currentIdx = 0;
  runtime.isFlipped = false;
  resetMorphAnswerState();
  renderCard();
  renderProgress();
  renderReview();
  saveState();
}

function fastForwardOneDay() {
  fastForwardScheduling(SRS_DAY_MS);
}

function fastForwardOneWeek() {
  fastForwardScheduling(7 * SRS_DAY_MS);
}

function resetCurrentDeck() {
  clearSpacedUndoSnapshot();
  if (!runtime.selectedKeys.length) {
    clearSavedState();
    return;
  }

  const confirmed = window.confirm(
    runtime.spacedRepetition
      ? 'Reset spaced-review scheduling for this deck only? This keeps your unspaced marks and pass history.'
      : 'Reset unspaced marks for this deck only? This keeps your spaced-review scheduling and intervals.'
  );
  if (!confirmed) return;

  const deckKey = getDeckStateKey(runtime.selectedKeys, runtime.requiredOnly, runtime.spacedRepetition);
  delete runtime.deckStates[deckKey];
  const directionalMarks = getDirectionalMarksStore();
  const directionalProgress = getDirectionalProgressStore();

  if (runtime.spacedRepetition) {
    runtime.originalDeck.forEach(card => {
      const p = directionalProgress[card.id];
      if (p && typeof p === 'object') {
        p.dueAt = 0;
        p.intervalDays = 0;
        p.streak = 0;
        p.easyStreak = 0;
        p.srsStage = 0;
        p.ease = 2.3;
        p.lastEasyIntervalDays = 0;
        p.confidence = 0;
        p.confidenceHistory = [];
        // seenCount, passCount, failCount, lastReviewedAt intentionally kept
      }
    });
  } else {
    runtime.originalDeck.forEach(card => {
      delete directionalMarks[card.id];
    });
  }

  runtime.marks = directionalMarks;
  resetUnspacedCycleState();
  runtime.currentIdx = 0;
  runtime.isFlipped = false;
  resetMorphAnswerState();
  runtime.deck = [];
  runtime.activeDeckCount = 0;
  runtime.deck = buildStudyDeck(runtime.originalDeck);
  renderCard();
  renderProgress();
  renderReview();
  saveState();
}

function resetAllStats() {
  clearSpacedUndoSnapshot();
  const confirmed = window.confirm('Reset all saved study stats, marks, and spaced-review scheduling for both directions?');
  if (!confirmed) return;

  runtime.globalWordMarks = { g2e: {}, e2g: {}, morph: {} };
  runtime.globalWordProgress = { g2e: {}, e2g: {}, morph: {} };
  runtime.deckStates = {};
  runtime.appUsageStats = {
    totalMs: 0,
    dailyMs: {},
    activeStudyMs: 0,
    activeDailyMs: {},
    lastActiveAt: document.hidden ? 0 : Date.now(),
    lastStudyInteractionAt: 0,
    lastStudyCountedAt: 0,
    firstStudyAt: 0,
    studySessionHistory: [],
    currentStudySession: null
  };
  runtime.appGamification = sanitizeGamificationState({});
  ensureDirectionalStores();
  resetUnspacedCycleState();
  runtime.marks = getDirectionalMarksStore();

  if (runtime.selectedKeys.length) {
    runtime.currentIdx = 0;
    runtime.isFlipped = false;
    runtime.deck = [];
    runtime.activeDeckCount = 0;
    runtime.deck = buildStudyDeck(runtime.originalDeck);
    renderCard();
    renderProgress();
    renderReview();
  } else {
    renderReview();
    renderProgress();
  }

  saveState();
}

// ═══════════════════════════════════════════════════════
//  PROGRESS + REVIEW
// ═══════════════════════════════════════════════════════
// Progress bar, Review panel, returnSeenCardToDeck live in js/ui/progress.js

// Modal/overlay control (disclaimer, what's new, study selector, shortcuts,
// analytics open/close, startStudying) lives in js/ui/modals.js


// Touch-safe tap bridge for iOS/pointer quirks lives in js/ui/touchTapBridge.js

// Pure SVG/HTML chart builders and series helpers now live in js/ui/charts.js

function renderAnalyticsSection(containerId, config) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!config || !config.total) { el.innerHTML = `<div class="analytics-section"><div class="analytics-empty">Select a study set to see this chart.</div></div>`; return; }
  const metrics = config.metrics || [];
  el.innerHTML = `
    <section class="analytics-section">
      <div class="analytics-section-head"><div><h3>${escapeHtml(config.title || 'Analytics')}</h3><p>${escapeHtml(config.subtitle || '')}</p></div></div>
      <div class="analytics-chart-card"><div class="analytics-chart-title">${escapeHtml(config.barTitle)}</div>${config.barSvg}</div>
      <div class="analytics-metrics-grid">${metrics.map(metric => `
          <div class="analytics-metric-card">
            <div class="analytics-metric-label">${escapeHtml(metric.label)}</div>
            <div class="analytics-metric-value">${escapeHtml(metric.value)}</div>
            ${metric.note ? `<div class="analytics-metric-note">${escapeHtml(metric.note)}</div>` : ''}
          </div>
        `).join('')}</div>
      <div class="analytics-chart-card"><div class="analytics-chart-title">${escapeHtml(config.lineTitle)}</div>${config.lineSvg}</div>
    </section>
  `;
}

// ═══════════════════════════════════════════════════════
//  GAMIFICATION HELPERS
// ═══════════════════════════════════════════════════════

// Toast notifications (level-up + badge celebration) live in js/ui/toast.js

function buildGamificationSnapshot() {
  const usage = ensureUsageStats();
  const sessionHistory = [...usage.studySessionHistory];
  if (usage.currentStudySession && usage.currentStudySession.startedAt) {
    sessionHistory.push({
      startedAt: usage.currentStudySession.startedAt,
      endedAt: usage.lastStudyCountedAt || Date.now(),
      durationMs: usage.currentStudySession.durationMs || 0,
      interactionCount: usage.currentStudySession.interactionCount || 0
    });
  }
  const streaks = computeStudyStreaks(usage.activeDailyMs);
  const courseData = computeCourseWideData();
  const g2eProgressStore = runtime.globalWordProgress.g2e || {};
  const e2gProgressStore = runtime.globalWordProgress.e2g || {};
  const morphProgressStore = runtime.globalWordProgress.morph || {};
  const mergedProgressStore = {};
  [g2eProgressStore, e2gProgressStore, morphProgressStore].forEach(store => {
    Object.entries(store).forEach(([cardId, entry]) => {
      const existing = mergedProgressStore[cardId] || {};
      mergedProgressStore[cardId] = {
        ...existing,
        ...entry,
        lastReviewedAt: Math.max(Number(existing.lastReviewedAt) || 0, Number(entry?.lastReviewedAt) || 0),
        firstConfirmedAt: Math.max(Number(existing.firstConfirmedAt) || 0, Number(entry?.firstConfirmedAt) || 0)
      };
    });
  });
  const allCourseCards = [...courseData.allVocabCards, ...courseData.allGrammarCards];
  const mergedMarks = { ...(runtime.globalWordMarks.g2e || {}), ...(runtime.globalWordMarks.e2g || {}), ...(runtime.globalWordMarks.morph || {}) };
  const todayStats = computeTodayStats(usage.activeDailyMs, allCourseCards, mergedMarks, mergedProgressStore);
  const achievements = computeAchievements(usage, courseData, streaks, sessionHistory.length, todayStats);
  return { usage, sessionHistory, streaks, courseData, todayStats, achievements };
}

function syncEarnedAchievementSnapshot() {
  const snapshot = buildGamificationSnapshot();
  runtime.appGamification.lastEarnedAchievementIds = snapshot.achievements.filter(a => a.earned).map(a => a.id);
  runtime.appGamification.lastCelebratedBadgeDay = getUsageDayKey();
  return snapshot;
}

function maybeCelebrateLevelUp() {
  const usage = ensureUsageStats();
  const xpData = computeXpAndLevel(usage);
  const currentLevel = xpData.currentLevel?.level || 1;
  const previousLevel = Number.isFinite(runtime.appGamification.lastCelebratedLevel) && runtime.appGamification.lastCelebratedLevel >= 1
    ? runtime.appGamification.lastCelebratedLevel
    : currentLevel;

  if (currentLevel < previousLevel) {
    runtime.appGamification.lastCelebratedLevel = currentLevel;
    return;
  }

  if (currentLevel > previousLevel) {
    showLevelToast(xpData.currentLevel, xpData.totalXp);
  }

  runtime.appGamification.lastCelebratedLevel = currentLevel;
}

function maybeCelebrateAchievements() {
  const todayKey = getUsageDayKey();
  if (runtime.appGamification.lastCelebratedBadgeDay && runtime.appGamification.lastCelebratedBadgeDay !== todayKey) {
    runtime.appGamification.lastEarnedAchievementIds = (runtime.appGamification.lastEarnedAchievementIds || []).filter(id => id !== 'daily_first_card');
  }

  const snapshot = buildGamificationSnapshot();
  const earnedAchievements = snapshot.achievements.filter(a => a.earned);
  const priorEarnedIds = new Set(Array.isArray(runtime.appGamification.lastEarnedAchievementIds) ? runtime.appGamification.lastEarnedAchievementIds : []);
  const newlyEarned = earnedAchievements.filter(a => !priorEarnedIds.has(a.id));

  newlyEarned.forEach(showBadgeToast);
  runtime.appGamification.lastEarnedAchievementIds = earnedAchievements.map(a => a.id);
  runtime.appGamification.lastCelebratedBadgeDay = todayKey;
}

// XP / level / streaks / achievements math now lives in js/domain/gamification/xp.js.
// Wrappers bind the host runtime stores so call sites read the live state.
function migrateLegacyXp(usage) { return migrateLegacyXpPure(usage, runtime.globalWordProgress); }
function computeXpAndLevel(usage) { return computeXpAndLevelPure(usage, runtime.globalWordProgress); }
function computeAchievements(usage, courseData, streaks, sessionCount, todayStats = null) {
  return computeAchievementsPure(usage, courseData, streaks, sessionCount, todayStats, runtime.globalWordMarks);
}

function computeCourseWideData() {
  const allVocab = getAllVocabCards(false);
  const reqVocab = getAllVocabCards(true);
  const allGrammar = getAllGrammarCards();

  // Use g2e runtime.marks/progress as the canonical direction for course completion;
  // grammar uses the morph store regardless of which mode is currently active.
  const g2eMarks = runtime.globalWordMarks.g2e || {};
  const morphMarks = runtime.globalWordMarks.morph || {};
  const g2eProgress = runtime.globalWordProgress.g2e || {};
  const morphProgress = runtime.globalWordProgress.morph || {};

  const isEffectivelyConfirmed = (card, runtime.marks, store) => {
    if (runtime.marks[card.id] === 'known') return true;
    const pct = getConfidencePct(store?.[card.id]);
    return pct !== null && pct >= 70;
  };
  const allVocabConfirmed = allVocab.filter(c => isEffectivelyConfirmed(c, g2eMarks, g2eProgress)).length;
  const reqVocabConfirmed = reqVocab.filter(c => isEffectivelyConfirmed(c, g2eMarks, g2eProgress)).length;
  const allGrammarConfirmed = allGrammar.filter(c => isEffectivelyConfirmed(c, morphMarks, morphProgress)).length;

  return {
    allVocabTotal: allVocab.length,
    allVocabConfirmed,
    allVocabCards: allVocab,
    reqVocabTotal: reqVocab.length,
    reqVocabConfirmed,
    reqVocabCards: reqVocab,
    allGrammarTotal: allGrammar.length,
    allGrammarConfirmed,
    allGrammarCards: allGrammar
  };
}

// Heatmap, ring, level-bar and title-ladder HTML builders live in js/ui/charts.js

function computeChapterMastery(progressStore, marksStore) {
  const marksMap = marksStore || runtime.globalWordMarks.g2e || {};
  const store = progressStore || runtime.globalWordProgress.g2e || {};
  const isConfirmed = (card) => {
    if (marksMap[card.id] === 'known') return true;
    const pct = getConfidencePct(store?.[card.id]);
    return pct !== null && pct >= 70;
  };
  return getAllChapterKeys().map(chKey => {
    const cards = getChapterVocabCards(chKey, false);
    const total = cards.length;
    const confirmed = cards.filter(isConfirmed).length;
    return { chapterKey: chKey, total, confirmed, pct: total ? confirmed / total : 0 };
  });
}

function buildChapterGridHtml(mastery) {
  if (!mastery.length) return '';
  const expandedKey = runtime.analyticsExpandedChapter || '';
  const tile = (row) => {
    const pctRound = Math.round(row.pct * 100);
    const label = `Ch. ${row.chapterKey}: ${row.confirmed} / ${row.total} (${pctRound}%) — tap for word stats`;
    let className = 'chapter-tile';
    if (row.pct >= 0.9) className += ' tile-mastered';
    else if (row.pct >= 0.7) className += ' tile-confirmed';
    else if (row.pct > 0) className += ' tile-building';
    else className += ' tile-empty';
    if (String(row.chapterKey) === expandedKey) className += ' chapter-tile-active';
    return `<button type="button" class="${className}" data-chapter="${escapeHtml(String(row.chapterKey))}" title="${escapeHtml(label)}" aria-expanded="${String(row.chapterKey) === expandedKey ? 'true' : 'false'}"><span class="chapter-tile-num">${escapeHtml(row.chapterKey)}</span><span class="chapter-tile-pct">${pctRound}%</span></button>`;
  };
  return `
    <div class="analytics-chart-card chapter-grid-card">
      <div class="analytics-chart-title">Chapter map</div>
      <div class="chapter-grid">${mastery.map(tile).join('')}</div>
      <div class="stacked-legend">
        <span class="stacked-legend-item"><span class="stacked-legend-dot stacked-seg-100"></span>≥ 90%</span>
        <span class="stacked-legend-item"><span class="stacked-legend-dot stacked-seg-50"></span>70–89%</span>
        <span class="stacked-legend-item"><span class="stacked-legend-dot stacked-seg-0"></span>1–69%</span>
        <span class="stacked-legend-item"><span class="stacked-legend-dot stacked-seg-unseen"></span>Unstarted</span>
      </div>
      <div class="chapter-detail-panel${expandedKey ? ' open' : ''}" id="chapterDetailPanel">${expandedKey ? buildChapterDetailHtml(expandedKey) : ''}</div>
    </div>
  `;
}

// ── Per-chapter word breakdown (shown when a chapter tile is tapped) ──
// Reads the same g2e runtime.marks/progress as the chapter map so the headline %
// and the per-word % match. Sorted weakest → strongest so it doubles as
// a "what to drill next" list.
function buildChapterDetailHtml(chapterKey) {
  if (!chapterKey) return '';
  const cards = getChapterVocabCards(String(chapterKey), false);
  if (!cards.length) return `<div class="analytics-empty">No vocabulary for Ch. ${escapeHtml(String(chapterKey))} yet.</div>`;
  const marksMap = runtime.globalWordMarks.g2e || {};
  const store = runtime.globalWordProgress.g2e || {};
  const required = cards.filter(c => c.required).length;
  const headwordOf = (card) => typeof formatGreekHeadword === 'function' ? formatGreekHeadword(card.g) : (card.g || '—');

  // Each row gets a confidence band that mirrors the headline histogram.
  const rowFor = (card) => {
    const progress = store[card.id];
    const isKnownMark = marksMap[card.id] === 'known';
    const rawPct = getConfidencePct(progress);
    const seen = !!(progress?.seenCount) || !!progress?.lastReviewedAt;
    let bandClass;
    let bandLabel;
    let pctText;
    let sortPct;
    if (!seen && rawPct === null && !isKnownMark) {
      bandClass = 'stacked-seg-unseen'; bandLabel = 'Unseen'; pctText = '—'; sortPct = -1;
    } else {
      const pct = isKnownMark ? Math.max(100, rawPct ?? 100) : (rawPct ?? 0);
      sortPct = pct;
      pctText = `${pct}%`;
      if (pct >= 80)      bandClass = 'stacked-seg-b80';
      else if (pct >= 60) bandClass = 'stacked-seg-b60';
      else if (pct >= 40) bandClass = 'stacked-seg-b40';
      else if (pct >= 20) bandClass = 'stacked-seg-b20';
      else                bandClass = 'stacked-seg-b0';
    }
    return {
      card, bandClass, bandLabel, pctText, sortPct,
      isConfirmed: isKnownMark || (rawPct !== null && rawPct >= 70)
    };
  };
  const rows = cards.map(rowFor);
  rows.sort((a, b) => {
    if (a.sortPct !== b.sortPct) return a.sortPct - b.sortPct;
    return (a.card.g || '').localeCompare(b.card.g || '');
  });
  const confirmedCount = rows.filter(r => r.isConfirmed).length;
  const headlinePct = cards.length ? Math.round((confirmedCount / cards.length) * 100) : 0;

  const rowHtml = rows.map(r => {
    const expanded = runtime.analyticsExpandedWord === r.card.id;
    const cardHtml = expanded ? buildWordStatCardHtml(r.card, store[r.card.id], marksMap[r.card.id] === 'known') : '';
    return `
      <li class="chapter-detail-row${expanded ? ' chapter-detail-row-active' : ''}"
          role="button"
          tabindex="0"
          aria-expanded="${expanded ? 'true' : 'false'}"
          data-word-id="${escapeHtml(String(r.card.id))}">
        <span class="chapter-detail-dot ${r.bandClass}" aria-hidden="true"></span>
        <span class="chapter-detail-word">${headwordOf(r.card)}</span>
        <span class="chapter-detail-gloss">${escapeHtml(r.card.e || '')}</span>
        <span class="chapter-detail-pct">${escapeHtml(r.pctText)}</span>
      </li>
      ${expanded ? `<li class="chapter-detail-statcard-row" aria-hidden="false">${cardHtml}</li>` : ''}
    `;
  }).join('');

  return `
    <div class="chapter-detail-head">
      <div class="chapter-detail-title">Ch. ${escapeHtml(String(chapterKey))} — ${confirmedCount} / ${cards.length} confirmed <span class="chapter-detail-meta">${headlinePct}%${required ? ` · ${required} required` : ''}</span></div>
      <button type="button" class="chapter-detail-close" data-chapter-close="1" aria-label="Close chapter details">×</button>
    </div>
    <ol class="chapter-detail-list">${rowHtml}</ol>
  `;
}


function renderChapterDetailPanel() {
  const panel = document.getElementById('chapterDetailPanel');
  if (!panel) return;
  if (!runtime.analyticsExpandedChapter) {
    panel.innerHTML = '';
    panel.classList.remove('open');
    runtime.analyticsExpandedWord = null;
    return;
  }
  panel.innerHTML = buildChapterDetailHtml(runtime.analyticsExpandedChapter);
  panel.classList.add('open');
}

function setupChapterGridInteractivity(rootEl) {
  if (!rootEl || rootEl.dataset.chapterClickBound === '1') return;
  rootEl.dataset.chapterClickBound = '1';

  const handleWordRowToggle = (row) => {
    const wordId = row.dataset.wordId || '';
    if (!wordId) return;
    runtime.analyticsExpandedWord = runtime.analyticsExpandedWord === wordId ? null : wordId;
    renderChapterDetailPanel();
  };

  rootEl.addEventListener('click', (event) => {
    const closeBtn = event.target.closest('[data-chapter-close]');
    if (closeBtn) {
      runtime.analyticsExpandedChapter = null;
      runtime.analyticsExpandedWord = null;
      rootEl.querySelectorAll('.chapter-tile').forEach(t => {
        t.classList.remove('chapter-tile-active');
        t.setAttribute('aria-expanded', 'false');
      });
      renderChapterDetailPanel();
      return;
    }
    const wordRow = event.target.closest('.chapter-detail-row[data-word-id]');
    if (wordRow && rootEl.contains(wordRow)) {
      handleWordRowToggle(wordRow);
      return;
    }
    const tile = event.target.closest('.chapter-tile');
    if (!tile || !rootEl.contains(tile)) return;
    const key = tile.dataset.chapter || '';
    if (!key) return;
    const nextKey = runtime.analyticsExpandedChapter === key ? null : key;
    if (nextKey !== runtime.analyticsExpandedChapter) runtime.analyticsExpandedWord = null;
    runtime.analyticsExpandedChapter = nextKey;
    rootEl.querySelectorAll('.chapter-tile').forEach(t => {
      const active = t.dataset.chapter === runtime.analyticsExpandedChapter;
      t.classList.toggle('chapter-tile-active', active);
      t.setAttribute('aria-expanded', active ? 'true' : 'false');
    });
    renderChapterDetailPanel();
  });

  rootEl.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const wordRow = event.target.closest('.chapter-detail-row[data-word-id]');
    if (!wordRow || !rootEl.contains(wordRow)) return;
    event.preventDefault();
    handleWordRowToggle(wordRow);
  });
}

function computePersonalRecords(usage, sessionHistory, streaks, courseData) {
  const longestSessionMs = sessionHistory.reduce((max, s) => Math.max(max, s.durationMs || 0), 0);

  // Best day = day with most cards first-confirmed.
  const byDay = {};
  const mergeFirstConfirmed = (store) => {
    Object.values(store || {}).forEach(entry => {
      const ts = Number(entry?.firstConfirmedAt) || 0;
      if (!ts) return;
      const key = getUsageDayKey(ts);
      byDay[key] = (byDay[key] || 0) + 1;
    });
  };
  mergeFirstConfirmed(runtime.globalWordProgress.g2e);
  mergeFirstConfirmed(runtime.globalWordProgress.e2g);
  mergeFirstConfirmed(runtime.globalWordProgress.morph);
  let bestDayCount = 0;
  let bestDayKey = '';
  Object.entries(byDay).forEach(([key, count]) => {
    if (count > bestDayCount) { bestDayCount = count; bestDayKey = key; }
  });

  const totalConfirmed = courseData.allVocabConfirmed + (canAccessGrammarUi() ? courseData.allGrammarConfirmed : 0);
  return {
    longestSessionMs,
    bestStreak: streaks.longest || 0,
    bestDayCount,
    bestDayKey,
    totalConfirmed
  };
}

function buildRecordsHtml(records) {
  const items = [
    { label: 'Longest session',  value: records.longestSessionMs ? formatUsageDuration(records.longestSessionMs) : '—', note: 'Active study, single sitting' },
    { label: 'Best day',          value: records.bestDayCount ? `${records.bestDayCount} cards` : '—', note: records.bestDayKey ? `On ${formatAnalyticsDate(new Date(records.bestDayKey + 'T00:00:00').getTime())}` : 'First confirmations in a single day' },
    { label: 'Best streak',       value: records.bestStreak ? `${records.bestStreak} day${records.bestStreak === 1 ? '' : 's'}` : '—', note: 'Longest consecutive run' },
    { label: 'Cards confirmed',   value: records.totalConfirmed.toLocaleString(), note: 'Course-wide, all directions' }
  ];
  return `
    <div class="analytics-chart-card records-card">
      <div class="analytics-chart-title">Personal records</div>
      <div class="records-grid">${items.map(it => `
        <div class="records-cell">
          <div class="records-value">${escapeHtml(it.value)}</div>
          <div class="records-label">${escapeHtml(it.label)}</div>
          <div class="records-note">${escapeHtml(it.note)}</div>
        </div>
      `).join('')}</div>
    </div>
  `;
}

function computeStubbornCards(cards, progressStore) {
  return (cards || [])
    .map(card => {
      const p = progressStore?.[card.id];
      if (!p) return null;
      const fails = Number(p.failCount) || 0;
      const passes = Number(p.passCount) || 0;
      const seen = Number(p.seenCount) || 0;
      if (fails < 2 || seen < 3) return null;
      const total = fails + passes;
      const failRate = total ? fails / total : 0;
      return { card, fails, passes, seen, failRate };
    })
    .filter(Boolean)
    .sort((a, b) => (b.fails - a.fails) || (b.failRate - a.failRate))
    .slice(0, 5);
}

function buildStubbornListHtml(vocabRows, grammarRows) {
  if (!vocabRows.length && !grammarRows.length) return '';
  const renderRow = (row, kind) => {
    const card = row.card;
    const headword = kind === 'grammar'
      ? `${card.form || card.lemma || '—'}${card.lemma && card.form && card.form !== card.lemma ? ` <span class="stubborn-lemma">(${escapeHtml(card.lemma)})</span>` : ''}`
      : escapeHtml(card.g || '—');
    const gloss = kind === 'grammar' ? (card.answer || card.gloss || '') : (card.e || '');
    return `
      <li class="stubborn-row">
        <div class="stubborn-word">${headword}</div>
        <div class="stubborn-gloss">${escapeHtml(gloss)}</div>
        <div class="stubborn-stats">${row.fails} miss${row.fails === 1 ? '' : 'es'} · ${Math.round(row.failRate * 100)}% miss rate · ${row.seen} flips</div>
      </li>
    `;
  };

  const vocabSection = vocabRows.length ? `
    <div class="stubborn-group">
      <div class="stubborn-group-label">Stubborn vocabulary</div>
      <ol class="stubborn-list">${vocabRows.map(r => renderRow(r, 'vocab')).join('')}</ol>
    </div>
  ` : '';
  const grammarSection = grammarRows.length ? `
    <div class="stubborn-group">
      <div class="stubborn-group-label">Stubborn grammar</div>
      <ol class="stubborn-list">${grammarRows.map(r => renderRow(r, 'grammar')).join('')}</ol>
    </div>
  ` : '';

  return `
    <div class="analytics-chart-card stubborn-card">
      <div class="analytics-chart-title">Most stubborn in this selection</div>
      <div class="stubborn-subtitle">Cards you've missed most — worth a focused pass.</div>
      ${vocabSection}
      ${grammarSection}
    </div>
  `;
}

function computeAtRiskCount(cards, progressStore) {
  if (!cards?.length) return 0;
  const now = Date.now();
  let count = 0;
  cards.forEach(card => {
    const p = progressStore?.[card.id];
    if (!p) return;
    if (!p.dueAt || !p.firstConfirmedAt) return;
    if (p.dueAt > now) return;
    const pct = getConfidencePct(p);
    if (pct === null || pct < 70) count++;
  });
  return count;
}

function renderAnalyticsOverlay() {
  const overlay = document.getElementById('analyticsOverlay'); if (!overlay) return;
  accumulateActiveStudyTime();
  const usage = ensureUsageStats();
  const usageSeries = buildDailyCumulativeSeriesFromMap(usage.activeDailyMs, usage.firstStudyAt || 0);
  const sessionHistory = [...usage.studySessionHistory];
  if (usage.currentStudySession && usage.currentStudySession.startedAt) sessionHistory.push({ startedAt: usage.currentStudySession.startedAt, endedAt: usage.lastStudyCountedAt || Date.now(), durationMs: usage.currentStudySession.durationMs || 0, interactionCount: usage.currentStudySession.interactionCount || 0 });
  const latestSession = sessionHistory[sessionHistory.length - 1] || null;

  // ── Per-direction progress stores. Analytics needs to read vocab progress
  //    from the g2e/e2g store and grammar progress from the morph store
  //    regardless of the current runtime.studyMode, otherwise getWordProgress()
  //    (which is keyed on the active mode) reports every off-mode card as
  //    "Unseen". ──
  const g2eProgressStore = runtime.globalWordProgress.g2e || {};
  const e2gProgressStore = runtime.globalWordProgress.e2g || {};
  const morphProgressStore = runtime.globalWordProgress.morph || {};
  const vocabProgressStore = runtime.directionToGreek ? e2gProgressStore : g2eProgressStore;

  // ── Vocab & Grammar data (used by both gamification and section renders) ──
  const vocabCards = runtime.selectedKeys.length ? getSelectedVocabCards(runtime.selectedKeys, runtime.requiredOnly) : [];
  const vocabMarks = runtime.directionToGreek ? runtime.globalWordMarks.e2g : runtime.globalWordMarks.g2e;
  const vocabProgress = buildCumulativeConfirmationSeries(vocabCards, vocabMarks, vocabProgressStore);
  const vocabProjection = getRegressionProjection(vocabProgress.series, vocabProgress.currentConfirmed, vocabProgress.total);
  const vocabBuckets = buildConfirmationHistogram(vocabCards, vocabProgressStore);
  const activePerConfirmed = vocabProgress.currentConfirmed ? usage.activeStudyMs / vocabProgress.currentConfirmed : 0;
  const grammarCards = canAccessGrammarUi() && runtime.selectedKeys.length ? getSelectedGrammarCards(runtime.selectedKeys) : [];
  const grammarMarks = runtime.globalWordMarks.morph;
  const grammarProgress = buildCumulativeConfirmationSeries(grammarCards, grammarMarks, morphProgressStore);
  const grammarProjection = getRegressionProjection(grammarProgress.series, grammarProgress.currentConfirmed, grammarProgress.total);
  const grammarBuckets = buildConfirmationHistogram(grammarCards, morphProgressStore);

  // ── Course-wide data (selection-independent, represents full course) ──
  const courseData = computeCourseWideData();

  // ── Gamification computations (all course-wide) ──
  const streaks = computeStudyStreaks(usage.activeDailyMs);
  const xpData = computeXpAndLevel(usage);
  const mergedProgressStore = {};
  [g2eProgressStore, e2gProgressStore, morphProgressStore].forEach(store => {
    Object.entries(store).forEach(([cardId, entry]) => {
      const existing = mergedProgressStore[cardId] || {};
      mergedProgressStore[cardId] = {
        ...existing,
        ...entry,
        lastReviewedAt: Math.max(Number(existing.lastReviewedAt) || 0, Number(entry?.lastReviewedAt) || 0),
        firstConfirmedAt: Math.max(Number(existing.firstConfirmedAt) || 0, Number(entry?.firstConfirmedAt) || 0)
      };
    });
  });
  const allCourseCards = [...courseData.allVocabCards, ...courseData.allGrammarCards];
  const mergedMarks = { ...(runtime.globalWordMarks.g2e || {}), ...(runtime.globalWordMarks.e2g || {}), ...(runtime.globalWordMarks.morph || {}) };
  const todayStats = computeTodayStats(usage.activeDailyMs, allCourseCards, mergedMarks, mergedProgressStore);
  const achievements = computeAchievements(usage, courseData, streaks, sessionHistory.length, todayStats);
  const dailyAwards = achievements.filter(a => a.group === 'daily');
  const milestones = achievements.filter(a => a.group !== 'chapter' && a.group !== 'daily');
  const chapterAwards = achievements.filter(a => a.group === 'chapter');
  const earnedDaily = dailyAwards.filter(a => a.earned).length;
  const earnedMilestones = milestones.filter(a => a.earned).length;
  const earnedChapters = chapterAwards.filter(a => a.earned).length;

  // ── Hero section ──
  const heroEl = document.getElementById('analyticsHero');
  if (heroEl) {
    const streakLabel = streaks.current === 1 ? '1 day' : `${streaks.current} days`;
    const streakFlame = streaks.current >= 7 ? '\u{1F525}' : streaks.current >= 3 ? '\u2668\uFE0F' : '\u2727';
    const todayGoalFraction = Math.min(1, todayStats.todayMs / (15 * 60 * 1000)); // 15-min daily goal
    heroEl.innerHTML = `
      <div class="hero-grid">
        <div class="hero-card hero-streak">
          <div class="hero-icon">${streakFlame}</div>
          <div class="hero-big">${streakLabel}</div>
          <div class="hero-sub">Current streak${streaks.longest > streaks.current ? ` \u00B7 Best: ${streaks.longest}d` : ''}</div>
        </div>
        <div class="hero-card hero-level">
          <div class="hero-rank-badge">Lv. ${xpData.currentLevel.level}</div>
          <div class="hero-big">${escapeHtml(xpData.currentLevel.title)}</div>
          <div class="hero-sub">${xpData.totalXp.toLocaleString()} XP${xpData.currentLevel.flav ? ' \u00B7 ' + escapeHtml(xpData.currentLevel.flav) : ''}</div>
          ${buildLevelBarHtml(xpData)}
        </div>
        <div class="hero-card hero-today">
          ${buildCircularProgressSvg(todayGoalFraction, 'Today progress', formatUsageDuration(todayStats.todayMs))}
          <div class="hero-today-stats">
            <span>${todayStats.reviewedToday} reviewed</span>
            <span>${todayStats.newToday} new</span>
          </div>
        </div>
      </div>
    `;
  }

  // ── Title ladder ──
  const titlesEl = document.getElementById('analyticsTitles');
  if (titlesEl) {
    titlesEl.innerHTML = buildTitleLadderHtml(xpData);
  }

  // ── Course completion stacked bars (always course-wide) ──
  const courseEl = document.getElementById('analyticsCourseCompletion');
  if (courseEl) {
    const g2eMarks = runtime.globalWordMarks.g2e || {};
    const morphMarksAll = runtime.globalWordMarks.morph || {};
    const courseVocabBuckets = buildConfirmationHistogram(courseData.allVocabCards, g2eProgressStore);
    const showGrammar = canAccessGrammarUi();
    let courseGrammarHtml = '';
    if (showGrammar) {
      const courseGrammarBuckets = buildConfirmationHistogram(courseData.allGrammarCards, morphProgressStore);
      courseGrammarHtml = `
        <div class="analytics-chart-card" style="margin-top:10px">
          <div class="analytics-chart-title">Grammar \u2014 ${courseData.allGrammarConfirmed} / ${courseData.allGrammarTotal} confirmed</div>
          ${buildHistogramSvg(courseGrammarBuckets, { title: 'Course grammar confirmation %' })}
        </div>`;
    }
    courseEl.innerHTML = `
      <div class="analytics-chart-card">
        <div class="analytics-chart-title">Vocabulary \u2014 ${courseData.allVocabConfirmed} / ${courseData.allVocabTotal} confirmed (${courseData.reqVocabConfirmed} / ${courseData.reqVocabTotal} required)</div>
        ${buildHistogramSvg(courseVocabBuckets, { title: 'Course vocabulary confirmation %' })}
      </div>
      ${courseGrammarHtml}
    `;
  }

  // ── Chapter mastery grid (course-wide) ──
  const chapterGridEl = document.getElementById('analyticsChapterGrid');
  if (chapterGridEl) {
    const mastery = computeChapterMastery(g2eProgressStore, runtime.globalWordMarks.g2e || {});
    if (mastery.length) {
      // Drop the expanded chapter if it's no longer in the mastery list (e.g.
      // sets were removed) so we don't try to render a phantom panel.
      if (runtime.analyticsExpandedChapter && !mastery.some(m => String(m.chapterKey) === runtime.analyticsExpandedChapter)) {
        runtime.analyticsExpandedChapter = null;
        runtime.analyticsExpandedWord = null;
      }
      chapterGridEl.innerHTML = buildChapterGridHtml(mastery);
      setupChapterGridInteractivity(chapterGridEl);
    } else {
      chapterGridEl.innerHTML = '';
      runtime.analyticsExpandedChapter = null;
      runtime.analyticsExpandedWord = null;
    }
  }

  // ── Personal records (course-wide) ──
  const recordsEl = document.getElementById('analyticsRecords');
  if (recordsEl) {
    const records = computePersonalRecords(usage, sessionHistory, streaks, courseData);
    recordsEl.innerHTML = buildRecordsHtml(records);
  }

  // ── Heatmap ──
  const heatmapEl = document.getElementById('analyticsHeatmap');
  if (heatmapEl) {
    const hasData = Object.keys(usage.activeDailyMs || {}).some(k => usage.activeDailyMs[k] > 0);
    heatmapEl.innerHTML = hasData
      ? `<div class="analytics-chart-card heatmap-card">
           <div class="analytics-chart-title">Study activity</div>
           ${buildHeatmapSvg(usage.activeDailyMs)}
           <div class="heatmap-legend">
             <span class="heatmap-legend-label">Less</span>
             <span class="heatmap-swatch" style="background:rgba(255,255,255,0.05)"></span>
             <span class="heatmap-swatch" style="background:rgba(201,168,76,0.25)"></span>
             <span class="heatmap-swatch" style="background:rgba(201,168,76,0.50)"></span>
             <span class="heatmap-swatch" style="background:rgba(201,168,76,0.75)"></span>
             <span class="heatmap-swatch" style="background:rgba(201,168,76,0.90)"></span>
             <span class="heatmap-legend-label">More</span>
           </div>
         </div>`
      : '';
  }

  // ── Achievements (grouped: milestones + chapters) ──
  const achieveEl = document.getElementById('analyticsAchievements');
  if (achieveEl) {
    const dailyHtml = dailyAwards.length ? `
      <div class="achieve-group-label">Daily <span class="achieve-counter">${earnedDaily} / ${dailyAwards.length}</span></div>
      <div class="achieve-grid">${dailyAwards.map(a => `
        <div class="achieve-badge ${a.earned ? 'earned' : 'locked'}" title="${escapeHtml(a.desc)}">
          <div class="achieve-icon">${a.icon}</div>
          <div class="achieve-name">${escapeHtml(a.name)}</div>
        </div>
      `).join('')}</div>
    ` : '';
    const chapterHtml = chapterAwards.length ? `
      <div class="achieve-group-label">Chapters <span class="achieve-counter">${earnedChapters} / ${chapterAwards.length}</span></div>
      <div class="achieve-grid achieve-grid-chapters">${chapterAwards.map(a => `
        <div class="achieve-badge ${a.earned ? 'earned' : 'locked'}" title="${escapeHtml(a.desc)}">
          <div class="achieve-icon">${a.icon}</div>
          <div class="achieve-name">${escapeHtml(a.name)}</div>
        </div>
      `).join('')}</div>
    ` : '';
    achieveEl.innerHTML = `
      <div class="analytics-chart-card achieve-card">
        <div class="analytics-chart-title">Achievements</div>
        ${dailyHtml}
        <div class="achieve-group-label">Milestones <span class="achieve-counter">${earnedMilestones} / ${milestones.length}</span></div>
        <div class="achieve-grid">${milestones.map(a => `
          <div class="achieve-badge ${a.earned ? 'earned' : 'locked'}" title="${escapeHtml(a.desc)}">
            <div class="achieve-icon">${a.icon}</div>
            <div class="achieve-name">${escapeHtml(a.name)}</div>
          </div>
        `).join('')}</div>
        ${chapterHtml}
      </div>
    `;
  }

  // ── Overall time metrics (existing, reorganized) ──
  const overallMetricsEl = document.getElementById('analyticsOverallMetrics');
  const overallChartEl = document.getElementById('analyticsTimeChart');
  const sessionEl = document.getElementById('analyticsSessionSummary');
  if (overallMetricsEl) overallMetricsEl.innerHTML = `
      <div class="analytics-metric-card"><div class="analytics-metric-label">Active study time</div><div class="analytics-metric-value">${escapeHtml(formatUsageDuration(usage.activeStudyMs))}</div><div class="analytics-metric-note">Stricter interaction-based timer</div></div>
      <div class="analytics-metric-card"><div class="analytics-metric-label">Foreground time</div><div class="analytics-metric-value">${escapeHtml(formatUsageDuration(usage.totalMs))}</div><div class="analytics-metric-note">App visible on screen</div></div>
      <div class="analytics-metric-card"><div class="analytics-metric-label">Study sessions logged</div><div class="analytics-metric-value">${sessionHistory.length}</div><div class="analytics-metric-note">${latestSession ? `Latest ${formatAnalyticsDateTime(latestSession.startedAt)}` : 'No completed sessions yet'}</div></div>
      <div class="analytics-metric-card"><div class="analytics-metric-label">Average session length</div><div class="analytics-metric-value">${escapeHtml(formatUsageDuration(sessionHistory.length ? sessionHistory.reduce((sum, entry) => sum + (entry.durationMs || 0), 0) / sessionHistory.length : 0))}</div><div class="analytics-metric-note">Across saved study sessions</div></div>`;
  if (overallChartEl) overallChartEl.innerHTML = usageSeries.length ? buildLineChartSvg(usageSeries, { title: 'Cumulative active study time' }) : `<div class="analytics-empty">Start studying and this cumulative time chart will wake up.</div>`;
  if (sessionEl) sessionEl.textContent = latestSession ? `Latest session: ${formatAnalyticsDateTime(latestSession.startedAt)} \u2192 ${formatAnalyticsDateTime(latestSession.endedAt)} \u00B7 ${formatUsageDuration(latestSession.durationMs)} \u00B7 ${latestSession.interactionCount || 0} study actions` : 'No study session history yet.';

  // ── Current-selection subtitle (frames the section below) ──
  const selectionSubtitleEl = document.getElementById('analyticsSelectionSubtitle');
  if (selectionSubtitleEl) {
    if (!runtime.selectedKeys.length) {
      selectionSubtitleEl.textContent = 'Pick a session or chapter on the home screen to populate these stats.';
    } else {
      const scopeBit = runtime.requiredOnly ? 'Required-only (graded) vocabulary' : 'All vocabulary, graded + nice-to-haves';
      const grammarBit = canAccessGrammarUi() ? ' plus the matching grammar drills' : '';
      selectionSubtitleEl.textContent = `${scopeBit}${grammarBit} across ${runtime.selectedKeys.length} set${runtime.selectedKeys.length === 1 ? '' : 's'}.`;
    }
  }

  // ── Vocab section (selection-scoped). Required-only IS the graded subset,
  //    so the toggle is a real lever — surface it in the subtitle, not as a metric. ──
  const vocabAtRisk = computeAtRiskCount(vocabCards, runtime.directionToGreek ? e2gProgressStore : g2eProgressStore);
  renderAnalyticsSection('analyticsVocabSection', {
    title: 'Vocabulary progress',
    subtitle: runtime.selectedKeys.length
      ? `${runtime.requiredOnly ? 'Required-only (graded) vocabulary' : 'All vocabulary, graded + nice-to-haves'} in the current selection`
      : 'Choose one or more vocabulary sets to populate this view.',
    total: vocabProgress.total,
    metrics: [
      { label: 'Confirmed now',     value: `${vocabProgress.currentConfirmed} / ${vocabProgress.total || 0}`, note: 'Marked known or ≥70% recent accuracy' },
      { label: 'New this week',     value: `${vocabProgress.weeklyPct.toFixed(1)}%`, note: 'Share first confirmed in the last 7 days' },
      { label: 'Slipping now',      value: `${vocabAtRisk}`, note: 'Confirmed before but accuracy now < 70%' },
      { label: 'Projected finish',  value: vocabProgress.currentConfirmed >= vocabProgress.total && vocabProgress.total ? 'Complete' : (vocabProjection ? formatAnalyticsDate(vocabProjection.projectedTs) : '\u2014'), note: vocabProjection ? `${vocabProjection.cardsPerDay.toFixed(2)} words/day regression` : 'Needs more recent progress data' }
    ],
    lineTitle: 'Cumulative confirmed vocabulary fraction',
    lineSvg: vocabProgress.series.length ? buildLineChartSvg(vocabProgress.series, { title: 'Vocabulary progress', percent: true, maxValue: 1 }) : `<div class="analytics-empty">No confirmed vocabulary history yet for this selection.</div>`,
    barTitle: 'Vocabulary confirmation breakdown',
    barSvg: buildHistogramSvg(vocabBuckets, { title: 'Vocabulary confirmation' })
  });

  // ── Grammar section (selection-scoped). All paradigms are required, so the
  //    required-only toggle does not apply here — the 'Required toggle' pseudo-metric is gone. ──
  const grammarAtRisk = computeAtRiskCount(grammarCards, morphProgressStore);
  renderAnalyticsSection('analyticsGrammarSection', {
    title: 'Grammar progress',
    subtitle: canAccessGrammarUi() ? 'Morphology and grammar drills in the current selection. Paradigms are all required.' : 'Switch to the full vocabulary + grammar layout to track grammar progress here.',
    total: grammarProgress.total,
    metrics: [
      { label: 'Confirmed now',    value: `${grammarProgress.currentConfirmed} / ${grammarProgress.total || 0}`, note: 'Marked known or ≥70% recent accuracy' },
      { label: 'New this week',    value: `${grammarProgress.weeklyPct.toFixed(1)}%`, note: 'Share first confirmed in the last 7 days' },
      { label: 'Slipping now',     value: `${grammarAtRisk}`, note: 'Confirmed before but accuracy now < 70%' },
      { label: 'Projected finish', value: grammarProgress.currentConfirmed >= grammarProgress.total && grammarProgress.total ? 'Complete' : (grammarProjection ? formatAnalyticsDate(grammarProjection.projectedTs) : '\u2014'), note: grammarProjection ? `${grammarProjection.cardsPerDay.toFixed(2)} items/day regression` : 'Needs more recent progress data' }
    ],
    lineTitle: 'Cumulative confirmed grammar fraction',
    lineSvg: grammarProgress.series.length ? buildLineChartSvg(grammarProgress.series, { title: 'Grammar progress', percent: true, maxValue: 1 }) : `<div class="analytics-empty">No confirmed grammar history yet for this selection.</div>`,
    barTitle: 'Grammar confirmation breakdown',
    barSvg: buildHistogramSvg(grammarBuckets, { title: 'Grammar confirmation' })
  });

  // ── Stubborn cards (selection-scoped, vocab + grammar) ──
  const stubbornEl = document.getElementById('analyticsStubbornWords');
  if (stubbornEl) {
    const vocabStubborn = computeStubbornCards(vocabCards, runtime.directionToGreek ? e2gProgressStore : g2eProgressStore);
    const grammarStubborn = canAccessGrammarUi() ? computeStubbornCards(grammarCards, morphProgressStore) : [];
    stubbornEl.innerHTML = runtime.selectedKeys.length ? buildStubbornListHtml(vocabStubborn, grammarStubborn) : '';
  }
}

installKeyboardShortcuts({
  isAnalyticsModalOpen, closeAnalyticsOverlay,
  isStudySelectorOpen, closeStudySelector,
  isShortcutsModalOpen, closeShortcutsModal,
  isWhatsNewV1_1ModalOpen, closeWhatsNewV1_1Modal,
  isDisclaimerModalOpen, isTransferModalOpen,
  isReviewDeckMode,
  getSelectedKeys: () => runtime.selectedKeys,
  isMorphologyMode,
  navigate, answerMorphologyChoice, flipCard, markCard
});

// ═══════════════════════════════════════════════════════
//  GLOBAL EXPORTS — needed for HTML onclick handlers
//  Export these BEFORE startup runs, so one later init error does not
//  leave the page rendered-but-unclickable.
// ═══════════════════════════════════════════════════════
const GLOBAL_CLICK_HANDLERS = {
  flipCard, navigate, markCard, answerMorphologyChoice,
  revealMorphologyAnswer, rateMorphologySelfCheck, markMorphologyDontKnow, returnSeenCardToDeck,
  closeAnalyticsOverlay, closeTransferModal, exportProgressJson,
  closeShortcutsModal, closeStudySelector,
  deselectAllChapters, deselectAllSupplementals, deselectAllAdvanced, deselectAll,
  handleConsentAction, handleTransferPrimaryAction, handleTransferSecondaryAction,
  openShortcutsModal, openStudySelector,
  openAnalyticsOverlay, resetAllStats, resetCurrentDeck, reshuffleEligible,
  fastForwardOneDay, fastForwardOneWeek,
  restoreSpacedUndo, setAppProfile, setStudyMode, setThemeMode,
  showDisclaimerModal, startStudying, toggleDirection, toggleMorphSelfCheck,
  toggleRequiredOnly, toggleShuffle, toggleSpacedRepetition, triggerImportProgress,
  openReaderTab, selectReaderDrillChoice, advanceReaderDrill,
  closeWhatsNewV1_1Modal
};
if (typeof globalThis !== 'undefined') Object.assign(globalThis, GLOBAL_CLICK_HANDLERS);
if (typeof window !== 'undefined' && window !== globalThis) Object.assign(window, GLOBAL_CLICK_HANDLERS);

initializeThemeMode();
// Initial build with default state (needed so restoreState can find DOM elements)
buildSessions();
buildChapterSelector();
buildSupplementalSelector();
buildAdvancedSelector();
if (!restoreState()) {
  syncToggleButtons(); // reflect default controls on load
}
// Rebuild after restore: runtime.appProfile may have changed, affecting grammar summary text
buildSessions();
buildChapterSelector();
buildSupplementalSelector();
buildAdvancedSelector();
initializeConsentGate();
if (isReaderMode()) renderReaderModule();

window.addEventListener('greekSupplementalDataChanged', () => {
  buildSessions();
  buildChapterSelector();
  buildSupplementalSelector();
  buildAdvancedSelector();
  if (runtime.selectedKeys.length && runtime.selectedKeys.some(key => window.SETS?.[key]?.type === 'other')) {
    const keysToLoad = runtime.currentSession ? expandSessionSets(runtime.currentSession) : runtime.selectedKeys;
    loadDeckFromKeys(keysToLoad, runtime.currentSession ? runtime.currentSession.id : null);
  }
});

const cardArea = document.getElementById('cardArea');
if (cardArea) {
  cardArea.addEventListener('click', (event) => {
    const target = event.target;
    if (!target || !(target instanceof Element)) return;
    if (target.closest('.empty-state')) openStudySelector();
  });
}

startUsageTracking();
syncLayoutVisibility();
renderProgress();
installTouchSafeTapBridge();

// Prevent mobile double-tap zoom on interactive controls
function preventDoubleTapZoom(el) {
  let lastTouchEnd = 0;
  el.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) event.preventDefault();
    lastTouchEnd = now;
  }, false);
}

['shuffleToggle','requiredToggle','directionToggle','spacedToggle','selfCheckToggle','modeVocabBtn','modeMorphBtn','modeReaderBtn','modeShortcutVocabBtn','modeShortcutMorphBtn','modeShortcutReaderBtn','themeSystemBtn','themeDarkBtn','themeLightBtn'].forEach(id => {
  const el = document.getElementById(id);
  if (el) preventDoubleTapZoom(el);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' })
      .then(reg => { try { reg.update(); } catch (_) {} })
      .catch(() => {});
  });
}
