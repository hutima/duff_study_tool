// Supplemental registry.
//
// Individual supplemental files register one focused set at a time. This keeps
// week-level vocabulary extras and paradigm drills independent from the core
// chapter data, while still letting the existing deck builders consume them.
(function () {
  function ensureObject(name) {
    if (!window[name] || typeof window[name] !== 'object') window[name] = {};
    return window[name];
  }

  function normalizeKey(key) {
    return String(key || '').trim();
  }

  function cloneSet(set) {
    return {
      ...set,
      cards: Array.isArray(set.cards) ? [...set.cards] : set.cards,
      items: Array.isArray(set.items) ? [...set.items] : set.items
    };
  }

  function ensureSupplementalSetEntry(key, set) {
    if (!window.SETS || typeof window.SETS !== 'object') return;
    if (!window.SETS[key]) {
      window.SETS[key] = {
        label: set.label || key,
        type: 'supplemental',
        supplemental: true,
        week: set.week ?? null,
        cards: []
      };
    } else {
      window.SETS[key].label = set.label || window.SETS[key].label || key;
      window.SETS[key].type = window.SETS[key].type || 'supplemental';
      window.SETS[key].supplemental = true;
      if (set.week != null) window.SETS[key].week = set.week;
      if (!Array.isArray(window.SETS[key].cards)) window.SETS[key].cards = [];
    }
  }

  function registerSupplementalVocabSet(key, set) {
    const safeKey = normalizeKey(key);
    if (!safeKey || !set || typeof set !== 'object') return;
    const registry = ensureObject('SUPPLEMENTAL_VOCAB_SETS');
    const normalized = {
      type: 'supplemental',
      supplemental: true,
      ...cloneSet(set),
      cards: Array.isArray(set.cards) ? set.cards : []
    };
    registry[safeKey] = normalized;
    if (window.SETS && typeof window.SETS === 'object') {
      window.SETS[safeKey] = normalized;
    }
  }

  function registerSupplementalGrammarSet(key, set) {
    const safeKey = normalizeKey(key);
    if (!safeKey || !set || typeof set !== 'object') return;
    const registry = ensureObject('SUPPLEMENTAL_GRAMMAR_SETS');
    registry[safeKey] = {
      supplemental: true,
      ...cloneSet(set),
      items: Array.isArray(set.items) ? set.items : []
    };
    ensureSupplementalSetEntry(safeKey, set);
  }

  function registerSupplementalMorphologySet(key, set) {
    const safeKey = normalizeKey(key);
    if (!safeKey || !set || typeof set !== 'object') return;
    const registry = ensureObject('SUPPLEMENTAL_MORPHOLOGY_SETS');
    registry[safeKey] = {
      supplemental: true,
      ...cloneSet(set),
      items: Array.isArray(set.items) ? set.items : []
    };
    ensureSupplementalSetEntry(safeKey, set);
  }

  window.SUPPLEMENTAL_VOCAB_SETS = ensureObject('SUPPLEMENTAL_VOCAB_SETS');
  window.SUPPLEMENTAL_GRAMMAR_SETS = ensureObject('SUPPLEMENTAL_GRAMMAR_SETS');
  window.SUPPLEMENTAL_MORPHOLOGY_SETS = ensureObject('SUPPLEMENTAL_MORPHOLOGY_SETS');
  window.registerSupplementalVocabSet = registerSupplementalVocabSet;
  window.registerSupplementalGrammarSet = registerSupplementalGrammarSet;
  window.registerSupplementalMorphologySet = registerSupplementalMorphologySet;
})();
