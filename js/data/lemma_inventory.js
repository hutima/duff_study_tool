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
