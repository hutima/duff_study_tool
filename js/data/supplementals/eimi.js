(function () {
  const KEY = 'W1_EIMI';

  window.registerSupplementalVocabSet(KEY, {
    label: 'εἰμί-paradigm',
    week: 1,
    cards: [
      { g: 'εἰμί, -μί', e: 'I am (1st sg.)', required: false },
      { g: 'εἶ, -εἶ', e: 'you are (2nd sg.)', required: false },
      { g: 'ἐστί(ν), -στί(ν)', e: 'he/she/it is (3rd sg.)', required: false },
      { g: 'ἐσμέν, -μέν', e: 'we are (1st pl.)', required: false },
      { g: 'ἐστέ, -τέ', e: 'you all are (2nd pl.)', required: false },
      { g: 'εἰσί(ν), -σί(ν)', e: 'they are (3rd pl.)', required: false }
    ]
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
