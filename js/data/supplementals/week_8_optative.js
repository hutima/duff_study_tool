(function () {
  // Optative mood (Duff Ch 20). The optative is vanishingly rare in the NT
  // (~68 of 28,000+ verbs), so this REQUIRED set is deliberately tiny: only
  // the forms that actually occur in the Greek New Testament — γένοιτο (the
  // Pauline μὴ γένοιτο), εἴη (always 3sg in the GNT), and δῴη ("may the Lord
  // grant") — plus one model λύω (active) and ῥύομαι (middle) form so a
  // student sees the pattern on the course's two paradigm verbs. The FULL
  // optative paradigm for every model verb lives in the OPTIONAL pool
  // (LEMMA_INVENTORY optative groups, chapter 20) — turn on "Optional
  // paradigm" in parsing to browse/drill it.
  //
  // Each card carries its own `lemma` so the auto-generated parsing cards
  // (paradigm_morphology.js) fold into the right paradigm (εἰμί / γίνομαι /
  // δίδωμι / λύω / ῥύομαι) instead of a standalone "Optative" paradigm. The
  // parse parenthetical drives canonicalization, so it names tense, voice,
  // mood, person, and number in full.
  window.registerSupplementalVocabSet('W8_OPTATIVE_NT_FORMS', {
    label: 'Optative — New Testament forms (λύω, ῥύομαι, εἰμί, γίνομαι, δίδωμι)',
    week: 8,
    chapter: 20,
    cards: [
      { g: 'εἴη', e: 'he/she/it might be (Present active optative, 3rd person sg.) — the only optative of εἰμί in the GNT, always 3rd sg.', lemma: 'εἰμί', required: true },
      { g: 'γένοιτο', e: 'may it be! / may it happen! (2nd aorist middle optative, 3rd person sg.) — Paul’s μὴ γένοιτο, “may it never be!”', lemma: 'γίνομαι', required: true },
      { g: 'δῴη', e: 'may he/she/it grant / give (Aorist active optative, 3rd person sg.) — “may the Lord grant”, 2 Tim 1:16', lemma: 'δίδωμι', required: true },
      { g: 'λύοιμι', e: 'I might untie / loose (Present active optative, 1st person sg.) — model ω-verb example', lemma: 'λύω', required: true },
      { g: 'ῥυοίμην', e: 'I might rescue (Present middle optative, 1st person sg.) — model middle/deponent example', lemma: 'ῥύομαι', required: true }
    ]
  });
})();
