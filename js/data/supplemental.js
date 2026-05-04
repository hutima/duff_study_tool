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


  const SUPPLEMENTAL_VOCAB_CARDS = [
    { g: 'λύω, λύεις, λύει, λύομεν, λύετε, λύουσι(ν)', e: 'λύω present active indicative: 1sg, 2sg, 3sg, 1pl, 2pl, 3pl', required: false },
    { g: 'ὁ, τοῦ, τῷ, τόν, οἱ, τῶν, τοῖς, τούς', e: 'definite article masculine: nom/gen/dat/acc singular and plural', required: false },
    { g: 'ἡ, τῆς, τῇ, τήν, αἱ, τῶν, ταῖς, τάς', e: 'definite article feminine: nom/gen/dat/acc singular and plural', required: false },
    { g: 'τό, τοῦ, τῷ, τό, τά, τῶν, τοῖς, τά', e: 'definite article neuter: nom/gen/dat/acc singular and plural', required: false },
    { g: 'ἡ ἀρχή, τῆς ἀρχῆς, τῇ ἀρχῇ, τὴν ἀρχήν · αἱ ἀρχαί, τῶν ἀρχῶν, ταῖς ἀρχαῖς, τὰς ἀρχάς', e: 'ἀρχή (feminine) with article: nom/gen/dat/acc singular and plural', required: false },
    { g: 'τὸ ἔργον, τοῦ ἔργου, τῷ ἔργῳ, τὸ ἔργον · τὰ ἔργα, τῶν ἔργων, τοῖς ἔργοις, τὰ ἔργα', e: 'ἔργον (neuter) with article: nom/gen/dat/acc singular and plural', required: false },
    { g: 'αὐτός, αὐτοῦ, αὐτῷ, αὐτόν · αὐτοί, αὐτῶν, αὐτοῖς, αὐτούς', e: 'αὐτός masculine: nom/gen/dat/acc singular and plural', required: false },
    { g: 'αὐτή, αὐτῆς, αὐτῇ, αὐτήν · αὐταί, αὐτῶν, αὐταῖς, αὐτάς', e: 'αὐτός feminine: nom/gen/dat/acc singular and plural', required: false },
    { g: 'αὐτό, αὐτοῦ, αὐτῷ, αὐτό · αὐτά, αὐτῶν, αὐτοῖς, αὐτά', e: 'αὐτός neuter: nom/gen/dat/acc singular and plural', required: false }
  ];

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
  };

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
  }

  window.SUPPLEMENTAL_GRAMMAR_SETS = SUPPLEMENTAL_GRAMMAR_SETS;
})();
