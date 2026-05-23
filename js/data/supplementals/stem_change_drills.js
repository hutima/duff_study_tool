// Auto-generates "what is the aorist of X?" stem-change recall cards from
// stem-pair vocab sets (e.g. W4_SECOND_AORIST_STEMS: "βάλλω → ἔβαλον"). The
// existing paradigm-morphology auto-generator deliberately skips entries
// whose Greek form contains "→" because they're not single parseable forms;
// this file picks those up and reshapes them into stem-recall MC cards.
//
// Each generated card asks the student to recognize the correct aorist
// 1st-singular given the present-tense lemma. Distractors are pulled from
// other entries in the same set — every distractor is a real Greek aorist,
// so the test is whether the student knows which stem belongs to which verb.

(function () {
  if (typeof window.registerSupplementalMorphologySet !== 'function') return;

  const STEM_ARROW_REGEX = /\s*→\s*/;

  function extractPairs(set) {
    const pairs = [];
    (set.cards || []).forEach((card) => {
      const greek = String(card && card.g ? card.g : '').trim();
      const english = String(card && card.e ? card.e : '').trim();
      const parts = greek.split(STEM_ARROW_REGEX).map((s) => s.trim()).filter(Boolean);
      if (parts.length < 2) return;
      // For stem-pair entries with more than two forms (e.g. W4_FUTURE_LIQUID
      // "σπείρω → σπερῶ → ἔσπειρα"), take the first form as the lemma and
      // generate a card per subsequent form (future, aorist, etc.).
      const lemmaForm = parts[0];
      const meaningPart = english.replace(/\s*\([^)]*\)\s*$/, '').trim();
      const meaningSegments = meaningPart.split(STEM_ARROW_REGEX).map((s) => s.trim());
      for (let i = 1; i < parts.length; i++) {
        pairs.push({
          present: lemmaForm,
          target: parts[i],
          presentMeaning: meaningSegments[0] || '',
          targetMeaning: meaningSegments[i] || ''
        });
      }
    });
    return pairs;
  }

  function buildQuestionsFromAoristPairs(set, label) {
    const pairs = extractPairs(set);
    if (pairs.length < 2) return null;
    return {
      family: label,
      lemma: 'Second-aorist stems',
      gloss: 'present → 1st-sg aorist',
      questions: pairs.map((p) => ({
        form: p.present,
        answer: p.target,
        prompt: `What is the 1st-singular aorist of ${p.present}?`,
        gloss: p.targetMeaning || '',
        dimensional: false,
        reversible: false
      }))
    };
  }

  function buildQuestionsFromLiquidFutures(set, label) {
    // W4_FUTURE_LIQUID_STEMS holds triples: present → future → aorist. Split
    // into two question banks — one for the future, one for the aorist — so
    // the student is asked which transformation they're producing.
    const pairs = [];
    (set.cards || []).forEach((card) => {
      const greek = String(card && card.g ? card.g : '').trim();
      const parts = greek.split(STEM_ARROW_REGEX).map((s) => s.trim()).filter(Boolean);
      if (parts.length < 3) return;
      pairs.push({ present: parts[0], future: parts[1], aorist: parts[2] });
    });
    if (pairs.length < 2) return null;

    const futureQuestions = pairs.map((p) => ({
      form: p.present,
      answer: p.future,
      prompt: `What is the 1st-singular future of ${p.present}?`,
      dimensional: false,
      reversible: false
    }));
    const aoristQuestions = pairs.map((p) => ({
      form: p.present,
      answer: p.aorist,
      prompt: `What is the 1st-singular aorist of ${p.present}?`,
      dimensional: false,
      reversible: false
    }));

    return {
      family: label,
      lemma: 'Liquid-stem futures',
      gloss: 'present → future → aorist',
      questions: [...futureQuestions, ...aoristQuestions]
    };
  }

  const vocabSets = window.SUPPLEMENTAL_VOCAB_SETS || {};

  const secondAoristSet = vocabSets['W4_SECOND_AORIST_STEMS'];
  if (secondAoristSet) {
    const item = buildQuestionsFromAoristPairs(
      secondAoristSet,
      'Second-aorist stem changes'
    );
    if (item) {
      window.registerSupplementalMorphologySet('W4_SECOND_AORIST_STEMS_DRILL', {
        label: 'Second-aorist stem changes',
        week: 4,
        notes: 'Recall the 1st-sg aorist given the present-tense lemma. Distractors are other real 2nd-aorist forms.',
        items: [item]
      });
    }
  }

  const liquidSet = vocabSets['W4_FUTURE_LIQUID_STEMS'];
  if (liquidSet) {
    const item = buildQuestionsFromLiquidFutures(
      liquidSet,
      'Liquid-future stem changes'
    );
    if (item) {
      window.registerSupplementalMorphologySet('W4_FUTURE_LIQUID_STEMS_DRILL', {
        label: 'Liquid-future stem changes',
        week: 4,
        notes: 'Recall the future and aorist 1st-sg given the present. Distractors are other real liquid-stem forms.',
        items: [item]
      });
    }
  }
})();
