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
                "an action verb — the subject performs an action on something",
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
          lemma: "ἐν, εἰς, ἐκ, ἀπό, σύν, πρός, ἐνώπιον, ἔξω, ἕως, πρό",
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
              note: "'to', 'toward'. (πρός + dat./gen. are rare in the NT.)" },
            { form: "ἐνώπιον", prompt: "Which case does ἐνώπιον take?", answer: "genitive",
              choices: ["nominative", "genitive", "dative", "accusative"],
              note: "'in front of, in the presence of'. Improper preposition: always + gen." },
            { form: "ἔξω", prompt: "Which case does ἔξω take?", answer: "genitive",
              choices: ["nominative", "genitive", "dative", "accusative"],
              note: "'outside'. Improper preposition: always + gen." },
            { form: "ἕως", prompt: "Which case does ἕως take?", answer: "genitive",
              choices: ["nominative", "genitive", "dative", "accusative"],
              note: "'until, as far as'. Can also be a conjunction ('until')." },
            { form: "πρό", prompt: "Which case does πρό take?", answer: "genitive",
              choices: ["nominative", "genitive", "dative", "accusative"],
              note: "'before' (time or place). Always + gen." }
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
              choices: ["because of, on account of", "through (means or agency)", "with", "after"] },
            { form: "διὰ τοῦτο", prompt: "Best translation?",
              answer: "'on account of this' / 'for this reason'",
              choices: ["'on account of this' / 'for this reason'", "'through this'", "'with this'", "'into this'"],
              note: "διά + accusative = 'because of'. A very common NT discourse marker." },
            { form: "διὰ τοῦ Ἰησοῦ", prompt: "Best translation?",
              answer: "'through Jesus' (agency/means)",
              choices: ["'through Jesus' (agency/means)", "'because of Jesus'", "'with Jesus'", "'after Jesus'"],
              note: "διά + genitive = 'through' — typical for agency or means." }
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
              choices: ["after (in time)", "with (in company with)", "before", "instead of"] },
            { form: "μετὰ τῶν μαθητῶν", prompt: "Best translation?",
              answer: "'with the disciples'",
              choices: ["'with the disciples'", "'after the disciples'", "'through the disciples'", "'against the disciples'"],
              note: "μετά + genitive = 'with' (association)." },
            { form: "μετὰ ταῦτα", prompt: "Best translation?",
              answer: "'after these things'",
              choices: ["'after these things'", "'with these things'", "'because of these things'", "'around these things'"],
              note: "μετά + accusative = 'after' — common temporal connector in narrative." }
          ]
        },
        {
          family: "ὑπό and ὑπέρ",
          lemma: "ὑπό / ὑπέρ",
          gloss: "by, under / for, above",
          questions: [
            { form: "ὑπό + genitive", prompt: "ὑπό + genitive means…",
              answer: "by (marking the doer of the action)",
              choices: ["by (marking the doer of the action)", "under (location)", "above", "on behalf of"],
              note: "Marks the doer of the action; the construction will return when passive verbs are introduced later." },
            { form: "ὑπό + accusative", prompt: "ὑπό + accusative means…",
              answer: "under (motion or location)",
              choices: ["under (motion or location)", "by (the doer)", "above", "after"] },
            { form: "ὑπέρ + genitive", prompt: "ὑπέρ + genitive means…",
              answer: "on behalf of, for the sake of",
              choices: ["on behalf of, for the sake of", "above (location)", "by (the doer)", "under"] },
            { form: "ὑπέρ + accusative", prompt: "ὑπέρ + accusative means…",
              answer: "above, beyond (rare)",
              choices: ["above, beyond (rare)", "on behalf of", "by (the doer)", "with"] }
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
              note: "κατὰ Μᾶρκον = 'according to Mark'." },
            { form: "κατὰ τὸν νόμον", prompt: "Best translation?",
              answer: "'according to the law'",
              choices: ["'according to the law'", "'against the law'", "'down from the law'", "'with the law'"],
              note: "κατά + accusative = 'according to' — a defining NT idiom." },
            { form: "κατὰ τοῦ Ἰησοῦ", prompt: "Best translation?",
              answer: "'against Jesus'",
              choices: ["'against Jesus'", "'according to Jesus'", "'with Jesus'", "'through Jesus'"],
              note: "κατά + genitive often = 'against' (or 'down from'). Contrast κατά + accusative = 'according to'." }
          ]
        },
        {
          family: "ἐπί (multi-case)",
          lemma: "ἐπί",
          gloss: "on / onto / on the basis of",
          questions: [
            { form: "ἐπί + accusative", prompt: "ἐπί + accusative means…",
              answer: "onto, to (motion toward)",
              choices: ["onto, to (motion toward)", "on (location)", "on the basis of", "against"] },
            { form: "ἐπί + genitive", prompt: "ἐπί + genitive means…",
              answer: "on, upon (location)",
              choices: ["on, upon (location)", "onto (motion)", "on the basis of", "after"] },
            { form: "ἐπί + dative", prompt: "ἐπί + dative means…",
              answer: "on the basis of / at",
              choices: ["on the basis of / at", "onto (motion)", "on, upon (location)", "against"],
              note: "ἐπί is the most flexible preposition — context decides the case." }
          ]
        },
        {
          family: "παρά (multi-case)",
          lemma: "παρά",
          gloss: "from / beside / alongside",
          questions: [
            { form: "παρά + accusative", prompt: "παρά + accusative means…",
              answer: "alongside (motion to a side)",
              choices: ["alongside (motion to a side)", "from beside (source)", "beside (location)", "above"] },
            { form: "παρά + genitive", prompt: "παρά + genitive means…",
              answer: "from beside (source, often of a person)",
              choices: ["from beside (source, often of a person)", "alongside (motion)", "beside (location)", "instead of"],
              note: "Like ἀπό/ἐκ but personal: 'from (the side of) X'." },
            { form: "παρά + dative", prompt: "παρά + dative means…",
              answer: "beside, at (location, often with a person)",
              choices: ["beside, at (location, often with a person)", "alongside (motion)", "from beside", "on behalf of"] }
          ]
        },
        {
          family: "περί (multi-case)",
          lemma: "περί",
          gloss: "around / concerning",
          questions: [
            { form: "περί + accusative", prompt: "περί + accusative means…",
              answer: "around, about (location/approx.)",
              choices: ["around, about (location/approx.)", "concerning, about (topic)", "after", "by"] },
            { form: "περί + genitive", prompt: "περί + genitive means…",
              answer: "concerning, about (topic)",
              choices: ["concerning, about (topic)", "around (location)", "on behalf of", "through"],
              note: "Mnemonic: gen. = 'about the topic'; acc. = 'around the place'." },
            { form: "περὶ τοῦ Χριστοῦ", prompt: "Best translation?",
              answer: "'concerning Christ' / 'about Christ'",
              choices: ["'concerning Christ' / 'about Christ'", "'around Christ' (locational)", "'on behalf of Christ'", "'through Christ'"],
              note: "περί + gen. for the topic of speech or thought." },
            { form: "περὶ τὴν θάλασσαν", prompt: "Best translation?",
              answer: "'around the sea' (locational)",
              choices: ["'around the sea' (locational)", "'concerning the sea' (topic)", "'after the sea'", "'against the sea'"],
              note: "περί + acc. = 'around' (spatial)." }
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
          lemma: "ἀγαθός, ἀγαθή, ἀγαθόν",
          gloss: "good — attributive uses",
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
              note: "Both attributive patterns mean 'the good word'. The repeated article is the giveaway." },
            { form: "ὁ πιστὸς δοῦλος",
              prompt: "How should this attributive phrase be translated?",
              answer: "'the faithful servant'",
              choices: [
                "'the faithful servant'",
                "'the servant is faithful'",
                "'the faithful one'",
                "'O faithful servant!'"
              ],
              note: "Article–adj–noun: attributive. The adjective is inside the article phrase, sharing it with the noun." }
          ]
        },
        {
          family: "Predicate position",
          lemma: "ἀγαθός, ἀγαθή, ἀγαθόν",
          gloss: "good — predicate uses",
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
              choices: ["predicate", "attributive (adj–noun)", "attributive (noun–adj)", "substantive"] },
            { form: "πιστὸς ὁ θεός",
              prompt: "How should this be translated?",
              answer: "'God is faithful'",
              choices: [
                "'God is faithful'",
                "'the faithful God'",
                "'a faithful God'",
                "'O faithful God!'"
              ],
              note: "Anarthrous adj. + arthrous noun = predicate. ἐστίν is understood." }
          ]
        },
        {
          family: "Substantive use",
          lemma: "ἀγαθός, ἀγαθή, ἀγαθόν",
          gloss: "good — substantive uses",
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
              note: "Neuter plural substantives often refer to abstractions or 'things'." },
            { form: "οἱ πιστοί",
              prompt: "What does this likely mean (no noun expressed)?",
              answer: "'the faithful [people]' — masculine plural substantive",
              choices: [
                "'the faithful [people]' — masculine plural substantive",
                "'the faithful things' — neuter plural substantive",
                "'they are faithful' — predicate",
                "'O faithful ones!' — vocative"
              ],
              note: "Article + adj. with no noun = substantive use; gender and number signal what kind of person/thing." }
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
              choices: ["1st aorist (active indicative, 1st sg.)", "imperfect (1st sg.)", "present (1st sg.)", "future (1st sg.)"],
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
                "the imperfect alone (never the present)",
                "the future"
              ],
              note: "Imperfective aspect views the action from inside, as in progress." },
            { form: "aspect",
              prompt: "Which Greek tense is most strongly associated with perfective aspect (whole event as a single point)?",
              answer: "the aorist",
              choices: ["the aorist", "the present", "the future", "the imperfect"],
              note: "Perfective aspect views the action from outside as a complete whole — not necessarily 'punctiliar'." },
            { form: "aspect",
              prompt: "Which Greek tense is aspectually neutral / underdetermined for aspect?",
              answer: "the future",
              choices: ["the future", "the aorist", "the imperfect", "the present"],
              note: "The future locates an event in later time but does not commit to imperfective or perfective viewpoint." }
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
                "imperfect",
                "present indicative",
                "nothing — σ is just a stem letter"
              ] },
            { form: "ε- augment",
              prompt: "What does the augment ε- mark on a verb?",
              answer: "past time (imperfect or aorist indicative)",
              choices: [
                "past time (imperfect or aorist indicative)",
                "future time",
                "present time",
                "non-indicative mood"
              ],
              note: "Augment + present stem = imperfect; augment + aorist stem = aorist." },
            { form: "ἀπολύω → ἀπ-έ-λυον",
              prompt: "Where does the augment land on a compound verb like ἀπολύω?",
              answer: "after the prepositional prefix and before the verb stem",
              choices: [
                "after the prepositional prefix and before the verb stem",
                "at the very start of the word, before the prefix",
                "at the end of the verb form",
                "compound verbs never receive an augment"
              ],
              note: "ἀπολύω → ἀπέλυον. The prefix loses its final vowel by elision before the augment." }
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
                "a plain statement of fact",
                "a direct command",
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
      notes: "Other patterns of nouns and verbs — 1st declension, contract verbs, εἰμί, deponent verbs",
      items: [
        {
          family: "First-declension feminine nouns",
          lemma: "ἡμέρα / δόξα / γραφή",
          gloss: "day / glory / writing",
          questions: [
            { form: "ἡμέρα",
              prompt: "What sub-type of 1st-declension feminine is this?",
              answer: "α-pure (keeps α throughout the singular)",
              choices: [
                "α-pure (keeps α throughout the singular)",
                "α-impure (α in nom./acc., η in gen./dat.)",
                "η-stem (η throughout the singular)",
                "1st-declension masculine"
              ],
              note: "Stems ending in ε, ι, or ρ keep α in all four singular cases." },
            { form: "δόξα",
              prompt: "What sub-type of 1st-declension feminine is this?",
              answer: "α-impure (α in nom./acc., η in gen./dat.)",
              choices: [
                "α-impure (α in nom./acc., η in gen./dat.)",
                "α-pure (keeps α throughout the singular)",
                "η-stem (η throughout the singular)",
                "2nd-declension feminine"
              ],
              note: "δόξα, δόξης, δόξῃ, δόξαν." },
            { form: "γραφή",
              prompt: "What sub-type of 1st-declension feminine is this?",
              answer: "η-stem (η throughout the singular)",
              choices: [
                "η-stem (η throughout the singular)",
                "α-pure (keeps α throughout the singular)",
                "α-impure (α in nom./acc., η in gen./dat.)",
                "2nd-declension neuter"
              ],
              note: "γραφή, γραφῆς, γραφῇ, γραφήν — η runs through the whole singular." },
            { form: "1st-decl. plural",
              prompt: "What plural endings do ALL 1st-declension feminines share?",
              answer: "-αι, -ῶν, -αις, -ας",
              choices: [
                "-αι, -ῶν, -αις, -ας",
                "-οι, -ων, -οις, -ους",
                "-α, -ων, -σι, -α",
                "-ες, -ων, -σι, -ας"
              ],
              note: "Sub-type splits matter only in the singular; the plural is uniform." }
          ]
        },
        {
          family: "First-declension masculine nouns",
          lemma: "προφήτης / νεανίας",
          gloss: "prophet / young man",
          questions: [
            { form: "προφήτης",
              prompt: "What declension and gender is προφήτης?",
              answer: "1st declension, masculine",
              choices: [
                "1st declension, masculine",
                "1st declension, feminine",
                "2nd declension, masculine",
                "2nd declension, neuter"
              ],
              note: "A handful of 1st-decl. nouns are masculine: they take -ης or -ας in the nom. sg." },
            { form: "προφήτου",
              prompt: "Why does the genitive sg. end in -ου instead of the usual feminine -ης?",
              answer: "1st-decl. masculines borrow the 2nd-decl. masc. -ου in the gen. sg.",
              choices: [
                "1st-decl. masculines borrow the 2nd-decl. masc. -ου in the gen. sg.",
                "It's a typo — it should be προφήτης.",
                "All 1st-decl. nouns end in -ου in the gen. sg.",
                "-ου marks the accusative."
              ],
              note: "προφήτης, προφήτου, προφήτῃ, προφήτην." },
            { form: "νεανίας",
              prompt: "What is unusual about this 1st-declension masculine?",
              answer: "It keeps α throughout the singular (α-pure pattern).",
              choices: [
                "It keeps α throughout the singular (α-pure pattern).",
                "It is actually neuter, despite appearances.",
                "Its plural endings are 2nd-declension.",
                "It has no genitive singular."
              ],
              note: "νεανίας, νεανίου, νεανίᾳ, νεανίαν — like ἡμέρα but masculine, with the masc. -ου gen." }
          ]
        },
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
          family: "εἰμί imperfect",
          lemma: "εἰμί",
          gloss: "I was",
          questions: [
            { form: "ἤμην",
              prompt: "Identify this form of εἰμί.",
              answer: "imperfect, 1st singular ('I was')",
              choices: [
                "imperfect, 1st singular ('I was')",
                "present, 1st singular ('I am')",
                "imperfect, 3rd singular ('he was')",
                "imperfect, 1st plural ('we were')"
              ] },
            { form: "ἦν",
              prompt: "Identify this form of εἰμί.",
              answer: "imperfect, 3rd singular ('he/she/it was')",
              choices: [
                "imperfect, 3rd singular ('he/she/it was')",
                "imperfect, 1st singular ('I was')",
                "present, 3rd plural ('they are')",
                "imperfect, 3rd plural ('they were')"
              ],
              note: "ἦν is one of the most common verbs in NT narrative." },
            { form: "ἦσαν",
              prompt: "Identify this form of εἰμί.",
              answer: "imperfect, 3rd plural ('they were')",
              choices: [
                "imperfect, 3rd plural ('they were')",
                "imperfect, 3rd singular ('he was')",
                "imperfect, 2nd plural ('you all were')",
                "present, 3rd plural ('they are')"
              ] },
            { form: "εἰμί imperfect",
              prompt: "Why does εἰμί's imperfect lack the usual ε- augment up front?",
              answer: "εἰμί is irregular; its imperfect uses a fixed stem (ἠ-/ἤμ-) rather than the regular augment pattern.",
              choices: [
                "εἰμί is irregular; its imperfect uses a fixed stem (ἠ-/ἤμ-) rather than the regular augment pattern.",
                "It does have an augment — the η is the augmented form of ε.",
                "εἰμί has no imperfect; ἦν is actually a present form.",
                "The augment dropped because εἰμί is enclitic."
              ],
              note: "Some grammarians do treat the η as a long-vowel augment of ε-; either way, just memorise the paradigm." }
          ]
        },
        {
          family: "Middle voice and deponent verbs",
          lemma: "ἔρχομαι / δέχομαι",
          gloss: "middle-form, active-meaning verbs",
          questions: [
            { form: "deponent",
              prompt: "What is a deponent verb?",
              answer: "a verb whose lexical (lemma) form ends in -ομαι and which is active in meaning despite its middle-looking form",
              choices: [
                "a verb whose lexical (lemma) form ends in -ομαι and which is active in meaning despite its middle-looking form",
                "a verb that has lost its present-tense forms",
                "a verb that drops the augment in the past",
                "a verb that lacks a 3rd-person form"
              ],
              note: "Lemma test: if the dictionary form ends in -ομαι (not -ω), the verb is deponent." },
            { form: "ἔρχομαι",
              prompt: "Identify this form.",
              answer: "1st singular ('I come / go') — a deponent verb",
              choices: [
                "1st singular ('I come / go') — a deponent verb",
                "1st singular passive ('I am being come to')",
                "3rd singular ('he comes')",
                "infinitive ('to come')"
              ],
              note: "Middle/passive form, active meaning. The lemma itself ends in -ομαι, so it is deponent." },
            { form: "δέχομαι vs δέχω",
              prompt: "Which form is the dictionary (lemma) form?",
              answer: "δέχομαι",
              choices: ["δέχομαι", "δέχω", "either is acceptable", "δέξω"],
              note: "δέχομαι is deponent; *δέχω is not a real form." },
            { form: "ἔρχεται",
              prompt: "Parse this form.",
              answer: "present indicative, 3rd singular ('he/she/it comes')",
              choices: [
                "present indicative, 3rd singular ('he/she/it comes')",
                "present indicative, 2nd singular ('you come')",
                "present indicative, 3rd plural ('they come')",
                "imperfect indicative, 3rd singular ('he was coming')"
              ],
              note: "Middle/passive endings on a deponent verb: still translated actively." },
            { form: "λύομαι",
              prompt: "Without context, what voice meanings are possible?",
              answer: "middle ('I untie for myself') or passive ('I am being untied')",
              choices: [
                "middle ('I untie for myself') or passive ('I am being untied')",
                "active only ('I untie')",
                "passive only ('I am being untied')",
                "middle only ('I untie for myself')"
              ],
              note: "In the present and imperfect, middle and passive share the same form. Context decides which sense is in play." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "9": {
      label: "Chapter 9 Grammar",
      notes: "Demonstratives (οὗτος, ἐκεῖνος); third-person pronouns (αὐτός, ἄλλος); 1st/2nd person pronouns with reflexives & possessives; conjunctions (timid words, μέν…δέ, καί)",
      items: [
        {
          family: "9.1 Formation of ἐκεῖνος and οὗτος",
          lemma: "ἐκεῖνος / οὗτος",
          gloss: "that / this",
          questions: [
            { form: "ἐκεῖνος endings",
              prompt: "What endings does ἐκεῖνος use?",
              answer: "standard 2-1-2 (adjective) endings: -ος, -η, -ο (like καλός, καλή, καλόν)",
              choices: [
                "standard 2-1-2 (adjective) endings: -ος, -η, -ο (like καλός, καλή, καλόν)",
                "3rd-declension endings throughout",
                "unique endings used by no other word",
                "the same forms as the definite article"
              ],
              note: "ἐκεῖνος is fully regular — stem ἐκεινο- + adjective endings." },
            { form: "οὗτος — two stems",
              prompt: "Why does οὗτος have forms beginning with both ου- and αυ-?",
              answer: "the stem vowel echoes the article: ου- where the article has ο (ὁ, οἱ, τοῦ, τῷ…); αυ- where the article has α (ἡ, αἱ, τῆς, τῇ…)",
              choices: [
                "the stem vowel echoes the article: ου- where the article has ο (ὁ, οἱ, τοῦ, τῷ…); αυ- where the article has α (ἡ, αἱ, τῆς, τῇ…)",
                "ου- is singular, αυ- is plural — pure number distinction",
                "ου- is masculine and αυ- is feminine in every case",
                "they are random spelling variants with no rule"
              ],
              note: "οὗτος, αὕτη, τοῦτο / τούτου, ταύτης, τούτου …" },
            { form: "οὗτος — τ vs rough breathing",
              prompt: "Which forms of οὗτος start with τ- and which with a rough-breathed vowel?",
              answer: "τ- where the article has τ (τοῦ → τούτου, τήν → ταύτην); rough-breathed vowel where the article has none (ὁ → οὗτος, ἡ → αὕτη, οἱ → οὗτοι, αἱ → αὗται)",
              choices: [
                "τ- where the article has τ (τοῦ → τούτου, τήν → ταύτην); rough-breathed vowel where the article has none (ὁ → οὗτος, ἡ → αὕτη, οἱ → οὗτοι, αἱ → αὗται)",
                "rough-breathed forms are masculine; τ- forms are feminine",
                "τ- forms are singular; rough-breathed forms are plural",
                "it is unpredictable and must be learned form by form"
              ],
              note: "Useful rule of thumb: 'οὗτος follows the article'." },
            { form: "αὕτη vs αὐτή",
              prompt: "Distinguish αὕτη from αὐτή.",
              answer: "αὕτη (rough breathing) = 'this' (nom. sg. fem. of οὗτος); αὐτή (smooth breathing) = 'she / herself / same' (αὐτός)",
              choices: [
                "αὕτη (rough breathing) = 'this' (nom. sg. fem. of οὗτος); αὐτή (smooth breathing) = 'she / herself / same' (αὐτός)",
                "they are alternate spellings of the same word",
                "αὕτη is 3rd person pronoun, αὐτή is the demonstrative",
                "αὕτη is plural, αὐτή is singular"
              ],
              note: "Tiny breathing mark, very different meanings." },
            { form: "οὗτος ὁ ἀπόστολος",
              prompt: "Why is οὗτος in predicate position even though it is translated attributively?",
              answer: "Greek demonstratives always sit OUTSIDE the article-noun phrase (predicate position), yet are translated attributively ('this apostle')",
              choices: [
                "Greek demonstratives always sit OUTSIDE the article-noun phrase (predicate position), yet are translated attributively ('this apostle')",
                "It is a typo; οὗτος belongs between the article and the noun",
                "It means 'the apostle is this one' — a predicate sentence",
                "Demonstratives normally take attributive position; this is an exception"
              ],
              note: "Allowed: οὗτος ὁ ἀπόστολος / ὁ ἀπόστολος οὗτος. Forbidden: *ὁ οὗτος ἀπόστολος." },
            { form: "ἐκείνη",
              prompt: "Parse this form.",
              answer: "nom. sg. fem. of ἐκεῖνος — 'that (one)'",
              choices: [
                "nom. sg. fem. of ἐκεῖνος — 'that (one)'",
                "nom. sg. masc. of ἐκεῖνος",
                "nom. sg. fem. of οὗτος — 'this'",
                "dat. sg. fem. of the article"
              ],
              note: "ἐκεῖνος is fully regular 2-1-2: ἐκεῖνος, ἐκείνη, ἐκεῖνο." },
            { form: "ἐκεῖνος ὁ ἄνθρωπος",
              prompt: "Translate.",
              answer: "'that man' — ἐκεῖνος in predicate position, rendered attributively",
              choices: [
                "'that man' — ἐκεῖνος in predicate position, rendered attributively",
                "'this man' (near demonstrative)",
                "'the man is that one' (predicate sentence)",
                "'the same man' (αὐτός attributive)"
              ],
              note: "Like οὗτος, ἐκεῖνος always sits outside the article–noun phrase but translates attributively." },
            { form: "ἐκεῖνος vs οὗτος",
              prompt: "What is the contrast between ἐκεῖνος and οὗτος?",
              answer: "ἐκεῖνος = far demonstrative ('that, yonder'); οὗτος = near demonstrative ('this, here')",
              choices: [
                "ἐκεῖνος = far demonstrative ('that, yonder'); οὗτος = near demonstrative ('this, here')",
                "ἐκεῖνος = near; οὗτος = far",
                "they are interchangeable",
                "ἐκεῖνος is singular; οὗτος is plural"
              ] },
            { form: "τοῦτο vs ἐκεῖνο",
              prompt: "Identify the neuter nominative/accusative singular of each demonstrative.",
              answer: "τοῦτο (this) for οὗτος; ἐκεῖνο (that) for ἐκεῖνος — both end in -ο like the article τό",
              choices: [
                "τοῦτο (this) for οὗτος; ἐκεῖνο (that) for ἐκεῖνος — both end in -ο like the article τό",
                "τοῦτον / ἐκεῖνον — both take -ν",
                "ταῦτα / ἐκεῖνα — these are the singular forms",
                "τοῦτος / ἐκεῖνος — neuter is identical to masculine"
              ] }
          ]
        },
        {
          family: "9.2 Third-person pronouns — αὐτός & ἄλλος",
          lemma: "αὐτός / ἄλλος",
          gloss: "he-she-it / self / same / other",
          questions: [
            { form: "αὐτός — three uses",
              prompt: "What are the three main uses of αὐτός?",
              answer: "(1) third-person pronoun in oblique cases ('him, her, it'); (2) emphatic / intensive adjective in predicate position ('himself'); (3) identifying adjective in attributive position ('the same')",
              choices: [
                "(1) third-person pronoun in oblique cases ('him, her, it'); (2) emphatic / intensive adjective in predicate position ('himself'); (3) identifying adjective in attributive position ('the same')",
                "only as a third-person pronoun — never adjectival",
                "only as the demonstrative 'this'",
                "as a relative pronoun and as an article"
              ] },
            { form: "αὐτὸς ὁ ἀπόστολος",
              prompt: "Translate (predicate position).",
              answer: "'the apostle himself' — αὐτός emphatic / intensive",
              choices: [
                "'the apostle himself' — αὐτός emphatic / intensive",
                "'the same apostle' — αὐτός identifying",
                "'this apostle' — demonstrative",
                "'his apostle' — possessive"
              ],
              note: "Predicate position (outside article-noun) = 'self'." },
            { form: "ὁ αὐτὸς ἀπόστολος",
              prompt: "Translate (attributive position).",
              answer: "'the same apostle' — αὐτός identifying",
              choices: [
                "'the same apostle' — αὐτός identifying",
                "'the apostle himself' — αὐτός emphatic",
                "'this apostle' — demonstrative",
                "'his apostle' — possessive"
              ],
              note: "Inside the article-noun bracket (attributive) = 'same'." },
            { form: "αὐτοῦ",
              prompt: "What is the most common force of αὐτοῦ in NT Greek?",
              answer: "third-person pronoun, gen. sg. masc. — 'of him / his'",
              choices: [
                "third-person pronoun, gen. sg. masc. — 'of him / his'",
                "'self' (emphatic nominative)",
                "'the same' (attributive)",
                "'that one' (far demonstrative)"
              ],
              note: "Oblique cases of αὐτός — gen./dat./acc. — are the normal way to say 'him, of him, to him' etc." },
            { form: "ἄλλος",
              prompt: "What does ἄλλος mean, and what is unusual about it?",
              answer: "'other' / 'another'; its neuter nom./acc. singular is ἄλλο (no -ν), like the article τό",
              choices: [
                "'other' / 'another'; its neuter nom./acc. singular is ἄλλο (no -ν), like the article τό",
                "'self'; takes regular 2-1-2 endings throughout",
                "'same'; declines like αὐτός",
                "'this'; declines like οὗτος"
              ],
              note: "Compare ἄλλο with English 'other' — the masc./fem. follow 2-1-2 endings normally (ἄλλος, ἄλλη)." },
            { form: "αὐτὴ ἡ γυνή",
              prompt: "Translate (αὐτή in predicate position).",
              answer: "'the woman herself' — emphatic / intensive αὐτός",
              choices: [
                "'the woman herself' — emphatic / intensive αὐτός",
                "'the same woman' — attributive αὐτός",
                "'this woman' — demonstrative",
                "'her woman' — possessive"
              ],
              note: "Outside the article–noun bracket = 'self'." },
            { form: "αὐτός — position rule (emphatic)",
              prompt: "Where must αὐτός sit when it means 'self / himself / etc.'?",
              answer: "in predicate position — OUTSIDE the article–noun phrase",
              choices: [
                "in predicate position — OUTSIDE the article–noun phrase",
                "in attributive position — between article and noun",
                "always immediately after the verb",
                "always sentence-initial"
              ] },
            { form: "αὐτὸς ὁ Ἰησοῦς εἶπεν",
              prompt: "Translate.",
              answer: "'Jesus himself said …' — emphatic αὐτός",
              choices: [
                "'Jesus himself said …' — emphatic αὐτός",
                "'The same Jesus said …' — identifying αὐτός",
                "'This Jesus said …' — demonstrative",
                "'His Jesus said …' — possessive"
              ] },
            { form: "ὁ αὐτὸς κύριος",
              prompt: "Translate (αὐτός in attributive position).",
              answer: "'the same Lord' — identifying αὐτός",
              choices: [
                "'the same Lord' — identifying αὐτός",
                "'the Lord himself' — emphatic αὐτός",
                "'this Lord' — demonstrative",
                "'his Lord' — possessive"
              ] },
            { form: "αὐτός — position rule (identifying)",
              prompt: "Where must αὐτός sit when it means 'the same'?",
              answer: "in attributive position — between the article and the noun (or with article repeated, e.g., ὁ λόγος ὁ αὐτός)",
              choices: [
                "in attributive position — between the article and the noun (or with article repeated, e.g., ὁ λόγος ὁ αὐτός)",
                "in predicate position — outside the article–noun phrase",
                "always sentence-initial",
                "always after the verb"
              ] },
            { form: "αὐτῷ",
              prompt: "What is the most likely force of αὐτῷ?",
              answer: "'to / for him' — dat. sg. masc. of αὐτός (3rd-person pronoun)",
              choices: [
                "'to / for him' — dat. sg. masc. of αὐτός (3rd-person pronoun)",
                "'self' — nom. sg. masc.",
                "'of his own' — reflexive",
                "'them' — acc. pl."
              ] },
            { form: "αὐτούς",
              prompt: "Parse and translate.",
              answer: "acc. pl. masc. of αὐτός — 'them' (direct object)",
              choices: [
                "acc. pl. masc. of αὐτός — 'them' (direct object)",
                "gen. pl. masc. — 'of them'",
                "nom. pl. masc. — 'they themselves'",
                "dat. pl. masc. — 'to them'"
              ] },
            { form: "ἄλλο",
              prompt: "Why does ἄλλο not have a final -ν, unlike καλόν?",
              answer: "ἄλλος follows the article pattern: neuter nom./acc. sg. ends in -ο (like τό), not -ον",
              choices: [
                "ἄλλος follows the article pattern: neuter nom./acc. sg. ends in -ο (like τό), not -ον",
                "it is a typo for ἄλλον",
                "the -ν always drops before a consonant",
                "ἄλλο is dat. sg., not acc. sg."
              ] },
            { form: "οἱ ἄλλοι",
              prompt: "Translate.",
              answer: "'the others' / 'the other ones'",
              choices: [
                "'the others' / 'the other ones'",
                "'each one'",
                "'this one'",
                "'they themselves'"
              ] }
          ]
        },
        {
          family: "9.3 1st & 2nd person pronouns — reflexives and possessives",
          lemma: "ἐγώ / σύ / ἐμαυτοῦ / ἐμός",
          gloss: "I, you, myself, my",
          questions: [
            { form: "ἐγώ / σύ — emphatic vs enclitic",
              prompt: "Greek 1st/2nd-singular pronouns have two oblique forms. What is the difference?",
              answer: "emphatic (accented) forms ἐμοῦ, ἐμοί, ἐμέ / σοῦ, σοί, σέ are used for emphasis or after prepositions; enclitic forms μου, μοι, με / σου, σοι, σε are unaccented and used when no emphasis is needed",
              choices: [
                "emphatic (accented) forms ἐμοῦ, ἐμοί, ἐμέ / σοῦ, σοί, σέ are used for emphasis or after prepositions; enclitic forms μου, μοι, με / σου, σοι, σε are unaccented and used when no emphasis is needed",
                "the emphatic forms are singular, the enclitic forms plural",
                "they are dialectal variants of the same meaning",
                "the enclitic forms are reflexive, the emphatic forms are not"
              ] },
            { form: "ἡμῶν vs ὑμῶν",
              prompt: "How are 'of us' and 'of you (pl)' distinguished?",
              answer: "ἡμῶν = 'of us' (rough breathing); ὑμῶν = 'of you (pl)' (smooth breathing)",
              choices: [
                "ἡμῶν = 'of us' (rough breathing); ὑμῶν = 'of you (pl)' (smooth breathing)",
                "ἡμῶν = 'of you (pl)'; ὑμῶν = 'of us'",
                "they are interchangeable",
                "ἡμῶν is reflexive, ὑμῶν is plain"
              ],
              note: "Breathing is the only visual difference — high-frequency confusion point." },
            { form: "reflexive — 1st & 2nd sg",
              prompt: "How are the singular reflexive pronouns 'myself' and 'yourself' formed?",
              answer: "ἐμαυτοῦ, -ῆς ('myself') and σεαυτοῦ, -ῆς ('yourself') — personal stem + αὐτο- stem, declined together; no nominative",
              choices: [
                "ἐμαυτοῦ, -ῆς ('myself') and σεαυτοῦ, -ῆς ('yourself') — personal stem + αὐτο- stem, declined together; no nominative",
                "ἐγώ and σύ themselves serve as the reflexive forms",
                "by adding αὐ- as a prefix to the regular pronoun",
                "by using ὅς as a reflexive marker"
              ],
              note: "Reflexives lack a nominative — by definition the subject can't 'reflex' onto itself in the nom." },
            { form: "reflexive — 3rd sg / plural",
              prompt: "What is the 3rd-person reflexive ('himself / herself / themselves')?",
              answer: "ἑαυτοῦ, -ῆς, -οῦ — used for 3rd sg AND, in the plural ἑαυτῶν, for all three persons of the plural reflexive",
              choices: [
                "ἑαυτοῦ, -ῆς, -οῦ — used for 3rd sg AND, in the plural ἑαυτῶν, for all three persons of the plural reflexive",
                "αὐτός alone serves as the 3rd-person reflexive",
                "the relative ὅς doubles as the reflexive",
                "there is no 3rd-person reflexive in Koine"
              ],
              note: "Koine collapses 1pl/2pl/3pl reflexives into the single form ἑαυτῶν." },
            { form: "possessive adjectives",
              prompt: "What are the 1st/2nd-person possessive adjectives, and how do they differ from the genitive pronoun?",
              answer: "ἐμός, -ή, -όν ('my'); σός, -ή, -όν ('your sg'); ἡμέτερος ('our'); ὑμέτερος ('your pl') — they are declined adjectives that agree with the noun, unlike the gen. forms μου / σου / ἡμῶν / ὑμῶν which simply follow the noun",
              choices: [
                "ἐμός, -ή, -όν ('my'); σός, -ή, -όν ('your sg'); ἡμέτερος ('our'); ὑμέτερος ('your pl') — they are declined adjectives that agree with the noun, unlike the gen. forms μου / σου / ἡμῶν / ὑμῶν which simply follow the noun",
                "they are identical to the personal pronouns in form and use",
                "they are adverbs, not adjectives",
                "they are unique 3rd-declension forms"
              ],
              note: "ὁ ἐμὸς λόγος ≈ ὁ λόγος μου — both 'my word', but the adjective is more emphatic." },
            { form: "ἐμέ vs με",
              prompt: "Which is the emphatic accusative of 'I / me'?",
              answer: "ἐμέ (accented, with prothetic ε-)",
              choices: [
                "ἐμέ (accented, with prothetic ε-)",
                "με (unaccented enclitic)",
                "both — they are interchangeable in every context",
                "neither — these are 2nd-person forms"
              ],
              note: "Use ἐμέ for emphasis and after prepositions (πρὸς ἐμέ); use the enclitic με when no emphasis is needed." },
            { form: "after prepositions",
              prompt: "Which form follows a preposition: ἐμοῦ / μου?",
              answer: "ἐμοῦ — prepositions take the emphatic form",
              choices: [
                "ἐμοῦ — prepositions take the emphatic form",
                "μου — prepositions take the enclitic",
                "either — there is no rule",
                "neither — prepositions never govern personal pronouns"
              ] },
            { form: "ἐμαυτόν",
              prompt: "Parse and translate.",
              answer: "acc. sg. masc. of ἐμαυτοῦ — 'myself' (1st-sg. reflexive)",
              choices: [
                "acc. sg. masc. of ἐμαυτοῦ — 'myself' (1st-sg. reflexive)",
                "nom. sg. masc. — 'I myself' (emphatic)",
                "gen. sg. — 'of my own'",
                "acc. sg. — 'me' (regular pronoun)"
              ],
              note: "Reflexive: subject and object refer to the same person." },
            { form: "no nominative",
              prompt: "Why do reflexive pronouns lack a nominative form?",
              answer: "A subject cannot 'reflex' onto itself in the nominative — reflexives only describe an object/oblique referring back to the subject",
              choices: [
                "A subject cannot 'reflex' onto itself in the nominative — reflexives only describe an object/oblique referring back to the subject",
                "Greek reflexives DO have a nominative — it's just rare",
                "The nominative is supplied by ἐγώ / σύ themselves",
                "Reflexives are indeclinable"
              ] },
            { form: "ὁ ἐμὸς λόγος",
              prompt: "Translate.",
              answer: "'my word' — possessive adjective ἐμός in attributive position",
              choices: [
                "'my word' — possessive adjective ἐμός in attributive position",
                "'the word is mine' — predicate sentence",
                "'his own word' — reflexive",
                "'the same word' — αὐτός"
              ] },
            { form: "ἡμέτερος",
              prompt: "Translate and parse 'ἡμέτερος'.",
              answer: "'our' — 1st-person plural possessive adjective, declined like καλός, -ή, -όν",
              choices: [
                "'our' — 1st-person plural possessive adjective, declined like καλός, -ή, -όν",
                "'your (pl.)' — 2nd-person plural possessive",
                "'ourselves' — 1st-person plural reflexive",
                "'of us' — gen. pl. of the personal pronoun"
              ] }
          ]
        },
        {
          family: "9.4 Conjunctions — timid words, μέν…δέ, δέ, καί",
          lemma: "μέν / δέ / καί",
          gloss: "common connectors",
          questions: [
            { form: "timid (postpositive) words",
              prompt: "What does it mean to call a word 'timid' (postpositive)?",
              answer: "it cannot stand first in its clause — it 'hides' in second (or later) position",
              choices: [
                "it cannot stand first in its clause — it 'hides' in second (or later) position",
                "it is a particle of negation",
                "it always carries an enclitic accent",
                "it must take a rough breathing"
              ],
              note: "δέ, γάρ, οὖν, μέν are the classic timid (postpositive) connectors. In English we put them first ('but…', 'for…'); in Greek, never." },
            { form: "δέ — first or second?",
              prompt: "Where does δέ appear in its clause, and how is it translated to English position?",
              answer: "δέ stands second (or later) in Greek, but is translated FIRST in English ('But …' / 'And …')",
              choices: [
                "δέ stands second (or later) in Greek, but is translated FIRST in English ('But …' / 'And …')",
                "δέ stands first in Greek as in English",
                "δέ always stands at the end of the clause",
                "δέ may stand anywhere; word order is free"
              ] },
            { form: "μέν … δέ",
              prompt: "What pair of ideas does μέν … δέ set up?",
              answer: "a balance: 'on the one hand … on the other hand' / 'X …, but Y …'",
              choices: [
                "a balance: 'on the one hand … on the other hand' / 'X …, but Y …'",
                "a strong adversative: 'not X but rather Y'",
                "a causal pair: 'because X, therefore Y'",
                "a temporal pair: 'when X, then Y'"
              ],
              note: "Both are postpositive: e.g. ὁ μὲν Πέτρος … ὁ δὲ Ἰωάννης …" },
            { form: "δέ alone",
              prompt: "When δέ appears without a preceding μέν, what does it most often signal?",
              answer: "a mild continuation or transition — 'and / but / now' — moving the narrative along without strong contrast",
              choices: [
                "a mild continuation or transition — 'and / but / now' — moving the narrative along without strong contrast",
                "always a strong adversative — 'but rather, in fact'",
                "always a causal — 'because'",
                "always an inferential — 'therefore'"
              ],
              note: "Solo δέ is the workhorse connective of NT narrative — often weaker than English 'but'." },
            { form: "καί — connective",
              prompt: "What is the most common use of καί?",
              answer: "as the connective 'and', joining words, phrases, or clauses",
              choices: [
                "as the connective 'and', joining words, phrases, or clauses",
                "as the adversative 'but'",
                "as the inferential 'therefore'",
                "as the causal 'because'"
              ] },
            { form: "καί — adverbial",
              prompt: "Besides 'and', what does καί commonly mean when it sits BEFORE a single word it highlights?",
              answer: "'also' or 'even' — adverbial / ascensive καί",
              choices: [
                "'also' or 'even' — adverbial / ascensive καί",
                "'but' — adversative",
                "'or' — disjunctive",
                "'because' — causal"
              ],
              note: "καὶ σύ = 'you too / even you', not 'and you'. Position tells you which sense." },
            { form: "καί vs δέ",
              prompt: "Which is postpositive: καί or δέ?",
              answer: "δέ is postpositive (timid); καί is not — καί stands first like English 'and'",
              choices: [
                "δέ is postpositive (timid); καί is not — καί stands first like English 'and'",
                "both are postpositive",
                "neither is postpositive",
                "καί is postpositive; δέ is not"
              ] },
            { form: "which is NOT postpositive?",
              prompt: "Which of the following words is NOT timid (postpositive)?",
              answer: "καί — it stands first in its clause like English 'and'",
              choices: [
                "καί — it stands first in its clause like English 'and'",
                "δέ — postpositive",
                "γάρ — postpositive",
                "οὖν — postpositive"
              ] },
            { form: "translating timid words",
              prompt: "When you translate a timid (postpositive) Greek connector into English, where does it go?",
              answer: "FIRST in the English clause — even though it was second (or later) in Greek",
              choices: [
                "FIRST in the English clause — even though it was second (or later) in Greek",
                "Wherever it was in Greek — preserve the order",
                "Last in the English clause",
                "It is dropped entirely"
              ],
              note: "ὁ δὲ Ἰησοῦς εἶπεν = 'But Jesus said …', not 'Jesus but said …'." },
            { form: "ὁ μὲν Πέτρος … ὁ δὲ Ἰωάννης …",
              prompt: "Translate the structure.",
              answer: "'Peter on the one hand … John on the other hand …' (or 'Peter …, but John …')",
              choices: [
                "'Peter on the one hand … John on the other hand …' (or 'Peter …, but John …')",
                "'Both Peter and John …'",
                "'Either Peter or John …'",
                "'Peter and John together …'"
              ] },
            { form: "μέν alone",
              prompt: "What does μέν do when it appears WITHOUT a following δέ?",
              answer: "still signals 'on the one hand' — the contrast may be implicit, or μέν simply flags the topic",
              choices: [
                "still signals 'on the one hand' — the contrast may be implicit, or μέν simply flags the topic",
                "becomes the negative particle 'not'",
                "becomes a causal — 'because'",
                "is identical to δέ in solo use"
              ],
              note: "In Koine narrative the implied 'δέ' clause sometimes just doesn't arrive." },
            { form: "δέ — narrative tone",
              prompt: "In NT narrative, which English rendering best captures plain solo δέ?",
              answer: "'and' or 'now' — a soft, transitional connective; reserve 'but' for stronger contrasts",
              choices: [
                "'and' or 'now' — a soft, transitional connective; reserve 'but' for stronger contrasts",
                "always 'but' — strong adversative",
                "always 'because' — causal",
                "always 'therefore' — inferential"
              ] },
            { form: "καὶ σύ",
              prompt: "How is the καί best translated in καὶ σύ;?",
              answer: "'you also' / 'even you' — ascensive / adverbial καί before a single word",
              choices: [
                "'you also' / 'even you' — ascensive / adverbial καί before a single word",
                "'and you' — connective καί",
                "'but you' — adversative καί",
                "'because you' — causal καί"
              ] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "10": {
      label: "Chapter 10 Grammar",
      notes: "Basic complex sentences — relative clauses, leading questions with μή/οὐ, ὅτι for direct & indirect statement, and time expressions by case",
      items: [
        {
          family: "Relative clauses — overview",
          lemma: "relative clause",
          gloss: "subordinate clause modifying a noun",
          questions: [
            { form: "definition",
              prompt: "What is a relative clause?",
              answer: "a subordinate clause that modifies a noun (its antecedent), introduced by a relative pronoun",
              choices: [
                "a subordinate clause that modifies a noun (its antecedent), introduced by a relative pronoun",
                "a main clause that states the central idea of the sentence",
                "any clause introduced by ὅτι",
                "a clause expressing purpose, introduced by ἵνα"
              ],
              note: "E.g. ὁ ἀπόστολος ὃν βλέπω = 'the apostle whom I see' — ὃν βλέπω is the relative clause modifying ἀπόστολος." },
            { form: "antecedent",
              prompt: "What is the 'antecedent' of a relative clause?",
              answer: "the noun (or pronoun) in the main clause that the relative pronoun refers back to",
              choices: [
                "the noun (or pronoun) in the main clause that the relative pronoun refers back to",
                "the verb of the relative clause",
                "the conjunction introducing the clause",
                "the subject of the relative clause"
              ] },
            { form: "agreement",
              prompt: "A relative pronoun agrees with its antecedent in which categories?",
              answer: "gender and number (its case is determined by its role in its own clause)",
              choices: [
                "gender and number (its case is determined by its role in its own clause)",
                "case, gender, and number — all three",
                "case and number only",
                "case only"
              ],
              note: "Antecedent fixes gender + number; the relative's own clause fixes its case." },
            { form: "ὁ ἀπόστολος ὃν βλέπω",
              prompt: "Why is the relative pronoun ὅν (accusative) here, even though ἀπόστολος is nominative?",
              answer: "the relative takes its case from its function in the relative clause — here it is the direct object of βλέπω",
              choices: [
                "the relative takes its case from its function in the relative clause — here it is the direct object of βλέπω",
                "the relative always matches its antecedent in case",
                "ὅν is actually nominative; it just looks like an accusative",
                "Greek relatives are always accusative"
              ] }
          ]
        },
        {
          family: "Relative pronoun — formation of ὅς, ἥ, ὅ",
          lemma: "ὅς, ἥ, ὅ",
          gloss: "who, which, that",
          questions: [
            { form: "ὅς",
              prompt: "Identify this form.",
              answer: "nom. sg. masculine of the relative pronoun ('who / which')",
              choices: [
                "nom. sg. masculine of the relative pronoun ('who / which')",
                "the masculine article ὁ with an accent",
                "nom. sg. feminine",
                "acc. sg. masculine"
              ],
              note: "Rough breathing + acute accent distinguishes ὅς from the article ὁ." },
            { form: "ἥ vs ἡ",
              prompt: "How do you tell the relative pronoun ἥ (fem. sg. nom.) from the feminine article ἡ?",
              answer: "the relative ἥ carries an accent; the article ἡ is unaccented (proclitic)",
              choices: [
                "the relative ἥ carries an accent; the article ἡ is unaccented (proclitic)",
                "the breathing — relative is smooth, article is rough",
                "they are identical and only context distinguishes them",
                "the relative is always capitalised"
              ],
              note: "Both have rough breathing. Accent is the diagnostic." },
            { form: "endings",
              prompt: "The relative pronoun ὅς, ἥ, ὅ uses which set of endings?",
              answer: "the standard 2-1-2 (adjective) endings, like καλός, καλή, καλόν",
              choices: [
                "the standard 2-1-2 (adjective) endings, like καλός, καλή, καλόν",
                "the 3rd-declension endings used by πᾶς",
                "a unique set found nowhere else",
                "the same endings as the article (τοῦ, τῇ, τόν...)"
              ],
              note: "Masc./neut. follow the 2nd declension, fem. follows the 1st — all with rough breathing on the stem." },
            { form: "οὗ / ᾧ / ὅν",
              prompt: "Match these three forms (masc. sg.) to their cases.",
              answer: "οὗ = gen., ᾧ = dat., ὅν = acc.",
              choices: [
                "οὗ = gen., ᾧ = dat., ὅν = acc.",
                "οὗ = dat., ᾧ = gen., ὅν = nom.",
                "οὗ = acc., ᾧ = gen., ὅν = dat.",
                "οὗ = nom., ᾧ = acc., ὅν = gen."
              ] },
            { form: "neuter ὅ vs ὅτι",
              prompt: "How is the neuter relative ὅ distinguished from the conjunction ὅτι?",
              answer: "ὅ is a single syllable (relative pronoun, neut. sg.); ὅτι is two syllables and is the conjunction 'that / because'",
              choices: [
                "ὅ is a single syllable (relative pronoun, neut. sg.); ὅτι is two syllables and is the conjunction 'that / because'",
                "they are interchangeable",
                "ὅ is the conjunction, ὅτι the pronoun",
                "both are relative pronouns in different cases"
              ] }
          ]
        },
        {
          family: "Leading questions — μή vs οὐ",
          lemma: "μή / οὐ in questions",
          gloss: "questions that 'slant' toward a yes or no answer",
          questions: [
            { form: "οὐ + question",
              prompt: "A question introduced by οὐ (or οὐχ / οὐκ) expects what answer?",
              answer: "'yes' — the questioner assumes a positive answer",
              choices: [
                "'yes' — the questioner assumes a positive answer",
                "'no' — the questioner assumes a negative answer",
                "neither — it is a neutral question",
                "either, depending on tone"
              ],
              note: "οὐκ οἴδατε; = 'You know, don't you?' (expecting 'yes')." },
            { form: "μή + question",
              prompt: "A question introduced by μή expects what answer?",
              answer: "'no' — the questioner expects (or hopes for) a negative answer",
              choices: [
                "'no' — the questioner expects (or hopes for) a negative answer",
                "'yes' — the questioner expects a positive answer",
                "neither — it is a neutral question",
                "always 'yes', regardless of context"
              ],
              note: "μὴ σὺ μείζων εἶ; = 'You're not greater, are you?' (expecting 'no')." },
            { form: "neutral question",
              prompt: "How is a neutral yes-or-no question (with no slant) marked in Greek?",
              answer: "by intonation and the Greek question mark (·;·) alone, with no introductory particle",
              choices: [
                "by intonation and the Greek question mark (·;·) alone, with no introductory particle",
                "always by ἆρα at the head of the clause",
                "by οὐ at the head, like a leading 'yes' question",
                "by μή at the head, like a leading 'no' question"
              ] },
            { form: "οὐχ οὗτός ἐστιν ὁ υἱός;",
              prompt: "Translate, capturing the slant.",
              answer: "'This is the son, isn't it?' / 'Isn't this the son?' (expecting 'yes')",
              choices: [
                "'This is the son, isn't it?' / 'Isn't this the son?' (expecting 'yes')",
                "'This isn't the son, is it?' (expecting 'no')",
                "'Is this the son?' (neutral)",
                "'This is not the son.' (statement, not a question)"
              ] },
            { form: "οὐκ οἴδατε;",
              prompt: "Translate, capturing the slant.",
              answer: "'You know, don't you?' / 'Don't you know?' (expecting 'yes')",
              choices: [
                "'You know, don't you?' / 'Don't you know?' (expecting 'yes')",
                "'You don't know, do you?' (expecting 'no')",
                "'Do you know?' (neutral)",
                "'You do not know.' (statement)"
              ] },
            { form: "οὐ slant — speaker's attitude",
              prompt: "If a speaker uses an οὐ-question, what is their attitude toward the answer?",
              answer: "confident — they expect the answer to be 'yes'",
              choices: [
                "confident — they expect the answer to be 'yes'",
                "tentative or doubtful — they expect 'no'",
                "neutral — they have no expectation",
                "demanding — they want an immediate command response"
              ] },
            { form: "μὴ σὺ μείζων εἶ τοῦ πατρός;",
              prompt: "Translate, capturing the slant.",
              answer: "'You are not greater than the father, are you?' (expecting 'no')",
              choices: [
                "'You are not greater than the father, are you?' (expecting 'no')",
                "'Aren't you greater than the father?' (expecting 'yes')",
                "'Are you greater than the father?' (neutral)",
                "'You are not greater than the father.' (statement)"
              ] },
            { form: "μή slant — speaker's attitude",
              prompt: "If a speaker uses a μή-question, what is their attitude toward the answer?",
              answer: "tentative or doubtful — they suspect / hope the answer is 'no'",
              choices: [
                "tentative or doubtful — they suspect / hope the answer is 'no'",
                "confident that the answer is 'yes'",
                "neutral and open to either answer",
                "demanding an immediate command response"
              ] },
            { form: "μή τι …;",
              prompt: "μή τι (with the indefinite τι) at the head of a question slants it how?",
              answer: "still 'no' — a tentative question; the τι softens it even further ('he hasn't, has he…?')",
              choices: [
                "still 'no' — a tentative question; the τι softens it even further ('he hasn't, has he…?')",
                "'yes' — confident affirmation",
                "neutral — pure information question",
                "command — 'don't do it!'"
              ] }
          ]
        },
        {
          family: "ὅτι — direct and indirect statement",
          lemma: "ὅτι",
          gloss: "that / because",
          questions: [
            { form: "indirect statement",
              prompt: "After verbs of saying, thinking, or knowing, ὅτι + indicative most often introduces…",
              answer: "an indirect statement ('he said that …')",
              choices: [
                "an indirect statement ('he said that …')",
                "a purpose clause ('in order that …')",
                "a result clause ('so that …')",
                "a temporal clause ('when …')"
              ],
              note: "λέγει ὅτι ὁ κύριος ἔρχεται = 'he says that the Lord is coming.'" },
            { form: "tense in indirect statement",
              prompt: "In Greek indirect statement with ὅτι, the verb tense matches…",
              answer: "the tense the original speaker used (Greek keeps the direct-speech tense)",
              choices: [
                "the tense the original speaker used (Greek keeps the direct-speech tense)",
                "the tense of the main verb (backshifted, as in English)",
                "always the aorist, regardless of original",
                "always the present, regardless of original"
              ],
              note: "Greek does NOT backshift like English: εἶπεν ὅτι ἔρχεται = 'he said that he was coming' (lit. 'is coming')." },
            { form: "direct statement (ὅτι recitativum)",
              prompt: "ὅτι is sometimes used to mark direct speech. In that case it is rendered…",
              answer: "left untranslated — it functions like opening quotation marks",
              choices: [
                "left untranslated — it functions like opening quotation marks",
                "as 'because' — direct speech is always causal",
                "as 'so that' — direct speech is always result",
                "as 'whether' — direct speech is always interrogative"
              ],
              note: "λέγει ὅτι· Ἐγώ εἰμι = 'he says, “I am.”'" },
            { form: "indirect vs direct test",
              prompt: "Which clue most reliably marks ὅτι as recitative (direct) rather than introducing indirect statement?",
              answer: "the following words use 1st/2nd person and present-time perspective of the original speaker (often signalled by capitalisation or ·)",
              choices: [
                "the following words use 1st/2nd person and present-time perspective of the original speaker (often signalled by capitalisation or ·)",
                "ὅτι is recitative whenever the main verb is in the present tense",
                "ὅτι is recitative whenever followed by an aorist",
                "there is no way to tell — both are translated the same"
              ] },
            { form: "ὅτι (causal)",
              prompt: "A third use of ὅτι, distinct from direct and indirect statement, is…",
              answer: "causal — 'because'",
              choices: ["causal — 'because'", "conditional — 'if'", "concessive — 'although'", "final — 'in order that'"] },
            { form: "ἀπεκρίθη ὅτι Ἐγὼ οὐκ εἰμὶ ὁ Χριστός",
              prompt: "Translate, recognising ὅτι recitative.",
              answer: "'He answered, “I am not the Christ.”' — ὅτι is left untranslated (opening quotation marks)",
              choices: [
                "'He answered, “I am not the Christ.”' — ὅτι is left untranslated (opening quotation marks)",
                "'He answered that I am not the Christ.' — indirect statement",
                "'He answered because I am not the Christ.' — causal",
                "'He answered in order that I might not be the Christ.' — purpose"
              ],
              note: "Tell-tale: the embedded clause uses 1st-person 'I' — that's the original speaker, not the narrator." },
            { form: "direct vs indirect signal",
              prompt: "Which feature most reliably signals a ὅτι-clause is DIRECT (recitative), not indirect?",
              answer: "the embedded clause keeps the original speaker's 1st-/2nd-person pronouns and tense ('I am…'), as if quoting verbatim",
              choices: [
                "the embedded clause keeps the original speaker's 1st-/2nd-person pronouns and tense ('I am…'), as if quoting verbatim",
                "the embedded clause uses ὅτι in second position",
                "the main verb is in the aorist tense",
                "the embedded clause is a question"
              ] },
            { form: "λέγει ὅτι Ἐγώ εἰμι",
              prompt: "Translate.",
              answer: "'He says, “I am.”' — ὅτι recitativum",
              choices: [
                "'He says, “I am.”' — ὅτι recitativum",
                "'He says that I am.' — indirect statement (he says about me)",
                "'He says because I am.' — causal",
                "'He says, “He is.”' — backshifted indirect"
              ] },
            { form: "οἶδα ὅτι ὁ θεὸς ἀγαθός ἐστιν",
              prompt: "Translate (indirect statement with ὅτι).",
              answer: "'I know that God is good.'",
              choices: [
                "'I know that God is good.'",
                "'I know, because God is good.'",
                "'I know, in order that God may be good.'",
                "'I know, “God is good”' (direct quote)"
              ],
              note: "Indirect statement after verbs of knowing / saying / thinking." },
            { form: "εἶπεν ὅτι ἔρχεται",
              prompt: "Translate (indirect statement; mind Greek tense usage).",
              answer: "'He said that he was coming' — Greek keeps the present tense of direct speech; English back-shifts to past",
              choices: [
                "'He said that he was coming' — Greek keeps the present tense of direct speech; English back-shifts to past",
                "'He said that he is coming' — Greek and English match in tense always",
                "'He said because he is coming' — causal",
                "'He says that he came' — Greek backshifts aorist"
              ] }
          ]
        },
        {
          family: "Time expressions by case",
          lemma: "accusative / genitive / dative of time",
          gloss: "case marks the kind of time reference",
          questions: [
            { form: "duration",
              prompt: "Which case expresses duration of time ('for how long')?",
              answer: "accusative",
              choices: ["accusative", "genitive", "dative", "nominative"],
              note: "δύο ἡμέρας = 'for two days'." },
            { form: "time within which",
              prompt: "Which case expresses the time within which something happens ('during', 'in the course of')?",
              answer: "genitive",
              choices: ["genitive", "accusative", "dative", "nominative"],
              note: "νυκτός = 'during the night' / 'by night'." },
            { form: "point in time",
              prompt: "Which case expresses a point in time ('at when', 'on what day')?",
              answer: "dative",
              choices: ["dative", "accusative", "genitive", "vocative"],
              note: "τῇ τρίτῃ ἡμέρᾳ = 'on the third day'." },
            { form: "δύο ἡμέρας",
              prompt: "Translate this time expression.",
              answer: "'for two days' (duration — accusative)",
              choices: [
                "'for two days' (duration — accusative)",
                "'on the second day' (point — dative)",
                "'within two days' (during — genitive)",
                "'two days are…' (subject — nominative)"
              ] },
            { form: "τῇ ἡμέρᾳ",
              prompt: "Translate this time expression.",
              answer: "'on the day' (point in time — dative)",
              choices: [
                "'on the day' (point in time — dative)",
                "'for the day' (duration — accusative)",
                "'during the day' (within which — genitive)",
                "'the day is…' (subject — nominative)"
              ] },
            { form: "νυκτός",
              prompt: "Translate this time expression.",
              answer: "'by night' / 'during the night' (genitive — time within which)",
              choices: [
                "'by night' / 'during the night' (genitive — time within which)",
                "'for the night' (accusative — duration)",
                "'on the night' (dative — point in time)",
                "'the night' (nominative — subject)"
              ] },
            { form: "case summary",
              prompt: "Match the case to the time idea: accusative / genitive / dative.",
              answer: "acc. = duration ('for'); gen. = time within which ('during'); dat. = point ('at / on')",
              choices: [
                "acc. = duration ('for'); gen. = time within which ('during'); dat. = point ('at / on')",
                "acc. = point; gen. = duration; dat. = within which",
                "acc. = within which; gen. = point; dat. = duration",
                "all three cases mean the same thing — case is purely stylistic"
              ] },
            { form: "τρεῖς ἡμέρας",
              prompt: "Translate this time expression.",
              answer: "'for three days' — accusative of duration",
              choices: [
                "'for three days' — accusative of duration",
                "'on the third day' — dative point",
                "'within three days' — genitive 'within which'",
                "'three days are…' — nominative subject"
              ] },
            { form: "ὅλην τὴν νύκτα",
              prompt: "Translate this time expression.",
              answer: "'all night long' / 'for the whole night' — accusative of duration",
              choices: [
                "'all night long' / 'for the whole night' — accusative of duration",
                "'at the whole night' — dative point",
                "'during the whole night' — genitive within which",
                "'the whole night is…' — nominative"
              ],
              note: "Whenever the question is 'for how long?', look for the accusative." },
            { form: "ἡμέρας καὶ νυκτός",
              prompt: "Translate this paired time expression.",
              answer: "'by day and by night' / 'during day and night' — genitive of time within which",
              choices: [
                "'by day and by night' / 'during day and night' — genitive of time within which",
                "'for a day and a night' — accusative duration",
                "'on day and night' — dative point",
                "'the day and night' — nominative subjects"
              ] },
            { form: "νυκτὸς καὶ ἡμέρας",
              prompt: "Which case is being used here for time, and why?",
              answer: "genitive — the time within which the action takes place ('during day and night')",
              choices: [
                "genitive — the time within which the action takes place ('during day and night')",
                "accusative — duration ('for a day and a night')",
                "dative — point in time ('at day and night')",
                "nominative — subject of the verb"
              ] },
            { form: "τῷ σαββάτῳ",
              prompt: "Translate this time expression.",
              answer: "'on the sabbath' — dative of time (point in time)",
              choices: [
                "'on the sabbath' — dative of time (point in time)",
                "'for the sabbath' — accusative duration",
                "'during the sabbath' — genitive within which",
                "'with the sabbath' — dative of accompaniment"
              ] },
            { form: "ἐν ἐκείνῃ τῇ ἡμέρᾳ",
              prompt: "Translate.",
              answer: "'on that day' — dative of time (often reinforced by ἐν in Koine)",
              choices: [
                "'on that day' — dative of time (often reinforced by ἐν in Koine)",
                "'for that day' — accusative duration",
                "'during that day' — genitive within which",
                "'with that day' — dative of accompaniment"
              ],
              note: "Koine often adds ἐν + dative to express point in time, alongside the bare dative." }
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
                "1st aorist (σα + secondary endings)",
                "future (with σ + primary endings)"
              ],
              note: "Stem reveals the tense; ending reveals person/number." }
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
                "The future is identical to the present, with no change.",
                "An iota replaces the σ between stem and ending."
              ],
              note: "μενῶ, μενεῖς, μενεῖ, μενοῦμεν, μενεῖτε, μενοῦσι(ν)." },
            { form: "ἀποστέλλω → ἀποστελῶ",
              prompt: "What happens to the stem of ἀποστέλλω when forming the future?",
              answer: "the double λλ simplifies and the σ drops with contraction",
              choices: [
                "the double λλ simplifies and the σ drops with contraction",
                "the future keeps the double λλ and adds σ regularly",
                "the verb becomes ἀποστήσω (κ-aorist style)",
                "the stem is unchanged from the present"
              ],
              note: "ἀποστέλλω (pres.) → ἀποστελῶ (fut.). Liquid stems often have a present with extra consonants; the future shows the underlying stem." },
            { form: "liquid present vs future",
              prompt: "How can you tell μένω (present) from μενῶ (future) at a glance?",
              answer: "the accent: circumflex on μενῶ marks the contraction (future); μένω is a plain present.",
              choices: [
                "the accent: circumflex on μενῶ marks the contraction (future); μένω is a plain present.",
                "the breathing changes from smooth to rough.",
                "the future adds a σ before the ending.",
                "the future has an ε- augment."
              ],
              note: "Liquid futures look like ε-contract presents — accent is the diagnostic." }
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
                "imperfect active indicative, 1st sg."
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
          family: "σ-stem neuter nouns",
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
              ] },
            { form: "ἔθνος, ἔθνους",
              prompt: "What stem class is this NT noun?",
              answer: "σ-stem (neuter)",
              choices: ["σ-stem (neuter)", "ντ-stem", "ι-stem", "ευ-stem (masc.)"],
              note: "ἔθνος ('nation, Gentiles') declines just like γένος: ἔθνος, ἔθνους, ἔθνει, ἔθνος; pl. ἔθνη, ἐθνῶν, ἔθνεσι(ν), ἔθνη." }
          ]
        },
        {
          family: "ι-stem nouns",
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
              note: "Nom./acc. pl. collapse to a single form in ι-stems." },
            { form: "πίστις, πίστεως",
              prompt: "What stem class is this common NT noun?",
              answer: "ι-stem (feminine)",
              choices: ["ι-stem (feminine)", "σ-stem (neuter)", "ευ-stem (masc.)", "ντ-stem"],
              note: "πίστις ('faith') is among the most frequent NT ι-stem nouns: πίστις, πίστεως, πίστει, πίστιν." }
          ]
        },
        {
          family: "ευ-stem nouns",
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
              note: "Like πόλις, the ευ-stems take a long-vowel -εως genitive." },
            { form: "ἀρχιερεύς, ἀρχιερέως",
              prompt: "What stem class is this NT noun ('high priest')?",
              answer: "ευ-stem (masc.)",
              choices: ["ευ-stem (masc.)", "ι-stem", "σ-stem (neuter)", "ν-stem"],
              note: "Built on ἱερεύς ('priest') with the prefix ἀρχ-; both decline as ευ-stems." }
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
              ] },
            { form: "participle features",
              prompt: "Which two grammatical categories does a participle NOT have?",
              answer: "person and mood",
              choices: [
                "person and mood",
                "tense and voice",
                "case and number",
                "gender and number"
              ],
              note: "Person belongs to finite verbs; mood is signaled by the participle's own form-class rather than chosen separately." },
            { form: "participle time",
              prompt: "Within a clause, what does a participle's tense primarily encode?",
              answer: "aspect — with time, when relevant, relative to the main verb",
              choices: [
                "aspect — with time, when relevant, relative to the main verb",
                "absolute past, present, or future time",
                "mood",
                "person and number"
              ],
              note: "Present participle = action simultaneous with the main verb; aorist participle = action prior to it." }
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
                "imperfect middle/passive (1st sg.)"
              ],
              note: "Future passive is built on the aorist passive stem + σ + middle endings." },
            { form: "ἀπεκρίθη",
              prompt: "Parse this common NT form.",
              answer: "aorist passive indicative, 3rd sg. of ἀποκρίνομαι ('he answered')",
              choices: [
                "aorist passive indicative, 3rd sg. of ἀποκρίνομαι ('he answered')",
                "aorist active indicative, 3rd sg.",
                "imperfect middle/passive indicative, 3rd sg.",
                "future passive indicative, 3rd sg."
              ],
              note: "ἀπο- + ε-augment + κριθ + ending. ἀποκρίνομαι is deponent in form but uses θη-style aorists ('passive deponents')." }
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
          family: "Perfect-stem formation",
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
              ] },
            { form: "perfect vs aorist",
              prompt: "What chiefly distinguishes the perfect from the aorist?",
              answer: "The aorist views the action as a complete whole; the perfect highlights the resulting state.",
              choices: [
                "The aorist views the action as a complete whole; the perfect highlights the resulting state.",
                "The aorist is past, the perfect is future.",
                "The aorist is indicative-only; the perfect can appear in any mood.",
                "There is no real difference — they are interchangeable."
              ],
              note: "Both can describe past action, but the perfect adds that the result still stands." },
            { form: "τετέλεσται",
              prompt: "Best translation in 'τετέλεσται' (John 19:30)?",
              answer: "'it is finished' (perfect: the work is complete and its results endure)",
              choices: [
                "'it is finished' (perfect: the work is complete and its results endure)",
                "'he finishes' (present)",
                "'he finished' (aorist)",
                "'he will finish' (future)"
              ],
              note: "Perfect middle/passive 3rd sg. of τελέω." }
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
              note: "Pluperfect = augment + reduplication + κ + ει + secondary endings. The full set of three time markers is the giveaway." },
            { form: "pluperfect formation",
              prompt: "How is the pluperfect active formed?",
              answer: "augment + reduplication + stem + κει + secondary endings",
              choices: [
                "augment + reduplication + stem + κει + secondary endings",
                "reduplication + stem + κα + primary endings",
                "augment + stem + secondary endings (no reduplication, no κ)",
                "augment + stem + σα + secondary endings"
              ],
              note: "The pluperfect stacks all three past-tense markers (augment + reduplication + κ-extension)." },
            { form: "pluperfect meaning",
              prompt: "What does the pluperfect indicative typically convey?",
              answer: "a past state resulting from an action that was already complete before another past event",
              choices: [
                "a past state resulting from an action that was already complete before another past event",
                "a single completed past event with no further nuance",
                "an ongoing past action",
                "a future state that will be complete by some later moment"
              ],
              note: "English 'I had untied' captures the past-state-before-past-event sense. Rare in the NT (about 85×)." }
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
          family: "Long-vowel verb forms",
          lemma: "λύω",
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
              note: "Without context, λύῃ could also be 2nd sg. middle/passive subjunctive — but 3rd sg. active is the textbook answer." },
            { form: "λύσωσιν",
              prompt: "Parse this form.",
              answer: "aorist active subjunctive, 3rd pl.",
              choices: [
                "aorist active subjunctive, 3rd pl.",
                "future active indicative, 3rd pl.",
                "present active subjunctive, 3rd pl.",
                "aorist active indicative, 3rd pl."
              ],
              note: "Aorist stem (λυσ-) + long-vowel ending (ωσι) + no augment = aorist subj." },
            { form: "subjunctive vs indicative",
              prompt: "What is the key surface difference between λύομεν (ind.) and λύωμεν (subj.)?",
              answer: "the short connecting vowel ο becomes long ω in the subjunctive",
              choices: [
                "the short connecting vowel ο becomes long ω in the subjunctive",
                "the subjunctive takes an extra augment",
                "the subjunctive uses different person endings",
                "the accent shifts to the ultima in the subjunctive"
              ],
              note: "Long thematic vowel is the diagnostic. The personal ending -μεν is the same in both." }
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
              ] },
            { form: "particle ἄν",
              prompt: "What does the particle ἄν typically signal when added to a relative or temporal conjunction?",
              answer: "indefiniteness / generality — 'whoever', 'whenever', etc.",
              choices: [
                "indefiniteness / generality — 'whoever', 'whenever', etc.",
                "negation",
                "interrogation",
                "definite specificity"
              ],
              note: "ὅς + ἄν → 'whoever'; ὅπου + ἄν → 'wherever'; ὅτε + ἄν → ὅταν, 'whenever'." },
            { form: "ἐάν τις",
              prompt: "Translate this indefinite construction.",
              answer: "'if anyone' / 'whoever'",
              choices: [
                "'if anyone' / 'whoever'",
                "'if not'",
                "'because someone'",
                "'whenever it happens'"
              ],
              note: "ἐάν τις + subjunctive = a generalised conditional with an indefinite subject." }
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
          family: "εἰμί + participle constructions",
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
              note: "present of εἰμί + perfect participle = periphrastic perfect — frequent for stative passives." },
            { form: "ἐστὶν διδάσκων",
              prompt: "What construction is this?",
              answer: "periphrastic present ('he is teaching')",
              choices: [
                "periphrastic present ('he is teaching')",
                "present indicative of διδάσκω",
                "perfect periphrastic",
                "future of εἰμί + present participle"
              ],
              note: "present of εἰμί + present participle = periphrastic present, emphasising ongoing aspect." },
            { form: "periphrastic logic",
              prompt: "Periphrastic forms combine which two elements?",
              answer: "a form of εἰμί + a participle of the lexical verb",
              choices: [
                "a form of εἰμί + a participle of the lexical verb",
                "an augmented stem + the perfect ending",
                "a relative pronoun + an infinitive",
                "two finite indicative verbs joined by καί"
              ] }
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
              choices: ["aorist (perfective aspect)", "present (imperfective aspect)", "perfect (stative)", "future indicative"] },
            { form: "outside the indicative",
              prompt: "Outside the indicative (subjunctive, imperative, infinitive, participle), what does the choice of tense primarily encode?",
              answer: "aspect, not time",
              choices: [
                "aspect, not time",
                "absolute past, present, or future time",
                "mood",
                "person and number"
              ],
              note: "Only the indicative consistently anchors time. Elsewhere, present/aorist/perfect is about how the action is portrayed." },
            { form: "perfect imperative",
              prompt: "A perfect-tense imperative (rare) is best understood as expressing…",
              answer: "a state to be maintained ('stay in this condition')",
              choices: [
                "a state to be maintained ('stay in this condition')",
                "a single past command",
                "a future-time command",
                "a generic timeless command"
              ],
              note: "E.g. πεφίμωσο ('be still!', Mark 4:39) — stative force." }
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
              note: "Most NT verbs are thematic -ω verbs." },
            { form: "τίθημι",
              prompt: "What verb class is this NT verb ('I place, put')?",
              answer: "-μι verb (athematic)",
              choices: [
                "-μι verb (athematic)",
                "-ω verb (thematic)",
                "ε-contract verb",
                "ο-contract verb"
              ],
              note: "Along with δίδωμι and ἵστημι, τίθημι is one of the three core -μι verbs." }
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
                "imperfect active indicative, 3rd pl.",
                "aorist active indicative, 3rd pl."
              ],
              note: "-μι 3rd plural is -ασι(ν), distinct from -ω verbs' -ουσι(ν)." },
            { form: "δίδωμι",
              prompt: "What's distinctive about the singular stem vs the plural stem in the present indicative?",
              answer: "the singular has the long vowel (διδω-) and the plural has the short vowel (διδο-)",
              choices: [
                "the singular has the long vowel (διδω-) and the plural has the short vowel (διδο-)",
                "the singular has the short vowel and the plural the long vowel",
                "both share the same vowel grade throughout",
                "only the plural has reduplication"
              ],
              note: "δίδωμι, δίδως, δίδωσι(ν) — long vowel; δίδομεν, δίδοτε, διδόασι(ν) — short vowel." }
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
                "aorist active indicative, 1st pl.",
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
              ] },
            { form: "ἐλύσαμεν",
              prompt: "Parse this form.",
              answer: "aorist active indicative, 1st pl.",
              choices: [
                "aorist active indicative, 1st pl.",
                "imperfect active indicative, 1st pl.",
                "future active indicative, 1st pl.",
                "present active indicative, 1st pl."
              ],
              note: "ε- augment + σα + 1st-pl ending -μεν = 1st aorist active." }
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
                "aorist active imperative, 3rd sg.",
                "present active infinitive"
              ] },
            { form: "λῦσον",
              prompt: "Parse this form.",
              answer: "aorist active imperative, 2nd sg.",
              choices: [
                "aorist active imperative, 2nd sg.",
                "present active imperative, 2nd sg.",
                "aorist active indicative, 3rd sg.",
                "future active indicative, 3rd sg."
              ] },
            { form: "λῦσαι",
              prompt: "Parse this form.",
              answer: "aorist active infinitive",
              choices: [
                "aorist active infinitive",
                "present active infinitive",
                "aorist active imperative, 2nd sg.",
                "aorist active indicative, 3rd sg."
              ],
              note: "Aorist active infinitive: stem + σα + -ι (no augment, since infinitives are non-indicative)." }
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
              ] },
            { form: "λύων",
              prompt: "Parse this form.",
              answer: "nominative singular masculine, present active participle",
              choices: [
                "nominative singular masculine, present active participle",
                "1st sg. present active indicative",
                "nominative plural masculine, present active participle",
                "genitive singular masculine, present active participle"
              ],
              note: "λύων / λύουσα / λῦον — the nom. sg. of the present active participle." }
          ]
        }
      ]
    },

    "W3O": {
      label: "Week 3 — Course Supplement Grammar",
      notes: "Middle voice indicative · complete εἰμί · demonstrative paradigms · personal pronouns",
      items: [
        {
          family: "Middle/passive indicative — λύομαι",
          lemma: "λύομαι",
          gloss: "present and imperfect middle/passive paradigm",
          questions: [
            { form: "λύομαι",
              prompt: "Parse this form.",
              answer: "present middle/passive indicative, 1st sg.",
              choices: [
                "present middle/passive indicative, 1st sg.",
                "present middle/passive indicative, 3rd sg.",
                "imperfect middle/passive indicative, 1st sg.",
                "future middle indicative, 1st sg."
              ] },
            { form: "λύῃ",
              prompt: "Parse this form (M/P reading).",
              answer: "present middle/passive indicative, 2nd sg.",
              choices: [
                "present middle/passive indicative, 2nd sg.",
                "present active indicative, 3rd sg.",
                "imperfect middle/passive indicative, 2nd sg.",
                "future middle indicative, 2nd sg."
              ],
              note: "2nd-sg M/P ending -ῃ comes from σαι: λύεσαι → λύῃ." },
            { form: "λύονται",
              prompt: "Parse this form.",
              answer: "present middle/passive indicative, 3rd pl.",
              choices: [
                "present middle/passive indicative, 3rd pl.",
                "present active indicative, 3rd pl.",
                "future middle indicative, 3rd pl.",
                "imperfect middle/passive indicative, 3rd pl."
              ] },
            { form: "ἐλυόμην",
              prompt: "Parse this form.",
              answer: "imperfect middle/passive indicative, 1st sg.",
              choices: [
                "imperfect middle/passive indicative, 1st sg.",
                "present middle/passive indicative, 1st sg.",
                "aorist middle indicative, 1st sg.",
                "imperfect active indicative, 1st sg."
              ],
              note: "augment + present stem + middle/passive secondary endings = imperfect M/P." },
            { form: "ἐλύου",
              prompt: "Parse this form.",
              answer: "imperfect middle/passive indicative, 2nd sg.",
              choices: [
                "imperfect middle/passive indicative, 2nd sg.",
                "imperfect middle/passive indicative, 3rd sg.",
                "present middle/passive indicative, 2nd sg.",
                "aorist middle indicative, 2nd sg."
              ],
              note: "Secondary 2nd-sg M/P -ου comes from -εσο (σ drops, ε + ο → ου)." }
          ]
        },
        {
          family: "Middle/passive future and aorist — λύομαι",
          lemma: "λύσομαι / ἐλυσάμην",
          gloss: "future middle and aorist middle paradigm",
          questions: [
            { form: "λύσομαι",
              prompt: "Parse this form.",
              answer: "future middle indicative, 1st sg.",
              choices: [
                "future middle indicative, 1st sg.",
                "future active indicative, 1st sg.",
                "present middle/passive indicative, 1st sg.",
                "aorist middle indicative, 1st sg."
              ],
              note: "λύω stem + σ + middle endings = future middle. (Many active verbs have middle-form futures.)" },
            { form: "λύσεται",
              prompt: "Parse this form.",
              answer: "future middle indicative, 3rd sg.",
              choices: [
                "future middle indicative, 3rd sg.",
                "present middle/passive indicative, 3rd sg.",
                "aorist middle indicative, 3rd sg.",
                "future active indicative, 3rd sg."
              ] },
            { form: "ἐλυσάμην",
              prompt: "Parse this form.",
              answer: "aorist middle indicative, 1st sg.",
              choices: [
                "aorist middle indicative, 1st sg.",
                "imperfect middle/passive indicative, 1st sg.",
                "aorist active indicative, 1st sg.",
                "future middle indicative, 1st sg."
              ],
              note: "ἐ-λυ-σα-μην: augment + stem + σα + 1st-sg middle ending." }
          ]
        },
        {
          family: "Complete εἰμί paradigm",
          lemma: "εἰμί",
          gloss: "present / future / imperfect",
          questions: [
            { form: "ἔσομαι",
              prompt: "Parse this form of εἰμί.",
              answer: "future indicative, 1st sg. ('I will be')",
              choices: [
                "future indicative, 1st sg. ('I will be')",
                "present indicative, 1st sg.",
                "imperfect indicative, 1st sg.",
                "aorist middle indicative, 1st sg."
              ],
              note: "εἰμί has middle-form future endings: ἔσομαι, ἔσῃ, ἔσται, ἐσόμεθα, ἔσεσθε, ἔσονται." },
            { form: "ἔσται",
              prompt: "Parse this form of εἰμί.",
              answer: "future indicative, 3rd sg. ('he/she/it will be')",
              choices: [
                "future indicative, 3rd sg. ('he/she/it will be')",
                "present indicative, 3rd sg.",
                "imperfect indicative, 3rd sg.",
                "future indicative, 3rd pl."
              ] },
            { form: "ἤμεθα",
              prompt: "Parse this form of εἰμί.",
              answer: "imperfect indicative, 1st pl. ('we were')",
              choices: [
                "imperfect indicative, 1st pl. ('we were')",
                "present indicative, 1st pl.",
                "imperfect indicative, 2nd pl.",
                "future indicative, 1st pl."
              ],
              note: "ἤμην, ἦς, ἦν, ἤμεθα (or ἦμεν), ἦτε, ἦσαν." }
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
              ] },
            { form: "οὖσα",
              prompt: "Parse this form of εἰμί.",
              answer: "nominative singular feminine, present participle ('being')",
              choices: [
                "nominative singular feminine, present participle ('being')",
                "nominative singular masculine, present participle",
                "nominative plural neuter, present participle",
                "accusative singular feminine, present participle"
              ],
              note: "ὤν / οὖσα / ὄν — masculine / feminine / neuter nom. sg." },
            { form: "ὄντος",
              prompt: "Parse this form of εἰμί.",
              answer: "genitive singular masculine/neuter, present participle",
              choices: [
                "genitive singular masculine/neuter, present participle",
                "nominative singular masculine, present participle",
                "accusative singular masculine, present participle",
                "genitive plural masculine, present participle"
              ],
              note: "εἰμί's participle declines like an active participle (3rd-1st-3rd)." }
          ]
        },
        {
          family: "Near demonstrative paradigm — οὗτος",
          lemma: "οὗτος, αὕτη, τοῦτο",
          gloss: "this",
          questions: [
            { form: "οὗτος",
              prompt: "Parse this form.",
              answer: "nominative singular masculine",
              choices: [
                "nominative singular masculine",
                "nominative singular feminine",
                "nominative plural masculine",
                "accusative singular masculine"
              ] },
            { form: "αὕτη",
              prompt: "Parse this form.",
              answer: "nominative singular feminine ('this')",
              choices: [
                "nominative singular feminine ('this')",
                "nominative singular feminine of αὐτός ('she herself')",
                "nominative plural feminine of οὗτος",
                "dative singular feminine"
              ],
              note: "αὕτη (rough breathing) is the demonstrative; αὐτή (smooth) is αὐτός." },
            { form: "τοῦτο",
              prompt: "Parse this form.",
              answer: "nominative or accusative singular neuter",
              choices: [
                "nominative or accusative singular neuter",
                "nominative singular masculine",
                "genitive singular neuter",
                "nominative plural neuter"
              ] },
            { form: "τούτων",
              prompt: "Parse this form.",
              answer: "genitive plural (all genders)",
              choices: [
                "genitive plural (all genders)",
                "dative plural (all genders)",
                "genitive singular masculine/neuter",
                "accusative plural masculine"
              ] }
          ]
        },
        {
          family: "Far demonstrative paradigm — ἐκεῖνος",
          lemma: "ἐκεῖνος, ἐκείνη, ἐκεῖνο",
          gloss: "that",
          questions: [
            { form: "ἐκεῖνος",
              prompt: "Parse this form.",
              answer: "nominative singular masculine ('that one')",
              choices: [
                "nominative singular masculine ('that one')",
                "nominative singular feminine",
                "nominative plural masculine",
                "accusative singular masculine"
              ] },
            { form: "ἐκείνῃ",
              prompt: "Parse this form.",
              answer: "dative singular feminine",
              choices: [
                "dative singular feminine",
                "nominative singular feminine",
                "dative singular masculine/neuter",
                "dative plural feminine"
              ] },
            { form: "ἐκείνου",
              prompt: "Parse this form.",
              answer: "genitive singular masculine/neuter",
              choices: [
                "genitive singular masculine/neuter",
                "accusative singular masculine",
                "genitive plural masculine",
                "dative singular masculine/neuter"
              ],
              note: "ἐκεῖνος declines just like αὐτός / 2-1-2 adjectives." }
          ]
        },
        {
          family: "First and second personal pronouns",
          lemma: "ἐγώ / σύ",
          gloss: "1st and 2nd person pronoun paradigm",
          questions: [
            { form: "ἐμοῦ",
              prompt: "Parse this form.",
              answer: "genitive singular ('of me') — emphatic 1st sg.",
              choices: [
                "genitive singular ('of me') — emphatic 1st sg.",
                "dative singular — emphatic 1st sg.",
                "accusative singular — emphatic 1st sg.",
                "genitive plural ('of us')"
              ],
              note: "Emphatic forms: ἐμοῦ / ἐμοί / ἐμέ. Enclitic forms: μου / μοι / με." },
            { form: "ἡμῶν",
              prompt: "Parse this form.",
              answer: "genitive plural ('of us')",
              choices: [
                "genitive plural ('of us')",
                "genitive plural ('of you all')",
                "dative plural ('to us')",
                "accusative plural ('us')"
              ],
              note: "ἡμῶν (1pl) vs ὑμῶν (2pl) differ only by the breathing/accent — easy to confuse." },
            { form: "ὑμῖν",
              prompt: "Parse this form.",
              answer: "dative plural ('to you all')",
              choices: [
                "dative plural ('to you all')",
                "dative plural ('to us')",
                "genitive plural ('of you all')",
                "nominative plural ('you all')"
              ] },
            { form: "σέ",
              prompt: "Parse this form.",
              answer: "accusative singular ('you') — emphatic 2nd sg.",
              choices: [
                "accusative singular ('you') — emphatic 2nd sg.",
                "accusative singular — enclitic 2nd sg.",
                "nominative singular 2nd sg.",
                "dative singular 2nd sg."
              ],
              note: "Emphatic σοῦ / σοί / σέ vs enclitic σου / σοι / σε." }
          ]
        }
      ]
    },

    "W4O": {
      label: "Week 4 — Course Supplement Grammar",
      notes: "Relative pronouns · second aorist · liquid futures",
      items: [
        {
          family: "Relative pronoun paradigm — ὅς, ἥ, ὅ",
          lemma: "ὅς, ἥ, ὅ",
          gloss: "who, which",
          questions: [
            { form: "ὅς",
              prompt: "Parse this relative pronoun.",
              answer: "nominative singular masculine",
              choices: [
                "nominative singular masculine",
                "nominative singular feminine",
                "accusative singular masculine",
                "nominative plural masculine"
              ] },
            { form: "ἥν",
              prompt: "Parse this relative pronoun.",
              answer: "accusative singular feminine",
              choices: [
                "accusative singular feminine",
                "nominative singular feminine",
                "accusative singular masculine",
                "genitive singular feminine"
              ],
              note: "Distinguish from the article ἥν (acc. sg. fem. of ἡ) by accent: rel. ἥν (acute) vs the article context." },
            { form: "ᾧ",
              prompt: "Parse this relative pronoun.",
              answer: "dative singular masculine/neuter",
              choices: [
                "dative singular masculine/neuter",
                "dative singular feminine",
                "genitive singular masculine/neuter",
                "dative plural masculine/neuter"
              ] },
            { form: "οὕς",
              prompt: "Parse this relative pronoun.",
              answer: "accusative plural masculine",
              choices: [
                "accusative plural masculine",
                "nominative plural masculine",
                "genitive plural masculine",
                "accusative plural feminine"
              ] },
            { form: "ὧν",
              prompt: "Parse this relative pronoun.",
              answer: "genitive plural (all genders)",
              choices: [
                "genitive plural (all genders)",
                "dative plural (all genders)",
                "genitive singular masculine/neuter",
                "accusative plural masculine"
              ],
              note: "Like the article τῶν, ὧν is identical across all three genders in the genitive plural." }
          ]
        },
        {
          family: "Second aorist paradigm",
          lemma: "λαμβάνω / ἔρχομαι / λέγω",
          gloss: "2nd aorist active indicative across persons",
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
                "future active indicative, 3rd sg. of λέγω"
              ] },
            { form: "ἔλαβον",
              prompt: "Parse this form (in isolation).",
              answer: "aorist active indicative, 1st sg. or 3rd pl. of λαμβάνω",
              choices: [
                "aorist active indicative, 1st sg. or 3rd pl. of λαμβάνω",
                "imperfect active indicative, 1st sg. of λαμβάνω",
                "present active indicative, 1st sg. of λαμβάνω",
                "future active indicative, 1st sg. of λαμβάνω"
              ],
              note: "λαμβάνω uses the 2nd-aorist stem λαβ-. Imperfect would be ἐλάμβανον (present stem)." },
            { form: "ἐλάβετε",
              prompt: "Parse this form.",
              answer: "aorist active indicative, 2nd pl. of λαμβάνω",
              choices: [
                "aorist active indicative, 2nd pl. of λαμβάνω",
                "imperfect active indicative, 2nd pl. of λαμβάνω",
                "present active indicative, 2nd pl. of λαμβάνω",
                "future active indicative, 2nd pl. of λαμβάνω"
              ],
              note: "2nd-aorist endings are the same as imperfect: -ον, -ες, -ε(ν), -ομεν, -ετε, -ον." },
            { form: "ἦλθες",
              prompt: "Parse this form.",
              answer: "aorist active indicative, 2nd sg. of ἔρχομαι ('you came')",
              choices: [
                "aorist active indicative, 2nd sg. of ἔρχομαι ('you came')",
                "imperfect active indicative, 2nd sg. of ἔρχομαι",
                "present active indicative, 2nd sg. of ἔρχομαι",
                "future active indicative, 2nd sg. of ἔρχομαι"
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
                "imperfect active indicative, 1st pl. of μένω"
              ],
              note: "Looks like an ε-contract present, but the lemma μένω has no contract vowel — so the contraction signals the future." },
            { form: "ἀποστελοῦσιν",
              prompt: "Parse this form.",
              answer: "future active indicative, 3rd pl. of ἀποστέλλω",
              choices: [
                "future active indicative, 3rd pl. of ἀποστέλλω",
                "present active indicative, 3rd pl. of ἀποστέλλω",
                "aorist active indicative, 3rd pl. of ἀποστέλλω",
                "imperfect active indicative, 3rd pl. of ἀποστέλλω"
              ],
              note: "Present is ἀποστέλλουσι(ν) (double λλ + ουσι); future ἀποστελοῦσι(ν) loses one λ and contracts." },
            { form: "κρινεῖ",
              prompt: "Parse this form.",
              answer: "future active indicative, 3rd sg. of κρίνω ('he will judge')",
              choices: [
                "future active indicative, 3rd sg. of κρίνω ('he will judge')",
                "present active indicative, 3rd sg. of κρίνω ('he judges')",
                "aorist active indicative, 3rd sg. of κρίνω",
                "imperfect active indicative, 3rd sg. of κρίνω"
              ],
              note: "Present κρίνει vs future κρινεῖ — circumflex accent over the ει marks the contracted future." }
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
              answer: "κτ-stem",
              choices: ["κτ-stem", "ν-stem", "σ-stem (neuter)", "ντ-stem"],
              note: "The genitive νυκτός shows the stem νυκτ-. In the nominative singular, τ drops before ς, then κ + ς → ξ." },
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
                "active only",
                "infinitive"
              ],
              note: "M/P participles always look like ἀγαθός, -ή, -όν." },
            { form: "λύοντος vs λυομένου",
              prompt: "Which is the genitive singular of the middle/passive participle?",
              answer: "λυομένου",
              choices: [
                "λυομένου",
                "λύοντος",
                "λύσαντος",
                "λυθέντος"
              ],
              note: "Active gen. sg.: λύοντος (3rd-decl. -ντος). M/P gen. sg.: λυομένου (2-1-2, like ἀγαθοῦ)." }
          ]
        }
      ]
    },

    "W6O": {
      label: "Week 6 — Course Supplement Grammar",
      notes: "Passive endings · passive participles · perfect · pluperfect · square of stops",
      items: [
        {
          family: "Passive form parsing",
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
              note: "θη + σ + middle endings = future passive." },
            { form: "ἐλύθησαν",
              prompt: "Parse this form.",
              answer: "aorist passive indicative, 3rd pl.",
              choices: [
                "aorist passive indicative, 3rd pl.",
                "aorist active indicative, 3rd pl.",
                "imperfect active indicative, 3rd pl.",
                "future passive indicative, 3rd pl."
              ],
              note: "ἐ-λύ-θη-σαν: augment + stem + θη + 3rd-pl. -σαν." }
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
              ] },
            { form: "λυθεῖσα",
              prompt: "Parse this form.",
              answer: "nominative singular feminine, aorist passive participle",
              choices: [
                "nominative singular feminine, aorist passive participle",
                "nominative singular masculine, aorist passive participle",
                "nominative plural neuter, aorist passive participle",
                "dative singular feminine, aorist passive participle"
              ],
              note: "Aorist passive participle declines 3-1-3: λυθείς / λυθεῖσα / λυθέν." }
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
              ] },
            { form: "λέλυται",
              prompt: "Parse this form.",
              answer: "perfect middle/passive indicative, 3rd sg.",
              choices: [
                "perfect middle/passive indicative, 3rd sg.",
                "perfect active indicative, 3rd sg.",
                "present middle/passive indicative, 3rd sg.",
                "aorist middle indicative, 3rd sg."
              ],
              note: "Reduplication (λε-) + stem (no -κ-) + primary M/P endings. The perfect M/P drops the κ." }
          ]
        }
      ]
    },

    "W7O": {
      label: "Week 7 — Course Supplement Grammar",
      notes: "Subjunctive · indefinite constructions · 3rd-person imperative · aspect",
      items: [
        {
          family: "Long-vowel verb forms",
          lemma: "λύω",
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
              note: "σ + long-vowel ending = aorist subjunctive (no augment, since augment is indicative-only)." },
            { form: "λύητε",
              prompt: "Parse this form.",
              answer: "present active subjunctive, 2nd pl.",
              choices: [
                "present active subjunctive, 2nd pl.",
                "present active indicative, 2nd pl.",
                "aorist active subjunctive, 2nd pl.",
                "present active imperative, 2nd pl."
              ],
              note: "Indicative λύετε vs subjunctive λύητε — η replaces ε in the 2nd plural." }
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
              choices: ["'whenever he unties'", "'when he untied'", "'because he unties'", "'in order that he untie'"] },
            { form: "ὅπου ἂν ᾖ",
              prompt: "Translate.",
              answer: "'wherever he is'",
              choices: ["'wherever he is'", "'where he was'", "'when he is there'", "'because he is there'"],
              note: "Indefinite local clause: ὅπου + ἄν + subjunctive." },
            { form: "ἐάν τις ἀκούσῃ",
              prompt: "Translate.",
              answer: "'if anyone hears' / 'whoever hears'",
              choices: [
                "'if anyone hears' / 'whoever hears'",
                "'if he heard'",
                "'because someone hears'",
                "'so that someone may hear'"
              ],
              note: "ἐάν τις = stock NT phrasing for 'whoever'." }
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
              ] },
            { form: "λυέτωσαν",
              prompt: "Parse this form.",
              answer: "present active imperative, 3rd pl. ('let them untie')",
              choices: [
                "present active imperative, 3rd pl. ('let them untie')",
                "aorist active imperative, 3rd pl.",
                "present active indicative, 3rd pl.",
                "present active subjunctive, 3rd pl."
              ],
              note: "3rd-pl. present active imperative: stem + -ετωσαν. English requires a paraphrase: 'let them …'." }
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
              choices: ["πίστευε (present imperative)", "πίστευσον (aorist imperative)", "both equally", "neither — both are perfective"] },
            { form: "aspect, not time",
              prompt: "In the imperative, what does the choice of present vs aorist primarily encode?",
              answer: "aspect (how the action is portrayed), not time",
              choices: [
                "aspect (how the action is portrayed), not time",
                "absolute time (present time vs past time)",
                "voice (active vs middle)",
                "person (2nd vs 3rd)"
              ],
              note: "All imperatives refer to action that has not yet happened. Tense form signals aspect only." },
            { form: "μή + present vs μή + aorist subj.",
              prompt: "Which combination forbids an ongoing action ('stop doing X') vs which forbids inception ('don't start')?",
              answer: "μή + present imperative = 'stop doing'; μή + aorist subjunctive = 'don't start'",
              choices: [
                "μή + present imperative = 'stop doing'; μή + aorist subjunctive = 'don't start'",
                "Reverse — μή + aorist subjunctive = 'stop doing'; μή + present imperative = 'don't start'",
                "Both work identically.",
                "Both are forbidden in koine Greek."
              ],
              note: "Aspect again: imperfective (present impv.) views the action as ongoing; perfective (aor. subj.) views it as a single whole, hence 'don't start'." }
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
              note: "Same as λύετε / φιλεῖτε in the -ω class — context decides." },
            { form: "δίδωμι",
              prompt: "Parse this form.",
              answer: "present active indicative, 1st sg. ('I give')",
              choices: [
                "present active indicative, 1st sg. ('I give')",
                "present active subjunctive, 1st sg.",
                "imperfect active indicative, 1st sg.",
                "aorist active indicative, 1st sg."
              ],
              note: "The lemma is itself the 1st-singular form: -μι replaces -ω in this class." }
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
              note: "δίδωμι uses a κ-aorist (ἔδωκα, ἔδωκας, ἔδωκε(ν)…)." },
            { form: "δέδωκεν",
              prompt: "Parse this form.",
              answer: "perfect active indicative, 3rd sg.",
              choices: [
                "perfect active indicative, 3rd sg.",
                "aorist active indicative, 3rd sg.",
                "pluperfect active indicative, 3rd sg.",
                "imperfect active indicative, 3rd sg."
              ],
              note: "Reduplication δε- + δωκ + ε(ν) = perfect active. Common in John ('the Father has given…')." }
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
              ] },
            { form: "ἐδίδοτο",
              prompt: "Parse this form.",
              answer: "imperfect middle/passive indicative, 3rd sg.",
              choices: [
                "imperfect middle/passive indicative, 3rd sg.",
                "present middle/passive indicative, 3rd sg.",
                "aorist middle indicative, 3rd sg.",
                "perfect middle/passive indicative, 3rd sg."
              ],
              note: "Augment ἐ- + short-vowel stem διδο- + secondary M/P ending -το." },
            { form: "ἐδόθη",
              prompt: "Parse this form.",
              answer: "aorist passive indicative, 3rd sg. ('it was given')",
              choices: [
                "aorist passive indicative, 3rd sg. ('it was given')",
                "aorist active indicative, 3rd sg.",
                "imperfect middle/passive indicative, 3rd sg.",
                "perfect passive indicative, 3rd sg."
              ],
              note: "δίδωμι's aorist passive uses the regular θη marker on the bare δο- stem." }
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

  function notifyGrammarDataChanged() {
    if (typeof window.dispatchEvent !== 'function' || typeof window.CustomEvent !== 'function') return;
    window.dispatchEvent(new window.CustomEvent('greekSupplementalDataChanged', {
      detail: { kind: 'grammar' }
    }));
  }

  function registerSupplementalGrammarSets(sets, options = {}) {
    if (!sets || typeof sets !== 'object') return;

    Object.entries(sets).forEach(([key, set]) => {
      if (!key || !set) return;
      const rawKey = String(key);
      GRAMMAR_SETS[rawKey] = set;

      if (window.SETS && typeof window.SETS === 'object') {
        window.SETS[rawKey] = {
          ...(window.SETS[rawKey] || {}),
          label: set.label || window.SETS[rawKey]?.label || rawKey,
          type: window.SETS[rawKey]?.type || 'other',
          week: window.SETS[rawKey]?.week ?? null,
          cards: Array.isArray(window.SETS[rawKey]?.cards) ? window.SETS[rawKey].cards : []
        };
      }
    });

    if (!options.silent) notifyGrammarDataChanged();
  }

  if (window.SUPPLEMENTAL_GRAMMAR_SETS && typeof window.SUPPLEMENTAL_GRAMMAR_SETS === 'object') {
    registerSupplementalGrammarSets(window.SUPPLEMENTAL_GRAMMAR_SETS, { silent: true });
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
  function parseParadigmKey(key) {
    const match = String(key).match(/^(.+)::(grammar|morph)::(\d+)$/);
    if (!match) return { baseKey: String(key), type: null, itemIdx: null };
    return { baseKey: match[1], type: match[2], itemIdx: Number(match[3]) };
  }

  // Reversibility heuristics — a question can be flipped into "pick the
  // Greek form for this English description" when the displayed form is
  // a Greek string, every choice is non-Greek (parse-style English), and
  // the prompt is a recognition / parsing question (not a meta question
  // like "which case does ἐν take?", which has many correct Greek answers).
  const GREEK_RANGE = /[Ͱ-Ͽἀ-῿]/;
  const RECOGNITION_PROMPT = /^\s*(parse|identify|which letter|which letter-form|what tense|what mood|what case|what voice|what (kind of )?form|what is this form|name (this|the))/i;
  function containsGreek(text) {
    return GREEK_RANGE.test(String(text || ''));
  }
  function isReversibleQuestion(q) {
    if (!q || !q.form || !q.answer) return false;
    if (!containsGreek(q.form)) return false;
    if (containsGreek(q.answer)) return false;
    const choices = Array.isArray(q.choices) ? q.choices : [];
    if (choices.some(containsGreek)) return false;
    return RECOGNITION_PROMPT.test(String(q.prompt || ''));
  }

  function buildGrammarCardsForKeys(keys) {
    const selected = (keys || []).map(String);
    const cards = [];

    // Build a global pool of Greek forms from reversible questions
    // across the selection, used as a fallback when an item is too
    // small to supply three same-paradigm distractors.
    const allReversibleForms = [];
    selected.forEach((key) => {
      const selection = parseParadigmKey(key);
      if (selection.type && selection.type !== 'grammar') return;
      const set = GRAMMAR_SETS[selection.baseKey];
      if (!set) return;
      const items = Number.isInteger(selection.itemIdx) ? [set.items[selection.itemIdx]] : set.items;
      items.forEach((item) => {
        if (!item || !Array.isArray(item.questions)) return;
        item.questions.forEach((q) => {
          if (isReversibleQuestion(q)) allReversibleForms.push(q.form);
        });
      });
    });

    selected.forEach((key) => {
      const selection = parseParadigmKey(key);
      if (selection.type && selection.type !== 'grammar') return;
      const set = GRAMMAR_SETS[selection.baseKey];
      if (!set) return;

      const chapterNum = /^\d+$/.test(selection.baseKey) ? Number(selection.baseKey) : 0;
      const items = Number.isInteger(selection.itemIdx) ? [set.items[selection.itemIdx]] : set.items;

      items.forEach((item, relativeItemIdx) => {
        if (!item) return;
        const itemIdx = Number.isInteger(selection.itemIdx) ? selection.itemIdx : relativeItemIdx;
        const itemReversibleForms = item.questions
          .filter(isReversibleQuestion)
          .map((q) => q.form);
        const formToAnswer = {};
        item.questions.forEach((q) => {
          if (q && q.form && q.answer) formToAnswer[q.form] = q.answer;
        });
        item.questions.forEach((q, qIdx) => {
          const rawChoices = Array.isArray(q.choices) ? q.choices : [];
          const choices = localShuffle(Array.from(new Set([q.answer, ...rawChoices])));

          const reversible = isReversibleQuestion(q);
          let reverseChoices = null;
          if (reversible) {
            const distractors = pickReverseDistractors(q.form, itemReversibleForms, allReversibleForms);
            reverseChoices = localShuffle([q.form, ...distractors]);
          }

          cards.push({
            id: `grammar-${selection.baseKey}-${itemIdx}-${qIdx}-${stableGrammarKey(item.lemma)}-${stableGrammarKey(q.form)}-${stableGrammarKey(q.prompt || 'parse')}-${stableGrammarKey(q.answer)}`,
            kind: 'morph',
            required: true,
            sourceKey: String(selection.baseKey),
            sourceLabel: set.label,
            supplemental: !!set.supplemental,
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
            choices,
            reversible,
            reversePrompt: reversible ? 'Choose the correct Greek form.' : '',
            reverseChoices,
            formToAnswer
          });
        });
      });
    });

    return cards;
  }

  function pickReverseDistractors(correctForm, preferredPool, fallbackPool) {
    const distractors = [];
    const seen = new Set([correctForm]);
    const pushFrom = (pool) => {
      for (const item of localShuffle(pool)) {
        if (!item || seen.has(item)) continue;
        seen.add(item);
        distractors.push(item);
        if (distractors.length >= 3) break;
      }
    };
    pushFrom(preferredPool);
    if (distractors.length < 3) pushFrom(fallbackPool);
    return distractors.slice(0, 3);
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
  window.registerSupplementalGrammarSets = registerSupplementalGrammarSets;
  window.buildGrammarCardsForKeys = buildGrammarCardsForKeys;
  window.getGrammarCountForKey = getGrammarCountForKey;

})();
