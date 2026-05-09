(function () {
  const KEY = 'W6_MEMORIZATION_PARADIGMS';
  const LABEL = 'Week 6 memorization paradigms';

  window.registerSupplementalVocabSet(KEY, {
    label: LABEL,
    week: 6,
    cards: [
      { g: 'ἐλύθην, ἐλύθης, ἐλύθη, ἐλύθημεν, ἐλύθητε, ἐλύθησαν', e: 'aorist passive indicative of λύω', required: true },
      { g: 'λυθήσομαι, λυθήσῃ, λυθήσεται, λυθησόμεθα, λυθήσεσθε, λυθήσονται', e: 'future passive indicative of λύω', required: true },
      { g: 'λυθείς, λυθεῖσα, λυθέν', e: 'aorist passive participle', required: true },
      { g: 'λέλυκα, λέλυκας, λέλυκε(ν), λελύκαμεν, λελύκατε, λελύκασι(ν)', e: 'perfect active indicative of λύω', required: true },
      { g: 'ἐλελύκειν, ἐλελύκεις, ἐλελύκει, ἐλελύκειμεν, ἐλελύκειτε, ἐλελύκεισαν', e: 'pluperfect active indicative of λύω', required: true }
    ]
  });

  window.registerSupplementalGrammarSet(KEY, {
    label: LABEL,
    notes: 'Week 6 required paradigms: passive forms, passive participles, perfect, and pluperfect.',
    items: [
      {
        family: 'Passive systems',
        lemma: 'λύω',
        gloss: 'I untie',
        questions: [
          { form: 'ἐλύθητε', prompt: 'Parse this form.', answer: 'aorist passive indicative, 2nd pl.', choices: ['aorist passive indicative, 2nd pl.', 'aorist active indicative, 2nd pl.', 'future passive indicative, 2nd pl.', 'perfect active indicative, 2nd pl.'] },
          { form: 'λυθήσεται', prompt: 'Parse this form.', answer: 'future passive indicative, 3rd sg.', choices: ['future passive indicative, 3rd sg.', 'aorist passive subjunctive, 3rd sg.', 'present middle/passive indicative, 3rd sg.', 'future middle indicative, 3rd sg.'] },
          { form: 'λυθῆναι', prompt: 'Identify this form.', answer: 'aorist passive infinitive', choices: ['aorist passive infinitive', 'present middle/passive infinitive', 'aorist active infinitive', 'future passive indicative, 3rd sg.'] }
        ]
      },
      {
        family: 'Perfect and pluperfect',
        lemma: 'λύω',
        gloss: 'I untie',
        questions: [
          { form: 'λελύκατε', prompt: 'Parse this form.', answer: 'perfect active indicative, 2nd pl.', choices: ['perfect active indicative, 2nd pl.', 'pluperfect active indicative, 2nd pl.', 'aorist active indicative, 2nd pl.', 'perfect middle/passive indicative, 2nd pl.'] },
          { form: 'ἐλελύκεισαν', prompt: 'Parse this form.', answer: 'pluperfect active indicative, 3rd pl.', choices: ['pluperfect active indicative, 3rd pl.', 'perfect active indicative, 3rd pl.', 'aorist passive indicative, 3rd pl.', 'imperfect active indicative, 3rd pl.'] },
          { form: 'λελυμένος', prompt: 'Identify this form.', answer: 'nominative singular masculine, perfect middle/passive participle', choices: ['nominative singular masculine, perfect middle/passive participle', 'nominative singular masculine, aorist passive participle', 'nominative singular masculine, present middle/passive participle', 'perfect active indicative, 1st sg.'] }
        ]
      }
    ]
  });

  window.registerSupplementalMorphologySet(KEY, {
    label: LABEL,
    notes: 'Week 6 paradigm drill: passive, perfect, and pluperfect forms.',
    items: [
      {
        family: 'Aorist and future passive',
        lemma: 'λύω',
        gloss: 'I am / was / will be untied',
        questions: [
          { form: 'ἐλύθης', answer: 'aorist passive indicative, 2nd singular' },
          { form: 'ἐλύθησαν', answer: 'aorist passive indicative, 3rd plural' },
          { form: 'λύθητι', answer: 'aorist passive imperative, 2nd singular' },
          { form: 'λυθήτω', answer: 'aorist passive imperative, 3rd singular' },
          { form: 'λυθήσῃ', answer: 'future passive indicative, 2nd singular' },
          { form: 'λυθήσονται', answer: 'future passive indicative, 3rd plural' }
        ]
      },
      {
        family: 'Perfect system',
        lemma: 'λύω',
        gloss: 'I have / had untied',
        questions: [
          { form: 'λέλυκας', answer: 'perfect active indicative, 2nd singular' },
          { form: 'λελύκασι(ν)', answer: 'perfect active indicative, 3rd plural' },
          { form: 'ἐλελύκεις', answer: 'pluperfect active indicative, 2nd singular' },
          { form: 'ἐλελύκειμεν', answer: 'pluperfect active indicative, 1st plural' },
          { form: 'λυθεῖσα', answer: 'nominative singular feminine, aorist passive participle' },
          { form: 'λυθέντες', answer: 'nominative plural masculine, aorist passive participle' }
        ]
      }
    ]
  });
})();
