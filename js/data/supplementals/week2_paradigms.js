(function () {
  const KEY = 'W2_MEMORIZATION_PARADIGMS';
  const LABEL = 'Week 2 memorization paradigms';

  window.registerSupplementalVocabSet(KEY, {
    label: LABEL,
    week: 2,
    cards: [
      { g: 'λύω, λύεις, λύει, λύομεν, λύετε, λύουσι(ν)', e: 'present active indicative of λύω', required: true },
      { g: 'ἔλυον, ἔλυες, ἔλυε(ν), ἐλύομεν, ἐλύετε, ἔλυον', e: 'imperfect active indicative of λύω', required: true },
      { g: 'λύσω, λύσεις, λύσει, λύσομεν, λύσετε, λύσουσι(ν)', e: 'future active indicative of λύω', required: true },
      { g: 'ἔλυσα, ἔλυσας, ἔλυσε(ν), ἐλύσαμεν, ἐλύσατε, ἔλυσαν', e: 'first aorist active indicative of λύω', required: true },
      { g: 'φιλῶ, φιλεῖς, φιλεῖ, φιλοῦμεν, φιλεῖτε, φιλοῦσι(ν)', e: 'contract present active indicative of φιλέω', required: true },
      { g: 'λῦε, λυέτω, λύετε, λυόντων', e: 'present active imperative of λύω', required: true },
      { g: 'λῦσον, λυσάτω, λύσατε, λυσάντων', e: 'aorist active imperative of λύω', required: true },
      { g: 'λύων, λύουσα, λῦον', e: 'present active participle, nominative singular m/f/n', required: true },
      { g: 'λύσας, λύσασα, λῦσαν', e: 'aorist active participle, nominative singular m/f/n', required: true }
    ]
  });

  window.registerSupplementalGrammarSet(KEY, {
    label: LABEL,
    notes: 'Week 2 required paradigms: active indicative tenses, contract indicative forms, imperative mood, and active participles.',
    items: [
      {
        family: 'Active indicative tense stems',
        lemma: 'λύω',
        gloss: 'I untie',
        questions: [
          { form: 'ἐλύομεν', prompt: 'Parse this form.', answer: 'imperfect active indicative, 1st pl.', choices: ['imperfect active indicative, 1st pl.', 'present active indicative, 1st pl.', 'aorist active indicative, 1st pl.', 'future active indicative, 1st pl.'], note: 'The augment ἐ- plus -ο/ε present stem points to imperfect.' },
          { form: 'λύσετε', prompt: 'Parse this form.', answer: 'future active indicative, 2nd pl.', choices: ['future active indicative, 2nd pl.', 'present active imperative, 2nd pl.', 'aorist active indicative, 2nd pl.', 'present active indicative, 2nd pl.'] },
          { form: 'ἔλυσαν', prompt: 'Parse this form.', answer: 'aorist active indicative, 3rd pl.', choices: ['aorist active indicative, 3rd pl.', 'imperfect active indicative, 3rd pl.', 'future active indicative, 3rd pl.', 'present active indicative, 3rd pl.'] }
        ]
      },
      {
        family: 'Mood recognition',
        lemma: 'λύω',
        gloss: 'I untie',
        questions: [
          { form: 'λῦε', prompt: 'What mood is this?', answer: 'present active imperative, 2nd sg.', choices: ['present active imperative, 2nd sg.', 'present active indicative, 3rd sg.', 'aorist active imperative, 2nd sg.', 'present active infinitive'] },
          { form: 'λῦσον', prompt: 'What mood is this?', answer: 'aorist active imperative, 2nd sg.', choices: ['aorist active imperative, 2nd sg.', 'present active imperative, 2nd sg.', 'future active indicative, 1st sg.', 'aorist active participle, nom. sg. neut.'] },
          { form: 'λύων', prompt: 'Identify this form type.', answer: 'present active participle, nominative sg. masc.', choices: ['present active participle, nominative sg. masc.', 'present active indicative, 1st sg.', 'aorist active participle, nominative sg. masc.', 'present active infinitive'] }
        ]
      }
    ]
  });

  window.registerSupplementalMorphologySet(KEY, {
    label: LABEL,
    notes: 'Week 2 paradigm drill: active indicative, imperative, and active participle forms.',
    items: [
      {
        family: 'Active indicative overview',
        lemma: 'λύω',
        gloss: 'I untie',
        questions: [
          { form: 'λύεις', answer: 'present active indicative, 2nd singular' },
          { form: 'λύουσι(ν)', answer: 'present active indicative, 3rd plural' },
          { form: 'ἔλυες', answer: 'imperfect active indicative, 2nd singular' },
          { form: 'ἐλύετε', answer: 'imperfect active indicative, 2nd plural' },
          { form: 'λύσει', answer: 'future active indicative, 3rd singular' },
          { form: 'λύσομεν', answer: 'future active indicative, 1st plural' },
          { form: 'ἔλυσας', answer: 'aorist active indicative, 2nd singular' },
          { form: 'ἐλύσαμεν', answer: 'aorist active indicative, 1st plural' }
        ]
      },
      {
        family: 'Imperatives and active participles',
        lemma: 'λύω',
        gloss: 'untie / untying',
        questions: [
          { form: 'λυέτω', answer: 'present active imperative, 3rd singular' },
          { form: 'λύετε', context: 'ὑμεῖς λύετε.', answer: 'present active indicative, 2nd plural' },
          { form: 'λυσάτω', answer: 'aorist active imperative, 3rd singular' },
          { form: 'λύσατε', answer: 'aorist active imperative, 2nd plural' },
          { form: 'λύουσα', answer: 'nominative singular feminine, present active participle' },
          { form: 'λῦον', answer: 'nominative/accusative singular neuter, present active participle' },
          { form: 'λύσας', answer: 'nominative singular masculine, aorist active participle' },
          { form: 'λύσαντες', answer: 'nominative plural masculine, aorist active participle' }
        ]
      }
    ]
  });
})();
