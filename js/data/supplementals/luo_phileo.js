(function () {
  const KEY = 'W1_LUO_PHILEO';

  window.registerSupplementalVocabSet(KEY, {
    label: 'λύω / φιλέω-paradigm',
    week: 1,
    cards: [
      { g: 'λύω, -ω', e: 'I loose, untie (1st sg.)', required: true },
      { g: 'λύεις, -εις', e: 'you loose, untie (2nd sg.)', required: true },
      { g: 'λύει, -ει', e: 'he/she/it looses, unties (3rd sg.)', required: true },
      { g: 'λύομεν, -ομεν', e: 'we loose, untie (1st pl.)', required: true },
      { g: 'λύετε, -ετε', e: 'you all loose, untie (2nd pl.)', required: true },
      { g: 'λύουσι(ν), -ουσι(ν)', e: 'they loose, untie (3rd pl.)', required: true },
      { g: 'φιλῶ, -ῶ', e: 'I love (1st sg.)', required: true },
      { g: 'φιλεῖς, -εῖς', e: 'you love (2nd sg.)', required: true },
      { g: 'φιλεῖ, -εῖ', e: 'he/she/it loves (3rd sg.)', required: true },
      { g: 'φιλοῦμεν, -οῦμεν', e: 'we love (1st pl.)', required: true },
      { g: 'φιλεῖτε, -εῖτε', e: 'you all love (2nd pl.)', required: true },
      { g: 'φιλοῦσι(ν), -οῦσι(ν)', e: 'they love (3rd pl.)', required: true }
    ]
  });

  window.registerSupplementalGrammarSet(KEY, {
    label: 'λύω / φιλέω-paradigm',
    notes: 'Week 1 paradigm: present indicative recognition for λύω and φιλέω.',
    items: [
      {
        family: 'Present indicative recognition',
        lemma: 'λύω vs φιλέω',
        gloss: 'uncontracted vs ε-contract',
        questions: [
          {
            form: 'λύομεν vs φιλοῦμεν',
            prompt: 'Why does φιλέω contract to φιλοῦμεν while λύω stays λύομεν?',
            answer: 'φιλέω has stem-final ε that contracts with the connecting vowel: ε + ο → ου',
            choices: [
              'φιλέω has stem-final ε that contracts with the connecting vowel: ε + ο → ου',
              'φιλέω uses different personal endings',
              'λύω is irregular',
              'φιλέω is in a different mood'
            ]
          },
          {
            form: 'φιλεῖ',
            prompt: 'Parse this form.',
            answer: "present active indicative, 3rd sg. of φιλέω ('he/she/it loves')",
            choices: [
              "present active indicative, 3rd sg. of φιλέω ('he/she/it loves')",
              'present active indicative, 2nd sg. of φιλέω',
              'present active indicative, 3rd sg. of φιλέω + augment',
              'aorist active indicative, 3rd sg. of φιλέω'
            ],
            note: 'Underlying φιλέ-ει: ε + ει → ει.'
          }
        ]
      }
    ]
  });

  window.registerSupplementalMorphologySet(KEY, {
    label: 'λύω / φιλέω-paradigm',
    notes: 'Week 1 paradigm: contract-verb present active indicative forms.',
    items: [
      {
        family: 'Contract verb present active indicative',
        lemma: 'φιλέω',
        gloss: 'I love, like',
        questions: [
          { form: 'φιλῶ', context: 'ἐγὼ τὸν φίλον φιλῶ.', answer: 'present active indicative, 1st singular', note: 'In isolation, φιλῶ can also be present active subjunctive, 1st singular. The short context points to the indicative.' },
          { form: 'φιλεῖς', answer: 'present active indicative, 2nd singular' },
          { form: 'φιλεῖ', answer: 'present active indicative, 3rd singular' },
          { form: 'φιλοῦμεν', answer: 'present active indicative, 1st plural' },
          { form: 'φιλεῖτε', answer: 'present active indicative, 2nd plural' },
          { form: 'φιλοῦσι(ν)', answer: 'present active indicative, 3rd plural' }
        ]
      }
    ]
  });
})();
