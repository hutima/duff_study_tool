(function () {
  const KEY = 'W1_AUTOS';

  window.registerSupplementalVocabSet(KEY, {
    label: 'αὐτός-paradigm',
    week: 1,
    cards: []
  });

  window.registerSupplementalGrammarSet(KEY, {
    label: 'αὐτός-paradigm',
    notes: 'Week 1 paradigm: αὐτός recognition and uses.',
    items: [
      {
        family: 'αὐτός recognition',
        lemma: 'αὐτός, αὐτή, αὐτό',
        gloss: 'intensive / 3rd pers. pronoun / identifier',
        questions: [
          {
            form: 'αὐτός',
            prompt: 'Which use is this likely to be in the predicate position (e.g. ὁ ἀπόστολος αὐτός)?',
            answer: "intensive — 'the apostle himself'",
            choices: ["intensive — 'the apostle himself'", "identifier — 'the same apostle'", "personal — 'he, the apostle'", 'demonstrative — \'this apostle\''],
            note: "αὐτός in attributive position = 'same'; in predicate position = 'self'."
          },
          {
            form: 'ὁ αὐτὸς ἀπόστολος',
            prompt: 'Which use is this (attributive position)?',
            answer: "identifier — 'the same apostle'",
            choices: ["identifier — 'the same apostle'", "intensive — 'the apostle himself'", "personal — 'he, the apostle'", "predicate — 'the apostle is the same'"]
          }
        ]
      }
    ]
  });

  window.registerSupplementalMorphologySet(KEY, {
    label: 'αὐτός-paradigm',
    notes: 'Week 1 paradigm: selected αὐτός forms.',
    items: [
      {
        family: 'Pronoun paradigm',
        lemma: 'αὐτός, αὐτή, αὐτό',
        gloss: 'self / same / he, she, it',
        questions: [
          { form: 'αὐτός', answer: 'nominative singular masculine' },
          { form: 'αὐτοῦ', answer: 'genitive singular masculine/neuter' },
          { form: 'αὐτῷ', answer: 'dative singular masculine/neuter' },
          { form: 'αὐτή', answer: 'nominative singular feminine' },
          { form: 'αὐτό', answer: 'nominative/accusative singular neuter' },
          { form: 'αὐτοί', answer: 'nominative plural masculine' },
          { form: 'αὐταί', answer: 'nominative plural feminine' },
          { form: 'αὐτά', answer: 'nominative/accusative plural neuter' }
        ]
      }
    ]
  });
})();
