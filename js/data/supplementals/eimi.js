(function () {
  const KEY = 'W1_EIMI';

  window.registerSupplementalVocabSet(KEY, {
    label: 'ειμι-paradigm',
    week: 1,
    cards: []
  });

  window.registerSupplementalMorphologySet(KEY, {
    label: 'ειμι-paradigm',
    notes: 'Week 1 paradigm: present indicative of εἰμί.',
    items: [
      {
        family: 'Present indicative of εἰμί',
        lemma: 'εἰμί',
        gloss: 'I am',
        questions: [
          { form: 'εἰμί', answer: 'present active indicative, 1st singular' },
          { form: 'εἶ', answer: 'present active indicative, 2nd singular' },
          { form: 'ἐστί(ν)', answer: 'present active indicative, 3rd singular' },
          { form: 'ἐσμέν', answer: 'present active indicative, 1st plural' },
          { form: 'ἐστέ', answer: 'present active indicative, 2nd plural' },
          { form: 'εἰσί(ν)', answer: 'present active indicative, 3rd plural' }
        ]
      }
    ]
  });
})();
