// Auto-generates parsing-quiz morphology sets from paradigm vocab cards.
// Runs after every W*_<paradigm> vocab set has been registered, then mirrors
// each card as a {form, answer} pair so the supplemental selector exposes a
// "Morphology" sub-quiz alongside the vocab cards.
(function () {
  if (typeof window.registerSupplementalMorphologySet !== 'function') return;

  const PARSING_KEYWORDS = /(?:\bNom\.?\b|\bGen\.?\b|\bDat\.?\b|\bAcc\.?\b|\bVoc\.?\b|\bsg\.?\b|\bpl\.?\b|\bsingular\b|\bplural\b|\bperson\b|\bmasc(?:uline)?\b|\bfem(?:inine)?\b|\bneut(?:er)?\b|\bnominative\b|\bgenitive\b|\bdative\b|\baccusative\b|\bvocative\b|\bPresent\b|\bFuture\b|\bImperfect\b|\bAorist\b|\bPerfect\b|\bPluperfect\b|\bpresent\b|\bfuture\b|\bimperfect\b|\baorist\b|\bperfect\b|\bpluperfect\b|\bactive\b|\bmiddle\b|\bpassive\b|\bindicative\b|\bsubjunctive\b|\bimperative\b|\binfinitive\b|\bparticiple\b|\b1st\b|\b2nd\b|\b3rd\b|\bTime\b|\bPlace\b|\bManner\b|\bReason\b|\bIndefinite construction\b|\bSimple relative\b)/i;

  const TENSE_PREFIX_REGEX = /^(1st Aorist [A-Za-z]+|2nd Aorist [A-Za-z]+|Aorist Passive|Present|Future|Imperfect|Aorist|Perfect|Pluperfect)\s*:\s*/;

  // Lowercases and reorders parsing components so every answer follows the
  // same shape: [qualifier|tense] [voice] [mood] [person] [case] [number] [gender]
  // matching the canonical format used by the chapter morphology sets.
  //
  // No mood/voice defaults here — they're applied at runtime in
  // buildMorphSteps based on the student's chapter scope. Defaulting at
  // canonicalization time would force the Mood step to appear even in
  // early chapters where the student hasn't been introduced to other
  // moods, making "pick indicative" a no-info step.
  function canonicalizePart(text) {
    if (!text) return '';
    let t = String(text).toLowerCase();
    t = t
      .replace(/\b1st\b/g, 'first')
      .replace(/\b2nd\b/g, 'second')
      .replace(/\b3rd\b/g, 'third')
      .replace(/\bsg\./g, 'singular')
      .replace(/\bpl\./g, 'plural')
      .replace(/\bnom\./g, 'nominative')
      .replace(/\bacc\./g, 'accusative')
      .replace(/\bgen\./g, 'genitive')
      .replace(/\bdat\./g, 'dative')
      .replace(/\bvoc\./g, 'vocative')
      .replace(/\bmasc\./g, 'masculine')
      .replace(/\bfem\./g, 'feminine')
      .replace(/\bneut\./g, 'neuter')
      .replace(/,/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const find = (re) => {
      const m = t.match(re);
      return m ? m[0].trim() : '';
    };

    const qualifier = find(/\b(first aorist|second aorist)\b/);
    const tense = find(/\b(present|future|imperfect|aorist|perfect|pluperfect)\b/);
    const voice = find(/\b(middle\/passive|middle or passive|active|middle|passive)\b/);
    const mood = find(/\b(indicative|subjunctive|imperative|infinitive|participle)\b/);
    const person = find(/\b(first|second|third) person\b/);
    const number = find(/\b(singular|plural)\b/);
    const casePart = find(/\b(nominative|accusative|genitive|dative|vocative)(?:\/(?:nominative|accusative|genitive|dative|vocative))*\b/);
    const genderPart = find(/\b(masculine|feminine|neuter)(?:\/(?:masculine|feminine|neuter))*\b/);

    const out = [];
    if (qualifier) out.push(qualifier);
    else if (tense) out.push(tense);
    if (voice) out.push(voice);
    if (mood) out.push(mood);
    if (person) out.push(person);
    if (casePart) out.push(casePart);
    if (number) out.push(number);
    if (genderPart) out.push(genderPart);

    const canonical = out.join(' ').trim();
    return canonical || t;
  }

  function canonicalizeAnswer(answer) {
    if (!answer) return '';
    return String(answer)
      .split(/\s*;\s*/)
      .map(canonicalizePart)
      .filter(Boolean)
      .join('; ');
  }

  function extractParsing(eText) {
    if (!eText) return null;
    const text = String(eText).trim();
    if (!text) return null;

    const parens = [...text.matchAll(/\(([^)]+)\)/g)].map((m) => m[1].trim());
    // A parenthetical may bundle parsing with phonology (e.g. "1st sg.;
    // φιλ ε + ω → φιλῶ"). Split on ';' and keep only the parsing chunks.
    const parsingParens = parens
      .flatMap((p) => p.split(';').map((s) => s.trim()))
      .filter((p) => p && PARSING_KEYWORDS.test(p) && !/[→+]/.test(p));

    if (parsingParens.length > 0) {
      const tenseMatch = text.match(TENSE_PREFIX_REGEX);
      const tensePrefix = tenseMatch ? tenseMatch[1] : null;
      const joined = parsingParens.join('; ');
      return tensePrefix ? `${tensePrefix}, ${joined}` : joined;
    }

    if (parens.length === 0 && PARSING_KEYWORDS.test(text)) {
      return text;
    }

    return null;
  }

  function extractLemma(label) {
    const text = String(label || '').trim();
    if (!text) return '';
    const dash = text.match(/^([^—]+?)\s*—/);
    if (dash) return dash[1].trim();
    return text;
  }

  // Strips the parsing parenthetical and any leading tense label so we keep
  // just the case-appropriate English meaning of the form (e.g.
  // "of the beginning" for the genitive of ἀρχή).
  function extractCardGloss(card) {
    if (!card || !card.e) return '';
    let gloss = String(card.e).replace(/\s*\([^)]*\)\s*/g, ' ').trim();
    gloss = gloss
      .replace(/^(Present|Future|Imperfect|Aorist|Perfect|Pluperfect|1st [Aa]orist|2nd [Aa]orist)\s*:\s*/i, '')
      .trim();
    return gloss;
  }

  // Item-level fallback: pick the first card's gloss as the lemma's general
  // meaning, used when a particular question has no per-form gloss.
  function extractLemmaGloss(set) {
    if (!Array.isArray(set.cards)) return '';
    for (const card of set.cards) {
      if (!card || !card.g) continue;
      if (/[→]/.test(String(card.g).trim())) continue;
      const gloss = extractCardGloss(card);
      if (gloss) return gloss;
    }
    return '';
  }

  function buildMorphologyForSet(key, set) {
    if (!set || !Array.isArray(set.cards) || set.cards.length === 0) return null;

    const seenForms = new Set();
    const questions = [];
    set.cards.forEach((card) => {
      const form = String(card && card.g ? card.g : '').trim();
      if (!form || seenForms.has(form)) return;
      // Stem-pair entries like "βάλλω → ἔβαλον" are study notes, not parseable
      // single forms — skip them so the quiz prompts a real Greek form.
      if (/[→]/.test(form)) return;
      const rawAnswer = extractParsing(card.e);
      if (!rawAnswer) return;
      const answer = canonicalizeAnswer(rawAnswer);
      if (!answer) return;
      const gloss = extractCardGloss(card);
      seenForms.add(form);
      questions.push({ form, answer, gloss });
    });

    if (questions.length < 2) return null;
    const distinctAnswers = new Set(questions.map((q) => q.answer));
    if (distinctAnswers.size < 2) return null;

    const lemma = extractLemma(set.label) || key;
    const gloss = extractLemmaGloss(set);
    return {
      label: set.label || key,
      week: set.week ?? null,
      items: [
        {
          family: set.label || key,
          lemma,
          gloss,
          questions
        }
      ]
    };
  }

  function shouldGenerate(key) {
    const raw = String(key || '');
    // Limit to weekly paradigm sets (W1_*, W2_*, ...). W*O are general
    // supplemental vocab without paradigm parsing — skip them.
    if (!/^W\d+_/.test(raw)) return false;
    const morphSets = window.MORPHOLOGY_SETS;
    if (morphSets && morphSets[raw]) return false; // already provided
    return true;
  }

  const vocabSets = window.SUPPLEMENTAL_VOCAB_SETS || {};
  Object.keys(vocabSets).forEach((key) => {
    if (!shouldGenerate(key)) return;
    const morphSet = buildMorphologyForSet(key, vocabSets[key]);
    if (!morphSet) return;
    window.registerSupplementalMorphologySet(key, morphSet);
  });
})();
