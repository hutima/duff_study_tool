(function () {
  const KEY = 'W3_MEMORIZATION_PARADIGMS';
  const LABEL = 'Week 3 memorization paradigms';

  window.registerSupplementalVocabSet(KEY, {
    label: LABEL,
    week: 3,
    cards: [
      { g: 'λύομαι, λύῃ, λύεται, λυόμεθα, λύεσθε, λύονται', e: 'present middle/passive indicative of λύω', required: true },
      { g: 'ἐλυόμην, ἐλύου, ἐλύετο, ἐλυόμεθα, ἐλύεσθε, ἐλύοντο', e: 'imperfect middle/passive indicative of λύω', required: true },
      { g: 'λύσομαι, λύσῃ, λύσεται, λυσόμεθα, λύσεσθε, λύσονται', e: 'future middle indicative of λύω', required: true },
      { g: 'ἐλυσάμην, ἐλύσω, ἐλύσατο, ἐλυσάμεθα, ἐλύσασθε, ἐλύσαντο', e: 'aorist middle indicative of λύω', required: true },
      { g: 'εἶναι; ὤν, οὖσα, ὄν', e: 'εἰμί present infinitive and nominative singular participle', required: true },
      { g: 'οὗτος, αὕτη, τοῦτο', e: 'near demonstrative: this', required: true },
      { g: 'ἐκεῖνος, ἐκείνη, ἐκεῖνο', e: 'far demonstrative: that', required: true },
      { g: 'ἐγώ, σύ, ἡμεῖς, ὑμεῖς', e: 'personal pronouns: I, you sg., we, you pl.', required: true }
    ]
  });

  window.registerSupplementalGrammarSet(KEY, {
    label: LABEL,
    notes: 'Week 3 required paradigms: middle voice, εἰμί infinitive/participle, demonstratives, and personal pronouns.',
    items: [
      {
        family: 'Middle voice forms',
        lemma: 'λύω',
        gloss: 'I untie',
        questions: [
          { form: 'λύεται', prompt: 'Parse this form.', answer: 'present middle/passive indicative, 3rd sg.', choices: ['present middle/passive indicative, 3rd sg.', 'future middle indicative, 3rd sg.', 'aorist middle indicative, 3rd sg.', 'present active indicative, 3rd sg.'] },
          { form: 'ἐλύοντο', prompt: 'Parse this form.', answer: 'imperfect middle/passive indicative, 3rd pl.', choices: ['imperfect middle/passive indicative, 3rd pl.', 'aorist middle indicative, 3rd pl.', 'present middle/passive indicative, 3rd pl.', 'future middle indicative, 3rd pl.'] },
          { form: 'ἐλυσάμεθα', prompt: 'Parse this form.', answer: 'aorist middle indicative, 1st pl.', choices: ['aorist middle indicative, 1st pl.', 'imperfect middle/passive indicative, 1st pl.', 'future middle indicative, 1st pl.', 'present middle/passive indicative, 1st pl.'] }
        ]
      },
      {
        family: 'Demonstratives and pronouns',
        lemma: 'οὗτος / ἐγώ',
        gloss: 'this / I',
        questions: [
          { form: 'τοῦτο', prompt: 'Identify the form.', answer: 'nominative/accusative singular neuter of οὗτος', choices: ['nominative/accusative singular neuter of οὗτος', 'nominative singular feminine of οὗτος', 'genitive singular masculine of οὗτος', 'nominative plural neuter of ἐκεῖνος'] },
          { form: 'ἐκείνη', prompt: 'Identify the form.', answer: 'nominative singular feminine of ἐκεῖνος', choices: ['nominative singular feminine of ἐκεῖνος', 'nominative singular masculine of οὗτος', 'accusative singular masculine of ἐκεῖνος', 'genitive singular feminine of αὐτός'] },
          { form: 'ἡμῶν', prompt: 'Identify the pronoun form.', answer: 'genitive plural of ἐγώ: of us / our', choices: ['genitive plural of ἐγώ: of us / our', 'dative plural of σύ: to you all', 'accusative plural of ἐγώ: us', 'nominative plural of σύ: you all'] }
        ]
      }
    ]
  });

  window.registerSupplementalMorphologySet(KEY, {
    label: LABEL,
    notes: 'Week 3 paradigm drill: middle indicative forms, εἰμί participle, demonstratives, and personal pronouns.',
    items: [
      {
        family: 'Middle indicative overview',
        lemma: 'λύω',
        gloss: 'I untie for myself / I am untied',
        questions: [
          { form: 'λύομαι', answer: 'present middle/passive indicative, 1st singular' },
          { form: 'λυόμεθα', answer: 'present middle/passive indicative, 1st plural' },
          { form: 'ἐλύου', answer: 'imperfect middle/passive indicative, 2nd singular' },
          { form: 'ἐλύεσθε', answer: 'imperfect middle/passive indicative, 2nd plural' },
          { form: 'λύσεται', answer: 'future middle indicative, 3rd singular' },
          { form: 'λύσονται', answer: 'future middle indicative, 3rd plural' },
          { form: 'ἐλύσω', answer: 'aorist middle indicative, 2nd singular' },
          { form: 'ἐλύσαντο', answer: 'aorist middle indicative, 3rd plural' }
        ]
      },
      {
        family: 'εἰμί and pronouns',
        lemma: 'εἰμί / ἐγώ',
        gloss: 'to be / I',
        questions: [
          { form: 'εἶναι', answer: 'present infinitive of εἰμί' },
          { form: 'ὄντες', answer: 'nominative plural masculine, present participle of εἰμί' },
          { form: 'οὖσαι', answer: 'nominative plural feminine, present participle of εἰμί' },
          { form: 'ὄντα', answer: 'nominative/accusative plural neuter, present participle of εἰμί' },
          { form: 'σοί', answer: 'dative singular of σύ' },
          { form: 'ὑμᾶς', answer: 'accusative plural of σύ' }
        ]
      }
    ]
  });
})();
