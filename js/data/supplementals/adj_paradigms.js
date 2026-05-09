(function () {
  const KEY = 'W1_ADJ_PARADIGMS';

  window.registerSupplementalVocabSet(KEY, {
    label: 'πολύς / μέγας-paradigm',
    week: 1,
    cards: [
      // πολύς — irregular adj. (masc.)
      { g: 'πολύς, -ύς', e: 'much, many (nom. sg. masc.)', required: true },
      { g: 'πολλοῦ, -οῦ', e: 'much, many (gen. sg. masc.)', required: true },
      { g: 'πολλῷ, -ῷ', e: 'much, many (dat. sg. masc.)', required: true },
      { g: 'πολύν, -ύν', e: 'much, many (acc. sg. masc.)', required: true },
      { g: 'πολλοί, -οί', e: 'much, many (nom. pl. masc.)', required: true },
      { g: 'πολλῶν, -ῶν', e: 'much, many (gen. pl.)', required: true },
      { g: 'πολλοῖς, -οῖς', e: 'much, many (dat. pl. masc.)', required: true },
      { g: 'πολλούς, -ούς', e: 'much, many (acc. pl. masc.)', required: true },
      // πολύς — irregular adj. (fem.)
      { g: 'πολλή, -ή', e: 'much, many (nom. sg. fem.)', required: true },
      { g: 'πολλῆς, -ῆς', e: 'much, many (gen. sg. fem.)', required: true },
      { g: 'πολλῇ, -ῇ', e: 'much, many (dat. sg. fem.)', required: true },
      { g: 'πολλήν, -ήν', e: 'much, many (acc. sg. fem.)', required: true },
      { g: 'πολλαί, -αί', e: 'much, many (nom. pl. fem.)', required: true },
      { g: 'πολλαῖς, -αῖς', e: 'much, many (dat. pl. fem.)', required: true },
      { g: 'πολλάς, -άς', e: 'much, many (acc. pl. fem.)', required: true },
      // πολύς — irregular adj. (neut.)
      { g: 'πολύ, -ύ', e: 'much, many (nom.-acc. sg. neut.)', required: true },
      { g: 'πολλά, -ά', e: 'much, many (nom.-acc. pl. neut.)', required: true },
      // μέγας — irregular adj. (masc.)
      { g: 'μέγας, -ας', e: 'great (nom. sg. masc.)', required: true },
      { g: 'μεγάλου, -ου', e: 'great (gen. sg. masc.)', required: true },
      { g: 'μεγάλῳ, -ῳ', e: 'great (dat. sg. masc.)', required: true },
      { g: 'μέγαν, -αν', e: 'great (acc. sg. masc.)', required: true },
      { g: 'μεγάλοι, -οι', e: 'great (nom. pl. masc.)', required: true },
      { g: 'μεγάλων, -ων', e: 'great (gen. pl.)', required: true },
      { g: 'μεγάλοις, -οις', e: 'great (dat. pl. masc.)', required: true },
      { g: 'μεγάλους, -ους', e: 'great (acc. pl. masc.)', required: true },
      // μέγας — irregular adj. (fem.)
      { g: 'μεγάλη, -η', e: 'great (nom. sg. fem.)', required: true },
      { g: 'μεγάλης, -ης', e: 'great (gen. sg. fem.)', required: true },
      { g: 'μεγάλῃ, -ῃ', e: 'great (dat. sg. fem.)', required: true },
      { g: 'μεγάλην, -ην', e: 'great (acc. sg. fem.)', required: true },
      { g: 'μεγάλαι, -αι', e: 'great (nom. pl. fem.)', required: true },
      { g: 'μεγάλαις, -αις', e: 'great (dat. pl. fem.)', required: true },
      { g: 'μεγάλας, -ας', e: 'great (acc. pl. fem.)', required: true },
      // μέγας — irregular adj. (neut.)
      { g: 'μέγα, -α', e: 'great (nom.-acc. sg. neut.)', required: true },
      { g: 'μεγάλα, -α', e: 'great (nom.-acc. pl. neut.)', required: true }
    ]
  });

  window.registerSupplementalGrammarSet(KEY, {
    label: 'πολύς / μέγας-paradigm',
    notes: 'Week 1 paradigm: irregular adjectives πολύς and μέγας.',
    items: [
      {
        family: 'Irregular adjective recognition',
        lemma: 'πολύς / μέγας',
        gloss: 'much/many · great',
        questions: [
          {
            form: 'πολύς',
            prompt: 'Why is this form irregular?',
            answer: 'πολύς/πολύ use short stems in nom./acc. sg. masc./neut.; all other forms use πολλ-',
            choices: [
              'πολύς/πολύ use short stems in nom./acc. sg. masc./neut.; all other forms use πολλ-',
              'It follows the 3rd declension throughout',
              'It is a contract adjective',
              'It lacks a feminine form'
            ]
          },
          {
            form: 'μέγας',
            prompt: 'Why is this form irregular?',
            answer: 'μέγας/μέγα use short stems in nom./acc. sg. masc./neut.; all other forms use μεγαλ-',
            choices: [
              'μέγας/μέγα use short stems in nom./acc. sg. masc./neut.; all other forms use μεγαλ-',
              'It is a 3rd declension adjective throughout',
              'It contracts like a verb',
              'It lacks a neuter form'
            ]
          }
        ]
      }
    ]
  });
})();
