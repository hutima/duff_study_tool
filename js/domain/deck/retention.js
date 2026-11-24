// A synthetic review deck. Eligibility is supplied by the existing scheduler;
// once sampled, a batch stays fixed until every member is confirmed Easy.
export const BATCH_SIZE = 20;

export function sanitizeSessions(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const entries = Object.entries(value).filter(([, batch]) => batch && Array.isArray(batch.ids) && Array.isArray(batch.pending));
  entries.sort((a, b) => (Number(b[1].savedAt) || 0) - (Number(a[1].savedAt) || 0));
  return Object.fromEntries(entries.slice(0, 16).map(([key, batch]) => {
    const ids = [...new Set(batch.ids.filter(id => typeof id === 'string'))].slice(0, BATCH_SIZE);
    const allowed = new Set(ids);
    const pending = [...new Set(batch.pending.filter(id => allowed.has(id)))];
    return [key, { ids, pending, savedAt: Number(batch.savedAt) || 0 }];
  }));
}

export function getBatch(sessions, key, cards, eligible, random = Math.random) {
  const allowed = new Set(cards.map(card => card.id));
  let batch = sessions[key];
  if (batch) {
    batch.ids = batch.ids.filter(id => allowed.has(id));
    batch.pending = batch.pending.filter(id => allowed.has(id));
  }
  if (!batch || !batch.ids.length) {
    const pool = [...new Set(cards.filter(eligible).map(card => card.id))];
    // Partial Fisher–Yates: uniformly sample without replacement.
    const size = Math.min(BATCH_SIZE, pool.length);
    for (let i = 0; i < size; i++) {
      const j = i + Math.floor(random() * (pool.length - i));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const ids = pool.slice(0, size);
    batch = sessions[key] = { ids, pending: [...ids], savedAt: Date.now() };
  }
  batch.savedAt = Date.now();
  return batch;
}

export function rateBatch(batch, outcome) {
  const id = batch.pending.shift();
  if (id !== undefined && outcome !== 'easy') batch.pending.push(id);
}
