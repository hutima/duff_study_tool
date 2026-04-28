// Card selection / filtering helpers
import { isChapterKey, sourceHint, getChapterForKey, getWeekForKey } from './ordering.js';
import { isMorphCard } from '../grammar/explanations.js';

function getSets() {
  return window.SETS && typeof window.SETS === 'object' ? window.SETS : {};
}

function stableKey(greek) {
  return typeof window.stableCardKey === 'function' ? window.stableCardKey(greek) : String(greek || '');
}

function formatHeadword(greek) {
  return typeof window.formatGreekHeadword === 'function' ? window.formatGreekHeadword(greek) : String(greek || '');
}

function detectPos(card) {
  return typeof window.detectPartOfSpeech === 'function' ? window.detectPartOfSpeech(card) : '';
}

function transliterate(text) {
  return typeof window.transliterateGreek === 'function' ? window.transliterateGreek(text) : String(text || '');
}

export function getSelectedVocabCards(keys, requiredFlag = false) {
  const cards = [];
  (keys || []).forEach(key => {
    const rawKey = String(key);
    const set = getSets()[rawKey];
    if (!set) return;
    set.cards.forEach((card, idx) => {
      if (requiredFlag && !card.required) return;
      cards.push({
        ...card,
        kind: 'vocab',
        sourceKey: rawKey,
        sourceLabel: sourceHint(rawKey),
        chapter: getChapterForKey(rawKey),
        week: getWeekForKey(rawKey),
        id: `${rawKey}-${idx}-${stableKey(card.g)}`
      });
    });
  });
  return cards;
}

export function getSelectedGrammarCards(keys) {
  const morphCards = window.buildMorphologyCardsForKeys ? window.buildMorphologyCardsForKeys(keys || []) : [];
  const grammarCards = window.buildGrammarCardsForKeys ? window.buildGrammarCardsForKeys(keys || []) : [];
  return [...morphCards, ...grammarCards];
}

export function getAllVocabKeys() {
  return Object.keys(getSets());
}

export function getAllChapterKeys() {
  return Object.keys(getSets()).filter(isChapterKey).sort((a, b) => Number(a) - Number(b));
}

export function getAllVocabCards(requiredFlag = false) {
  return getSelectedVocabCards(getAllVocabKeys(), requiredFlag);
}

export function getAllGrammarCards() {
  const allKeys = getAllVocabKeys();
  const morphCards = window.buildMorphologyCardsForKeys ? window.buildMorphologyCardsForKeys(allKeys) : [];
  const grammarCards = window.buildGrammarCardsForKeys ? window.buildGrammarCardsForKeys(allKeys) : [];
  return [...morphCards, ...grammarCards];
}

export function getChapterVocabCards(chapterKey, requiredFlag = false) {
  return getSelectedVocabCards([String(chapterKey)], requiredFlag);
}

export function getChapterGrammarCards(chapterKey) {
  return getSelectedGrammarCards([String(chapterKey)]);
}

export function getCardReviewLeft(card) {
  if (isMorphCard(card)) return card.form || '\u2014';
  return formatHeadword(card.g);
}

export function getCardReviewRight(card) {
  if (isMorphCard(card)) return card.answer || '\u2014';
  return card.e || '\u2014';
}

export function getCardMetaLine(card) {
  if (isMorphCard(card)) {
    const bits = [card.lemma, card.gloss ? `"${card.gloss}"` : '', card.family].filter(Boolean);
    return bits.join(' \u00B7 ');
  }
  return detectPos(card);
}

export function getCardAuxLine(card) {
  if (isMorphCard(card)) {
    return `${card.sourceLabel}${card.family ? ` \u00B7 ${card.family}` : ''}`;
  }
  return transliterate(formatHeadword(card.g));
}
