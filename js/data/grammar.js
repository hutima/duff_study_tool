// ═══════════════════════════════════════════════════════════════════════
//  GRAMMAR DATA — Elementary New Testament Greek (Wycliffe WYB1513YY)
// ═══════════════════════════════════════════════════════════════════════
//  Consolidated grammar drills covering textbook chapters 1–20 and the
//  eight lecture-week supplements (W1O–W8O). Multiple-choice only.
//  Forms are stored explicitly rather than generated, to keep accents
//  and endings honest.
//
//  Replaces three previous files:
//    js/data/grammar.js         (first-pass)
//    js/data/grammar_extra.js   (second-pass additions)
//    js/data/grammar_focus.js   (third-pass focused drills)
//
//  Card-shape contract (consumed by app.js / pos_logic.js):
//    {
//      id:        string   (regenerated each session)
//      kind:      'morph'  (multiple-choice prompt)
//      required:  true
//      sourceKey: string   ("1"–"20" or "W1O"–"W8O")
//      sourceLabel, chapter, family, lemma, gloss,
//      form, prompt, context, note, answer, choices[]
//    }
//
//  Each `questions[].choices` array is canonical here; the builder
//  shuffles it (and dedupes the answer) before returning.
// ═══════════════════════════════════════════════════════════════════════

