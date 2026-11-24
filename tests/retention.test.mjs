import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import * as Retention from '../js/domain/deck/retention.js';
import { getBatch, rateBatch, sanitizeSessions } from '../js/domain/deck/retention.js';

const cards = Array.from({ length: 700 }, (_, i) => ({ id: `card-${i}`, due: i < 80 }));

function loadRetentionFlow(spacedRepetition) {
  const source = readFileSync(new URL('../js/app/main.js', import.meta.url), 'utf8');
  const start = source.indexOf('function isRetentionActive()');
  const end = source.indexOf('function buildStudyDeck(', start);
  const elements = new Map();
  const scheduled = new Set();
  const calls = [];
  const runtime = {
    retentionMode: true, retentionSessions: {}, studyMode: 'vocab',
    originalDeck: cards, marks: {}, spacedRepetition,
    selectedKeys: ['1'], directionToGreek: false, deck: []
  };
  const context = vm.createContext({
    runtime, Retention,
    getDeckStateKey: () => `${runtime.directionToGreek}:${runtime.selectedKeys.join(',')}:${runtime.spacedRepetition}`,
    isCardDue: card => card.due && !scheduled.has(card.id),
    noteStudyInteraction() {}, clearSpacedUndoSnapshot() {},
    applySpacedReview(card, outcome) { calls.push(outcome); if (outcome !== 'again') scheduled.add(card.id); },
    recordStudyOutcome(id, outcome) { calls.push(outcome); },
    applyUnspacedSharedSchedule() {}, saveState() {}, renderCard() {},
    renderProgress() {}, renderReview() {}, isAnalyticsModalOpen: () => false,
    document: { getElementById(id) {
      if (!elements.has(id)) elements.set(id, { textContent: '', innerHTML: '', style: {} });
      return elements.get(id);
    } }
  });
  vm.runInContext(source.slice(start, end), context);
  runtime.deck = context.buildRetentionDeck();
  return { context, runtime, elements, calls };
}

for (const spaced of [true, false]) test(`app flow completes and resumes batches (${spaced ? 'spaced' : 'unspaced'})`, () => {
  const { context: flow, runtime, elements, calls } = loadRetentionFlow(spaced);
  const original = Array.from(runtime.deck, c => c.id);
  flow.nextRetentionBatch();
  assert.deepEqual(Array.from(runtime.deck, c => c.id), original, 'cannot advance unfinished batch');
  flow.retentionMark('pass');
  assert.equal(runtime.deck.length, 20, 'Uncertain repeats immediately even when scheduled ahead');
  flow.retentionMark('again');
  flow.retentionNavigate(1);
  assert.equal(calls.length, 2, 'skip never grades');
  flow.retentionMark('easy');
  assert.equal(runtime.deck.length, 19);
  flow.renderRetentionProgress();
  assert.match(elements.get('progressText').textContent, /1 \/ 20 completed/);
  runtime.retentionSessions = sanitizeSessions(JSON.parse(JSON.stringify(runtime.retentionSessions)));
  const remaining = Array.from(runtime.deck, c => c.id);
  runtime.deck = flow.buildRetentionDeck();
  assert.deepEqual(Array.from(runtime.deck, c => c.id), remaining);
  while (runtime.deck.length) flow.retentionMark('easy');
  const area = { innerHTML: '' };
  assert.equal(flow.renderRetentionComplete(area), true);
  assert.match(area.innerHTML, /Batch complete/);
  assert.equal(flow.buildRetentionDeck().length, 0, 'waits at completion');
  flow.nextRetentionBatch();
  assert.equal(runtime.deck.length, 20);
  assert.ok(runtime.deck.every(card => !original.includes(card.id)));
  const next = Array.from(runtime.deck, c => c.id);
  runtime.directionToGreek = true;
  runtime.deck = flow.buildRetentionDeck();
  runtime.directionToGreek = false;
  runtime.deck = flow.buildRetentionDeck();
  assert.deepEqual(Array.from(runtime.deck, c => c.id), next);
  runtime.studyMode = 'morph';
  assert.equal(flow.retentionMark('easy'), false, 'other study modes retain their own behavior');
});

test('samples 20 distinct cards exclusively from the eligible selection', () => {
  const batch = getBatch({}, 'deck', cards, card => card.due);
  assert.equal(batch.ids.length, 20);
  assert.equal(new Set(batch.ids).size, 20);
  assert.ok(batch.ids.every(id => cards.find(card => card.id === id).due));
  assert.deepEqual(batch.pending, batch.ids);
});

test('small, empty, and duplicate pools never invent cards', () => {
  assert.equal(getBatch({}, 'small', cards.slice(0, 7), () => true).ids.length, 7);
  assert.deepEqual(getBatch({}, 'empty', cards, () => false).ids, []);
  const duplicate = [cards[0], cards[0], cards[1]];
  assert.equal(getBatch({}, 'dup', duplicate, () => true).ids.length, 2);
});

test('Hard, Uncertain, and skip stay in the same batch until Easy', () => {
  const sessions = {};
  const batch = getBatch(sessions, 'deck', cards, card => card.due);
  const original = [...batch.ids];
  for (const outcome of ['again', 'pass', 'skip']) {
    const id = batch.pending[0];
    rateBatch(batch, outcome);
    assert.equal(batch.pending.at(-1), id);
    assert.equal(batch.pending.length, 20);
    assert.deepEqual(batch.ids, original);
  }
  rateBatch(batch, 'easy');
  assert.equal(batch.pending.length, 19);
  // Resuming ignores due-date changes for the already selected batch.
  assert.equal(getBatch(sessions, 'deck', cards, () => false), batch);
  while (batch.pending.length) rateBatch(batch, 'easy');
  assert.equal(getBatch(sessions, 'deck', cards, () => true).pending.length, 0);
  assert.deepEqual(batch.ids, original, 'completed batches wait for explicit next');
});

test('serialized progress resumes exactly and selections have independent batches', () => {
  const sessions = {};
  const first = getBatch(sessions, 'g2e:chapter1', cards, () => true);
  rateBatch(first, 'easy');
  const restored = sanitizeSessions(JSON.parse(JSON.stringify(sessions)));
  assert.deepEqual(getBatch(restored, 'g2e:chapter1', cards, () => false).pending, first.pending);
  getBatch(restored, 'e2g:chapter2', cards.slice(30, 60), () => true);
  assert.deepEqual(restored['g2e:chapter1'].pending, first.pending);
  delete restored['g2e:chapter1'];
  const next = getBatch(restored, 'g2e:chapter1', cards.slice(100, 150), () => true);
  assert.ok(next.ids.every(id => Number(id.slice(5)) >= 100));
});

test('restoring filters corrupt queues, limits size, and drops removed cards', () => {
  const sanitized = sanitizeSessions({ bad: null, deck: { ids: ['a', 'a', 'b', 1], pending: ['b', 'x', 'b'], savedAt: 0 } });
  assert.deepEqual(sanitized.deck.ids, ['a', 'b']);
  assert.deepEqual(sanitized.deck.pending, ['b']);
  const batch = getBatch(sanitized, 'deck', [{ id: 'a' }], () => true);
  assert.deepEqual(batch.ids, ['a']);
  assert.deepEqual(batch.pending, []);
  assert.deepEqual(sanitizeSessions([]), {});
  const many = Object.fromEntries(Array.from({ length: 40 }, (_, i) => [String(i), { ids: ['a'], pending: ['a'], savedAt: i }]));
  assert.equal(Object.keys(sanitizeSessions(many)).length, 16);
});
