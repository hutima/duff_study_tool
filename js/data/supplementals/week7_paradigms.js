(function () {
  const KEY = 'W7_MEMORIZATION_PARADIGMS';
  const LABEL = 'Week 7 memorization paradigms';

  window.registerSupplementalVocabSet(KEY, {
    label: LABEL,
    week: 7,
    cards: [
      { g: 'λύω, λύῃς, λύῃ, λύωμεν, λύητε, λύωσι(ν)', e: 'present active subjunctive of λύω', required: true },
      { g: 'λύσω, λύσῃς, λύσῃ, λύσωμεν, λύσητε, λύσωσι(ν)', e: 'aorist active subjunctive of λύω', required: true },
      { g: 'λύωμαι, λύῃ, λύηται, λυώμεθα, λύησθε, λύωνται', e: 'present middle/passive subjunctive of λύω', required: true },
      { g: 'τις, τι', e: 'indefinite pronoun: someone/something, anyone/anything', required: true },
      { g: 'λυέτω; λυσάτω; λυθήτω', e: '3rd singular imperative: present active, aorist active, aorist passive', required: true }
    ]
  });

  window.registerSupplementalGrammarSet(KEY, {
    label: LABEL,
    notes: 'Week 7 required paradigms: subjunctive mood, aspect, indefinite constructions, and third-person imperatives.',
    items: [
      {
        family: 'Subjunctive mood and aspect',
        lemma: 'λύω',
        gloss: 'I untie',
        questions: [
          { form: 'λύωμεν', prompt: 'Parse this form.', answer: 'present active subjunctive, 1st pl.', choices: ['present active subjunctive, 1st pl.', 'present active indicative, 1st pl.', 'aorist active subjunctive, 1st pl.', 'future active indicative, 1st pl.'] },
          { form: 'λύσωσι(ν)', prompt: 'Parse this form.', answer: 'aorist active subjunctive, 3rd pl.', choices: ['aorist active subjunctive, 3rd pl.', 'future active indicative, 3rd pl.', 'present active subjunctive, 3rd pl.', 'aorist active indicative, 3rd pl.'] },
          { form: 'λύησθε', prompt: 'Parse this form.', answer: 'present middle/passive subjunctive, 2nd pl.', choices: ['present middle/passive subjunctive, 2nd pl.', 'present middle/passive indicative, 2nd pl.', 'aorist middle subjunctive, 2nd pl.', 'future middle indicative, 2nd pl.'] }
        ]
      },
      {
        family: 'Indefinites and imperatives',
        lemma: 'τις / λύω',
        gloss: 'someone / untie',
        questions: [
          { form: 'ἐάν τις', prompt: 'Best translation cue?', answer: 'if anyone / if someone', choices: ['if anyone / if someone', 'because someone', 'so that no one', 'whoever definitely'] },
          { form: 'λυέτω', prompt: 'Parse this form.', answer: 'present active imperative, 3rd sg.', choices: ['present active imperative, 3rd sg.', 'aorist active imperative, 3rd sg.', 'present active indicative, 3rd sg.', 'aorist passive imperative, 3rd sg.'] },
          { form: 'λυθήτω', prompt: 'Parse this form.', answer: 'aorist passive imperative, 3rd sg.', choices: ['aorist passive imperative, 3rd sg.', 'aorist active imperative, 3rd sg.', 'present middle/passive imperative, 3rd sg.', 'future passive indicative, 3rd sg.'] }
        ]
      }
    ]
  });

  window.registerSupplementalMorphologySet(KEY, {
    label: LABEL,
    notes: 'Week 7 paradigm drill: subjunctive and third-person imperative forms.',
    items: [
      {
        family: 'Subjunctives',
        lemma: 'λύω',
        gloss: 'I may untie',
        questions: [
          { form: 'λύῃς', answer: 'present active subjunctive, 2nd singular' },
          { form: 'λύητε', answer: 'present active subjunctive, 2nd plural' },
          { form: 'λύσῃ', answer: 'aorist active subjunctive, 3rd singular' },
          { form: 'λύσωμεν', answer: 'aorist active subjunctive, 1st plural' },
          { form: 'λύηται', answer: 'present middle/passive subjunctive, 3rd singular' },
          { form: 'λύωνται', answer: 'present middle/passive subjunctive, 3rd plural' }
        ]
      },
      {
        family: 'Third-person imperatives and indefinite',
        lemma: 'λύω / τις',
        gloss: 'let him/her untie / someone',
        questions: [
          { form: 'λυόντων', answer: 'present active imperative, 3rd plural' },
          { form: 'λυσάντων', answer: 'aorist active imperative, 3rd plural' },
          { form: 'λυθέντων', answer: 'aorist passive imperative, 3rd plural' },
          { form: 'τις', answer: 'indefinite pronoun, nominative singular masculine/feminine' },
          { form: 'τι', answer: 'indefinite pronoun, nominative/accusative singular neuter' }
        ]
      }
    ]
  });
})();
