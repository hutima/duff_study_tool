(function () {
  const KEY = 'W1_NOUN_PATTERNS';

  window.registerSupplementalVocabSet(KEY, {
    label: 'λόγος / ἀρχή / ἔργον-paradigm',
    week: 1,
    cards: []
  });

  window.registerSupplementalGrammarSet(KEY, {
    label: 'λόγος / ἀρχή / ἔργον-paradigm',
    notes: 'Week 1 paradigm: article and noun-pattern recognition.',
    items: [
      {
        family: 'Article and noun-pattern recognition',
        lemma: 'λόγος / ἀρχή / ἔργον',
        gloss: 'the three textbook paradigms',
        questions: [
          { form: 'λόγος', prompt: 'What declension and gender?', answer: 'second declension, masculine', choices: ['second declension, masculine', 'first declension, feminine', 'second declension, neuter', 'third declension, masculine'] },
          { form: 'ἀρχή', prompt: 'What declension and gender?', answer: 'first declension, feminine (η-pattern)', choices: ['first declension, feminine (η-pattern)', 'first declension, feminine (α-pattern)', 'second declension, feminine', 'third declension, feminine'] },
          { form: 'ἔργον', prompt: 'What declension and gender?', answer: 'second declension, neuter', choices: ['second declension, neuter', 'second declension, masculine', 'first declension, neuter', 'third declension, neuter'] }
        ]
      }
    ]
  });
})();
