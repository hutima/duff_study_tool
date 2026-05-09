(function () {
  const supplementalVocabSets = {
    W1O: {
      label: 'Week 1 - Supplement',
      week: 1,
      cards: [
        { g: 'φιλῶ', e: 'I love/like (present active indicative, 1st singular)', required: true },
        { g: 'φιλεῖς', e: 'you love/like (present active indicative, 2nd singular)', required: true },
        { g: 'φιλεῖ', e: 'he/she/it loves/likes (present active indicative, 3rd singular)', required: true },
        { g: 'φιλοῦμεν', e: 'we love/like (present active indicative, 1st plural)', required: true },
        { g: 'φιλεῖτε', e: 'you all love/like (present active indicative, 2nd plural)', required: true },
        { g: 'φιλοῦσι(ν)', e: 'they love/like (present active indicative, 3rd plural)', required: true },
        { g: 'αὐτός', e: 'he/himself/same (nominative singular masculine)', required: true },
        { g: 'αὐτοῦ', e: 'of him/it; of himself/itself (genitive singular masculine/neuter)', required: true },
        { g: 'αὐτῷ', e: 'to/for him/it; to/for himself/itself (dative singular masculine/neuter)', required: true },
        { g: 'αὐτή', e: 'she/herself/same (nominative singular feminine)', required: true },
        { g: 'αὐτό', e: 'it/itself/same (nominative/accusative singular neuter)', required: true },
        { g: 'αὐτοί', e: 'they/themselves/same (nominative plural masculine)', required: true },
        { g: 'αὐταί', e: 'they/themselves/same (nominative plural feminine)', required: true },
        { g: 'αὐτά', e: 'they/themselves/same (nominative/accusative plural neuter)', required: true },
        { g: 'εἰμί', e: 'I am (present active indicative, 1st singular)', required: true },
        { g: 'εἶ', e: 'you are (present active indicative, 2nd singular)', required: true },
        { g: 'ἐστί(ν)', e: 'he/she/it is (present active indicative, 3rd singular)', required: true },
        { g: 'ἐσμέν', e: 'we are (present active indicative, 1st plural)', required: true },
        { g: 'ἐστέ', e: 'you all are (present active indicative, 2nd plural)', required: true },
        { g: 'εἰσί(ν)', e: 'they are (present active indicative, 3rd plural)', required: true }
      ]
    },
    W2O: {
      label: 'Week 2 - Supplement',
      week: 2,
      cards: [
        { g: 'λύω', e: 'I untie (present active indicative, 1st singular)', required: true },
        { g: 'λύσεις', e: 'you will untie (future active indicative, 2nd singular)', required: true },
        { g: 'λύσει', e: 'he/she/it will untie (future active indicative, 3rd singular)', required: true },
        { g: 'ἐλύομεν', e: 'we were untying (imperfect active indicative, 1st plural)', required: true },
        { g: 'ἔλυσα', e: 'I untied (aorist active indicative, 1st singular)', required: true },
        { g: 'ἐλύσαμεν', e: 'we untied (aorist active indicative, 1st plural)', required: true },
        { g: 'λῦε', e: 'untie! (present active imperative, 2nd singular)', required: true },
        { g: 'λυέτω', e: 'let him/her untie (present active imperative, 3rd singular)', required: true },
        { g: 'λύετε', e: 'you all untie (present active indicative, 2nd plural)', required: true },
        { g: 'λῦσον', e: 'untie! (aorist active imperative, 2nd singular)', required: true },
        { g: 'λύων', e: 'loosening (nominative singular masculine, present active participle)', required: true },
        { g: 'λύοντος', e: 'of a loosening one/thing (genitive singular masculine/neuter, present active participle)', required: true },
        { g: 'λύοντι', e: 'to/for a loosening one/thing (dative singular masculine/neuter, present active participle)', required: true },
        { g: 'λύοντα', e: 'loosening one (accusative singular masculine, present active participle)', required: true },
        { g: 'λύοντες', e: 'loosening ones (nominative plural masculine, present active participle)', required: true },
        { g: 'λύοντας', e: 'loosening ones (accusative plural masculine, present active participle)', required: true }
      ]
    },
    W3O: {
      label: 'Week 3 - Supplement',
      week: 3,
      cards: [
        { g: 'λύομαι', e: 'I am being untied / I untie for myself (present middle/passive indicative, 1st singular)', required: true },
        { g: 'λύεται', e: 'he/she/it is being untied / unties for himself/herself/itself (present middle/passive indicative, 3rd singular)', required: true },
        { g: 'λυόμεθα', e: 'we are being untied / untie for ourselves (present middle/passive indicative, 1st plural)', required: true },
        { g: 'λύεσθε', e: 'you all are being untied / untie for yourselves (present middle/passive indicative, 2nd plural)', required: true },
        { g: 'λύονται', e: 'they are being untied / untie for themselves (present middle/passive indicative, 3rd plural)', required: true },
        { g: 'εἶναι', e: 'to be (present infinitive)', required: true },
        { g: 'ὤν', e: 'being (nominative singular masculine, present participle)', required: true },
        { g: 'οὖσα', e: 'being (nominative singular feminine, present participle)', required: true },
        { g: 'ὄν', e: 'being (nominative/accusative singular neuter, present participle)', required: true },
        { g: 'οὗτος', e: 'this (nominative singular masculine)', required: true },
        { g: 'αὕτη', e: 'this (nominative singular feminine)', required: true },
        { g: 'τοῦτο', e: 'this (nominative/accusative singular neuter)', required: true },
        { g: 'ἐκεῖνος', e: 'that (nominative singular masculine)', required: true },
        { g: 'ἐκείνη', e: 'that (nominative singular feminine)', required: true },
        { g: 'ἐκεῖνο', e: 'that (nominative/accusative singular neuter)', required: true }
      ]
    },
    W4O: {
      label: 'Week 4 - Supplement',
      week: 4,
      cards: [
        { g: 'ἔλαβον', e: 'I took/received (aorist active indicative, 1st singular)', required: true },
        { g: 'ἔλαβες', e: 'you took/received (aorist active indicative, 2nd singular)', required: true },
        { g: 'ἔλαβεν', e: 'he/she/it took/received (aorist active indicative, 3rd singular)', required: true },
        { g: 'ἐλάβομεν', e: 'we took/received (aorist active indicative, 1st plural)', required: true },
        { g: 'ἐλάβετε', e: 'you all took/received (aorist active indicative, 2nd plural)', required: true },
        { g: 'μενεῖς', e: 'you will remain (future active indicative, 2nd singular)', required: true },
        { g: 'μενεῖ', e: 'he/she/it will remain (future active indicative, 3rd singular)', required: true },
        { g: 'μενοῦμεν', e: 'we will remain (future active indicative, 1st plural)', required: true },
        { g: 'μενεῖτε', e: 'you all will remain (future active indicative, 2nd plural)', required: true }
      ]
    },
    W5O: {
      label: 'Week 5 - Supplement',
      week: 5,
      cards: [
        { g: 'σάρξ', e: 'flesh (nominative singular feminine)', required: true },
        { g: 'σαρκός', e: 'of flesh (genitive singular feminine)', required: true },
        { g: 'σαρκί', e: 'to/for flesh (dative singular feminine)', required: true },
        { g: 'σάρκα', e: 'flesh (accusative singular feminine)', required: true },
        { g: 'σάρκες', e: 'fleshes (nominative plural feminine)', required: true },
        { g: 'ποιμήν', e: 'shepherd (nominative singular masculine)', required: true },
        { g: 'ποιμένος', e: 'of a shepherd (genitive singular masculine)', required: true },
        { g: 'ποιμένι', e: 'to/for a shepherd (dative singular masculine)', required: true },
        { g: 'ποιμένα', e: 'shepherd (accusative singular masculine)', required: true },
        { g: 'ποιμένες', e: 'shepherds (nominative plural masculine)', required: true },
        { g: 'λυόμενος', e: 'being untied / untying for oneself (nominative singular masculine, present middle/passive participle)', required: true },
        { g: 'λυομένου', e: 'of one/thing being untied or untying for oneself (genitive singular masculine/neuter, present middle/passive participle)', required: true },
        { g: 'λυομένῳ', e: 'to/for one/thing being untied or untying for oneself (dative singular masculine/neuter, present middle/passive participle)', required: true },
        { g: 'λυόμενον', e: 'one being untied / untying for oneself (accusative singular masculine, present middle/passive participle)', required: true }
      ]
    },
    W6O: {
      label: 'Week 6 - Supplement',
      week: 6,
      cards: [
        { g: 'ἐλύθην', e: 'I was untied (aorist passive indicative, 1st singular)', required: true },
        { g: 'λύθητι', e: 'be untied! (aorist passive imperative, 2nd singular)', required: true },
        { g: 'λυθήσεται', e: 'he/she/it will be untied (future passive indicative, 3rd singular)', required: true },
        { g: 'λυθῆναι', e: 'to be untied (aorist passive infinitive)', required: true },
        { g: 'λυθείς', e: 'having been untied (nominative singular masculine, aorist passive participle)', required: true },
        { g: 'λυθεῖσα', e: 'having been untied (nominative singular feminine, aorist passive participle)', required: true },
        { g: 'λυθέν', e: 'having been untied (nominative/accusative singular neuter, aorist passive participle)', required: true },
        { g: 'λέλυκα', e: 'I have untied (perfect active indicative, 1st singular)', required: true },
        { g: 'λελύκαμεν', e: 'we have untied (perfect active indicative, 1st plural)', required: true },
        { g: 'ἐλελύκειν', e: 'I had untied (pluperfect active indicative, 1st singular)', required: true }
      ]
    },
    W7O: {
      label: 'Week 7 - Supplement',
      week: 7,
      cards: [
        { g: 'λύῃς', e: 'you may untie (present active subjunctive, 2nd singular)', required: true },
        { g: 'λύῃ', e: 'he/she/it may untie (present active subjunctive, 3rd singular)', required: true },
        { g: 'λύωμεν', e: 'we may untie (present active subjunctive, 1st plural)', required: true },
        { g: 'λύητε', e: 'you all may untie (present active subjunctive, 2nd plural)', required: true },
        { g: 'λύωσι(ν)', e: 'they may untie (present active subjunctive, 3rd plural)', required: true },
        { g: 'λυέτω', e: 'let him/her untie (present active imperative, 3rd singular)', required: true },
        { g: 'λυσάτω', e: 'let him/her untie (aorist active imperative, 3rd singular)', required: true }
      ]
    },
    W8O: {
      label: 'Week 8 - Supplement',
      week: 8,
      cards: [
        { g: 'δίδωμι', e: 'I give (present active indicative, 1st singular)', required: true },
        { g: 'δίδως', e: 'you give (present active indicative, 2nd singular)', required: true },
        { g: 'δίδωσι(ν)', e: 'he/she/it gives (present active indicative, 3rd singular)', required: true },
        { g: 'δίδομεν', e: 'we give (present active indicative, 1st plural)', required: true },
        { g: 'δίδοτε', e: 'you all give (present active indicative, 2nd plural)', required: true },
        { g: 'διδόασι(ν)', e: 'they give (present active indicative, 3rd plural)', required: true },
        { g: 'δώσω', e: 'I shall give (future active indicative, 1st singular)', required: true },
        { g: 'δώσομεν', e: 'we shall give (future active indicative, 1st plural)', required: true },
        { g: 'ἔδωκεν', e: 'he/she/it gave (aorist active indicative, 3rd singular)', required: true },
        { g: 'δέδωκεν', e: 'he/she/it has given (perfect active indicative, 3rd singular)', required: true },
        { g: 'δίδομαι', e: 'I am given / I give for myself (present middle/passive indicative, 1st singular)', required: true },
        { g: 'δίδοται', e: 'he/she/it is given / gives for himself/herself/itself (present middle/passive indicative, 3rd singular)', required: true },
        { g: 'διδόμεθα', e: 'we are given / give for ourselves (present middle/passive indicative, 1st plural)', required: true },
        { g: 'δίδοσθε', e: 'you all are given / give for yourselves (present middle/passive indicative, 2nd plural)', required: true }
      ]
    }
  };

  Object.entries(supplementalVocabSets).forEach(([key, set]) => {
    window.registerSupplementalVocabSet(key, set);
  });
})();