(function () {

  // ───────────────────────────────────────────────────────────────────
  //  CHAPTER GRAMMAR — textbook chapters 1 through 20
  // ───────────────────────────────────────────────────────────────────
  const CHAPTER_GRAMMAR = {

    // ─────────────────────────────────────────────────────────────
    "1": {
      label: "Chapter 1 Grammar",
      notes: "Alphabet, breathings, diphthongs, iota subscript",
      items: [
        {
          family: "Alphabet — letter recognition",
          lemma: "Greek alphabet",
          gloss: "letter names",
          questions: [
            { form: "α", prompt: "Which letter is this?", answer: "alpha",
              choices: ["alpha", "lambda", "delta", "eta"] },
            { form: "β", prompt: "Which letter is this?", answer: "beta",
              choices: ["beta", "theta", "delta", "rho"] },
            { form: "γ", prompt: "Which letter is this?", answer: "gamma",
              choices: ["gamma", "tau", "rho", "upsilon"] },
            { form: "δ", prompt: "Which letter is this?", answer: "delta",
              choices: ["delta", "alpha", "lambda", "omega"] },
            { form: "ε", prompt: "Which letter is this?", answer: "epsilon",
              choices: ["epsilon", "eta", "iota", "omicron"] },
            { form: "ζ", prompt: "Which letter is this?", answer: "zeta",
              choices: ["zeta", "xi", "sigma", "psi"] },
            { form: "η", prompt: "Which letter is this?", answer: "eta",
              choices: ["eta", "epsilon", "nu", "iota"] },
            { form: "θ", prompt: "Which letter is this?", answer: "theta",
              choices: ["theta", "omicron", "phi", "beta"] },
            { form: "λ", prompt: "Which letter is this?", answer: "lambda",
              choices: ["lambda", "alpha", "delta", "gamma"] },
            { form: "ξ", prompt: "Which letter is this?", answer: "xi",
              choices: ["xi", "zeta", "psi", "chi"] },
            { form: "π", prompt: "Which letter is this?", answer: "pi",
              choices: ["pi", "tau", "nu", "gamma"] },
            { form: "ρ", prompt: "Which letter is this?", answer: "rho",
              choices: ["rho", "pi", "tau", "phi"] },
            { form: "σ", prompt: "Which letter is this (medial form)?", answer: "sigma",
              choices: ["sigma", "final sigma", "xi", "zeta"] },
            { form: "ς", prompt: "Which letter-form is this?", answer: "final sigma",
              choices: ["final sigma", "sigma", "xi", "psi"],
              note: "Final sigma (ς) is used at the end of a word; medial sigma (σ) elsewhere." },
            { form: "φ", prompt: "Which letter is this?", answer: "phi",
              choices: ["phi", "psi", "theta", "chi"] },
            { form: "χ", prompt: "Which letter is this?", answer: "chi",
              choices: ["chi", "phi", "psi", "kappa"] },
            { form: "ψ", prompt: "Which letter is this?", answer: "psi",
              choices: ["psi", "phi", "xi", "chi"] },
            { form: "ω", prompt: "Which letter is this?", answer: "omega",
              choices: ["omega", "omicron", "upsilon", "eta"] }
          ]
        },
        {
          family: "Breathings",
          lemma: "rough vs smooth",
          gloss: "rough vs smooth breathing",
          questions: [
            { form: "ὁ", prompt: "What does the rough breathing over a vowel indicate?",
              answer: "an initial 'h' sound",
              choices: ["an initial 'h' sound", "no extra sound", "a long vowel", "an accent"],
              note: "Every word starting with a vowel takes either a rough breathing (with an 'h' sound, as in ὁ) or a smooth breathing (no 'h', as in ἀ)." },
            { form: "ἀ", prompt: "What does the smooth breathing over a vowel indicate?",
              answer: "no additional sound",
              choices: ["no additional sound", "an 'h' sound", "an accent", "a long vowel"] },
            { form: "ῥ", prompt: "Which breathing does an initial rho always take?",
              answer: "rough",
              choices: ["rough", "smooth", "either", "neither — rho is a consonant"],
              note: "An initial ρ in Greek always takes the rough breathing." }
          ]
        },
        {
          family: "Diphthongs and iota subscript",
          lemma: "diphthongs",
          gloss: "two vowels in one syllable",
          questions: [
            { form: "αι", prompt: "How is the diphthong αι usually pronounced in the academic system used here?",
              answer: "approximately like 'ai' in 'aisle'",
              choices: ["approximately like 'ai' in 'aisle'", "like 'ay' in 'day'", "like 'ee' in 'see'", "like 'oy' in 'boy'"] },
            { form: "ει", prompt: "How is the diphthong ει usually pronounced in the academic system used here?",
              answer: "approximately like 'ei' in 'eight'",
              choices: ["approximately like 'ei' in 'eight'", "approximately like 'ai' in 'aisle'", "like 'oy' in 'boy'", "like 'oo' in 'food'"] },
            { form: "ου", prompt: "How is the diphthong ου pronounced (academic)?",
              answer: "like 'oo' in 'food'",
              choices: ["like 'oo' in 'food'", "like 'ow' in 'cow'", "like 'oy' in 'boy'", "like 'ee' in 'see'"] },
            { form: "ᾳ ῃ ῳ", prompt: "What is the small ι written under these vowels called?",
              answer: "iota subscript",
              choices: ["iota subscript", "iota adscript", "smooth breathing", "circumflex"],
              note: "Silent in pronunciation but it usually marks the dative singular of long-vowel stems." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "2": {
      label: "Chapter 2 Grammar",
      notes: "Basic sentences, present-tense recognition, εἰμί",
      items: [
        {
          family: "Sentence structure",
          lemma: "Greek word order",
          gloss: "subject identification",
          questions: [
            { form: "ὁ ἀπόστολος βλέπει τὸν ἄνθρωπον.",
              prompt: "Which word is the subject?",
              answer: "ὁ ἀπόστολος",
              choices: ["ὁ ἀπόστολος", "βλέπει", "τὸν ἄνθρωπον", "the verb supplies it"],
              note: "Nominative case marks the subject. ὁ (nom. sg. masc. article) flags it." },
            { form: "βλέπει τὸν ἄνθρωπον.",
              prompt: "Without an explicit nominative noun, where is the subject?",
              answer: "in the verb ending (3rd singular)",
              choices: ["in the verb ending (3rd singular)", "in τὸν ἄνθρωπον", "the sentence has no subject", "in the article τόν"],
              note: "Greek finite verbs encode person and number, so an explicit pronoun is often omitted unless needed for emphasis, contrast, or clarity." },
            { form: "Greek word order",
              prompt: "How rigid is Greek word order compared to English?",
              answer: "much freer — case endings carry the syntax",
              choices: ["much freer — case endings carry the syntax", "identical to English (SVO)", "always verb-final", "always verb-first"] }
          ]
        },
        {
          family: "Present active indicative — λύω",
          lemma: "λύω",
          gloss: "I untie / I am untying",
          questions: [
            { form: "λύεις", prompt: "Parse this verb form.",
              answer: "present active indicative, 2nd singular",
              choices: [
                "present active indicative, 1st singular",
                "present active indicative, 2nd singular",
                "present active indicative, 3rd singular",
                "present active indicative, 2nd plural"
              ] },
            { form: "λύομεν", prompt: "Parse this verb form.",
              answer: "present active indicative, 1st plural",
              choices: [
                "present active indicative, 1st plural",
                "present active indicative, 2nd plural",
                "imperfect active indicative, 1st plural",
                "present middle/passive indicative, 1st plural"
              ] },
            { form: "λύουσι(ν)", prompt: "Parse this verb form.",
              answer: "present active indicative, 3rd plural",
              choices: [
                "present active indicative, 3rd plural",
                "present active indicative, 3rd singular",
                "present active indicative, 1st plural",
                "future active indicative, 3rd plural"
              ] }
          ]
        },
        {
          family: "Present indicative of εἰμί",
          lemma: "εἰμί",
          gloss: "I am",
          questions: [
            { form: "εἰμί", prompt: "Identify this form.", answer: "1st singular ('I am')",
              choices: ["1st singular ('I am')", "3rd singular ('he/she/it is')", "1st plural ('we are')", "infinitive ('to be')"] },
            { form: "ἐστίν", prompt: "Identify this form.", answer: "3rd singular ('he/she/it is')",
              choices: ["3rd singular ('he/she/it is')", "2nd singular ('you are')", "3rd plural ('they are')", "1st singular ('I am')"] },
            { form: "εἰσίν", prompt: "Identify this form.", answer: "3rd plural ('they are')",
              choices: ["3rd plural ('they are')", "3rd singular ('he/she/it is')", "2nd plural ('you all are')", "infinitive"] },
            { form: "εἰμί",
              prompt: "What kind of verb is εἰμί syntactically?",
              answer: "an equative (linking) verb — both sides are nominative",
              choices: [
                "an equative (linking) verb — both sides are nominative",
                "a transitive verb — takes a direct object in the accusative",
                "a deponent — middle in form, active in meaning",
                "an impersonal verb"
              ],
              note: "After εἰμί the predicate noun stays in the nominative: ὁ θεὸς ἀγάπη ἐστίν." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "3": {
      label: "Chapter 3 Grammar",
      notes: "Cases, gender, and the function of each case",
      items: [
        {
          family: "Case functions",
          lemma: "the five cases",
          gloss: "primary syntactic roles",
          questions: [
            { form: "nominative", prompt: "Primary function of the nominative?",
              answer: "subject (and predicate nominative)",
              choices: ["subject (and predicate nominative)", "direct object", "indirect object", "possession"] },
            { form: "genitive", prompt: "Primary function of the genitive?",
              answer: "possession / source ('of')",
              choices: ["possession / source ('of')", "direct object", "subject", "indirect object"] },
            { form: "dative", prompt: "Primary function of the dative?",
              answer: "indirect object / location / means ('to/for/with/in')",
              choices: [
                "indirect object / location / means ('to/for/with/in')",
                "subject", "direct object", "possession"
              ] },
            { form: "accusative", prompt: "Primary function of the accusative?",
              answer: "direct object",
              choices: ["direct object", "subject", "indirect object", "possession"] },
            { form: "vocative", prompt: "Function of the vocative?",
              answer: "direct address",
              choices: ["direct address", "subject", "direct object", "possession"],
              note: "Often identical in form to the nominative; context disambiguates." }
          ]
        },
        {
          family: "Gender",
          lemma: "ὁ / ἡ / τό",
          gloss: "definite article by gender",
          questions: [
            { form: "ὁ", prompt: "What gender is this article?", answer: "masculine",
              choices: ["masculine", "feminine", "neuter", "common (M+F)"] },
            { form: "ἡ", prompt: "What gender is this article?", answer: "feminine",
              choices: ["masculine", "feminine", "neuter", "common (M+F)"] },
            { form: "τό", prompt: "What gender is this article?", answer: "neuter",
              choices: ["masculine", "feminine", "neuter", "common (M+F)"] },
            { form: "-ος nouns",
              prompt: "What gender are most second-declension nouns ending in -ος?",
              answer: "usually masculine",
              choices: ["usually masculine", "usually feminine", "usually neuter", "no gender pattern"],
              note: "A handful are feminine (e.g. ἡ ὁδός 'road'), but the pattern is reliable." },
            { form: "-ον nouns",
              prompt: "What gender are second-declension nouns ending in -ον?",
              answer: "neuter",
              choices: ["neuter", "masculine", "feminine", "no gender pattern"],
              note: "ἔργον, τέκνον, εὐαγγέλιον — all neuter." }
          ]
        },
        {
          family: "Article identification",
          lemma: "ὁ, ἡ, τό",
          gloss: "definite article paradigm",
          questions: [
            { form: "τοῦ", prompt: "Parse this article.",
              answer: "genitive singular masculine/neuter",
              choices: [
                "genitive singular masculine/neuter",
                "dative singular masculine/neuter",
                "genitive plural (all genders)",
                "accusative singular masculine"
              ] },
            { form: "τῷ", prompt: "Parse this article.",
              answer: "dative singular masculine/neuter",
              choices: [
                "dative singular masculine/neuter",
                "genitive singular masculine/neuter",
                "dative plural masculine/neuter",
                "nominative singular feminine"
              ] },
            { form: "τήν", prompt: "Parse this article.",
              answer: "accusative singular feminine",
              choices: [
                "accusative singular feminine",
                "nominative singular feminine",
                "genitive singular feminine",
                "accusative singular masculine"
              ] },
            { form: "τῶν", prompt: "Parse this article.",
              answer: "genitive plural (all genders)",
              choices: [
                "genitive plural (all genders)",
                "dative plural (all genders)",
                "genitive singular masculine/neuter",
                "accusative plural masculine"
              ],
              note: "τῶν is identical across all three genders in the plural." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "4": {
      label: "Chapter 4 Grammar",
      notes: "Prepositions and the cases they govern",
      items: [
        {
          family: "Single-case prepositions",
          lemma: "ἐν, εἰς, ἐκ, ἀπό, σύν, πρός",
          gloss: "prepositions with one case",
          questions: [
            { form: "ἐν", prompt: "Which case does ἐν take?", answer: "dative",
              choices: ["nominative", "genitive", "dative", "accusative"],
              note: "ἐν + dative: 'in', 'within', 'among'." },
            { form: "εἰς", prompt: "Which case does εἰς take?", answer: "accusative",
              choices: ["nominative", "genitive", "dative", "accusative"],
              note: "εἰς + accusative: 'into', 'to' — motion or goal." },
            { form: "ἐκ / ἐξ", prompt: "Which case does ἐκ (ἐξ before vowels) take?",
              answer: "genitive",
              choices: ["nominative", "genitive", "dative", "accusative"],
              note: "'out of', 'from'." },
            { form: "ἀπό", prompt: "Which case does ἀπό take?", answer: "genitive",
              choices: ["nominative", "genitive", "dative", "accusative"],
              note: "'from' — separation, source." },
            { form: "σύν", prompt: "Which case does σύν take?", answer: "dative",
              choices: ["nominative", "genitive", "dative", "accusative"],
              note: "'with' (association). Distinguish from μετά + gen. ('with')." },
            { form: "πρός", prompt: "Which case does πρός most commonly take in the NT?",
              answer: "accusative",
              choices: ["nominative", "genitive", "dative", "accusative"],
              note: "'to', 'toward'. (πρός + dat./gen. are rare in the NT.)" }
          ]
        },
        {
          family: "διά (multi-case)",
          lemma: "διά",
          gloss: "through / because of",
          questions: [
            { form: "διά + genitive", prompt: "διά + genitive means…",
              answer: "through (means or agency)",
              choices: ["through (means or agency)", "because of, on account of", "with", "into"] },
            { form: "διά + accusative", prompt: "διά + accusative means…",
              answer: "because of, on account of",
              choices: ["because of, on account of", "through (means or agency)", "with", "after"] }
          ]
        },
        {
          family: "μετά (multi-case)",
          lemma: "μετά",
          gloss: "with / after",
          questions: [
            { form: "μετά + genitive", prompt: "μετά + genitive means…",
              answer: "with (in company with)",
              choices: ["with (in company with)", "after (in time)", "into", "by means of"] },
            { form: "μετά + accusative", prompt: "μετά + accusative means…",
              answer: "after (in time)",
              choices: ["after (in time)", "with (in company with)", "before", "instead of"] }
          ]
        },
        {
          family: "ὑπό and ὑπέρ",
          lemma: "ὑπό / ὑπέρ",
          gloss: "by, under / for, above",
          questions: [
            { form: "ὑπό + genitive", prompt: "ὑπό + genitive means…",
              answer: "by (agent of a passive verb)",
              choices: ["by (agent of a passive verb)", "under (location)", "above", "on behalf of"],
              note: "Classic agent construction: ἐλύθη ὑπὸ τοῦ ἀνθρώπου = 'he was untied by the man'." },
            { form: "ὑπό + accusative", prompt: "ὑπό + accusative means…",
              answer: "under (motion or location)",
              choices: ["under (motion or location)", "by (agent)", "above", "after"] },
            { form: "ὑπέρ + genitive", prompt: "ὑπέρ + genitive means…",
              answer: "on behalf of, for the sake of",
              choices: ["on behalf of, for the sake of", "above (location)", "by (agent)", "under"] },
            { form: "ὑπέρ + accusative", prompt: "ὑπέρ + accusative means…",
              answer: "above, beyond (rare)",
              choices: ["above, beyond (rare)", "on behalf of", "by (agent)", "with"] }
          ]
        },
        {
          family: "κατά (multi-case)",
          lemma: "κατά",
          gloss: "down from / according to",
          questions: [
            { form: "κατά + genitive", prompt: "κατά + genitive means…",
              answer: "down from / against",
              choices: ["down from / against", "according to", "with", "into"] },
            { form: "κατά + accusative", prompt: "κατά + accusative means…",
              answer: "according to / throughout",
              choices: ["according to / throughout", "down from", "with", "before"],
              note: "κατὰ Μᾶρκον = 'according to Mark'." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "5": {
      label: "Chapter 5 Grammar",
      notes: "Adjective agreement, position, and substantive use",
      items: [
        {
          family: "Adjective agreement",
          lemma: "ἀγαθός, ἀγαθή, ἀγαθόν",
          gloss: "good",
          questions: [
            { form: "agreement",
              prompt: "An attributive adjective agrees with its noun in which categories?",
              answer: "case, gender, and number",
              choices: [
                "case, gender, and number",
                "person, number, and tense",
                "voice, mood, and aspect",
                "only gender and number"
              ] },
            { form: "ὁ καλὸς ἄνθρωπος",
              prompt: "Why does καλός end in -ος here?",
              answer: "to agree with ἄνθρωπος (nom. sg. masc.)",
              choices: [
                "to agree with ἄνθρωπος (nom. sg. masc.)",
                "because adjectives in -ος are indeclinable",
                "to mark the predicate position",
                "to mark a substantive"
              ] },
            { form: "ἡ καλὴ φωνή",
              prompt: "Why does καλή end in -η here?",
              answer: "to agree with φωνή (nom. sg. fem.)",
              choices: [
                "to agree with φωνή (nom. sg. fem.)",
                "all -η endings are dative",
                "adjectives default to feminine",
                "to mark the predicate position"
              ] }
          ]
        },
        {
          family: "Attributive position",
          lemma: "attributive position",
          gloss: "modifying a noun directly",
          questions: [
            { form: "ὁ ἀγαθὸς λόγος",
              prompt: "What position is ἀγαθός in?",
              answer: "attributive (article–adj–noun)",
              choices: [
                "attributive (article–adj–noun)",
                "attributive (article–noun–article–adj)",
                "predicate",
                "substantive"
              ] },
            { form: "ὁ λόγος ὁ ἀγαθός",
              prompt: "What position is ἀγαθός in?",
              answer: "attributive (article–noun–article–adj)",
              choices: [
                "attributive (article–noun–article–adj)",
                "attributive (article–adj–noun)",
                "predicate",
                "substantive"
              ],
              note: "Both attributive patterns mean 'the good word'. The repeated article is the giveaway." }
          ]
        },
        {
          family: "Predicate position",
          lemma: "predicate position",
          gloss: "asserting something about the noun",
          questions: [
            { form: "ὁ λόγος ἀγαθός",
              prompt: "What position is ἀγαθός in, and how do you translate?",
              answer: "predicate — 'the word is good'",
              choices: [
                "predicate — 'the word is good'",
                "attributive — 'the good word'",
                "substantive — 'the good thing'",
                "vocative — 'O good word!'"
              ],
              note: "Predicate position: the adjective lacks its own article. εἰμί is often implied." },
            { form: "ἀγαθὸς ὁ λόγος",
              prompt: "What position is ἀγαθός in?",
              answer: "predicate",
              choices: ["predicate", "attributive (adj–noun)", "attributive (noun–adj)", "substantive"] }
          ]
        },
        {
          family: "Substantive use",
          lemma: "substantive adjective",
          gloss: "adjective used as a noun",
          questions: [
            { form: "ὁ ἀγαθός",
              prompt: "What does this likely mean (no noun expressed)?",
              answer: "'the good [man]' — substantive use",
              choices: [
                "'the good [man]' — substantive use",
                "'the good word'",
                "'good is …' (predicate)",
                "an attributive adjective with the noun lost"
              ] },
            { form: "τὰ ἀγαθά",
              prompt: "What does this typically mean?",
              answer: "'the good things' — neuter plural substantive",
              choices: [
                "'the good things' — neuter plural substantive",
                "'the good women'",
                "'good is the …'",
                "a vocative form"
              ],
              note: "Neuter plural substantives often refer to abstractions or 'things'." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "6": {
      label: "Chapter 6 Grammar",
      notes: "The tenses — time and aspect, augment, future sigma",
      items: [
        {
          family: "Tense identification — λύω",
          lemma: "λύω",
          gloss: "the master indicative paradigm",
          questions: [
            { form: "λύω",
              prompt: "What tense is this (in isolation)?",
              answer: "present (active indicative, 1st sg.)",
              choices: ["present (active indicative, 1st sg.)", "future (active indicative, 1st sg.)", "imperfect (1st sg.)", "aorist (1st sg.)"],
              note: "Present and future 1st singular forms differ by the σ: λύω vs λύσω." },
            { form: "λύσω",
              prompt: "What tense is this?",
              answer: "future (active indicative, 1st sg.)",
              choices: ["future (active indicative, 1st sg.)", "present (1st sg.)", "aorist subjunctive, 1st sg.", "imperfect (1st sg.)"],
              note: "σ before the personal ending = future (or 1st aorist with augment)." },
            { form: "ἔλυον",
              prompt: "What tense is this?",
              answer: "imperfect (active indicative, 1st sg. or 3rd pl.)",
              choices: ["imperfect (active indicative, 1st sg. or 3rd pl.)", "aorist (1st sg.)", "present (1st sg.)", "future (1st sg.)"],
              note: "ε- augment + present stem + secondary endings = imperfect." },
            { form: "ἔλυσα",
              prompt: "What tense is this?",
              answer: "1st aorist (active indicative, 1st sg.)",
              choices: ["1st aorist (active indicative, 1st sg.)", "imperfect (1st sg.)", "perfect (1st sg.)", "future (1st sg.)"],
              note: "ε- augment + σα + secondary endings = 1st aorist." }
          ]
        },
        {
          family: "Time vs aspect",
          lemma: "tense",
          gloss: "Greek encodes both",
          questions: [
            { form: "aspect",
              prompt: "Which Greek tense is most strongly associated with imperfective aspect (ongoing/process)?",
              answer: "the present (and the imperfect in past time)",
              choices: [
                "the present (and the imperfect in past time)",
                "the aorist",
                "the perfect",
                "the future"
              ],
              note: "Imperfective aspect views the action from inside, as in progress." },
            { form: "aspect",
              prompt: "Which Greek tense is most strongly associated with perfective aspect (whole event as a single point)?",
              answer: "the aorist",
              choices: ["the aorist", "the present", "the perfect", "the imperfect"],
              note: "Perfective aspect views the action from outside as a complete whole — not necessarily 'punctiliar'." },
            { form: "aspect",
              prompt: "Which Greek tense conveys completed action with continuing relevance?",
              answer: "the perfect",
              choices: ["the perfect", "the aorist", "the imperfect", "the present"] }
          ]
        },
        {
          family: "Augment and tense markers",
          lemma: "ε- and σ-",
          gloss: "tense morphology",
          questions: [
            { form: "augment",
              prompt: "In which moods does the augment (ε-) appear?",
              answer: "indicative only",
              choices: ["indicative only", "indicative and subjunctive", "all moods", "infinitive only"],
              note: "Past-time augment is restricted to the indicative mood." },
            { form: "σ-marker",
              prompt: "What does a σ between the verb stem and the ending typically signal?",
              answer: "future or 1st aorist (with augment)",
              choices: [
                "future or 1st aorist (with augment)",
                "perfect",
                "present indicative",
                "subjunctive mood"
              ] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "7": {
      label: "Chapter 7 Grammar",
      notes: "The five moods and their core functions",
      items: [
        {
          family: "Mood functions",
          lemma: "mood",
          gloss: "the speaker's portrayal of reality",
          questions: [
            { form: "indicative",
              prompt: "What does the indicative mood typically express?",
              answer: "a statement or question of fact",
              choices: ["a statement or question of fact", "a command", "a wish", "a potential / contingent action"] },
            { form: "imperative",
              prompt: "What does the imperative mood express?",
              answer: "a command or prohibition",
              choices: ["a command or prohibition", "a fact", "a verbal noun", "a verbal adjective"] },
            { form: "subjunctive",
              prompt: "What does the subjunctive mood express?",
              answer: "a contingent / potential action (often after ἵνα, ἐάν)",
              choices: [
                "a contingent / potential action (often after ἵνα, ἐάν)",
                "a completed action with present results",
                "a simple fact",
                "direct address"
              ] },
            { form: "infinitive",
              prompt: "What is the infinitive grammatically?",
              answer: "a verbal noun",
              choices: ["a verbal noun", "a verbal adjective", "a finite verb", "a particle"] },
            { form: "participle",
              prompt: "What is the participle grammatically?",
              answer: "a verbal adjective",
              choices: ["a verbal adjective", "a verbal noun", "a finite verb", "an interjection"] }
          ]
        },
        {
          family: "Mood identification",
          lemma: "λύω",
          gloss: "form → mood",
          questions: [
            { form: "λύει",
              prompt: "What mood is this?",
              answer: "indicative",
              choices: ["indicative", "subjunctive", "imperative", "infinitive"] },
            { form: "λῦε",
              prompt: "What mood is this (2nd sg., addressed to one person)?",
              answer: "imperative",
              choices: ["imperative", "indicative", "subjunctive", "infinitive"] },
            { form: "λύειν",
              prompt: "What is this form?",
              answer: "present active infinitive",
              choices: ["present active infinitive", "present active indicative, 2nd sg.", "aorist active subjunctive", "present imperative, 3rd sg."] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "8": {
      label: "Chapter 8 Grammar",
      notes: "Contract verbs, contraction rules, and liquid stems",
      items: [
        {
          family: "Contract vowel rules — ε contracts",
          lemma: "φιλέω",
          gloss: "I love",
          questions: [
            { form: "ε + ε",
              prompt: "What does ε + ε contract to?",
              answer: "ει",
              choices: ["ει", "η", "ω", "ου"],
              note: "φιλε-εις → φιλεῖς." },
            { form: "ε + ο",
              prompt: "What does ε + ο contract to?",
              answer: "ου",
              choices: ["ου", "ω", "ει", "οι"],
              note: "φιλε-ομεν → φιλοῦμεν." },
            { form: "ε + ω",
              prompt: "What does ε + ω contract to?",
              answer: "ω",
              choices: ["ω", "ου", "ει", "η"],
              note: "φιλε-ω → φιλῶ." },
            { form: "ε + ει",
              prompt: "What does ε + ει contract to?",
              answer: "ει",
              choices: ["ει", "η", "οι", "ου"],
              note: "φιλε-ει → φιλεῖ." }
          ]
        },
        {
          family: "Contract vowel rules — α and ο contracts",
          lemma: "ἀγαπάω / πληρόω",
          gloss: "I love / I fill",
          questions: [
            { form: "α + ε",
              prompt: "What does α + ε contract to (in α-contract verbs)?",
              answer: "α (long)",
              choices: ["α (long)", "η", "αι", "ει"],
              note: "ἀγαπα-εις → ἀγαπᾷς." },
            { form: "α + ο",
              prompt: "What does α + ο contract to?",
              answer: "ω",
              choices: ["ω", "ου", "α", "οι"],
              note: "ἀγαπα-ομεν → ἀγαπῶμεν." },
            { form: "ο + ε / ο + ο",
              prompt: "What do ο + ε and ο + ο both contract to?",
              answer: "ου",
              choices: ["ου", "ω", "οι", "ει"],
              note: "πληρο-ομεν → πληροῦμεν." }
          ]
        },
        {
          family: "Liquid stems",
          lemma: "μένω, κρίνω, ἀποστέλλω",
          gloss: "verbs with stems ending in λ, μ, ν, ρ",
          questions: [
            { form: "liquid stem",
              prompt: "What four consonants define the 'liquid' verb class?",
              answer: "λ, μ, ν, ρ",
              choices: ["λ, μ, ν, ρ", "π, β, φ", "κ, γ, χ", "τ, δ, θ"] },
            { form: "future of μένω",
              prompt: "Why does μένω form its future as μενῶ rather than *μενσω?",
              answer: "Liquid stems drop the σ and contract — the future looks like an ε-contract present.",
              choices: [
                "Liquid stems drop the σ and contract — the future looks like an ε-contract present.",
                "μένω is irregular and has no future.",
                "It uses second-aorist morphology.",
                "It is built on a perfect stem."
              ],
              note: "μενῶ, μενεῖς, μενεῖ, μενοῦμεν, μενεῖτε, μενοῦσι(ν)." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "9": {
      label: "Chapter 9 Grammar",
      notes: "Personal, demonstrative, and relative pronouns; conjunctions",
      items: [
        {
          family: "Personal pronouns",
          lemma: "ἐγώ / σύ / αὐτός",
          gloss: "1st, 2nd, 3rd person",
          questions: [
            { form: "ἐγώ", prompt: "Identify this pronoun.",
              answer: "1st person singular nominative ('I')",
              choices: [
                "1st person singular nominative ('I')",
                "2nd person singular nominative ('you')",
                "1st person plural nominative ('we')",
                "3rd person singular masculine ('he')"
              ] },
            { form: "ἡμεῖς", prompt: "Identify this pronoun.",
              answer: "1st person plural nominative ('we')",
              choices: [
                "1st person plural nominative ('we')",
                "2nd person plural nominative ('you all')",
                "1st person singular nominative ('I')",
                "3rd person plural nominative ('they')"
              ] },
            { form: "ὑμεῖς", prompt: "Identify this pronoun.",
              answer: "2nd person plural nominative ('you all')",
              choices: [
                "2nd person plural nominative ('you all')",
                "1st person plural nominative ('we')",
                "2nd person singular nominative ('you')",
                "3rd person plural masculine ('they')"
              ],
              note: "ἡμεῖς (1pl) vs ὑμεῖς (2pl) differ only in their breathing and accent — easy to confuse." },
            { form: "αὐτοῦ", prompt: "What is one likely meaning of αὐτοῦ?",
              answer: "'his / of him' (gen. sg. masc.) — possession",
              choices: [
                "'his / of him' (gen. sg. masc.) — possession",
                "'self' (intensive, nom.)",
                "'them' (acc. pl.)",
                "'to him' (dat. sg.)"
              ] }
          ]
        },
        {
          family: "Demonstratives — near and far",
          lemma: "οὗτος / ἐκεῖνος",
          gloss: "this / that",
          questions: [
            { form: "οὗτος",
              prompt: "Near or far demonstrative?",
              answer: "near ('this')",
              choices: ["near ('this')", "far ('that')", "neither — it's a relative pronoun", "neither — it's an article"] },
            { form: "ἐκεῖνος",
              prompt: "Near or far demonstrative?",
              answer: "far ('that')",
              choices: ["far ('that')", "near ('this')", "neither — it's a relative pronoun", "neither — it's an article"] },
            { form: "αὕτη",
              prompt: "Identify this form.",
              answer: "'this' — nom. sg. fem. of οὗτος",
              choices: [
                "'this' — nom. sg. fem. of οὗτος",
                "'she herself' — αὐτός intensive",
                "'her' — αὐτή acc.",
                "'the same' — αὐτός attributive"
              ],
              note: "αὕτη (rough breathing, acute) vs αὐτή (smooth breathing, acute) — small marks, big difference." }
          ]
        },
        {
          family: "Relative pronouns",
          lemma: "ὅς, ἥ, ὅ",
          gloss: "who, which",
          questions: [
            { form: "agreement",
              prompt: "A relative pronoun agrees with its antecedent in which categories?",
              answer: "gender and number (its case is set by its own clause)",
              choices: [
                "gender and number (its case is set by its own clause)",
                "case, gender, and number",
                "case and number only",
                "person and number only"
              ],
              note: "Compare: 'the man whom I saw' — 'whom' is acc. (object of 'saw') even though 'man' is nom." },
            { form: "ὅς", prompt: "Parse this relative pronoun.",
              answer: "nominative singular masculine",
              choices: ["nominative singular masculine", "nominative singular feminine", "nominative singular neuter", "accusative singular masculine"] },
            { form: "ᾧ", prompt: "Parse this relative pronoun.",
              answer: "dative singular masculine/neuter",
              choices: ["dative singular masculine/neuter", "dative singular feminine", "genitive singular masculine/neuter", "dative plural masculine/neuter"] }
          ]
        },
        {
          family: "Conjunctions",
          lemma: "καί, δέ, γάρ, οὖν, ἀλλά",
          gloss: "common connectors",
          questions: [
            { form: "καί", prompt: "Which connective conjunction is this?",
              answer: "'and' / 'also' (additive)",
              choices: ["'and' / 'also' (additive)", "'but' (adversative)", "'for' (causal)", "'therefore' (inferential)"] },
            { form: "δέ", prompt: "Which type of conjunction is δέ?",
              answer: "'but' / 'and' — mild adversative or transitional, postpositive",
              choices: [
                "'but' / 'and' — mild adversative or transitional, postpositive",
                "'for' — strong causal",
                "'therefore' — inferential",
                "'because' — subordinating"
              ],
              note: "Postpositive: never appears first in its clause." },
            { form: "γάρ", prompt: "What does γάρ signal?",
              answer: "'for' — explanatory / causal, postpositive",
              choices: ["'for' — explanatory / causal, postpositive", "'and' — additive", "'but' — adversative", "'in order that' — purpose"] },
            { form: "οὖν", prompt: "What does οὖν signal?",
              answer: "'therefore' / 'so' — inferential, postpositive",
              choices: ["'therefore' / 'so' — inferential, postpositive", "'because' — causal", "'and' — additive", "'until' — temporal"] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "10": {
      label: "Chapter 10 Grammar",
      notes: "Complex sentences — purpose, content, and conditional clauses",
      items: [
        {
          family: "ἵνα + subjunctive",
          lemma: "ἵνα",
          gloss: "in order that / that",
          questions: [
            { form: "ἵνα",
              prompt: "What mood normally follows ἵνα?",
              answer: "subjunctive",
              choices: ["subjunctive", "indicative", "imperative", "infinitive"],
              note: "Standard purpose / content clause: ἵνα + subjunctive." },
            { form: "ἵνα λύσῃ",
              prompt: "What does this most likely express?",
              answer: "purpose: 'in order that he might untie'",
              choices: [
                "purpose: 'in order that he might untie'",
                "fact: 'that he untied'",
                "command: 'untie!'",
                "hope: 'may he untie!'"
              ] }
          ]
        },
        {
          family: "ὅτι",
          lemma: "ὅτι",
          gloss: "that / because",
          questions: [
            { form: "ὅτι (content)",
              prompt: "After verbs of saying or thinking, ὅτι typically introduces…",
              answer: "an indirect statement — 'that …'",
              choices: [
                "an indirect statement — 'that …'",
                "a purpose clause — 'in order that …'",
                "a result clause — 'so that …'",
                "a temporal clause — 'when …'"
              ] },
            { form: "ὅτι (causal)",
              prompt: "ὅτι can also be causal, meaning…",
              answer: "'because'",
              choices: ["'because'", "'although'", "'when'", "'unless'"] }
          ]
        },
        {
          family: "εἰ and ἐάν",
          lemma: "εἰ / ἐάν",
          gloss: "if",
          questions: [
            { form: "εἰ",
              prompt: "What mood normally follows εἰ in a simple/first-class condition?",
              answer: "indicative",
              choices: ["indicative", "subjunctive", "imperative", "infinitive"],
              note: "First-class condition assumes the protasis true for argument's sake." },
            { form: "ἐάν",
              prompt: "What mood normally follows ἐάν?",
              answer: "subjunctive",
              choices: ["subjunctive", "indicative", "imperative", "optative"],
              note: "Third-class condition: ἐάν + subjunctive — future/general probability." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "11": {
      label: "Chapter 11 Grammar",
      notes: "Special verbs — second aorist and liquid futures",
      items: [
        {
          family: "Second aorist — suppletive stems",
          lemma: "second aorist",
          gloss: "different stem, same person endings as imperfect",
          questions: [
            { form: "λέγω",
              prompt: "What is the 2nd aorist of λέγω ('I say')?",
              answer: "εἶπον (1st sg.)",
              choices: ["εἶπον (1st sg.)", "ἔλεξα", "λέλοιπα", "ἔλαβον"],
              note: "λέγω uses a suppletive root ϝεπ-/ειπ- in the aorist." },
            { form: "ἔρχομαι",
              prompt: "What is the 2nd aorist of ἔρχομαι ('I come')?",
              answer: "ἦλθον (1st sg.)",
              choices: ["ἦλθον (1st sg.)", "ἠρχόμην", "ἐλήλυθα", "εἶπον"] },
            { form: "λαμβάνω",
              prompt: "What is the 2nd aorist of λαμβάνω ('I take')?",
              answer: "ἔλαβον (1st sg.)",
              choices: ["ἔλαβον (1st sg.)", "ἐλήμφθην", "εἴληφα", "ἔλεξα"] },
            { form: "2nd aorist endings",
              prompt: "Second-aorist active indicative endings look like which other tense?",
              answer: "imperfect (secondary endings on a different stem)",
              choices: [
                "imperfect (secondary endings on a different stem)",
                "present (primary endings)",
                "perfect (κα endings)",
                "future (with σ)"
              ],
              note: "Stem reveals the tense; ending reveals person/number." }
          ]
        },
        {
          family: "Liquid futures",
          lemma: "μένω / ἀποστέλλω / κρίνω",
          gloss: "future of liquid-stem verbs",
          questions: [
            { form: "μενῶ",
              prompt: "Parse this form.",
              answer: "future active indicative, 1st sg. of μένω",
              choices: [
                "future active indicative, 1st sg. of μένω",
                "present active indicative, 1st sg. of μένω",
                "present active subjunctive, 1st sg. of μένω",
                "aorist active indicative, 1st sg. of μένω"
              ],
              note: "Liquid stems drop the future σ and ε-contract; the result mimics a contract present." },
            { form: "ἀποστελῶ",
              prompt: "Parse this form.",
              answer: "future active indicative, 1st sg. of ἀποστέλλω",
              choices: [
                "future active indicative, 1st sg. of ἀποστέλλω",
                "present active indicative, 1st sg. of ἀποστέλλω",
                "aorist active indicative, 1st sg.",
                "perfect active indicative, 1st sg."
              ] },
            { form: "liquid future endings",
              prompt: "Liquid future personal endings most resemble which present-tense pattern?",
              answer: "ε-contract present (φιλέω)",
              choices: ["ε-contract present (φιλέω)", "α-contract present (ἀγαπάω)", "ο-contract present (πληρόω)", "uncontracted -ω verbs"] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "12": {
      label: "Chapter 12 Grammar",
      notes: "Third declension Part 1 — stem identification by genitive",
      items: [
        {
          family: "Stem-class identification",
          lemma: "third declension",
          gloss: "the genitive singular reveals the stem",
          questions: [
            { form: "σάρξ, σαρκός",
              prompt: "What stem class is this?",
              answer: "κ-stem (a velar stem)",
              choices: ["κ-stem (a velar stem)", "ν-stem", "ντ-stem", "ματ-stem (neuter)"],
              note: "Nominative σάρξ < σαρκ-ς (velar + σ → ξ). The genitive σαρκός shows the bare stem." },
            { form: "ἄρχων, ἄρχοντος",
              prompt: "What stem class is this?",
              answer: "ντ-stem",
              choices: ["ντ-stem", "ν-stem", "κ-stem", "σ-stem"],
              note: "ντ drops before σ in the nom. sg. (and in the dat. pl.)." },
            { form: "ποιμήν, ποιμένος",
              prompt: "What stem class is this?",
              answer: "ν-stem",
              choices: ["ν-stem", "ντ-stem", "κ-stem", "ματ-stem (neuter)"] },
            { form: "πνεῦμα, πνεύματος",
              prompt: "What stem class is this?",
              answer: "ματ-stem (neuter)",
              choices: ["ματ-stem (neuter)", "ν-stem", "κ-stem", "ι-stem"],
              note: "ματ-stem neuters: nom./acc. sg. drops the τ; gen. sg. shows the full stem." },
            { form: "general rule",
              prompt: "How do you find the true 3rd-declension stem of a noun?",
              answer: "drop -ος from the genitive singular",
              choices: [
                "drop -ος from the genitive singular",
                "drop -ς from the nominative singular",
                "drop -ι from the dative singular",
                "look it up — there is no rule"
              ] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "13": {
      label: "Chapter 13 Grammar",
      notes: "Third declension Part 2 — σ-stem, ι-stem, ευ-stem",
      items: [
        {
          family: "σ-stem neuters",
          lemma: "γένος, γένους",
          gloss: "race, kind",
          questions: [
            { form: "γένος, γένους",
              prompt: "What stem class is this?",
              answer: "σ-stem (neuter)",
              choices: ["σ-stem (neuter)", "ι-stem", "κ-stem", "ν-stem"],
              note: "Underlying γενεσ-; the σ drops between vowels and the result contracts (γενε-ος → γένους)." },
            { form: "γένει",
              prompt: "Why does the dative sg. look like this rather than *γένεσ-ι?",
              answer: "Intervocalic σ dropped, then ε + ι → ει",
              choices: [
                "Intervocalic σ dropped, then ε + ι → ει",
                "It's irregular and unrelated to γένος",
                "It's actually a 2nd-declension form",
                "It's a vocative"
              ] }
          ]
        },
        {
          family: "ι-stems",
          lemma: "πόλις, πόλεως",
          gloss: "city",
          questions: [
            { form: "πόλεως",
              prompt: "Why is the genitive singular -εως rather than the expected -ος?",
              answer: "ι-stem nouns have a special long-vowel genitive ending -εως",
              choices: [
                "ι-stem nouns have a special long-vowel genitive ending -εως",
                "It's an alternate spelling — both forms are equally common",
                "It's a typographical variation of -ος",
                "It's actually a 1st-declension form"
              ],
              note: "πόλις, πόλεως, πόλει, πόλιν, πόλι(ν) — distinctive throughout." },
            { form: "πόλις vs πόλεις",
              prompt: "How can πόλεις function in a sentence?",
              answer: "as nominative or accusative plural",
              choices: [
                "as nominative or accusative plural",
                "only as nominative plural",
                "only as accusative plural",
                "only as a vocative"
              ],
              note: "Nom./acc. pl. collapse to a single form in ι-stems." }
          ]
        },
        {
          family: "ευ-stems",
          lemma: "βασιλεύς, βασιλέως",
          gloss: "king",
          questions: [
            { form: "βασιλεύς",
              prompt: "What stem class is this?",
              answer: "ευ-stem (masc.)",
              choices: ["ευ-stem (masc.)", "ι-stem", "σ-stem (neuter)", "ντ-stem"] },
            { form: "βασιλέως",
              prompt: "What case and number is this?",
              answer: "genitive singular",
              choices: ["genitive singular", "accusative singular", "genitive plural", "dative plural"],
              note: "Like πόλις, the ευ-stems take a long-vowel -εως genitive." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "14": {
      label: "Chapter 14 Grammar",
      notes: "Participles — the verbal adjective and its functions",
      items: [
        {
          family: "Participle as verbal adjective",
          lemma: "participle",
          gloss: "characteristics",
          questions: [
            { form: "participle",
              prompt: "Which features does a participle share with a verb?",
              answer: "tense, voice, and the ability to take an object",
              choices: [
                "tense, voice, and the ability to take an object",
                "person and mood",
                "person and number",
                "mood only"
              ] },
            { form: "participle agreement",
              prompt: "Which features does a participle share with an adjective?",
              answer: "case, gender, and number — and it agrees with a noun",
              choices: [
                "case, gender, and number — and it agrees with a noun",
                "only gender and number",
                "only case",
                "person and number"
              ] }
          ]
        },
        {
          family: "Participle functions",
          lemma: "participle",
          gloss: "attributive vs adverbial vs substantive",
          questions: [
            { form: "ὁ λύων ἄνθρωπος",
              prompt: "What is the function of λύων here?",
              answer: "attributive — 'the man who is untying'",
              choices: [
                "attributive — 'the man who is untying'",
                "adverbial (circumstantial) — 'while untying, the man …'",
                "substantive — 'the one untying'",
                "predicate — 'the man is untying'"
              ],
              note: "Article–participle–noun = attributive position." },
            { form: "ὁ λύων",
              prompt: "What is the function of λύων here (no noun)?",
              answer: "substantive — 'the one who is untying'",
              choices: [
                "substantive — 'the one who is untying'",
                "attributive — 'the untying [thing]'",
                "adverbial — 'while untying'",
                "predicate"
              ] },
            { form: "λύων τὸν δοῦλον, ἀπῆλθεν.",
              prompt: "What is the function of λύων here?",
              answer: "adverbial (circumstantial) — 'after / while untying the slave, he went away'",
              choices: [
                "adverbial (circumstantial) — 'after / while untying the slave, he went away'",
                "attributive — modifying the subject",
                "substantive — 'the one untying'",
                "imperative — 'untie!'"
              ],
              note: "An anarthrous participle agreeing with the subject is normally circumstantial." },
            { form: "λύσαντος τοῦ ἀνθρώπου τὸν δοῦλον, ἀπῆλθον.",
              prompt: "What construction is λύσαντος τοῦ ἀνθρώπου?",
              answer: "genitive absolute",
              choices: [
                "genitive absolute",
                "attributive participle",
                "substantive participle",
                "second aorist indicative"
              ],
              note: "Genitive absolute: a participle + noun, both genitive, grammatically detached from the main clause." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "15": {
      label: "Chapter 15 Grammar",
      notes: "The passive, the three voices, and the square of stops",
      items: [
        {
          family: "Voice",
          lemma: "active / middle / passive",
          gloss: "voice meanings",
          questions: [
            { form: "active",
              prompt: "What does the active voice express?",
              answer: "the subject performs the action",
              choices: [
                "the subject performs the action",
                "the subject receives the action",
                "the subject acts on / for itself",
                "no agent is implied"
              ] },
            { form: "middle",
              prompt: "What does the middle voice typically express?",
              answer: "the subject acts on or for itself (or with personal involvement)",
              choices: [
                "the subject acts on or for itself (or with personal involvement)",
                "the subject performs the action on someone else",
                "the subject is acted upon by an external agent",
                "the action is impersonal"
              ] },
            { form: "passive",
              prompt: "What does the passive voice express?",
              answer: "the subject is acted upon",
              choices: [
                "the subject is acted upon",
                "the subject performs the action",
                "the subject acts on itself",
                "no subject is implied"
              ] },
            { form: "agent",
              prompt: "How is the personal agent of a passive verb most often expressed?",
              answer: "ὑπό + genitive",
              choices: ["ὑπό + genitive", "ἐν + dative", "διά + accusative", "πρός + accusative"] }
          ]
        },
        {
          family: "Aorist passive marker",
          lemma: "θη",
          gloss: "the aorist passive sign",
          questions: [
            { form: "ἐλύθη",
              prompt: "What signals that this is aorist passive?",
              answer: "the θ + η (θη morpheme) before the personal ending",
              choices: [
                "the θ + η (θη morpheme) before the personal ending",
                "the augment ε- alone",
                "the σ before the ending",
                "the κ before the ending"
              ],
              note: "ἐ-λύ-θη: augment + stem + θη + ending. Same θη appears in the future passive (-θησ-)." },
            { form: "λυθήσομαι",
              prompt: "Parse the tense and voice.",
              answer: "future passive (1st sg. middle/passive ending)",
              choices: [
                "future passive (1st sg. middle/passive ending)",
                "aorist passive (1st sg.)",
                "future middle (1st sg.)",
                "perfect passive (1st sg.)"
              ],
              note: "Future passive is built on the aorist passive stem + σ + middle endings." }
          ]
        },
        {
          family: "Square of stops",
          lemma: "consonant + σ contractions",
          gloss: "future / 1st aorist consonant changes",
          questions: [
            { form: "labial + σ",
              prompt: "π, β, or φ + σ becomes…",
              answer: "ψ",
              choices: ["ψ", "ξ", "σ", "ττ"],
              note: "πέμπω → πέμψω (future); βλέπω → ἔβλεψα (aorist)." },
            { form: "velar + σ",
              prompt: "κ, γ, or χ + σ becomes…",
              answer: "ξ",
              choices: ["ξ", "ψ", "σ", "ττ"],
              note: "ἄγω → ἄξω; διώκω → διώξω." },
            { form: "dental + σ",
              prompt: "τ, δ, or θ + σ becomes…",
              answer: "σ (the dental drops)",
              choices: ["σ (the dental drops)", "ψ", "ξ", "ζ"],
              note: "πείθω → πείσω; ἐλπίς, ἐλπίδος → dat. pl. ἐλπίσι(ν)." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "16": {
      label: "Chapter 16 Grammar",
      notes: "The perfect — reduplication, completed action with present results",
      items: [
        {
          family: "Reduplication",
          lemma: "perfect stem formation",
          gloss: "the visual marker of the perfect",
          questions: [
            { form: "λέλυκα",
              prompt: "What identifies this as a perfect?",
              answer: "reduplication (λε-) + κ + α-class personal endings",
              choices: [
                "reduplication (λε-) + κ + α-class personal endings",
                "augment ε- + σ + α",
                "augment ε- + θη",
                "ω-ending + ι-augment"
              ],
              note: "Pattern: consonant + ε + verb stem + κ-α (1st sg.). λύω → λέλυκα." },
            { form: "γέγραπται",
              prompt: "What does γε- at the start signal?",
              answer: "reduplication — this is a perfect form",
              choices: ["reduplication — this is a perfect form", "augment — this is an aorist or imperfect", "particle — 'indeed'", "an unrelated prefix"],
              note: "γέγραπται = perfect middle/passive 3rd sg. of γράφω, 'it has been written / it stands written'." },
            { form: "verbs starting with vowels",
              prompt: "How do verbs whose stem begins with a vowel form the perfect?",
              answer: "by lengthening the initial vowel (like an augment)",
              choices: [
                "by lengthening the initial vowel (like an augment)",
                "by doubling the first consonant",
                "by prefixing γε-",
                "they can't form a perfect"
              ],
              note: "ἀκούω → ἀκήκοα (Attic reduplication is the irregular cousin)." }
          ]
        },
        {
          family: "Aspect of the perfect",
          lemma: "perfect tense",
          gloss: "completed action with continuing result",
          questions: [
            { form: "perfect aspect",
              prompt: "What does the perfect tense convey aspectually?",
              answer: "a completed past action whose results persist into the present",
              choices: [
                "a completed past action whose results persist into the present",
                "a single past event with no present relevance",
                "an ongoing process",
                "a future action"
              ] },
            { form: "γέγραπται",
              prompt: "Best translation of γέγραπται in 'γέγραπται γάρ'?",
              answer: "'it stands written' / 'it is written'",
              choices: [
                "'it stands written' / 'it is written'",
                "'someone wrote'",
                "'they will write'",
                "'while writing'"
              ] }
          ]
        },
        {
          family: "Pluperfect",
          lemma: "ἐλελύκειν",
          gloss: "I had untied",
          questions: [
            { form: "ἐλελύκειν",
              prompt: "Parse this verb.",
              answer: "pluperfect active indicative, 1st sg. of λύω",
              choices: [
                "pluperfect active indicative, 1st sg. of λύω",
                "perfect active indicative, 1st sg.",
                "imperfect active indicative, 1st sg.",
                "aorist active indicative, 1st sg."
              ],
              note: "Pluperfect = augment + reduplication + κ + ει + secondary endings. The full set of three time markers is the giveaway." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "17": {
      label: "Chapter 17 Grammar",
      notes: "The subjunctive — long-vowel marker and its main uses",
      items: [
        {
          family: "Subjunctive form",
          lemma: "λύω subjunctive",
          gloss: "long-vowel theme marker",
          questions: [
            { form: "subjunctive marker",
              prompt: "What morphological feature visually signals the subjunctive?",
              answer: "long thematic vowel (ω/η) replacing the short ο/ε",
              choices: [
                "long thematic vowel (ω/η) replacing the short ο/ε",
                "the augment ε-",
                "reduplication",
                "the θη morpheme"
              ],
              note: "λύομεν (ind.) vs λύωμεν (subj.); λύετε (ind.) vs λύητε (subj.)." },
            { form: "λύῃ",
              prompt: "Parse this form.",
              answer: "present active subjunctive, 3rd sg.",
              choices: [
                "present active subjunctive, 3rd sg.",
                "present active indicative, 3rd sg.",
                "present middle/passive indicative, 2nd sg.",
                "aorist active indicative, 3rd sg."
              ],
              note: "Without context, λύῃ could also be 2nd sg. middle/passive subjunctive — but 3rd sg. active is the textbook answer." }
          ]
        },
        {
          family: "Subjunctive uses",
          lemma: "subjunctive",
          gloss: "main NT uses",
          questions: [
            { form: "ἵνα + subj.",
              prompt: "Subjunctive after ἵνα expresses…",
              answer: "purpose / content ('in order that' / 'that')",
              choices: [
                "purpose / content ('in order that' / 'that')",
                "a simple statement of fact",
                "a wish",
                "direct address"
              ] },
            { form: "λύσωμεν",
              prompt: "1st-person plural subjunctive in a main clause is the…",
              answer: "hortatory subjunctive ('let us untie!')",
              choices: [
                "hortatory subjunctive ('let us untie!')",
                "deliberative subjunctive ('shall we untie?')",
                "prohibitive subjunctive ('do not untie!')",
                "future indicative ('we will untie')"
              ] },
            { form: "μὴ + aorist subj.",
              prompt: "μή + aorist subjunctive (2nd person) expresses…",
              answer: "a prohibition ('do not …')",
              choices: [
                "a prohibition ('do not …')",
                "a wish ('would that …')",
                "a command to begin ('start …')",
                "a question of doubt"
              ],
              note: "Distinguished from μή + present imperative, which prohibits an ongoing action." }
          ]
        },
        {
          family: "Indefinite constructions",
          lemma: "ὅς ἄν + subjunctive",
          gloss: "general / indefinite relative",
          questions: [
            { form: "ὃς ἂν λύσῃ",
              prompt: "What does ὅς ἄν + subjunctive express?",
              answer: "an indefinite relative — 'whoever unties'",
              choices: [
                "an indefinite relative — 'whoever unties'",
                "a definite relative — 'who unties'",
                "a purpose clause — 'in order that he untie'",
                "a temporal clause — 'whenever he untied'"
              ] },
            { form: "ὅταν",
              prompt: "ὅταν (= ὅτε + ἄν) + subjunctive expresses…",
              answer: "a general or indefinite temporal — 'whenever'",
              choices: [
                "a general or indefinite temporal — 'whenever'",
                "a definite past — 'when (it happened)'",
                "a purpose — 'in order that'",
                "a result — 'so that'"
              ] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "18": {
      label: "Chapter 18 Grammar",
      notes: "Using verbs — periphrastics and aspect choice",
      items: [
        {
          family: "Periphrastic constructions",
          lemma: "εἰμί + participle",
          gloss: "verb-of-being plus participle",
          questions: [
            { form: "ἦν διδάσκων",
              prompt: "What construction is this?",
              answer: "periphrastic imperfect ('he was teaching')",
              choices: [
                "periphrastic imperfect ('he was teaching')",
                "imperfect indicative of διδάσκω",
                "aorist participle in apposition",
                "perfect periphrastic"
              ],
              note: "imperfect of εἰμί + present participle = periphrastic imperfect — common in Mark / Luke." },
            { form: "ἐστὶν γεγραμμένον",
              prompt: "What construction is this?",
              answer: "periphrastic perfect ('it has been / is written')",
              choices: [
                "periphrastic perfect ('it has been / is written')",
                "present indicative of γράφω",
                "perfect indicative of εἰμί",
                "aorist passive"
              ],
              note: "present of εἰμί + perfect participle = periphrastic perfect — frequent for stative passives." }
          ]
        },
        {
          family: "Aspect choice",
          lemma: "tense and aspect",
          gloss: "choosing among present / aorist / perfect",
          questions: [
            { form: "command: keep doing X",
              prompt: "Which tense of imperative best matches 'keep on doing X'?",
              answer: "present (imperfective aspect)",
              choices: ["present (imperfective aspect)", "aorist (perfective aspect)", "perfect (stative)", "future indicative"] },
            { form: "command: do X (one decisive act)",
              prompt: "Which tense of imperative typically presents the action as a single whole?",
              answer: "aorist (perfective aspect)",
              choices: ["aorist (perfective aspect)", "present (imperfective aspect)", "perfect (stative)", "future indicative"] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "19": {
      label: "Chapter 19 Grammar",
      notes: "-μι verbs — δίδωμι, τίθημι, ἵστημι patterns",
      items: [
        {
          family: "-ω vs -μι recognition",
          lemma: "verb classes",
          gloss: "lexical-form ending",
          questions: [
            { form: "δίδωμι",
              prompt: "What verb class is this?",
              answer: "-μι verb (athematic)",
              choices: [
                "-μι verb (athematic)",
                "-ω verb (thematic)",
                "ε-contract verb",
                "α-contract verb"
              ],
              note: "-μι verbs attach personal endings directly to the stem without a connecting vowel." },
            { form: "λύω",
              prompt: "What verb class is this?",
              answer: "-ω verb (thematic)",
              choices: ["-ω verb (thematic)", "-μι verb (athematic)", "ε-contract verb", "deponent"],
              note: "Most NT verbs are thematic -ω verbs." }
          ]
        },
        {
          family: "δίδωμι present indicative",
          lemma: "δίδωμι",
          gloss: "I give",
          questions: [
            { form: "δίδωσι(ν)",
              prompt: "Parse this form.",
              answer: "present active indicative, 3rd sg.",
              choices: [
                "present active indicative, 3rd sg.",
                "present active indicative, 1st sg.",
                "present active subjunctive, 3rd sg.",
                "aorist active indicative, 3rd sg."
              ] },
            { form: "διδόασι(ν)",
              prompt: "Parse this form.",
              answer: "present active indicative, 3rd pl.",
              choices: [
                "present active indicative, 3rd pl.",
                "present active indicative, 3rd sg.",
                "perfect active indicative, 3rd pl.",
                "imperfect active indicative, 3rd pl."
              ],
              note: "-μι 3rd plural is -ασι(ν), distinct from -ω verbs' -ουσι(ν)." }
          ]
        },
        {
          family: "δίδωμι other tenses",
          lemma: "δίδωμι",
          gloss: "future / aorist / perfect",
          questions: [
            { form: "δώσω",
              prompt: "Parse this form.",
              answer: "future active indicative, 1st sg.",
              choices: [
                "future active indicative, 1st sg.",
                "aorist active subjunctive, 1st sg.",
                "present active indicative, 1st sg.",
                "aorist active indicative, 1st sg."
              ] },
            { form: "ἔδωκα",
              prompt: "Parse this form.",
              answer: "aorist active indicative, 1st sg.",
              choices: [
                "aorist active indicative, 1st sg.",
                "perfect active indicative, 1st sg.",
                "imperfect active indicative, 1st sg.",
                "future active indicative, 1st sg."
              ],
              note: "δίδωμι uses a κ-aorist (ἔδωκα), distinct from the standard 1st-aorist σα-pattern." },
            { form: "δέδωκα",
              prompt: "Parse this form.",
              answer: "perfect active indicative, 1st sg.",
              choices: [
                "perfect active indicative, 1st sg.",
                "aorist active indicative, 1st sg.",
                "pluperfect active indicative, 1st sg.",
                "present active indicative, 1st sg."
              ],
              note: "Reduplication δε- + δωκ + α = perfect active." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "20": {
      label: "Chapter 20 Grammar",
      notes: "Final pieces — mixed review across the course",
      items: [
        {
          family: "Mixed review",
          lemma: "course-wide",
          gloss: "form/function recall",
          questions: [
            { form: "ἐν τῇ συναγωγῇ",
              prompt: "Translate this prepositional phrase.",
              answer: "'in the synagogue' (location)",
              choices: ["'in the synagogue' (location)", "'into the synagogue' (motion)", "'out of the synagogue'", "'on behalf of the synagogue'"] },
            { form: "ἵνα δοξάσῃ",
              prompt: "What construction is this?",
              answer: "purpose clause — 'in order that he might glorify'",
              choices: [
                "purpose clause — 'in order that he might glorify'",
                "indirect statement",
                "result clause",
                "conditional protasis"
              ] },
            { form: "ὁ διδάσκων",
              prompt: "What is the function of διδάσκων here?",
              answer: "substantive — 'the one who teaches / the teacher'",
              choices: [
                "substantive — 'the one who teaches / the teacher'",
                "attributive — 'the teaching man'",
                "adverbial — 'while teaching'",
                "predicate — 'is teaching'"
              ] },
            { form: "γέγραπται",
              prompt: "Translate this perfect-tense form.",
              answer: "'it stands written' / 'it is written'",
              choices: ["'it stands written' / 'it is written'", "'someone wrote'", "'they will write'", "'they had written'"] },
            { form: "ἐὰν λύσῃ",
              prompt: "What construction is this?",
              answer: "third-class condition (protasis) — 'if he should untie'",
              choices: [
                "third-class condition (protasis) — 'if he should untie'",
                "first-class condition — 'if (and assume true)'",
                "purpose clause",
                "indirect statement"
              ] }
          ]
        }
      ]
    }
  };

  // ───────────────────────────────────────────────────────────────────
  //  WEEK SUPPLEMENTS — aligned to lecture content (W1O–W8O)
  // ───────────────────────────────────────────────────────────────────
  const WEEK_GRAMMAR = {

    "W1O": {
      label: "Week 1 — Course Supplement Grammar",
      notes: "Alphabet · λύω / φιλέω · article and noun patterns · αὐτός · εἰμί",
      items: [
        {
          family: "Present indicative recognition",
          lemma: "λύω vs φιλέω",
          gloss: "uncontracted vs ε-contract",
          questions: [
            { form: "λύομεν vs φιλοῦμεν",
              prompt: "Why does φιλέω contract to φιλοῦμεν while λύω stays λύομεν?",
              answer: "φιλέω has stem-final ε that contracts with the connecting vowel: ε + ο → ου",
              choices: [
                "φιλέω has stem-final ε that contracts with the connecting vowel: ε + ο → ου",
                "φιλέω uses different personal endings",
                "λύω is irregular",
                "φιλέω is in a different mood"
              ] },
            { form: "φιλεῖ",
              prompt: "Parse this form.",
              answer: "present active indicative, 3rd sg. of φιλέω ('he/she/it loves')",
              choices: [
                "present active indicative, 3rd sg. of φιλέω ('he/she/it loves')",
                "present active indicative, 2nd sg. of φιλέω",
                "present active indicative, 3rd sg. of φιλέω + augment",
                "aorist active indicative, 3rd sg. of φιλέω"
              ],
              note: "Underlying φιλέ-ει: ε + ει → ει." }
          ]
        },
        {
          family: "Article and noun-pattern recognition",
          lemma: "λόγος / ἀρχή / ἔργον",
          gloss: "the three textbook paradigms",
          questions: [
            { form: "λόγος",
              prompt: "What declension and gender?",
              answer: "second declension, masculine",
              choices: ["second declension, masculine", "first declension, feminine", "second declension, neuter", "third declension, masculine"] },
            { form: "ἀρχή",
              prompt: "What declension and gender?",
              answer: "first declension, feminine (η-pattern)",
              choices: ["first declension, feminine (η-pattern)", "first declension, feminine (α-pattern)", "second declension, feminine", "third declension, feminine"] },
            { form: "ἔργον",
              prompt: "What declension and gender?",
              answer: "second declension, neuter",
              choices: ["second declension, neuter", "second declension, masculine", "first declension, neuter", "third declension, neuter"] }
          ]
        },
        {
          family: "αὐτός recognition",
          lemma: "αὐτός, αὐτή, αὐτό",
          gloss: "intensive / 3rd pers. pronoun / identifier",
          questions: [
            { form: "αὐτός",
              prompt: "Which use is this likely to be in the predicate position (e.g. ὁ ἀπόστολος αὐτός)?",
              answer: "intensive — 'the apostle himself'",
              choices: [
                "intensive — 'the apostle himself'",
                "identifier — 'the same apostle'",
                "personal — 'he, the apostle'",
                "demonstrative — 'this apostle'"
              ],
              note: "αὐτός in attributive position = 'same'; in predicate position = 'self'." },
            { form: "ὁ αὐτὸς ἀπόστολος",
              prompt: "Which use is this (attributive position)?",
              answer: "identifier — 'the same apostle'",
              choices: [
                "identifier — 'the same apostle'",
                "intensive — 'the apostle himself'",
                "personal — 'he, the apostle'",
                "predicate — 'the apostle is the same'"
              ] }
          ]
        }
      ]
    },

    "W2O": {
      label: "Week 2 — Course Supplement Grammar",
      notes: "Master indicative paradigm · moods · imperative · active masc. participles",
      items: [
        {
          family: "Tense identification",
          lemma: "λύω indicative",
          gloss: "present, future, imperfect, aorist",
          questions: [
            { form: "λύσομεν",
              prompt: "Parse this form.",
              answer: "future active indicative, 1st pl.",
              choices: [
                "future active indicative, 1st pl.",
                "present active indicative, 1st pl.",
                "aorist active subjunctive, 1st pl.",
                "imperfect active indicative, 1st pl."
              ] },
            { form: "ἐλύομεν",
              prompt: "Parse this form.",
              answer: "imperfect active indicative, 1st pl.",
              choices: [
                "imperfect active indicative, 1st pl.",
                "aorist active indicative, 1st pl.",
                "present active indicative, 1st pl.",
                "future active indicative, 1st pl."
              ] }
          ]
        },
        {
          family: "Mood identification",
          lemma: "moods of λύω",
          gloss: "indicative / imperative / infinitive",
          questions: [
            { form: "λυέτω",
              prompt: "Parse this form.",
              answer: "present active imperative, 3rd sg. ('let him untie')",
              choices: [
                "present active imperative, 3rd sg. ('let him untie')",
                "present active indicative, 3rd sg.",
                "present active subjunctive, 3rd sg.",
                "aorist active imperative, 3rd sg."
              ] },
            { form: "λῦσον",
              prompt: "Parse this form.",
              answer: "aorist active imperative, 2nd sg.",
              choices: [
                "aorist active imperative, 2nd sg.",
                "present active imperative, 2nd sg.",
                "aorist active indicative, 3rd sg.",
                "future active indicative, 3rd sg."
              ] }
          ]
        },
        {
          family: "Active masculine participle",
          lemma: "λύων",
          gloss: "present active participle",
          questions: [
            { form: "λύοντος",
              prompt: "Parse this form.",
              answer: "genitive singular masculine/neuter, present active participle",
              choices: [
                "genitive singular masculine/neuter, present active participle",
                "accusative singular masculine, present active participle",
                "nominative plural masculine, present active participle",
                "dative singular feminine, present active participle"
              ] },
            { form: "λύοντες",
              prompt: "Parse this form.",
              answer: "nominative plural masculine, present active participle",
              choices: [
                "nominative plural masculine, present active participle",
                "accusative plural masculine, present active participle",
                "nominative singular masculine, present active participle",
                "dative plural masculine, present active participle"
              ] }
          ]
        }
      ]
    },

    "W3O": {
      label: "Week 3 — Course Supplement Grammar",
      notes: "Middle voice · εἰμί infinitive / participle · demonstratives · personal pronouns",
      items: [
        {
          family: "Middle voice meaning",
          lemma: "λύομαι",
          gloss: "middle vs passive distinction",
          questions: [
            { form: "λύομαι",
              prompt: "Without context, what voice meanings are possible?",
              answer: "middle ('I untie for myself') or passive ('I am being untied')",
              choices: [
                "middle ('I untie for myself') or passive ('I am being untied')",
                "active only ('I untie')",
                "passive only ('I am being untied')",
                "deponent only — no active sense"
              ],
              note: "In the present and imperfect, middle and passive share the same form. Context decides." },
            { form: "λύονται",
              prompt: "Parse this form.",
              answer: "present middle/passive indicative, 3rd pl.",
              choices: [
                "present middle/passive indicative, 3rd pl.",
                "present active indicative, 3rd pl.",
                "future middle indicative, 3rd pl.",
                "imperfect middle/passive indicative, 3rd pl."
              ] }
          ]
        },
        {
          family: "εἰμί non-indicative",
          lemma: "εἰμί",
          gloss: "infinitive and participle",
          questions: [
            { form: "εἶναι",
              prompt: "Parse this form of εἰμί.",
              answer: "present infinitive ('to be')",
              choices: ["present infinitive ('to be')", "1st sg. present indicative", "present participle (nom. masc. sg.)", "imperative, 2nd sg."] },
            { form: "ὤν",
              prompt: "Parse this form of εἰμί.",
              answer: "nominative singular masculine, present participle ('being')",
              choices: [
                "nominative singular masculine, present participle ('being')",
                "nominative singular feminine, present participle",
                "nominative singular neuter, present participle",
                "1st sg. present indicative"
              ] }
          ]
        },
        {
          family: "Demonstratives and personal pronouns",
          lemma: "οὗτος / ἐκεῖνος / ἐγώ / σύ",
          gloss: "near, far, 1st, 2nd person",
          questions: [
            { form: "οὗτος ὁ ἀπόστολος",
              prompt: "Why is οὗτος in predicate position with the article on ἀπόστολος?",
              answer: "Demonstratives normally take predicate position with their noun — translated attributively",
              choices: [
                "Demonstratives normally take predicate position with their noun — translated attributively",
                "It's a typo; οὗτος should follow ἀπόστολος",
                "Predicate position changes the meaning to 'the apostle is this one'",
                "οὗτος is here a relative pronoun"
              ],
              note: "οὗτος ὁ ἀπόστολος = 'this apostle'; never *ὁ οὗτος ἀπόστολος." },
            { form: "ἡμῶν vs ὑμῶν",
              prompt: "Which means 'of us' (genitive of 'we')?",
              answer: "ἡμῶν",
              choices: ["ἡμῶν", "ὑμῶν", "both — they are interchangeable", "neither — both are 3rd person"] }
          ]
        }
      ]
    },

    "W4O": {
      label: "Week 4 — Course Supplement Grammar",
      notes: "Relative pronouns · second aorist · liquid futures",
      items: [
        {
          family: "Relative-pronoun agreement",
          lemma: "ὅς, ἥ, ὅ",
          gloss: "agreement with antecedent",
          questions: [
            { form: "ὁ ἀπόστολος ὃν εἶδον",
              prompt: "Why is the relative pronoun ὅν (acc.) when its antecedent ἀπόστολος is nominative?",
              answer: "Case is set by the relative's role in its own clause (here, direct object of εἶδον).",
              choices: [
                "Case is set by the relative's role in its own clause (here, direct object of εἶδον).",
                "It's an error — should be ὅς to match the antecedent.",
                "Relative pronouns always default to accusative.",
                "It's a typo for ὁ ἀπόστολος."
              ],
              note: "Gender + number from the antecedent; case from the relative's own clause." }
          ]
        },
        {
          family: "Second aorist recognition",
          lemma: "suppletive 2nd aorists",
          gloss: "different stem, secondary endings",
          questions: [
            { form: "ἦλθον",
              prompt: "Parse this form (in isolation).",
              answer: "aorist active indicative, 1st sg. or 3rd pl. of ἔρχομαι",
              choices: [
                "aorist active indicative, 1st sg. or 3rd pl. of ἔρχομαι",
                "imperfect active indicative, 1st sg. of ἔρχομαι",
                "present active indicative, 1st sg. of ἔρχομαι",
                "future active indicative, 1st sg. of ἔρχομαι"
              ],
              note: "Like ἔλυον, ἦλθον is ambiguous between 1 sg. and 3 pl. without context." },
            { form: "εἶπεν",
              prompt: "Parse this form.",
              answer: "aorist active indicative, 3rd sg. of λέγω ('he said')",
              choices: [
                "aorist active indicative, 3rd sg. of λέγω ('he said')",
                "imperfect active indicative, 3rd sg. of λέγω",
                "present active indicative, 3rd sg. of λέγω",
                "perfect active indicative, 3rd sg. of λέγω"
              ] }
          ]
        },
        {
          family: "Liquid futures",
          lemma: "μένω / ἀποστέλλω",
          gloss: "future without σ",
          questions: [
            { form: "μενοῦμεν",
              prompt: "Parse this form.",
              answer: "future active indicative, 1st pl. of μένω",
              choices: [
                "future active indicative, 1st pl. of μένω",
                "present active indicative, 1st pl. of μένω",
                "aorist active indicative, 1st pl. of μένω",
                "perfect active indicative, 1st pl. of μένω"
              ],
              note: "Looks like an ε-contract present, but the lemma μένω has no contract vowel — so the contraction signals the future." }
          ]
        }
      ]
    },

    "W5O": {
      label: "Week 5 — Course Supplement Grammar",
      notes: "Third declension · participial paradigms · second / third declension review",
      items: [
        {
          family: "Stem class identification",
          lemma: "third declension",
          gloss: "from genitive singular",
          questions: [
            { form: "θέλημα, θελήματος",
              prompt: "What stem class is this?",
              answer: "ματ-stem (neuter)",
              choices: ["ματ-stem (neuter)", "ν-stem", "κ-stem", "σ-stem"] },
            { form: "νύξ, νυκτός",
              prompt: "What stem class is this?",
              answer: "κ-stem (the κτ surfaces as ξ before σ)",
              choices: ["κ-stem (the κτ surfaces as ξ before σ)", "ν-stem", "σ-stem (neuter)", "ντ-stem"] },
            { form: "αἰών, αἰῶνος",
              prompt: "What stem class is this?",
              answer: "ν-stem",
              choices: ["ν-stem", "ντ-stem", "ματ-stem", "κ-stem"] }
          ]
        },
        {
          family: "Participle paradigms — visual cues",
          lemma: "λύων / λυόμενος",
          gloss: "active vs middle/passive",
          questions: [
            { form: "λύων",
              prompt: "Active or middle/passive participle?",
              answer: "active (3rd-decl. masc/neut + 1st-decl. fem.)",
              choices: [
                "active (3rd-decl. masc/neut + 1st-decl. fem.)",
                "middle/passive (2-1-2 adjective endings)",
                "passive only",
                "infinitive"
              ] },
            { form: "λυόμενος",
              prompt: "Active or middle/passive participle?",
              answer: "middle/passive (2-1-2 adjective endings)",
              choices: [
                "middle/passive (2-1-2 adjective endings)",
                "active (3rd-decl. masc/neut + 1st-decl. fem.)",
                "perfect passive",
                "aorist passive"
              ],
              note: "M/P participles always look like ἀγαθός, -ή, -όν." }
          ]
        }
      ]
    },

    "W6O": {
      label: "Week 6 — Course Supplement Grammar",
      notes: "Passive endings · passive participles · perfect · pluperfect · square of stops",
      items: [
        {
          family: "Aorist passive",
          lemma: "λύω passive",
          gloss: "θη marker",
          questions: [
            { form: "ἐλύθην",
              prompt: "Parse this form.",
              answer: "aorist passive indicative, 1st sg.",
              choices: [
                "aorist passive indicative, 1st sg.",
                "aorist active indicative, 1st sg.",
                "imperfect active indicative, 1st sg.",
                "perfect passive indicative, 1st sg."
              ],
              note: "augment + stem + θη + secondary active endings." },
            { form: "λυθήσεται",
              prompt: "Parse this form.",
              answer: "future passive indicative, 3rd sg.",
              choices: [
                "future passive indicative, 3rd sg.",
                "aorist passive indicative, 3rd sg.",
                "future middle indicative, 3rd sg.",
                "perfect passive indicative, 3rd sg."
              ],
              note: "θη + σ + middle endings = future passive." }
          ]
        },
        {
          family: "Aorist passive participle",
          lemma: "λυθείς, λυθεῖσα, λυθέν",
          gloss: "having been untied",
          questions: [
            { form: "λυθείς",
              prompt: "Parse this form.",
              answer: "nominative singular masculine, aorist passive participle",
              choices: [
                "nominative singular masculine, aorist passive participle",
                "nominative singular feminine, aorist passive participle",
                "genitive singular masculine, aorist passive participle",
                "nominative plural masculine, aorist passive participle"
              ] },
            { form: "λυθέντος",
              prompt: "Parse this form.",
              answer: "genitive singular masculine/neuter, aorist passive participle",
              choices: [
                "genitive singular masculine/neuter, aorist passive participle",
                "accusative singular masculine, aorist passive participle",
                "dative singular masculine/neuter, aorist passive participle",
                "nominative plural masculine, aorist passive participle"
              ] }
          ]
        },
        {
          family: "Perfect and pluperfect identification",
          lemma: "λέλυκα / ἐλελύκειν",
          gloss: "completed action / pluperfect",
          questions: [
            { form: "λέλυκα",
              prompt: "Parse this form.",
              answer: "perfect active indicative, 1st sg.",
              choices: [
                "perfect active indicative, 1st sg.",
                "aorist active indicative, 1st sg.",
                "imperfect active indicative, 1st sg.",
                "pluperfect active indicative, 1st sg."
              ] },
            { form: "ἐλελύκειν",
              prompt: "Parse this form.",
              answer: "pluperfect active indicative, 1st sg.",
              choices: [
                "pluperfect active indicative, 1st sg.",
                "perfect active indicative, 1st sg.",
                "aorist active indicative, 1st sg.",
                "imperfect active indicative, 1st sg."
              ] }
          ]
        }
      ]
    },

    "W7O": {
      label: "Week 7 — Course Supplement Grammar",
      notes: "Subjunctive · indefinite constructions · 3rd-person imperative · aspect",
      items: [
        {
          family: "Subjunctive recognition",
          lemma: "λύω subjunctive",
          gloss: "long-vowel marker",
          questions: [
            { form: "λύωμεν",
              prompt: "Parse this form.",
              answer: "present active subjunctive, 1st pl.",
              choices: [
                "present active subjunctive, 1st pl.",
                "present active indicative, 1st pl.",
                "aorist active subjunctive, 1st pl.",
                "imperfect active indicative, 1st pl."
              ],
              note: "ω in place of ο in 1st pl. is the subjunctive marker." },
            { form: "λύσῃ",
              prompt: "Parse this form (active reading).",
              answer: "aorist active subjunctive, 3rd sg.",
              choices: [
                "aorist active subjunctive, 3rd sg.",
                "future active indicative, 3rd sg.",
                "present active subjunctive, 3rd sg.",
                "aorist active indicative, 3rd sg."
              ],
              note: "σ + long-vowel ending = aorist subjunctive (no augment, since augment is indicative-only)." }
          ]
        },
        {
          family: "Indefinite constructions",
          lemma: "ὅς ἄν / ὅταν",
          gloss: "general clauses",
          questions: [
            { form: "ὃς ἂν λύσῃ",
              prompt: "Translate.",
              answer: "'whoever unties / should untie'",
              choices: ["'whoever unties / should untie'", "'who unties'", "'while untying'", "'in order that he untie'"] },
            { form: "ὅταν λύσῃ",
              prompt: "Translate.",
              answer: "'whenever he unties'",
              choices: ["'whenever he unties'", "'when he untied'", "'because he unties'", "'in order that he untie'"] }
          ]
        },
        {
          family: "3rd-person imperative",
          lemma: "λυέτω / λυσάτω",
          gloss: "let him / her untie",
          questions: [
            { form: "λυέτω",
              prompt: "Parse this form.",
              answer: "present active imperative, 3rd sg. ('let him untie')",
              choices: [
                "present active imperative, 3rd sg. ('let him untie')",
                "aorist active imperative, 3rd sg.",
                "present active indicative, 3rd sg.",
                "present active subjunctive, 3rd sg."
              ] },
            { form: "λυσάτω",
              prompt: "Parse this form.",
              answer: "aorist active imperative, 3rd sg. ('let him untie')",
              choices: [
                "aorist active imperative, 3rd sg. ('let him untie')",
                "present active imperative, 3rd sg.",
                "aorist active indicative, 3rd sg.",
                "future active indicative, 3rd sg."
              ] }
          ]
        },
        {
          family: "Aspect of imperatives",
          lemma: "present vs aorist imperative",
          gloss: "ongoing vs whole-event",
          questions: [
            { form: "πίστευε vs πίστευσον",
              prompt: "Which captures the imperfective ('keep on believing') sense?",
              answer: "πίστευε (present imperative)",
              choices: ["πίστευε (present imperative)", "πίστευσον (aorist imperative)", "both equally", "neither — both are perfective"] }
          ]
        }
      ]
    },

    "W8O": {
      label: "Week 8 — Course Supplement Grammar",
      notes: "-μι present active · -μι other active tenses · -μι middle/passive",
      items: [
        {
          family: "-μι present active",
          lemma: "δίδωμι",
          gloss: "athematic present",
          questions: [
            { form: "δίδομεν",
              prompt: "Parse this form.",
              answer: "present active indicative, 1st pl.",
              choices: [
                "present active indicative, 1st pl.",
                "present active subjunctive, 1st pl.",
                "imperfect active indicative, 1st pl.",
                "aorist active indicative, 1st pl."
              ],
              note: "Note the short-vowel stem (δίδο-) in the plural; long-vowel stem (διδω-) in the singular." },
            { form: "δίδοτε",
              prompt: "Parse this form (in isolation).",
              answer: "ambiguous: present active indicative or imperative, 2nd pl.",
              choices: [
                "ambiguous: present active indicative or imperative, 2nd pl.",
                "present active indicative, 2nd pl. — only",
                "present active imperative, 2nd pl. — only",
                "aorist active indicative, 2nd pl."
              ],
              note: "Same as λύετε / φιλεῖτε in the -ω class — context decides." }
          ]
        },
        {
          family: "-μι other tenses",
          lemma: "δίδωμι",
          gloss: "future / aorist / perfect",
          questions: [
            { form: "δώσει",
              prompt: "Parse this form.",
              answer: "future active indicative, 3rd sg.",
              choices: [
                "future active indicative, 3rd sg.",
                "aorist active subjunctive, 3rd sg.",
                "present active indicative, 3rd sg.",
                "aorist active indicative, 3rd sg."
              ] },
            { form: "ἔδωκεν",
              prompt: "Parse this form.",
              answer: "aorist active indicative, 3rd sg.",
              choices: [
                "aorist active indicative, 3rd sg.",
                "perfect active indicative, 3rd sg.",
                "imperfect active indicative, 3rd sg.",
                "future active indicative, 3rd sg."
              ],
              note: "δίδωμι uses a κ-aorist (ἔδωκα, ἔδωκας, ἔδωκε(ν)…)." }
          ]
        },
        {
          family: "-μι middle/passive",
          lemma: "δίδομαι",
          gloss: "athematic middle/passive",
          questions: [
            { form: "δίδοται",
              prompt: "Parse this form.",
              answer: "present middle/passive indicative, 3rd sg.",
              choices: [
                "present middle/passive indicative, 3rd sg.",
                "present active indicative, 3rd sg.",
                "perfect middle/passive indicative, 3rd sg.",
                "aorist middle/passive indicative, 3rd sg."
              ] }
          ]
        }
      ]
    }
  };

  // ───────────────────────────────────────────────────────────────────
  //  MERGE → single GRAMMAR_SETS keyed by chapter or W-key
  // ───────────────────────────────────────────────────────────────────
  const GRAMMAR_SETS = {};
  Object.entries(CHAPTER_GRAMMAR).forEach(([key, set]) => { GRAMMAR_SETS[key] = set; });
  Object.entries(WEEK_GRAMMAR).forEach(([key, set]) => { GRAMMAR_SETS[key] = set; });
  if (window.SUPPLEMENTAL_GRAMMAR_SETS && typeof window.SUPPLEMENTAL_GRAMMAR_SETS === 'object') {
    Object.entries(window.SUPPLEMENTAL_GRAMMAR_SETS).forEach(([key, set]) => { GRAMMAR_SETS[key] = set; });
  }

  // ───────────────────────────────────────────────────────────────────
  //  HELPERS
  // ───────────────────────────────────────────────────────────────────
  function localShuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function stableGrammarKey(text) {
    return String(text || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}+/gu, '')
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .toLowerCase()
      .replace(/^-+|-+$/g, '');
  }

  // ───────────────────────────────────────────────────────────────────
  //  PUBLIC BUILDERS
  // ───────────────────────────────────────────────────────────────────
  function buildGrammarCardsForKeys(keys) {
    const selected = (keys || []).map(String);
    const cards = [];

    selected.forEach((key) => {
      const set = GRAMMAR_SETS[key];
      if (!set) return;

      const chapterNum = /^\d+$/.test(key) ? Number(key) : 0;

      set.items.forEach((item, itemIdx) => {
        item.questions.forEach((q, qIdx) => {
          const rawChoices = Array.isArray(q.choices) ? q.choices : [];
          const choices = localShuffle(Array.from(new Set([q.answer, ...rawChoices])));
          cards.push({
            id: `grammar-${key}-${itemIdx}-${qIdx}-${stableGrammarKey(item.lemma)}-${stableGrammarKey(q.form)}-${stableGrammarKey(q.prompt || 'parse')}-${stableGrammarKey(q.answer)}`,
            kind: 'morph',
            required: true,
            sourceKey: String(key),
            sourceLabel: set.label,
            chapter: chapterNum,
            family: item.family,
            lemma: item.lemma,
            gloss: item.gloss,
            form: q.form,
            prompt: q.prompt || 'Choose the best answer.',
            context: q.context || '',
            note: q.note || '',
            rationale: q.rationale || '',
            explanations: q.explanations || null,
            answer: q.answer,
            choices
          });
        });
      });
    });

    return cards;
  }

  function getGrammarCountForKey(key) {
    const set = GRAMMAR_SETS[String(key)];
    if (!set) return 0;
    return set.items.reduce((sum, item) => sum + item.questions.length, 0);
  }

  // ───────────────────────────────────────────────────────────────────
  //  EXPORTS
  //
  //  We expose GRAMMAR_SETS / buildGrammarCardsForKeys / getGrammarCountForKey
  //  as the sole grammar interface. Earlier names (extra / focus / third-pass)
  //  used by the previous three-file layout are no longer needed; app.js was
  //  updated to call only the consolidated names.
  // ───────────────────────────────────────────────────────────────────
  window.GRAMMAR_SETS = GRAMMAR_SETS;
  window.buildGrammarCardsForKeys = buildGrammarCardsForKeys;
  window.getGrammarCountForKey = getGrammarCountForKey;

})();
