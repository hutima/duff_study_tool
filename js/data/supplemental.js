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

    // φιλέω — ε-contract verb, pres. act. ind. (6 cards)
    { g: 'φιλῶ, -ῶ',           e: 'I love / pres. act. ind. (ε-contract) / 1st sing.',       required: false },
    { g: 'φιλεῖς, -εῖς',       e: 'you love / pres. act. ind. (ε-contract) / 2nd sing.',      required: false },
    { g: 'φιλεῖ, -εῖ',         e: 'he/she/it loves / pres. act. ind. (ε-contract) / 3rd sing.', required: false },
    { g: 'φιλοῦμεν, -οῦμεν',   e: 'we love / pres. act. ind. (ε-contract) / 1st pl.',         required: false },
    { g: 'φιλεῖτε, -εῖτε',     e: 'you love / pres. act. ind. (ε-contract) / 2nd pl.',        required: false },
    { g: 'φιλοῦσι(ν), -οῦσι(ν)', e: 'they love / pres. act. ind. (ε-contract) / 3rd pl.',    required: false },

    // ἡμέρα — variant fem., -α type (nom./gen. sg. -α/-ας) (8 cards)
    { g: 'ἡμέρα, -α',     e: 'day / fem./nom./sing. (-α type)', required: false },
    { g: 'ἡμέρας, -ας',   e: 'day / fem./gen./sing. (-α type)', required: false },
    { g: 'ἡμέρᾳ, -ᾳ',    e: 'day / fem./dat./sing. (-α type)', required: false },
    { g: 'ἡμέραν, -αν',   e: 'day / fem./acc./sing. (-α type)', required: false },
    { g: 'ἡμέραι, -αι',   e: 'days / fem./nom./pl. (-α type)',  required: false },
    { g: 'ἡμερῶν, -ῶν',   e: 'days / fem./gen./pl. (-α type)',  required: false },
    { g: 'ἡμέραις, -αις', e: 'days / fem./dat./pl. (-α type)',  required: false },
    { g: 'ἡμέρας, -ας',   e: 'days / fem./acc./pl. (-α type)',  required: false },

    // δόξα — variant fem., mixed type (nom. -α, gen. -ης) (8 cards)
    { g: 'δόξα, -α',     e: 'glory / fem./nom./sing. (mixed type)', required: false },
    { g: 'δόξης, -ης',   e: 'glory / fem./gen./sing. (mixed type)', required: false },
    { g: 'δόξῃ, -ῃ',     e: 'glory / fem./dat./sing. (mixed type)', required: false },
    { g: 'δόξαν, -αν',   e: 'glory / fem./acc./sing. (mixed type)', required: false },
    { g: 'δόξαι, -αι',   e: 'glories / fem./nom./pl. (mixed type)', required: false },
    { g: 'δοξῶν, -ῶν',   e: 'glories / fem./gen./pl. (mixed type)', required: false },
    { g: 'δόξαις, -αις', e: 'glories / fem./dat./pl. (mixed type)', required: false },
    { g: 'δόξας, -ας',   e: 'glories / fem./acc./pl. (mixed type)', required: false },

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

    // πολύς — masculine (8 cards)
    { g: 'πολύς, -ύς',    e: 'much, many / masc./nom./sing.', required: false },
    { g: 'πολλοῦ, -οῦ',   e: 'much, many / masc./gen./sing.', required: false },
    { g: 'πολλῷ, -ῷ',     e: 'much, many / masc./dat./sing.', required: false },
    { g: 'πολύν, -ύν',    e: 'much, many / masc./acc./sing.', required: false },
    { g: 'πολλοί, -οί',   e: 'much, many / masc./nom./pl.',   required: false },
    { g: 'πολλῶν, -ῶν',   e: 'much, many / masc./gen./pl.',   required: false },
    { g: 'πολλοῖς, -οῖς', e: 'much, many / masc./dat./pl.',   required: false },
    { g: 'πολλούς, -ούς', e: 'much, many / masc./acc./pl.',   required: false },

    // πολύς — feminine (8 cards)
    { g: 'πολλή, -ή',     e: 'much, many / fem./nom./sing.',  required: false },
    { g: 'πολλῆς, -ῆς',   e: 'much, many / fem./gen./sing.',  required: false },
    { g: 'πολλῇ, -ῇ',     e: 'much, many / fem./dat./sing.',  required: false },
    { g: 'πολλήν, -ήν',   e: 'much, many / fem./acc./sing.',  required: false },
    { g: 'πολλαί, -αί',   e: 'much, many / fem./nom./pl.',    required: false },
    { g: 'πολλῶν, -ῶν',   e: 'much, many / fem./gen./pl.',    required: false },
    { g: 'πολλαῖς, -αῖς', e: 'much, many / fem./dat./pl.',    required: false },
    { g: 'πολλάς, -άς',   e: 'much, many / fem./acc./pl.',    required: false },

    // πολύς — neuter (8 cards)
    { g: 'πολύ, -ύ',      e: 'much / neut./nom./sing.',       required: false },
    { g: 'πολλοῦ, -οῦ',   e: 'much / neut./gen./sing.',       required: false },
    { g: 'πολλῷ, -ῷ',     e: 'much / neut./dat./sing.',       required: false },
    { g: 'πολύ, -ύ',      e: 'much / neut./acc./sing.',       required: false },
    { g: 'πολλά, -ά',     e: 'many / neut./nom./pl.',         required: false },
    { g: 'πολλῶν, -ῶν',   e: 'many / neut./gen./pl.',         required: false },
    { g: 'πολλοῖς, -οῖς', e: 'many / neut./dat./pl.',         required: false },
    { g: 'πολλά, -ά',     e: 'many / neut./acc./pl.',         required: false },

    // μέγας — masculine (8 cards)
    { g: 'μέγας, -ας',     e: 'great / masc./nom./sing.', required: false },
    { g: 'μεγάλου, -ου',   e: 'great / masc./gen./sing.', required: false },
    { g: 'μεγάλῳ, -ῳ',    e: 'great / masc./dat./sing.', required: false },
    { g: 'μέγαν, -αν',     e: 'great / masc./acc./sing.', required: false },
    { g: 'μεγάλοι, -οι',   e: 'great / masc./nom./pl.',   required: false },
    { g: 'μεγάλων, -ων',   e: 'great / masc./gen./pl.',   required: false },
    { g: 'μεγάλοις, -οις', e: 'great / masc./dat./pl.',   required: false },
    { g: 'μεγάλους, -ους', e: 'great / masc./acc./pl.',   required: false },

    // μέγας — feminine (8 cards)
    { g: 'μεγάλη, -η',     e: 'great / fem./nom./sing.',  required: false },
    { g: 'μεγάλης, -ης',   e: 'great / fem./gen./sing.',  required: false },
    { g: 'μεγάλῃ, -ῃ',    e: 'great / fem./dat./sing.',  required: false },
    { g: 'μεγάλην, -ην',   e: 'great / fem./acc./sing.',  required: false },
    { g: 'μεγάλαι, -αι',   e: 'great / fem./nom./pl.',    required: false },
    { g: 'μεγάλων, -ων',   e: 'great / fem./gen./pl.',    required: false },
    { g: 'μεγάλαις, -αις', e: 'great / fem./dat./pl.',    required: false },
    { g: 'μεγάλας, -ας',   e: 'great / fem./acc./pl.',    required: false },

    // μέγας — neuter (8 cards)
    { g: 'μέγα, -α',       e: 'great / neut./nom./sing.', required: false },
    { g: 'μεγάλου, -ου',   e: 'great / neut./gen./sing.', required: false },
    { g: 'μεγάλῳ, -ῳ',    e: 'great / neut./dat./sing.', required: false },
    { g: 'μέγα, -α',       e: 'great / neut./acc./sing.', required: false },
    { g: 'μεγάλα, -α',     e: 'great / neut./nom./pl.',   required: false },
    { g: 'μεγάλων, -ων',   e: 'great / neut./gen./pl.',   required: false },
    { g: 'μεγάλοις, -οις', e: 'great / neut./dat./pl.',   required: false },
    { g: 'μεγάλα, -α',     e: 'great / neut./acc./pl.',   required: false },
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
