(function () {
  const KEY = 'W1_AUTOS';

  window.registerSupplementalVocabSet(KEY, {
    label: 'αὐτός-paradigm',
    week: 1,
    cards: [
      { g: 'αὐτός, -ός', e: 'he, himself, same (nom. sg. masc.)', required: true },
      { g: 'αὐτοῦ, -οῦ', e: 'of, from him/it (gen. sg. masc.-neut.)', required: true },
      { g: 'αὐτῷ, -ῷ', e: 'to, for him/it (dat. sg. masc.-neut.)', required: true },
      { g: 'αὐτόν, -όν', e: 'him, himself, same (acc. sg. masc.)', required: true },
      { g: 'αὐτοί, -οί', e: 'they, themselves, same ones (nom. pl. masc.)', required: true },
      { g: 'αὐτῶν, -ῶν', e: 'of, from them (gen. pl. masc.-fem.-neut.)', required: true },
      { g: 'αὐτοῖς, -οῖς', e: 'to, for them (dat. pl. masc.-neut.)', required: true },
      { g: 'αὐτούς, -ούς', e: 'them, themselves, same ones (acc. pl. masc.)', required: true },
      { g: 'αὐτή, -ή', e: 'she, herself, same (nom. sg. fem.)', required: true },
      { g: 'αὐτῆς, -ῆς', e: 'of, from her (gen. sg. fem.)', required: true },
      { g: 'αὐτῇ, -ῇ', e: 'to, for her (dat. sg. fem.)', required: true },
      { g: 'αὐτήν, -ήν', e: 'her, herself, same (acc. sg. fem.)', required: true },
      { g: 'αὐταί, -αί', e: 'they, themselves, same ones (nom. pl. fem.)', required: true },
      { g: 'αὐταῖς, -αῖς', e: 'to, for them (dat. pl. fem.)', required: true },
      { g: 'αὐτάς, -άς', e: 'them, themselves, same ones (acc. pl. fem.)', required: true },
      { g: 'αὐτό, -ό', e: 'it, itself, same (nom.-acc. sg. neut.)', required: true },
      { g: 'αὐτά, -ά', e: 'they/them, themselves, same things (nom.-acc. pl. neut.)', required: true }
    ]
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
