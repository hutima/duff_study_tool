(function () {
  const MORPHOLOGY_SETS = {
    "2": {
      label: "Chapter 2 Morphology",
      notes: "Definite article and second-declension masculine endings",
      items: [
        {
          family: "Definite article",
          lemma: "ὁ, ἡ, τό",
          gloss: "the",
          questions: [
            { form: "ὁ", answer: "nominative singular masculine" },
            { form: "τοῦ", answer: "genitive singular masculine/neuter" },
            { form: "τῷ", answer: "dative singular masculine/neuter" },
            { form: "τόν", answer: "accusative singular masculine" },
            { form: "οἱ", answer: "nominative plural masculine" },
            { form: "τῶν", answer: "genitive plural (all genders)" },
            { form: "τοῖς", answer: "dative plural masculine/neuter" },
            { form: "τούς", answer: "accusative plural masculine" },
            { form: "ἡ", answer: "nominative singular feminine" },
            { form: "τῆς", answer: "genitive singular feminine" },
            { form: "τῇ", answer: "dative singular feminine" },
            { form: "τήν", answer: "accusative singular feminine" },
            { form: "αἱ", answer: "nominative plural feminine" },
            { form: "ταῖς", answer: "dative plural feminine" },
            { form: "τάς", answer: "accusative plural feminine" },
            { form: "τό", answer: "nominative/accusative singular neuter" },
            { form: "τά", answer: "nominative/accusative plural neuter" }
          ]
        },
        {
          family: "Second declension masculine",
          lemma: "λόγος",
          gloss: "word, message",
          questions: [
            { form: "λόγος", answer: "nominative singular masculine" },
            { form: "λόγου", answer: "genitive singular masculine" },
            { form: "λόγῳ", answer: "dative singular masculine" },
            { form: "λόγον", answer: "accusative singular masculine" },
            { form: "λόγοι", answer: "nominative plural masculine" },
            { form: "λόγων", answer: "genitive plural masculine" },
            { form: "λόγοις", answer: "dative plural masculine" },
            { form: "λόγους", answer: "accusative plural masculine" }
          ]
        }
      ]
    },
    "3": {
      label: "Chapter 3 Morphology",
      notes: "First-declension feminine and second-declension neuter endings",
      items: [
        {
          family: "First declension feminine (eta pattern)",
          lemma: "φωνή",
          gloss: "voice, sound",
          questions: [
            { form: "φωνή", answer: "nominative singular feminine" },
            { form: "φωνῆς", answer: "genitive singular feminine" },
            { form: "φωνῇ", answer: "dative singular feminine" },
            { form: "φωνήν", answer: "accusative singular feminine" },
            { form: "φωναί", answer: "nominative plural feminine" },
            { form: "φωνῶν", answer: "genitive plural feminine" },
            { form: "φωναῖς", answer: "dative plural feminine" },
            { form: "φωνάς", answer: "accusative plural feminine" }
          ]
        },
        {
          family: "First declension feminine (alpha pattern)",
          lemma: "ἁμαρτία",
          gloss: "sin",
          questions: [
            { form: "ἁμαρτία", answer: "nominative singular feminine" },
            { form: "ἁμαρτίας", answer: "genitive singular feminine" },
            { form: "ἁμαρτίᾳ", answer: "dative singular feminine" },
            { form: "ἁμαρτίαν", answer: "accusative singular feminine" },
            { form: "ἁμαρτίαι", answer: "nominative plural feminine" },
            { form: "ἁμαρτιῶν", answer: "genitive plural feminine" },
            { form: "ἁμαρτίαις", answer: "dative plural feminine" },
            { form: "ἁμαρτίας", answer: "accusative plural feminine" }
          ]
        },
        {
          family: "Second declension neuter",
          lemma: "ἔργον",
          gloss: "work, deed",
          questions: [
            { form: "ἔργον", answer: "nominative/accusative singular neuter" },
            { form: "ἔργου", answer: "genitive singular neuter" },
            { form: "ἔργῳ", answer: "dative singular neuter" },
            { form: "ἔργα", answer: "nominative/accusative plural neuter" },
            { form: "ἔργων", answer: "genitive plural neuter" },
            { form: "ἔργοις", answer: "dative plural neuter" }
          ]
        }
      ]
    }
  };

  function localShuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function stableMorphKey(text) {
    return String(text || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}+/gu, '')
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .toLowerCase()
      .replace(/^-+|-+$/g, '');
  }

  function pickDistractors(correctAnswer, preferredPool, fallbackPool) {
    const distractors = [];
    const seen = new Set([correctAnswer]);

    const pushFrom = (pool) => {
      for (const item of localShuffle(pool)) {
        if (seen.has(item)) continue;
        seen.add(item);
        distractors.push(item);
        if (distractors.length >= 3) break;
      }
    };

    pushFrom(preferredPool);
    if (distractors.length < 3) pushFrom(fallbackPool);

    return distractors.slice(0, 3);
  }

  function buildMorphologyCardsForKeys(keys) {
    const selected = (keys || []).map(String);
    const allAnswers = [];
    selected.forEach((key) => {
      const set = MORPHOLOGY_SETS[key];
      if (!set) return;
      set.items.forEach((item) => {
        item.questions.forEach((q) => allAnswers.push(q.answer));
      });
    });

    const cards = [];
    selected.forEach((key) => {
      const set = MORPHOLOGY_SETS[key];
      if (!set) return;

      set.items.forEach((item, itemIdx) => {
        const itemAnswers = item.questions.map((q) => q.answer);
        item.questions.forEach((q, qIdx) => {
          const distractors = pickDistractors(q.answer, itemAnswers, allAnswers);
          const choices = localShuffle([q.answer, ...distractors]);
          cards.push({
            id: `morph-${key}-${itemIdx}-${qIdx}-${stableMorphKey(item.lemma)}-${stableMorphKey(q.form)}-${stableMorphKey(q.answer)}`,
            kind: 'morph',
            required: true,
            sourceKey: String(key),
            sourceLabel: set.label,
            chapter: Number(key),
            family: item.family,
            lemma: item.lemma,
            gloss: item.gloss,
            form: q.form,
            prompt: 'Parse this form.',
            context: q.context || '',
            note: q.note || '',
            answer: q.answer,
            choices
          });
        });
      });
    });

    return cards;
  }

  function getMorphologyCountForKey(key) {
    const set = MORPHOLOGY_SETS[String(key)];
    if (!set) return 0;
    return set.items.reduce((sum, item) => sum + item.questions.length, 0);
  }

  window.MORPHOLOGY_SETS = MORPHOLOGY_SETS;
  window.buildMorphologyCardsForKeys = buildMorphologyCardsForKeys;
  window.getMorphologyCountForKey = getMorphologyCountForKey;
})();


