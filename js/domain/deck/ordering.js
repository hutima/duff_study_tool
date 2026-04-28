// Deck ordering and set key helpers
import { CHAPTER_TO_WEEK, SESSION_WEEK_META } from '../../data/setMeta.js';

function getSets() {
  return window.SETS && typeof window.SETS === 'object' ? window.SETS : {};
}

export function isChapterKey(key) {
  return /^\d+$/.test(String(key));
}

export function sortSetKeys(keys) {
  function score(key) {
    const raw = String(key);
    if (/^\d+$/.test(raw)) return Number(raw);
    const m = raw.match(/^W(\d+)O$/);
    if (m) return 100 + Number(m[1]);
    return 999;
  }
  return [...keys].sort((a, b) => {
    const diff = score(a) - score(b);
    return diff || String(a).localeCompare(String(b));
  });
}

export function displaySetShortLabel(key) {
  const raw = String(key);
  if (/^\d+$/.test(raw)) return `Ch. ${raw}`;
  const sets = getSets();
  return sets[raw]?.label || raw;
}

export function sourceHint(key) {
  const raw = String(key);
  if (/^\d+$/.test(raw)) return `Ch. ${raw}`;
  const sets = getSets();
  return sets[raw]?.label || raw;
}

export function getWeekForKey(key) {
  const raw = String(key);
  if (isChapterKey(raw)) return CHAPTER_TO_WEEK[Number(raw)] || null;
  const sets = getSets();
  return sets[raw]?.week || null;
}

export function getChapterForKey(key) {
  const raw = String(key);
  return isChapterKey(raw) ? Number(raw) : null;
}

export function getOtherKeysForWeeks(weeks) {
  const weekSet = new Set((weeks || []).map(Number).filter(Boolean));
  const sets = getSets();
  return Object.keys(sets).filter(key => {
    const set = sets[key];
    return set && set.type === 'other' && weekSet.has(Number(set.week));
  });
}

export function expandSessionSets(session) {
  const baseSets = (session?.sets || []).map(String);
  const weeks = SESSION_WEEK_META[session?.id] || [];
  const dynamicOthers = getOtherKeysForWeeks(weeks);
  return sortSetKeys([...new Set([...baseSets, ...dynamicOthers])]);
}
