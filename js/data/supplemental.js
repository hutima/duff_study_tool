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
    // λύω — present active indicative (6 cards)
    { g: 'λύω, -ω',         e: 'I untie / pres. act. ind. / 1st sing.',       required: false },
    { g: 'λύεις, -εις',     e: 'you untie / pres. act. ind. / 2nd sing.',      required: false },
    { g: 'λύει, -ει',       e: 'he/she/it unties / pres. act. ind. / 3rd sing.', required: false },
    { g: 'λύομεν, -ομεν',   e: 'we untie / pres. act. ind. / 1st pl.',         required: false },
    { g: 'λύετε, -ετε',     e: 'you untie / pres. act. ind. / 2nd pl.',        required: false },
    { g: 'λύουσι(ν), -ουσι(ν)', e: 'they untie / pres. act. ind. / 3rd pl.',  required: false },

    // Definite article — masculine (8 cards)
    { g: 'ὁ, -ο',     e: 'the / def. art. / masc./nom./sing.', required: false },
    { g: 'τοῦ, -οῦ',  e: 'the / def. art. / masc./gen./sing.', required: false },
    { g: 'τῷ, -ῷ',    e: 'the / def. art. / masc./dat./sing.', required: false },
    { g: 'τόν, -όν',  e: 'the / def. art. / masc./acc./sing.', required: false },
    { g: 'οἱ, -οι',   e: 'the / def. art. / masc./nom./pl.',   required: false },
    { g: 'τῶν, -ῶν',  e: 'the / def. art. / masc./gen./pl.',   required: false },
    { g: 'τοῖς, -οῖς', e: 'the / def. art. / masc./dat./pl.', required: false },
    { g: 'τούς, -ούς', e: 'the / def. art. / masc./acc./pl.', required: false },

    // Definite article — feminine (8 cards)
    { g: 'ἡ, -η',     e: 'the / def. art. / fem./nom./sing.',  required: false },
    { g: 'τῆς, -ῆς',  e: 'the / def. art. / fem./gen./sing.',  required: false },
    { g: 'τῇ, -ῇ',    e: 'the / def. art. / fem./dat./sing.',  required: false },
    { g: 'τήν, -ήν',  e: 'the / def. art. / fem./acc./sing.',  required: false },
    { g: 'αἱ, -αι',   e: 'the / def. art. / fem./nom./pl.',    required: false },
    { g: 'τῶν, -ῶν',  e: 'the / def. art. / fem./gen./pl.',    required: false },
    { g: 'ταῖς, -αῖς', e: 'the / def. art. / fem./dat./pl.', required: false },
    { g: 'τάς, -άς',  e: 'the / def. art. / fem./acc./pl.',    required: false },

    // Definite article — neuter (8 cards)
    { g: 'τό, -ό',    e: 'the / def. art. / neut./nom./sing.', required: false },
    { g: 'τοῦ, -οῦ',  e: 'the / def. art. / neut./gen./sing.', required: false },
    { g: 'τῷ, -ῷ',    e: 'the / def. art. / neut./dat./sing.', required: false },
    { g: 'τό, -ό',    e: 'the / def. art. / neut./acc./sing.', required: false },
    { g: 'τά, -ά',    e: 'the / def. art. / neut./nom./pl.',   required: false },
    { g: 'τῶν, -ῶν',  e: 'the / def. art. / neut./gen./pl.',   required: false },
    { g: 'τοῖς, -οῖς', e: 'the / def. art. / neut./dat./pl.', required: false },
    { g: 'τά, -ά',    e: 'the / def. art. / neut./acc./pl.',   required: false },

    // ἀρχή — 1st declension feminine (8 cards)
    { g: 'ἀρχή, -ή',    e: 'beginning / fem./nom./sing.', required: false },
    { g: 'ἀρχῆς, -ῆς',  e: 'beginning / fem./gen./sing.', required: false },
    { g: 'ἀρχῇ, -ῇ',    e: 'beginning / fem./dat./sing.', required: false },
    { g: 'ἀρχήν, -ήν',  e: 'beginning / fem./acc./sing.', required: false },
    { g: 'ἀρχαί, -αί',  e: 'beginnings / fem./nom./pl.',  required: false },
    { g: 'ἀρχῶν, -ῶν',  e: 'beginnings / fem./gen./pl.',  required: false },
    { g: 'ἀρχαῖς, -αῖς', e: 'beginnings / fem./dat./pl.', required: false },
    { g: 'ἀρχάς, -άς',  e: 'beginnings / fem./acc./pl.',  required: false },

    // ἔργον — 2nd declension neuter (8 cards)
    { g: 'ἔργον, -ον',  e: 'work / neut./nom./sing.', required: false },
    { g: 'ἔργου, -ου',  e: 'work / neut./gen./sing.', required: false },
    { g: 'ἔργῳ, -ῳ',    e: 'work / neut./dat./sing.', required: false },
    { g: 'ἔργον, -ον',  e: 'work / neut./acc./sing.', required: false },
    { g: 'ἔργα, -α',    e: 'works / neut./nom./pl.',  required: false },
    { g: 'ἔργων, -ων',  e: 'works / neut./gen./pl.',  required: false },
    { g: 'ἔργοις, -οις', e: 'works / neut./dat./pl.', required: false },
    { g: 'ἔργα, -α',    e: 'works / neut./acc./pl.',  required: false },

    // αὐτός — masculine (8 cards)
    { g: 'αὐτός, -ός',   e: 'he/himself / masc./nom./sing.', required: false },
    { g: 'αὐτοῦ, -οῦ',   e: 'of him/himself / masc./gen./sing.', required: false },
    { g: 'αὐτῷ, -ῷ',     e: 'to/for him/himself / masc./dat./sing.', required: false },
    { g: 'αὐτόν, -όν',   e: 'him/himself / masc./acc./sing.', required: false },
    { g: 'αὐτοί, -οί',   e: 'they/themselves / masc./nom./pl.', required: false },
    { g: 'αὐτῶν, -ῶν',   e: 'of them/themselves / masc./gen./pl.', required: false },
    { g: 'αὐτοῖς, -οῖς', e: 'to/for them/themselves / masc./dat./pl.', required: false },
    { g: 'αὐτούς, -ούς', e: 'them/themselves / masc./acc./pl.', required: false },

    // αὐτός — feminine (8 cards)
    { g: 'αὐτή, -ή',     e: 'she/herself / fem./nom./sing.', required: false },
    { g: 'αὐτῆς, -ῆς',   e: 'of her/herself / fem./gen./sing.', required: false },
    { g: 'αὐτῇ, -ῇ',     e: 'to/for her/herself / fem./dat./sing.', required: false },
    { g: 'αὐτήν, -ήν',   e: 'her/herself / fem./acc./sing.', required: false },
    { g: 'αὐταί, -αί',   e: 'they/themselves / fem./nom./pl.', required: false },
    { g: 'αὐτῶν, -ῶν',   e: 'of them/themselves / fem./gen./pl.', required: false },
    { g: 'αὐταῖς, -αῖς', e: 'to/for them/themselves / fem./dat./pl.', required: false },
    { g: 'αὐτάς, -άς',   e: 'them/themselves / fem./acc./pl.', required: false },

    // αὐτός — neuter (8 cards)
    { g: 'αὐτό, -ό',     e: 'it/itself / neut./nom./sing.', required: false },
    { g: 'αὐτοῦ, -οῦ',   e: 'of it/itself / neut./gen./sing.', required: false },
    { g: 'αὐτῷ, -ῷ',     e: 'to/for it/itself / neut./dat./sing.', required: false },
    { g: 'αὐτό, -ό',     e: 'it/itself / neut./acc./sing.', required: false },
    { g: 'αὐτά, -ά',     e: 'they/themselves / neut./nom./pl.', required: false },
    { g: 'αὐτῶν, -ῶν',   e: 'of them/themselves / neut./gen./pl.', required: false },
    { g: 'αὐτοῖς, -οῖς', e: 'to/for them/themselves / neut./dat./pl.', required: false },
    { g: 'αὐτά, -ά',     e: 'them/themselves / neut./acc./pl.', required: false },
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
