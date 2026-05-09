// ═══════════════════════════════════════════════════════════════════════
//  SUPPLEMENTAL REGISTRY — registration API for all supplemental sets
// ═══════════════════════════════════════════════════════════════════════
//  Exposes registerSupplementalVocabSet, registerSupplementalGrammarSet,
//  and registerSupplementalMorphologySet for use by supplemental sub-files.

(function () {
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

  function ensureObject(name) {
    if (!window[name] || typeof window[name] !== 'object') {
      window[name] = {};
    }
    return window[name];
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
    ensureSupplementalSetEntry(safeKey, set);
    if (window.SETS && Array.isArray(window.SETS[safeKey]?.cards) && Array.isArray(set.cards)) {
      window.SETS[safeKey].cards.push(...set.cards);
    }
    const registry = ensureObject('SUPPLEMENTAL_VOCAB_SETS');
    registry[safeKey] = { supplemental: true, ...cloneSet(set) };
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
    if (typeof window.registerSupplementalGrammarSets === 'function') {
      window.registerSupplementalGrammarSets({ [safeKey]: registry[safeKey] });
    }
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
    const morphSets = window.MORPHOLOGY_SETS;
    if (morphSets && typeof morphSets === 'object') {
      if (!morphSets[safeKey]) {
        morphSets[safeKey] = registry[safeKey];
      } else {
        morphSets[safeKey].label = set.label || morphSets[safeKey].label;
        morphSets[safeKey].notes = set.notes || morphSets[safeKey].notes;
        morphSets[safeKey].supplemental = true;
        morphSets[safeKey].items = [...(morphSets[safeKey].items || []), ...(set.items || [])];
      }
    }
  }

  window.SUPPLEMENTAL_VOCAB_SETS = ensureObject('SUPPLEMENTAL_VOCAB_SETS');
  window.SUPPLEMENTAL_GRAMMAR_SETS = ensureObject('SUPPLEMENTAL_GRAMMAR_SETS');
  window.SUPPLEMENTAL_MORPHOLOGY_SETS = ensureObject('SUPPLEMENTAL_MORPHOLOGY_SETS');
  window.registerSupplementalVocabSet = registerSupplementalVocabSet;
  window.registerSupplementalGrammarSet = registerSupplementalGrammarSet;
  window.registerSupplementalMorphologySet = registerSupplementalMorphologySet;
})();
