// Per-lemma morphological knowledge for the parse-feedback lookup and the
// optional-forms drill extension.
//
// `impossibleTenses` / `impossibleVoices` / `impossibleMoods` are the
// "negative" inventory: combinations that CAN'T exist in real Greek for
// this lemma. When the student's picked parse violates one of these, the
// summary's YOUR PARSE line says "[no morph exists]" — a confident
// statement that the form doesn't exist in the language, not just that
// we lack data for it. Combinations that ARE possible but aren't in our
// data still render as "—" (data gap), so the negative lists should only
// enumerate genuine morphological gaps, never just-not-covered-yet ones.
//
// `extraForms` is positive form data, read as a last-resort pool by
// resolveFormForPickedDims when no card carries the form the student's
// picks resolve to. Each entry maps a Greek form to a canonical answer
// string (e.g. "future middle participle genitive singular masc./neut.")
// in the same shape `parseAnswerDimensions` consumes. The lookup is
// ALWAYS consulted regardless of any user toggle — wrong picks deserve a
// canonical-form hint even when the form isn't part of the student's
// drill rotation.
//
// `optionalFormGroups` is the drillable counterpart: each group is a
// `{ chapter, family, forms }` bundle that becomes a set of synthetic
// parsing-drill cards when the "Optional paradigm extensions" toggle is
// ON in the settings panel. `chapter` is the gate (only injected when
// the student's max selected effective chapter ≥ this value), `family`
// labels the group in the parsing UI, and `forms` is the same flat
// `{ form: parsedAnswer }` shape as extraForms. The toggle defaults OFF
// so the standard Duff-aligned card set is the baseline; opting in
// expands a paradigm with morphologically real forms the textbook
// skips.
//
// Convention: build a `forms` map once at top of file, then reference it
// from BOTH `extraForms` (so fallback always works) AND
// `optionalFormGroups` (so the drill toggle picks it up too). This
// keeps the two consumers in sync — adding a form means it appears in
// fallback AND becomes drillable on opt-in.
//
// Lemmas not listed default to "all standard combinations possible."
// Add entries here as new defective lemmas show up in the paradigm
// data, and add `optionalFormGroups` entries for any paradigm exemplar
// (λύω, λόγος, ἀγαθός, …) whose paradigm has slots Duff doesn't drill.
// Keep the bar high on `impossible*` lists: only mark something
// impossible when it genuinely doesn't exist in Greek, not when Duff
// hasn't introduced it yet.

