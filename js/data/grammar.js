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
      notes: "Basic sentences — present tense of λύω and -έω verbs, nominative & accusative cases, definite article (formation and special uses)",
      items: [
        {
          family: "2.1 Present Tense of λύω",
          lemma: "λύω",
          gloss: "I untie",
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
              ] },
            { form: "βλέπει",
              prompt: "Parse this verb form.",
              answer: "present active indicative, 3rd singular ('he/she/it sees')",
              choices: [
                "present active indicative, 3rd singular ('he/she/it sees')",
                "present active indicative, 2nd singular",
                "present active indicative, 3rd plural",
                "imperfect active indicative, 3rd singular"
              ],
              note: "-ει is the standard 3rd-singular ending on the present active indicative." }
          ]
        },
        {
          family: "2.2 Present Tense of -έω Verbs (φιλέω)",
          lemma: "φιλέω",
          gloss: "I love (contract verb)",
          questions: [
            { form: "φιλέω → φιλῶ",
              prompt: "Why does the lexical form φιλέω appear in the text as φιλῶ?",
              answer: "the stem-final ε contracts with the personal-ending vowel: ε + ω → ῶ",
              choices: [
                "the stem-final ε contracts with the personal-ending vowel: ε + ω → ῶ",
                "the ε is silent and simply dropped",
                "the ε turns into η before all endings",
                "φιλῶ is a separate verb unrelated to φιλέω"
              ],
              note: "Lexicon shows the uncontracted form (φιλέω); running text always shows the contracted form (φιλῶ)." },
            { form: "φιλεῖ",
              prompt: "Parse this verb form.",
              answer: "present active indicative, 3rd singular ('he/she/it loves')",
              choices: [
                "present active indicative, 3rd singular ('he/she/it loves')",
                "present active indicative, 2nd singular",
                "present active indicative, 3rd plural",
                "imperfect active indicative, 3rd singular"
              ],
              note: "ε + ει → ει: φιλέ-ει → φιλεῖ. The circumflex marks the contraction." },
            { form: "ποιοῦμεν",
              prompt: "Parse this contract verb form.",
              answer: "present active indicative, 1st plural ('we do/make')",
              choices: [
                "present active indicative, 1st plural ('we do/make')",
                "present active indicative, 1st singular",
                "future active indicative, 1st plural",
                "imperfect active indicative, 1st plural"
              ],
              note: "ποιέ-ομεν → ποιοῦμεν (ε + ο → ου)." },
            { form: "contraction rule",
              prompt: "When an ε-contract verb meets an ending beginning with ε, what is the result?",
              answer: "ε + ε → ει (e.g., φιλέ-ετε → φιλεῖτε)",
              choices: [
                "ε + ε → ει (e.g., φιλέ-ετε → φιλεῖτε)",
                "ε + ε → η",
                "ε + ε → α",
                "ε + ε → ε (no change)"
              ] }
          ]
        },
        {
          family: "2.3 Nominative and Accusative Cases",
          lemma: "case functions",
          gloss: "subject vs direct object",
          questions: [
            { form: "ὁ ἀπόστολος βλέπει τὸν ἄνθρωπον.",
              prompt: "Which word is the subject?",
              answer: "ὁ ἀπόστολος",
              choices: ["ὁ ἀπόστολος", "βλέπει", "τὸν ἄνθρωπον", "the verb supplies it"],
              note: "The nominative case marks the subject. ὁ (nom. sg. masc. article) flags it." },
            { form: "βλέπει τὸν ἄνθρωπον.",
              prompt: "Without an explicit nominative noun, where is the subject?",
              answer: "in the verb ending (3rd singular)",
              choices: ["in the verb ending (3rd singular)", "in τὸν ἄνθρωπον", "the sentence has no subject", "in the article τόν"],
              note: "Greek finite verbs encode person and number, so an explicit pronoun is often omitted unless needed for emphasis, contrast, or clarity." },
            { form: "accusative",
              prompt: "Which Greek case typically marks the direct object?",
              answer: "accusative",
              choices: ["accusative", "nominative", "genitive", "dative"],
              note: "ὁ ἀπόστολος ἀκούει τὸν λόγον = 'The apostle hears the word' — τὸν λόγον is accusative." },
            { form: "Greek word order",
              prompt: "How rigid is Greek word order compared to English?",
              answer: "much freer — case endings carry the syntax",
              choices: ["much freer — case endings carry the syntax", "identical to English (SVO)", "always verb-final", "always verb-first"] }
          ]
        },
        {
          family: "2.4 The Definite Article",
          lemma: "ὁ, ἡ, τό",
          gloss: "the",
          questions: [
            { form: "ὁ", prompt: "Identify this article form.",
              answer: "nominative singular masculine",
              choices: ["nominative singular masculine", "nominative singular feminine", "accusative singular masculine", "genitive singular masculine"] },
            { form: "τόν", prompt: "Identify this article form.",
              answer: "accusative singular masculine",
              choices: ["accusative singular masculine", "nominative singular masculine", "genitive singular masculine", "dative singular masculine"] },
            { form: "οἱ", prompt: "Identify this article form.",
              answer: "nominative plural masculine",
              choices: ["nominative plural masculine", "nominative singular masculine", "dative plural masculine", "accusative plural masculine"] },
            { form: "article function",
              prompt: "Beyond meaning 'the', what does the article tell you about a noun?",
              answer: "its gender, number, and case",
              choices: [
                "its gender, number, and case",
                "only its gender",
                "only its number",
                "its tense and voice"
              ],
              note: "The article is the single most reliable signpost for parsing a noun phrase." }
          ]
        },
        {
          family: "2.5 Special Uses of the Definite Article",
          lemma: "ὁ θεός, ἡ ἀγάπη",
          gloss: "abstract / generic / proper",
          questions: [
            { form: "ὁ θεός",
              prompt: "Greek often uses the article with a proper name like θεός. How is it rendered into English?",
              answer: "usually as 'God' (without 'the') — Greek uses the article more freely than English",
              choices: [
                "usually as 'God' (without 'the') — Greek uses the article more freely than English",
                "always as 'the god', with the article",
                "as 'a god', indefinitely",
                "the article forces a different word entirely"
              ],
              note: "ὁ Παῦλος = 'Paul', ὁ Πέτρος = 'Peter' — Greek is happy to article-mark personal names." },
            { form: "ἡ ἀγάπη",
              prompt: "Why does Greek put the article on an abstract noun like ἀγάπη ('love')?",
              answer: "to mark it as a concept — Greek uses the article with abstract nouns; English usually drops it ('love', not 'the love')",
              choices: [
                "to mark it as a concept — Greek uses the article with abstract nouns; English usually drops it ('love', not 'the love')",
                "to make it definite, like English 'the love'",
                "because abstract nouns are always plural in Greek",
                "to mark possession"
              ] },
            { form: "ὁ ἄνθρωπος (generic)",
              prompt: "In a maxim like ὁ ἄνθρωπος ἀδελφὸς ἐστιν, what does ὁ ἄνθρωπος mean?",
              answer: "'a human being / mankind' — generic / categorical use of the article",
              choices: [
                "'a human being / mankind' — generic / categorical use of the article",
                "'the man' — referring to one specific person",
                "'this man' — demonstrative",
                "'his man' — possessive"
              ],
              note: "Greek often uses the article generically where English would drop it or use 'a'." },
            { form: "anarthrous noun",
              prompt: "When a Greek noun appears WITHOUT the article, what does that typically signal?",
              answer: "indefiniteness ('a / some'), or that the noun is qualitative ('Greek-ness, divinity')",
              choices: [
                "indefiniteness ('a / some'), or that the noun is qualitative ('Greek-ness, divinity')",
                "definiteness — Greek normally drops the article on definite nouns",
                "always 'the' — Greek nouns are definite by default",
                "the noun is a verb, not a noun"
              ],
              note: "Compare: θεὸς ἦν ὁ λόγος = 'the Word was God' (qualitative) vs ὁ θεός = 'God' (the one specific God)." }
          ]
        }
      ]
    },


    // ─────────────────────────────────────────────────────────────
    "3": {
      label: "Chapter 3 Grammar",
      notes: "Genitive & dative cases (functions & special uses); feminine and neuter nouns; vocative; Ἰησοῦς; introduction to αὐτός",
      items: [
        {
          family: "3.1 The Genitive and Dative Cases",
          lemma: "genitive / dative",
          gloss: "of / to-for-by",
          questions: [
            { form: "genitive", prompt: "Primary function of the genitive?",
              answer: "possession / source ('of')",
              choices: ["possession / source ('of')", "direct object", "subject", "indirect object"] },
            { form: "dative", prompt: "Primary function of the dative?",
              answer: "indirect object / location / means ('to/for/with/in')",
              choices: [
                "indirect object / location / means ('to/for/with/in')",
                "subject", "direct object", "possession"
              ] },
            { form: "ὁ λόγος τοῦ θεοῦ",
              prompt: "Translate this genitive phrase.",
              answer: "'the word of God' — genitive of possession / source",
              choices: [
                "'the word of God' — genitive of possession / source",
                "'the word, God' — apposition",
                "'God's word is…' — predicate sentence",
                "'word, O God' — vocative"
              ] },
            { form: "λέγω τῷ ἀδελφῷ",
              prompt: "Translate this dative phrase.",
              answer: "'I speak to the brother' — dative as indirect object",
              choices: [
                "'I speak to the brother' — dative as indirect object",
                "'I speak the brother' — direct object",
                "'I speak about the brother' — genitive",
                "'the brother speaks' — subject"
              ] }
          ]
        },
        {
          family: "3.2 Special Uses of the Genitive and Dative",
          lemma: "case functions",
          gloss: "secondary uses",
          questions: [
            { form: "genitive of source",
              prompt: "When a genitive expresses where something COMES FROM, what use is it?",
              answer: "genitive of source / separation ('away from')",
              choices: [
                "genitive of source / separation ('away from')",
                "genitive of possession ('of')",
                "genitive of time ('during')",
                "genitive absolute"
              ],
              note: "Many of the prepositions taught in Ch 4 (ἀπό, ἐκ, παρά) take genitives of source." },
            { form: "dative of means / instrument",
              prompt: "How is the bare dative often used to express HOW something is done?",
              answer: "dative of means / instrument — 'by, with, by means of'",
              choices: [
                "dative of means / instrument — 'by, with, by means of'",
                "as the direct object",
                "as a vocative of address",
                "as a genitive of possession"
              ],
              note: "λόγῳ = 'by a word'; πίστει = 'by faith'." },
            { form: "dative of location",
              prompt: "What special use does the dative have for WHERE something happens?",
              answer: "dative of place / location — 'in, at'",
              choices: [
                "dative of place / location — 'in, at'",
                "always requires the preposition εἰς",
                "always requires the preposition ἀπό",
                "Greek never uses bare dative for location"
              ],
              note: "Often reinforced with ἐν + dat. in NT Greek (introduced in Ch 4)." },
            { form: "ἐν τῇ καρδίᾳ",
              prompt: "Identify the case and function.",
              answer: "dative — location ('in the heart')",
              choices: [
                "dative — location ('in the heart')",
                "genitive — possession ('of the heart')",
                "accusative — direct object ('the heart')",
                "nominative — subject ('the heart [is]')"
              ] }
          ]
        },
        {
          family: "3.3 Feminine and Neuter Nouns",
          lemma: "1st-decl fem & 2nd-decl neut",
          gloss: "two new noun patterns",
          questions: [
            { form: "-η nouns",
              prompt: "What gender are 1st-declension nouns ending in -η in the nominative singular (e.g., ἀγάπη, φωνή, ζωή)?",
              answer: "feminine",
              choices: ["feminine", "masculine", "neuter", "common (M+F)"] },
            { form: "-α nouns",
              prompt: "What gender are most 1st-declension nouns ending in -α (e.g., ἁμαρτία, καρδία, οἰκία)?",
              answer: "feminine",
              choices: ["feminine", "neuter", "masculine", "always common gender"] },
            { form: "-ον nouns",
              prompt: "What gender are 2nd-declension nouns ending in -ον (e.g., ἔργον, τέκνον, βιβλίον)?",
              answer: "neuter",
              choices: ["neuter", "masculine", "feminine", "no gender pattern"] },
            { form: "τὰ ἔργα γίνεται",
              prompt: "Why does a neuter plural subject like τὰ ἔργα ('the works') take a SINGULAR verb (γίνεται 'happens')?",
              answer: "neuter plural subjects regularly take a singular verb in Greek",
              choices: [
                "neuter plural subjects regularly take a singular verb in Greek",
                "the verb is a typo for γίνονται",
                "ἔργα is actually singular here",
                "Greek verbs don't agree with subjects"
              ],
              note: "A reliable Greek rule: τὰ τέκνα ἔρχεται 'the children come' (sg. verb)." }
          ]
        },
        {
          family: "3.4 The Vocative",
          lemma: "vocative",
          gloss: "case of direct address",
          questions: [
            { form: "vocative",
              prompt: "Function of the vocative?",
              answer: "direct address",
              choices: ["direct address", "subject", "direct object", "possession"] },
            { form: "κύριε",
              prompt: "What is the form κύριε?",
              answer: "vocative singular ('Lord!') — from κύριος",
              choices: [
                "vocative singular ('Lord!') — from κύριος",
                "nominative singular ('the Lord')",
                "dative singular ('to the Lord')",
                "accusative singular ('the Lord' direct object)"
              ],
              note: "Most 2nd-decl masc nouns form vocative singular by replacing -ος with -ε." },
            { form: "vocative vs nominative",
              prompt: "How is the vocative distinguished from the nominative most of the time?",
              answer: "for many nouns the two are IDENTICAL in form — context (and often an interjection like ὦ) disambiguates",
              choices: [
                "for many nouns the two are IDENTICAL in form — context (and often an interjection like ὦ) disambiguates",
                "vocative always carries a circumflex accent",
                "vocative always lacks the article",
                "vocative is always plural"
              ],
              note: "Plural vocative is always identical to plural nominative." },
            { form: "ἀδελφοί",
              prompt: "Translate this vocative form.",
              answer: "'Brothers!' — vocative plural (identical to nominative plural)",
              choices: [
                "'Brothers!' — vocative plural (identical to nominative plural)",
                "'of the brothers' — genitive plural",
                "'to the brothers' — dative plural",
                "'the brothers' — accusative plural"
              ] }
          ]
        },
        {
          family: "3.5 Ἰησοῦς",
          lemma: "Ἰησοῦς",
          gloss: "Jesus — irregular declension",
          questions: [
            { form: "Ἰησοῦς declension",
              prompt: "Why is Ἰησοῦς irregular?",
              answer: "it is a hellenised Hebrew name (Yeshua), so its cases don't follow the standard 2nd-decl pattern",
              choices: [
                "it is a hellenised Hebrew name (Yeshua), so its cases don't follow the standard 2nd-decl pattern",
                "it is a 3rd-declension noun like σάρξ",
                "it never changes form — indeclinable",
                "it follows the 1st-declension fem pattern"
              ] },
            { form: "Ἰησοῦν",
              prompt: "Parse this form of Ἰησοῦς.",
              answer: "accusative singular — direct object 'Jesus'",
              choices: [
                "accusative singular — direct object 'Jesus'",
                "genitive singular — 'of Jesus'",
                "dative singular — 'to/for Jesus'",
                "vocative singular — 'Jesus!'"
              ] },
            { form: "Ἰησοῦ",
              prompt: "Which case(s) does the form Ἰησοῦ cover?",
              answer: "genitive, dative, AND vocative — Ἰησοῦ does triple duty",
              choices: [
                "genitive, dative, AND vocative — Ἰησοῦ does triple duty",
                "only the genitive",
                "only the dative",
                "only the vocative"
              ],
              note: "Only the nominative (Ἰησοῦς) and accusative (Ἰησοῦν) are visually distinct." }
          ]
        },
        {
          family: "3.6 αὐτός — introduction",
          lemma: "αὐτός, -ή, -ό",
          gloss: "he, she, it (3rd-person pronoun)",
          questions: [
            { form: "αὐτός — basic use",
              prompt: "What is the most common, basic use of αὐτός in NT Greek?",
              answer: "as the 3rd-person pronoun ('he, she, it, they') in its oblique cases — gen., dat., acc.",
              choices: [
                "as the 3rd-person pronoun ('he, she, it, they') in its oblique cases — gen., dat., acc.",
                "always as the demonstrative 'this'",
                "always as the relative pronoun 'who'",
                "always as the article 'the'"
              ],
              note: "Deeper uses (emphatic, identifying) are introduced in Ch 9." },
            { form: "αὐτοῦ",
              prompt: "Translate.",
              answer: "'of him / his' — genitive singular masculine",
              choices: [
                "'of him / his' — genitive singular masculine",
                "'to him' — dative singular masculine",
                "'him' — accusative singular masculine",
                "'self' — emphatic nominative"
              ] },
            { form: "αὐτοῖς",
              prompt: "Parse and translate.",
              answer: "dative plural masc./neut. — 'to/for them'",
              choices: [
                "dative plural masc./neut. — 'to/for them'",
                "genitive plural — 'of them'",
                "accusative plural — 'them'",
                "nominative plural — 'they themselves'"
              ] },
            { form: "αὐτός declension",
              prompt: "Which endings does αὐτός take?",
              answer: "standard 2-1-2 (adjective) endings — like καλός, καλή, καλόν",
              choices: [
                "standard 2-1-2 (adjective) endings — like καλός, καλή, καλόν",
                "3rd-declension endings throughout",
                "indeclinable",
                "the same forms as the article"
              ] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "4": {
      label: "Chapter 4 Grammar",
      notes: "Prepositions (basic and multi-case), instruments and agents, compound verbs, questions, and negatives",
      items: [
        {
          family: "4.1 Basic Prepositions",
          lemma: "ἐν, εἰς, ἐκ, ἀπό, σύν, πρός",
          gloss: "single-case prepositions",
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
              note: "'to', 'toward'." }
          ]
        },
        {
          family: "4.2 More Prepositions (multi-case)",
          lemma: "διά, μετά, κατά, ἐπί, παρά, περί, ὑπό, ὑπέρ",
          gloss: "case shifts the meaning",
          questions: [
            { form: "διά + genitive", prompt: "διά + genitive means…",
              answer: "through (means or agency)",
              choices: ["through (means or agency)", "because of, on account of", "with", "into"] },
            { form: "διά + accusative", prompt: "διά + accusative means…",
              answer: "because of, on account of",
              choices: ["because of, on account of", "through (means or agency)", "with", "after"] },
            { form: "μετά + genitive", prompt: "μετά + genitive means…",
              answer: "with (in company with)",
              choices: ["with (in company with)", "after (in time)", "into", "by means of"] },
            { form: "μετά + accusative", prompt: "μετά + accusative means…",
              answer: "after (in time)",
              choices: ["after (in time)", "with (in company with)", "before", "instead of"] },
            { form: "κατά + accusative", prompt: "κατά + accusative means…",
              answer: "according to / throughout",
              choices: ["according to / throughout", "down from", "with", "before"],
              note: "κατὰ Μᾶρκον = 'according to Mark'." },
            { form: "κατά + genitive", prompt: "κατά + genitive means…",
              answer: "down from / against",
              choices: ["down from / against", "according to", "with", "into"] },
            { form: "ἐπί + accusative", prompt: "ἐπί + accusative means…",
              answer: "onto, to (motion toward)",
              choices: ["onto, to (motion toward)", "on (location)", "on the basis of", "against"] },
            { form: "ἐπί + genitive", prompt: "ἐπί + genitive means…",
              answer: "on, upon (location)",
              choices: ["on, upon (location)", "onto (motion)", "on the basis of", "after"] },
            { form: "ἐπί + dative", prompt: "ἐπί + dative means…",
              answer: "on the basis of / at",
              choices: ["on the basis of / at", "onto (motion)", "on, upon (location)", "against"] },
            { form: "παρά + genitive", prompt: "παρά + genitive means…",
              answer: "from beside (source, often of a person)",
              choices: ["from beside (source, often of a person)", "alongside (motion)", "beside (location)", "instead of"] },
            { form: "παρά + dative", prompt: "παρά + dative means…",
              answer: "beside, at (location, often with a person)",
              choices: ["beside, at (location, often with a person)", "alongside (motion)", "from beside", "on behalf of"] },
            { form: "περί + genitive", prompt: "περί + genitive means…",
              answer: "concerning, about (topic)",
              choices: ["concerning, about (topic)", "around (location)", "on behalf of", "through"],
              note: "Mnemonic: gen. = 'about the topic'; acc. = 'around the place'." },
            { form: "περί + accusative", prompt: "περί + accusative means…",
              answer: "around, about (location/approx.)",
              choices: ["around, about (location/approx.)", "concerning, about (topic)", "after", "by"] }
          ]
        },
        {
          family: "4.3 Instruments and Agents",
          lemma: "ὑπό / διά / dative",
          gloss: "who or what causes the action",
          questions: [
            { form: "ὑπό + genitive",
              prompt: "How does Greek express the personal AGENT (the doer) of a passive verb?",
              answer: "ὑπό + genitive — 'by (a person)'",
              choices: [
                "ὑπό + genitive — 'by (a person)'",
                "ἐν + dative — 'by' a person",
                "ἀπό + accusative — 'by' a person",
                "the bare nominative"
              ],
              note: "ἐβαπτίσθη ὑπὸ Ἰωάννου = 'he was baptised by John'." },
            { form: "διά + genitive (agency)",
              prompt: "Besides 'through (location)', how does διά + gen. express a doer?",
              answer: "as the INTERMEDIATE agent — 'through (someone)' = the channel by which something happened",
              choices: [
                "as the INTERMEDIATE agent — 'through (someone)' = the channel by which something happened",
                "as the direct agent like ὑπό + gen.",
                "as the indirect object",
                "as the location of the action"
              ],
              note: "Common in NT: διὰ Χριστοῦ = 'through Christ' (he is the means by which it happens)." },
            { form: "dative of means",
              prompt: "How does Greek express the IMPERSONAL instrument ('with a sword', 'by a word')?",
              answer: "the bare dative — dative of means / instrument",
              choices: [
                "the bare dative — dative of means / instrument",
                "always ὑπό + gen.",
                "always διά + acc.",
                "the bare accusative"
              ],
              note: "λόγῳ ('by a word'), μαχαίρῃ ('with a sword'). Often reinforced with ἐν + dat." },
            { form: "agent vs instrument",
              prompt: "Which case-construction marks a PERSONAL agent vs an IMPERSONAL instrument?",
              answer: "personal agent → ὑπό + gen.; impersonal instrument → bare dative (or ἐν + dat.)",
              choices: [
                "personal agent → ὑπό + gen.; impersonal instrument → bare dative (or ἐν + dat.)",
                "personal → dative; impersonal → ὑπό + gen.",
                "both use ὑπό + gen.",
                "both use the bare dative"
              ] }
          ]
        },
        {
          family: "4.4 Compound Verbs",
          lemma: "ἐκβάλλω, ἀπολύω, παρακαλέω",
          gloss: "preposition + verb",
          questions: [
            { form: "compound verb",
              prompt: "What is a 'compound verb' in Greek?",
              answer: "a verb formed by prefixing a preposition onto a simple verb stem",
              choices: [
                "a verb formed by prefixing a preposition onto a simple verb stem",
                "a verb with two stems welded together",
                "any irregular verb",
                "a verb taking two direct objects"
              ],
              note: "ἐκβάλλω = ἐκ ('out') + βάλλω ('I throw') = 'I throw out / drive out'." },
            { form: "ἐκβάλλω",
              prompt: "Analyse this compound verb.",
              answer: "ἐκ ('out of') + βάλλω ('I throw') → 'I drive/throw out'",
              choices: [
                "ἐκ ('out of') + βάλλω ('I throw') → 'I drive/throw out'",
                "ἐκ ('out of') + καλέω ('I call') → 'I call out'",
                "ἐκ ('out of') + λύω ('I untie') → 'I unbind'",
                "a single simplex verb, no prefix"
              ] },
            { form: "ἀπολύω",
              prompt: "Analyse this compound verb.",
              answer: "ἀπό ('away') + λύω ('I untie') → 'I release, dismiss, divorce'",
              choices: [
                "ἀπό ('away') + λύω ('I untie') → 'I release, dismiss, divorce'",
                "ἀπό ('away') + λέγω ('I say') → 'I refuse'",
                "a simplex verb meaning 'I worship'",
                "ἀπό ('away') + λαμβάνω → 'I receive'"
              ] },
            { form: "elision before vowel",
              prompt: "Why is κατοικέω (κατά + οἰκέω) spelt with a single α, not κατά-οἰκέω?",
              answer: "the final vowel of the prefix elides before the initial vowel of the stem (and rough breathing may aspirate the consonant)",
              choices: [
                "the final vowel of the prefix elides before the initial vowel of the stem (and rough breathing may aspirate the consonant)",
                "Greek hates double vowels and always drops the second one",
                "κατά always loses its accent when prefixed",
                "the spelling is irregular and must be memorised"
              ],
              note: "κατά + οἰκέω → κατοικέω; ἀπό + ἔρχομαι → ἀπέρχομαι." }
          ]
        },
        {
          family: "4.5 Questions",
          lemma: "πῶς, ποῦ, τίς, question mark",
          gloss: "asking questions in Greek",
          questions: [
            { form: "πῶς",
              prompt: "Translate.",
              answer: "'how?' — interrogative adverb",
              choices: ["'how?' — interrogative adverb", "'where?'", "'when?'", "'why?'"] },
            { form: "ποῦ",
              prompt: "Translate.",
              answer: "'where?' — interrogative adverb (with accent; the enclitic που = 'somewhere')",
              choices: [
                "'where?' — interrogative adverb (with accent; the enclitic που = 'somewhere')",
                "'how?'",
                "'when?'",
                "'why?'"
              ] },
            { form: "Greek question mark",
              prompt: "What punctuation marks a question in printed Greek?",
              answer: "the semicolon-shaped mark (·;·) — a raised dot/semicolon at sentence end",
              choices: [
                "the semicolon-shaped mark (·;·) — a raised dot/semicolon at sentence end",
                "the English question mark (?)",
                "no punctuation — only word order signals questions",
                "the Greek full stop (·)"
              ] },
            { form: "neutral yes/no question",
              prompt: "How is a neutral yes-or-no question marked (no slant either way)?",
              answer: "by intonation and the Greek question mark — no introductory particle is needed",
              choices: [
                "by intonation and the Greek question mark — no introductory particle is needed",
                "always with οὐ at the head",
                "always with μή at the head",
                "always with ἆρα at the head"
              ],
              note: "οὐ at the head expects 'yes'; μή at the head expects 'no' — those slanted forms are revisited in Ch 10." }
          ]
        },
        {
          family: "4.6 Negatives",
          lemma: "οὐ, οὐκ, οὐχ",
          gloss: "'not' in Greek",
          questions: [
            { form: "οὐ / οὐκ / οὐχ",
              prompt: "When do you use each of οὐ, οὐκ, οὐχ?",
              answer: "οὐ before a consonant; οὐκ before a smooth-breathing vowel; οὐχ before a rough-breathing vowel",
              choices: [
                "οὐ before a consonant; οὐκ before a smooth-breathing vowel; οὐχ before a rough-breathing vowel",
                "they are interchangeable — pick any",
                "οὐ is singular; οὐκ is plural",
                "οὐχ is for past tenses only"
              ],
              note: "οὐ βλέπει / οὐκ ἀκούει / οὐχ ὁρᾷ — pick the form that matches what follows." },
            { form: "οὐ position",
              prompt: "Where does οὐ normally stand in relation to the verb it negates?",
              answer: "immediately before the verb",
              choices: [
                "immediately before the verb",
                "after the verb",
                "at the end of the clause",
                "anywhere — position is free"
              ],
              note: "οὐ λέγω = 'I am not speaking'." },
            { form: "οὐ negates",
              prompt: "Which type of clause does οὐ normally negate?",
              answer: "a factual statement (indicative mood)",
              choices: [
                "a factual statement (indicative mood)",
                "a command (imperative)",
                "a subordinate purpose clause (subjunctive)",
                "an infinitive"
              ],
              note: "μή — the other negative — is used with non-indicative moods (introduced from Ch 7 onward)." },
            { form: "οὐκ ἔστιν",
              prompt: "Translate.",
              answer: "'he/she/it is not' — οὐκ + ἐστίν (smooth-breathing vowel)",
              choices: [
                "'he/she/it is not' — οὐκ + ἐστίν (smooth-breathing vowel)",
                "'he is' — οὐκ is enclitic and means 'truly'",
                "'they are not' — οὐκ marks plural",
                "'he was not' — οὐκ implies past tense"
              ] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "5": {
      label: "Chapter 5 Grammar",
      notes: "Adjectives — formation, attributive/predicative/substantive use; εἰμί and its special uses; πολύς & μέγας; word order",
      items: [
        {
          family: "5.1 Formation of Adjectives",
          lemma: "ἀγαθός, -ή, -όν",
          gloss: "2-1-2 endings",
          questions: [
            { form: "2-1-2 pattern",
              prompt: "Most Greek adjectives follow the '2-1-2' pattern. What does that mean?",
              answer: "masculine = 2nd decl., feminine = 1st decl., neuter = 2nd decl. (e.g., καλός, καλή, καλόν)",
              choices: [
                "masculine = 2nd decl., feminine = 1st decl., neuter = 2nd decl. (e.g., καλός, καλή, καλόν)",
                "masc. = 2nd, fem. = 2nd, neut. = 1st",
                "all three genders use the 1st declension",
                "all three genders use the 3rd declension"
              ] },
            { form: "agreement",
              prompt: "An adjective agrees with its noun in which categories?",
              answer: "case, gender, and number",
              choices: [
                "case, gender, and number",
                "person, number, and tense",
                "voice, mood, and aspect",
                "only gender and number"
              ] },
            { form: "ἡ καλὴ φωνή",
              prompt: "Why does καλή end in -η here?",
              answer: "to agree with φωνή (nom. sg. fem.)",
              choices: [
                "to agree with φωνή (nom. sg. fem.)",
                "all -η endings are dative",
                "adjectives default to feminine",
                "to mark the predicate position"
              ] },
            { form: "2-2 adjectives",
              prompt: "Some adjectives (like αἰώνιος) have only TWO endings (-ος, -ον). What does that mean?",
              answer: "masc. and fem. share the same form (-ος); only the neuter (-ον) is distinct",
              choices: [
                "masc. and fem. share the same form (-ος); only the neuter (-ον) is distinct",
                "they have no gender at all",
                "they are 3rd declension throughout",
                "they are indeclinable"
              ],
              note: "ζωὴ αἰώνιος = 'eternal life' (αἰώνιος used for fem. ζωή — no separate αἰωνία form)." }
          ]
        },
        {
          family: "5.2 Attributive Position",
          lemma: "ἀγαθός in attributive position",
          gloss: "'the good X'",
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
          family: "5.3 εἰμί — I Am",
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
        },
        {
          family: "5.4 Predicate Position",
          lemma: "ἀγαθός in predicate position",
          gloss: "'X is good'",
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
          family: "5.5 Adjectives as Nouns (Substantive)",
          lemma: "ὁ ἀγαθός, τὰ ἀγαθά",
          gloss: "article + adjective = noun",
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
        },
        {
          family: "5.6 πολύς and μέγας",
          lemma: "πολύς πολλή πολύ / μέγας μεγάλη μέγα",
          gloss: "irregular adjectives — much/great",
          questions: [
            { form: "πολύς, πολλή, πολύ",
              prompt: "Translate and note the unusual feature.",
              answer: "'much, many' — the masc./neut. nom./acc. sg. use a SHORT stem (πολυ-), but every other form uses a LONG stem (πολλο-, πολλη-)",
              choices: [
                "'much, many' — the masc./neut. nom./acc. sg. use a SHORT stem (πολυ-), but every other form uses a LONG stem (πολλο-, πολλη-)",
                "fully regular 2-1-2 adjective like καλός",
                "indeclinable — never changes form",
                "uses 3rd-declension endings everywhere"
              ],
              note: "Memorise the three short forms: πολύς (nom. sg. m.), πολύ (nom./acc. sg. n.), πολύν (acc. sg. m.). Everything else uses πολλ-." },
            { form: "μέγας, μεγάλη, μέγα",
              prompt: "Translate and note the unusual feature.",
              answer: "'large, great' — masc./neut. sg. nom./acc. use a SHORT stem (μέγα-), every other form uses the LONG stem (μεγαλ-)",
              choices: [
                "'large, great' — masc./neut. sg. nom./acc. use a SHORT stem (μέγα-), every other form uses the LONG stem (μεγαλ-)",
                "fully regular 2-1-2 throughout",
                "indeclinable in the singular",
                "always uses 3rd-declension endings"
              ],
              note: "Short forms: μέγας (m. nom. sg.), μέγαν (m. acc. sg.), μέγα (n. nom./acc. sg.). All other forms add -αλ-." },
            { form: "πολλὰ τέκνα",
              prompt: "Translate.",
              answer: "'many children' (πολλά agrees with the neuter plural τέκνα)",
              choices: [
                "'many children' (πολλά agrees with the neuter plural τέκνα)",
                "'great children' (μεγάλα)",
                "'much, a child'",
                "'the children are many'"
              ] }
          ]
        },
        {
          family: "5.7 Word Order in Greek Sentences",
          lemma: "Greek word order",
          gloss: "S-V-O is normal but flexible",
          questions: [
            { form: "Greek word order",
              prompt: "How rigid is Greek word order compared to English?",
              answer: "much freer — case endings carry the syntax",
              choices: ["much freer — case endings carry the syntax", "identical to English (SVO)", "always verb-final", "always verb-first"] },
            { form: "default order",
              prompt: "What is the most common, unmarked order of subject, verb and object in NT Greek?",
              answer: "subject – verb – object (SVO), but it varies freely; verb-first is also common",
              choices: [
                "subject – verb – object (SVO), but it varies freely; verb-first is also common",
                "subject – object – verb (SOV) — always",
                "verb – subject – object (VSO) — always",
                "no preferred order — random shuffle in every sentence"
              ] },
            { form: "fronting for emphasis",
              prompt: "When a Greek author moves a noun to the FRONT of its clause, what is the usual effect?",
              answer: "emphasis or topic-marking on that word",
              choices: [
                "emphasis or topic-marking on that word",
                "it is a grammatical error",
                "no change in meaning — order is invisible",
                "the noun's case shifts to nominative"
              ],
              note: "πάντα δι’ αὐτοῦ ἐγένετο = 'ALL things came into being through him' — πάντα fronted for stress." },
            { form: "postpositives",
              prompt: "Which kind of word CANNOT stand first in its clause in Greek?",
              answer: "postpositives — like δέ, γάρ, οὖν, μέν (introduced in Ch 9)",
              choices: [
                "postpositives — like δέ, γάρ, οὖν, μέν (introduced in Ch 9)",
                "nouns — they must follow the verb",
                "verbs — they must always come last",
                "prepositions — they must always come last"
              ] }
          ]
        },
        {
          family: "5.8 Special Uses of εἰμί",
          lemma: "εἰμί",
          gloss: "'there is', possession, idioms",
          questions: [
            { form: "εἰμί = 'there is/are'",
              prompt: "What does ἐστίν / εἰσίν typically mean when fronted with no obvious subject?",
              answer: "'there is / there are' — existential use of εἰμί",
              choices: [
                "'there is / there are' — existential use of εἰμί",
                "'he/she/it is' — equative use, with a hidden subject",
                "'he/she/it is going' — εἰμί is suddenly motion-verb",
                "'he/she/it is being' — passive of an active verb"
              ],
              note: "ἔστιν ἄνθρωπος = 'there is a man (who…)'. The accent on ἔστιν is the giveaway for the existential sense." },
            { form: "εἰμί + dative of possession",
              prompt: "How does Greek often express 'X has Y' using εἰμί?",
              answer: "'Y (subject in nom.) is to X (in dative)' — dative of possession with εἰμί",
              choices: [
                "'Y (subject in nom.) is to X (in dative)' — dative of possession with εἰμί",
                "always uses ἔχω directly",
                "uses the genitive of the possessor",
                "uses ὑπό + gen."
              ],
              note: "ἔστιν αὐτῷ τέκνον = 'there is a child to him' = 'he has a child'." },
            { form: "predicate nominative",
              prompt: "After εἰμί, what case is the predicate noun in?",
              answer: "nominative — εἰμί links two nominatives",
              choices: [
                "nominative — εἰμί links two nominatives",
                "accusative — the predicate is a direct object",
                "genitive — the predicate is possessive",
                "dative — the predicate is indirect"
              ],
              note: "ὁ θεὸς ἀγάπη ἐστίν = 'God is love' — both ὁ θεός and ἀγάπη are nominative." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "6": {
      label: "Chapter 6 Grammar",
      notes: "The tenses — idea, distinguishing forms, meaning, endings, augment, σ-suffix, prefix+suffix combos, and -έω verb tenses",
      items: [
        {
          family: "6.1 The Idea of Tenses",
          lemma: "tense",
          gloss: "time AND aspect",
          questions: [
            { form: "tense encodes",
              prompt: "What does a Greek tense encode, beyond English-style time reference?",
              answer: "aspect — the viewpoint on the action (ongoing vs simple-whole) — and, in the indicative, time",
              choices: [
                "aspect — the viewpoint on the action (ongoing vs simple-whole) — and, in the indicative, time",
                "only time — Greek tense is identical to English tense",
                "only voice (active / middle / passive)",
                "only mood"
              ] },
            { form: "five basic indicative tenses",
              prompt: "Which five tense systems are introduced in this chapter for the indicative?",
              answer: "present, imperfect, future, aorist, perfect (the perfect comes properly in Ch 16)",
              choices: [
                "present, imperfect, future, aorist, perfect (the perfect comes properly in Ch 16)",
                "only present and aorist",
                "all six principal-part stems at once",
                "future, perfect, pluperfect only"
              ] },
            { form: "tense outside indicative",
              prompt: "What does tense convey OUTSIDE the indicative (e.g., subjunctive, infinitive, participle)?",
              answer: "aspect only — there is no time reference outside the indicative",
              choices: [
                "aspect only — there is no time reference outside the indicative",
                "both aspect and absolute time",
                "voice only",
                "person and number"
              ],
              note: "Present subj. = ongoing aspect, NOT 'present time'. Returns more fully in Chs 7, 14, 17." }
          ]
        },
        {
          family: "6.2 Distinguishing the Tenses",
          lemma: "tense markers",
          gloss: "what to look for first",
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
          family: "6.3 The Meaning of the Tenses",
          lemma: "aspect of each tense",
          gloss: "ongoing vs whole vs neutral",
          questions: [
            { form: "present aspect",
              prompt: "Which Greek tense is most strongly associated with imperfective aspect (ongoing/process)?",
              answer: "the present (and the imperfect in past time)",
              choices: [
                "the present (and the imperfect in past time)",
                "the aorist",
                "the imperfect alone (never the present)",
                "the future"
              ],
              note: "Imperfective aspect views the action from inside, as in progress." },
            { form: "aorist aspect",
              prompt: "Which Greek tense is most strongly associated with perfective aspect (whole event as a single point)?",
              answer: "the aorist",
              choices: ["the aorist", "the present", "the future", "the imperfect"],
              note: "Perfective aspect views the action from outside as a complete whole — not necessarily 'punctiliar'." },
            { form: "future aspect",
              prompt: "Which Greek tense is aspectually neutral / underdetermined for aspect?",
              answer: "the future",
              choices: ["the future", "the aorist", "the imperfect", "the present"],
              note: "The future locates an event in later time but does not commit to imperfective or perfective viewpoint." }
          ]
        },
        {
          family: "6.4 The Endings",
          lemma: "primary vs secondary endings",
          gloss: "personal endings tell person + number",
          questions: [
            { form: "primary endings",
              prompt: "Which tenses use PRIMARY personal endings (typified by -ω, -εις, -ει, -ομεν, -ετε, -ουσι)?",
              answer: "present and future (non-past indicatives)",
              choices: [
                "present and future (non-past indicatives)",
                "imperfect and aorist (past indicatives)",
                "only the present",
                "all tenses use the same endings"
              ] },
            { form: "secondary endings",
              prompt: "Which tenses use SECONDARY personal endings (typified by -ον, -ες, -ε, -ομεν, -ετε, -ον)?",
              answer: "imperfect and aorist (past indicatives)",
              choices: [
                "imperfect and aorist (past indicatives)",
                "present and future",
                "perfect only",
                "subjunctive only"
              ],
              note: "Secondary endings appear with the augment in past-time indicatives." },
            { form: "ending tells",
              prompt: "What information do the personal endings encode?",
              answer: "person (1st/2nd/3rd) and number (sg./pl.) — sometimes voice",
              choices: [
                "person (1st/2nd/3rd) and number (sg./pl.) — sometimes voice",
                "only tense",
                "only mood",
                "only gender"
              ] }
          ]
        },
        {
          family: "6.5 The ε- Prefix (Augment)",
          lemma: "ε- augment",
          gloss: "past-time marker",
          questions: [
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
            { form: "augment",
              prompt: "In which moods does the augment (ε-) appear?",
              answer: "indicative only",
              choices: ["indicative only", "indicative and subjunctive", "all moods", "infinitive only"],
              note: "Past-time augment is restricted to the indicative mood." },
            { form: "vowel-initial augment",
              prompt: "What happens when a verb's stem begins with a vowel and would take an augment (e.g., ἀκούω → past)?",
              answer: "the initial vowel LENGTHENS instead of adding an ε- (ἀκούω → ἤκουον / ἤκουσα)",
              choices: [
                "the initial vowel LENGTHENS instead of adding an ε- (ἀκούω → ἤκουον / ἤκουσα)",
                "an ε- is simply prefixed: ἐ-ἀκούω → ἐακούω",
                "the verb takes no augment",
                "the verb adds a different prefix entirely"
              ],
              note: "α → η, ε → η, ο → ω, etc." },
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
        },
        {
          family: "6.6 The σ-Suffix",
          lemma: "σ in future/aorist",
          gloss: "tense-stem marker",
          questions: [
            { form: "σ-marker",
              prompt: "What does a σ between the verb stem and the ending typically signal?",
              answer: "future or 1st aorist (with augment)",
              choices: [
                "future or 1st aorist (with augment)",
                "imperfect",
                "present indicative",
                "nothing — σ is just a stem letter"
              ] },
            { form: "stop + σ combinations",
              prompt: "When a verb stem ends in a stop consonant and meets the σ-suffix, what happens? (e.g., βλέπω → ?-σω)",
              answer: "labial stops (π, β, φ) + σ → ψ; palatal stops (κ, γ, χ) + σ → ξ; dental stops (τ, δ, θ) drop before σ",
              choices: [
                "labial stops (π, β, φ) + σ → ψ; palatal stops (κ, γ, χ) + σ → ξ; dental stops (τ, δ, θ) drop before σ",
                "no change — the σ is added directly to the stop",
                "the stop drops in every case",
                "the stop and σ both drop"
              ],
              note: "βλέπω → βλέψω; ἄγω → ἄξω; πείθω → πείσω." },
            { form: "γράψω",
              prompt: "Why is the future of γράφω spelled γράψω?",
              answer: "φ (labial stop) + σ → ψ",
              choices: [
                "φ (labial stop) + σ → ψ",
                "the σ replaces the φ entirely",
                "γράψω is an irregular suppletive future",
                "Greek hates the cluster -φσ-, so the σ drops"
              ] }
          ]
        },
        {
          family: "6.7 Dealing with Prefixes and Suffixes",
          lemma: "augment + stem + σ + ending",
          gloss: "parsing the layered verb",
          questions: [
            { form: "parse layers",
              prompt: "In what order are the morphological layers of a Greek past-tense indicative verb?",
              answer: "augment + (compound prefix if any) + verb stem + (σ if applicable) + personal ending",
              choices: [
                "augment + (compound prefix if any) + verb stem + (σ if applicable) + personal ending",
                "personal ending + augment + stem (always reversed)",
                "no fixed order — it's free",
                "stem + augment + ending"
              ],
              note: "Compound prefix comes BEFORE the augment in surface form, but the augment is conceptually 'inside': ἀπ-έ-λυσα = ἀπό + ε-augment + λυ + σ + α." },
            { form: "ἔλυσα",
              prompt: "Break down ἔλυσα into its morphological layers.",
              answer: "ε- (augment) + λυ- (stem) + σ (1st-aorist marker) + -α (1sg secondary ending)",
              choices: [
                "ε- (augment) + λυ- (stem) + σ (1st-aorist marker) + -α (1sg secondary ending)",
                "ε- (augment) + λυσ- (stem) + -α (ending)",
                "ἔ- (lengthened stem) + -λυσα (ending)",
                "no breakdown — irregular"
              ] },
            { form: "parsing strategy",
              prompt: "What is the most efficient first question to ask when parsing an unfamiliar Greek verb form?",
              answer: "is there an augment (ε- or vowel-lengthening)? — that tells you it's a past-tense indicative",
              choices: [
                "is there an augment (ε- or vowel-lengthening)? — that tells you it's a past-tense indicative",
                "guess the verb meaning first, then worry about tense",
                "look at the personal ending and ignore the stem",
                "look at the accent first"
              ] }
          ]
        },
        {
          family: "6.8 Tenses in the -έω Verbs",
          lemma: "φιλέω, ποιέω, καλέω",
          gloss: "what happens to the ε in other tenses",
          questions: [
            { form: "ε lengthens",
              prompt: "When an -έω verb forms a tense with a CONSONANT suffix (future σ, aorist σ, perfect κ), what happens to the stem-final ε?",
              answer: "it lengthens to η (φιλέω → φιλήσω, ἐφίλησα, πεφίληκα)",
              choices: [
                "it lengthens to η (φιλέω → φιλήσω, ἐφίλησα, πεφίληκα)",
                "it drops out completely",
                "it stays as ε in every tense",
                "it turns into ι"
              ],
              note: "This is one of the most reliable patterns of -έω verbs." },
            { form: "φιλήσω",
              prompt: "Parse this verb form.",
              answer: "future active indicative, 1st sg. of φιλέω ('I will love')",
              choices: [
                "future active indicative, 1st sg. of φιλέω ('I will love')",
                "aorist active indicative, 1st sg.",
                "present active indicative, 1st sg.",
                "perfect active indicative, 1st sg."
              ],
              note: "ε → η before σ; future and 1st aorist both lengthen but augment distinguishes them (φιλήσω vs ἐφίλησα)." },
            { form: "ἐποίησεν",
              prompt: "Parse this verb form.",
              answer: "aorist active indicative, 3rd sg. of ποιέω ('he/she/it made/did')",
              choices: [
                "aorist active indicative, 3rd sg. of ποιέω ('he/she/it made/did')",
                "imperfect active indicative, 3rd sg.",
                "future active indicative, 3rd sg.",
                "perfect active indicative, 3rd sg."
              ],
              note: "ε- augment + ποι- + η (lengthened ε) + σ + ε(ν) = ἐποίησεν." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "7": {
      label: "Chapter 7 Grammar",
      notes: "Moods — the idea, imperatives, infinitives, participles (introduction), and participles used as nouns",
      items: [
        {
          family: "7.1 The Idea of Moods",
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
            { form: "infinitive vs participle",
              prompt: "What's the categorical difference between an infinitive and a participle?",
              answer: "infinitive = verbal NOUN; participle = verbal ADJECTIVE",
              choices: [
                "infinitive = verbal NOUN; participle = verbal ADJECTIVE",
                "infinitive = verbal adjective; participle = verbal noun",
                "they are interchangeable",
                "both are finite verbs"
              ] }
          ]
        },
        {
          family: "7.2 The Imperative",
          lemma: "imperative",
          gloss: "commands",
          questions: [
            { form: "λῦε",
              prompt: "What mood is this (2nd sg., addressed to one person)?",
              answer: "imperative",
              choices: ["imperative", "indicative", "subjunctive", "infinitive"] },
            { form: "λύετε (imperative)",
              prompt: "What does the imperative λύετε mean?",
              answer: "'Untie!' — 2nd-plural imperative ('you all untie!')",
              choices: [
                "'Untie!' — 2nd-plural imperative ('you all untie!')",
                "'You are untying' — present indicative",
                "'I untie' — 1st singular",
                "'to untie' — infinitive"
              ],
              note: "2nd-plural imperative looks identical to 2nd-plural present indicative; context (and absence of subject) tells you which." },
            { form: "μή + imperative",
              prompt: "How does Greek form a NEGATIVE command ('do not untie!')?",
              answer: "μή + present imperative (or μή + aorist subjunctive — taught with the subjunctive)",
              choices: [
                "μή + present imperative (or μή + aorist subjunctive — taught with the subjunctive)",
                "οὐ + present imperative",
                "οὐκ + future indicative",
                "Greek has no negative imperative"
              ],
              note: "Negative commands use μή, not οὐ — οὐ is reserved for the indicative." }
          ]
        },
        {
          family: "7.3 The Infinitive",
          lemma: "infinitive",
          gloss: "verbal noun",
          questions: [
            { form: "λύειν",
              prompt: "What is this form?",
              answer: "present active infinitive",
              choices: ["present active infinitive", "present active indicative, 2nd sg.", "aorist active subjunctive", "present imperative, 3rd sg."] },
            { form: "infinitive function",
              prompt: "What's the most basic function of a Greek infinitive?",
              answer: "to complete another verb's idea — 'I want / I am able / I begin TO do …'",
              choices: [
                "to complete another verb's idea — 'I want / I am able / I begin TO do …'",
                "to ask a question",
                "to issue a command directly",
                "to negate the main verb"
              ],
              note: "θέλω λύειν = 'I want to loose'. The infinitive complements θέλω." },
            { form: "infinitive endings",
              prompt: "Which of these is a giveaway infinitive ending?",
              answer: "-ειν (present active), -σαι (aorist active), -ναι (perfect / -μι active)",
              choices: [
                "-ειν (present active), -σαι (aorist active), -ναι (perfect / -μι active)",
                "-ει (singular indicative)",
                "-ε (vocative)",
                "-ος (nominative)"
              ] }
          ]
        },
        {
          family: "7.4 Participles (Introduction)",
          lemma: "participle",
          gloss: "verbal adjective",
          questions: [
            { form: "participle",
              prompt: "What is the participle grammatically?",
              answer: "a verbal adjective",
              choices: ["a verbal adjective", "a verbal noun", "a finite verb", "an interjection"] },
            { form: "participle agreement",
              prompt: "A participle agrees with the noun it modifies in which categories?",
              answer: "case, gender, and number (like any adjective)",
              choices: [
                "case, gender, and number (like any adjective)",
                "person, number, and tense",
                "only voice",
                "only number"
              ] },
            { form: "participle has",
              prompt: "What VERB-side information does a participle carry, in addition to its adjective-side agreement?",
              answer: "tense (≈ aspect) and voice (active / middle / passive)",
              choices: [
                "tense (≈ aspect) and voice (active / middle / passive)",
                "only mood",
                "person and number (like a finite verb)",
                "none — it is purely adjectival"
              ],
              note: "Participles are revisited at depth in Ch 14." }
          ]
        },
        {
          family: "7.5 Participles as Nouns",
          lemma: "ὁ + participle",
          gloss: "'the one who ___'",
          questions: [
            { form: "ὁ + participle",
              prompt: "When you see article + participle (with no noun), how do you translate?",
              answer: "as a noun-equivalent: 'the one who …' / 'those who …'",
              choices: [
                "as a noun-equivalent: 'the one who …' / 'those who …'",
                "always as an adverbial clause ('while ___')",
                "always as a finite verb",
                "always as an infinitive ('to ___')"
              ] },
            { form: "ὁ λέγων",
              prompt: "Translate.",
              answer: "'the one who says' / 'the one speaking' (substantive use of participle)",
              choices: [
                "'the one who says' / 'the one speaking' (substantive use of participle)",
                "'he says' (finite verb)",
                "'to say' (infinitive)",
                "'say!' (imperative)"
              ] },
            { form: "οἱ πιστεύοντες",
              prompt: "Translate.",
              answer: "'those who believe' / 'the believers' (substantive participle, masc. pl.)",
              choices: [
                "'those who believe' / 'the believers' (substantive participle, masc. pl.)",
                "'they believe' (finite verb)",
                "'to believe' (infinitive)",
                "'believe!' (imperative)"
              ],
              note: "Gender + number of the participle tell you what kind of person/thing is being referred to." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "8": {
      label: "Chapter 8 Grammar",
      notes: "Other patterns of nouns and verbs — deponent verbs; other moods/tenses of εἰμί; nouns of confusing gender",
      items: [
        {
          family: "8.1 Deponent Verbs",
          lemma: "ἔρχομαι, δέχομαι, ἀσπάζομαι",
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
            { form: "δέχομαι vs δέχω",
              prompt: "Which form is the dictionary (lemma) form?",
              answer: "δέχομαι",
              choices: ["δέχομαι", "δέχω", "either is acceptable", "δέξω"],
              note: "δέχομαι is deponent; *δέχω is not a real form." }
          ]
        },
        {
          family: "8.2 Imperfect, Future and Other Moods of εἰμί",
          lemma: "εἰμί",
          gloss: "I was / I will be / etc.",
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
            { form: "ἔσομαι",
              prompt: "Identify this form of εἰμί.",
              answer: "future, 1st singular ('I will be') — εἰμί's future is DEPONENT in form",
              choices: [
                "future, 1st singular ('I will be') — εἰμί's future is DEPONENT in form",
                "future, 3rd singular",
                "present middle, 1st singular",
                "imperfect, 1st singular"
              ],
              note: "Future of εἰμί uses middle/passive endings (-ομαι series) on the stem ἐσ-." },
            { form: "εἰμί other moods",
              prompt: "Which non-indicative moods of εἰμί must you eventually learn?",
              answer: "imperative (ἴσθι 'be!'), infinitive (εἶναι 'to be'), participle (ὤν, οὖσα, ὄν 'being'), and subjunctive (ὦ, ᾖς, ᾖ…)",
              choices: [
                "imperative (ἴσθι 'be!'), infinitive (εἶναι 'to be'), participle (ὤν, οὖσα, ὄν 'being'), and subjunctive (ὦ, ᾖς, ᾖ…)",
                "only the imperative",
                "only the infinitive",
                "εἰμί has no non-indicative forms"
              ] }
          ]
        },
        {
          family: "8.3 Nouns of Confusing Gender",
          lemma: "ὁ προφήτης / ἡ ὁδός",
          gloss: "exceptions to the typical patterns",
          questions: [
            { form: "ὁ προφήτης",
              prompt: "What is unusual about ὁ προφήτης?",
              answer: "it is MASCULINE despite the -ης ending that usually flags 1st-declension feminine",
              choices: [
                "it is MASCULINE despite the -ης ending that usually flags 1st-declension feminine",
                "it is neuter despite the masculine article",
                "it is 2nd declension despite the 1st-declension ending",
                "it is indeclinable"
              ],
              note: "A handful of 1st-decl nouns are masculine: προφήτης, μαθητής, βαπτιστής, νεανίας. The article ὁ is the giveaway." },
            { form: "προφήτου",
              prompt: "Why does the gen. sg. of προφήτης end in -ου instead of the usual feminine -ης?",
              answer: "1st-decl. masculines borrow the 2nd-decl. masc. -ου in the gen. sg.",
              choices: [
                "1st-decl. masculines borrow the 2nd-decl. masc. -ου in the gen. sg.",
                "It's a typo — it should be προφήτης.",
                "All 1st-decl. nouns end in -ου in the gen. sg.",
                "-ου marks the accusative."
              ],
              note: "προφήτης, προφήτου, προφήτῃ, προφήτην." },
            { form: "ἡ ὁδός",
              prompt: "What is unusual about ἡ ὁδός?",
              answer: "it is FEMININE despite the -ος ending that usually flags 2nd-declension masculine",
              choices: [
                "it is FEMININE despite the -ος ending that usually flags 2nd-declension masculine",
                "it is masculine despite the article ἡ",
                "it is neuter",
                "it is 3rd declension"
              ],
              note: "ἡ ὁδός = 'the road / way'. A few other -ος feminines exist (ἡ νῆσος 'island', ἡ ἔρημος '[the] desert')." },
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
      notes: "Special verbs — second aorists; future and aorist of liquid verbs",
      items: [
        {
          family: "11.1 Second Aorists",
          lemma: "εἶπον, ἦλθον, ἔλαβον",
          gloss: "suppletive aorist stems",
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
              note: "Stem reveals the tense; ending reveals person/number." },
            { form: "1st vs 2nd aorist",
              prompt: "What's the difference in meaning between a 1st and a 2nd aorist?",
              answer: "no difference in meaning — only in form. Some verbs use σα (1st aor.), others use a different stem (2nd aor.).",
              choices: [
                "no difference in meaning — only in form. Some verbs use σα (1st aor.), others use a different stem (2nd aor.).",
                "1st aorist is simple past; 2nd aorist is ongoing past",
                "1st aorist is active; 2nd aorist is middle/passive",
                "2nd aorist is for compound verbs only"
              ] }
          ]
        },
        {
          family: "11.2 Future and Aorist of Liquid Verbs",
          lemma: "μένω, ἀποστέλλω, κρίνω",
          gloss: "stems ending in λ, μ, ν, ρ",
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
              note: "Liquid futures look like ε-contract presents — accent is the diagnostic." },
            { form: "aorist of μένω",
              prompt: "What is the aorist of μένω, and how is it formed?",
              answer: "ἔμεινα — augment + stem with vowel-lengthening (ε → ει) + α + secondary endings (NO σ)",
              choices: [
                "ἔμεινα — augment + stem with vowel-lengthening (ε → ει) + α + secondary endings (NO σ)",
                "ἔμενσα — augment + stem + σα + endings (regular 1st aorist)",
                "ἔμεινον — 2nd aorist on a different stem",
                "μενῶ — same as the future"
              ],
              note: "Liquid aorists drop the σ but keep the α and the secondary endings (-α, -ας, -ε, -αμεν, -ατε, -αν)." },
            { form: "ἀπέστειλα",
              prompt: "Parse this verb form.",
              answer: "aorist active indicative, 1st sg. of ἀποστέλλω ('I sent')",
              choices: [
                "aorist active indicative, 1st sg. of ἀποστέλλω ('I sent')",
                "future active indicative, 1st sg.",
                "imperfect active indicative, 1st sg.",
                "perfect active indicative, 1st sg."
              ],
              note: "Liquid aorist: ἀπ- (prefix) + ε- (augment) + στειλ- (raised stem, originally στελ-) + -α (secondary ending)." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "12": {
      label: "Chapter 12 Grammar",
      notes: "Third declension part 1 — the essence; masc/fem consonant stems; neuter consonant stems; adjectives with consonant stems; τις vs τίς",
      items: [
        {
          family: "12.1 The Essence of the 3rd Declension",
          lemma: "3rd declension",
          gloss: "stem ends in a consonant",
          questions: [
            { form: "essence",
              prompt: "What distinguishes a 3rd-declension noun from 1st/2nd-declension nouns?",
              answer: "its stem ends in a consonant (not -α/-η or -ο)",
              choices: [
                "its stem ends in a consonant (not -α/-η or -ο)",
                "it is always masculine",
                "it never takes the article",
                "it has no plural forms"
              ] },
            { form: "general rule",
              prompt: "How do you find the true 3rd-declension stem of a noun?",
              answer: "drop -ος from the genitive singular",
              choices: [
                "drop -ος from the genitive singular",
                "drop -ς from the nominative singular",
                "drop -ι from the dative singular",
                "look it up — there is no rule"
              ],
              note: "That's why the lexicon lists both nom. AND gen. sg.: σάρξ, σαρκός — the gen. shows the real stem σαρκ-." },
            { form: "ending series",
              prompt: "What is the typical 3rd-declension ending series in the singular (any gender)?",
              answer: "nom. = -ς (or zero), gen. = -ος, dat. = -ι, acc. = -α (or -ν after a vowel)",
              choices: [
                "nom. = -ς (or zero), gen. = -ος, dat. = -ι, acc. = -α (or -ν after a vowel)",
                "-ος, -ου, -ῳ, -ον (2nd decl. pattern)",
                "-η, -ης, -ῃ, -ην (1st decl. pattern)",
                "no fixed pattern — every noun is unique"
              ] }
          ]
        },
        {
          family: "12.2 Masculine and Feminine Nouns with Consonant Stems",
          lemma: "σάρξ, ἄρχων, ποιμήν",
          gloss: "masc/fem consonant stems",
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
            { form: "νύξ, νυκτός",
              prompt: "What does the gen. sg. νυκτός tell you about the stem?",
              answer: "the stem is νυκτ- (a dental + κ); ν + κ + τ + σ → ξ in the nom. sg.",
              choices: [
                "the stem is νυκτ- (a dental + κ); ν + κ + τ + σ → ξ in the nom. sg.",
                "the stem is νυξ- and the gen. is suppletive",
                "the stem is νυ- and -κτος is a unique ending",
                "the noun is indeclinable"
              ] }
          ]
        },
        {
          family: "12.3 Neuter Nouns with Consonant Stems",
          lemma: "πνεῦμα, σῶμα, ὄνομα",
          gloss: "ματ-stem neuters",
          questions: [
            { form: "πνεῦμα, πνεύματος",
              prompt: "What stem class is this?",
              answer: "ματ-stem (neuter)",
              choices: ["ματ-stem (neuter)", "ν-stem", "κ-stem", "ι-stem"],
              note: "ματ-stem neuters: nom./acc. sg. drops the τ; gen. sg. shows the full stem." },
            { form: "neuter rule (1)",
              prompt: "What rule about neuter nouns carries over from the 2nd declension into the 3rd?",
              answer: "neuter nom. and acc. are ALWAYS identical (singular and plural)",
              choices: [
                "neuter nom. and acc. are ALWAYS identical (singular and plural)",
                "neuters have no plural",
                "neuters never take the article",
                "neuters are always 3rd declension"
              ] },
            { form: "neuter plural",
              prompt: "What ending characterises the nom./acc. plural of 3rd-declension neuters?",
              answer: "-α (e.g., πνεύματα, σώματα)",
              choices: ["-α (e.g., πνεύματα, σώματα)", "-οι", "-α like 2nd-decl. neuter but stays short", "-ες"],
              note: "Same vowel as the 2nd-decl. neuter pl. (ἔργα), but on a different stem." }
          ]
        },
        {
          family: "12.4 Adjectives with Consonant Stems",
          lemma: "ἀληθής, -ές",
          gloss: "3rd-decl adjectives",
          questions: [
            { form: "3-decl adjective formation",
              prompt: "How does a 3rd-declension adjective like ἀληθής differ from a 2-1-2 adjective like ἀγαθός?",
              answer: "its masc./fem./neut. all use 3rd-declension endings on a consonant stem (here σ-stem); masc. and fem. share the same form",
              choices: [
                "its masc./fem./neut. all use 3rd-declension endings on a consonant stem (here σ-stem); masc. and fem. share the same form",
                "it never declines — indeclinable",
                "it uses 1st-decl endings throughout",
                "it has no neuter form"
              ] },
            { form: "ἀληθής",
              prompt: "Parse this form (paired with a masc. noun like λόγος).",
              answer: "nom. sg. masc. (or fem.) — 'true' — note the σ-stem contraction in the genitive (ἀληθοῦς)",
              choices: [
                "nom. sg. masc. (or fem.) — 'true' — note the σ-stem contraction in the genitive (ἀληθοῦς)",
                "gen. sg. — 'of true'",
                "dat. sg. — 'to/for true'",
                "acc. pl. — 'true ones'"
              ] },
            { form: "ἀληθές",
              prompt: "Parse this form.",
              answer: "nom./acc. sg. neuter — 'true'",
              choices: [
                "nom./acc. sg. neuter — 'true'",
                "nom. sg. masc.",
                "vocative sg. masc.",
                "gen. sg."
              ],
              note: "3-1 (=3-3) adjective: masc./fem. = -ής, neuter = -ές. Same -ς/-ς pattern as σ-stem nouns." }
          ]
        },
        {
          family: "12.5 τις and τίς",
          lemma: "τις / τίς",
          gloss: "someone vs who?",
          questions: [
            { form: "τίς",
              prompt: "What does τίς (accent on the ι) mean?",
              answer: "'who? / what? / which?' — interrogative pronoun (accent ALWAYS acute on the first syllable)",
              choices: [
                "'who? / what? / which?' — interrogative pronoun (accent ALWAYS acute on the first syllable)",
                "'someone / something' — enclitic indefinite",
                "'a certain one' — adjective",
                "'this' — demonstrative"
              ] },
            { form: "τις",
              prompt: "What does τις (no accent or enclitic) mean?",
              answer: "'someone / something / a certain ___' — enclitic indefinite pronoun",
              choices: [
                "'someone / something / a certain ___' — enclitic indefinite pronoun",
                "'who? / what?' — interrogative",
                "'this' — demonstrative",
                "'the' — article"
              ],
              note: "ἄνθρωπός τις = 'a certain man'. The enclitic τις leans on the previous word." },
            { form: "τίς vs τις",
              prompt: "What is the SINGLE diagnostic that distinguishes interrogative τίς from indefinite τις?",
              answer: "the accent — τίς keeps a fixed acute on the first syllable; τις is enclitic and usually unaccented",
              choices: [
                "the accent — τίς keeps a fixed acute on the first syllable; τις is enclitic and usually unaccented",
                "their form differs completely",
                "they appear in different cases only",
                "τίς is always plural; τις is always singular"
              ] },
            { form: "τις declension",
              prompt: "What declension do τίς and τις follow?",
              answer: "3rd declension — they decline together, only the accent differs",
              choices: [
                "3rd declension — they decline together, only the accent differs",
                "1st declension",
                "2nd declension",
                "indeclinable"
              ] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "13": {
      label: "Chapter 13 Grammar",
      notes: "Third declension part 2 — vowel stems; contracting nouns/adjectives; πᾶς; εἷς",
      items: [
        {
          family: "13.1 Vowel Stems",
          lemma: "πόλις, βασιλεύς, ἔθνος",
          gloss: "ι-stems, ευ-stems, σ-stems",
          questions: [
            { form: "πίστις, πίστεως",
              prompt: "What stem class is this common NT noun?",
              answer: "ι-stem (feminine)",
              choices: ["ι-stem (feminine)", "σ-stem (neuter)", "ευ-stem (masc.)", "ντ-stem"],
              note: "πίστις ('faith') is among the most frequent NT ι-stem nouns: πίστις, πίστεως, πίστει, πίστιν." },
            { form: "βασιλεύς, βασιλέως",
              prompt: "What stem class is this?",
              answer: "ευ-stem (masc.)",
              choices: ["ευ-stem (masc.)", "ι-stem", "σ-stem (neuter)", "ντ-stem"] },
            { form: "ἔθνος, ἔθνους",
              prompt: "What stem class is this NT noun?",
              answer: "σ-stem (neuter)",
              choices: ["σ-stem (neuter)", "ντ-stem", "ι-stem", "ευ-stem (masc.)"],
              note: "ἔθνος ('nation, Gentiles') declines just like γένος: ἔθνος, ἔθνους, ἔθνει, ἔθνος; pl. ἔθνη, ἐθνῶν, ἔθνεσι(ν), ἔθνη." },
            { form: "vowel-stem signal",
              prompt: "What ending in the genitive singular is a tell-tale sign of a ι-stem or ευ-stem noun?",
              answer: "-εως (e.g., πόλεως, βασιλέως)",
              choices: [
                "-εως (e.g., πόλεως, βασιλέως)",
                "-ος (e.g., σαρκός)",
                "-ων (e.g., νυκτῶν)",
                "-ι (e.g., πατρί)"
              ] }
          ]
        },
        {
          family: "13.2 Contracting Nouns and Adjectives",
          lemma: "γένος, ἀληθής",
          gloss: "vowel contractions in declension",
          questions: [
            { form: "γένει",
              prompt: "Why does the dative sg. look like this rather than *γένεσ-ι?",
              answer: "Intervocalic σ dropped, then ε + ι → ει",
              choices: [
                "Intervocalic σ dropped, then ε + ι → ει",
                "It's irregular and unrelated to γένος",
                "It's actually a 2nd-declension form",
                "It's a vocative"
              ] },
            { form: "γένους",
              prompt: "Why does the gen. sg. of γένος look like γένους instead of *γένεσος?",
              answer: "the σ drops between two vowels and then ε + ο → ου (contraction)",
              choices: [
                "the σ drops between two vowels and then ε + ο → ου (contraction)",
                "γένους is an irregular form unrelated to γένος",
                "the gen. sg. ending is -ους in 3rd-decl. neuters by rule",
                "γένους is actually a plural"
              ],
              note: "Same intervocalic-σ-drop logic that gave us the -εω verb future endings in Ch 6." },
            { form: "contracting adjective",
              prompt: "Why does the genitive of ἀληθής, -ές appear as ἀληθοῦς instead of *ἀληθέσος?",
              answer: "σ drops between vowels and ε + ο → ου, exactly like the σ-stem nouns",
              choices: [
                "σ drops between vowels and ε + ο → ου, exactly like the σ-stem nouns",
                "the genitive is suppletive and unrelated",
                "the genitive is identical to the nominative",
                "ἀληθής is indeclinable"
              ] }
          ]
        },
        {
          family: "13.3 πᾶς (All/Every)",
          lemma: "πᾶς, πᾶσα, πᾶν",
          gloss: "every / all",
          questions: [
            { form: "πᾶς formation",
              prompt: "What declension pattern does πᾶς use?",
              answer: "3-1-3 — masc./neut. are 3rd-declension (πᾶς, πᾶν), fem. is 1st-declension (πᾶσα)",
              choices: [
                "3-1-3 — masc./neut. are 3rd-declension (πᾶς, πᾶν), fem. is 1st-declension (πᾶσα)",
                "fully 2-1-2 like καλός",
                "fully 3rd declension throughout",
                "indeclinable"
              ] },
            { form: "πᾶς vs ὁ πᾶς",
              prompt: "How do πᾶς ὁ ἄνθρωπος and ὁ πᾶς ἄνθρωπος typically differ in nuance?",
              answer: "predicate πᾶς = 'every man / all men' (distributive); attributive ὁ πᾶς = 'the whole man / mankind' (collective)",
              choices: [
                "predicate πᾶς = 'every man / all men' (distributive); attributive ὁ πᾶς = 'the whole man / mankind' (collective)",
                "they are interchangeable",
                "ὁ πᾶς is a typo — only πᾶς ὁ exists",
                "πᾶς only means 'every'; ὁ πᾶς only means 'all'"
              ],
              note: "Bare πᾶς + noun is also common: πᾶς ἄνθρωπος = 'every man'." },
            { form: "πάντα",
              prompt: "Parse this form of πᾶς.",
              answer: "could be acc. sg. masc. ('every / all') OR nom./acc. pl. neuter ('all things')",
              choices: [
                "could be acc. sg. masc. ('every / all') OR nom./acc. pl. neuter ('all things')",
                "only acc. sg. masc.",
                "only nom. pl. neuter",
                "only dat. pl."
              ],
              note: "Context decides. πάντα ποιεῖ = 'he does all things'." }
          ]
        },
        {
          family: "13.4 εἷς — One",
          lemma: "εἷς, μία, ἕν",
          gloss: "the number 'one'",
          questions: [
            { form: "εἷς formation",
              prompt: "What declension pattern does εἷς use?",
              answer: "3-1-3 — masc./neut. are 3rd-declension (εἷς, ἕν), fem. is 1st-declension (μία)",
              choices: [
                "3-1-3 — masc./neut. are 3rd-declension (εἷς, ἕν), fem. is 1st-declension (μία)",
                "fully 2-1-2 like καλός",
                "indeclinable — used for all genders",
                "uses 2nd-decl endings throughout"
              ] },
            { form: "εἷς, μία, ἕν",
              prompt: "Translate.",
              answer: "'one' — the cardinal number, declined like an adjective",
              choices: [
                "'one' — the cardinal number, declined like an adjective",
                "'first' — ordinal number",
                "'a, an' — indefinite article (Greek has no indefinite article)",
                "'this' — demonstrative"
              ],
              note: "Singular only (you can't have plural 'ones')." },
            { form: "εἷς vs εἰς",
              prompt: "How do you distinguish εἷς ('one') from εἰς ('into')?",
              answer: "the rough breathing and accent on εἷς; εἰς is unaccented and smooth-breathing",
              choices: [
                "the rough breathing and accent on εἷς; εἰς is unaccented and smooth-breathing",
                "they are the same word and context decides",
                "εἷς is plural; εἰς is singular",
                "one is a noun, the other a verb"
              ] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "14": {
      label: "Chapter 14 Grammar",
      notes: "Participles — formation, declension, meaning (aspect/voice/relative time), and uses",
      items: [
        {
          family: "14.1 Formation",
          lemma: "participle formation",
          gloss: "stems and markers",
          questions: [
            { form: "present active participle marker",
              prompt: "What is the participial marker for the present ACTIVE participle?",
              answer: "-ντ- (added to the stem before the case ending; e.g., λυ-ο-ντ → λύων, λύοντος)",
              choices: [
                "-ντ- (added to the stem before the case ending; e.g., λυ-ο-ντ → λύων, λύοντος)",
                "-μεν- (used for middle/passive)",
                "-θη- (aorist passive)",
                "no marker — the participle is just the stem"
              ] },
            { form: "present middle/passive participle marker",
              prompt: "What is the participial marker for the present MIDDLE/PASSIVE participle?",
              answer: "-μεν- (e.g., λυ-ο-μεν-ος → λυόμενος, -η, -ον)",
              choices: [
                "-μεν- (e.g., λυ-ο-μεν-ος → λυόμενος, -η, -ον)",
                "-ντ-",
                "-θη-",
                "-σα-"
              ] },
            { form: "aorist active participle marker",
              prompt: "What is the participial marker for the AORIST ACTIVE participle (1st aor.)?",
              answer: "-σαντ- (with no augment; e.g., λύ-σαντ → λύσας, λύσαντος)",
              choices: [
                "-σαντ- (with no augment; e.g., λύ-σαντ → λύσας, λύσαντος)",
                "ε- (augment) + -σαντ-",
                "-μεν- (middle marker)",
                "-θεντ- (aorist passive)"
              ],
              note: "NO AUGMENT on the participle — augment is for indicative only. Same for subjunctive, infinitive." }
          ]
        },
        {
          family: "14.2 Declension",
          lemma: "participle declension",
          gloss: "which endings each takes",
          questions: [
            { form: "active masc/neut decl.",
              prompt: "What declension do active and aorist-passive participles use in the masculine and neuter?",
              answer: "3rd declension (on the -ντ- or -θεντ- stem)",
              choices: [
                "3rd declension (on the -ντ- or -θεντ- stem)",
                "2nd declension throughout",
                "1st declension throughout",
                "indeclinable"
              ] },
            { form: "active fem decl.",
              prompt: "What declension do active and aorist-passive participles use in the feminine?",
              answer: "1st declension — using -ουσα / -σασα / -θεῖσα",
              choices: [
                "1st declension — using -ουσα / -σασα / -θεῖσα",
                "3rd declension like the masc.",
                "2nd declension",
                "indeclinable"
              ],
              note: "So active participles are 3-1-3, exactly like πᾶς." },
            { form: "middle/passive decl.",
              prompt: "What declension do middle/passive participles use?",
              answer: "2-1-2 throughout (λυόμενος, λυομένη, λυόμενον — like any regular 2-1-2 adjective)",
              choices: [
                "2-1-2 throughout (λυόμενος, λυομένη, λυόμενον — like any regular 2-1-2 adjective)",
                "3-1-3 like the active",
                "1st declension throughout",
                "3rd declension throughout"
              ],
              note: "The -μεν- marker turns the participle into a regular 2-1-2 adjective." }
          ]
        },
        {
          family: "14.3 Meaning",
          lemma: "participle aspect, voice, relative time",
          gloss: "what a participle tense conveys",
          questions: [
            { form: "participle time",
              prompt: "Within a clause, what does a participle's tense primarily encode?",
              answer: "aspect — with time, when relevant, relative to the main verb",
              choices: [
                "aspect — with time, when relevant, relative to the main verb",
                "absolute past, present, or future time",
                "mood",
                "person and number"
              ],
              note: "Present participle = action simultaneous with the main verb; aorist participle = action prior to it." },
            { form: "λύων (when?)",
              prompt: "If the main verb is past, when does the action of a PRESENT participle (e.g., λύων) typically occur?",
              answer: "simultaneously with the main verb ('while untying')",
              choices: [
                "simultaneously with the main verb ('while untying')",
                "before the main verb",
                "after the main verb",
                "always in present time, regardless of main verb"
              ] },
            { form: "λύσας (when?)",
              prompt: "If the main verb is past, when does the action of an AORIST participle (e.g., λύσας) typically occur?",
              answer: "before the main verb ('after untying')",
              choices: [
                "before the main verb ('after untying')",
                "simultaneously with the main verb",
                "after the main verb",
                "always in the present"
              ],
              note: "Aorist participle = prior action; present participle = simultaneous action. The participle's tense is relative, not absolute." },
            { form: "voice in participles",
              prompt: "How is voice signalled on a participle?",
              answer: "by its stem/marker: active (-ντ-), middle/passive (-μεν-), aorist passive (-θεντ-)",
              choices: [
                "by its stem/marker: active (-ντ-), middle/passive (-μεν-), aorist passive (-θεντ-)",
                "by its case ending",
                "by its accent",
                "voice cannot be told from a participle"
              ] }
          ]
        },
        {
          family: "14.4 Other Uses",
          lemma: "participle in context",
          gloss: "attributive / adverbial / substantive / periphrastic",
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
              note: "Genitive absolute: a participle + noun, both genitive, grammatically detached from the main clause. Returns in Ch 20.2." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "15": {
      label: "Chapter 15 Grammar",
      notes: "The passive and voices — idea of the passive, all three voices, distinguishing passive tenses, meaning of the passive, passive endings, the middle, and passive deponents",
      items: [
        {
          family: "15.1 The Idea of the Passive",
          lemma: "passive voice",
          gloss: "the subject is acted upon",
          questions: [
            { form: "passive",
              prompt: "What does the passive voice express?",
              answer: "the subject is acted upon",
              choices: [
                "the subject is acted upon",
                "the subject performs the action",
                "the subject acts on itself",
                "no subject is implied"
              ] },
            { form: "active vs passive",
              prompt: "How does 'ὁ κύριος λύει τὸν δοῦλον' differ from 'ὁ δοῦλος λύεται ὑπὸ τοῦ κυρίου'?",
              answer: "active: 'the master unties the slave'; passive: 'the slave is untied by the master' — same event, different subject focus",
              choices: [
                "active: 'the master unties the slave'; passive: 'the slave is untied by the master' — same event, different subject focus",
                "they mean entirely different things",
                "only the passive describes a real event",
                "they differ in tense, not in voice"
              ] },
            { form: "why a passive",
              prompt: "Why does Greek (and English) bother with a passive voice?",
              answer: "to bring the patient (the thing affected) to the subject position when that's what the speaker wants to focus on",
              choices: [
                "to bring the patient (the thing affected) to the subject position when that's what the speaker wants to focus on",
                "because the passive can express things the active cannot",
                "passive is grammatically required after certain verbs",
                "passive is purely decorative"
              ] }
          ]
        },
        {
          family: "15.2 Voices",
          lemma: "active / middle / passive",
          gloss: "the three voices",
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
            { form: "voices count",
              prompt: "How many voices does Greek have?",
              answer: "three — active, middle, passive (though the middle and passive share endings outside the aorist and future)",
              choices: [
                "three — active, middle, passive (though the middle and passive share endings outside the aorist and future)",
                "two — active and passive only",
                "four — active, middle, passive, deponent",
                "one — only active"
              ] }
          ]
        },
        {
          family: "15.3 Distinguishing the (Passive) Tenses",
          lemma: "passive tenses",
          gloss: "spotting passive forms",
          questions: [
            { form: "present/imperfect passive",
              prompt: "In the present and imperfect, what tells you a form is passive (rather than middle)?",
              answer: "nothing in the form itself — present/imperfect middle and passive share the same endings; context decides",
              choices: [
                "nothing in the form itself — present/imperfect middle and passive share the same endings; context decides",
                "a θη in the middle of the form",
                "an extra σ before the endings",
                "the augment becomes η-, not ε-"
              ] },
            { form: "aorist passive",
              prompt: "What feature distinguishes the AORIST PASSIVE from the aorist middle and active?",
              answer: "the θη morpheme between the stem and the personal endings (with ACTIVE endings, not middle)",
              choices: [
                "the θη morpheme between the stem and the personal endings (with ACTIVE endings, not middle)",
                "the σα morpheme like the 1st aorist active",
                "the middle endings -μαι, -σαι, -ται",
                "nothing — context is the only clue"
              ],
              note: "ἐ-λύ-θη-ν. The aorist passive uses ACTIVE-style secondary endings on the θη stem." },
            { form: "future passive",
              prompt: "What feature distinguishes the FUTURE PASSIVE from the future middle?",
              answer: "the θη morpheme plus a σ, then middle/passive endings: -θησ-ομαι, -θησ-ῃ, -θησ-εται…",
              choices: [
                "the θη morpheme plus a σ, then middle/passive endings: -θησ-ομαι, -θησ-ῃ, -θησ-εται…",
                "nothing — future middle and passive are identical",
                "the σ alone — future middle has no σ",
                "an augment ε- on the future"
              ] }
          ]
        },
        {
          family: "15.4 The Meaning of the Passive",
          lemma: "agent / instrument",
          gloss: "expressing the doer of a passive verb",
          questions: [
            { form: "agent",
              prompt: "How is the personal agent of a passive verb most often expressed?",
              answer: "ὑπό + genitive",
              choices: ["ὑπό + genitive", "ἐν + dative", "διά + accusative", "πρός + accusative"] },
            { form: "instrument",
              prompt: "How is an IMPERSONAL instrument expressed with a passive verb?",
              answer: "the bare dative — or ἐν + dat. (the 'instrumental dative')",
              choices: [
                "the bare dative — or ἐν + dat. (the 'instrumental dative')",
                "always ὑπό + gen.",
                "the bare accusative",
                "διά + acc."
              ],
              note: "Same logic introduced in Ch 4.3 — personal agent vs impersonal instrument." },
            { form: "ἐλύθη ὑπὸ τοῦ ἀποστόλου",
              prompt: "Translate.",
              answer: "'He / she / it was untied BY the apostle' — ὑπό + gen. = personal agent",
              choices: [
                "'He / she / it was untied BY the apostle' — ὑπό + gen. = personal agent",
                "'He / she / it was untied UNDER the apostle' (locative)",
                "'He / she / it untied the apostle' (active)",
                "'He / she / it untied for himself the apostle' (middle)"
              ] }
          ]
        },
        {
          family: "15.5 The Passive Endings",
          lemma: "-μαι / -θην",
          gloss: "present/imperf vs aorist endings",
          questions: [
            { form: "present m/p endings",
              prompt: "Which endings does the present middle/passive use?",
              answer: "-μαι, -σαι (→ -ῃ), -ται, -μεθα, -σθε, -νται (primary middle endings)",
              choices: [
                "-μαι, -σαι (→ -ῃ), -ται, -μεθα, -σθε, -νται (primary middle endings)",
                "-ω, -εις, -ει, -ομεν, -ετε, -ουσι (active endings)",
                "-ν, -ς, _, -μεν, -τε, -σαν (secondary active)",
                "-θην, -θης, -θη, -θημεν, -θητε, -θησαν (aorist passive)"
              ] },
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
              note: "Future passive is built on the aorist passive stem + σ + middle endings." }
          ]
        },
        {
          family: "15.6 Understanding the Middle",
          lemma: "middle voice",
          gloss: "subject involved in own action",
          questions: [
            { form: "middle force",
              prompt: "What does the middle voice typically add over a plain active?",
              answer: "the subject's PERSONAL INTEREST in the action — acting for, on, or to one's own benefit",
              choices: [
                "the subject's PERSONAL INTEREST in the action — acting for, on, or to one's own benefit",
                "nothing — middle = active in meaning, always",
                "the subject acts on something else, like active",
                "the subject is acted upon, like passive"
              ] },
            { form: "λούω vs λούομαι",
              prompt: "How does the middle λούομαι ('I wash myself / bathe') differ from active λούω ('I wash [someone]')?",
              answer: "middle has the subject act ON ITSELF — reflexive-flavoured",
              choices: [
                "middle has the subject act ON ITSELF — reflexive-flavoured",
                "they mean the same",
                "middle = passive ('I am being washed')",
                "middle has no object — it can only be intransitive"
              ] },
            { form: "middle vs passive",
              prompt: "In present/imperfect forms (e.g., λύεται), how do you tell middle from passive?",
              answer: "by context — the forms are identical; presence of ὑπό + gen. usually signals passive",
              choices: [
                "by context — the forms are identical; presence of ὑπό + gen. usually signals passive",
                "they have different endings in Greek",
                "middle always has an accent on the ultima",
                "passive always has an augment, middle doesn't"
              ] }
          ]
        },
        {
          family: "15.7 Passive Deponents",
          lemma: "ἀποκρίνομαι, φοβέομαι",
          gloss: "deponents that use θη forms in the aorist",
          questions: [
            { form: "passive deponent",
              prompt: "What is a 'passive deponent'?",
              answer: "a deponent verb whose AORIST uses θη forms (passive morphology) instead of regular middle σ-aorist",
              choices: [
                "a deponent verb whose AORIST uses θη forms (passive morphology) instead of regular middle σ-aorist",
                "a verb that has lost its passive forms",
                "any verb with a θ in its stem",
                "any verb that takes a dative object"
              ],
              note: "Translation is still active in English." },
            { form: "ἀπεκρίθη",
              prompt: "Parse this common NT form.",
              answer: "aorist passive indicative, 3rd sg. of ἀποκρίνομαι ('he answered')",
              choices: [
                "aorist passive indicative, 3rd sg. of ἀποκρίνομαι ('he answered')",
                "aorist active indicative, 3rd sg.",
                "imperfect middle/passive indicative, 3rd sg.",
                "future passive indicative, 3rd sg."
              ],
              note: "ἀπο- + ε-augment + κριθ + ending. ἀποκρίνομαι is deponent in form but uses θη-style aorists ('passive deponents')." },
            { form: "ἐφοβήθη",
              prompt: "Parse this form (φοβέομαι).",
              answer: "aorist passive indicative, 3rd sg. of φοβέομαι — 'he/she/it was afraid'",
              choices: [
                "aorist passive indicative, 3rd sg. of φοβέομαι — 'he/she/it was afraid'",
                "imperfect middle indicative, 3rd sg.",
                "aorist active indicative, 3rd sg.",
                "future passive indicative, 3rd sg."
              ],
              note: "Translated actively ('he feared'); morphologically θη-form (passive deponent)." }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "16": {
      label: "Chapter 16 Grammar",
      notes: "The perfect — idea (state from completed action), form (reduplication + κ), more on meaning, and the pluperfect",
      items: [
        {
          family: "16.1 The Idea of the Perfect",
          lemma: "perfect aspect",
          gloss: "completed action, continuing state",
          questions: [
            { form: "perfect aspect (idea)",
              prompt: "What is the basic aspectual idea of the Greek perfect?",
              answer: "a completed action whose result/state persists into the present",
              choices: [
                "a completed action whose result/state persists into the present",
                "a one-off past event with no present relevance (aorist)",
                "an action in progress (present/imperfect)",
                "an action that will happen later (future)"
              ] },
            { form: "perfect vs aorist (idea)",
              prompt: "What is the key contrast between the perfect and the aorist, conceptually?",
              answer: "aorist = the event simply HAPPENED; perfect = the event happened AND the result still stands",
              choices: [
                "aorist = the event simply HAPPENED; perfect = the event happened AND the result still stands",
                "aorist = past, perfect = future",
                "aorist = ongoing, perfect = simple",
                "they are interchangeable"
              ],
              note: "English 'I have done' often catches the perfect well, but it's not a perfect equivalent." },
            { form: "English perfect translation",
              prompt: "What's a common English rendering of a Greek perfect?",
              answer: "'I have ___' or 'I ___' as a present state ('I stand', 'it is written')",
              choices: [
                "'I have ___' or 'I ___' as a present state ('I stand', 'it is written')",
                "'I am ___ing'",
                "'I shall ___'",
                "'I would have ___ed'"
              ] }
          ]
        },
        {
          family: "16.2 The Form of the Perfect",
          lemma: "perfect stem formation",
          gloss: "reduplication + κ + α-endings",
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
          family: "16.3 More on the Meaning of the Perfect",
          lemma: "perfect in context",
          gloss: "translation choices",
          questions: [
            { form: "γέγραπται",
              prompt: "Best translation of γέγραπται in 'γέγραπται γάρ'?",
              answer: "'it stands written' / 'it is written'",
              choices: [
                "'it stands written' / 'it is written'",
                "'someone wrote'",
                "'they will write'",
                "'while writing'"
              ] },
            { form: "τετέλεσται",
              prompt: "Best translation in 'τετέλεσται' (John 19:30)?",
              answer: "'it is finished' (perfect: the work is complete and its results endure)",
              choices: [
                "'it is finished' (perfect: the work is complete and its results endure)",
                "'he finishes' (present)",
                "'he finished' (aorist)",
                "'he will finish' (future)"
              ],
              note: "Perfect middle/passive 3rd sg. of τελέω." },
            { form: "perfect with present force",
              prompt: "Why do some perfect-tense verbs (e.g., οἶδα) translate as straight presents?",
              answer: "their resulting state IS the present-time meaning — οἶδα ('I know') = 'I have come to know' = 'I know now'",
              choices: [
                "their resulting state IS the present-time meaning — οἶδα ('I know') = 'I have come to know' = 'I know now'",
                "they are mistranslated and really mean 'I have known'",
                "the perfect always = English present",
                "οἶδα is actually a present, not a perfect"
              ],
              note: "ἕστηκα ('I stand') and οἶδα ('I know') are the classic 'present-meaning' perfects." }
          ]
        },
        {
          family: "16.4 The Pluperfect",
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
      notes: "The subjunctive — idea (potential / contingent), formation (long thematic vowel), and uses (purpose, hortatory, prohibition, indefinite)",
      items: [
        {
          family: "17.1 The Idea of the Subjunctive",
          lemma: "subjunctive mood",
          gloss: "contingent, non-factual",
          questions: [
            { form: "subjunctive idea",
              prompt: "What does the subjunctive mood express in general?",
              answer: "a contingent / potential / non-factual action — what MIGHT or SHOULD happen, what is wished or commanded indirectly",
              choices: [
                "a contingent / potential / non-factual action — what MIGHT or SHOULD happen, what is wished or commanded indirectly",
                "a flat statement of fact",
                "a direct command",
                "direct address (vocative)"
              ] },
            { form: "subjunctive time",
              prompt: "What does the TENSE of a subjunctive verb tell you?",
              answer: "aspect only — present subjunctive = ongoing, aorist subjunctive = simple/whole. NO time reference outside the indicative.",
              choices: [
                "aspect only — present subjunctive = ongoing, aorist subjunctive = simple/whole. NO time reference outside the indicative.",
                "absolute past, present, or future time",
                "voice",
                "person and number"
              ] },
            { form: "where it appears",
              prompt: "In what kinds of clauses does the subjunctive most often appear in NT Greek?",
              answer: "subordinate clauses (after ἵνα, ὅπως, ἐάν, ὅταν…) and certain main-clause uses (hortatory, prohibition, deliberative)",
              choices: [
                "subordinate clauses (after ἵνα, ὅπως, ἐάν, ὅταν…) and certain main-clause uses (hortatory, prohibition, deliberative)",
                "only in subordinate clauses",
                "only in main clauses",
                "only after the article"
              ] }
          ]
        },
        {
          family: "17.2 The Formation of the Subjunctive",
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
          family: "17.3 The Uses of the Subjunctive",
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
          family: "17.3 Uses — Indefinite Constructions",
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
      notes: "Using verbs — δύναμαι/κάθημαι/κεῖμαι/οἶδα; infinitives in use; 3rd-person imperatives; principal parts; aspect and time",
      items: [
        {
          family: "18.1 δύναμαι, κάθημαι, κεῖμαι and οἶδα",
          lemma: "δύναμαι / οἶδα",
          gloss: "irregular middle/perfect-with-present verbs",
          questions: [
            { form: "δύναμαι",
              prompt: "What does δύναμαι mean, and what is unusual about its form?",
              answer: "'I am able' — a middle-form verb that takes a complementary infinitive (e.g., δύναμαι λύειν = 'I am able to loose')",
              choices: [
                "'I am able' — a middle-form verb that takes a complementary infinitive (e.g., δύναμαι λύειν = 'I am able to loose')",
                "'I give' — active",
                "'I see' — active",
                "'I have' — active"
              ],
              note: "Conjugates with athematic middle/passive endings on a -μι-style stem." },
            { form: "οἶδα",
              prompt: "What is unusual about οἶδα ('I know')?",
              answer: "it is morphologically a PERFECT but functions as a PRESENT in meaning — 'I have come to know' = 'I know'",
              choices: [
                "it is morphologically a PERFECT but functions as a PRESENT in meaning — 'I have come to know' = 'I know'",
                "it is an irregular aorist",
                "it is a regular present-tense verb",
                "it is indeclinable"
              ] },
            { form: "ᾔδειν",
              prompt: "Parse this form of οἶδα.",
              answer: "pluperfect (used with imperfect / past force) — 'I knew' / 'I had come to know'",
              choices: [
                "pluperfect (used with imperfect / past force) — 'I knew' / 'I had come to know'",
                "future, 1st sg.",
                "present, 1st sg.",
                "aorist, 1st sg."
              ],
              note: "Because οἶδα is a present-meaning perfect, its pluperfect form ᾔδειν has imperfect meaning ('I knew')." },
            { form: "κεῖμαι, κάθημαι",
              prompt: "What semantic field do κεῖμαι and κάθημαι share?",
              answer: "stative posture — 'I lie' / 'I sit' — both are middle-form 'state' verbs",
              choices: [
                "stative posture — 'I lie' / 'I sit' — both are middle-form 'state' verbs",
                "verbs of motion",
                "verbs of speech",
                "transitive action verbs"
              ] }
          ]
        },
        {
          family: "18.2 Use of Infinitives",
          lemma: "infinitive constructions",
          gloss: "beyond simple complementation",
          questions: [
            { form: "complementary infinitive",
              prompt: "In θέλω λύειν, what's the role of the infinitive?",
              answer: "complementary — completing the idea of θέλω: 'I want TO LOOSE'",
              choices: [
                "complementary — completing the idea of θέλω: 'I want TO LOOSE'",
                "purpose — 'in order to loose'",
                "result — 'so as to loose'",
                "imperative — 'loose!'"
              ] },
            { form: "articular infinitive",
              prompt: "What is an 'articular infinitive'?",
              answer: "an infinitive preceded by the neuter article (τό, τοῦ, τῷ) — letting the infinitive be governed like a noun",
              choices: [
                "an infinitive preceded by the neuter article (τό, τοῦ, τῷ) — letting the infinitive be governed like a noun",
                "an infinitive followed by an article",
                "any infinitive used as a noun (no article needed)",
                "an infinitive standing alone as a main verb"
              ],
              note: "διὰ τὸ λέγειν = 'because of the speaking / because he speaks/spoke'." },
            { form: "ὥστε + infinitive",
              prompt: "ὥστε + infinitive expresses…",
              answer: "result — 'so that, with the result that'",
              choices: [
                "result — 'so that, with the result that'",
                "purpose — 'in order that'",
                "cause — 'because'",
                "concession — 'although'"
              ],
              note: "The subject of an ὥστε-infinitive (if expressed) goes in the accusative." },
            { form: "subject of infinitive",
              prompt: "When an infinitive has its own subject (different from the main verb), what case is the subject in?",
              answer: "accusative — 'accusative subject of the infinitive'",
              choices: [
                "accusative — 'accusative subject of the infinitive'",
                "nominative — same case as a finite verb's subject",
                "dative — like an indirect object",
                "genitive — like possession"
              ],
              note: "ὥστε αὐτὸν λέγειν = 'so that he speaks' — αὐτόν is acc. subject of the infinitive." }
          ]
        },
        {
          family: "18.3 Third-Person Imperatives",
          lemma: "λυέτω, λυέτωσαν",
          gloss: "'let him untie!'",
          questions: [
            { form: "λυέτω",
              prompt: "Parse this form and translate.",
              answer: "present active imperative, 3rd sg. — 'let him/her untie!'",
              choices: [
                "present active imperative, 3rd sg. — 'let him/her untie!'",
                "present active indicative, 3rd sg. — 'he unties'",
                "imperfect active indicative, 3rd sg.",
                "future active indicative, 3rd sg."
              ],
              note: "Ending -τω is the 3rd-singular imperative marker. English uses 'let him X' to capture this." },
            { form: "λυέτωσαν",
              prompt: "Parse this form and translate.",
              answer: "present active imperative, 3rd pl. — 'let them untie!'",
              choices: [
                "present active imperative, 3rd pl. — 'let them untie!'",
                "present active indicative, 3rd pl.",
                "imperfect active indicative, 3rd pl.",
                "aorist active indicative, 3rd pl."
              ],
              note: "3rd-plural imperative ending -τωσαν." },
            { form: "ἁγιασθήτω",
              prompt: "Identify this famous form (Matt 6:9).",
              answer: "aorist passive imperative, 3rd sg. — 'let (it) be hallowed / made holy!'",
              choices: [
                "aorist passive imperative, 3rd sg. — 'let (it) be hallowed / made holy!'",
                "future passive indicative, 3rd sg.",
                "present passive imperative, 3rd sg.",
                "aorist passive indicative, 3rd sg."
              ],
              note: "Lord's Prayer: ἁγιασθήτω τὸ ὄνομά σου = 'hallowed be Thy name'." }
          ]
        },
        {
          family: "18.4 Principal Parts",
          lemma: "principal parts of a verb",
          gloss: "the six stems that generate everything",
          questions: [
            { form: "what they are",
              prompt: "What are the SIX principal parts of a Greek verb?",
              answer: "1. pres. act., 2. fut. act., 3. aor. act., 4. perf. act., 5. perf. mid./pass., 6. aor. passive (all 1st sg. indicative)",
              choices: [
                "1. pres. act., 2. fut. act., 3. aor. act., 4. perf. act., 5. perf. mid./pass., 6. aor. passive (all 1st sg. indicative)",
                "the six personal endings",
                "the six cases",
                "the six moods"
              ] },
            { form: "λύω principal parts",
              prompt: "Which list shows the principal parts of λύω?",
              answer: "λύω, λύσω, ἔλυσα, λέλυκα, λέλυμαι, ἐλύθην",
              choices: [
                "λύω, λύσω, ἔλυσα, λέλυκα, λέλυμαι, ἐλύθην",
                "λύω, ἔλυον, λύσω, ἔλυσα (only four)",
                "λύω, ἔλυσα (only two)",
                "λύω alone — Greek has no principal parts system"
              ],
              note: "Knowing these six forms lets you generate every conjugated form λύω can take." },
            { form: "why memorise",
              prompt: "Why are principal parts especially important for irregular verbs?",
              answer: "because irregular verbs have suppletive / unpredictable stems in some tenses; you can't derive them from the present alone",
              choices: [
                "because irregular verbs have suppletive / unpredictable stems in some tenses; you can't derive them from the present alone",
                "they aren't important — irregulars can be guessed",
                "principal parts only matter for regular verbs",
                "they replace the lexicon entirely"
              ],
              note: "λέγω → εἶπον / εἴρηκα / εἴρημαι / ἐρρέθην — totally suppletive." }
          ]
        },
        {
          family: "18.5 Aspect and Time in Tenses",
          lemma: "aspect vs absolute time",
          gloss: "when tense IS time vs when tense ISN'T",
          questions: [
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
            { form: "command: keep doing X",
              prompt: "Which tense of imperative best matches 'keep on doing X'?",
              answer: "present (imperfective aspect)",
              choices: ["present (imperfective aspect)", "aorist (perfective aspect)", "perfect (stative)", "future indicative"] },
            { form: "command: do X (one decisive act)",
              prompt: "Which tense of imperative typically presents the action as a single whole?",
              answer: "aorist (perfective aspect)",
              choices: ["aorist (perfective aspect)", "present (imperfective aspect)", "perfect (stative)", "future indicative"] },
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
      notes: "Extra verbs — -μι verbs (δίδωμι, τίθημι, ἵστημι, ἀφίημι); α-contract and ο-contract verbs",
      items: [
        {
          family: "19.1 -μι Verbs",
          lemma: "δίδωμι, τίθημι, ἵστημι, ἀφίημι",
          gloss: "athematic conjugation",
          questions: [
            { form: "-μι vs -ω",
              prompt: "What's the difference between -μι verbs and -ω verbs in conjugation?",
              answer: "-μι verbs are ATHEMATIC — they attach the personal endings directly to the stem without a connecting (thematic) vowel ο/ε",
              choices: [
                "-μι verbs are ATHEMATIC — they attach the personal endings directly to the stem without a connecting (thematic) vowel ο/ε",
                "-μι verbs have no aorist; -ω verbs do",
                "-μι verbs are passive-only",
                "they conjugate identically — only spelling differs"
              ],
              note: "Result: -μι forms look 'tighter' (no extra vowel before endings) and often have vowel-grade alternations (διδω-/διδο-)." },
            { form: "δίδωμι reduplication",
              prompt: "How does the PRESENT stem of -μι verbs typically begin?",
              answer: "with a reduplication using ι: δι-δω-, τι-θη-, ἵ-στη- (from σι-στη-)",
              choices: [
                "with a reduplication using ι: δι-δω-, τι-θη-, ἵ-στη- (from σι-στη-)",
                "with an augment ε-",
                "with no prefix — they start with the bare stem",
                "with a different prefix in each tense"
              ],
              note: "Reduplication with ι is the present-stem marker of -μι verbs. Other tenses drop it." },
            { form: "δίδωσι(ν)",
              prompt: "Parse this form.",
              answer: "present active indicative, 3rd sg.",
              choices: [
                "present active indicative, 3rd sg.",
                "present active indicative, 1st sg.",
                "present active subjunctive, 3rd sg.",
                "aorist active indicative, 3rd sg."
              ] },
            { form: "δίδωμι vowel grade",
              prompt: "What's distinctive about the singular stem vs the plural stem in the present indicative of δίδωμι?",
              answer: "the singular has the long vowel (διδω-) and the plural has the short vowel (διδο-)",
              choices: [
                "the singular has the long vowel (διδω-) and the plural has the short vowel (διδο-)",
                "the singular has the short vowel and the plural the long vowel",
                "both share the same vowel grade throughout",
                "only the plural has reduplication"
              ],
              note: "δίδωμι, δίδως, δίδωσι(ν) — long vowel; δίδομεν, δίδοτε, διδόασι(ν) — short vowel." },
            { form: "ἔδωκα",
              prompt: "Parse this form (and note the unusual feature).",
              answer: "aorist active indicative, 1st sg. of δίδωμι — uses a κ-aorist instead of the standard σα-pattern",
              choices: [
                "aorist active indicative, 1st sg. of δίδωμι — uses a κ-aorist instead of the standard σα-pattern",
                "perfect active indicative, 1st sg.",
                "imperfect active indicative, 1st sg.",
                "future active indicative, 1st sg."
              ],
              note: "δίδωμι (and τίθημι, ἀφίημι) use κ-aorists in the singular: ἔδωκα, ἔθηκα, ἀφῆκα." },
            { form: "δέδωκα",
              prompt: "Parse this form.",
              answer: "perfect active indicative, 1st sg. of δίδωμι",
              choices: [
                "perfect active indicative, 1st sg. of δίδωμι",
                "aorist active indicative, 1st sg.",
                "pluperfect active indicative, 1st sg.",
                "present active indicative, 1st sg."
              ],
              note: "Reduplication δε- + δωκ + α = perfect active. (The present-stem ι-reduplication gives way to the standard ε-reduplication in the perfect.)" }
          ]
        },
        {
          family: "19.2 α-Contract and ο-Contract Verbs",
          lemma: "ἀγαπάω, δικαιόω",
          gloss: "the other contract patterns",
          questions: [
            { form: "ἀγαπάω → ἀγαπῶ",
              prompt: "Why does the lexical form ἀγαπάω appear in the text as ἀγαπῶ?",
              answer: "α + ω → ω (with circumflex)",
              choices: [
                "α + ω → ω (with circumflex)",
                "the α drops out before all endings",
                "α changes to ε before the ending",
                "they are different verbs entirely"
              ],
              note: "ἀγαπάω (lexicon) → ἀγαπῶ (running text). Same pattern as -έω verbs but with different vowel rules." },
            { form: "α + ε / α + ει",
              prompt: "What does α + ε (and α + ει) contract to in α-contract verbs?",
              answer: "ᾷ — long α with subscript ι if there was one (e.g., ἀγαπᾷς, ἀγαπᾷ)",
              choices: [
                "ᾷ — long α with subscript ι if there was one (e.g., ἀγαπᾷς, ἀγαπᾷ)",
                "ει",
                "η",
                "ω"
              ],
              note: "Mnemonic: α 'absorbs' the e/ei into a long α." },
            { form: "δικαιόω → δικαιῶ",
              prompt: "Why does the lexical form δικαιόω appear in the text as δικαιῶ?",
              answer: "ο + ω → ω (the long vowel wins; circumflex marks contraction)",
              choices: [
                "ο + ω → ω (the long vowel wins; circumflex marks contraction)",
                "the ο is silent",
                "ο + ω → οω (no contraction)",
                "ο changes to ε before the ending"
              ] },
            { form: "ο + ε / ο + ο",
              prompt: "What does ο + ε (or ο + ο) contract to in ο-contract verbs?",
              answer: "ου (e.g., πληροῦμεν, δικαιοῦμεν)",
              choices: [
                "ου (e.g., πληροῦμεν, δικαιοῦμεν)",
                "ω",
                "οι",
                "ει"
              ],
              note: "Same logic as ε-contract ε + ο → ου, just from the other side." },
            { form: "α + ο",
              prompt: "What does α + ο contract to?",
              answer: "ω (e.g., ἀγαπῶμεν from ἀγαπα-ομεν)",
              choices: ["ω", "ου", "α (long)", "ει"] }
          ]
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────
    "20": {
      label: "Chapter 20 Grammar",
      notes: "Final pieces — conditions (full system); genitive absolute; periphrastics; comparison of adjectives & adverbs; optative",
      items: [
        {
          family: "20.1 Conditions",
          lemma: "εἰ / ἐάν conditional sentences",
          gloss: "the four classes of conditions",
          questions: [
            { form: "1st class condition",
              prompt: "How is a 1st-class condition formed?",
              answer: "εἰ + indicative (protasis) — the speaker treats the protasis as TRUE for the sake of argument",
              choices: [
                "εἰ + indicative (protasis) — the speaker treats the protasis as TRUE for the sake of argument",
                "ἐάν + subjunctive — 'if he should …'",
                "εἰ + past indicative + ἄν in apodosis — contrary to fact",
                "no specific form — only context distinguishes"
              ],
              note: "εἰ υἱὸς εἶ τοῦ θεοῦ … = 'If you ARE the Son of God …' (assumed true for argument)." },
            { form: "2nd class condition",
              prompt: "How is a 2nd-class (contrary-to-fact) condition formed?",
              answer: "εἰ + secondary-tense INDICATIVE in the protasis, ἄν + secondary-tense indicative in the apodosis",
              choices: [
                "εἰ + secondary-tense INDICATIVE in the protasis, ἄν + secondary-tense indicative in the apodosis",
                "εἰ + subjunctive in the protasis",
                "ἐάν + subjunctive in the protasis",
                "no specific form — only context distinguishes"
              ],
              note: "'If you WERE (but you're not), you WOULD ___': εἰ ἤμην … ἄν ἤμην …" },
            { form: "3rd class condition",
              prompt: "How is a 3rd-class (future-more-vivid / general) condition formed?",
              answer: "ἐάν + subjunctive (protasis), future or other indicative (apodosis)",
              choices: [
                "ἐάν + subjunctive (protasis), future or other indicative (apodosis)",
                "εἰ + indicative — 1st class",
                "εἴθε + optative — 4th class",
                "no specific form"
              ],
              note: "'If he should ___, he will ___' / 'Whenever he ___s, he ___s'." },
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
        },
        {
          family: "20.2 The Genitive Absolute",
          lemma: "noun + participle, both gen.",
          gloss: "detached adverbial clause",
          questions: [
            { form: "genitive absolute",
              prompt: "What is the basic structure of a genitive absolute?",
              answer: "a noun/pronoun + a participle, BOTH in the genitive, grammatically detached from the main clause",
              choices: [
                "a noun/pronoun + a participle, BOTH in the genitive, grammatically detached from the main clause",
                "a noun in the genitive with NO participle",
                "a participle alone in the genitive",
                "a finite verb in the genitive"
              ] },
            { form: "λύσαντος τοῦ ἀνθρώπου τὸν δοῦλον, ἀπῆλθον.",
              prompt: "What construction is λύσαντος τοῦ ἀνθρώπου?",
              answer: "genitive absolute",
              choices: [
                "genitive absolute",
                "attributive participle",
                "substantive participle",
                "second aorist indicative"
              ] },
            { form: "gen-abs translation",
              prompt: "How is a genitive absolute typically translated?",
              answer: "as an English adverbial clause: 'when / while / after / since (etc.) X did Y'",
              choices: [
                "as an English adverbial clause: 'when / while / after / since (etc.) X did Y'",
                "as a possessive phrase: 'X's Y'",
                "as a main clause with X and Y as subject and verb",
                "as a relative clause: 'X who does Y'"
              ],
              note: "Choose the adverbial flavour (time, cause, concession…) that fits the context — Greek often leaves it open." },
            { form: "why genitive?",
              prompt: "Why is the case GENITIVE in a 'genitive absolute' (rather than nominative)?",
              answer: "because the participle's subject is NOT the subject of the main clause — the genitive marks its grammatical separateness",
              choices: [
                "because the participle's subject is NOT the subject of the main clause — the genitive marks its grammatical separateness",
                "because participles always agree with a genitive",
                "because it expresses possession of the main verb",
                "no real reason — convention only"
              ],
              note: "If the participle's subject IS the main clause's subject, you use a normal circumstantial participle (in the same case), NOT a genitive absolute." }
          ]
        },
        {
          family: "20.3 Periphrastics",
          lemma: "εἰμί + participle",
          gloss: "compound tense forms",
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
            { form: "periphrastic logic",
              prompt: "Periphrastic forms combine which two elements?",
              answer: "a form of εἰμί + a participle of the lexical verb",
              choices: [
                "a form of εἰμί + a participle of the lexical verb",
                "an augmented stem + the perfect ending",
                "a relative pronoun + an infinitive",
                "two finite indicative verbs joined by καί"
              ] },
            { form: "why periphrastic",
              prompt: "What does a periphrastic typically emphasise vs the plain finite form?",
              answer: "the aspect (ongoing / stative) of the participle — often more vividly than the plain finite form",
              choices: [
                "the aspect (ongoing / stative) of the participle — often more vividly than the plain finite form",
                "the time (always future)",
                "the voice (always passive)",
                "nothing — they are stylistic variants only"
              ] }
          ]
        },
        {
          family: "20.4 Comparison and Formation of Adjectives and Adverbs",
          lemma: "-τερος / -τατος / μᾶλλον",
          gloss: "comparative and superlative",
          questions: [
            { form: "comparative suffix",
              prompt: "Which suffix forms a regular comparative adjective ('more X')?",
              answer: "-τερος, -τέρα, -τερον (e.g., νεώτερος 'younger')",
              choices: [
                "-τερος, -τέρα, -τερον (e.g., νεώτερος 'younger')",
                "-τατος, -τάτη, -τατον",
                "-ως",
                "no suffix — comparison uses μᾶλλον alone"
              ] },
            { form: "superlative suffix",
              prompt: "Which suffix forms a regular superlative adjective ('most X')?",
              answer: "-τατος, -τάτη, -τατον (e.g., νεώτατος 'youngest')",
              choices: [
                "-τατος, -τάτη, -τατον (e.g., νεώτατος 'youngest')",
                "-τερος, -τέρα, -τερον",
                "-ως",
                "no suffix — comparison uses μάλιστα alone"
              ] },
            { form: "object of comparison",
              prompt: "How does Greek typically express 'than X' after a comparative?",
              answer: "either ἤ + same case as the first item, OR a bare genitive of comparison",
              choices: [
                "either ἤ + same case as the first item, OR a bare genitive of comparison",
                "always ἀπό + gen.",
                "always ἐκ + gen.",
                "Greek has no way to express 'than'"
              ],
              note: "μείζων Ἰωάννου = 'greater than John' (gen. of comparison)." },
            { form: "irregular comparison",
              prompt: "How do common irregular adjectives compare (e.g., μέγας, ἀγαθός)?",
              answer: "with suppletive stems: μέγας → μείζων, μέγιστος; ἀγαθός → κρείσσων, ἄριστος / κράτιστος",
              choices: [
                "with suppletive stems: μέγας → μείζων, μέγιστος; ἀγαθός → κρείσσων, ἄριστος / κράτιστος",
                "with the regular -τερος / -τατος suffixes throughout",
                "they don't compare — only adverbs do",
                "by adding μᾶλλον alone, with no stem change"
              ] },
            { form: "adverb formation",
              prompt: "How is an adverb typically formed from an adjective?",
              answer: "replace the genitive plural -ων ending with -ως (e.g., καλός → καλῶς 'well')",
              choices: [
                "replace the genitive plural -ων ending with -ως (e.g., καλός → καλῶς 'well')",
                "add -τατος to the stem",
                "add the article + the adjective",
                "adverbs are unrelated to adjectives in Greek"
              ] }
          ]
        },
        {
          family: "20.5 The Optative",
          lemma: "optative mood",
          gloss: "wish / potential (rare in NT)",
          questions: [
            { form: "optative use",
              prompt: "What is the most common NT use of the optative?",
              answer: "a wish — especially μὴ γένοιτο ('may it not be! / God forbid!')",
              choices: [
                "a wish — especially μὴ γένοιτο ('may it not be! / God forbid!')",
                "a flat statement of fact",
                "a direct command",
                "a strict logical inference"
              ],
              note: "Paul uses μὴ γένοιτο 15× in Romans / Galatians for emphatic denial." },
            { form: "optative form marker",
              prompt: "What morphological feature signals the optative?",
              answer: "an -ι- (or -οι-, -αι-) attached to the stem before the personal ending",
              choices: [
                "an -ι- (or -οι-, -αι-) attached to the stem before the personal ending",
                "an -η- (subjunctive)",
                "the augment ε-",
                "reduplication"
              ],
              note: "λύοιμι, λύοις, λύοι, λύοιμεν, λύοιτε, λύοιεν — present optative of λύω." },
            { form: "optative rarity",
              prompt: "How common is the optative in the NT compared with classical Greek?",
              answer: "much rarer — only ~67× in the NT, and largely confined to set phrases or Lukan style",
              choices: [
                "much rarer — only ~67× in the NT, and largely confined to set phrases or Lukan style",
                "more common in the NT than the subjunctive",
                "equally common in both",
                "not attested in the NT at all"
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
