(function () {
  const KEY = 'W1_NOUN_PATTERNS';

  window.registerSupplementalVocabSet(KEY, {
    label: 'λόγος / ἀρχή / ἔργον-paradigm',
    week: 1,
    cards: [
      // Definite article — masculine
      { g: 'ὁ', e: 'the (nom. sg. masc.)', required: true },
      { g: 'τοῦ', e: 'of, from the (gen. sg. masc.-neut.)', required: true },
      { g: 'τῷ', e: 'to, for, in the (dat. sg. masc.-neut.)', required: true },
      { g: 'τόν', e: 'the (acc. sg. masc.)', required: true },
      { g: 'οἱ', e: 'the (nom. pl. masc.)', required: true },
      { g: 'τῶν', e: 'of, from the (gen. pl. masc.-fem.-neut.)', required: true },
      { g: 'τοῖς', e: 'to, for, in the (dat. pl. masc.-neut.)', required: true },
      { g: 'τούς', e: 'the (acc. pl. masc.)', required: true },
      // Definite article — feminine
      { g: 'ἡ, -η', e: 'the (nom. sg. fem.)', required: true },
      { g: 'τῆς, -ῆς', e: 'of, from the (gen. sg. fem.)', required: true },
      { g: 'τῇ, -ῇ', e: 'to, for, in the (dat. sg. fem.)', required: true },
      { g: 'τήν, -ήν', e: 'the (acc. sg. fem.)', required: true },
      { g: 'αἱ, -αι', e: 'the (nom. pl. fem.)', required: true },
      { g: 'ταῖς, -αῖς', e: 'to, for, in the (dat. pl. fem.)', required: true },
      { g: 'τάς, -άς', e: 'the (acc. pl. fem.)', required: true },
      // Definite article — neuter
      { g: 'τό, -ό', e: 'the (nom.-acc. sg. neut.)', required: true },
      { g: 'τά, -ά', e: 'the (nom.-acc. pl. neut.)', required: true },
      // ἀρχή — 1st decl. η-type (fem.)
      { g: '(ἡ) ἀρχή, -ή', e: 'the beginning (nom. sg. fem., 1st decl.)', required: true },
      { g: '(τῆς) ἀρχῆς, -ῆς', e: 'of the beginning (gen. sg. fem., 1st decl.)', required: true },
      { g: '(τῇ) ἀρχῇ, -ῇ', e: 'to/for the beginning (dat. sg. fem., 1st decl.)', required: true },
      { g: '(τὴν) ἀρχήν, -ήν', e: 'the beginning (acc. sg. fem., 1st decl.)', required: true },
      { g: '(αἱ) ἀρχαί, -αί', e: 'the beginnings (nom. pl. fem., 1st decl.)', required: true },
      { g: '(τῶν) ἀρχῶν, -ῶν', e: 'of the beginnings (gen. pl. fem., 1st decl.)', required: true },
      { g: '(ταῖς) ἀρχαῖς, -αῖς', e: 'to/for the beginnings (dat. pl. fem., 1st decl.)', required: true },
      { g: '(τὰς) ἀρχάς, -άς', e: 'the beginnings (acc. pl. fem., 1st decl.)', required: true },
      // ἔργον — 2nd decl. neut.
      { g: '(τὸ) ἔργον, -ον', e: 'the work, deed (nom.-acc. sg. neut., 2nd decl.)', required: true },
      { g: '(τοῦ) ἔργου, -ου', e: 'of the work (gen. sg. neut., 2nd decl.)', required: true },
      { g: '(τῷ) ἔργῳ, -ῳ', e: 'to/for the work (dat. sg. neut., 2nd decl.)', required: true },
      { g: '(τὰ) ἔργα, -α', e: 'the works (nom.-acc. pl. neut., 2nd decl.)', required: true },
      { g: '(τῶν) ἔργων, -ων', e: 'of the works (gen. pl. neut., 2nd decl.)', required: true },
      { g: '(τοῖς) ἔργοις, -οις', e: 'to/for the works (dat. pl. neut., 2nd decl.)', required: true },
      // ἡμέρα — 1st decl. α-type (fem.)
      { g: 'ἡμέρα, -α', e: 'day (nom. sg. fem., α-type)', required: true },
      { g: 'ἡμέρας, -ας', e: 'of day (gen. sg. fem., α-type)', required: true },
      { g: 'ἡμέρᾳ, -ᾳ', e: 'to/for day (dat. sg. fem., α-type)', required: true },
      { g: 'ἡμέραν, -αν', e: 'day (acc. sg. fem., α-type)', required: true },
      { g: 'ἡμέραι, -αι', e: 'days (nom. pl. fem., α-type)', required: true },
      { g: 'ἡμερῶν, -ῶν', e: 'of days (gen. pl. fem., α-type)', required: true },
      { g: 'ἡμέραις, -αις', e: 'to/for days (dat. pl. fem., α-type)', required: true },
      { g: 'ἡμέρας, -ας', e: 'days (acc. pl. fem., α-type)', required: true },
      // δόξα — 1st decl. mixed type (fem.)
      { g: 'δόξα, -α', e: 'glory (nom. sg. fem., mixed type)', required: true },
      { g: 'δόξης, -ης', e: 'of glory (gen. sg. fem., mixed type)', required: true },
      { g: 'δόξῃ, -ῃ', e: 'to/for glory (dat. sg. fem., mixed type)', required: true },
      { g: 'δόξαν, -αν', e: 'glory (acc. sg. fem., mixed type)', required: true },
      { g: 'δόξαι, -αι', e: 'glories (nom. pl. fem., mixed type)', required: true },
      { g: 'δοξῶν, -ῶν', e: 'of glories (gen. pl. fem., mixed type)', required: true },
      { g: 'δόξαις, -αις', e: 'to/for glories (dat. pl. fem., mixed type)', required: true },
      { g: 'δόξας, -ας', e: 'glories (acc. pl. fem., mixed type)', required: true }
    ]
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
