(function () {
  const KEY = 'W4_MEMORIZATION_PARADIGMS';
  const LABEL = 'Week 4 memorization paradigms';

  window.registerSupplementalVocabSet(KEY, {
    label: LABEL,
    week: 4,
    cards: [
      { g: 'ὅς, ἥ, ὅ', e: 'relative pronoun: who, which, that (nom. sg. m/f/n)', required: true },
      { g: 'ὅν, ἥν, ὅ', e: 'relative pronoun accusative singular m/f/n', required: true },
      { g: 'ἔλαβον, ἔλαβες, ἔλαβε(ν), ἐλάβομεν, ἐλάβετε, ἔλαβον', e: 'second aorist active indicative of λαμβάνω', required: true },
      { g: 'μενῶ, μενεῖς, μενεῖ, μενοῦμεν, μενεῖτε, μενοῦσι(ν)', e: 'liquid future active indicative of μένω', required: true }
    ]
  });

  window.registerSupplementalGrammarSet(KEY, {
    label: LABEL,
    notes: 'Week 4 required paradigms: relative pronouns, second aorist active, and liquid future active.',
    items: [
      {
        family: 'Relative pronoun agreement',
        lemma: 'ὅς, ἥ, ὅ',
        gloss: 'who, which, that',
        questions: [
          { form: 'ὃν βλέπεις', prompt: 'What determines the gender and number of ὃν?', answer: 'its antecedent', choices: ['its antecedent', 'the verb βλέπεις', 'the word order', 'the following noun only'], note: 'Case comes from the pronoun’s role inside its own clause.' },
          { form: 'ὃν βλέπεις', prompt: 'Why is ὃν accusative?', answer: 'it is the direct object in the relative clause', choices: ['it is the direct object in the relative clause', 'its antecedent is accusative', 'all relative pronouns are accusative', 'it is the subject of βλέπεις'] },
          { form: 'ἥ', prompt: 'Identify the form.', answer: 'nominative singular feminine relative pronoun', choices: ['nominative singular feminine relative pronoun', 'nominative singular feminine article', 'accusative singular feminine relative pronoun', 'nominative plural neuter relative pronoun'] }
        ]
      },
      {
        family: 'Second aorist and liquid future',
        lemma: 'λαμβάνω / μένω',
        gloss: 'I take / I remain',
        questions: [
          { form: 'ἔλαβες', prompt: 'Parse this form.', answer: 'second aorist active indicative, 2nd sg.', choices: ['second aorist active indicative, 2nd sg.', 'imperfect active indicative, 2nd sg.', 'future active indicative, 2nd sg.', 'aorist middle indicative, 2nd sg.'] },
          { form: 'ἔλαβον', prompt: 'In isolation, this form may be:', answer: '1st sg. or 3rd pl. second aorist active indicative', choices: ['1st sg. or 3rd pl. second aorist active indicative', '2nd sg. only', '3rd sg. only', '1st pl. or 2nd pl.'] },
          { form: 'μενοῦμεν', prompt: 'Parse this form.', answer: 'future active indicative, 1st pl.', choices: ['future active indicative, 1st pl.', 'present active indicative, 1st pl.', 'aorist active subjunctive, 1st pl.', 'future middle indicative, 1st pl.'] }
        ]
      }
    ]
  });

  window.registerSupplementalMorphologySet(KEY, {
    label: LABEL,
    notes: 'Week 4 paradigm drill: relative pronoun, second aorist, and liquid future forms.',
    items: [
      {
        family: 'Relative pronoun',
        lemma: 'ὅς, ἥ, ὅ',
        gloss: 'who, which, that',
        questions: [
          { form: 'ὅς', answer: 'nominative singular masculine relative pronoun' },
          { form: 'οὗ', answer: 'genitive singular masculine/neuter relative pronoun' },
          { form: 'ᾧ', answer: 'dative singular masculine/neuter relative pronoun' },
          { form: 'ἥν', answer: 'accusative singular feminine relative pronoun' },
          { form: 'οἵ', answer: 'nominative plural masculine relative pronoun' },
          { form: 'ἅ', answer: 'nominative/accusative plural neuter relative pronoun' }
        ]
      },
      {
        family: 'Second aorist and liquid future',
        lemma: 'λαμβάνω / μένω',
        gloss: 'I take / I remain',
        questions: [
          { form: 'ἔλαβε(ν)', answer: 'second aorist active indicative, 3rd singular' },
          { form: 'ἐλάβομεν', answer: 'second aorist active indicative, 1st plural' },
          { form: 'ἐλάβετε', answer: 'second aorist active indicative, 2nd plural' },
          { form: 'μενῶ', answer: 'future active indicative, 1st singular' },
          { form: 'μενεῖτε', answer: 'future active indicative, 2nd plural' },
          { form: 'μενοῦσι(ν)', answer: 'future active indicative, 3rd plural' }
        ]
      }
    ]
  });
})();
