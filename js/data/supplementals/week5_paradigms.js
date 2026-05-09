(function () {
  const KEY = 'W5_MEMORIZATION_PARADIGMS';
  const LABEL = 'Week 5 memorization paradigms';

  window.registerSupplementalVocabSet(KEY, {
    label: LABEL,
    week: 5,
    cards: [
      { g: 'σάρξ, σαρκός, σαρκί, σάρκα', e: 'third-declension k-stem singular: flesh', required: true },
      { g: 'ποιμήν, ποιμένος, ποιμένι, ποιμένα', e: 'third-declension n-stem singular: shepherd', required: true },
      { g: 'γένος, γένους, γένει, γένος', e: 'third-declension s-stem neuter singular: kind/race', required: true },
      { g: 'λύων, λύουσα, λῦον', e: 'present active participle', required: true },
      { g: 'λυσάμενος, λυσαμένη, λυσάμενον', e: 'aorist middle participle', required: true },
      { g: 'λυόμενος, λυομένη, λυόμενον', e: 'present middle/passive participle', required: true }
    ]
  });

  window.registerSupplementalGrammarSet(KEY, {
    label: LABEL,
    notes: 'Week 5 required paradigms: third-declension stems and participial paradigms.',
    items: [
      {
        family: 'Third declension stems',
        lemma: 'σάρξ / ποιμήν / γένος',
        gloss: 'flesh / shepherd / kind',
        questions: [
          { form: 'σαρκός', prompt: 'Identify this form.', answer: 'genitive singular feminine of σάρξ', choices: ['genitive singular feminine of σάρξ', 'nominative singular feminine of σάρξ', 'dative plural feminine of σάρξ', 'accusative singular feminine of σάρξ'] },
          { form: 'ποιμένες', prompt: 'Identify this form.', answer: 'nominative plural masculine of ποιμήν', choices: ['nominative plural masculine of ποιμήν', 'accusative plural masculine of ποιμήν', 'genitive singular masculine of ποιμήν', 'dative singular masculine of ποιμήν'] },
          { form: 'γένη', prompt: 'Identify this form.', answer: 'nominative/accusative plural neuter of γένος', choices: ['nominative/accusative plural neuter of γένος', 'genitive singular neuter of γένος', 'dative singular neuter of γένος', 'nominative singular neuter of γένος'] }
        ]
      },
      {
        family: 'Participial paradigms',
        lemma: 'λύω',
        gloss: 'I untie',
        questions: [
          { form: 'λύοντος', prompt: 'Parse this participle.', answer: 'genitive singular masculine/neuter, present active participle', choices: ['genitive singular masculine/neuter, present active participle', 'nominative singular masculine, present active participle', 'accusative singular masculine, aorist active participle', 'genitive singular masculine/neuter, present middle participle'] },
          { form: 'λυσάμενοι', prompt: 'Parse this participle.', answer: 'nominative plural masculine, aorist middle participle', choices: ['nominative plural masculine, aorist middle participle', 'nominative plural masculine, present middle participle', 'accusative plural masculine, aorist active participle', 'genitive singular masculine, aorist middle participle'] },
          { form: 'λυομένης', prompt: 'Parse this participle.', answer: 'genitive singular feminine, present middle/passive participle', choices: ['genitive singular feminine, present middle/passive participle', 'accusative plural feminine, present active participle', 'nominative singular feminine, aorist passive participle', 'genitive singular feminine, aorist middle participle'] }
        ]
      }
    ]
  });

  window.registerSupplementalMorphologySet(KEY, {
    label: LABEL,
    notes: 'Week 5 paradigm drill: third-declension nouns and participles.',
    items: [
      {
        family: 'Third declension samples',
        lemma: 'σάρξ / ποιμήν / γένος',
        gloss: 'flesh / shepherd / kind',
        questions: [
          { form: 'σαρκί', answer: 'dative singular feminine of σάρξ' },
          { form: 'σάρκες', answer: 'nominative plural feminine of σάρξ' },
          { form: 'ποιμένα', answer: 'accusative singular masculine of ποιμήν' },
          { form: 'ποιμένων', answer: 'genitive plural masculine of ποιμήν' },
          { form: 'γένει', answer: 'dative singular neuter of γένος' },
          { form: 'γενῶν', answer: 'genitive plural neuter of γένος' }
        ]
      },
      {
        family: 'Participles',
        lemma: 'λύω',
        gloss: 'I untie',
        questions: [
          { form: 'λύοντες', answer: 'nominative plural masculine, present active participle' },
          { form: 'λυούσης', answer: 'genitive singular feminine, present active participle' },
          { form: 'λύσασα', answer: 'nominative singular feminine, aorist active participle' },
          { form: 'λύσαντος', answer: 'genitive singular masculine/neuter, aorist active participle' },
          { form: 'λυόμενον', answer: 'accusative singular masculine or nominative/accusative singular neuter, present middle/passive participle' },
          { form: 'λυσάμενον', answer: 'accusative singular masculine or nominative/accusative singular neuter, aorist middle participle' }
        ]
      }
    ]
  });
})();
