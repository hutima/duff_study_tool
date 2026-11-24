// A synthetic review deck. Eligibility is supplied by the existing scheduler;
// Sample base-word groups; their virtual faces ride along without using a slot.
export const BATCH_SIZE = 20;
const MAX_BATCH_FACES = 1000; // defensive persistence bound, not the word limit

export function sanitizeSessions(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const entries = Object.entries(value).filter(([, batch]) => batch && Array.isArray(batch.ids) && Array.isArray(batch.pending));
  entries.sort((a, b) => (Number(b[1].savedAt) || 0) - (Number(a[1].savedAt) || 0));
  return Object.fromEntries(entries.slice(0, 16).map(([key, batch]) => {
    const ids = [...new Set(batch.ids.filter(id => typeof id === 'string'))].slice(0, MAX_BATCH_FACES);
    const allowed = new Set(ids);
    const pending = [...new Set(batch.pending.filter(id => allowed.has(id)))];
    return [key, { ids, pending, groupsVersion: batch.groupsVersion === 2 ? 2 : 1, savedAt: Number(batch.savedAt) || 0 }];
  }));
}

export function getBatch(sessions, key, cards, eligible, random = Math.random, groupKey = card => card.id) {
  const allowed = new Set(cards.map(card => card.id));
  const groups = new Map();
  const byId = new Map();
  for (const card of cards) {
    const group = groupKey(card);
    if (!groups.has(group)) groups.set(group, new Set());
    groups.get(group).add(card.id);
    byId.set(card.id, card);
  }
  let batch = sessions[key];
  if (batch) {
    batch.ids = batch.ids.filter(id => allowed.has(id));
    batch.pending = batch.pending.filter(id => allowed.has(id));
  }
  // Repair old batches and include any newly enabled sibling faces in place,
  // even if the batch was previously complete. Keep existing grades and words.
  if (batch?.ids.length) {
    const selectedGroups = new Set(batch.ids.map(id => groupKey(byId.get(id))));
    const present = new Set(batch.ids);
    for (const group of selectedGroups) {
      for (const id of groups.get(group)) {
        if (present.has(id)) continue;
        batch.ids.push(id);
        if (eligible(byId.get(id))) batch.pending.push(id);
        present.add(id);
      }
    }
    batch.groupsVersion = 2;
  }
  if (!batch || !batch.ids.length) {
    const eligibleIds = new Set(cards.filter(eligible).map(card => card.id));
    const pool = [...groups.values()].filter(ids => [...ids].some(id => eligibleIds.has(id)));
    // Partial Fisher–Yates: uniformly sample up to 20 base words, without
    // replacement. Every enabled sibling in the selection joins its word.
    const size = Math.min(BATCH_SIZE, pool.length);
    for (let i = 0; i < size; i++) {
      const j = i + Math.floor(random() * (pool.length - i));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const ids = pool.slice(0, size).flatMap(group => [...group]);
    batch = sessions[key] = { ids, pending: ids.filter(id => eligibleIds.has(id)), groupsVersion: 2, savedAt: Date.now() };
  }
  batch.savedAt = Date.now();
  return batch;
}

export function rateBatch(batch, outcome) {
  const id = batch.pending.shift();
  if (id !== undefined && outcome !== 'easy') batch.pending.push(id);
}