(function () {
  // εἰμί's future middle participle (ἐσόμενος, -ομένη, -όμενον). Declines
  // like λυόμενος. Pedagogically rare — Duff drills only the present
  // participle (ὤν / ὄντες) — but the future participle exists in Koine,
  // so a student picking "future participle ..." on εἰμί should see the
  // canonical form (e.g. ἐσομένου for gen. sg. masc./neut.) instead of
  // either "[no morph exists]" or a wrong-class match like ἔσομαι. Forms
  // syncretic across genders (ἐσόμενον serves masc. acc. sg. + neut. nom./
  // acc. sg.; ἐσόμενα serves neut. nom./acc. pl.) take the parse string
  // that covers the most picks; rarer alternates can be added if a user
  // reports them missing.
  const EIMI_FUTURE_MIDDLE_PARTICIPLE = {
    'ἐσόμενος':  'future middle participle nominative singular masculine',
    'ἐσομένου':  'future middle participle genitive singular masculine/neuter',
    'ἐσομένῳ':   'future middle participle dative singular masculine/neuter',
    'ἐσόμενον':  'future middle participle accusative singular masculine/neuter',
    'ἐσόμενε':   'future middle participle vocative singular masculine',
    'ἐσόμενοι':  'future middle participle nominative plural masculine',
    'ἐσομένους': 'future middle participle accusative plural masculine',
    'ἐσομένων':  'future middle participle genitive plural masculine/feminine/neuter',
    'ἐσομένοις': 'future middle participle dative plural masculine/neuter',
    'ἐσομένη':   'future middle participle nominative singular feminine',
    'ἐσομένης':  'future middle participle genitive singular feminine',
    'ἐσομένῃ':   'future middle participle dative singular feminine',
    'ἐσομένην':  'future middle participle accusative singular feminine',
    'ἐσόμεναι':  'future middle participle nominative plural feminine',
    'ἐσομέναις': 'future middle participle dative plural feminine',
    'ἐσομένας':  'future middle participle accusative plural feminine',
    'ἐσόμενα':   'future middle participle nominative/accusative plural neuter'
  };

  // εἰμί's future middle infinitive. Duff drills only the present
  // infinitive (εἶναι), but ἔσεσθαι is real Koine, so a student picking
  // "future infinitive" on εἰμί should see it instead of falling through
  // to "—". Voice is middle for the same reason as the future participle:
  // εἰμί's future is deponent.
  const EIMI_FUTURE_MIDDLE_INFINITIVE = {
    'ἔσεσθαι': 'future middle infinitive'
  };

  // εἰμί's present active imperative. Duff introduces the imperative mood
  // in Ch 7 but doesn't drill εἰμί's imperative paradigm — students who
  // pick "imperative" for εἰμί otherwise see blank (no form lookup
  // matched). ἔστων is the older classical alternate for 3pl alongside
  // the standard Koine ἔστωσαν; both are real and should resolve cleanly.
  const EIMI_PRESENT_ACTIVE_IMPERATIVE = {
    'ἴσθι':     'present active imperative second person singular',
    'ἔστω':     'present active imperative third person singular',
    'ἔστε':     'present active imperative second person plural',
    'ἔστωσαν':  'present active imperative third person plural',
    'ἔστων':    'present active imperative third person plural'
  };

  // εἰμί's optional-drill groups. Chapter gates:
  // - Ch 7: present imperative (imperative mood is introduced in Ch 7).
  // - Ch 8: future middle infinitive + future middle participle
  //   (W3_EIMI_COMPLETE introduces the future at ch 8 and the student
  //   knows εἰμί's infinitive/participle via W3_EIMI_INFINITIVE_PARTICIPLE
  //   from the same week, so the future-extension of those moods is in
  //   foundational scope).
  const EIMI_OPTIONAL_GROUPS = [
    { chapter: 7, family: 'εἰμί — present active imperative (optional)',
      forms: EIMI_PRESENT_ACTIVE_IMPERATIVE },
    { chapter: 8, family: 'εἰμί — future middle infinitive (optional)',
      forms: EIMI_FUTURE_MIDDLE_INFINITIVE },
    { chapter: 8, family: 'εἰμί — future middle participle (optional)',
      forms: EIMI_FUTURE_MIDDLE_PARTICIPLE }
  ];

  // ─── λύω (model regular ω-verb) ────────────────────────────────────
  //
  // Duff drills present/imperfect/future/aorist active indicative (W2),
  // present/imperfect/future/aorist passive indicative + perfect/
  // pluperfect active (W6), present active imperative + infinitive (W2),
  // present/aorist active participles (W5), aorist passive participle
  // (W6 λυθείς), and present passive imperative + infinitive (W6). The
  // subjunctive is touched only with scattered single-person examples
  // in grammar.js ch 17 (λύῃ 3sg, λύσωσιν 3pl); the rest of the
  // subjunctive paradigm — every other person, every voice — is real
  // Koine but undrilled. Same with non-present infinitives (future
  // active/middle/passive, perfect active and middle/passive), the
  // aorist middle imperative paradigm, and the 3rd-person present
  // middle/passive imperative. These fill the gaps.
  //
  // Notes on syncretic forms: λύῃ is morphologically the 3sg present
  // active subjunctive AND the 2sg present middle/passive subjunctive/
  // imperative — extraForms keys are unique by Greek string, so we
  // pick the parse most pedagogically prominent (the active sub-
  // junctive 3sg form a student picking subjunctive will hit first).
  // λύσῃ has similar overload between aorist active subjunctive 3sg
  // and aorist middle subjunctive 2sg + future indicative 2sg/3sg
  // (the future indicative parse stays in the drilled card pool, so
  // the fallback claim here is the subjunctive reading). λῦσαι is
  // both aorist active infinitive (drilled in W2) and aorist middle
  // imperative 2sg — drilled card wins for the infinitive parse, so
  // the middle-imperative line below resolves only when picks land on
  // the imperative reading.

  const LUO_PRESENT_ACTIVE_SUBJUNCTIVE = {
    'λύω':      'present active subjunctive first person singular',
    'λύῃς':     'present active subjunctive second person singular',
    'λύῃ':      'present active subjunctive third person singular',
    'λύωμεν':   'present active subjunctive first person plural',
    'λύητε':    'present active subjunctive second person plural',
    'λύωσι':    'present active subjunctive third person plural',
    'λύωσιν':   'present active subjunctive third person plural'
  };

  const LUO_AORIST_ACTIVE_SUBJUNCTIVE = {
    'λύσω':     'aorist active subjunctive first person singular',
    'λύσῃς':    'aorist active subjunctive second person singular',
    'λύσῃ':     'aorist active subjunctive third person singular',
    'λύσωμεν':  'aorist active subjunctive first person plural',
    'λύσητε':   'aorist active subjunctive second person plural',
    'λύσωσι':   'aorist active subjunctive third person plural',
    'λύσωσιν':  'aorist active subjunctive third person plural'
  };

  const LUO_AORIST_MIDDLE_SUBJUNCTIVE = {
    'λύσωμαι':   'aorist middle subjunctive first person singular',
    // 'λύσῃ' 2sg collides with the aorist active subjunctive 3sg key
    // above; the active reading is more pedagogically prominent, so we
    // don't shadow it here. A student picking "aorist middle subjunctive
    // 2sg" hits the data-gap "—" instead of a wrong-class match.
    'λύσηται':   'aorist middle subjunctive third person singular',
    'λυσώμεθα':  'aorist middle subjunctive first person plural',
    'λύσησθε':   'aorist middle subjunctive second person plural',
    'λύσωνται':  'aorist middle subjunctive third person plural'
  };

  const LUO_AORIST_PASSIVE_SUBJUNCTIVE = {
    'λυθῶ':     'aorist passive subjunctive first person singular',
    'λυθῇς':    'aorist passive subjunctive second person singular',
    'λυθῇ':     'aorist passive subjunctive third person singular',
    'λυθῶμεν':  'aorist passive subjunctive first person plural',
    'λυθῆτε':   'aorist passive subjunctive second person plural',
    'λυθῶσι':   'aorist passive subjunctive third person plural',
    'λυθῶσιν':  'aorist passive subjunctive third person plural'
  };

  const LUO_PRESENT_MIDDLE_PASSIVE_SUBJUNCTIVE = {
    'λύωμαι':   'present middle/passive subjunctive first person singular',
    // 'λύῃ' 2sg again collides with the present active subjunctive 3sg
    // entry; same reasoning — we don't shadow the active reading.
    'λύηται':   'present middle/passive subjunctive third person singular',
    'λυώμεθα':  'present middle/passive subjunctive first person plural',
    'λύησθε':   'present middle/passive subjunctive second person plural',
    'λύωνται':  'present middle/passive subjunctive third person plural'
  };

  // Non-present active/middle/passive infinitives. λύειν (present
  // active) and λύεσθαι (present m/p) and λῦσαι (aorist active) and
  // λυθῆναι (aorist passive) are drilled; future + perfect aren't.
  const LUO_NONPRESENT_INFINITIVES = {
    'λύσειν':       'future active infinitive',
    'λύσεσθαι':     'future middle infinitive',
    'λυθήσεσθαι':   'future passive infinitive',
    'λελυκέναι':    'perfect active infinitive',
    'λελύσθαι':     'perfect middle/passive infinitive',
    'λύσασθαι':     'aorist middle infinitive'
  };

  // Present middle/passive imperative 3rd person (the 2nd-person forms
  // are drilled in W6_LUO_PASSIVE_OTHER_MOODS). Voice tagged as the
  // syncretic m/p composite — Duff's drilled cards may say "passive"
  // only, so adding the composite covers both pickings.
  const LUO_PRESENT_MP_IMPERATIVE_3P = {
    'λυέσθω':     'present middle/passive imperative third person singular',
    'λυέσθωσαν':  'present middle/passive imperative third person plural'
  };

  // Aorist middle imperative — not drilled at all for λύω. 2sg λῦσαι
  // overlaps with the drilled aorist active infinitive; the drilled
  // card wins for the infinitive parse, but a student picking "aorist
  // middle imperative 2sg" lands on this entry via fallback.
  const LUO_AORIST_MIDDLE_IMPERATIVE = {
    'λῦσαι':       'aorist middle imperative second person singular',
    'λυσάσθω':     'aorist middle imperative third person singular',
    'λύσασθε':     'aorist middle imperative second person plural',
    'λυσάσθωσαν':  'aorist middle imperative third person plural'
  };

  // Aorist passive imperative — 2nd/3rd person all drilled (W6 + W7);
  // nothing to add here. Aorist active imperative similarly complete
  // (W2 + W7).

  // Chapter gates: ω-verb subjunctive is introduced at Ch 17 (W7).
  // Future infinitives are reasonable from Ch 6 (when future indicative
  // is taught); middle/passive future infinitives need Ch 15 (W6
  // introduces the passive system + voice contrasts). Perfect
  // infinitives need Ch 15 (W6 introduces perfect). Middle imperatives
  // are introduced at Ch 7 for the mood + Ch 15 for the voice; gate
  // at max(7,15)=15. 3rd-person m/p imperative gates at Ch 15 (passive
  // intro).
  const LUO_OPTIONAL_GROUPS = [
    { chapter: 6,  family: 'λύω — future active infinitive (optional)',
      forms: { 'λύσειν': 'future active infinitive' } },
    { chapter: 15, family: 'λύω — future middle/passive + perfect infinitives (optional)',
      forms: {
        'λύσεσθαι':    'future middle infinitive',
        'λυθήσεσθαι':  'future passive infinitive',
        'λελυκέναι':   'perfect active infinitive',
        'λελύσθαι':    'perfect middle/passive infinitive',
        'λύσασθαι':    'aorist middle infinitive'
      } },
    { chapter: 15, family: 'λύω — present middle/passive imperative 3rd person (optional)',
      forms: LUO_PRESENT_MP_IMPERATIVE_3P },
    { chapter: 15, family: 'λύω — aorist middle imperative (optional)',
      forms: LUO_AORIST_MIDDLE_IMPERATIVE },
    { chapter: 17, family: 'λύω — present active subjunctive (optional)',
      forms: LUO_PRESENT_ACTIVE_SUBJUNCTIVE },
    { chapter: 17, family: 'λύω — aorist active subjunctive (optional)',
      forms: LUO_AORIST_ACTIVE_SUBJUNCTIVE },
    { chapter: 17, family: 'λύω — aorist middle subjunctive (optional)',
      forms: LUO_AORIST_MIDDLE_SUBJUNCTIVE },
    { chapter: 17, family: 'λύω — aorist passive subjunctive (optional)',
      forms: LUO_AORIST_PASSIVE_SUBJUNCTIVE },
    { chapter: 17, family: 'λύω — present middle/passive subjunctive (optional)',
      forms: LUO_PRESENT_MIDDLE_PASSIVE_SUBJUNCTIVE }
  ];

  // Flat extraForms map for the fallback lookup. Duplicate-key
  // collisions (e.g. λύῃ across active sub + m/p sub) resolve to the
  // last spread wins — order the spreads so the most pedagogically
  // prominent reading sits last for any colliding form.
  const LUO_EXTRA_FORMS = {
    ...LUO_AORIST_MIDDLE_SUBJUNCTIVE,
    ...LUO_PRESENT_MIDDLE_PASSIVE_SUBJUNCTIVE,
    ...LUO_AORIST_PASSIVE_SUBJUNCTIVE,
    ...LUO_NONPRESENT_INFINITIVES,
    ...LUO_PRESENT_MP_IMPERATIVE_3P,
    ...LUO_AORIST_MIDDLE_IMPERATIVE,
    // Active subjunctive last so λύῃ resolves to "present active
    // subjunctive 3sg" (and λύσῃ to "aorist active subjunctive 3sg"),
    // the most common single-form readings for those Greek strings.
    ...LUO_PRESENT_ACTIVE_SUBJUNCTIVE,
    ...LUO_AORIST_ACTIVE_SUBJUNCTIVE
  };

  // ─── ῥύομαι (model middle/deponent) ───────────────────────────────
  //
  // Duff drills present/future/imperfect/aorist middle indicative (W3),
  // present + aorist middle subjunctive (W7), present + aorist middle
  // imperative 2nd person + middle infinitives (W3), and the full
  // present + aorist middle participle declensions (W5). Gaps are
  // narrow: 3rd-person imperatives (Duff stops at 2nd person for
  // ῥύομαι) and the future middle infinitive.

  const RHUOMAI_FUTURE_INFINITIVE = {
    'ῥύσεσθαι': 'future middle infinitive'
  };

  const RHUOMAI_IMPERATIVE_3RD = {
    'ῥυέσθω':      'present middle imperative third person singular',
    'ῥυέσθωσαν':   'present middle imperative third person plural',
    'ῥυσάσθω':     'aorist middle imperative third person singular',
    'ῥυσάσθωσαν':  'aorist middle imperative third person plural'
  };

  const RHUOMAI_OPTIONAL_GROUPS = [
    { chapter: 8, family: 'ῥύομαι — future middle infinitive (optional)',
      forms: RHUOMAI_FUTURE_INFINITIVE },
    { chapter: 8, family: 'ῥύομαι — 3rd-person middle imperative (optional)',
      forms: RHUOMAI_IMPERATIVE_3RD }
  ];

  const RHUOMAI_EXTRA_FORMS = {
    ...RHUOMAI_FUTURE_INFINITIVE,
    ...RHUOMAI_IMPERATIVE_3RD
  };

  // ─── βάλλω (second-aorist model) ──────────────────────────────────
  //
  // Duff drills βάλλω only for aorist active (W4: indicative all 6,
  // imperative 2sg/2pl, infinitive βαλεῖν, masc-nom-only participle
  // βαλών/βαλόντες) and uses it as a stem-pair recall verb everywhere
  // else. Real Koine has the full present/imperfect/future/aorist
  // (passive!)/perfect paradigm for βάλλω — it's an extremely common
  // verb in the NT (throw, cast, put). These fill the indicative
  // gaps, the aorist active subjunctive, the aorist passive, and the
  // perfect active. Liquid-stem future (βαλῶ, contracted) and
  // 2nd-aorist passive (ἐβλήθην with stem shift β/λ) are the
  // pedagogically tricky bits to flag.

  const BALLO_PRESENT_ACTIVE_INDICATIVE = {
    'βάλλω':     'present active indicative first person singular',
    'βάλλεις':   'present active indicative second person singular',
    'βάλλει':    'present active indicative third person singular',
    'βάλλομεν':  'present active indicative first person plural',
    'βάλλετε':   'present active indicative second person plural',
    'βάλλουσι':  'present active indicative third person plural',
    'βάλλουσιν': 'present active indicative third person plural'
  };

  const BALLO_IMPERFECT_ACTIVE_INDICATIVE = {
    'ἔβαλλον':    'imperfect active indicative first person singular',
    // ἔβαλλον is also 3rd person plural (1sg/3pl syncretism in ω-verb
    // imperfect). The 1sg reading takes the unique key; 3pl picks
    // resolve via the drilled-card / fallback walk against any other
    // available pool. Documented to avoid silent overwrite confusion.
    'ἔβαλλες':    'imperfect active indicative second person singular',
    'ἔβαλλε':     'imperfect active indicative third person singular',
    'ἔβαλλεν':    'imperfect active indicative third person singular',
    'ἐβάλλομεν':  'imperfect active indicative first person plural',
    'ἐβάλλετε':   'imperfect active indicative second person plural'
  };

  const BALLO_FUTURE_ACTIVE_INDICATIVE = {
    'βαλῶ':     'future active indicative first person singular',
    'βαλεῖς':   'future active indicative second person singular',
    'βαλεῖ':    'future active indicative third person singular',
    'βαλοῦμεν': 'future active indicative first person plural',
    'βαλεῖτε':  'future active indicative second person plural',
    'βαλοῦσι':  'future active indicative third person plural',
    'βαλοῦσιν': 'future active indicative third person plural'
  };

  const BALLO_AORIST_PASSIVE_INDICATIVE = {
    'ἐβλήθην':   'aorist passive indicative first person singular',
    'ἐβλήθης':   'aorist passive indicative second person singular',
    'ἐβλήθη':    'aorist passive indicative third person singular',
    'ἐβλήθημεν': 'aorist passive indicative first person plural',
    'ἐβλήθητε':  'aorist passive indicative second person plural',
    'ἐβλήθησαν': 'aorist passive indicative third person plural'
  };

  const BALLO_PERFECT_ACTIVE_INDICATIVE = {
    'βέβληκα':    'perfect active indicative first person singular',
    'βέβληκας':   'perfect active indicative second person singular',
    'βέβληκε':    'perfect active indicative third person singular',
    'βέβληκεν':   'perfect active indicative third person singular',
    'βεβλήκαμεν': 'perfect active indicative first person plural',
    'βεβλήκατε':  'perfect active indicative second person plural',
    'βεβλήκασι':  'perfect active indicative third person plural',
    'βεβλήκασιν': 'perfect active indicative third person plural'
  };

  const BALLO_AORIST_ACTIVE_SUBJUNCTIVE = {
    'βάλω':    'aorist active subjunctive first person singular',
    'βάλῃς':   'aorist active subjunctive second person singular',
    'βάλῃ':    'aorist active subjunctive third person singular',
    'βάλωμεν': 'aorist active subjunctive first person plural',
    'βάλητε':  'aorist active subjunctive second person plural',
    'βάλωσι':  'aorist active subjunctive third person plural',
    'βάλωσιν': 'aorist active subjunctive third person plural'
  };

  const BALLO_PRESENT_INFINITIVE = {
    'βάλλειν': 'present active infinitive'
  };

  // 3rd-person aorist active imperative for βάλλω. The 2sg βάλε / 2pl
  // βάλετε are drilled (W4_BALLO_SECOND_AORIST); 3rd person is not.
  const BALLO_AORIST_IMPERATIVE_3RD = {
    'βαλέτω':     'aorist active imperative third person singular',
    'βαλέτωσαν':  'aorist active imperative third person plural'
  };

  // Chapter gates: βάλλω is introduced as a vocab word early but its
  // full paradigm depends on the broader tense/voice system. Gate
  // present/imperfect at ch 10 (W4 — when βάλλω itself becomes a focus
  // via second-aorist); future at ch 10; aorist subjunctive at ch 17;
  // aorist passive + perfect at ch 15 (W6 — passive + perfect intro);
  // 3rd-person aorist imperative at ch 10 (the 2sg/2pl are drilled
  // there, so the 3rd person rounds out the paradigm at the same
  // time).
  const BALLO_OPTIONAL_GROUPS = [
    { chapter: 10, family: 'βάλλω — present active indicative (optional)',
      forms: BALLO_PRESENT_ACTIVE_INDICATIVE },
    { chapter: 10, family: 'βάλλω — imperfect active indicative (optional)',
      forms: BALLO_IMPERFECT_ACTIVE_INDICATIVE },
    { chapter: 10, family: 'βάλλω — future active indicative (liquid stem, optional)',
      forms: BALLO_FUTURE_ACTIVE_INDICATIVE },
    { chapter: 10, family: 'βάλλω — present active infinitive (optional)',
      forms: BALLO_PRESENT_INFINITIVE },
    { chapter: 10, family: 'βάλλω — 3rd-person aorist active imperative (optional)',
      forms: BALLO_AORIST_IMPERATIVE_3RD },
    { chapter: 15, family: 'βάλλω — aorist passive indicative (optional)',
      forms: BALLO_AORIST_PASSIVE_INDICATIVE },
    { chapter: 15, family: 'βάλλω — perfect active indicative (optional)',
      forms: BALLO_PERFECT_ACTIVE_INDICATIVE },
    { chapter: 17, family: 'βάλλω — aorist active subjunctive (optional)',
      forms: BALLO_AORIST_ACTIVE_SUBJUNCTIVE }
  ];

  const BALLO_EXTRA_FORMS = {
    ...BALLO_PRESENT_ACTIVE_INDICATIVE,
    ...BALLO_IMPERFECT_ACTIVE_INDICATIVE,
    ...BALLO_FUTURE_ACTIVE_INDICATIVE,
    ...BALLO_PRESENT_INFINITIVE,
    ...BALLO_AORIST_IMPERATIVE_3RD,
    ...BALLO_AORIST_PASSIVE_INDICATIVE,
    ...BALLO_PERFECT_ACTIVE_INDICATIVE,
    ...BALLO_AORIST_ACTIVE_SUBJUNCTIVE
  };

  // ─── γίνομαι (second-aorist deponent — ubiquitous in NT) ──────────
  //
  // Per the audit γίνομαι is drilled only for the aorist middle
  // subjunctive (W7) and as a stem-pair recall entry ("γίνομαι →
  // ἐγενόμην"). The actual indicative paradigm — including the
  // famous aorist middle ἐγένετο, perfect active γέγονα, and aorist
  // middle infinitive γενέσθαι, all extremely common in the Greek
  // NT — has no drill cards. Filling these gaps is the highest-
  // pedagogical-value addition in this batch.
  //
  // Note on voice: γίνομαι is deponent middle in the present, future,
  // imperfect, and aorist; the perfect (γέγονα) is morphologically
  // active and meaning-active. The aorist passive (ἐγενήθην) is
  // genuinely passive in form, sometimes used with active meaning in
  // Koine. We tag voices per Greek-grammar convention.

  const GINOMAI_PRESENT_MIDDLE_INDICATIVE = {
    'γίνομαι':   'present middle indicative first person singular',
    'γίνῃ':      'present middle indicative second person singular',
    'γίνεται':   'present middle indicative third person singular',
    'γινόμεθα':  'present middle indicative first person plural',
    'γίνεσθε':   'present middle indicative second person plural',
    'γίνονται':  'present middle indicative third person plural'
  };

  const GINOMAI_IMPERFECT_MIDDLE_INDICATIVE = {
    'ἐγινόμην':  'imperfect middle indicative first person singular',
    'ἐγίνου':    'imperfect middle indicative second person singular',
    'ἐγίνετο':   'imperfect middle indicative third person singular',
    'ἐγινόμεθα': 'imperfect middle indicative first person plural',
    'ἐγίνεσθε':  'imperfect middle indicative second person plural',
    'ἐγίνοντο':  'imperfect middle indicative third person plural'
  };

  const GINOMAI_FUTURE_MIDDLE_INDICATIVE = {
    'γενήσομαι':  'future middle indicative first person singular',
    'γενήσῃ':     'future middle indicative second person singular',
    'γενήσεται':  'future middle indicative third person singular',
    'γενησόμεθα': 'future middle indicative first person plural',
    'γενήσεσθε':  'future middle indicative second person plural',
    'γενήσονται': 'future middle indicative third person plural'
  };

  const GINOMAI_AORIST_MIDDLE_INDICATIVE = {
    'ἐγενόμην':   'aorist middle indicative first person singular',
    'ἐγένου':     'aorist middle indicative second person singular',
    'ἐγένετο':    'aorist middle indicative third person singular',
    'ἐγενόμεθα':  'aorist middle indicative first person plural',
    'ἐγένεσθε':   'aorist middle indicative second person plural',
    'ἐγένοντο':   'aorist middle indicative third person plural'
  };

  const GINOMAI_AORIST_PASSIVE_INDICATIVE = {
    'ἐγενήθην':   'aorist passive indicative first person singular',
    'ἐγενήθης':   'aorist passive indicative second person singular',
    'ἐγενήθη':    'aorist passive indicative third person singular',
    'ἐγενήθημεν': 'aorist passive indicative first person plural',
    'ἐγενήθητε':  'aorist passive indicative second person plural',
    'ἐγενήθησαν': 'aorist passive indicative third person plural'
  };

  const GINOMAI_PERFECT_ACTIVE_INDICATIVE = {
    'γέγονα':    'perfect active indicative first person singular',
    'γέγονας':   'perfect active indicative second person singular',
    'γέγονε':    'perfect active indicative third person singular',
    'γέγονεν':   'perfect active indicative third person singular',
    'γεγόναμεν': 'perfect active indicative first person plural',
    'γεγόνατε':  'perfect active indicative second person plural',
    'γεγόνασι':  'perfect active indicative third person plural',
    'γεγόνασιν': 'perfect active indicative third person plural'
  };

  const GINOMAI_AORIST_MIDDLE_INFINITIVE = {
    'γενέσθαι': 'aorist middle infinitive'
  };

  const GINOMAI_PRESENT_MIDDLE_INFINITIVE = {
    'γίνεσθαι': 'present middle infinitive'
  };

  const GINOMAI_AORIST_MIDDLE_IMPERATIVE = {
    'γενοῦ':       'aorist middle imperative second person singular',
    'γενέσθω':     'aorist middle imperative third person singular',
    'γένεσθε':     'aorist middle imperative second person plural',
    'γενέσθωσαν':  'aorist middle imperative third person plural'
  };

  // Chapter gates: γίνομαι is a vocab introduction-era word (it appears
  // in early chapters as a deponent verb). The present/imperfect/
  // future middle indicatives gate at ch 8 (the chapter Duff
  // introduces middle/deponent verbs alongside the W3 ῥύομαι treatment).
  // 2nd-aorist forms (ἐγενόμην series, infinitive γενέσθαι, imperative
  // γενοῦ) gate at ch 10 (W4 — second aorist intro). Perfect active
  // and aorist passive gate at ch 15 (W6 — passive + perfect intro).
  const GINOMAI_OPTIONAL_GROUPS = [
    { chapter: 8,  family: 'γίνομαι — present middle indicative (optional)',
      forms: GINOMAI_PRESENT_MIDDLE_INDICATIVE },
    { chapter: 8,  family: 'γίνομαι — imperfect middle indicative (optional)',
      forms: GINOMAI_IMPERFECT_MIDDLE_INDICATIVE },
    { chapter: 8,  family: 'γίνομαι — future middle indicative (optional)',
      forms: GINOMAI_FUTURE_MIDDLE_INDICATIVE },
    { chapter: 8,  family: 'γίνομαι — present middle infinitive (optional)',
      forms: GINOMAI_PRESENT_MIDDLE_INFINITIVE },
    { chapter: 10, family: 'γίνομαι — aorist middle indicative (2nd aorist, optional)',
      forms: GINOMAI_AORIST_MIDDLE_INDICATIVE },
    { chapter: 10, family: 'γίνομαι — aorist middle infinitive γενέσθαι (optional)',
      forms: GINOMAI_AORIST_MIDDLE_INFINITIVE },
    { chapter: 10, family: 'γίνομαι — aorist middle imperative (optional)',
      forms: GINOMAI_AORIST_MIDDLE_IMPERATIVE },
    { chapter: 15, family: 'γίνομαι — aorist passive indicative (optional)',
      forms: GINOMAI_AORIST_PASSIVE_INDICATIVE },
    { chapter: 15, family: 'γίνομαι — perfect active indicative γέγονα (optional)',
      forms: GINOMAI_PERFECT_ACTIVE_INDICATIVE }
  ];

  const GINOMAI_EXTRA_FORMS = {
    ...GINOMAI_PRESENT_MIDDLE_INDICATIVE,
    ...GINOMAI_IMPERFECT_MIDDLE_INDICATIVE,
    ...GINOMAI_FUTURE_MIDDLE_INDICATIVE,
    ...GINOMAI_AORIST_MIDDLE_INDICATIVE,
    ...GINOMAI_AORIST_PASSIVE_INDICATIVE,
    ...GINOMAI_PERFECT_ACTIVE_INDICATIVE,
    ...GINOMAI_AORIST_MIDDLE_INFINITIVE,
    ...GINOMAI_PRESENT_MIDDLE_INFINITIVE,
    ...GINOMAI_AORIST_MIDDLE_IMPERATIVE
  };

  const LEMMA_INVENTORY = {
    'εἰμί': {
      // εἰμί is suppletive: it has no aorist or perfect family — Greek
      // uses other roots (γέγονα, ἐγενόμην) for those senses. Tenses
      // εἰμί does have: present, future, imperfect (and a rarely-
      // attested perfect that classical/Koine pedagogy treats as
      // absent). Voice: εἰμί is active in the present/imperfect but
      // deponent middle in the future (ἔσομαι, ἐσόμενος, ἔσεσθαι) — so
      // we can't blanket-block middle/passive at the lemma level; it'd
      // wrongly tag every future-middle pick as impossible. Until the
      // inventory shape supports tense-conditional voice gating, leave
      // voice open. Moods exist for some tenses (subjunctive ὦ,
      // imperative ἴσθι, infinitive εἶναι/ἔσεσθαι, participle ὤν/
      // ἐσόμενος) so don't blanket-mark moods here either.
      impossibleTenses: ['aorist', 'first aorist', 'second aorist', 'perfect', 'pluperfect'],
      extraForms: {
        ...EIMI_FUTURE_MIDDLE_PARTICIPLE,
        ...EIMI_FUTURE_MIDDLE_INFINITIVE,
        ...EIMI_PRESENT_ACTIVE_IMPERATIVE
      },
      optionalFormGroups: EIMI_OPTIONAL_GROUPS
    },
    'λύω': {
      extraForms: LUO_EXTRA_FORMS,
      optionalFormGroups: LUO_OPTIONAL_GROUPS
    },
    'ῥύομαι': {
      extraForms: RHUOMAI_EXTRA_FORMS,
      optionalFormGroups: RHUOMAI_OPTIONAL_GROUPS
    },
    'βάλλω': {
      extraForms: BALLO_EXTRA_FORMS,
      optionalFormGroups: BALLO_OPTIONAL_GROUPS
    },
    'γίνομαι': {
      extraForms: GINOMAI_EXTRA_FORMS,
      optionalFormGroups: GINOMAI_OPTIONAL_GROUPS
    }
    // Add more defective lemmas here (e.g. οἶδα — no present form, the
    // perfect serves as present; χρή — only third singular, etc.) when
    // the data grows to include them. For paradigm exemplars (λύω,
    // λόγος, ἀγαθός, …) whose paradigms have undrilled corners, add
    // both `extraForms` (always-on fallback) and `optionalFormGroups`
    // (toggle-gated drill cards) — reference a shared `forms` map so
    // the two stay in sync.
  };

  if (typeof window !== 'undefined') window.LEMMA_INVENTORY = LEMMA_INVENTORY;
})();