// ──────────────────────────────────────────────────────
//  WEEKLY MORPHOLOGY SUPPLEMENTS
// ──────────────────────────────────────────────────────
(function () {
  const supplementalSets = {
    W1O: {
      label: 'Week 1 Morphology Supplement',
      notes: 'Contract-verb present forms, αὐτός, and εἰμί',
      items: [
        {
          family: 'Contract verb present active indicative',
          lemma: 'φιλέω',
          gloss: 'I love, like',
          questions: [
            { form: 'φιλῶ', context: 'ἐγὼ τὸν φίλον φιλῶ.', answer: 'present active indicative, 1st singular', note: 'In isolation, φιλῶ can also be present active subjunctive, 1st singular. The short context points to the indicative.' },
            { form: 'φιλεῖς', answer: 'present active indicative, 2nd singular' },
            { form: 'φιλεῖ', answer: 'present active indicative, 3rd singular' },
            { form: 'φιλοῦμεν', answer: 'present active indicative, 1st plural' },
            { form: 'φιλεῖτε', answer: 'present active indicative, 2nd plural' },
            { form: 'φιλοῦσι(ν)', answer: 'present active indicative, 3rd plural' }
          ]
        },
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
        },
        {
          family: 'Present indicative of εἰμί',
          lemma: 'εἰμί',
          gloss: 'I am',
          questions: [
            { form: 'εἰμί', answer: 'present active indicative, 1st singular' },
            { form: 'εἶ', answer: 'present active indicative, 2nd singular' },
            { form: 'ἐστί(ν)', answer: 'present active indicative, 3rd singular' },
            { form: 'ἐσμέν', answer: 'present active indicative, 1st plural' },
            { form: 'ἐστέ', answer: 'present active indicative, 2nd plural' },
            { form: 'εἰσί(ν)', answer: 'present active indicative, 3rd plural' }
          ]
        }
      ]
    },
    W2O: {
      label: 'Week 2 Morphology Supplement',
      notes: 'Indicative paradigms, active imperative, and active masculine participles',
      items: [
        {
          family: 'Master indicative paradigm',
          lemma: 'λύω',
          gloss: 'I untie',
          questions: [
            { form: 'λύω', context: 'ἐγὼ τὸν δεσμὸν λύω.', answer: 'present active indicative, 1st singular', note: 'In isolation, λύω can also be present active subjunctive, 1st singular. The context keeps the form honest.' },
            { form: 'λύσεις', answer: 'future active indicative, 2nd singular' },
            { form: 'λύσει', answer: 'future active indicative, 3rd singular' },
            { form: 'ἐλύομεν', answer: 'imperfect active indicative, 1st plural' },
            { form: 'ἔλυσα', answer: 'aorist active indicative, 1st singular' },
            { form: 'ἐλύσαμεν', answer: 'aorist active indicative, 1st plural' }
          ]
        },
        {
          family: 'Active imperative',
          lemma: 'λύω',
          gloss: 'untie!',
          questions: [
            { form: 'λῦε', answer: 'present active imperative, 2nd singular' },
            { form: 'λυέτω', answer: 'present active imperative, 3rd singular' },
            { form: 'λύετε', context: 'ὑμεῖς τὸν δεσμὸν λύετε.', answer: 'present active indicative, 2nd plural', note: 'Placed in context to distinguish it from the identical present active imperative, 2nd plural.' },
            { form: 'λῦσον', answer: 'aorist active imperative, 2nd singular' }
          ]
        },
        {
          family: 'Present active masculine participle',
          lemma: 'λύων',
          gloss: 'loosening',
          questions: [
            { form: 'λύων', answer: 'nominative singular masculine, present active participle' },
            { form: 'λύοντος', answer: 'genitive singular masculine/neuter, present active participle' },
            { form: 'λύοντι', answer: 'dative singular masculine/neuter, present active participle' },
            { form: 'λύοντα', answer: 'accusative singular masculine, present active participle' },
            { form: 'λύοντες', answer: 'nominative plural masculine, present active participle' },
            { form: 'λύοντας', answer: 'accusative plural masculine, present active participle' }
          ]
        }
      ]
    },
    W3O: {
      label: 'Week 3 Morphology Supplement',
      notes: 'Middle voice, εἰμί infinitive / participle, and demonstratives',
      items: [
        {
          family: 'Present middle/passive indicative',
          lemma: 'λύομαι',
          gloss: 'I am being untied / I untie for myself',
          questions: [
            { form: 'λύομαι', answer: 'present middle/passive indicative, 1st singular' },
            { form: 'λύεται', answer: 'present middle/passive indicative, 3rd singular' },
            { form: 'λυόμεθα', answer: 'present middle/passive indicative, 1st plural' },
            { form: 'λύεσθε', answer: 'present middle/passive indicative, 2nd plural' },
            { form: 'λύονται', answer: 'present middle/passive indicative, 3rd plural' }
          ]
        },
        {
          family: 'εἰμί infinitive and participle',
          lemma: 'εἰμί',
          gloss: 'to be / being',
          questions: [
            { form: 'εἶναι', answer: 'present infinitive' },
            { form: 'ὤν', answer: 'nominative singular masculine, present participle' },
            { form: 'οὖσα', answer: 'nominative singular feminine, present participle' },
            { form: 'ὄν', answer: 'nominative/accusative singular neuter, present participle' }
          ]
        },
        {
          family: 'Near and far demonstratives',
          lemma: 'οὗτος / ἐκεῖνος',
          gloss: 'this / that',
          questions: [
            { form: 'οὗτος', answer: 'nominative singular masculine' },
            { form: 'αὕτη', answer: 'nominative singular feminine' },
            { form: 'τοῦτο', answer: 'nominative/accusative singular neuter' },
            { form: 'ἐκεῖνος', answer: 'nominative singular masculine' },
            { form: 'ἐκείνη', answer: 'nominative singular feminine' },
            { form: 'ἐκεῖνο', answer: 'nominative/accusative singular neuter' }
          ]
        }
      ]
    },
    W4O: {
      label: 'Week 4 Morphology Supplement',
      notes: 'Second aorist and liquid-future forms',
      items: [
        {
          family: 'Second aorist paradigm',
          lemma: 'λαμβάνω',
          gloss: 'I take, receive',
          questions: [
            { form: 'ἔλαβον', context: 'ἐγὼ τὸ βιβλίον ἔλαβον.', answer: 'aorist active indicative, 1st singular', note: 'In isolation, ἔλαβον can also be aorist active indicative, 3rd plural. The supplied context points to 1st singular.' },
            { form: 'ἔλαβες', answer: 'aorist active indicative, 2nd singular' },
            { form: 'ἔλαβεν', answer: 'aorist active indicative, 3rd singular' },
            { form: 'ἐλάβομεν', answer: 'aorist active indicative, 1st plural' },
            { form: 'ἐλάβετε', answer: 'aorist active indicative, 2nd plural' }
          ]
        },
        {
          family: 'Future liquid stems',
          lemma: 'μένω',
          gloss: 'I remain',
          questions: [
            { form: 'μενεῖς', answer: 'future active indicative, 2nd singular' },
            { form: 'μενεῖ', answer: 'future active indicative, 3rd singular' },
            { form: 'μενοῦμεν', answer: 'future active indicative, 1st plural' },
            { form: 'μενεῖτε', answer: 'future active indicative, 2nd plural' }
          ]
        }
      ]
    },
    W5O: {
      label: 'Week 5 Morphology Supplement',
      notes: 'Third-declension stem classes and participial patterns',
      items: [
        {
          family: 'Third declension k-stem',
          lemma: 'σάρξ, σαρκός',
          gloss: 'flesh',
          questions: [
            { form: 'σάρξ', answer: 'nominative singular feminine' },
            { form: 'σαρκός', answer: 'genitive singular feminine' },
            { form: 'σαρκί', answer: 'dative singular feminine' },
            { form: 'σάρκα', answer: 'accusative singular feminine' },
            { form: 'σάρκες', answer: 'nominative plural feminine' }
          ]
        },
        {
          family: 'Third declension n-stem',
          lemma: 'ποιμήν, ποιμένος',
          gloss: 'shepherd',
          questions: [
            { form: 'ποιμήν', answer: 'nominative singular masculine' },
            { form: 'ποιμένος', answer: 'genitive singular masculine' },
            { form: 'ποιμένι', answer: 'dative singular masculine' },
            { form: 'ποιμένα', answer: 'accusative singular masculine' },
            { form: 'ποιμένες', answer: 'nominative plural masculine' }
          ]
        },
        {
          family: 'Present middle/passive participle',
          lemma: 'λυόμενος',
          gloss: 'being untied / untying for oneself',
          questions: [
            { form: 'λυόμενος', answer: 'nominative singular masculine, present middle/passive participle' },
            { form: 'λυομένου', answer: 'genitive singular masculine/neuter, present middle/passive participle' },
            { form: 'λυομένῳ', answer: 'dative singular masculine/neuter, present middle/passive participle' },
            { form: 'λυόμενον', answer: 'accusative singular masculine, present middle/passive participle' }
          ]
        }
      ]
    },
    W6O: {
      label: 'Week 6 Morphology Supplement',
      notes: 'Passive forms, passive participles, perfect, and pluperfect',
      items: [
        {
          family: 'Passive forms',
          lemma: 'λύω',
          gloss: 'I am / was / will be untied',
          questions: [
            { form: 'ἐλύθην', answer: 'aorist passive indicative, 1st singular' },
            { form: 'λύθητι', answer: 'aorist passive imperative, 2nd singular' },
            { form: 'λυθήσεται', answer: 'future passive indicative, 3rd singular' },
            { form: 'λυθῆναι', answer: 'aorist passive infinitive' }
          ]
        },
        {
          family: 'Aorist passive participle',
          lemma: 'λυθείς, λυθεῖσα, λυθέν',
          gloss: 'having been untied',
          questions: [
            { form: 'λυθείς', answer: 'nominative singular masculine, aorist passive participle' },
            { form: 'λυθεῖσα', answer: 'nominative singular feminine, aorist passive participle' },
            { form: 'λυθέν', answer: 'nominative/accusative singular neuter, aorist passive participle' }
          ]
        },
        {
          family: 'Perfect and pluperfect',
          lemma: 'λύω',
          gloss: 'I have untied / I had untied',
          questions: [
            { form: 'λέλυκα', answer: 'perfect active indicative, 1st singular' },
            { form: 'λελύκαμεν', answer: 'perfect active indicative, 1st plural' },
            { form: 'ἐλελύκειν', answer: 'pluperfect active indicative, 1st singular' }
          ]
        }
      ]
    },
    W7O: {
      label: 'Week 7 Morphology Supplement',
      notes: 'Subjunctive forms and third-person imperatives',
      items: [
        {
          family: 'Present active subjunctive',
          lemma: 'λύω',
          gloss: 'I may untie',
          questions: [
            { form: 'λύῃς', answer: 'present active subjunctive, 2nd singular' },
            { form: 'λύῃ', answer: 'present active subjunctive, 3rd singular' },
            { form: 'λύωμεν', answer: 'present active subjunctive, 1st plural' },
            { form: 'λύητε', answer: 'present active subjunctive, 2nd plural' },
            { form: 'λύωσι(ν)', answer: 'present active subjunctive, 3rd plural' }
          ]
        },
        {
          family: 'Third-person imperative',
          lemma: 'λύω',
          gloss: 'let him/her untie',
          questions: [
            { form: 'λυέτω', answer: 'present active imperative, 3rd singular' },
            { form: 'λυσάτω', answer: 'aorist active imperative, 3rd singular' }
          ]
        }
      ]
    },
    W8O: {
      label: 'Week 8 Morphology Supplement',
      notes: '-μι present active, other active tenses, and middle/passive forms',
      items: [
        {
          family: '-μι present active',
          lemma: 'δίδωμι',
          gloss: 'I give',
          questions: [
            { form: 'δίδωμι', answer: 'present active indicative, 1st singular' },
            { form: 'δίδως', answer: 'present active indicative, 2nd singular' },
            { form: 'δίδωσι(ν)', answer: 'present active indicative, 3rd singular' },
            { form: 'δίδομεν', answer: 'present active indicative, 1st plural' },
            { form: 'δίδοτε', context: 'ὑμεῖς τὸ δῶρον δίδοτε.', answer: 'present active indicative, 2nd plural', note: 'In isolation, δίδοτε can also be present active imperative, 2nd plural. The context points to the indicative.' },
            { form: 'διδόασι(ν)', answer: 'present active indicative, 3rd plural' }
          ]
        },
        {
          family: '-μι other active tenses',
          lemma: 'δίδωμι',
          gloss: 'I shall give / I gave / I have given',
          questions: [
            { form: 'δώσω', answer: 'future active indicative, 1st singular' },
            { form: 'δώσομεν', answer: 'future active indicative, 1st plural' },
            { form: 'ἔδωκεν', answer: 'aorist active indicative, 3rd singular' },
            { form: 'δέδωκεν', answer: 'perfect active indicative, 3rd singular' }
          ]
        },
        {
          family: '-μι middle/passive',
          lemma: 'δίδομαι',
          gloss: 'I am given / I give for myself',
          questions: [
            { form: 'δίδομαι', answer: 'present middle/passive indicative, 1st singular' },
            { form: 'δίδοται', answer: 'present middle/passive indicative, 3rd singular' },
            { form: 'διδόμεθα', answer: 'present middle/passive indicative, 1st plural' },
            { form: 'δίδοσθε', answer: 'present middle/passive indicative, 2nd plural' }
          ]
        }
      ]
    }
  };

  const target = window.MORPHOLOGY_SETS || {};
  Object.entries(supplementalSets).forEach(([key, set]) => {
    if (!target[key]) {
      target[key] = set;
    } else {
      target[key].label = set.label;
      target[key].notes = set.notes;
      target[key].items = [...(target[key].items || []), ...(set.items || [])];
    }
  });
})();
