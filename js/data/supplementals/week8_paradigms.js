(function () {
  const KEY = 'W8_MEMORIZATION_PARADIGMS';
  const LABEL = 'Week 8 memorization paradigms';

  window.registerSupplementalVocabSet(KEY, {
    label: LABEL,
    week: 8,
    cards: [
      { g: 'δίδωμι, δίδως, δίδωσι(ν), δίδομεν, δίδοτε, διδόασι(ν)', e: '-μι present active indicative of δίδωμι', required: true },
      { g: 'δίδου, διδότω, δίδοτε, διδόντων', e: '-μι present active imperative of δίδωμι', required: true },
      { g: 'διδούς, διδοῦσα, διδόν', e: '-μι present active participle of δίδωμι', required: true },
      { g: 'δώσω, ἔδωκα, δέδωκα', e: 'δίδωμι future, aorist, perfect active 1st singular', required: true },
      { g: 'δίδομαι, δίδοσαι, δίδοται, διδόμεθα, δίδοσθε, δίδονται', e: '-μι present middle/passive indicative of δίδωμι', required: true }
    ]
  });

  window.registerSupplementalGrammarSet(KEY, {
    label: LABEL,
    notes: 'Week 8 required paradigms: -μι present active verbs, other -μι tenses, and middle/passive forms.',
    items: [
      {
        family: '-μι present active',
        lemma: 'δίδωμι',
        gloss: 'I give',
        questions: [
          { form: 'δίδωσι(ν)', prompt: 'Parse this form.', answer: 'present active indicative, 3rd sg.', choices: ['present active indicative, 3rd sg.', 'present active subjunctive, 3rd sg.', 'present active imperative, 3rd sg.', 'aorist active indicative, 3rd sg.'] },
          { form: 'διδόασι(ν)', prompt: 'Parse this form.', answer: 'present active indicative, 3rd pl.', choices: ['present active indicative, 3rd pl.', 'present active participle, dat. pl.', 'aorist active indicative, 3rd pl.', 'present middle/passive indicative, 3rd pl.'] },
          { form: 'δίδοτε', prompt: 'In isolation, this form may be:', answer: 'present active indicative or imperative, 2nd pl.', choices: ['present active indicative or imperative, 2nd pl.', 'present active indicative, 3rd pl. only', 'aorist active imperative, 2nd pl. only', 'present middle/passive indicative, 2nd pl.'] }
        ]
      },
      {
        family: '-μι other tenses and voice',
        lemma: 'δίδωμι',
        gloss: 'I give',
        questions: [
          { form: 'ἔδωκεν', prompt: 'Parse this form.', answer: 'aorist active indicative, 3rd sg.', choices: ['aorist active indicative, 3rd sg.', 'perfect active indicative, 3rd sg.', 'future active indicative, 3rd sg.', 'present active indicative, 3rd sg.'] },
          { form: 'δέδωκεν', prompt: 'Parse this form.', answer: 'perfect active indicative, 3rd sg.', choices: ['perfect active indicative, 3rd sg.', 'aorist active indicative, 3rd sg.', 'pluperfect active indicative, 3rd sg.', 'future active indicative, 3rd sg.'] },
          { form: 'διδόμεθα', prompt: 'Parse this form.', answer: 'present middle/passive indicative, 1st pl.', choices: ['present middle/passive indicative, 1st pl.', 'present active indicative, 1st pl.', 'aorist middle indicative, 1st pl.', 'future passive indicative, 1st pl.'] }
        ]
      }
    ]
  });

  window.registerSupplementalMorphologySet(KEY, {
    label: LABEL,
    notes: 'Week 8 paradigm drill: δίδωμι active, other tenses, and middle/passive forms.',
    items: [
      {
        family: 'δίδωμι active',
        lemma: 'δίδωμι',
        gloss: 'I give',
        questions: [
          { form: 'δίδωμι', answer: 'present active indicative, 1st singular' },
          { form: 'δίδως', answer: 'present active indicative, 2nd singular' },
          { form: 'δίδομεν', answer: 'present active indicative, 1st plural' },
          { form: 'δίδου', answer: 'present active imperative, 2nd singular' },
          { form: 'διδούς', answer: 'nominative singular masculine, present active participle' },
          { form: 'διδοῦσα', answer: 'nominative singular feminine, present active participle' }
        ]
      },
      {
        family: 'δίδωμι other tenses and middle/passive',
        lemma: 'δίδωμι',
        gloss: 'I give',
        questions: [
          { form: 'δώσει', answer: 'future active indicative, 3rd singular' },
          { form: 'ἔδωκα', answer: 'aorist active indicative, 1st singular' },
          { form: 'δέδωκας', answer: 'perfect active indicative, 2nd singular' },
          { form: 'δίδοσαι', answer: 'present middle/passive indicative, 2nd singular' },
          { form: 'δίδονται', answer: 'present middle/passive indicative, 3rd plural' },
          { form: 'δίδοσθε', answer: 'present middle/passive indicative, 2nd plural' }
        ]
      }
    ]
  });
})();
