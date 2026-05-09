// Auto-generates parsing-quiz morphology sets from paradigm vocab cards.
// Runs after every W*_<paradigm> vocab set has been registered, then mirrors
// each card as a {form, answer} pair so the supplemental selector exposes a
// "Morphology" sub-quiz alongside the vocab cards.
(function () {
  if (typeof window.registerSupplementalMorphologySet !== 'function') return;

  const PARSING_KEYWORDS = /(?:\bNom\.?\b|\bGen\.?\b|\bDat\.?\b|\bAcc\.?\b|\bVoc\.?\b|\bsg\.?\b|\bpl\.?\b|\bsingular\b|\bplural\b|\bperson\b|\bmasc(?:uline)?\b|\bfem(?:inine)?\b|\bneut(?:er)?\b|\bnominative\b|\bgenitive\b|\bdative\b|\baccusative\b|\bvocative\b|\bPresent\b|\bFuture\b|\bImperfect\b|\bAorist\b|\bPerfect\b|\bPluperfect\b|\bpresent\b|\bfuture\b|\bimperfect\b|\baorist\b|\bperfect\b|\bpluperfect\b|\bactive\b|\bmiddle\b|\bpassive\b|\bindicative\b|\bsubjunctive\b|\bimperative\b|\binfinitive\b|\bparticiple\b|\b1st\b|\b2nd\b|\b3rd\b|\bTime\b|\bPlace\b|\bManner\b|\bReason\b|\bIndefinite construction\b|\bSimple relative\b)/i;

  const TENSE_PREFIX_REGEX = /^(1st Aorist [A-Za-z]+|2nd Aorist [A-Za-z]+|Aorist Passive|Present|Future|Imperfect|Aorist|Perfect|Pluperfect)\s*:\s*/;

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
      const answer = extractParsing(card.e);
      if (!answer) return;
      seenForms.add(form);
      questions.push({ form, answer });
    });

    if (questions.length < 2) return null;
    const distinctAnswers = new Set(questions.map((q) => q.answer));
    if (distinctAnswers.size < 2) return null;

    const lemma = extractLemma(set.label) || key;
    return {
      label: set.label || key,
      week: set.week ?? null,
      items: [
        {
          family: set.label || key,
          lemma,
          gloss: '',
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
