// ═══════════════════════════════════════════════════════════════════════
//  CUSTOM GRAMMAR PRACTICE SET — SUPPLEMENT
// ═══════════════════════════════════════════════════════════════════════
//  Swap this file when you want a different custom practice set.
//
//  UI behavior:
//  - The set appears as “Supplement” in the custom deck selector.
//  - It is grammar-only: 0 vocabulary cards, grammar cards only.
//  - The card shape mirrors grammar.js so the main grammar logic can stay
//    unchanged.

(function () {
  const SET_KEY = 'SUPPLEMENT';

  const PERSON_CHOICES = [
    'I / 1st singular',
    'you singular / 2nd singular',
    'he, she, or it / 3rd singular',
    'we / 1st plural',
    'you plural / 2nd plural',
    'they / 3rd plural'
  ];

  const ACTIVE_INDICATIVE_CHOICES = [
    'present active indicative, 1st singular',
    'present active indicative, 2nd singular',
    'present active indicative, 3rd singular',
    'present active indicative, 1st plural',
    'present active indicative, 2nd plural',
    'present active indicative, 3rd plural'
  ];

  const CASE_NUMBER_CHOICES = [
    'nominative singular masculine',
    'accusative singular masculine',
    'nominative plural masculine',
    'accusative plural masculine'
  ];

  const SUPPLEMENTAL_GRAMMAR_SETS = {
    [SET_KEY]: {
      label: 'Supplement',
      notes: 'Custom grammar practice: simple present active endings, λύω examples, and nominative/accusative masculine noun endings.',
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
  };

  if (window.SETS && typeof window.SETS === 'object') {
    window.SETS[SET_KEY] = {
      label: 'Supplement',
      type: 'other',
      week: null,
      cards: []
    };
  }


  function ensureSupplementalSet(key, meta) {
    if (!key) return null;
    if (window.SETS && typeof window.SETS === 'object') {
      if (!window.SETS[key]) {
        window.SETS[key] = {
          label: (meta && meta.label) || key,
          type: 'other',
          week: meta && Object.prototype.hasOwnProperty.call(meta, 'week') ? meta.week : null,
          cards: []
        };
      } else {
        if (meta && meta.label) window.SETS[key].label = meta.label;
        if (meta && Object.prototype.hasOwnProperty.call(meta, 'week')) window.SETS[key].week = meta.week;
        if (!Array.isArray(window.SETS[key].cards)) window.SETS[key].cards = [];
      }
      return window.SETS[key];
    }
    return null;
  }

  window.registerSupplementalVocabSet = function registerSupplementalVocabSet(key, set) {
    const target = ensureSupplementalSet(key, set || {});
    if (target && set) {
      target.label = set.label || target.label;
      target.type = 'other';
      target.week = Object.prototype.hasOwnProperty.call(set, 'week') ? set.week : target.week;
      target.cards = [...(target.cards || []), ...((set.cards || []).map(card => ({ ...card })))];
    }
  };

  window.registerSupplementalGrammarSet = function registerSupplementalGrammarSet(key, set) {
    ensureSupplementalSet(key, set || {});
    window.SUPPLEMENTAL_GRAMMAR_SETS = window.SUPPLEMENTAL_GRAMMAR_SETS || {};
    window.SUPPLEMENTAL_GRAMMAR_SETS[key] = set;
    if (window.GRAMMAR_SETS && typeof window.GRAMMAR_SETS === 'object') {
      window.GRAMMAR_SETS[key] = set;
    }
  };

  window.registerSupplementalMorphologySet = function registerSupplementalMorphologySet(key, set) {
    ensureSupplementalSet(key, set || {});
    if (window.MORPHOLOGY_SETS && typeof window.MORPHOLOGY_SETS === 'object') {
      window.MORPHOLOGY_SETS[key] = set;
    }
  };

  window.SUPPLEMENTAL_GRAMMAR_SETS = SUPPLEMENTAL_GRAMMAR_SETS;
})();
