// Koine Greek memorization-by-week phone tables.
// Exposed globally so the static GitHub Pages app can render the module
// without a build step.
const KOINE_GREEK_MEMORIZATION_PHONE_TABLES = [
  {
    week: 'Week 1',
    focus: 'Alphabet, present active patterns, noun cases, adjectives, αὐτός, εἰμί',
    rows: [
      { item: 'Alphabet', forms: 'α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ/ς τ υ φ χ ψ ω', cue: 'Name, sound, and write each lower-case letter.' },
      { item: 'Present active indicative', forms: 'λύω · λύεις · λύει · λύομεν · λύετε · λύουσι(ν)', cue: 'Memorize person/number endings: -ω, -εις, -ει, -ομεν, -ετε, -ουσι(ν).' },
      { item: 'Present active infinitive', forms: 'λύειν', cue: 'Translate with “to …” unless context requires another English shape.' },
      { item: 'Article pattern', forms: 'ὁ · ἡ · τό / τοῦ · τῆς · τοῦ / τῷ · τῇ · τῷ / τόν · τήν · τό', cue: 'Recite nominative, genitive, dative, accusative by gender.' },
      { item: 'εἰμί present', forms: 'εἰμί · εἶ · ἐστί(ν) · ἐσμέν · ἐστέ · εἰσί(ν)', cue: 'Linking verb: “I am, you are, he/she/it is…”' }
    ]
  },
  {
    week: 'Week 2',
    focus: 'Indicative paradigms, contract verbs, moods, imperatives, active participles',
    rows: [
      { item: 'Present active imperative', forms: 'λῦε · λυέτω · λύετε · λυόντων', cue: 'Command forms: 2nd singular, 3rd singular, 2nd plural, 3rd plural.' },
      { item: 'Present active subjunctive', forms: 'λύω · λύῃς · λύῃ · λύωμεν · λύητε · λύωσι(ν)', cue: 'Look for lengthened theme vowel: ω / η.' },
      { item: 'Present active optative', forms: 'λύοιμι · λύοις · λύοι · λύοιμεν · λύοιτε · λύοιεν', cue: 'Look for οι before secondary personal endings.' },
      { item: 'Present active participle', forms: 'λύων · λύουσα · λῦον', cue: 'Translate “loosing,” “while loosing,” or adjectivally by context.' },
      { item: 'Contract verb clue', forms: 'φιλέω → φιλῶ; φιλέεις → φιλεῖς; φιλέει → φιλεῖ', cue: 'Contract vowels when ε/α/ο stems meet thematic endings.' }
    ]
  },
  {
    week: 'Week 3',
    focus: 'Middle voice, εἰμί infinitive/participle, demonstratives, personal pronouns',
    rows: [
      { item: 'Present middle/passive indicative', forms: 'λύομαι · λύῃ/λύει · λύεται · λυόμεθα · λύεσθε · λύονται', cue: 'Middle/passive primary endings begin with -μαι, -σαι/-ῃ, -ται.' },
      { item: 'Middle infinitive', forms: 'λύεσθαι', cue: 'The -σθαι ending marks middle/passive infinitive.' },
      { item: 'Middle/passive participle', forms: 'λυόμενος · λυομένη · λυόμενον', cue: 'Memorize like first/second-declension adjective endings.' },
      { item: 'εἰμί infinitive/participle', forms: 'εἶναι · ὤν, οὖσα, ὄν', cue: 'Being / to be forms are high-frequency and irregular.' },
      { item: 'Demonstratives', forms: 'οὗτος, αὕτη, τοῦτο · ἐκεῖνος, ἐκείνη, ἐκεῖνο', cue: 'Near = this; far = that. Watch article + demonstrative position.' }
    ]
  },
  {
    week: 'Week 4',
    focus: 'Relative pronouns, second aorist, liquid futures, midterm review',
    rows: [
      { item: 'Relative pronoun', forms: 'ὅς · ἥ · ὅ', cue: 'Agrees with antecedent in gender/number; case comes from its clause.' },
      { item: 'Second aorist active indicative', forms: 'ἔλαβον · ἔλαβες · ἔλαβε(ν) · ἐλάβομεν · ἐλάβετε · ἔλαβον', cue: 'Augment + aorist stem + secondary endings, usually no σα.' },
      { item: 'Second aorist infinitive', forms: 'λαβεῖν', cue: 'Accent often helps distinguish from present infinitive patterns.' },
      { item: 'Second aorist participle', forms: 'λαβών · λαβοῦσα · λαβόν', cue: 'Third-declension masculine/neuter; first-declension feminine.' },
      { item: 'Liquid future clue', forms: 'μένω → μενῶ; ἀποστέλλω → ἀποστελῶ', cue: 'Liquid stems often form futures without σα.' }
    ]
  },
  {
    week: 'Week 5',
    focus: 'Third declension stems and participial paradigms',
    rows: [
      { item: 'Third-declension case endings', forms: '-ς/— · -ος · -ι · -α / -ες · -ων · -σι(ν) · -ας', cue: 'Memorize endings separately from stem changes.' },
      { item: 'Neuter rule', forms: 'Nom. = Acc.; plural often -α', cue: 'Neuter nominative and accusative forms match.' },
      { item: 'Present active participle', forms: 'λύων · λύουσα · λῦον', cue: 'Review masculine/feminine/neuter full declension.' },
      { item: 'Aorist active participle', forms: 'λύσας · λύσασα · λῦσαν', cue: 'First aorist participle uses σα markers.' },
      { item: 'Participle translation stack', forms: 'adjectival · circumstantial · substantival', cue: 'Ask whether it modifies, supplies circumstance, or acts as a noun.' }
    ]
  },
  {
    week: 'Week 6',
    focus: 'Passive endings, passive moods/participles, perfect and pluperfect',
    rows: [
      { item: 'Aorist passive indicative', forms: 'ἐλύθην · ἐλύθης · ἐλύθη · ἐλύθημεν · ἐλύθητε · ἐλύθησαν', cue: 'θη/η + secondary active endings marks aorist passive.' },
      { item: 'Aorist passive infinitive', forms: 'λυθῆναι', cue: 'Memorize θῆναι as a core passive infinitive signal.' },
      { item: 'Aorist passive participle', forms: 'λυθείς · λυθεῖσα · λυθέν', cue: 'Third-declension masculine/neuter; first-declension feminine.' },
      { item: 'Perfect active indicative', forms: 'λέλυκα · λέλυκας · λέλυκε(ν) · λελύκαμεν · λελύκατε · λελύκασι(ν)', cue: 'Reduplication + κα often signals perfect active.' },
      { item: 'Pluperfect active clue', forms: 'ἐλελύκειν', cue: 'Augment + reduplication points to past-state perfective sense.' }
    ]
  },
  {
    week: 'Week 7',
    focus: 'Subjunctive mood, aspect, indefinite constructions, third-person imperatives',
    rows: [
      { item: 'Aorist active subjunctive', forms: 'λύσω · λύσῃς · λύσῃ · λύσωμεν · λύσητε · λύσωσι(ν)', cue: 'No augment; σα + long subjunctive vowel.' },
      { item: 'Aorist middle subjunctive', forms: 'λύσωμαι · λύσῃ · λύσηται · λυσώμεθα · λύσησθε · λύσωνται', cue: 'Middle endings with aorist σα marker.' },
      { item: 'Aspect contrast', forms: 'present = ongoing/process; aorist = whole event', cue: 'Choose aspect from form before forcing an English tense.' },
      { item: 'Indefinite construction', forms: 'ὅς ἄν / ἐάν patterns', cue: 'ἄν often flags contingency or indefiniteness.' },
      { item: 'Third-person imperative', forms: 'λυέτω · λυσάτω · λυθήτω', cue: 'Translate “let him/her/it …” or “he/she/it must …” by context.' }
    ]
  },
  {
    week: 'Week 8',
    focus: '-μι verbs, other tenses, middle voice review, final exam consolidation',
    rows: [
      { item: 'δίδωμι present active', forms: 'δίδωμι · δίδως · δίδωσι(ν) · δίδομεν · δίδοτε · διδόασι(ν)', cue: 'Memorize as a model for reduplicated -μι presents.' },
      { item: 'τίθημι present active', forms: 'τίθημι · τίθης · τίθησι(ν) · τίθεμεν · τίθετε · τιθέασι(ν)', cue: 'Watch stem vowel alternation between singular and plural.' },
      { item: 'ἵστημι present active', forms: 'ἵστημι · ἵστης · ἵστησι(ν) · ἵσταμεν · ἵστατε · ἱστᾶσι(ν)', cue: 'Breathing and reduplication are part of the lexical shape.' },
      { item: 'Aorist middle review', forms: 'ἐλυσάμην · ἐλύσω · ἐλύσατο · ἐλυσάμεθα · ἐλύσασθε · ἐλύσαντο', cue: 'Secondary middle endings attach to the aorist stem.' },
      { item: 'Final review rhythm', forms: 'vocabulary · paradigms · parsing · translation', cue: 'Cycle daily: recite, write, parse, then translate in context.' }
    ]
  }
];

window.KOINE_GREEK_MEMORIZATION_PHONE_TABLES = KOINE_GREEK_MEMORIZATION_PHONE_TABLES;
