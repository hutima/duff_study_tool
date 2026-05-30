// Second-aorist verb flashcards: each card has the present form on one face
// with its English gloss as a subtitle, and the aorist form on the other face
// with its English gloss as a subtitle. Characters that differ between the
// two stems are diff-highlighted by the renderer (see render.js's stem-flip
// branch) so the student can spot the stem change at a glance.
//
// Cards keep the standard {g, e, required} vocab-card shape so the deck
// pipeline (filters, scheduler, analytics) just works. The stemFlip flag
// tells the renderer to swap in the bilingual-flip layout instead of the
// usual Greek/English reveal.

(function () {
  if (typeof window.registerSupplementalVocabSet !== 'function') return;

  function entry(present, presentGloss, aorist, aoristGloss, note, keyVerb) {
    return {
      stemFlip: true,
      g: present,
      e: presentGloss,
      aorist,
      aoristGloss,
      stemNote: note || '',
      keyVerb: !!keyVerb,
      required: true
    };
  }

  window.registerSupplementalVocabSet('W4_SECOND_AORIST_FLIP', {
    label: 'Second-aorist verbs — present ↔ aorist flashcards',
    week: 4,
    cards: [
      entry('ἁμαρτάνω', 'I sin',    'ἥμαρτον', 'I sinned',    'shortened 2nd-aorist stem; α → η augment'),
      entry('ἀποθνῄσκω', 'I die',   'ἀπέθανον', 'I died',     'shortened stem; ε-augment inside the compound'),
      entry('βάλλω', 'I throw',     'ἔβαλον', 'I threw',      'doubled λλ → single λ; ε-augment', true),
      entry('εὑρίσκω', 'I find',    'εὗρον', 'I found',       'lost -ισκ- suffix; rough breathing kept'),
      entry('καταλείπω', 'I leave', 'κατέλιπον', 'I left',     'ει → ι in stem; augment after κατα-'),
      entry('λαμβάνω', 'I take',    'ἔλαβον', 'I took',       'lost -αν- suffix and the nasal', true),
      entry('μανθάνω', 'I learn',   'ἔμαθον', 'I learned',    'lost -αν- suffix and the nasal'),
      entry('πάσχω', 'I suffer',    'ἔπαθον', 'I suffered',   'σχ → θ stem change'),
      entry('πίνω', 'I drink',      'ἔπιον', 'I drank',       'lost the nasal -ν-'),
      entry('φεύγω', 'I flee',      'ἔφυγον', 'I fled',       'ευ → υ vowel shortening'),
      entry('βαίνω', 'I go',        'ἔβην', 'I went',         'athematic -ην ending; different aorist pattern'),
      entry('γινώσκω', 'I know',    'ἔγνων', 'I knew',        'lost -ισκ- suffix; athematic -ων ending', true),
      entry('ἄγω', 'I lead',        'ἤγαγον', 'I led',        'reduplicated stem ἀγαγ-', true),
      entry('ἔχω', 'I have',        'ἔσχον', 'I had',         'σχ- stem replaces ἔχ-', true),
      entry('πίπτω', 'I fall',      'ἔπεσον', 'I fell',       'πτ → πεσ stem change'),
      entry('γίνομαι', 'I become',  'ἐγενόμην', 'I became',   'deponent -ομην; lost the nasal', true),
      entry('ἔρχομαι', 'I come',    'ἦλθον', 'I came',        'completely different root (ἐλθ-)', true),
      entry('λέγω', 'I say',        'εἶπον', 'I said',        'completely different root (ἐπ-)', true),
      entry('ἐσθίω', 'I eat',       'ἔφαγον', 'I ate',        'completely different root (φαγ-)'),
      entry('ὁράω', 'I see',        'εἶδον', 'I saw',         'completely different root (ἰδ-)', true),
      entry('φέρω', 'I carry',      'ἤνεγκον', 'I carried',   'completely different root (ἐνεγκ-); reduplicated')
    ]
  });
})();
