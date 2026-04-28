// SRS scheduling logic — pure functions, no state access
import { SRS_DAY_MS, SRS_AGAIN_MS, SRS_UNCERTAIN_MIN_MS, SRS_UNSPACED_RECOVERY_MS, SRS_GUIDE_STEPS_DAYS } from './constants.js';
import { clamp } from '../../utils/helpers.js';

export function msFromDays(days) {
  return Math.round(days * SRS_DAY_MS);
}

export function msFromHours(hours) {
  return Math.round(hours * 60 * 60 * 1000);
}

export function setProgressDelay(progress, delayMs, now = Date.now()) {
  progress.intervalDays = delayMs / SRS_DAY_MS;
  progress.dueAt = now + delayMs;
}

export function getRemainingProgressDelayMs(progress, now = Date.now()) {
  if (!progress || !progress.dueAt) return 0;
  return Math.max(0, progress.dueAt - now);
}

export function setMinimumProgressDelay(progress, minimumDelayMs, now = Date.now()) {
  const remainingDelayMs = getRemainingProgressDelayMs(progress, now);
  if (remainingDelayMs < minimumDelayMs) {
    setProgressDelay(progress, minimumDelayMs, now);
    return true;
  }
  progress.intervalDays = remainingDelayMs / SRS_DAY_MS;
  return false;
}

export function getSrsEase(progress) {
  const rawEase = Number(progress?.ease);
  const safeEase = Number.isFinite(rawEase) ? rawEase : 2.3;
  progress.ease = clamp(safeEase, 1.3, 3.0);
  return progress.ease;
}

export function getSrsStage(progress) {
  const rawStage = Number(progress?.srsStage);
  return Number.isFinite(rawStage) ? Math.max(0, Math.floor(rawStage)) : 0;
}

export function getLastEasyIntervalDays(progress) {
  const rawDays = Number(progress?.lastEasyIntervalDays);
  return Number.isFinite(rawDays) ? Math.max(0, rawDays) : 0;
}

export function getNextEasyIntervalDays(progress) {
  const confidenceHistory = Array.isArray(progress?.confidenceHistory)
    ? progress.confidenceHistory.filter(value => Number.isFinite(value)).slice(-4)
    : [];
  if (confidenceHistory.length) {
    const confidenceAvg = confidenceHistory.reduce((sum, value) => sum + value, 0) / confidenceHistory.length;
    if (confidenceAvg < 1) {
      return Math.max(confidenceAvg, 1 / 24);
    }
  }

  const stage = getSrsStage(progress);
  const guideDays = SRS_GUIDE_STEPS_DAYS;
  if (stage < guideDays.length) return guideDays[stage];

  const previousDays = Math.max(
    guideDays[guideDays.length - 1],
    getLastEasyIntervalDays(progress),
    Number.isFinite(Number(progress?.intervalDays)) ? Math.max(0, Number(progress.intervalDays)) : 0
  );
  const proposedDays = previousDays * getSrsEase(progress);
  return Math.max(Math.round(proposedDays), Math.ceil(previousDays + 1));
}

export function getEasyDelayMs(progress) {
  return msFromDays(getNextEasyIntervalDays(progress));
}

export function getUncertainDelayMs(progress) {
  return SRS_UNCERTAIN_MIN_MS;
}

export function formatRemainingForTable(dueAt) {
  const now = Date.now();
  if (!dueAt || dueAt <= now) return 'now';
  const remaining = dueAt - now;
  if (remaining > 12 * 60 * 60 * 1000) {
    return `${Math.max(1, Math.ceil(remaining / SRS_DAY_MS))}d`;
  }
  if (remaining >= 60 * 60 * 1000) {
    return `${Math.max(1, Math.ceil(remaining / (60 * 60 * 1000)))}h`;
  }
  return `${Math.max(1, Math.ceil(remaining / (60 * 1000)))}m`;
}

// Apply unspaced schedule — takes cycleState and progress as arguments
export function applyUnspacedSchedule(progress, cycleEntry, outcome, reviewedAt = Date.now()) {
  const normalizedOutcome = outcome === 'easy' ? 'easy' : outcome === 'pass' ? 'pass' : 'again';

  if (normalizedOutcome === 'again') {
    cycleEntry.wrongThisCycle = true;
    cycleEntry.lastOutcome = 'again';
    setProgressDelay(progress, SRS_AGAIN_MS, reviewedAt);
    return progress;
  }

  const recoveringFromMiss = cycleEntry.wrongThisCycle;
  const minimumDelayMs = (normalizedOutcome === 'pass' || recoveringFromMiss)
    ? SRS_UNSPACED_RECOVERY_MS
    : SRS_DAY_MS;

  cycleEntry.correctCount += 1;
  cycleEntry.lastOutcome = normalizedOutcome;
  setMinimumProgressDelay(progress, minimumDelayMs, reviewedAt);
  return progress;
}
