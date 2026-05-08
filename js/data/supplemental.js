// ═══════════════════════════════════════════════════════════════════════
//  WEEK 1 SUPPLEMENT PARADIGM PATCH
// ═══════════════════════════════════════════════════════════════════════
//  Swap this file when you want a different custom practice set.
//
//  UI behavior:
//  - The cards are merged into the Week 1 Supplement deck (W1O).
//  - It includes quick-flip vocabulary-style paradigm cards plus grammar drills.
//  - The card shape mirrors grammar.js so the main grammar logic can stay
//    unchanged.

(function () {
  const SET_KEY = 'W1O';

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


  const SUPPLEMENTAL_VOCAB_CARDS = [];

  const SUPPLEMENTAL_GRAMMAR_SETS = {
    [SET_KEY]: {
      label: 'Week 1 - Supplement',
      notes: 'Custom grammar + paradigm drill set: λύω, article patterns, and declensions with full singular/plural case coverage.',
      items: [
        {
          family: 'Present active indicative endings',
          lemma: 'λύω',
          gloss: 'I untie',
          questions: [
            {
              form: '-ω',
              prompt: 'This present active ending means:',
              answer: 'I / 1st singular',
              choices: PERSON_CHOICES,
              note: 'As in λύω: I untie.'
            },
            {
              form: '-εις',
              prompt: 'This present active ending means:',
              answer: 'you singular / 2nd singular',
              choices: PERSON_CHOICES,
              note: 'As in λύεις: you singular untie.'
            },
            {
              form: '-ει',
              prompt: 'This present active ending means:',
              answer: 'he, she, or it / 3rd singular',
              choices: PERSON_CHOICES,
              note: 'As in λύει: he, she, or it unties.'
            },
            {
              form: '-ομεν',
              prompt: 'This present active ending means:',
              answer: 'we / 1st plural',
              choices: PERSON_CHOICES,
              note: 'As in λύομεν: we untie.'
            },
            {
              form: '-ετε',
              prompt: 'This present active ending means:',
              answer: 'you plural / 2nd plural',
              choices: PERSON_CHOICES,
              note: 'As in λύετε: you plural untie.'
            },
            {
              form: '-ουσιν',
              prompt: 'This present active ending means:',
              answer: 'they / 3rd plural',
              choices: PERSON_CHOICES,
              note: 'As in λύουσιν: they untie. The final ν is movable nu.'
            }
          ]
        },
        {
          family: 'λύω present active indicative examples',
          lemma: 'λύω',
          gloss: 'I untie',
          questions: [
            {
              form: 'λύω',
              prompt: 'Parse this λύω form.',
              answer: 'present active indicative, 1st singular',
              choices: ACTIVE_INDICATIVE_CHOICES,
              note: 'λύω = I untie.'
            },
            {
              form: 'λύεις',
              prompt: 'Parse this λύω form.',
              answer: 'present active indicative, 2nd singular',
              choices: ACTIVE_INDICATIVE_CHOICES,
              note: 'λύεις = you singular untie.'
            },
            {
              form: 'λύει',
              prompt: 'Parse this λύω form.',
              answer: 'present active indicative, 3rd singular',
              choices: ACTIVE_INDICATIVE_CHOICES,
              note: 'λύει = he, she, or it unties.'
            },
            {
              form: 'λύομεν',
              prompt: 'Parse this λύω form.',
              answer: 'present active indicative, 1st plural',
              choices: ACTIVE_INDICATIVE_CHOICES,
              note: 'λύομεν = we untie.'
            },
            {
              form: 'λύετε',
              prompt: 'Parse this λύω form.',
              answer: 'present active indicative, 2nd plural',
              choices: ACTIVE_INDICATIVE_CHOICES,
              note: 'λύετε = you plural untie.'
            },
            {
              form: 'λύουσιν',
              prompt: 'Parse this λύω form.',
              answer: 'present active indicative, 3rd plural',
              choices: ACTIVE_INDICATIVE_CHOICES,
              note: 'λύουσιν = they untie.'
            }
          ]
        },
        {
          family: 'Second-declension masculine endings',
          lemma: '-ος / -ον / -οι / -ους',
          gloss: 'nominative and accusative masculine endings',
          questions: [
            {
              form: '-ος',
              prompt: 'This noun ending usually marks:',
              answer: 'nominative singular masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'Example: ἀδελφός / κύριος.'
            },
            {
              form: '-ον',
              prompt: 'This noun ending usually marks:',
              answer: 'accusative singular masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'Example: ἀδελφόν / κύριον.'
            },
            {
              form: '-οι',
              prompt: 'This noun ending usually marks:',
              answer: 'nominative plural masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'Example: ἀδελφοί / κύριοι.'
            },
            {
              form: '-ους',
              prompt: 'This noun ending usually marks:',
              answer: 'accusative plural masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'Example: ἀδελφούς / κυρίους.'
            }
          ]
        },
        {
          family: 'ἀδελφός — nominative and accusative',
          lemma: 'ἀδελφός',
          gloss: 'brother',
          questions: [
            {
              form: 'ἀδελφός',
              prompt: 'Identify the case and number.',
              answer: 'nominative singular masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'ἀδελφός = brother as the subject.'
            },
            {
              form: 'ἀδελφόν',
              prompt: 'Identify the case and number.',
              answer: 'accusative singular masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'ἀδελφόν = brother as the direct object.'
            },
            {
              form: 'ἀδελφοί',
              prompt: 'Identify the case and number.',
              answer: 'nominative plural masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'ἀδελφοί = brothers as the subject.'
            },
            {
              form: 'ἀδελφούς',
              prompt: 'Identify the case and number.',
              answer: 'accusative plural masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'ἀδελφούς = brothers as the direct object.'
            }
          ]
        },
        {
          family: 'κύριος — nominative and accusative',
          lemma: 'κύριος',
          gloss: 'lord',
          questions: [
            {
              form: 'κύριος',
              prompt: 'Identify the case and number.',
              answer: 'nominative singular masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'κύριος = lord as the subject.'
            },
            {
              form: 'κύριον',
              prompt: 'Identify the case and number.',
              answer: 'accusative singular masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'κύριον = lord as the direct object.'
            },
            {
              form: 'κύριοι',
              prompt: 'Identify the case and number.',
              answer: 'nominative plural masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'κύριοι = lords as the subject.'
            },
            {
              form: 'κυρίους',
              prompt: 'Identify the case and number.',
              answer: 'accusative plural masculine',
              choices: CASE_NUMBER_CHOICES,
              note: 'κυρίους = lords as the direct object.'
            }
          ]
        }
      ]
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

  if (window.SETS && typeof window.SETS === 'object') {
    const base = window.SETS[SET_KEY] || { label: 'Week 1 - Supplement', type: 'other', week: 1, cards: [] };
    const existingCards = Array.isArray(base.cards) ? base.cards : [];
    window.SETS[SET_KEY] = {
      ...base,
      label: 'Week 1 - Supplement',
      type: 'other',
      week: 1,
      cards: [...existingCards, ...SUPPLEMENTAL_VOCAB_CARDS]
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
