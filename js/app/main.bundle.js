(() => {
  // js/utils/helpers.js
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  function escapeHtml(value) {
    const str = String(value ?? "");
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }
  function cloneForUndo(value) {
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  // js/utils/time.js
  function formatUsageDuration(ms) {
    const totalMinutes = Math.max(0, Math.round((ms || 0) / (60 * 1e3)));
    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor(totalMinutes % (24 * 60) / 60);
    const minutes = totalMinutes % 60;
    if (days > 0) return hours > 0 ? `${days}d ${hours}h` : `${days}d`;
    if (hours > 0) return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    return `${minutes}m`;
  }
  function formatAnalyticsDate(ts) {
    if (!ts) return "\u2014";
    return new Date(ts).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" });
  }
  function formatAnalyticsDateTime(ts) {
    if (!ts) return "\u2014";
    return new Date(ts).toLocaleString(void 0, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
  }
  function getUsageDayKey(ts = Date.now()) {
    const d = new Date(ts);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function addDailyDurationSlice(bucket, startTs, durationMs) {
    if (!durationMs || durationMs <= 0) return;
    let cursor = startTs;
    let remaining = durationMs;
    while (remaining > 0) {
      const endOfDay = new Date(cursor);
      endOfDay.setHours(24, 0, 0, 0);
      const slice = Math.min(remaining, endOfDay.getTime() - cursor);
      const dayKey = getUsageDayKey(cursor);
      bucket[dayKey] = (bucket[dayKey] || 0) + slice;
      cursor += slice;
      remaining -= slice;
    }
  }

  // js/utils/storage.js
  function getStorage() {
    try {
      return window.localStorage;
    } catch (err) {
      return null;
    }
  }
  function isLikelyIOS() {
    const ua = window.navigator.userAgent || "";
    const platform = window.navigator.platform || "";
    return /iPad|iPhone|iPod/.test(ua) || platform === "MacIntel" && window.navigator.maxTouchPoints > 1;
  }

  // js/utils/greekSort.js
  function stripInitialNominalArticle(text) {
    const formatted = normalizeSpacing(text || "");
    return formatted.replace(/^(ὁ|ἡ|τό)\s+/u, "").trim();
  }
  function isMorphCard(card) {
    return !!(card && card.type === "morphology");
  }
  function getGreekAlphabetSortKey(card) {
    if (isMorphCard(card)) return stripGreekAccents(normalizeSpacing(card.form || "")).toLowerCase();
    const pos = detectPartOfSpeech(card);
    const headword = formatGreekHeadword(card.g);
    const sortable = /^Noun\b/.test(pos) ? stripInitialNominalArticle(headword) : headword;
    return stripGreekAccents(normalizeSpacing(sortable || "")).replace(/ς/g, "\u03C3").toLowerCase();
  }
  function compareGreekAlphabetical(a, b) {
    const order = { "\u03B1": 1, "\u03B2": 2, "\u03B3": 3, "\u03B4": 4, "\u03B5": 5, "\u03B6": 6, "\u03B7": 7, "\u03B8": 8, "\u03B9": 9, "\u03BA": 10, "\u03BB": 11, "\u03BC": 12, "\u03BD": 13, "\u03BE": 14, "\u03BF": 15, "\u03C0": 16, "\u03C1": 17, "\u03C3": 18, "\u03C4": 19, "\u03C5": 20, "\u03C6": 21, "\u03C7": 22, "\u03C8": 23, "\u03C9": 24 };
    const aKey = getGreekAlphabetSortKey(a);
    const bKey = getGreekAlphabetSortKey(b);
    const len = Math.max(aKey.length, bKey.length);
    for (let i = 0; i < len; i++) {
      const aCh = aKey[i] || "";
      const bCh = bKey[i] || "";
      if (aCh === bCh) continue;
      const aRank = order[aCh] || (aCh ? 200 + aCh.codePointAt(0) : 0);
      const bRank = order[bCh] || (bCh ? 200 + bCh.codePointAt(0) : 0);
      if (aRank !== bRank) return aRank - bRank;
    }
    return aKey.localeCompare(bKey, "el");
  }

  // js/domain/srs/constants.js
  var SRS_DAY_MS = 20 * 60 * 60 * 1e3;
  var SRS_AGAIN_MS = 5 * 60 * 1e3;
  var SRS_UNCERTAIN_MIN_MS = 60 * 60 * 1e3;
  var SRS_GUIDE_STEPS_DAYS = [1, 3, 5, 7];
  var SRS_NEAR_WINDOW_MS = 30 * 60 * 1e3;
  var SRS_CYCLE_ADVANCE_MS = 60 * 60 * 1e3;

  // js/domain/srs/scheduler.js
  function msFromDays(days) {
    return Math.round(days * SRS_DAY_MS);
  }
  function setProgressDelay(progress, delayMs, now = Date.now()) {
    progress.intervalDays = delayMs / SRS_DAY_MS;
    progress.dueAt = now + delayMs;
  }
  function getRemainingProgressDelayMs(progress, now = Date.now()) {
    if (!progress || !progress.dueAt) return 0;
    return Math.max(0, progress.dueAt - now);
  }
  function setMinimumProgressDelay(progress, minimumDelayMs, now = Date.now()) {
    const remainingDelayMs = getRemainingProgressDelayMs(progress, now);
    if (remainingDelayMs < minimumDelayMs) {
      setProgressDelay(progress, minimumDelayMs, now);
      return true;
    }
    progress.intervalDays = remainingDelayMs / SRS_DAY_MS;
    return false;
  }
  function getSrsEase(progress) {
    const rawEase = Number(progress?.ease);
    const safeEase = Number.isFinite(rawEase) ? rawEase : 2.3;
    progress.ease = clamp(safeEase, 1.3, 3);
    return progress.ease;
  }
  function getSrsStage(progress) {
    const rawStage = Number(progress?.srsStage);
    return Number.isFinite(rawStage) ? Math.max(0, Math.floor(rawStage)) : 0;
  }
  function getLastEasyIntervalDays(progress) {
    const rawDays = Number(progress?.lastEasyIntervalDays);
    return Number.isFinite(rawDays) ? Math.max(0, rawDays) : 0;
  }
  function getNextEasyIntervalDays(progress) {
    const confidenceHistory = Array.isArray(progress?.confidenceHistory) ? progress.confidenceHistory.filter((value) => Number.isFinite(value)).slice(-4) : [];
    if (confidenceHistory.length) {
      const confidenceAvg = confidenceHistory.reduce((sum, value) => sum + value, 0) / confidenceHistory.length;
      if (confidenceAvg < 1) {
        return Math.max(confidenceAvg, 1 / 24);
      }
    }
    const stage = getSrsStage(progress);
    const guideDays = SRS_GUIDE_STEPS_DAYS;
    if (stage < guideDays.length) return guideDays[stage];
    const previousDays = Math.max(
      guideDays[guideDays.length - 1],
      getLastEasyIntervalDays(progress),
      Number.isFinite(Number(progress?.intervalDays)) ? Math.max(0, Number(progress.intervalDays)) : 0
    );
    const proposedDays = previousDays * getSrsEase(progress);
    return Math.max(Math.round(proposedDays), Math.ceil(previousDays + 1));
  }
  function getUncertainDelayMs(progress) {
    return SRS_UNCERTAIN_MIN_MS;
  }
  function formatRemainingForTable(dueAt) {
    const now = Date.now();
    if (!dueAt || dueAt <= now) return "now";
    const remaining = dueAt - now;
    if (remaining > 12 * 60 * 60 * 1e3) {
      return `${Math.max(1, Math.ceil(remaining / SRS_DAY_MS))}d`;
    }
    if (remaining >= 60 * 60 * 1e3) {
      return `${Math.max(1, Math.ceil(remaining / (60 * 60 * 1e3)))}h`;
    }
    return `${Math.max(1, Math.ceil(remaining / (60 * 1e3)))}m`;
  }

  // js/domain/srs/confidence.js
  function getConfidenceSample(outcome) {
    const normalized = String(outcome || "").toLowerCase();
    if (normalized === "easy" || normalized === "known") return 1;
    if (normalized === "pass" || normalized === "uncertain" || normalized === "unsure") return 0.5;
    return 0;
  }
  function recordConfidenceSample(progress, outcome) {
    const history = Array.isArray(progress.confidenceHistory) ? [...progress.confidenceHistory] : [];
    history.push(getConfidenceSample(outcome));
    progress.confidenceHistory = history.slice(-4);
    const avg = progress.confidenceHistory.length ? progress.confidenceHistory.reduce((sum, value) => sum + value, 0) / progress.confidenceHistory.length : 0;
    progress.confidence = avg * 5;
  }
  function getConfidencePct(progress) {
    const history = Array.isArray(progress?.confidenceHistory) ? progress.confidenceHistory.filter((value) => Number.isFinite(value)) : [];
    if (history.length) {
      const avg = history.reduce((sum, value) => sum + value, 0) / history.length;
      return Math.round(avg * 100);
    }
    const passCount = progress?.passCount || 0;
    const failCount = progress?.failCount || 0;
    const responseCount = passCount + failCount;
    return responseCount ? Math.round(passCount / responseCount * 100) : null;
  }
  function computeCardXpAward(outcome, isFirstConfirmation, isSpaced) {
    const norm = String(outcome || "").toLowerCase();
    if (norm === "easy" || norm === "known") {
      if (!isSpaced) return 1;
      return isFirstConfirmation ? 10 : 5;
    }
    if (norm === "pass" || norm === "uncertain" || norm === "unsure") return 3;
    return 1;
  }

  // js/domain/gamification/levels.js
  var XP_LEVELS = [
    { level: 1, threshold: 0, title: "Alpha", flav: "Already know one letter" },
    { level: 2, threshold: 25, title: "Paroikos", flav: "Stranger in a strange land" },
    { level: 3, threshold: 75, title: "Akou\u014Dn", flav: "Listening, not yet understanding" },
    { level: 4, threshold: 175, title: "Spongos", flav: "Soaking it all in" },
    { level: 5, threshold: 400, title: "Math\u0113t\u0113s", flav: "Officially a student" },
    { level: 6, threshold: 800, title: "Berean", flav: "Checks the scrolls daily" },
    { level: 7, threshold: 1500, title: "Anagn\u014Dst\u0113s", flav: "Reads without (much) stumbling" },
    { level: 8, threshold: 2800, title: "Bibliophagos", flav: "Devours texts for breakfast" },
    { level: 9, threshold: 5e3, title: "Logophilos", flav: "Unhealthy attachment to words" },
    { level: 10, threshold: 7500, title: "Herm\u0113neut\u0113s", flav: "Actually understands some of this" },
    { level: 11, threshold: 10500, title: "Grammatikos", flav: "Parses in their sleep" },
    { level: 12, threshold: 14e3, title: "Ex\u0113g\u0113t\u0113s", flav: "Draws out hidden meaning" },
    { level: 13, threshold: 18e3, title: "Rh\u0113t\u014Dr", flav: "Argues in Greek for fun" },
    { level: 14, threshold: 23e3, title: "Didaskalos", flav: "Others come to you now" },
    { level: 15, threshold: 29e3, title: "Sophos", flav: "Wisdom achieved (allegedly)" },
    { level: 16, threshold: 36e3, title: "Chrysostomos", flav: "Golden-tongued" },
    { level: 17, threshold: 44e3, title: "Theologos", flav: "Speaks of deep things" },
    { level: 18, threshold: 53e3, title: "Polymath\u0113s", flav: "Knows more than is healthy" },
    { level: 19, threshold: 64e3, title: "Arch\u014Dn", flav: "Ruler of the lexicon" },
    { level: 20, threshold: 77e3, title: "Logothet\u0113s", flav: "Final form achieved (or so you thought)" },
    { level: 21, threshold: 92e3, title: "Pantokrat\u014Dr", flav: "Almighty vocabulary, questionable sleep" },
    { level: 22, threshold: 108e3, title: "Metanoia", flav: "Changed your mind about quitting" },
    { level: 23, threshold: 125e3, title: "K\u0113rygma", flav: "Can preach the paradigms now" },
    { level: 24, threshold: 14e4, title: "Theopneustos", flav: "Divinely inspired (by flashcards)" },
    { level: 25, threshold: 155e3, title: "Parrh\u0113sia", flav: "Bold enough to parse anything" },
    { level: 26, threshold: 168e3, title: "Hypostasis", flav: "The substance of things studied" },
    { level: 27, threshold: 178e3, title: "Myst\u0113rion", flav: "The mystery is how you have time for this" },
    { level: 28, threshold: 187e3, title: "Pl\u0113r\u014Dma", flav: "Fullness of knowledge (almost)" },
    { level: 29, threshold: 195e3, title: "Apokalypsis", flav: "The final paradigms revealed" },
    { level: 30, threshold: 2e5, title: "Logos", flav: "In the beginning was the Word \u2014 and you know it" }
  ];
  var REVIEW_XP_SCHEDULE = [8, 5, 3, 2];

  // js/data/setMeta.js
  var CHAPTER_TO_WEEK = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 2,
    7: 2,
    8: 3,
    9: 3,
    10: 4,
    11: 4,
    12: 5,
    13: 5,
    14: 5,
    15: 6,
    16: 6,
    17: 7,
    18: 7,
    19: 8,
    20: 8
  };
  var SESSION_WEEK_META = {
    wk1t: [1],
    wk1f: [1],
    wk2t: [2],
    wk2f: [2],
    wk3t: [3],
    wk3f: [3],
    wk4t: [4],
    mt: [1, 2, 3, 4],
    wk5t: [5],
    wk5f: [5],
    wk6t: [6],
    wk6f: [6],
    wk7t: [7],
    wk7f: [7],
    wk8t: [8],
    wk8f: [8],
    all: [1, 2, 3, 4, 5, 6, 7, 8]
  };

  // js/domain/deck/ordering.js
  function getSets() {
    return window.SETS && typeof window.SETS === "object" ? window.SETS : {};
  }
  function isChapterKey(key) {
    return /^\d+$/.test(String(key));
  }
  function sortSetKeys(keys) {
    function score(key) {
      const raw = String(key);
      if (/^\d+$/.test(raw)) return Number(raw);
      const m = raw.match(/^W(\d+)O$/);
      if (m) return 100 + Number(m[1]);
      return 999;
    }
    return [...keys].sort((a, b) => {
      const diff = score(a) - score(b);
      return diff || String(a).localeCompare(String(b));
    });
  }
  function sourceHint(key) {
    const raw = String(key);
    if (/^\d+$/.test(raw)) return `Ch. ${raw}`;
    const sets = getSets();
    return sets[raw]?.label || raw;
  }
  function getWeekForKey(key) {
    const raw = String(key);
    if (isChapterKey(raw)) return CHAPTER_TO_WEEK[Number(raw)] || null;
    const sets = getSets();
    return sets[raw]?.week || null;
  }
  function getChapterForKey(key) {
    const raw = String(key);
    return isChapterKey(raw) ? Number(raw) : null;
  }
  function getOtherKeysForWeeks(weeks) {
    const weekSet = new Set((weeks || []).map(Number).filter(Boolean));
    const sets = getSets();
    return Object.keys(sets).filter((key) => {
      const set = sets[key];
      return set && set.type === "other" && weekSet.has(Number(set.week));
    });
  }
  function expandSessionSets(session) {
    const baseSets = (session?.sets || []).map(String);
    const weeks = SESSION_WEEK_META[session?.id] || [];
    const dynamicOthers = getOtherKeysForWeeks(weeks);
    return sortSetKeys([.../* @__PURE__ */ new Set([...baseSets, ...dynamicOthers])]);
  }

  // js/data/parsing_examples.js
  var PARSING_EXAMPLES = {
    // ── λύω indicative ────────────────────────────────────
    "present active indicative, first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03C9.",
      english: "I untie the bond.",
      why: "Primary ending -\u03C9 on the present stem. No augment, no \u03C3."
    },
    "present active indicative, second singular": {
      greek: "\u03C3\u1F7A \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03B5\u03B9\u03C2.",
      english: "You untie the bond.",
      why: "Primary ending -\u03B5\u03B9\u03C2. Short thematic vowel."
    },
    "present active indicative, third singular": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03B5\u03B9.",
      english: "The servant unties the bond.",
      why: "Primary ending -\u03B5\u03B9. No augment."
    },
    "present active indicative, first plural": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03BF\u03BC\u03B5\u03BD.",
      english: "We untie the bond.",
      why: "Primary ending -\u03BF\u03BC\u03B5\u03BD. Short thematic vowel \u03BF."
    },
    "present active indicative, second plural": {
      greek: "\u1F51\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03B5\u03C4\u03B5.",
      english: "You (all) untie the bond.",
      why: "Primary ending -\u03B5\u03C4\u03B5. Identical in form to the 2nd-plural imperative."
    },
    "present active indicative, third plural": {
      greek: "\u03BF\u1F31 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03B9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03BF\u03C5\u03C3\u03B9(\u03BD).",
      english: "The servants untie the bond.",
      why: "Primary ending -\u03BF\u03C5\u03C3\u03B9(\u03BD) with movable nu."
    },
    "future active indicative, first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03C3\u03C9.",
      english: "I will untie the bond.",
      why: "Tense marker \u03C3 between stem and ending; no augment."
    },
    "future active indicative, second singular": {
      greek: "\u03C3\u1F7A \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03C3\u03B5\u03B9\u03C2.",
      english: "You will untie the bond.",
      why: "\u03C3 tense marker + primary ending."
    },
    "future active indicative, third singular": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03C3\u03B5\u03B9.",
      english: "The servant will untie the bond.",
      why: "\u03C3 tense marker + primary ending -\u03B5\u03B9."
    },
    "future active indicative, first plural": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03C3\u03BF\u03BC\u03B5\u03BD.",
      english: "We will untie the bond.",
      why: "\u03C3 tense marker + primary ending -\u03BF\u03BC\u03B5\u03BD."
    },
    "future active indicative, second plural": {
      greek: "\u1F51\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03C3\u03B5\u03C4\u03B5.",
      english: "You (all) will untie the bond.",
      why: "\u03C3 tense marker + primary ending -\u03B5\u03C4\u03B5."
    },
    "future active indicative, third plural": {
      greek: "\u03BF\u1F31 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03B9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03C3\u03BF\u03C5\u03C3\u03B9(\u03BD).",
      english: "The servants will untie the bond.",
      why: "\u03C3 tense marker + primary ending -\u03BF\u03C5\u03C3\u03B9(\u03BD)."
    },
    "imperfect active indicative, first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F14\u03BB\u03C5\u03BF\u03BD.",
      english: "I was untying the bond.",
      why: "Augment \u1F10- + present stem + secondary ending -\u03BF\u03BD. Imperfective past."
    },
    "imperfect active indicative, second singular": {
      greek: "\u03C3\u1F7A \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F14\u03BB\u03C5\u03B5\u03C2.",
      english: "You were untying the bond.",
      why: "Augment \u1F10- + present stem + secondary ending -\u03B5\u03C2."
    },
    "imperfect active indicative, third singular": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F14\u03BB\u03C5\u03B5(\u03BD).",
      english: "The servant was untying the bond.",
      why: "Augment \u1F10- + present stem + secondary ending -\u03B5(\u03BD)."
    },
    "imperfect active indicative, first plural": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F10\u03BB\u03CD\u03BF\u03BC\u03B5\u03BD.",
      english: "We were untying the bond.",
      why: "Augment \u1F10- + present stem + secondary ending -\u03BF\u03BC\u03B5\u03BD."
    },
    "imperfect active indicative, second plural": {
      greek: "\u1F51\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F10\u03BB\u03CD\u03B5\u03C4\u03B5.",
      english: "You (all) were untying the bond.",
      why: "Augment \u1F10- + present stem + secondary ending -\u03B5\u03C4\u03B5."
    },
    "imperfect active indicative, third plural": {
      greek: "\u03BF\u1F31 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03B9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F14\u03BB\u03C5\u03BF\u03BD.",
      english: "The servants were untying the bond.",
      why: "Augment \u1F10- + present stem + secondary ending -\u03BF\u03BD. Identical to 1st sg."
    },
    "imperfect active indicative, first singular or third plural": {
      greek: "\u1F14\u03BB\u03C5\u03BF\u03BD \u2014 \u1F10\u03B3\u1F7C \u1F14\u03BB\u03C5\u03BF\u03BD / \u03B1\u1F50\u03C4\u03BF\u1F76 \u1F14\u03BB\u03C5\u03BF\u03BD.",
      english: "I was untying / they were untying.",
      why: "Imperfect -\u03BF\u03BD is ambiguous between 1st sg. and 3rd pl. in the active."
    },
    "aorist active indicative, first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F14\u03BB\u03C5\u03C3\u03B1.",
      english: "I untied the bond.",
      why: "Augment \u1F10- + stem + \u03C3\u03B1 + secondary ending. Perfective past \u2014 one complete action."
    },
    "aorist active indicative, second singular": {
      greek: "\u03C3\u1F7A \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F14\u03BB\u03C5\u03C3\u03B1\u03C2.",
      english: "You untied the bond.",
      why: "Augment + \u03C3\u03B1 + secondary ending -\u03C2."
    },
    "aorist active indicative, third singular": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F14\u03BB\u03C5\u03C3\u03B5(\u03BD).",
      english: "The servant untied the bond.",
      why: "Augment + \u03C3 + \u03B5(\u03BD). First-aorist third singular takes \u03B5, not \u03B1."
    },
    "aorist active indicative, first plural": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F10\u03BB\u03CD\u03C3\u03B1\u03BC\u03B5\u03BD.",
      english: "We untied the bond.",
      why: "Augment + \u03C3\u03B1 + secondary ending -\u03BC\u03B5\u03BD."
    },
    "aorist active indicative, second plural": {
      greek: "\u1F51\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F10\u03BB\u03CD\u03C3\u03B1\u03C4\u03B5.",
      english: "You (all) untied the bond.",
      why: "Augment + \u03C3\u03B1 + secondary ending -\u03C4\u03B5."
    },
    "aorist active indicative, third plural": {
      greek: "\u03BF\u1F31 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03B9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F14\u03BB\u03C5\u03C3\u03B1\u03BD.",
      english: "The servants untied the bond.",
      why: "Augment + \u03C3\u03B1 + secondary ending -\u03BD."
    },
    "perfect active indicative, first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03AD\u03BB\u03C5\u03BA\u03B1.",
      english: "I have untied the bond (and it remains untied).",
      why: "Reduplication (\u03BB\u03B5-) + \u03BA + \u03B1-class endings. Completed action with lasting result."
    },
    "perfect active indicative, third singular": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03AD\u03BB\u03C5\u03BA\u03B5(\u03BD).",
      english: "The servant has untied the bond.",
      why: "Reduplication + \u03BA + \u03B5(\u03BD)."
    },
    "perfect active indicative, first plural": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03B5\u03BB\u03CD\u03BA\u03B1\u03BC\u03B5\u03BD.",
      english: "We have untied the bond.",
      why: "Reduplication + \u03BA + \u03B1-class ending -\u03BC\u03B5\u03BD."
    },
    "perfect active indicative, third plural": {
      greek: "\u03BF\u1F31 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03B9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03B5\u03BB\u03CD\u03BA\u03B1\u03C3\u03B9(\u03BD).",
      english: "The servants have untied the bond.",
      why: "Reduplication + \u03BA + \u03B1-class ending -\u03C3\u03B9(\u03BD)."
    },
    "pluperfect active indicative, first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F10\u03BB\u03B5\u03BB\u03CD\u03BA\u03B5\u03B9\u03BD.",
      english: "I had untied the bond.",
      why: "Augment + reduplication + \u03BA + \u03B5\u03B9 + secondary ending. Three time-markers = pluperfect."
    },
    // ── middle / passive indicative ───────────────────────
    "present middle/passive indicative, first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03BB\u03CD\u03BF\u03BC\u03B1\u03B9.",
      english: "I untie for myself / I am being untied.",
      why: "Primary M/P ending -\u03BF\u03BC\u03B1\u03B9. Present and imperfect share one form for middle and passive."
    },
    "present middle/passive indicative, second singular": {
      greek: "\u03C3\u1F7A \u03BB\u03CD\u1FC3.",
      english: "You untie for yourself / you are being untied.",
      why: "Primary M/P ending -\u1FC3 (from -\u03B5\u03C3\u03B1\u03B9 with \u03C3-drop)."
    },
    "present middle/passive indicative, third singular": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03CD\u03B5\u03C4\u03B1\u03B9.",
      english: "The servant unties for himself / is being untied.",
      why: "Primary M/P ending -\u03B5\u03C4\u03B1\u03B9."
    },
    "present middle/passive indicative, first plural": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u03BB\u03C5\u03CC\u03BC\u03B5\u03B8\u03B1.",
      english: "We untie for ourselves / we are being untied.",
      why: "Primary M/P ending -\u03CC\u03BC\u03B5\u03B8\u03B1."
    },
    "present middle/passive indicative, second plural": {
      greek: "\u1F51\u03BC\u03B5\u1FD6\u03C2 \u03BB\u03CD\u03B5\u03C3\u03B8\u03B5.",
      english: "You (all) untie for yourselves / are being untied.",
      why: "Primary M/P ending -\u03B5\u03C3\u03B8\u03B5."
    },
    "present middle/passive indicative, third plural": {
      greek: "\u03BF\u1F31 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03B9 \u03BB\u03CD\u03BF\u03BD\u03C4\u03B1\u03B9.",
      english: "The servants untie for themselves / are being untied.",
      why: "Primary M/P ending -\u03BF\u03BD\u03C4\u03B1\u03B9."
    },
    "imperfect middle/passive indicative, first plural": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u1F10\u03BB\u03C5\u03CC\u03BC\u03B5\u03B8\u03B1.",
      english: "We were untying for ourselves / were being untied.",
      why: "Augment \u1F10- + stem + secondary M/P ending -\u03CC\u03BC\u03B5\u03B8\u03B1."
    },
    "aorist passive indicative, first singular": {
      greek: "\u1F10\u03B3\u1F7C \u1F10\u03BB\u03CD\u03B8\u03B7\u03BD \u1F51\u03C0\u1F78 \u03C4\u03BF\u1FE6 \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u03BF\u03C5.",
      english: "I was untied by the man.",
      why: "Augment + stem + \u03B8\u03B7 + secondary active-style endings. The \u03B8\u03B7 marker is the passive sign."
    },
    "aorist passive indicative, third singular": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u1F10\u03BB\u03CD\u03B8\u03B7.",
      english: "The servant was untied.",
      why: "Augment + stem + \u03B8\u03B7. The 3rd sg. has no overt ending."
    },
    "future passive indicative, first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03BB\u03C5\u03B8\u03AE\u03C3\u03BF\u03BC\u03B1\u03B9.",
      english: "I will be untied.",
      why: "Built on the aorist passive stem (-\u03B8\u03B7-) + \u03C3 + M/P ending."
    },
    "future passive indicative, third singular": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03C5\u03B8\u03AE\u03C3\u03B5\u03C4\u03B1\u03B9.",
      english: "The servant will be untied.",
      why: "Aorist passive stem + \u03C3 + M/P ending -\u03B5\u03C4\u03B1\u03B9."
    },
    "future middle indicative, first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03BB\u03CD\u03C3\u03BF\u03BC\u03B1\u03B9.",
      english: "I will untie for myself.",
      why: "\u03C3 tense marker + primary M/P ending -\u03BF\u03BC\u03B1\u03B9. Distinct from future passive (no \u03B8\u03B7)."
    },
    "future middle indicative, third singular": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03CD\u03C3\u03B5\u03C4\u03B1\u03B9.",
      english: "The servant will untie for himself.",
      why: "\u03C3 tense marker + primary M/P ending -\u03B5\u03C4\u03B1\u03B9."
    },
    "perfect middle/passive indicative, third singular": {
      greek: "\u03B3\u03AD\u03B3\u03C1\u03B1\u03C0\u03C4\u03B1\u03B9.",
      english: "It has been written / it stands written.",
      why: "Reduplication + stem + primary M/P ending (no \u03BA, no thematic vowel)."
    },
    // ── subjunctive ───────────────────────────────────────
    "present active subjunctive, first singular": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u03C9.",
      english: "that I may untie",
      why: "Long thematic vowel \u03C9 replaces short \u03BF/\u03B5. Same spelling as present indicative 1st sg. in the active."
    },
    "present active subjunctive, second singular": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u1FC3\u03C2.",
      english: "that you may untie",
      why: "Long thematic vowel: \u1FC3 in place of \u03B5\u03B9."
    },
    "present active subjunctive, third singular": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u1FC3.",
      english: "that he may untie",
      why: "Long thematic vowel \u1FC3. Can also be 2nd sg. M/P subjunctive without context."
    },
    "present active subjunctive, first plural": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u03C9\u03BC\u03B5\u03BD.",
      english: "that we may untie",
      why: "Long thematic vowel \u03C9 in place of \u03BF (compare indicative \u03BB\u03CD\u03BF\u03BC\u03B5\u03BD)."
    },
    "present active subjunctive, second plural": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u03B7\u03C4\u03B5.",
      english: "that you (all) may untie",
      why: "Long thematic vowel \u03B7 in place of \u03B5 (compare indicative \u03BB\u03CD\u03B5\u03C4\u03B5)."
    },
    "present active subjunctive, third plural": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u03C9\u03C3\u03B9(\u03BD).",
      english: "that they may untie",
      why: "Long thematic vowel \u03C9 (compare indicative \u03BB\u03CD\u03BF\u03C5\u03C3\u03B9(\u03BD))."
    },
    "aorist active subjunctive, first singular": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u03C3\u03C9.",
      english: "that I may untie",
      why: "Aorist stem (\u03C3) + long-vowel subjunctive ending. No augment \u2014 augment is indicative only."
    },
    "aorist active subjunctive, third singular": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u03C3\u1FC3.",
      english: "that he may untie",
      why: "\u03C3 + long-vowel ending \u1FC3. No augment."
    },
    "aorist active subjunctive, first plural": {
      greek: "\u03BB\u03CD\u03C3\u03C9\u03BC\u03B5\u03BD.",
      english: "Let us untie! (hortatory)",
      why: "\u03C3 + long thematic \u03C9. No augment. 1st pl. in a main clause is hortatory."
    },
    // ── imperative ────────────────────────────────────────
    "present active imperative, second singular": {
      greek: "\u03BB\u1FE6\u03B5 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "Keep untying the bond.",
      why: "Bare stem + short vowel \u03B5. Present imperative \u2192 ongoing or habitual action."
    },
    "present active imperative, third singular": {
      greek: "\u03BB\u03C5\u03AD\u03C4\u03C9 \u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "Let the servant keep untying the bond.",
      why: "Ending -\u03AD\u03C4\u03C9. Present aspect = ongoing."
    },
    "present active imperative, second plural": {
      greek: "\u03BB\u03CD\u03B5\u03C4\u03B5 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "Keep untying the bond.",
      why: "Ending -\u03B5\u03C4\u03B5. Identical in form to the 2nd-plural indicative."
    },
    "present active imperative, third plural": {
      greek: "\u03BB\u03C5\u03AD\u03C4\u03C9\u03C3\u03B1\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "Let them keep untying the bond.",
      why: "Ending -\u03AD\u03C4\u03C9\u03C3\u03B1\u03BD."
    },
    "aorist active imperative, second singular": {
      greek: "\u03BB\u1FE6\u03C3\u03BF\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "Untie the bond! (one decisive act)",
      why: "Aorist stem + -\u03C3\u03BF\u03BD. No augment. Aorist aspect = whole event."
    },
    "aorist active imperative, third singular": {
      greek: "\u03BB\u03C5\u03C3\u03AC\u03C4\u03C9 \u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "Let the servant untie the bond (once).",
      why: "Ending -\u03C3\u03AC\u03C4\u03C9. Aorist aspect."
    },
    "aorist passive imperative, second singular": {
      greek: "\u03BB\u03CD\u03B8\u03B7\u03C4\u03B9.",
      english: "Be untied!",
      why: "Aorist passive stem (\u03B8\u03B7) + imperative ending -\u03C4\u03B9."
    },
    // ── infinitive ────────────────────────────────────────
    "present infinitive": {
      greek: "\u03BA\u03B1\u03BB\u03CC\u03BD \u1F10\u03C3\u03C4\u03B9\u03BD \u03B5\u1F36\u03BD\u03B1\u03B9 \u03C0\u03B9\u03C3\u03C4\u03CC\u03BD.",
      english: "It is good to be faithful.",
      why: "Verbal noun \u2014 no person/number, only tense and voice."
    },
    "present active infinitive": {
      greek: "\u03B8\u03AD\u03BB\u03C9 \u03BB\u03CD\u03B5\u03B9\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "I want to untie the bond.",
      why: "Ending -\u03B5\u03B9\u03BD. Verbal noun functioning as object of \u03B8\u03AD\u03BB\u03C9."
    },
    "aorist passive infinitive": {
      greek: "\u03BF\u1F50 \u03B4\u03CD\u03BD\u03B1\u03C4\u03B1\u03B9 \u03BB\u03C5\u03B8\u1FC6\u03BD\u03B1\u03B9.",
      english: "He is unable to be untied.",
      why: "Aorist passive stem + -\u03BD\u03B1\u03B9."
    },
    // ── participles ───────────────────────────────────────
    "nominative singular masculine, present active participle": {
      greek: "\u1F41 \u1F00\u03BD\u1F74\u03C1 \u03BB\u03CD\u03C9\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03C7\u03B1\u03AF\u03C1\u03B5\u03B9.",
      english: "The man, while untying the bond, rejoices.",
      why: "Ending -\u03C9\u03BD (3rd decl.). Agrees with a masculine subject."
    },
    "nominative singular feminine, present active participle": {
      greek: "\u1F21 \u03B3\u03C5\u03BD\u1F74 \u03BB\u03CD\u03BF\u03C5\u03C3\u03B1 \u03C7\u03B1\u03AF\u03C1\u03B5\u03B9.",
      english: "The woman, while untying, rejoices.",
      why: "Ending -\u03BF\u03C5\u03C3\u03B1 (1st decl.)."
    },
    "nominative/accusative singular neuter, present active participle": {
      greek: "\u03C4\u1F78 \u03C4\u03AD\u03BA\u03BD\u03BF\u03BD \u03BB\u1FE6\u03BF\u03BD \u03C0\u03B1\u03AF\u03B6\u03B5\u03B9.",
      english: "The child, while loosening, plays.",
      why: "Ending -\u03BF\u03BD (3rd decl.). Nom. and acc. neuter always share one form."
    },
    "genitive singular masculine/neuter, present active participle": {
      greek: "\u1F00\u03BA\u03BF\u03CD\u03C9 \u03C4\u1F74\u03BD \u03C6\u03C9\u03BD\u1F74\u03BD \u03C4\u03BF\u1FE6 \u03BB\u03CD\u03BF\u03BD\u03C4\u03BF\u03C2.",
      english: "I hear the voice of the one untying.",
      why: "Ending -\u03BF\u03BD\u03C4\u03BF\u03C2. Masc. and neut. share this form in the genitive."
    },
    "dative singular masculine/neuter, present active participle": {
      greek: "\u03BB\u03AD\u03B3\u03C9 \u03C4\u1FF7 \u03BB\u03CD\u03BF\u03BD\u03C4\u03B9.",
      english: "I speak to the one untying.",
      why: "Ending -\u03BF\u03BD\u03C4\u03B9."
    },
    "accusative singular masculine, present active participle": {
      greek: "\u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u1F78\u03BD \u03BB\u03CD\u03BF\u03BD\u03C4\u03B1.",
      english: "I see the one untying.",
      why: "Ending -\u03BF\u03BD\u03C4\u03B1 (3rd decl., masc. acc. sg.)."
    },
    "nominative plural masculine, present active participle": {
      greek: "\u03BF\u1F31 \u03BB\u03CD\u03BF\u03BD\u03C4\u03B5\u03C2 \u03C7\u03B1\u03AF\u03C1\u03BF\u03C5\u03C3\u03B9\u03BD.",
      english: "The ones untying rejoice.",
      why: "Ending -\u03BF\u03BD\u03C4\u03B5\u03C2."
    },
    "accusative plural masculine, present active participle": {
      greek: "\u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u03BF\u1F7A\u03C2 \u03BB\u03CD\u03BF\u03BD\u03C4\u03B1\u03C2.",
      english: "I see the ones untying.",
      why: "Ending -\u03BF\u03BD\u03C4\u03B1\u03C2."
    },
    "nominative singular masculine, aorist passive participle": {
      greek: "\u03BB\u03C5\u03B8\u03B5\u1F76\u03C2 \u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u1F00\u03C0\u1FC6\u03BB\u03B8\u03B5\u03BD.",
      english: "After being untied, the servant went away.",
      why: "Ending -\u03B8\u03B5\u03AF\u03C2 \u2014 aorist passive stem + participial endings."
    },
    "nominative singular feminine, aorist passive participle": {
      greek: "\u03BB\u03C5\u03B8\u03B5\u1FD6\u03C3\u03B1 \u1F21 \u03B3\u03C5\u03BD\u1F74 \u1F00\u03C0\u1FC6\u03BB\u03B8\u03B5\u03BD.",
      english: "After being untied, the woman went away.",
      why: "Ending -\u03B8\u03B5\u1FD6\u03C3\u03B1 (1st decl. feminine)."
    },
    "nominative/accusative singular neuter, aorist passive participle": {
      greek: "\u03BB\u03C5\u03B8\u03AD\u03BD \u03C4\u1F78 \u03C4\u03AD\u03BA\u03BD\u03BF\u03BD \u1F00\u03C0\u1FC6\u03BB\u03B8\u03B5\u03BD.",
      english: "After being untied, the child went away.",
      why: "Ending -\u03B8\u03AD\u03BD. Neuter nom./acc. singular."
    },
    "genitive singular masculine/neuter, aorist passive participle": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u1F74 \u03C4\u03BF\u1FE6 \u03BB\u03C5\u03B8\u03AD\u03BD\u03C4\u03BF\u03C2 \u03B4\u03BF\u03CD\u03BB\u03BF\u03C5.",
      english: "The voice of the servant who was untied.",
      why: "Ending -\u03B8\u03AD\u03BD\u03C4\u03BF\u03C2."
    },
    "dative singular masculine/neuter, aorist passive participle": {
      greek: "\u03BB\u03AD\u03B3\u03C9 \u03C4\u1FF7 \u03BB\u03C5\u03B8\u03AD\u03BD\u03C4\u03B9.",
      english: "I speak to the one who was untied.",
      why: "Ending -\u03B8\u03AD\u03BD\u03C4\u03B9."
    },
    "accusative singular masculine, aorist passive participle": {
      greek: "\u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u1F78\u03BD \u03BB\u03C5\u03B8\u03AD\u03BD\u03C4\u03B1.",
      english: "I see the one who was untied.",
      why: "Ending -\u03B8\u03AD\u03BD\u03C4\u03B1."
    },
    "nominative plural masculine, aorist passive participle": {
      greek: "\u03BF\u1F31 \u03BB\u03C5\u03B8\u03AD\u03BD\u03C4\u03B5\u03C2 \u1F00\u03C0\u1FC6\u03BB\u03B8\u03BF\u03BD.",
      english: "The ones who were untied went away.",
      why: "Ending -\u03B8\u03AD\u03BD\u03C4\u03B5\u03C2."
    },
    "nominative singular masculine, present middle/passive participle": {
      greek: "\u1F41 \u03BB\u03C5\u03CC\u03BC\u03B5\u03BD\u03BF\u03C2 \u03C7\u03B1\u03AF\u03C1\u03B5\u03B9.",
      english: "The one being untied rejoices.",
      why: "Ending -\u03CC\u03BC\u03B5\u03BD\u03BF\u03C2. Looks like a 2-1-2 adjective (like \u1F00\u03B3\u03B1\u03B8\u03CC\u03C2)."
    },
    "genitive singular masculine/neuter, present middle/passive participle": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u1F74 \u03C4\u03BF\u1FE6 \u03BB\u03C5\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5.",
      english: "The voice of the one being untied.",
      why: "Ending -\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5."
    },
    "dative singular masculine/neuter, present middle/passive participle": {
      greek: "\u03BB\u03AD\u03B3\u03C9 \u03C4\u1FF7 \u03BB\u03C5\u03BF\u03BC\u03AD\u03BD\u1FF3.",
      english: "I speak to the one being untied.",
      why: "Ending -\u03BF\u03BC\u03AD\u03BD\u1FF3."
    },
    "accusative singular masculine, present middle/passive participle": {
      greek: "\u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u1F78\u03BD \u03BB\u03C5\u03CC\u03BC\u03B5\u03BD\u03BF\u03BD.",
      english: "I see the one being untied.",
      why: "Ending -\u03CC\u03BC\u03B5\u03BD\u03BF\u03BD."
    },
    "nominative singular masculine, present participle": {
      greek: "\u1F41 \u1F00\u03BD\u1F74\u03C1 \u1F62\u03BD \u03C3\u03BF\u03C6\u1F78\u03C2 \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B5\u03B9.",
      english: "The man, being wise, teaches.",
      why: "\u1F64\u03BD \u2014 the participle of \u03B5\u1F30\u03BC\u03AF, masc. nom. sg."
    },
    "nominative singular feminine, present participle": {
      greek: "\u1F21 \u03B3\u03C5\u03BD\u1F74 \u03BF\u1F56\u03C3\u03B1 \u03C3\u03BF\u03C6\u1F74 \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B5\u03B9.",
      english: "The woman, being wise, teaches.",
      why: "\u03BF\u1F56\u03C3\u03B1 \u2014 participle of \u03B5\u1F30\u03BC\u03AF, fem. nom. sg."
    },
    "nominative/accusative singular neuter, present participle": {
      greek: "\u03C4\u1F78 \u1F42\u03BD \u1F00\u03BB\u03B7\u03B8\u03AD\u03C2 \u1F10\u03C3\u03C4\u03B9\u03BD.",
      english: "That which exists is real.",
      why: "\u1F44\u03BD \u2014 participle of \u03B5\u1F30\u03BC\u03AF, neut. nom./acc. sg."
    },
    // ── article & pronoun forms ────────────────────────────
    "nominative singular masculine": {
      greek: "\u1F41 \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03C2 \u03B2\u03BB\u03AD\u03C0\u03B5\u03B9.",
      english: "The man sees.",
      why: "Subject-marking case, masculine, one."
    },
    "genitive singular masculine": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u1F74 \u03C4\u03BF\u1FE6 \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u03BF\u03C5.",
      english: "The voice of the man.",
      why: "Possession / source."
    },
    "genitive singular masculine/neuter": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u1F74 \u03C4\u03BF\u1FE6 \u03BB\u03CC\u03B3\u03BF\u03C5.",
      english: "The sound of the word.",
      why: "Masc. and neut. share one form in the genitive singular."
    },
    "dative singular masculine": {
      greek: "\u03B4\u03AF\u03B4\u03C9\u03BC\u03B9 \u03B4\u1FF6\u03C1\u03BF\u03BD \u03C4\u1FF7 \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u1FF3.",
      english: "I give a gift to the man.",
      why: "Indirect object / means / location."
    },
    "dative singular masculine/neuter": {
      greek: "\u03B4\u03AF\u03B4\u03C9\u03BC\u03B9 \u03B4\u1FF6\u03C1\u03BF\u03BD \u03C4\u1FF7 \u03C6\u03AF\u03BB\u1FF3.",
      english: "I give a gift to the friend.",
      why: "Masc. and neut. share one form in the dative singular."
    },
    "accusative singular masculine": {
      greek: "\u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u1F78\u03BD \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03BD.",
      english: "I see the man.",
      why: "Direct-object case, masculine, one."
    },
    "nominative plural masculine": {
      greek: "\u03BF\u1F31 \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03B9 \u03B2\u03BB\u03AD\u03C0\u03BF\u03C5\u03C3\u03B9(\u03BD).",
      english: "The men see.",
      why: "Subject-marking case, masculine, more than one."
    },
    "genitive plural (all genders)": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u1F74 \u03C4\u1FF6\u03BD \u03BC\u03B1\u03B8\u03B7\u03C4\u1FF6\u03BD.",
      english: "The voice of the students.",
      why: "The genitive plural is identical across all three genders."
    },
    "genitive plural masculine": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u1F74 \u03C4\u1FF6\u03BD \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u03C9\u03BD.",
      english: "The voice of the men.",
      why: "Genitive plural is identical across all three genders \u2014 it doesn't distinguish."
    },
    "dative plural masculine/neuter": {
      greek: "\u03BB\u03AD\u03B3\u03C9 \u03C4\u03BF\u1FD6\u03C2 \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u03BF\u03B9\u03C2.",
      english: "I speak to the men.",
      why: "Ending -\u03BF\u03B9\u03C2 for masc./neut. dative plural."
    },
    "accusative plural masculine": {
      greek: "\u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u03BF\u1F7A\u03C2 \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u03BF\u03C5\u03C2.",
      english: "I see the men.",
      why: "Ending -\u03BF\u03C5\u03C2 for masc. acc. plural."
    },
    "nominative singular feminine": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u1F74 \u1F00\u03BA\u03BF\u03CD\u03B5\u03C4\u03B1\u03B9.",
      english: "The voice is heard.",
      why: "Subject-marking case, feminine, one."
    },
    "genitive singular feminine": {
      greek: "\u1F41 \u03BB\u03CC\u03B3\u03BF\u03C2 \u03C4\u1FC6\u03C2 \u1F00\u03B3\u03AC\u03C0\u03B7\u03C2.",
      english: "The word of love.",
      why: "Possession / source, feminine."
    },
    "dative singular feminine": {
      greek: "\u03BB\u03AD\u03B3\u03C9 \u03C4\u1FC7 \u03BC\u03B7\u03C4\u03C1\u03AF.",
      english: "I speak to the mother.",
      why: "Indirect object, feminine."
    },
    "accusative singular feminine": {
      greek: "\u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u1F74\u03BD \u03BF\u1F30\u03BA\u03AF\u03B1\u03BD.",
      english: "I see the house.",
      why: "Direct-object case, feminine, one."
    },
    "nominative plural feminine": {
      greek: "\u03B1\u1F31 \u03C6\u03C9\u03BD\u03B1\u1F76 \u1F00\u03BA\u03BF\u03CD\u03BF\u03BD\u03C4\u03B1\u03B9.",
      english: "The voices are heard.",
      why: "Subject-marking case, feminine, more than one."
    },
    "dative plural feminine": {
      greek: "\u03BB\u03AD\u03B3\u03C9 \u03C4\u03B1\u1FD6\u03C2 \u03B3\u03C5\u03BD\u03B1\u03B9\u03BE\u03AF\u03BD.",
      english: "I speak to the women.",
      why: "Ending -\u03B1\u03B9\u03C2 for feminine dative plural."
    },
    "accusative plural feminine": {
      greek: "\u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u1F70\u03C2 \u03BF\u1F30\u03BA\u03AF\u03B1\u03C2.",
      english: "I see the houses.",
      why: "Ending -\u03B1\u03C2 for feminine acc. plural."
    },
    "nominative/accusative singular neuter": {
      greek: "\u03C4\u1F78 \u03C4\u03AD\u03BA\u03BD\u03BF\u03BD \u03C0\u03B1\u03AF\u03B6\u03B5\u03B9. / \u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u1F78 \u03C4\u03AD\u03BA\u03BD\u03BF\u03BD.",
      english: "The child plays. / I see the child.",
      why: "Neuter nom. and acc. singular always share one form."
    },
    "nominative/accusative plural neuter": {
      greek: "\u03C4\u1F70 \u03C4\u03AD\u03BA\u03BD\u03B1 \u03C0\u03B1\u03AF\u03B6\u03B5\u03B9. / \u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u1F70 \u03C4\u03AD\u03BA\u03BD\u03B1.",
      english: "The children play. / I see the children.",
      why: "Neuter nom. and acc. plural always share one form. Neut. pl. subjects often take a singular verb."
    },
    // ── tense-only labels (Ch 6 tense-id distractors like "imperfect (1st sg.)")
    "present first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03BB\u03CD\u03C9.",
      english: "I untie.",
      why: "Present-tense 1st sg. \u2014 no augment, no \u03C3."
    },
    "future first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03BB\u03CD\u03C3\u03C9.",
      english: "I will untie.",
      why: "\u03C3 tense marker \u2014 no augment."
    },
    "imperfect first singular": {
      greek: "\u1F10\u03B3\u1F7C \u1F14\u03BB\u03C5\u03BF\u03BD.",
      english: "I was untying.",
      why: "Augment \u1F10- + present stem + secondary ending."
    },
    "aorist first singular": {
      greek: "\u1F10\u03B3\u1F7C \u1F14\u03BB\u03C5\u03C3\u03B1.",
      english: "I untied.",
      why: "Augment + \u03C3\u03B1 (1st aorist) or different stem (2nd aorist)."
    },
    "perfect first singular": {
      greek: "\u1F10\u03B3\u1F7C \u03BB\u03AD\u03BB\u03C5\u03BA\u03B1.",
      english: "I have untied.",
      why: "Reduplication + \u03BA + \u03B1-class ending."
    },
    "aorist subjunctive, first singular": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u03C3\u03C9.",
      english: "that I may untie",
      why: "\u03C3 + long \u03C9. No augment (augment is indicative-only)."
    },
    // ── ambiguous 1sg/3pl imperfects & aorists
    "aorist active indicative, first singular or third plural": {
      greek: "\u1F26\u03BB\u03B8\u03BF\u03BD \u2014 \u1F10\u03B3\u1F7C \u1F26\u03BB\u03B8\u03BF\u03BD / \u03B1\u1F50\u03C4\u03BF\u1F76 \u1F26\u03BB\u03B8\u03BF\u03BD.",
      english: "I came / they came.",
      why: "2nd-aorist -\u03BF\u03BD ending is ambiguous between 1st sg. and 3rd pl."
    },
    // ── εἰμί non-3sg and related
    "first singular i am": {
      greek: "\u1F10\u03B3\u1F7C \u03BC\u03B1\u03B8\u03B7\u03C4\u03AE\u03C2 \u03B5\u1F30\u03BC\u03B9.",
      english: "I am a student.",
      why: "1st sg. of \u03B5\u1F30\u03BC\u03AF."
    },
    "third singular he/she/it is": {
      greek: "\u1F41 \u03BB\u03CC\u03B3\u03BF\u03C2 \u03BA\u03B1\u03BB\u03CC\u03C2 \u1F10\u03C3\u03C4\u03B9(\u03BD).",
      english: "The word is good.",
      why: "3rd sg. of \u03B5\u1F30\u03BC\u03AF."
    },
    "first plural we are": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u03BC\u03B1\u03B8\u03B7\u03C4\u03B1\u03AF \u1F10\u03C3\u03BC\u03B5\u03BD.",
      english: "We are students.",
      why: "1st pl. of \u03B5\u1F30\u03BC\u03AF."
    },
    "second singular you are": {
      greek: "\u03C3\u1F7A \u03BC\u03B1\u03B8\u03B7\u03C4\u1F74\u03C2 \u03B5\u1F36.",
      english: "You are a student.",
      why: "2nd sg. of \u03B5\u1F30\u03BC\u03AF."
    },
    "second plural you all are": {
      greek: "\u1F51\u03BC\u03B5\u1FD6\u03C2 \u03BC\u03B1\u03B8\u03B7\u03C4\u03B1\u03AF \u1F10\u03C3\u03C4\u03B5.",
      english: "You (all) are students.",
      why: "2nd pl. of \u03B5\u1F30\u03BC\u03AF."
    },
    "third plural they are": {
      greek: "\u03BF\u1F31 \u03BC\u03B1\u03B8\u03B7\u03C4\u03B1\u1F76 \u03BA\u03B1\u03BB\u03BF\u03AF \u03B5\u1F30\u03C3\u03B9(\u03BD).",
      english: "The students are good.",
      why: "3rd pl. of \u03B5\u1F30\u03BC\u03AF."
    }
  };

  // js/data/concept_examples.js
  var CONCEPT_EXAMPLES = {
    // ── Bare case names (as answers to preposition-case questions etc.)
    "nominative": {
      greek: "\u1F41 \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03C2 \u03B2\u03BB\u03AD\u03C0\u03B5\u03B9.",
      english: "The man sees.",
      why: "The nominative marks the subject. Prepositions don't take the nominative."
    },
    "genitive": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u1F74 \u03C4\u03BF\u1FE6 \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u03BF\u03C5.",
      english: "The voice of the man.",
      why: "The genitive marks possession, source, or separation."
    },
    "dative": {
      greek: "\u03BB\u03AD\u03B3\u03C9 \u03C4\u1FF7 \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u1FF3.",
      english: "I speak to the man.",
      why: "The dative marks the indirect object, location, means, or association."
    },
    "accusative": {
      greek: "\u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u1F78\u03BD \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03BD.",
      english: "I see the man.",
      why: "The accusative most often marks the direct object and goal of motion."
    },
    "vocative": {
      greek: "\u03BA\u03CD\u03C1\u03B9\u03B5, \u03B2\u03BF\u03AE\u03B8\u03B5\u03B9 \u03BC\u03BF\u03B9.",
      english: "Lord, help me!",
      why: "The vocative is the case of direct address."
    },
    // ── Case functions (Ch 3)
    "subject": {
      greek: "\u1F41 \u1F00\u03C0\u03CC\u03C3\u03C4\u03BF\u03BB\u03BF\u03C2 \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B5\u03B9.",
      english: "The apostle teaches.",
      why: "The subject is marked by the nominative, not this case."
    },
    "subject (and predicate nominative)": {
      greek: "\u1F41 \u03BB\u03CC\u03B3\u03BF\u03C2 \u1F00\u03BB\u03B7\u03B8\u03AE\u03C2 \u1F10\u03C3\u03C4\u03B9\u03BD.",
      english: "The word is true.",
      why: "The nominative marks both the subject and a predicate noun after \u03B5\u1F30\u03BC\u03AF."
    },
    "direct object": {
      greek: "\u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u1F78\u03BD \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03BD.",
      english: "I see the man.",
      why: "The direct object is marked by the accusative, not this case."
    },
    "indirect object": {
      greek: "\u03B4\u03AF\u03B4\u03C9\u03BC\u03B9 \u03B4\u1FF6\u03C1\u03BF\u03BD \u03C4\u1FF7 \u03C6\u03AF\u03BB\u1FF3.",
      english: "I give a gift to the friend.",
      why: "The indirect object is marked by the dative, not this case."
    },
    "possession": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u1F74 \u03C4\u03BF\u1FE6 \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u03BF\u03C5.",
      english: "The voice of the man.",
      why: "Possession is marked by the genitive, not this case."
    },
    "direct address": {
      greek: "\u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B1\u03BB\u03B5, \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B5 \u1F21\u03BC\u1FB6\u03C2.",
      english: "Teacher, teach us!",
      why: "Direct address is the vocative's job."
    },
    // ── Moods as answers (Ch 7, Ch 10, Ch 17)
    "indicative": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03CD\u03B5\u03B9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "The servant unties the bond.",
      why: "The indicative is the mood of actual assertion \u2014 statements and questions of fact."
    },
    "subjunctive": {
      greek: "\u1F35\u03BD\u03B1 \u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03CD\u1FC3 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "so that the servant may untie the bond",
      why: "The subjunctive marks contingent / potential action, often after \u1F35\u03BD\u03B1 or \u1F10\u03AC\u03BD."
    },
    "imperative": {
      greek: "\u03BB\u1FE6\u03C3\u03BF\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "Untie the bond!",
      why: "The imperative issues commands or prohibitions."
    },
    "infinitive": {
      greek: "\u03B8\u03AD\u03BB\u03C9 \u03BB\u03CD\u03B5\u03B9\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "I want to untie the bond.",
      why: "The infinitive is a verbal noun \u2014 no person or number."
    },
    "optative": {
      greek: "\u03BC\u1F74 \u03B3\u03AD\u03BD\u03BF\u03B9\u03C4\u03BF.",
      english: "May it not be!",
      why: "The optative expresses a wish or a remote possibility. Rare in NT Greek."
    },
    // ── Adjective / participle position (Ch 5, 14)
    "attributive": {
      greek: "\u1F41 \u1F00\u03B3\u03B1\u03B8\u1F78\u03C2 \u03BB\u03CC\u03B3\u03BF\u03C2",
      english: "the good word",
      why: "Attributive position: the adjective sits inside the article\u2013noun bracket and modifies the noun directly."
    },
    "predicate": {
      greek: "\u1F41 \u03BB\u03CC\u03B3\u03BF\u03C2 \u1F00\u03B3\u03B1\u03B8\u03CC\u03C2.",
      english: "The word is good.",
      why: "Predicate position: the adjective is outside the article\u2013noun bracket and asserts something about the noun (\u03B5\u1F30\u03BC\u03AF is often implied)."
    },
    "substantive": {
      greek: "\u03BF\u1F31 \u1F00\u03B3\u03B1\u03B8\u03BF\u03AF",
      english: "the good (people) / the good ones",
      why: "Substantive: adjective (or participle) used alone as a noun."
    },
    // ── Third-declension stem classes (Ch 12–13, W5O)
    "\u03BA-stem (a velar stem)": {
      greek: "\u03C3\u03AC\u03C1\u03BE, \u03C3\u03B1\u03C1\u03BA\u03CC\u03C2",
      english: "flesh",
      why: "Velar stem: the stem-final \u03BA (or \u03B3, \u03C7) combines with \u03C3 in the nom. sg. to give \u03BE."
    },
    "\u03BA-stem": {
      greek: "\u03C3\u03AC\u03C1\u03BE, \u03C3\u03B1\u03C1\u03BA\u03CC\u03C2",
      english: "flesh",
      why: "Velar stem: \u03BA/\u03B3/\u03C7 + \u03C3 \u2192 \u03BE in the nominative."
    },
    "\u03BD-stem": {
      greek: "\u03C0\u03BF\u03B9\u03BC\u03AE\u03BD, \u03C0\u03BF\u03B9\u03BC\u03AD\u03BD\u03BF\u03C2",
      english: "shepherd",
      why: "\u03BD-stem: the stem ends in \u03BD; the dative plural drops it."
    },
    "\u03BD\u03C4-stem": {
      greek: "\u1F04\u03C1\u03C7\u03C9\u03BD, \u1F04\u03C1\u03C7\u03BF\u03BD\u03C4\u03BF\u03C2",
      english: "ruler",
      why: "\u03BD\u03C4-stem: the \u03BD\u03C4 drops before \u03C3 in the nom. sg. and dat. pl."
    },
    "\u03BC\u03B1\u03C4-stem (neuter)": {
      greek: "\u03C0\u03BD\u03B5\u1FE6\u03BC\u03B1, \u03C0\u03BD\u03B5\u03CD\u03BC\u03B1\u03C4\u03BF\u03C2",
      english: "spirit, breath",
      why: "\u03BC\u03B1\u03C4-stem neuters: nom./acc. sg. drops the final \u03C4; the genitive reveals the full stem."
    },
    "\u03C3-stem (neuter)": {
      greek: "\u03B3\u03AD\u03BD\u03BF\u03C2, \u03B3\u03AD\u03BD\u03BF\u03C5\u03C2",
      english: "race, kind",
      why: "\u03C3-stem neuter: intervocalic \u03C3 drops and the result contracts (\u03B3\u03B5\u03BD\u03B5-\u03BF\u03C2 \u2192 \u03B3\u03AD\u03BD\u03BF\u03C5\u03C2)."
    },
    "\u03C3-stem": {
      greek: "\u03B3\u03AD\u03BD\u03BF\u03C2, \u03B3\u03AD\u03BD\u03BF\u03C5\u03C2",
      english: "race, kind",
      why: "\u03C3-stem: intervocalic \u03C3 drops between vowels and the result contracts."
    },
    "\u03B9-stem": {
      greek: "\u03C0\u03CC\u03BB\u03B9\u03C2, \u03C0\u03CC\u03BB\u03B5\u03C9\u03C2",
      english: "city",
      why: "\u03B9-stem: distinctive -\u03B5\u03C9\u03C2 genitive rather than -\u03BF\u03C2."
    },
    "\u03B5\u03C5-stem (masc.)": {
      greek: "\u03B2\u03B1\u03C3\u03B9\u03BB\u03B5\u03CD\u03C2, \u03B2\u03B1\u03C3\u03B9\u03BB\u03AD\u03C9\u03C2",
      english: "king",
      why: "\u03B5\u03C5-stem masculine: long-vowel genitive -\u03AD\u03C9\u03C2 like \u03B9-stems."
    },
    // ── Voice meanings (Ch 15)
    "the subject performs the action": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03CD\u03B5\u03B9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "The servant unties the bond.",
      why: "That is the active voice. The subject acts on someone/something else."
    },
    "the subject receives the action": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03CD\u03B5\u03C4\u03B1\u03B9 (\u1F51\u03C0\u1F78 \u03C4\u03BF\u1FE6 \u03BA\u03C5\u03C1\u03AF\u03BF\u03C5).",
      english: "The servant is untied (by the master).",
      why: "That is the passive voice. The subject is acted upon."
    },
    "the subject acts on / for itself": {
      greek: "\u03BB\u03BF\u03CD\u03BF\u03BC\u03B1\u03B9.",
      english: "I wash myself.",
      why: "That is the middle voice \u2014 the subject is involved in the action as agent and beneficiary."
    },
    "the subject acts on itself": {
      greek: "\u03BB\u03BF\u03CD\u03BF\u03BC\u03B1\u03B9.",
      english: "I wash myself.",
      why: "That describes the middle voice, not this one."
    },
    "the subject is acted upon": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03CD\u03B5\u03C4\u03B1\u03B9.",
      english: "The servant is being untied.",
      why: "That describes the passive voice."
    },
    "the subject performs the action on someone else": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03CD\u03B5\u03B9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "The servant unties the bond.",
      why: "That describes the active voice."
    },
    // ── Near/far demonstratives (Ch 9, W3O)
    "near ('this')": {
      greek: "\u03BF\u1F57\u03C4\u03BF\u03C2 \u1F41 \u1F00\u03C0\u03CC\u03C3\u03C4\u03BF\u03BB\u03BF\u03C2",
      english: "this apostle",
      why: "\u03BF\u1F57\u03C4\u03BF\u03C2 is the near demonstrative."
    },
    "far ('that')": {
      greek: "\u1F10\u03BA\u03B5\u1FD6\u03BD\u03BF\u03C2 \u1F41 \u1F00\u03C0\u03CC\u03C3\u03C4\u03BF\u03BB\u03BF\u03C2",
      english: "that apostle",
      why: "\u1F10\u03BA\u03B5\u1FD6\u03BD\u03BF\u03C2 is the far demonstrative."
    },
    // ── Aspect descriptions (Ch 6, 16)
    "the aorist": {
      greek: "\u1F14\u03BB\u03C5\u03C3\u03B1 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "I untied the bond.",
      why: "Aorist aspect views the action from outside as a whole event."
    },
    "the present (and the imperfect in past time)": {
      greek: "\u03BB\u03CD\u03C9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD. / \u1F14\u03BB\u03C5\u03BF\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "I am untying the bond. / I was untying the bond.",
      why: "Imperfective aspect views the action from inside, in progress."
    },
    "the perfect": {
      greek: "\u03BB\u03AD\u03BB\u03C5\u03BA\u03B1 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "I have untied the bond (and it stays untied).",
      why: "Perfect aspect: completed action with persisting result."
    },
    // ── Square of stops outputs (Ch 15)
    "\u03BE": {
      greek: "\u1F04\u03B3\u03C9 \u2192 \u1F04\u03BE\u03C9",
      english: "I lead \u2192 I will lead",
      why: "\u03BE is the result of velar (\u03BA/\u03B3/\u03C7) + \u03C3."
    },
    "\u03C8": {
      greek: "\u03C0\u03AD\u03BC\u03C0\u03C9 \u2192 \u03C0\u03AD\u03BC\u03C8\u03C9",
      english: "I send \u2192 I will send",
      why: "\u03C8 is the result of labial (\u03C0/\u03B2/\u03C6) + \u03C3."
    },
    // ── Conditional mood choices (Ch 10)
    "\u1F35\u03BD\u03B1 + subj.": {
      greek: "\u1F35\u03BD\u03B1 \u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03CD\u03C3\u1FC3 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD",
      english: "so that the servant may untie the bond",
      why: "\u1F35\u03BD\u03B1 normally takes the subjunctive."
    },
    // ── -μι vs -ω verb class (Ch 19)
    "-\u03BC\u03B9 verb (athematic)": {
      greek: "\u03B4\u03AF\u03B4\u03C9\u03BC\u03B9, \u03B4\u03AF\u03B4\u03BF\u03BC\u03B5\u03BD",
      english: "I give, we give",
      why: "-\u03BC\u03B9 verbs attach endings directly to the stem with no thematic vowel."
    },
    "-\u03C9 verb (thematic)": {
      greek: "\u03BB\u03CD\u03C9, \u03BB\u03CD\u03BF\u03BC\u03B5\u03BD",
      english: "I untie, we untie",
      why: "-\u03C9 verbs insert a thematic vowel (\u03BF/\u03B5) between stem and ending."
    },
    "\u03B5-contract verb": {
      greek: "\u03C6\u03B9\u03BB\u03AD\u03C9 \u2192 \u03C6\u03B9\u03BB\u1FF6",
      english: "I love",
      why: "\u03B5-contract: stem-final \u03B5 contracts with the thematic vowel."
    },
    "\u03B1-contract verb": {
      greek: "\u1F00\u03B3\u03B1\u03C0\u03AC\u03C9 \u2192 \u1F00\u03B3\u03B1\u03C0\u1FF6",
      english: "I love",
      why: "\u03B1-contract: stem-final \u03B1 contracts with the thematic vowel."
    },
    // ── Gender (Ch 3)
    "masculine": {
      greek: "\u1F41 \u03BB\u03CC\u03B3\u03BF\u03C2",
      english: "the word (masculine)",
      why: "Masculine article \u1F41. Most 2nd-decl. -\u03BF\u03C2 nouns are masculine."
    },
    "feminine": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u03AE",
      english: "the voice (feminine)",
      why: "Feminine article \u1F21. 1st-decl. nouns are nearly all feminine."
    },
    "neuter": {
      greek: "\u03C4\u1F78 \u1F14\u03C1\u03B3\u03BF\u03BD",
      english: "the work (neuter)",
      why: "Neuter article \u03C4\u03CC. 2nd-decl. -\u03BF\u03BD nouns are neuter."
    },
    "common (M+F)": {
      greek: "\u1F41 / \u1F21 \u03C0\u03B1\u1FD6\u03C2",
      english: "the boy / the girl",
      why: "A few nouns share one form for masculine and feminine, using the article to disambiguate."
    },
    "usually feminine": {
      greek: "\u1F21 \u1F00\u03C1\u03C7\u03AE, \u1F21 \u03BA\u03B1\u03C1\u03B4\u03AF\u03B1",
      english: "the beginning, the heart",
      why: "1st-declension nouns (with a few exceptions like \u1F41 \u03BD\u03B5\u03B1\u03BD\u03AF\u03B1\u03C2) are feminine."
    },
    "usually neuter": {
      greek: "\u03C4\u1F78 \u1F14\u03C1\u03B3\u03BF\u03BD, \u03C4\u1F78 \u03C4\u03AD\u03BA\u03BD\u03BF\u03BD",
      english: "the work, the child",
      why: "Pattern for 2nd-declension -\u03BF\u03BD endings."
    },
    "no gender pattern": {
      greek: "\u1F41 \u1F04\u03C1\u03C7\u03C9\u03BD vs \u1F21 \u1F10\u03BB\u03C0\u03AF\u03C2",
      english: "the ruler vs. the hope",
      why: "Applies to 3rd-declension endings, where gender must be learned with the noun \u2014 not here."
    },
    // ── Mood functions (Ch 7)
    "a statement or question of fact": {
      greek: "\u1F41 \u1F00\u03C0\u03CC\u03C3\u03C4\u03BF\u03BB\u03BF\u03C2 \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B5\u03B9.",
      english: "The apostle teaches.",
      why: "That is the indicative mood's job."
    },
    "a command or prohibition": {
      greek: "\u03BB\u1FE6\u03C3\u03BF\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD. / \u03BC\u1F74 \u03BB\u03CD\u03B5.",
      english: "Untie the bond! / Don't be untying!",
      why: "That is the imperative mood (or \u03BC\u03AE + subjunctive for prohibitions)."
    },
    "a contingent / potential action (often after \u1F35\u03BD\u03B1, \u1F10\u03AC\u03BD)": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u1FC3 / \u1F10\u1F70\u03BD \u03BB\u03CD\u1FC3",
      english: "that he may untie / if he unties",
      why: "That is the subjunctive's role."
    },
    "a verbal noun": {
      greek: "\u03B8\u03AD\u03BB\u03C9 \u03BB\u03CD\u03B5\u03B9\u03BD.",
      english: "I want to untie.",
      why: "That is the infinitive \u2014 acts like a noun but carries tense and voice."
    },
    "a verbal adjective": {
      greek: "\u1F41 \u03BB\u03CD\u03C9\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD",
      english: "the one untying the bond",
      why: "That is the participle \u2014 acts like an adjective but carries tense and voice."
    },
    "a command": {
      greek: "\u03BB\u1FE6\u03C3\u03BF\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "Untie the bond!",
      why: "That is the imperative mood."
    },
    "a fact": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03CD\u03B5\u03B9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "The servant unties the bond.",
      why: "Indicative territory \u2014 statements and questions of fact."
    },
    "a wish": {
      greek: "\u03BC\u1F74 \u03B3\u03AD\u03BD\u03BF\u03B9\u03C4\u03BF.",
      english: "May it not be!",
      why: "That is the optative's job."
    },
    "a potential / contingent action": {
      greek: "\u1F10\u1F70\u03BD \u03BB\u03CD\u1FC3",
      english: "if he unties",
      why: "Subjunctive territory."
    },
    "a completed action with present results": {
      greek: "\u03B3\u03AD\u03B3\u03C1\u03B1\u03C0\u03C4\u03B1\u03B9.",
      english: "It has been written / it stands written.",
      why: "That is what the perfect tense conveys."
    },
    "a simple fact": {
      greek: "\u1F41 \u03BB\u03CC\u03B3\u03BF\u03C2 \u1F00\u03BB\u03B7\u03B8\u03AE\u03C2 \u1F10\u03C3\u03C4\u03B9\u03BD.",
      english: "The word is true.",
      why: "Indicative territory."
    },
    "a finite verb": {
      greek: "\u03BB\u03CD\u03B5\u03B9, \u1F14\u03BB\u03C5\u03C3\u03B5\u03BD, \u03BB\u03AD\u03BB\u03C5\u03BA\u03B5\u03BD",
      english: "he unties, he untied, he has untied",
      why: "A finite verb has person and number; infinitives and participles don't."
    },
    "a particle": {
      greek: "\u03BC\u03AD\u03BD, \u03B4\u03AD, \u03B3\u03AC\u03C1, \u03BF\u1F56\u03BD",
      english: "(untranslated nuance words)",
      why: "Particles are short uninflected words that shade a clause \u2014 not what's being parsed here."
    },
    "an interjection": {
      greek: "\u1F30\u03B4\u03BF\u03CD, \u03BF\u1F50\u03B1\u03AF",
      english: "behold, woe",
      why: "Interjections stand apart from the syntax \u2014 not this category."
    },
    // ── Preposition meanings (Ch 4)
    "into": {
      greek: "\u03B5\u1F30\u03C2 \u03C4\u1F74\u03BD \u03BF\u1F30\u03BA\u03AF\u03B1\u03BD",
      english: "into the house",
      why: "\u03B5\u1F30\u03C2 + accusative expresses motion into."
    },
    "in / within": {
      greek: "\u1F10\u03BD \u03C4\u1FC7 \u03BF\u1F30\u03BA\u03AF\u1FB3",
      english: "in the house",
      why: "\u1F10\u03BD + dative expresses location within."
    },
    "out of": {
      greek: "\u1F10\u03BA \u03C4\u1FC6\u03C2 \u03BF\u1F30\u03BA\u03AF\u03B1\u03C2",
      english: "out of the house",
      why: "\u1F10\u03BA + genitive expresses motion out of."
    },
    "from": {
      greek: "\u1F00\u03C0\u1F78 \u03C4\u03BF\u1FE6 \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u03BF\u03C5",
      english: "from the man",
      why: "\u1F00\u03C0\u03CC + genitive expresses separation."
    },
    "with": {
      greek: "\u03BC\u03B5\u03C4\u1F70 \u03C4\u1FF6\u03BD \u03BC\u03B1\u03B8\u03B7\u03C4\u1FF6\u03BD / \u03C3\u1F7A\u03BD \u03B1\u1F50\u03C4\u03BF\u1FD6\u03C2",
      english: "with the students / with them",
      why: "\u03BC\u03B5\u03C4\u03AC + gen. or \u03C3\u03CD\u03BD + dat. expresses association."
    },
    "after": {
      greek: "\u03BC\u03B5\u03C4\u1F70 \u03B4\u03CD\u03BF \u1F21\u03BC\u03AD\u03C1\u03B1\u03C2",
      english: "after two days",
      why: "\u03BC\u03B5\u03C4\u03AC + accusative expresses time-after."
    },
    "before": {
      greek: "\u03C0\u03C1\u1F78 \u03C4\u1FC6\u03C2 \u1F21\u03BC\u03AD\u03C1\u03B1\u03C2",
      english: "before the day",
      why: "\u03C0\u03C1\u03CC + genitive expresses time-before."
    },
    "above": {
      greek: "\u1F51\u03C0\u1F72\u03C1 \u03C4\u1F70\u03C2 \u03BD\u03B5\u03C6\u03AD\u03BB\u03B1\u03C2",
      english: "above the clouds",
      why: "\u1F51\u03C0\u03AD\u03C1 + accusative (rare in NT) can mean above or beyond."
    },
    "above (location)": {
      greek: "\u1F51\u03C0\u1F72\u03C1 \u03C4\u1F70\u03C2 \u03BD\u03B5\u03C6\u03AD\u03BB\u03B1\u03C2",
      english: "above the clouds",
      why: "\u1F51\u03C0\u03AD\u03C1 + accusative can mean above."
    },
    "under (location)": {
      greek: "\u1F51\u03C0\u1F78 \u03C4\u1F78\u03BD \u03BF\u1F50\u03C1\u03B1\u03BD\u03CC\u03BD",
      english: "under heaven",
      why: "\u1F51\u03C0\u03CC + accusative can describe motion/location under."
    },
    "on behalf of": {
      greek: "\u1F51\u03C0\u1F72\u03C1 \u1F21\u03BC\u1FF6\u03BD",
      english: "on our behalf",
      why: "\u1F51\u03C0\u03AD\u03C1 + genitive expresses 'on behalf of', 'for the sake of'."
    },
    "on behalf of, for the sake of": {
      greek: "\u1F51\u03C0\u1F72\u03C1 \u1F21\u03BC\u1FF6\u03BD",
      english: "on our behalf",
      why: "\u1F51\u03C0\u03AD\u03C1 + genitive."
    },
    "by (agent of a passive verb)": {
      greek: "\u1F10\u03BB\u03CD\u03B8\u03B7 \u1F51\u03C0\u1F78 \u03C4\u03BF\u1FE6 \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u03BF\u03C5.",
      english: "He was untied by the man.",
      why: "\u1F51\u03C0\u03CC + genitive marks the personal agent of a passive verb."
    },
    "by (agent)": {
      greek: "\u1F51\u03C0\u1F78 \u03C4\u03BF\u1FE6 \u1F00\u03BD\u03B8\u03C1\u03CE\u03C0\u03BF\u03C5",
      english: "by the man",
      why: "\u1F51\u03C0\u03CC + genitive marks the agent of a passive verb."
    },
    "through (means or agency)": {
      greek: "\u03B4\u03B9\u1F70 \u03C4\u03BF\u1FE6 \u1F00\u03C0\u03BF\u03C3\u03C4\u03CC\u03BB\u03BF\u03C5",
      english: "through the apostle",
      why: "\u03B4\u03B9\u03AC + genitive expresses means/agency."
    },
    "because of, on account of": {
      greek: "\u03B4\u03B9\u1F70 \u03C4\u1F74\u03BD \u1F00\u03B3\u03AC\u03C0\u03B7\u03BD",
      english: "because of love",
      why: "\u03B4\u03B9\u03AC + accusative expresses cause or reason."
    },
    "down from / against": {
      greek: "\u03BA\u03B1\u03C4\u1F70 \u03C4\u03BF\u1FE6 \u1F44\u03C1\u03BF\u03C5\u03C2 / \u03BA\u03B1\u03C4' \u1F10\u03BC\u03BF\u1FE6",
      english: "down from the mountain / against me",
      why: "\u03BA\u03B1\u03C4\u03AC + genitive can mean 'down from' or 'against'."
    },
    "according to / throughout": {
      greek: "\u03BA\u03B1\u03C4\u1F70 \u039C\u1FB6\u03C1\u03BA\u03BF\u03BD / \u03BA\u03B1\u03B8' \u1F21\u03BC\u03AD\u03C1\u03B1\u03BD",
      english: "according to Mark / throughout the day",
      why: "\u03BA\u03B1\u03C4\u03AC + accusative."
    },
    "with (in company with)": {
      greek: "\u03BC\u03B5\u03C4\u1F70 \u03C4\u1FF6\u03BD \u03BC\u03B1\u03B8\u03B7\u03C4\u1FF6\u03BD",
      english: "with the students",
      why: "\u03BC\u03B5\u03C4\u03AC + genitive (association)."
    },
    "after (in time)": {
      greek: "\u03BC\u03B5\u03C4\u1F70 \u03B4\u03CD\u03BF \u1F21\u03BC\u03AD\u03C1\u03B1\u03C2",
      english: "after two days",
      why: "\u03BC\u03B5\u03C4\u03AC + accusative (time)."
    },
    // ── Conjunction types (Ch 9)
    "'and' / 'also' (additive)": {
      greek: "\u1F41 \u03A0\u03AD\u03C4\u03C1\u03BF\u03C2 \u03BA\u03B1\u1F76 \u1F41 \u1F38\u03C9\u03AC\u03BD\u03BD\u03B7\u03C2",
      english: "Peter and John",
      why: "\u03BA\u03B1\u03AF is the additive conjunction."
    },
    "'but' (adversative)": {
      greek: "\u1F10\u03B3\u1F7C \u03BC\u1F72\u03BD \u03B2\u03BB\u03AD\u03C0\u03C9, \u03C3\u1F7A \u03B4\u1F72 \u03BF\u1F54.",
      english: "I see, but you do not.",
      why: "\u03B4\u03AD or \u1F00\u03BB\u03BB\u03AC signals contrast."
    },
    "'for' (causal)": {
      greek: "\u03B8\u03B1\u03C5\u03BC\u03AC\u03B6\u03C9\xB7 \u03B3\u03AD\u03B3\u03C1\u03B1\u03C0\u03C4\u03B1\u03B9 \u03B3\u03AC\u03C1\u2026",
      english: "I marvel, for it is written\u2026",
      why: "\u03B3\u03AC\u03C1 is the explanatory / causal particle (postpositive)."
    },
    "'therefore' (inferential)": {
      greek: "\u03B5\u1F36\u03C0\u03B5\u03BD \u03BF\u1F56\u03BD \u1F41 \u1F38\u03B7\u03C3\u03BF\u1FE6\u03C2\u2026",
      english: "Therefore Jesus said\u2026",
      why: "\u03BF\u1F56\u03BD is the inferential particle (postpositive)."
    },
    "'for' \u2014 strong causal": {
      greek: "\u03B3\u03AD\u03B3\u03C1\u03B1\u03C0\u03C4\u03B1\u03B9 \u03B3\u03AC\u03C1\u2026",
      english: "for it is written\u2026",
      why: "\u03B3\u03AC\u03C1 is causal but relatively light \u2014 not always 'strong'."
    },
    "'therefore' \u2014 inferential": {
      greek: "\u03B5\u1F36\u03C0\u03B5\u03BD \u03BF\u1F56\u03BD\u2026",
      english: "Therefore he said\u2026",
      why: "\u03BF\u1F56\u03BD draws an inference."
    },
    "'because' \u2014 subordinating": {
      greek: "\u03C7\u03B1\u03AF\u03C1\u03C9 \u1F45\u03C4\u03B9 \u1F26\u03BB\u03B8\u03B5\u03C2.",
      english: "I rejoice because you came.",
      why: "Subordinating causal is \u1F45\u03C4\u03B9 or \u03B4\u03B9\u03CC\u03C4\u03B9 \u2014 not this one."
    },
    "'but' / 'and' \u2014 mild adversative or transitional, postpositive": {
      greek: "\u1F41 \u03B4\u1F72 \u1F00\u03C0\u03CC\u03C3\u03C4\u03BF\u03BB\u03BF\u03C2 \u03B5\u1F36\u03C0\u03B5\u03BD\u2026",
      english: "But the apostle said\u2026",
      why: "\u03B4\u03AD is mild \u2014 contrast or transition, postpositive."
    },
    "'for' \u2014 explanatory / causal, postpositive": {
      greek: "\u03B3\u03AD\u03B3\u03C1\u03B1\u03C0\u03C4\u03B1\u03B9 \u03B3\u03AC\u03C1\u2026",
      english: "for it is written\u2026",
      why: "\u03B3\u03AC\u03C1 gives the reason for what just came before."
    },
    "'therefore' / 'so' \u2014 inferential, postpositive": {
      greek: "\u03B5\u1F36\u03C0\u03B5\u03BD \u03BF\u1F56\u03BD\u2026",
      english: "Therefore he said\u2026",
      why: "\u03BF\u1F56\u03BD draws an inference from what precedes."
    },
    // ── Personal pronouns (Ch 9 and W3O)
    "1st person singular nominative ('I')": {
      greek: "\u1F10\u03B3\u03CE",
      english: "I",
      why: "1st-sg. nominative personal pronoun."
    },
    "1st person plural nominative ('we')": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2",
      english: "we",
      why: "1st-pl. nominative."
    },
    "2nd person singular nominative ('you')": {
      greek: "\u03C3\u03CD",
      english: "you (sg.)",
      why: "2nd-sg. nominative."
    },
    "2nd person plural nominative ('you all')": {
      greek: "\u1F51\u03BC\u03B5\u1FD6\u03C2",
      english: "you (pl.)",
      why: "2nd-pl. nominative."
    },
    "3rd person singular masculine ('he')": {
      greek: "\u03B1\u1F50\u03C4\u03CC\u03C2",
      english: "he / himself",
      why: "3rd-sg. masc. nominative of \u03B1\u1F50\u03C4\u03CC\u03C2."
    },
    "3rd person plural nominative ('they')": {
      greek: "\u03B1\u1F50\u03C4\u03BF\u03AF",
      english: "they (masc.)",
      why: "3rd-pl. masc. nominative."
    },
    "3rd person plural masculine ('they')": {
      greek: "\u03B1\u1F50\u03C4\u03BF\u03AF",
      english: "they (masc.)",
      why: "3rd-pl. masc. nominative."
    },
    // ── Contract-verb outputs (Ch 8)
    "\u03B7": {
      greek: "\u03B1 + \u03B5 \u2192 \u03B1 (long), not \u03B7 here",
      english: "",
      why: "\u03B7 is the typical \u03B5-contract output only for \u03B5 + \u03B1/\u03B7 combinations \u2014 not the pairs asked about."
    },
    "\u03C9": {
      greek: "\u03B1 + \u03BF \u2192 \u03C9, or \u03B5 + \u03C9 \u2192 \u03C9",
      english: "",
      why: "\u03C9 is the contract output when long-o stays long (e.g. \u1F00\u03B3\u03B1\u03C0\u03AC\u03BF\u03BC\u03B5\u03BD \u2192 \u1F00\u03B3\u03B1\u03C0\u1FF6\u03BC\u03B5\u03BD)."
    },
    "\u03BF\u03C5": {
      greek: "\u03B5 + \u03BF \u2192 \u03BF\u03C5, or \u03BF + \u03B5/\u03BF \u2192 \u03BF\u03C5",
      english: "",
      why: "\u03BF\u03C5 is the standard mid-short contract for \u03B5+\u03BF and for \u03BF-contracts in \u03BF+\u03B5/\u03BF+\u03BF."
    },
    "\u03B5\u03B9": {
      greek: "\u03B5 + \u03B5 \u2192 \u03B5\u03B9",
      english: "",
      why: "\u03B5\u03B9 is the contract of \u03B5+\u03B5 (and \u03B5+\u03B5\u03B9)."
    },
    "\u03BF\u03B9": {
      greek: "",
      english: "",
      why: "\u03BF\u03B9 is not the contraction result for the vowel pairs being tested here."
    },
    // ── Participle grammatical features (Ch 14)
    "tense, voice, and the ability to take an object": {
      greek: "\u03BB\u03CD\u03BF\u03BD\u03C4\u03B1 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD (participle + accusative object)",
      english: "untying the bond",
      why: "Participles share these features with verbs."
    },
    "case, gender, and number \u2014 and it agrees with a noun": {
      greek: "\u1F41 \u03BB\u03CD\u03C9\u03BD \u1F00\u03C0\u03CC\u03C3\u03C4\u03BF\u03BB\u03BF\u03C2 / \u03C4\u03BF\u1F7A\u03C2 \u03BB\u03CD\u03BF\u03BD\u03C4\u03B1\u03C2 \u1F00\u03C0\u03BF\u03C3\u03C4\u03CC\u03BB\u03BF\u03C5\u03C2",
      english: "the untying apostle / the untying apostles (acc.)",
      why: "Participles share these features with adjectives."
    },
    "person and mood": {
      greek: "\u03BB\u03CD\u03B5\u03B9 (3rd person, indicative)",
      english: "he unties",
      why: "Person and mood belong to finite verbs \u2014 participles have neither."
    },
    "person and number": {
      greek: "\u03BB\u03CD\u03BF\u03BC\u03B5\u03BD (1st person plural)",
      english: "we untie",
      why: "Person belongs to finite verbs, not participles."
    },
    "only gender and number": {
      greek: "\u1F41 \u1F00\u03B3\u03B1\u03B8\u03CC\u03C2 / \u03BF\u1F31 \u1F00\u03B3\u03B1\u03B8\u03BF\u03AF",
      english: "the good one / the good ones",
      why: "Participles agree in case too, not just gender and number."
    },
    "only case": {
      greek: "",
      english: "",
      why: "Participles agree with their noun in case, gender, and number \u2014 not case alone."
    },
    "mood only": {
      greek: "",
      english: "",
      why: "Mood is a verbal feature, but participles share more than mood with verbs."
    },
    // ── Relative-pronoun agreement (Ch 9, W4O)
    "gender and number (its case is set by its own clause)": {
      greek: "\u1F41 \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03C2 \u1F43\u03BD \u03B5\u1F36\u03B4\u03BF\u03BD",
      english: "the man whom I saw",
      why: "Relative takes its case from its own clause (here: acc. direct object of \u03B5\u1F36\u03B4\u03BF\u03BD)."
    },
    // ── Aorist-passive marker distractors (Ch 15)
    "the augment \u03B5- alone": {
      greek: "\u1F14\u03BB\u03C5\u03C3\u03B1 (augment, but not passive)",
      english: "I untied",
      why: "The augment by itself only flags past time in the indicative, not the passive voice."
    },
    "the \u03C3 before the ending": {
      greek: "\u03BB\u03CD\u03C3\u03C9 (future active)",
      english: "I will untie",
      why: "\u03C3 marks the future or 1st aorist active \u2014 not the aorist passive."
    },
    "the \u03BA before the ending": {
      greek: "\u03BB\u03AD\u03BB\u03C5\u03BA\u03B1 (perfect active)",
      english: "I have untied",
      why: "\u03BA is the perfect-active marker."
    },
    // ── Clause-type distractors (Ch 10, 17, W7O, 20)
    "a purpose clause \u2014 'in order that \u2026'": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u03C3\u1FC3",
      english: "in order that he might untie",
      why: "Purpose is \u1F35\u03BD\u03B1 (or less often \u1F45\u03C0\u03C9\u03C2) + subjunctive."
    },
    "a result clause \u2014 'so that \u2026'": {
      greek: "\u1F65\u03C3\u03C4\u03B5 \u03BB\u03C5\u03B8\u1FC6\u03BD\u03B1\u03B9",
      english: "so as to be untied",
      why: "Result is \u1F65\u03C3\u03C4\u03B5 + indicative (actual result) or + infinitive (natural result)."
    },
    "a temporal clause \u2014 'when \u2026'": {
      greek: "\u1F45\u03C4\u03B5 \u1F26\u03BB\u03B8\u03B5\u03BD",
      english: "when he came",
      why: "Definite temporal is \u1F45\u03C4\u03B5 + indicative; indefinite is \u1F45\u03C4\u03B1\u03BD + subjunctive."
    },
    "an indirect statement \u2014 'that \u2026'": {
      greek: "\u03B5\u1F36\u03C0\u03B5\u03BD \u1F45\u03C4\u03B9 \u1F41 \u03BA\u03CD\u03C1\u03B9\u03BF\u03C2 \u1F10\u03BB\u03AE\u03BB\u03C5\u03B8\u03B5\u03BD.",
      english: "He said that the Lord has come.",
      why: "\u1F45\u03C4\u03B9 + indicative is the standard NT indirect statement."
    },
    "indirect statement": {
      greek: "\u03B5\u1F36\u03C0\u03B5\u03BD \u1F45\u03C4\u03B9 \u1F41 \u03BA\u03CD\u03C1\u03B9\u03BF\u03C2 \u1F10\u03BB\u03AE\u03BB\u03C5\u03B8\u03B5\u03BD.",
      english: "He said that the Lord has come.",
      why: "\u1F45\u03C4\u03B9 + indicative \u2014 reporting what was said."
    },
    "result clause": {
      greek: "\u1F65\u03C3\u03C4\u03B5 \u03BB\u03C5\u03B8\u1FC6\u03BD\u03B1\u03B9",
      english: "so as to be untied",
      why: "\u1F65\u03C3\u03C4\u03B5 + infinitive (or indicative)."
    },
    "conditional protasis": {
      greek: "\u03B5\u1F30 \u03BB\u03CD\u03B5\u03B9 / \u1F10\u1F70\u03BD \u03BB\u03CD\u03C3\u1FC3",
      english: "if he unties / if he should untie",
      why: "The protasis is the 'if' clause \u2014 \u03B5\u1F30 + indicative (first-class) or \u1F10\u03AC\u03BD + subjunctive (third-class)."
    },
    "a definite relative \u2014 'who unties'": {
      greek: "\u1F41 \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03C2 \u1F43\u03C2 \u03BB\u03CD\u03B5\u03B9",
      english: "the man who unties",
      why: "Plain relative pronoun + indicative \u2014 a specific known person/thing."
    },
    "a temporal clause \u2014 'whenever he untied'": {
      greek: "\u1F41\u03C3\u03AC\u03BA\u03B9\u03C2 \u1F14\u03BB\u03C5\u03B5\u03BD",
      english: "as often as he was untying",
      why: "That's a past iterative; the subjunctive here would give general 'whenever' sense in present/future time."
    },
    "a definite past \u2014 'when (it happened)'": {
      greek: "\u1F45\u03C4\u03B5 \u1F26\u03BB\u03B8\u03B5\u03BD",
      english: "when he came",
      why: "\u1F45\u03C4\u03B5 + indicative points to a specific past moment, not a general one."
    },
    "a purpose \u2014 'in order that'": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u03C3\u1FC3",
      english: "in order that he may untie",
      why: "Purpose uses \u1F35\u03BD\u03B1 + subjunctive \u2014 no \u1F04\u03BD."
    },
    "a result \u2014 'so that'": {
      greek: "\u1F65\u03C3\u03C4\u03B5 \u03BB\u03C5\u03B8\u1FC6\u03BD\u03B1\u03B9",
      english: "so as to be untied",
      why: "Result uses \u1F65\u03C3\u03C4\u03B5, not \u1F45\u03C4\u03B1\u03BD."
    },
    "'although'": {
      greek: "\u03BA\u03B1\u03AF\u03C0\u03B5\u03C1 \u1F62\u03BD \u03C5\u1F31\u03CC\u03C2",
      english: "although being a son",
      why: "Concessive 'although' is \u03BA\u03B1\u03AF\u03C0\u03B5\u03C1 + participle, or \u03B5\u1F30 \u03BA\u03B1\u03AF + indicative."
    },
    "'when'": {
      greek: "\u1F45\u03C4\u03B5 \u1F26\u03BB\u03B8\u03B5\u03BD",
      english: "when he came",
      why: "Definite 'when' is \u1F45\u03C4\u03B5 + indicative \u2014 a different word from \u1F45\u03C4\u03B9."
    },
    "'unless'": {
      greek: "\u1F10\u1F70\u03BD \u03BC\u03AE",
      english: "unless",
      why: "'Unless' is \u1F10\u1F70\u03BD \u03BC\u03AE \u2014 subjunctive-based."
    },
    // ── Adjective-position translations (Ch 5)
    "attributive \u2014 'the good word'": {
      greek: "\u1F41 \u1F00\u03B3\u03B1\u03B8\u1F78\u03C2 \u03BB\u03CC\u03B3\u03BF\u03C2",
      english: "the good word",
      why: "Attributive position: article + adjective + noun, or noun + repeated article + adjective."
    },
    "attributive (article\u2013adj\u2013noun)": {
      greek: "\u1F41 \u1F00\u03B3\u03B1\u03B8\u1F78\u03C2 \u03BB\u03CC\u03B3\u03BF\u03C2",
      english: "the good word",
      why: "First attributive pattern."
    },
    "attributive (article\u2013noun\u2013article\u2013adj)": {
      greek: "\u1F41 \u03BB\u03CC\u03B3\u03BF\u03C2 \u1F41 \u1F00\u03B3\u03B1\u03B8\u03CC\u03C2",
      english: "the good word",
      why: "Second attributive pattern \u2014 repeated article."
    },
    "attributive (adj\u2013noun)": {
      greek: "\u1F00\u03B3\u03B1\u03B8\u1F78\u03C2 \u03BB\u03CC\u03B3\u03BF\u03C2",
      english: "a good word (no article)",
      why: "Anarthrous \u2014 works for indefinite nouns, but with the article this would flip to predicate."
    },
    "attributive (noun\u2013adj)": {
      greek: "\u03BB\u03CC\u03B3\u03BF\u03C2 \u1F00\u03B3\u03B1\u03B8\u03CC\u03C2",
      english: "a good word",
      why: "Anarthrous noun + adjective \u2014 indefinite. With articles, this pattern reads as predicate."
    },
    "substantive \u2014 'the good thing'": {
      greek: "\u03C4\u1F78 \u1F00\u03B3\u03B1\u03B8\u03CC\u03BD",
      english: "the good thing",
      why: "Substantive use: adjective with article, no noun expressed \u2014 neuter sg."
    },
    "substantive \u2014 'the one untying'": {
      greek: "\u1F41 \u03BB\u03CD\u03C9\u03BD",
      english: "the one untying",
      why: "Participle with article, no noun expressed \u2014 acts as a noun."
    },
    "predicate \u2014 'the word is good'": {
      greek: "\u1F41 \u03BB\u03CC\u03B3\u03BF\u03C2 \u1F00\u03B3\u03B1\u03B8\u03CC\u03C2.",
      english: "The word is good.",
      why: "Predicate position: adjective outside the article-noun bracket; \u03B5\u1F30\u03BC\u03AF implied."
    },
    "predicate \u2014 'the man is untying'": {
      greek: "\u1F41 \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03C2 \u03BB\u03CD\u03C9\u03BD (\u1F10\u03C3\u03C4\u03AF\u03BD).",
      english: "The man is untying.",
      why: "Predicate-participle construction \u2014 rarer, usually periphrastic instead."
    },
    "vocative \u2014 'O good word!'": {
      greek: "\u1F66 \u1F00\u03B3\u03B1\u03B8\u03AD \u03BB\u03CC\u03B3\u03B5!",
      english: "O good word!",
      why: "Vocative address \u2014 flagged by \u1F66 or context, not by position."
    },
    "adverbial (circumstantial) \u2014 'while untying, the man \u2026'": {
      greek: "\u03BB\u03CD\u03C9\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD, \u1F00\u03C0\u1FC6\u03BB\u03B8\u03B5\u03BD.",
      english: "While untying the bond, he went away.",
      why: "Anarthrous participle agreeing with the subject \u2014 describes the circumstance of the main verb."
    },
    "adverbial \u2014 'while untying'": {
      greek: "\u03BB\u03CD\u03C9\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD\u2026",
      english: "while untying the bond\u2026",
      why: "Anarthrous participle acting as an adverbial modifier."
    },
    "attributive \u2014 'the untying [thing]'": {
      greek: "\u03C4\u1F78 \u03BB\u1FE6\u03BF\u03BD",
      english: "the untying thing",
      why: "Neuter substantive participle \u2014 rare for this lemma."
    },
    "attributive \u2014 modifying the subject": {
      greek: "\u1F41 \u03BB\u03CD\u03C9\u03BD \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03C2",
      english: "the untying man",
      why: "Attributive participle: article + participle + noun."
    },
    "imperative \u2014 'untie!'": {
      greek: "\u03BB\u1FE6\u03C3\u03BF\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD!",
      english: "Untie the bond!",
      why: "That would be an imperative form \u2014 but this is a participle."
    },
    // ── αὐτός uses (W1O)
    "intensive \u2014 'the apostle himself'": {
      greek: "\u1F41 \u1F00\u03C0\u03CC\u03C3\u03C4\u03BF\u03BB\u03BF\u03C2 \u03B1\u1F50\u03C4\u03CC\u03C2",
      english: "the apostle himself",
      why: "\u03B1\u1F50\u03C4\u03CC\u03C2 in predicate position = intensive 'self'."
    },
    "identifier \u2014 'the same apostle'": {
      greek: "\u1F41 \u03B1\u1F50\u03C4\u1F78\u03C2 \u1F00\u03C0\u03CC\u03C3\u03C4\u03BF\u03BB\u03BF\u03C2",
      english: "the same apostle",
      why: "\u03B1\u1F50\u03C4\u03CC\u03C2 in attributive position = identifier 'same'."
    },
    "personal \u2014 'he, the apostle'": {
      greek: "\u03B1\u1F50\u03C4\u1F78\u03C2 \u03B5\u1F36\u03C0\u03B5\u03BD.",
      english: "He said.",
      why: "\u03B1\u1F50\u03C4\u03CC\u03C2 in oblique cases (or standalone in later Greek) functions as a 3rd-person pronoun."
    },
    "demonstrative \u2014 'this apostle'": {
      greek: "\u03BF\u1F57\u03C4\u03BF\u03C2 \u1F41 \u1F00\u03C0\u03CC\u03C3\u03C4\u03BF\u03BB\u03BF\u03C2",
      english: "this apostle",
      why: "Demonstrative is \u03BF\u1F57\u03C4\u03BF\u03C2 / \u1F10\u03BA\u03B5\u1FD6\u03BD\u03BF\u03C2 \u2014 not \u03B1\u1F50\u03C4\u03CC\u03C2."
    },
    "predicate \u2014 'the apostle is the same'": {
      greek: "(not the natural reading of \u1F41 \u03B1\u1F50\u03C4\u1F78\u03C2 \u1F00\u03C0\u03CC\u03C3\u03C4\u03BF\u03BB\u03BF\u03C2)",
      english: "",
      why: "\u03B1\u1F50\u03C4\u03CC\u03C2 in attributive position = 'same', not a predicate statement."
    },
    // ── Aspect phrasings (Ch 6, 16, 18)
    "a single past event with no present relevance": {
      greek: "\u1F14\u03BB\u03C5\u03C3\u03B1 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "I untied the bond.",
      why: "That describes the aorist, not the perfect."
    },
    "an ongoing process": {
      greek: "\u03BB\u03CD\u03C9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD. / \u1F14\u03BB\u03C5\u03BF\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "I am untying / I was untying.",
      why: "That describes imperfective aspect (present, imperfect)."
    },
    "a future action": {
      greek: "\u03BB\u03CD\u03C3\u03C9 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "I will untie the bond.",
      why: "That describes the future tense."
    },
    "the future": {
      greek: "\u03BB\u03CD\u03C3\u03C9",
      english: "I will untie",
      why: "The future is tense-focused (time) with mixed aspect \u2014 not primarily imperfective."
    },
    "the present": {
      greek: "\u03BB\u03CD\u03C9",
      english: "I untie / I am untying",
      why: "The present is strongly imperfective \u2014 listed as part of the correct answer pair here."
    },
    "the imperfect": {
      greek: "\u1F14\u03BB\u03C5\u03BF\u03BD",
      english: "I was untying",
      why: "The imperfect is imperfective past \u2014 also part of the imperfective family."
    },
    // ── Aspect of imperative (Ch 18)
    "present (imperfective aspect)": {
      greek: "\u03C0\u03AF\u03C3\u03C4\u03B5\u03C5\u03B5.",
      english: "Keep on believing.",
      why: "Present imperative = ongoing / habitual."
    },
    "aorist (perfective aspect)": {
      greek: "\u03C0\u03AF\u03C3\u03C4\u03B5\u03C5\u03C3\u03BF\u03BD.",
      english: "Believe! (one decisive act)",
      why: "Aorist imperative = whole event."
    },
    "perfect (stative)": {
      greek: "\u03C0\u03B5\u03C0\u03AF\u03C3\u03C4\u03B5\u03C5\u03BA\u03B5.",
      english: "He has believed (and remains so).",
      why: "Perfect emphasizes state resulting from prior action \u2014 rarely imperatival."
    },
    "future indicative": {
      greek: "\u03C0\u03B9\u03C3\u03C4\u03B5\u03CD\u03C3\u03B5\u03B9.",
      english: "He will believe.",
      why: "Future indicative, not imperative."
    },
    // ── Periphrastic-construction distractors (Ch 18)
    "imperfect indicative of \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03C9": {
      greek: "\u1F10\u03B4\u03AF\u03B4\u03B1\u03C3\u03BA\u03B5",
      english: "he was teaching",
      why: "That would be a single imperfect form \u2014 but \u1F26\u03BD \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03C9\u03BD is two words, periphrastic."
    },
    "aorist participle in apposition": {
      greek: "\u03B4\u03B9\u03B4\u03AC\u03BE\u03B1\u03C2, \u1F00\u03C0\u1FC6\u03BB\u03B8\u03B5\u03BD.",
      english: "After teaching, he went away.",
      why: "That would be an aorist participle, not the imperfect of \u03B5\u1F30\u03BC\u03AF + present participle."
    },
    "perfect periphrastic": {
      greek: "\u1F10\u03C3\u03C4\u1F76\u03BD \u03B3\u03B5\u03B3\u03C1\u03B1\u03BC\u03BC\u03AD\u03BD\u03BF\u03BD",
      english: "it has been written",
      why: "Perfect periphrastic uses \u03B5\u1F30\u03BC\u03AF + perfect participle, not present."
    },
    "present indicative of \u03B3\u03C1\u03AC\u03C6\u03C9": {
      greek: "\u03B3\u03C1\u03AC\u03C6\u03B5\u03B9",
      english: "he writes",
      why: "That would be one word; but \u1F10\u03C3\u03C4\u1F76\u03BD \u03B3\u03B5\u03B3\u03C1\u03B1\u03BC\u03BC\u03AD\u03BD\u03BF\u03BD is two, periphrastic."
    },
    "perfect indicative of \u03B5\u1F30\u03BC\u03AF": {
      greek: "(\u03B5\u1F30\u03BC\u03AF has no perfect)",
      english: "",
      why: "\u03B5\u1F30\u03BC\u03AF lacks a perfect form. Here \u03B5\u1F30\u03BC\u03AF is the auxiliary, not the main verb."
    },
    "aorist passive": {
      greek: "\u1F10\u03B3\u03C1\u03AC\u03C6\u03B7",
      english: "it was written",
      why: "That's a single word; but \u1F10\u03C3\u03C4\u1F76\u03BD \u03B3\u03B5\u03B3\u03C1\u03B1\u03BC\u03BC\u03AD\u03BD\u03BF\u03BD is the stative-passive periphrasis."
    },
    // ── ι-stem genitive distractors (Ch 13)
    "It's an alternate spelling \u2014 both forms are equally common": {
      greek: "",
      english: "",
      why: "This class of \u03B9-stems (such as \u03C0\u03CC\u03BB\u03B9\u03C2) forms the genitive singular in -\u03B5\u03C9\u03C2."
    },
    "It's a typographical variation of -\u03BF\u03C2": {
      greek: "",
      english: "",
      why: "-\u03B5\u03C9\u03C2 is a genuine distinct ending, not a typographical variant."
    },
    "It's actually a 1st-declension form": {
      greek: "",
      english: "",
      why: "\u03C0\u03CC\u03BB\u03B9\u03C2 is unambiguously 3rd-declension \u2014 1st-declension feminines never show -\u03B5\u03C9\u03C2."
    },
    "only as nominative plural": {
      greek: "\u03B1\u1F31 \u03C0\u03CC\u03BB\u03B5\u03B9\u03C2 (nom.) / \u03C4\u1F70\u03C2 \u03C0\u03CC\u03BB\u03B5\u03B9\u03C2 (acc.)",
      english: "",
      why: "\u03B9-stems collapse nom. pl. and acc. pl. into one form \u2014 \u03C0\u03CC\u03BB\u03B5\u03B9\u03C2 is both."
    },
    "only as accusative plural": {
      greek: "",
      english: "",
      why: "Same form serves as nom. pl. too \u2014 not accusative only."
    },
    "only as a vocative": {
      greek: "",
      english: "",
      why: "\u03C0\u03CC\u03BB\u03B5\u03B9\u03C2 is not vocative \u2014 vocative sg. would be \u03C0\u03CC\u03BB\u03B9."
    },
    "It's irregular and unrelated to \u03B3\u03AD\u03BD\u03BF\u03C2": {
      greek: "",
      english: "",
      why: "\u03B3\u03AD\u03BD\u03B5\u03B9 is the regular dative sg. of \u03B3\u03AD\u03BD\u03BF\u03C2 \u2014 \u03C3-stem rules explain it fully."
    },
    "It's actually a 2nd-declension form": {
      greek: "",
      english: "",
      why: "\u03B3\u03AD\u03BD\u03BF\u03C2 is 3rd-declension \u03C3-stem; 2nd-declension datives end in -\u1FF3, not -\u03B5\u03B9."
    },
    "It's a vocative": {
      greek: "",
      english: "",
      why: "The vocative of \u03B3\u03AD\u03BD\u03BF\u03C2 is \u03B3\u03AD\u03BD\u03BF\u03C2 (nom./voc. identical for neuters)."
    },
    // ── Reduplication distractors (Ch 16)
    "augment \u03B5- + \u03C3 + \u03B1": {
      greek: "\u1F14\u03BB\u03C5\u03C3\u03B1",
      english: "I untied",
      why: "That's the 1st-aorist active pattern."
    },
    "augment \u03B5- + \u03B8\u03B7": {
      greek: "\u1F10\u03BB\u03CD\u03B8\u03B7",
      english: "he was untied",
      why: "That's the aorist passive."
    },
    "\u03C9-ending + \u03B9-augment": {
      greek: "",
      english: "",
      why: "That is not how the perfect is formed. Perfects use reduplication, not augment. Indicative past forms use either syllabic augment (often \u1F10-) or temporal augment."
    },
    "augment \u2014 this is an aorist or imperfect": {
      greek: "\u1F14\u03BB\u03C5\u03BF\u03BD / \u1F14\u03BB\u03C5\u03C3\u03B1",
      english: "I was untying / I untied",
      why: "Reduplication (C + \u03B5) is different from augment (\u03B5-). Both produce an initial \u03B5, but reduplication doubles a consonant."
    },
    "particle \u2014 'indeed'": {
      greek: "",
      english: "",
      why: "\u03B3\u03B5 is a particle, but \u03B3\u03B5- as a prefix on a verb stem is reduplication."
    },
    "an unrelated prefix": {
      greek: "",
      english: "",
      why: "The \u03B3\u03B5- on a verb stem is specifically perfect-tense reduplication."
    },
    "by doubling the first consonant": {
      greek: "\u03BB\u03AD\u03BB\u03C5\u03BA\u03B1, \u03B3\u03AD\u03B3\u03C1\u03B1\u03C6\u03B1",
      english: "",
      why: "Reduplication does double the initial consonant \u2014 but with the connecting vowel \u03B5, not bare doubling."
    },
    "by prefixing \u03B3\u03B5-": {
      greek: "",
      english: "",
      why: "\u03B3\u03B5- isn't a universal prefix \u2014 reduplication copies whatever the stem-initial consonant is."
    },
    "they can't form a perfect": {
      greek: "\u1F00\u03BA\u03BF\u03CD\u03C9 \u2192 \u1F00\u03BA\u03AE\u03BA\u03BF\u03B1",
      english: "I have heard",
      why: "Verbs starting with vowels lengthen the vowel (vocalic reduplication) instead."
    },
    // ── Square-of-stops extras (Ch 15)
    "\u03C4\u03C4": {
      greek: "",
      english: "",
      why: "\u03C4\u03C4 isn't a contraction of stop + \u03C3 \u2014 it's an Attic variant of \u03C3\u03C3."
    },
    "\u03B6": {
      greek: "",
      english: "",
      why: "\u03B6 doesn't come from stop + \u03C3 combinations \u2014 it's an original letter."
    },
    // ── Voice meanings — additional variants (Ch 15, W3O)
    "middle ('I untie for myself') or passive ('I am being untied')": {
      greek: "\u03BB\u03CD\u03BF\u03BC\u03B1\u03B9.",
      english: "I untie for myself / I am being untied.",
      why: "In present and imperfect the middle and passive share one form \u2014 only context or aorist-passive forms disambiguate."
    },
    "active only ('I untie')": {
      greek: "\u03BB\u03CD\u03C9.",
      english: "I untie.",
      why: "That would be the active \u2014 but \u03BB\u03CD\u03BF\u03BC\u03B1\u03B9 has M/P endings."
    },
    "passive only ('I am being untied')": {
      greek: "",
      english: "",
      why: "In the present and imperfect, middle and passive share the same form; context determines which sense fits."
    },
    "deponent only \u2014 no active sense": {
      greek: "\u1F14\u03C1\u03C7\u03BF\u03BC\u03B1\u03B9",
      english: "I come (middle form, active sense)",
      why: "Deponent means middle-only with active meaning \u2014 but \u03BB\u03CD\u03C9 has a perfectly good active \u03BB\u03CD\u03C9."
    },
    "no agent is implied": {
      greek: "",
      english: "",
      why: "That describes the middle or impersonal, not this voice."
    },
    "the subject is acted upon by an external agent": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03CD\u03B5\u03C4\u03B1\u03B9 \u1F51\u03C0\u1F78 \u03C4\u03BF\u1FE6 \u03BA\u03C5\u03C1\u03AF\u03BF\u03C5.",
      english: "The servant is untied by the master.",
      why: "That describes the passive."
    },
    "the action is impersonal": {
      greek: "\u03B4\u03B5\u1FD6, \u1F14\u03BE\u03B5\u03C3\u03C4\u03B9\u03BD",
      english: "it is necessary, it is permitted",
      why: "Impersonal verbs exist in Greek but aren't a voice \u2014 they're a handful of specific lemmas."
    },
    // ── ὁ αὐτός vs predicate (W3O)
    "\u03BF\u1F57\u03C4\u03BF\u03C2 is here a relative pronoun": {
      greek: "\u1F45\u03C2, \u1F25, \u1F45",
      english: "who, which",
      why: "Relative pronouns have a different paradigm (\u1F45\u03C2, \u1F25, \u1F45) \u2014 \u03BF\u1F57\u03C4\u03BF\u03C2 is demonstrative."
    },
    "It's a typo; \u03BF\u1F57\u03C4\u03BF\u03C2 should follow \u1F00\u03C0\u03CC\u03C3\u03C4\u03BF\u03BB\u03BF\u03C2": {
      greek: "",
      english: "",
      why: "Demonstrative in predicate position is the rule, not a typo \u2014 \u03BF\u1F57\u03C4\u03BF\u03C2 can sit on either side of its noun."
    },
    "Predicate position changes the meaning to 'the apostle is this one'": {
      greek: "",
      english: "",
      why: "With a demonstrative, predicate position is the default attributive reading \u2014 meaning doesn't flip."
    },
    // ── ἡμῶν vs ὑμῶν (W3O)
    "\u1F51\u03BC\u1FF6\u03BD": {
      greek: "\u1F51\u03BC\u1FF6\u03BD",
      english: "of you (all)",
      why: "\u1F51\u03BC\u1FF6\u03BD is 2nd person plural genitive \u2014 'of you all'. \u1F21\u03BC\u1FF6\u03BD is 1st person plural."
    },
    "both \u2014 they are interchangeable": {
      greek: "",
      english: "",
      why: "They differ only by one character (rough vs smooth breathing) but mean different persons."
    },
    "neither \u2014 both are 3rd person": {
      greek: "",
      english: "",
      why: "Both are 1st/2nd person, not 3rd. 3rd person 'of them' would be \u03B1\u1F50\u03C4\u1FF6\u03BD."
    },
    // ── W7O indefinite translations
    "'who unties'": {
      greek: "\u1F41 \u03BB\u03CD\u03C9\u03BD / \u1F43\u03C2 \u03BB\u03CD\u03B5\u03B9",
      english: "the one who unties / who unties",
      why: "That would be a definite relative (plain indicative), not an indefinite one (+ \u1F04\u03BD)."
    },
    "'while untying'": {
      greek: "\u03BB\u03CD\u03C9\u03BD",
      english: "while untying",
      why: "That would be an adverbial participle."
    },
    "'in order that he untie'": {
      greek: "\u1F35\u03BD\u03B1 \u03BB\u03CD\u03C3\u1FC3",
      english: "in order that he untie",
      why: "That would be a purpose clause with \u1F35\u03BD\u03B1."
    },
    "'when he untied'": {
      greek: "\u1F45\u03C4\u03B5 \u1F14\u03BB\u03C5\u03C3\u03B5\u03BD",
      english: "when he untied",
      why: "That's a definite past temporal \u2014 \u1F45\u03C4\u03B5 + aorist indicative."
    },
    "'because he unties'": {
      greek: "\u1F45\u03C4\u03B9 \u03BB\u03CD\u03B5\u03B9",
      english: "because he unties",
      why: "That would be a causal clause with \u1F45\u03C4\u03B9 or \u03B4\u03B9\u03CC\u03C4\u03B9."
    }
  };

  // js/data/grammar_examples.js
  var GRAMMAR_EXAMPLE_MAP = {
    "\u03BB\u03CD\u03B5\u03B9\u03C2|present active indicative, 2nd singular": {
      greek: "\u03C3\u1F7A \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03B5\u03B9\u03C2.",
      english: "You untie the bond."
    },
    "\u03BB\u03CD\u03BF\u03BC\u03B5\u03BD|present active indicative, 1st plural": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03BF\u03BC\u03B5\u03BD.",
      english: "We untie the bond."
    },
    "\u03BB\u03CD\u03BF\u03C5\u03C3\u03B9(\u03BD)|present active indicative, 3rd plural": {
      greek: "\u03B1\u1F50\u03C4\u03BF\u1F76 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03BF\u03C5\u03C3\u03B9\u03BD.",
      english: "They untie the bond."
    },
    "\u03B5\u1F30\u03BC\u03AF|1st singular ('I am')": {
      greek: "\u1F10\u03B3\u1F7C \u03BC\u03B1\u03B8\u03B7\u03C4\u1F74\u03C2 \u03B5\u1F30\u03BC\u03AF.",
      english: "I am a student."
    },
    "\u1F10\u03C3\u03C4\u03AF\u03BD|3rd singular ('he/she/it is')": {
      greek: "\u1F41 \u03BB\u03CC\u03B3\u03BF\u03C2 \u03BA\u03B1\u03BB\u1F78\u03C2 \u1F10\u03C3\u03C4\u03AF\u03BD.",
      english: "The word is good."
    },
    "\u03B5\u1F30\u03C3\u03AF\u03BD|3rd plural ('they are')": {
      greek: "\u03BF\u1F31 \u03BC\u03B1\u03B8\u03B7\u03C4\u03B1\u1F76 \u1F10\u03BD \u03C4\u1FC7 \u03BF\u1F30\u03BA\u03AF\u1FB3 \u03B5\u1F30\u03C3\u03AF\u03BD.",
      english: "The students are in the house."
    },
    "\u03C4\u03BF\u1FE6|genitive singular masculine/neuter": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u1F74 \u03C4\u03BF\u1FE6 \u03BB\u03CC\u03B3\u03BF\u03C5.",
      english: "The sound of the word."
    },
    "\u03C4\u1FF7|dative singular masculine/neuter": {
      greek: "\u03B4\u03AF\u03B4\u03C9\u03BC\u03B9 \u03B4\u1FF6\u03C1\u03BF\u03BD \u03C4\u1FF7 \u03C6\u03AF\u03BB\u1FF3.",
      english: "I give a gift to the friend."
    },
    "\u03C4\u03AE\u03BD|accusative singular feminine": {
      greek: "\u03B2\u03BB\u03AD\u03C0\u03C9 \u03C4\u1F74\u03BD \u03BF\u1F30\u03BA\u03AF\u03B1\u03BD.",
      english: "I see the house."
    },
    "\u03C4\u1FF6\u03BD|genitive plural (all genders)": {
      greek: "\u03C4\u1FF6\u03BD \u03BC\u03B1\u03B8\u03B7\u03C4\u1FF6\u03BD",
      english: "of the students"
    },
    "\u03B1\u1F55\u03C4\u03B7|'this' \u2014 nom. sg. fem. of \u03BF\u1F57\u03C4\u03BF\u03C2": {
      greek: "\u03B1\u1F55\u03C4\u03B7 \u1F21 \u1F21\u03BC\u03AD\u03C1\u03B1 \u1F00\u03B3\u03B1\u03B8\u03AE \u1F10\u03C3\u03C4\u03B9\u03BD.",
      english: "This day is good."
    },
    "\u1F45\u03C2|nominative singular masculine": {
      greek: "\u1F41 \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03C2 \u1F43\u03C2 \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B5\u03B9.",
      english: "the man who teaches"
    },
    "\u1FA7|dative singular masculine/neuter": {
      greek: "\u1F41 \u1F04\u03BD\u03B8\u03C1\u03C9\u03C0\u03BF\u03C2 \u1FA7 \u03B4\u03AF\u03B4\u03C9\u03BC\u03B9 \u03C4\u1F78 \u03B4\u1FF6\u03C1\u03BF\u03BD.",
      english: "the man to whom I give the gift"
    },
    "\u03BC\u03B5\u03BD\u1FF6|future active indicative, 1st sg. of \u03BC\u03AD\u03BD\u03C9": {
      greek: "\u1F10\u03B3\u1F7C \u1F10\u03BD \u03C4\u1FC7 \u03BF\u1F30\u03BA\u03AF\u1FB3 \u03BC\u03B5\u03BD\u1FF6.",
      english: "I will remain in the house."
    },
    "\u1F00\u03C0\u03BF\u03C3\u03C4\u03B5\u03BB\u1FF6|future active indicative, 1st sg. of \u1F00\u03C0\u03BF\u03C3\u03C4\u03AD\u03BB\u03BB\u03C9": {
      greek: "\u1F10\u03B3\u1F7C \u03C4\u1F78\u03BD \u03B4\u03BF\u1FE6\u03BB\u03BF\u03BD \u1F00\u03C0\u03BF\u03C3\u03C4\u03B5\u03BB\u1FF6.",
      english: "I will send the servant."
    },
    "\u03BB\u03C5\u03B8\u03AE\u03C3\u03BF\u03BC\u03B1\u03B9|future passive (1st sg. middle/passive ending)": {
      greek: "\u1F10\u03B3\u1F7C \u03BB\u03C5\u03B8\u03AE\u03C3\u03BF\u03BC\u03B1\u03B9 \u1F00\u03C0\u1F78 \u03C4\u03BF\u1FE6 \u03B4\u03B5\u03C3\u03BC\u03BF\u1FE6.",
      english: "I will be released from the bond."
    },
    "\u1F10\u03BB\u03B5\u03BB\u03CD\u03BA\u03B5\u03B9\u03BD|pluperfect active indicative, 1st sg. of \u03BB\u03CD\u03C9": {
      greek: "\u1F24\u03B4\u03B7 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F10\u03BB\u03B5\u03BB\u03CD\u03BA\u03B5\u03B9\u03BD.",
      english: "I had already untied the bond."
    },
    "\u1F10\u03BB\u03B5\u03BB\u03CD\u03BA\u03B5\u03B9\u03BD|pluperfect active indicative, 1st sg.": {
      greek: "\u1F24\u03B4\u03B7 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F10\u03BB\u03B5\u03BB\u03CD\u03BA\u03B5\u03B9\u03BD.",
      english: "I had already untied the bond."
    },
    "\u03BB\u03CD\u1FC3|present active subjunctive, 3rd sg.": {
      greek: "\u1F35\u03BD\u03B1 \u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u1FC3.",
      english: "so that the servant may untie the bond"
    },
    "\u03B4\u03AF\u03B4\u03C9\u03C3\u03B9(\u03BD)|present active indicative, 3rd sg.": {
      greek: "\u1F41 \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B1\u03BB\u03BF\u03C2 \u03C4\u1F78 \u03B2\u03B9\u03B2\u03BB\u03AF\u03BF\u03BD \u03B4\u03AF\u03B4\u03C9\u03C3\u03B9\u03BD.",
      english: "The teacher gives the book."
    },
    "\u03B4\u03B9\u03B4\u03CC\u03B1\u03C3\u03B9(\u03BD)|present active indicative, 3rd pl.": {
      greek: "\u03BF\u1F31 \u03C6\u03AF\u03BB\u03BF\u03B9 \u03B4\u1FF6\u03C1\u03B1 \u03B4\u03B9\u03B4\u03CC\u03B1\u03C3\u03B9\u03BD.",
      english: "The friends give gifts."
    },
    "\u03B4\u03CE\u03C3\u03C9|future active indicative, 1st sg.": {
      greek: "\u1F10\u03B3\u1F7C \u03B4\u1FF6\u03C1\u03BF\u03BD \u03B4\u03CE\u03C3\u03C9.",
      english: "I will give a gift."
    },
    "\u1F14\u03B4\u03C9\u03BA\u03B1|aorist active indicative, 1st sg.": {
      greek: "\u1F10\u03B3\u1F7C \u03B4\u1FF6\u03C1\u03BF\u03BD \u1F14\u03B4\u03C9\u03BA\u03B1.",
      english: "I gave a gift."
    },
    "\u03B4\u03AD\u03B4\u03C9\u03BA\u03B1|perfect active indicative, 1st sg.": {
      greek: "\u1F10\u03B3\u1F7C \u03B4\u1FF6\u03C1\u03BF\u03BD \u03B4\u03AD\u03B4\u03C9\u03BA\u03B1.",
      english: "I have given a gift."
    },
    "\u03C6\u03B9\u03BB\u03B5\u1FD6|present active indicative, 3rd sg. of \u03C6\u03B9\u03BB\u03AD\u03C9 ('he/she/it loves')": {
      greek: "\u1F41 \u03BC\u03B1\u03B8\u03B7\u03C4\u1F74\u03C2 \u03C4\u1F78\u03BD \u03C6\u03AF\u03BB\u03BF\u03BD \u03C6\u03B9\u03BB\u03B5\u1FD6.",
      english: "The student loves the friend."
    },
    "\u03BB\u03CD\u03C3\u03BF\u03BC\u03B5\u03BD|future active indicative, 1st pl.": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u03B1\u1F54\u03C1\u03B9\u03BF\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03C3\u03BF\u03BC\u03B5\u03BD.",
      english: "We will untie the bond tomorrow."
    },
    "\u1F10\u03BB\u03CD\u03BF\u03BC\u03B5\u03BD|imperfect active indicative, 1st pl.": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u1F10\u03BB\u03CD\u03BF\u03BC\u03B5\u03BD.",
      english: "We were untying the bond."
    },
    "\u03BB\u03C5\u03AD\u03C4\u03C9|present active imperative, 3rd sg. ('let him untie')": {
      greek: "\u03BB\u03C5\u03AD\u03C4\u03C9 \u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "Let the servant untie the bond."
    },
    "\u03BB\u1FE6\u03C3\u03BF\u03BD|aorist active imperative, 2nd sg.": {
      greek: "\u03BB\u1FE6\u03C3\u03BF\u03BD \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "Untie the bond."
    },
    "\u03BB\u03CD\u03BF\u03BD\u03C4\u03BF\u03C2|genitive singular masculine/neuter, present active participle": {
      greek: "\u1F00\u03BA\u03BF\u03CD\u03C9 \u03C4\u1F74\u03BD \u03C6\u03C9\u03BD\u1F74\u03BD \u03C4\u03BF\u1FE6 \u03BB\u03CD\u03BF\u03BD\u03C4\u03BF\u03C2.",
      english: "I hear the voice of the one who is untying."
    },
    "\u03BB\u03CD\u03BF\u03BD\u03C4\u03B5\u03C2|nominative plural masculine, present active participle": {
      greek: "\u03BF\u1F31 \u03BB\u03CD\u03BF\u03BD\u03C4\u03B5\u03C2 \u03C7\u03B1\u03AF\u03C1\u03BF\u03C5\u03C3\u03B9\u03BD.",
      english: "The ones who are untying rejoice."
    },
    "\u03BB\u03CD\u03BF\u03BD\u03C4\u03B1\u03B9|present middle/passive indicative, 3rd pl.": {
      greek: "\u03BF\u1F31 \u03B4\u03B5\u03C3\u03BC\u03BF\u1F76 \u03BB\u03CD\u03BF\u03BD\u03C4\u03B1\u03B9.",
      english: "The bonds are being loosed."
    },
    "\u03B5\u1F36\u03BD\u03B1\u03B9|present infinitive ('to be')": {
      greek: "\u03BA\u03B1\u03BB\u1F78\u03BD \u1F10\u03C3\u03C4\u1F76\u03BD \u03B5\u1F36\u03BD\u03B1\u03B9 \u03C0\u03B9\u03C3\u03C4\u03CC\u03BD.",
      english: "It is good to be faithful."
    },
    "\u1F64\u03BD|nominative singular masculine, present participle ('being')": {
      greek: "\u1F41 \u1F00\u03BD\u1F74\u03C1 \u1F62\u03BD \u03C3\u03BF\u03C6\u1F78\u03C2 \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B5\u03B9.",
      english: "The man, being wise, teaches."
    },
    "\u1F26\u03BB\u03B8\u03BF\u03BD|aorist active indicative, 1st sg. or 3rd pl. of \u1F14\u03C1\u03C7\u03BF\u03BC\u03B1\u03B9": {
      greek: "\u1F10\u03B3\u1F7C \u03B5\u1F30\u03C2 \u03C4\u1F74\u03BD \u03C0\u03CC\u03BB\u03B9\u03BD \u1F26\u03BB\u03B8\u03BF\u03BD.",
      english: "I came into the city."
    },
    "\u03B5\u1F36\u03C0\u03B5\u03BD|aorist active indicative, 3rd sg. of \u03BB\u03AD\u03B3\u03C9 ('he said')": {
      greek: "\u1F41 \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B1\u03BB\u03BF\u03C2 \u03B5\u1F36\u03C0\u03B5\u03BD.",
      english: "The teacher said."
    },
    "\u03BC\u03B5\u03BD\u03BF\u1FE6\u03BC\u03B5\u03BD|future active indicative, 1st pl. of \u03BC\u03AD\u03BD\u03C9": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u1F10\u03BD \u03C4\u1FC7 \u03C0\u03CC\u03BB\u03B5\u03B9 \u03BC\u03B5\u03BD\u03BF\u1FE6\u03BC\u03B5\u03BD.",
      english: "We will remain in the city."
    },
    "\u1F10\u03BB\u03CD\u03B8\u03B7\u03BD|aorist passive indicative, 1st sg.": {
      greek: "\u1F10\u03B3\u1F7C \u1F10\u03BB\u03CD\u03B8\u03B7\u03BD \u1F00\u03C0\u1F78 \u03C4\u03BF\u1FE6 \u03B4\u03B5\u03C3\u03BC\u03BF\u1FE6.",
      english: "I was released from the bond."
    },
    "\u03BB\u03C5\u03B8\u03AE\u03C3\u03B5\u03C4\u03B1\u03B9|future passive indicative, 3rd sg.": {
      greek: "\u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03BB\u03C5\u03B8\u03AE\u03C3\u03B5\u03C4\u03B1\u03B9.",
      english: "The servant will be released."
    },
    "\u03BB\u03C5\u03B8\u03B5\u03AF\u03C2|nominative singular masculine, aorist passive participle": {
      greek: "\u03BB\u03C5\u03B8\u03B5\u1F76\u03C2 \u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u1F00\u03C0\u1FC6\u03BB\u03B8\u03B5\u03BD.",
      english: "After being released, the servant went away."
    },
    "\u03BB\u03C5\u03B8\u03AD\u03BD\u03C4\u03BF\u03C2|genitive singular masculine/neuter, aorist passive participle": {
      greek: "\u1F21 \u03C6\u03C9\u03BD\u1F74 \u03C4\u03BF\u1FE6 \u03BB\u03C5\u03B8\u03AD\u03BD\u03C4\u03BF\u03C2 \u03B4\u03BF\u03CD\u03BB\u03BF\u03C5.",
      english: "The voice of the servant who has been released."
    },
    "\u03BB\u03AD\u03BB\u03C5\u03BA\u03B1|perfect active indicative, 1st sg.": {
      greek: "\u1F10\u03B3\u1F7C \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03AD\u03BB\u03C5\u03BA\u03B1.",
      english: "I have untied the bond."
    },
    "\u03BB\u03CD\u03C9\u03BC\u03B5\u03BD|present active subjunctive, 1st pl.": {
      greek: "\u1F35\u03BD\u03B1 \u1F21\u03BC\u03B5\u1FD6\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03C9\u03BC\u03B5\u03BD.",
      english: "so that we may untie the bond"
    },
    "\u03BB\u03CD\u03C3\u1FC3|aorist active subjunctive, 3rd sg.": {
      greek: "\u1F35\u03BD\u03B1 \u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u1F78\u03BD \u03BB\u03CD\u03C3\u1FC3.",
      english: "so that the servant may untie the bond"
    },
    "\u03BB\u03C5\u03C3\u03AC\u03C4\u03C9|aorist active imperative, 3rd sg. ('let him untie')": {
      greek: "\u03BB\u03C5\u03C3\u03AC\u03C4\u03C9 \u1F41 \u03B4\u03BF\u1FE6\u03BB\u03BF\u03C2 \u03C4\u1F78\u03BD \u03B4\u03B5\u03C3\u03BC\u03CC\u03BD.",
      english: "Let the servant untie the bond."
    },
    "\u03B4\u03AF\u03B4\u03BF\u03BC\u03B5\u03BD|present active indicative, 1st pl.": {
      greek: "\u1F21\u03BC\u03B5\u1FD6\u03C2 \u03B4\u1FF6\u03C1\u03B1 \u03B4\u03AF\u03B4\u03BF\u03BC\u03B5\u03BD.",
      english: "We give gifts."
    },
    "\u03B4\u03AF\u03B4\u03BF\u03C4\u03B5|ambiguous: present active indicative or imperative, 2nd pl.": {
      greek: "\u1F51\u03BC\u03B5\u1FD6\u03C2 \u03B4\u1FF6\u03C1\u03B1 \u03B4\u03AF\u03B4\u03BF\u03C4\u03B5.",
      english: "You give gifts. In isolation the same form can also function as an imperative: \u2018Give gifts!\u2019"
    },
    "\u03B4\u03CE\u03C3\u03B5\u03B9|future active indicative, 3rd sg.": {
      greek: "\u1F41 \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B1\u03BB\u03BF\u03C2 \u03C4\u1F78 \u03B2\u03B9\u03B2\u03BB\u03AF\u03BF\u03BD \u03B4\u03CE\u03C3\u03B5\u03B9.",
      english: "The teacher will give the book."
    },
    "\u1F14\u03B4\u03C9\u03BA\u03B5\u03BD|aorist active indicative, 3rd sg.": {
      greek: "\u1F41 \u03B4\u03B9\u03B4\u03AC\u03C3\u03BA\u03B1\u03BB\u03BF\u03C2 \u03C4\u1F78 \u03B2\u03B9\u03B2\u03BB\u03AF\u03BF\u03BD \u1F14\u03B4\u03C9\u03BA\u03B5\u03BD.",
      english: "The teacher gave the book."
    },
    "\u03B4\u03AF\u03B4\u03BF\u03C4\u03B1\u03B9|present middle/passive indicative, 3rd sg.": {
      greek: "\u03C4\u1F78 \u03B4\u1FF6\u03C1\u03BF\u03BD \u03B4\u03AF\u03B4\u03BF\u03C4\u03B1\u03B9.",
      english: "The gift is given."
    }
  };

  // js/domain/grammar/explanations.js
  function isMorphCard2(card) {
    return !!(card && card.type === "morphology");
  }
  function normalizeParsingLabel(text) {
    if (!text) return "";
    return String(text).replace(/\s+of\s+[^\s,]+(\s*\([^)]*\))?/gi, "").replace(/[()]/g, " ").replace(/[''""\"']/g, "").replace(/\b1st\b/gi, "first").replace(/\b2nd\b/gi, "second").replace(/\b3rd\b/gi, "third").replace(/\bsg\./gi, "singular").replace(/\bpl\./gi, "plural").replace(/\bmasc\./gi, "masculine").replace(/\bfem\./gi, "feminine").replace(/\bneut\./gi, "neuter").replace(/\bnom\./gi, "nominative").replace(/\bgen\./gi, "genitive").replace(/\bdat\./gi, "dative").replace(/\bacc\./gi, "accusative").replace(/\bvoc\./gi, "vocative").replace(/\bfirst aorist\b/gi, "aorist").replace(/\bsecond aorist\b/gi, "aorist").replace(/\s+/g, " ").trim().toLowerCase();
  }
  function lookupParsingExample(label) {
    if (!label) return null;
    return PARSING_EXAMPLES[normalizeParsingLabel(label)] || null;
  }
  function lookupConceptExample(label) {
    if (!label) return null;
    return CONCEPT_EXAMPLES[String(label).trim()] || null;
  }
  function normalizeGrammarAnswerText(answer) {
    return String(answer || "").replace(/\b1st\b/g, "first").replace(/\b2nd\b/g, "second").replace(/\b3rd\b/g, "third").replace(/\bsg\./g, "singular").replace(/\bpl\./g, "plural").replace(/\bnom\./g, "nominative").replace(/\bgen\./g, "genitive").replace(/\bdat\./g, "dative").replace(/\bacc\./g, "accusative").replace(/\s+/g, " ").trim();
  }
  function getGrammarExplanation(card) {
    if (!isMorphCard2(card)) return "";
    const prompt = String(card.prompt || "").toLowerCase();
    const answer = normalizeGrammarAnswerText(card.answer || "");
    if (!answer) return "";
    if (/parse|identify this form|parse this article|parse this relative pronoun|parse this form of/i.test(prompt)) {
      if (card.gloss && !/\(/.test(answer)) {
        return `Plain English: ${answer}. The lemma means "${card.gloss}."`;
      }
      return `Plain English: ${answer}.`;
    }
    if (/translate/i.test(prompt)) {
      return `Translation: ${answer}.`;
    }
    if (/which use is this|what position is|what construction is this|what declension and gender|what stem class is this|what tense is this|what voice meanings are possible/i.test(prompt)) {
      return `Explanation: ${answer}.`;
    }
    return "";
  }
  function getGrammarExample(card) {
    if (!isMorphCard2(card)) return null;
    const directKey = `${card.form || ""}|${card.answer || ""}`;
    return GRAMMAR_EXAMPLE_MAP[directKey] || null;
  }
  function renderWrongAnswerBlock(wrongLabel, data) {
    const greekHtml = data.greek ? `<div class="morph-wrong-greek">${data.greek}</div>` : "";
    const englishHtml = data.english ? `<div class="morph-wrong-english">\u201C${data.english}\u201D</div>` : "";
    const whyHtml = data.why ? `<div class="morph-wrong-why">${data.why}</div>` : "";
    return `
    <div class="morph-wrong-explanation">
      <div class="morph-wrong-label">If it were \u201C${wrongLabel}\u201D it would look like:</div>
      ${greekHtml}
      ${englishHtml}
      ${whyHtml}
    </div>`;
  }
  function buildWrongAnswerExplanation(card, selectedChoice) {
    if (!card || !selectedChoice || selectedChoice === card.answer) return "";
    const authored = card.explanations && card.explanations[selectedChoice];
    if (authored && (authored.english || authored.greek || authored.why)) {
      return renderWrongAnswerBlock(selectedChoice, authored);
    }
    const concept = lookupConceptExample(selectedChoice);
    if (concept) return renderWrongAnswerBlock(selectedChoice, concept);
    const parsing = lookupParsingExample(selectedChoice);
    if (parsing) return renderWrongAnswerBlock(selectedChoice, parsing);
    return "";
  }
  function buildGrammarSupportHtml(card, wrongChoice) {
    const explanation = getGrammarExplanation(card);
    const example = getGrammarExample(card);
    const rationaleHtml = card.rationale ? `<div class="morph-rationale">${card.rationale}</div>` : "";
    const explanationHtml = explanation ? `<div class="morph-explanation">${explanation}</div>` : "";
    const exampleHtml = example ? `<div class="morph-example">
         <div class="morph-example-label">Example</div>
         <div class="morph-example-greek">${example.greek}</div>
         <div class="morph-example-english">${example.english || ""}</div>
       </div>` : "";
    const wrongHtml = wrongChoice ? buildWrongAnswerExplanation(card, wrongChoice) : "";
    return explanationHtml + rationaleHtml + exampleHtml + wrongHtml;
  }

  // js/domain/deck/filters.js
  function getSets2() {
    return window.SETS && typeof window.SETS === "object" ? window.SETS : {};
  }
  function stableKey(greek) {
    return typeof window.stableCardKey === "function" ? window.stableCardKey(greek) : String(greek || "");
  }
  function formatHeadword(greek) {
    return typeof window.formatGreekHeadword === "function" ? window.formatGreekHeadword(greek) : String(greek || "");
  }
  function detectPos(card) {
    return typeof window.detectPartOfSpeech === "function" ? window.detectPartOfSpeech(card) : "";
  }
  function getSelectedVocabCards(keys, requiredFlag = false) {
    const cards = [];
    (keys || []).forEach((key) => {
      const rawKey = String(key);
      const set = getSets2()[rawKey];
      if (!set) return;
      set.cards.forEach((card, idx) => {
        if (requiredFlag && !card.required) return;
        cards.push({
          ...card,
          kind: "vocab",
          sourceKey: rawKey,
          sourceLabel: sourceHint(rawKey),
          chapter: getChapterForKey(rawKey),
          week: getWeekForKey(rawKey),
          id: `${rawKey}-${idx}-${stableKey(card.g)}`
        });
      });
    });
    return cards;
  }
  function getSelectedGrammarCards(keys) {
    const morphCards = window.buildMorphologyCardsForKeys ? window.buildMorphologyCardsForKeys(keys || []) : [];
    const grammarCards = window.buildGrammarCardsForKeys ? window.buildGrammarCardsForKeys(keys || []) : [];
    return [...morphCards, ...grammarCards];
  }
  function getAllVocabKeys() {
    return Object.keys(getSets2());
  }
  function getAllChapterKeys() {
    return Object.keys(getSets2()).filter(isChapterKey).sort((a, b) => Number(a) - Number(b));
  }
  function getAllVocabCards(requiredFlag = false) {
    return getSelectedVocabCards(getAllVocabKeys(), requiredFlag);
  }
  function getAllGrammarCards() {
    const allKeys = getAllVocabKeys();
    const morphCards = window.buildMorphologyCardsForKeys ? window.buildMorphologyCardsForKeys(allKeys) : [];
    const grammarCards = window.buildGrammarCardsForKeys ? window.buildGrammarCardsForKeys(allKeys) : [];
    return [...morphCards, ...grammarCards];
  }
  function getChapterVocabCards(chapterKey, requiredFlag = false) {
    return getSelectedVocabCards([String(chapterKey)], requiredFlag);
  }
  function getCardReviewLeft(card) {
    if (isMorphCard2(card)) return card.form || "\u2014";
    return formatHeadword(card.g);
  }
  function getCardReviewRight(card) {
    if (isMorphCard2(card)) return card.answer || "\u2014";
    return card.e || "\u2014";
  }
  function getCardMetaLine(card) {
    if (isMorphCard2(card)) {
      const bits = [card.lemma, card.gloss ? `"${card.gloss}"` : "", card.family].filter(Boolean);
      return bits.join(" \xB7 ");
    }
    return detectPos(card);
  }

  // js/state/migrations.js
  function stableKey2(greek) {
    return typeof window.stableCardKey === "function" ? window.stableCardKey(greek) : String(greek || "");
  }
  function getLegacyStableIdMap() {
    return typeof window.buildLegacyStableIdMap === "function" ? window.buildLegacyStableIdMap() : /* @__PURE__ */ new Map();
  }
  function getCurrentGrammarAndMorphCardIdSet() {
    const ids = /* @__PURE__ */ new Set();
    try {
      if (window.buildGrammarCardsForKeys && window.GRAMMAR_SETS && typeof window.GRAMMAR_SETS === "object") {
        const grammarKeys = Object.keys(window.GRAMMAR_SETS);
        window.buildGrammarCardsForKeys(grammarKeys).forEach((card) => {
          if (card?.id) ids.add(card.id);
        });
      }
    } catch (err) {
      console.warn("Could not enumerate current grammar card ids for migration safety.", err);
    }
    try {
      if (window.buildMorphologyCardsForKeys && window.MORPHOLOGY_SETS && typeof window.MORPHOLOGY_SETS === "object") {
        const morphKeys = Object.keys(window.MORPHOLOGY_SETS);
        window.buildMorphologyCardsForKeys(morphKeys).forEach((card) => {
          if (card?.id) ids.add(card.id);
        });
      }
    } catch (err) {
      console.warn("Could not enumerate current morphology card ids for migration safety.", err);
    }
    return ids;
  }
  function isLegacyOrphanedMorphId(id, validIds = null) {
    if (!(String(id || "").startsWith("grammar-") || String(id || "").startsWith("morph-"))) return false;
    const liveIds = validIds || getCurrentGrammarAndMorphCardIdSet();
    if (!liveIds.size) return false;
    return !liveIds.has(String(id));
  }
  function summarizePersistedState(state) {
    const safeState = isPlainObject(state) ? state : {};
    const marks2 = isPlainObject(safeState.globalWordMarks) ? safeState.globalWordMarks : {};
    const progress = isPlainObject(safeState.globalWordProgress) ? safeState.globalWordProgress : {};
    const countObjectKeys = (bucket) => isPlainObject(bucket) ? Object.keys(bucket).length : 0;
    return {
      selectedSets: Array.isArray(safeState.selectedKeys) ? safeState.selectedKeys.length : 0,
      deckStates: countObjectKeys(safeState.deckStates),
      marks: {
        g2e: countObjectKeys(marks2.g2e),
        e2g: countObjectKeys(marks2.e2g),
        morph: countObjectKeys(marks2.morph)
      },
      progress: {
        g2e: countObjectKeys(progress.g2e),
        e2g: countObjectKeys(progress.e2g),
        morph: countObjectKeys(progress.morph)
      }
    };
  }
  function formatPersistedStateSummary(summary) {
    const safe = isPlainObject(summary) ? summary : {};
    const marks2 = isPlainObject(safe.marks) ? safe.marks : {};
    const progress = isPlainObject(safe.progress) ? safe.progress : {};
    return `Sets ${safe.selectedSets || 0} \xB7 Marks G\u2192E ${marks2.g2e || 0}, E\u2192G ${marks2.e2g || 0}, Grammar ${marks2.morph || 0} \xB7 Progress G\u2192E ${progress.g2e || 0}, E\u2192G ${progress.e2g || 0}, Grammar ${progress.morph || 0}`;
  }
  var STATE_MIGRATIONS = [
    {
      name: "card-ids-legacy-raw-to-indexed-stable",
      match(saved) {
        const buckets = [
          saved.globalWordMarks?.g2e,
          saved.globalWordMarks?.e2g,
          saved.globalWordProgress?.g2e,
          saved.globalWordProgress?.e2g
        ];
        const oldFormat = /^([^-]+)-(\d+)-(.+)$/u;
        return buckets.some((bucket) => bucket && Object.keys(bucket).some((id) => {
          const m = id.match(oldFormat);
          return !!(m && m[3] !== stableKey2(m[3]));
        }));
      },
      migrate(saved) {
        const oldFormat = /^([^-]+)-(\d+)-(.+)$/u;
        const rewriteBucket = (bucket) => {
          if (!bucket) return bucket;
          const next = {};
          Object.keys(bucket).forEach((id) => {
            const m = id.match(oldFormat);
            if (m && m[3] !== stableKey2(m[3])) {
              const newId = `${m[1]}-${m[2]}-${stableKey2(m[3])}`;
              next[newId] = bucket[id];
            } else {
              next[id] = bucket[id];
            }
          });
          return next;
        };
        ["g2e", "e2g"].forEach((dir) => {
          if (saved.globalWordMarks?.[dir]) saved.globalWordMarks[dir] = rewriteBucket(saved.globalWordMarks[dir]);
          if (saved.globalWordProgress?.[dir]) saved.globalWordProgress[dir] = rewriteBucket(saved.globalWordProgress[dir]);
        });
        saved.deckStates = {};
        return saved;
      }
    },
    {
      name: "card-ids-stable-to-indexed-stable",
      match(saved) {
        const buckets = [
          saved.globalWordMarks?.g2e,
          saved.globalWordMarks?.e2g,
          saved.globalWordProgress?.g2e,
          saved.globalWordProgress?.e2g
        ];
        const legacyIdMap = getLegacyStableIdMap();
        return buckets.some((bucket) => bucket && Object.keys(bucket).some((id) => legacyIdMap.has(id)));
      },
      migrate(saved) {
        const legacyIdMap = getLegacyStableIdMap();
        const rewriteBucket = (bucket) => {
          if (!bucket) return bucket;
          const next = {};
          Object.keys(bucket).forEach((id) => {
            const targets = legacyIdMap.get(id);
            if (targets && targets.length) {
              targets.forEach((targetId) => {
                next[targetId] = bucket[id];
              });
            } else {
              next[id] = bucket[id];
            }
          });
          return next;
        };
        ["g2e", "e2g"].forEach((dir) => {
          if (saved.globalWordMarks?.[dir]) saved.globalWordMarks[dir] = rewriteBucket(saved.globalWordMarks[dir]);
          if (saved.globalWordProgress?.[dir]) saved.globalWordProgress[dir] = rewriteBucket(saved.globalWordProgress[dir]);
        });
        saved.deckStates = {};
        return saved;
      }
    },
    {
      name: "grammar-consolidation-clear-orphans",
      match(saved) {
        const liveIds = getCurrentGrammarAndMorphCardIdSet();
        const buckets = [
          saved.globalWordMarks?.morph,
          saved.globalWordProgress?.morph
        ];
        return buckets.some((bucket) => bucket && Object.keys(bucket).some(
          (id) => isLegacyOrphanedMorphId(id, liveIds)
        ));
      },
      migrate(saved) {
        const liveIds = getCurrentGrammarAndMorphCardIdSet();
        const dropOrphans = (bucket) => {
          if (!bucket) return bucket;
          const next = {};
          Object.keys(bucket).forEach((id) => {
            if (!isLegacyOrphanedMorphId(id, liveIds)) next[id] = bucket[id];
          });
          return next;
        };
        if (saved.globalWordMarks?.morph) saved.globalWordMarks.morph = dropOrphans(saved.globalWordMarks.morph);
        if (saved.globalWordProgress?.morph) saved.globalWordProgress.morph = dropOrphans(saved.globalWordProgress.morph);
        saved.deckStates = {};
        return saved;
      }
    }
  ];

  // js/state/store.js
  var STUDY_IDLE_MS = 90 * 1e3;
  var STUDY_SESSION_BREAK_MS = 30 * 60 * 1e3;
  function sanitizeGamificationState(candidate) {
    if (!isPlainObject(candidate)) return { lastCelebratedLevel: null, lastCelebratedBadgeDay: null, lastEarnedAchievementIds: [] };
    return {
      lastCelebratedLevel: Number.isFinite(candidate.lastCelebratedLevel) ? candidate.lastCelebratedLevel : null,
      lastCelebratedBadgeDay: typeof candidate.lastCelebratedBadgeDay === "string" ? candidate.lastCelebratedBadgeDay : null,
      lastEarnedAchievementIds: Array.isArray(candidate.lastEarnedAchievementIds) ? candidate.lastEarnedAchievementIds : []
    };
  }

  // js/app/main.js
  var STORAGE_KEY = "greekFlashcardsStateV18";
  var CONSENT_STORAGE_KEY = "greekFlashcardsConsentV1";
  var THEME_STORAGE_KEY = "greekFlashcardsThemeMode";
  var PROGRESS_EXPORT_FORMAT = "greek-flashcards-progress-export";
  var PROGRESS_EXPORT_VERSION = 2;
  var STUDY_IDLE_MS2 = 90 * 1e3;
  var STUDY_SESSION_BREAK_MS2 = 30 * 60 * 1e3;
  var MAX_STUDY_SESSION_HISTORY = 500;
  var appUsageStats = {
    totalMs: 0,
    dailyMs: {},
    activeStudyMs: 0,
    activeDailyMs: {},
    lastActiveAt: 0,
    lastStudyInteractionAt: 0,
    lastStudyCountedAt: 0,
    firstStudyAt: 0,
    studySessionHistory: [],
    currentStudySession: null
  };
  var appProfile = "vocab_only";
  var appGamification = { lastCelebratedLevel: null, lastCelebratedBadgeDay: null, lastEarnedAchievementIds: [] };
  var hasAcceptedDisclaimer = false;
  var disclaimerModalRequiresAgreement = false;
  var transferModalMode = "";
  var themeMode = "system";
  var transferPrimaryAction = null;
  var transferSecondaryAction = null;
  var usageTickHandle = null;
  var usageVisibilityBound = false;
  var usageTickCounter = 0;
  var studyMode = "vocab";
  var levelToastHideTimer = null;
  var levelToastRemoveTimer = null;
  var toastQueue = [];
  var toastActive = false;
  var morphSelfCheck = false;
  var morphAnswerState = { answered: false, revealed: false, selfRated: false, selectedIndex: -1, isCorrect: null };
  var morphPendingAdvance = false;
  var deckStates = {};
  var globalWordMarks = {};
  var globalWordProgress = {};
  function getDirectionKey() {
    return directionToGreek ? "e2g" : "g2e";
  }
  function getStudyStoreKey() {
    return studyMode === "morph" ? "morph" : getDirectionKey();
  }
  function ensureDirectionalStores() {
    if (!globalWordMarks || typeof globalWordMarks !== "object" || Array.isArray(globalWordMarks)) globalWordMarks = {};
    if (!globalWordProgress || typeof globalWordProgress !== "object" || Array.isArray(globalWordProgress)) globalWordProgress = {};
    const migrateLegacyBucket = (bucketObj) => {
      const keys = Object.keys(bucketObj || {});
      if (keys.length && !("g2e" in bucketObj) && !("e2g" in bucketObj) && !("morph" in bucketObj)) {
        return { g2e: { ...bucketObj }, e2g: {}, morph: {} };
      }
      return bucketObj;
    };
    globalWordMarks = migrateLegacyBucket(globalWordMarks);
    globalWordProgress = migrateLegacyBucket(globalWordProgress);
    if (!globalWordMarks.g2e || typeof globalWordMarks.g2e !== "object") globalWordMarks.g2e = {};
    if (!globalWordMarks.e2g || typeof globalWordMarks.e2g !== "object") globalWordMarks.e2g = {};
    if (!globalWordMarks.morph || typeof globalWordMarks.morph !== "object") globalWordMarks.morph = {};
    if (!globalWordProgress.g2e || typeof globalWordProgress.g2e !== "object") globalWordProgress.g2e = {};
    if (!globalWordProgress.e2g || typeof globalWordProgress.e2g !== "object") globalWordProgress.e2g = {};
    if (!globalWordProgress.morph || typeof globalWordProgress.morph !== "object") globalWordProgress.morph = {};
  }
  function getDirectionalMarksStore() {
    ensureDirectionalStores();
    return globalWordMarks[getStudyStoreKey()];
  }
  function getDirectionalProgressStore() {
    ensureDirectionalStores();
    return globalWordProgress[getStudyStoreKey()];
  }
  var currentSession = null;
  var selectedKeys = [];
  var deck = [];
  var originalDeck = [];
  var currentIdx = 0;
  var isFlipped = false;
  var shuffled = true;
  var requiredOnly = false;
  var directionToGreek = false;
  var spacedRepetition = true;
  var activeDeckCount = 0;
  var unspacedPendingRecycle = false;
  var unspacedCycleState = {};
  var spacedUndoSnapshot = null;
  var marks = {};
  function isMorphologyMode() {
    return studyMode === "morph";
  }
  function isVocabOnlyProfile() {
    return appProfile === "vocab_only";
  }
  function canAccessGrammarUi() {
    return !isVocabOnlyProfile();
  }
  function getProfileDescription() {
    return isVocabOnlyProfile() ? "Simplified vocabulary layout. Shared time tracking still runs across the whole app." : "Full layout with vocabulary and grammar. Time totals stay shared, while progress remains separate by module.";
  }
  function isMorphCard3(card) {
    return !!card && card.kind === "morph";
  }
  function resetMorphAnswerState() {
    morphAnswerState = { answered: false, revealed: false, selfRated: false, selectedIndex: -1, isCorrect: null };
    morphPendingAdvance = false;
  }
  function getModeDescription() {
    if (isVocabOnlyProfile()) return "Vocabulary Flashcards";
    return isMorphologyMode() ? "Grammar Quiz" : "Vocabulary Flashcards";
  }
  function resolveThemeMode(mode = themeMode) {
    if (mode === "light" || mode === "dark") return mode;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  function applyThemeMode(mode = themeMode, persist = true) {
    themeMode = mode === "light" || mode === "dark" ? mode : "system";
    const resolved = resolveThemeMode(themeMode);
    document.documentElement.setAttribute("data-theme", resolved);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute("content", resolved === "light" ? "#f4efe3" : "#0e0f14");
    const storage = getStorage();
    if (persist && storage) storage.setItem(THEME_STORAGE_KEY, themeMode);
    syncThemeButtons();
  }
  function syncThemeButtons() {
    const systemBtn = document.getElementById("themeSystemBtn");
    const darkBtn = document.getElementById("themeDarkBtn");
    const lightBtn = document.getElementById("themeLightBtn");
    if (systemBtn) systemBtn.classList.toggle("active", themeMode === "system");
    if (darkBtn) darkBtn.classList.toggle("active", themeMode === "dark");
    if (lightBtn) lightBtn.classList.toggle("active", themeMode === "light");
  }
  function setThemeMode(mode) {
    applyThemeMode(mode, true);
  }
  function initializeThemeMode() {
    const storage = getStorage();
    const savedMode = storage ? storage.getItem(THEME_STORAGE_KEY) : null;
    themeMode = savedMode === "light" || savedMode === "dark" || savedMode === "system" ? savedMode : "system";
    applyThemeMode(themeMode, false);
    if (window.matchMedia) {
      const media = window.matchMedia("(prefers-color-scheme: light)");
      const handleChange = () => {
        if (themeMode === "system") applyThemeMode("system", false);
      };
      if (typeof media.addEventListener === "function") media.addEventListener("change", handleChange);
      else if (typeof media.addListener === "function") media.addListener(handleChange);
    }
  }
  function syncToggleButtons() {
    const requiredSwitch = document.getElementById("requiredBtn");
    const shuffleSwitch = document.getElementById("shuffleBtn");
    const directionSwitch = document.getElementById("directionBtn");
    const spacedSwitch = document.getElementById("spacedBtn");
    const selfCheckBtn = document.getElementById("selfCheckBtn");
    const shuffleToggle = document.getElementById("shuffleToggle");
    const requiredToggle = document.getElementById("requiredToggle");
    const directionToggle = document.getElementById("directionToggle");
    const spacedToggle = document.getElementById("spacedToggle");
    const selfCheckToggle = document.getElementById("selfCheckToggle");
    const modeVocabBtn = document.getElementById("modeVocabBtn");
    const modeMorphBtn = document.getElementById("modeMorphBtn");
    const profileVocabOnlyBtn = document.getElementById("profileVocabOnlyBtn");
    const profileVocabGrammarBtn = document.getElementById("profileVocabGrammarBtn");
    const profileNote = document.getElementById("profileNote");
    const resetDeckBtn = document.getElementById("resetDeckBtn");
    if (shuffleSwitch) shuffleSwitch.classList.toggle("on", !!shuffled);
    if (requiredSwitch) requiredSwitch.classList.toggle("on", !!requiredOnly);
    if (directionSwitch) directionSwitch.classList.toggle("on", !!directionToGreek && !isMorphologyMode());
    if (spacedSwitch) spacedSwitch.classList.toggle("on", !!spacedRepetition);
    if (selfCheckBtn) selfCheckBtn.classList.toggle("on", !!morphSelfCheck && isMorphologyMode());
    if (shuffleToggle) shuffleToggle.setAttribute("aria-checked", shuffled ? "true" : "false");
    if (requiredToggle) requiredToggle.setAttribute("aria-checked", requiredOnly ? "true" : "false");
    if (directionToggle) directionToggle.setAttribute("aria-checked", directionToGreek && !isMorphologyMode() ? "true" : "false");
    if (spacedToggle) spacedToggle.setAttribute("aria-checked", spacedRepetition ? "true" : "false");
    if (selfCheckToggle) selfCheckToggle.setAttribute("aria-checked", morphSelfCheck && isMorphologyMode() ? "true" : "false");
    if (modeVocabBtn) modeVocabBtn.classList.toggle("active", studyMode === "vocab");
    if (modeMorphBtn) modeMorphBtn.classList.toggle("active", studyMode === "morph");
    if (profileVocabOnlyBtn) profileVocabOnlyBtn.classList.toggle("active", isVocabOnlyProfile());
    if (profileVocabGrammarBtn) profileVocabGrammarBtn.classList.toggle("active", !isVocabOnlyProfile());
    if (profileNote) profileNote.textContent = getProfileDescription();
    syncThemeButtons();
    if (resetDeckBtn) {
      resetDeckBtn.textContent = spacedRepetition ? "Reset spaced" : "Reset unspaced";
      resetDeckBtn.title = spacedRepetition ? "Reset spaced-review scheduling for this deck only" : "Reset unspaced marks for this deck only";
    }
    const subtitle = document.getElementById("appSubtitle");
    if (subtitle) subtitle.textContent = getModeDescription();
    syncLayoutVisibility();
  }
  function syncLayoutVisibility() {
    const controlsBar = document.getElementById("controlsBar");
    const navRow = document.getElementById("navRow");
    const markRow = document.getElementById("markRow");
    const prevBtn = navRow ? navRow.querySelector(".nav-prev") : null;
    const nextBtn = navRow ? navRow.querySelector(".nav-next") : null;
    const undoBtn = document.getElementById("spacedUndoBtn");
    const directionToggle = document.getElementById("directionToggle");
    const requiredToggle = document.getElementById("requiredToggle");
    const selfCheckToggle = document.getElementById("selfCheckToggle");
    const modeGroup = document.querySelector('.mode-group[aria-label="Study mode"]');
    if (controlsBar) controlsBar.style.display = "flex";
    if (navRow) navRow.style.display = selectedKeys.length ? "flex" : "none";
    if (markRow) markRow.style.display = selectedKeys.length && !isMorphologyMode() ? "flex" : "none";
    if (directionToggle) directionToggle.style.display = isMorphologyMode() ? "none" : "flex";
    if (requiredToggle) requiredToggle.style.display = isMorphologyMode() ? "none" : "flex";
    if (selfCheckToggle) selfCheckToggle.style.display = isMorphologyMode() && canAccessGrammarUi() ? "flex" : "none";
    if (modeGroup) modeGroup.style.display = canAccessGrammarUi() ? "inline-flex" : "none";
    if (prevBtn) prevBtn.style.display = spacedRepetition && !isMorphologyMode() ? "none" : "";
    if (undoBtn) undoBtn.style.display = spacedRepetition && !isMorphologyMode() && !!spacedUndoSnapshot ? "" : "none";
    if (nextBtn) {
      if (isMorphologyMode()) {
        nextBtn.textContent = "Next \u2192";
        nextBtn.classList.remove("spaced-again");
      } else {
        nextBtn.textContent = spacedRepetition ? "Again \u2192" : "Next \u2192";
        nextBtn.classList.toggle("spaced-again", !!spacedRepetition);
      }
    }
  }
  function ensureUsageStats(stats = appUsageStats) {
    const safe = stats && typeof stats === "object" ? stats : {};
    safe.totalMs = Number.isFinite(safe.totalMs) ? Math.max(0, safe.totalMs) : 0;
    safe.dailyMs = safe.dailyMs && typeof safe.dailyMs === "object" ? safe.dailyMs : {};
    safe.activeStudyMs = Number.isFinite(safe.activeStudyMs) ? Math.max(0, safe.activeStudyMs) : 0;
    safe.activeDailyMs = safe.activeDailyMs && typeof safe.activeDailyMs === "object" ? safe.activeDailyMs : {};
    safe.lastActiveAt = Number.isFinite(safe.lastActiveAt) ? safe.lastActiveAt : 0;
    safe.lastStudyInteractionAt = Number.isFinite(safe.lastStudyInteractionAt) ? safe.lastStudyInteractionAt : 0;
    safe.lastStudyCountedAt = Number.isFinite(safe.lastStudyCountedAt) ? safe.lastStudyCountedAt : 0;
    safe.firstStudyAt = Number.isFinite(safe.firstStudyAt) ? safe.firstStudyAt : 0;
    safe.studySessionHistory = Array.isArray(safe.studySessionHistory) ? safe.studySessionHistory.filter((entry) => entry && typeof entry === "object").map((entry) => ({
      startedAt: Number.isFinite(entry.startedAt) ? Math.max(0, entry.startedAt) : 0,
      endedAt: Number.isFinite(entry.endedAt) ? Math.max(0, entry.endedAt) : 0,
      durationMs: Number.isFinite(entry.durationMs) ? Math.max(0, entry.durationMs) : 0,
      interactionCount: Number.isFinite(entry.interactionCount) ? Math.max(0, entry.interactionCount) : 0
    })).filter((entry) => entry.startedAt && entry.endedAt && entry.durationMs > 0).slice(-MAX_STUDY_SESSION_HISTORY) : [];
    safe.currentStudySession = safe.currentStudySession && typeof safe.currentStudySession === "object" ? {
      startedAt: Number.isFinite(safe.currentStudySession.startedAt) ? Math.max(0, safe.currentStudySession.startedAt) : 0,
      durationMs: Number.isFinite(safe.currentStudySession.durationMs) ? Math.max(0, safe.currentStudySession.durationMs) : 0,
      interactionCount: Number.isFinite(safe.currentStudySession.interactionCount) ? Math.max(0, safe.currentStudySession.interactionCount) : 0
    } : null;
    if (safe.currentStudySession && !safe.currentStudySession.startedAt) safe.currentStudySession = null;
    safe.cardXpEarned = Number.isFinite(safe.cardXpEarned) ? Math.max(0, safe.cardXpEarned) : -1;
    if (stats !== safe) appUsageStats = safe;
    return safe;
  }
  function addUsageSlice(startTs, durationMs) {
    if (!durationMs || durationMs <= 0) return;
    const usage = ensureUsageStats();
    addDailyDurationSlice(usage.dailyMs, startTs, durationMs);
    usage.totalMs += durationMs;
  }
  function addActiveStudySlice(startTs, durationMs) {
    if (!durationMs || durationMs <= 0) return;
    const usage = ensureUsageStats();
    addDailyDurationSlice(usage.activeDailyMs, startTs, durationMs);
    usage.activeStudyMs += durationMs;
    if (usage.currentStudySession) {
      usage.currentStudySession.durationMs = (usage.currentStudySession.durationMs || 0) + durationMs;
    }
  }
  function accumulateUsageTime(now = Date.now()) {
    const usage = ensureUsageStats();
    if (!usage.lastActiveAt) {
      usage.lastActiveAt = now;
      return 0;
    }
    const rawDelta = now - usage.lastActiveAt;
    const delta = clamp(rawDelta, 0, 10 * 60 * 1e3);
    if (delta > 0) addUsageSlice(usage.lastActiveAt, delta);
    usage.lastActiveAt = now;
    return delta;
  }
  function accumulateActiveStudyTime(now = Date.now()) {
    const usage = ensureUsageStats();
    if (!usage.lastStudyInteractionAt || !usage.lastStudyCountedAt) return 0;
    const eligibleEnd = Math.min(now, usage.lastStudyInteractionAt + STUDY_IDLE_MS2);
    const delta = clamp(eligibleEnd - usage.lastStudyCountedAt, 0, STUDY_IDLE_MS2);
    if (delta > 0) {
      addActiveStudySlice(usage.lastStudyCountedAt, delta);
      usage.lastStudyCountedAt = eligibleEnd;
    }
    return delta;
  }
  function finalizeStudySession(now = Date.now()) {
    const usage = ensureUsageStats();
    accumulateActiveStudyTime(now);
    if (usage.currentStudySession && usage.currentStudySession.startedAt && usage.currentStudySession.durationMs > 0) {
      usage.studySessionHistory.push({
        startedAt: usage.currentStudySession.startedAt,
        endedAt: usage.lastStudyCountedAt || now,
        durationMs: usage.currentStudySession.durationMs,
        interactionCount: usage.currentStudySession.interactionCount || 0
      });
      usage.studySessionHistory = usage.studySessionHistory.slice(-MAX_STUDY_SESSION_HISTORY);
    }
    usage.currentStudySession = null;
    usage.lastStudyInteractionAt = 0;
    usage.lastStudyCountedAt = 0;
  }
  function noteStudyInteraction(now = Date.now()) {
    if (document.hidden || !selectedKeys.length) return;
    const usage = ensureUsageStats();
    if (!usage.firstStudyAt) usage.firstStudyAt = now;
    if (usage.lastStudyInteractionAt && now - usage.lastStudyInteractionAt > STUDY_SESSION_BREAK_MS2) {
      finalizeStudySession(now);
    }
    if (!usage.currentStudySession) {
      usage.currentStudySession = {
        startedAt: now,
        durationMs: 0,
        interactionCount: 0
      };
    }
    accumulateActiveStudyTime(now);
    usage.lastStudyInteractionAt = now;
    if (!usage.lastStudyCountedAt) usage.lastStudyCountedAt = now;
    usage.currentStudySession.interactionCount = (usage.currentStudySession.interactionCount || 0) + 1;
  }
  function getTodayActiveStudyMs() {
    const usage = ensureUsageStats();
    return usage.activeDailyMs[getUsageDayKey()] || 0;
  }
  function updateUsageMeta() {
    const el = document.getElementById("progressMeta");
    if (!el) return;
    const usage = ensureUsageStats();
    el.textContent = `Today ${formatUsageDuration(getTodayActiveStudyMs())} \xB7 Study ${formatUsageDuration(usage.activeStudyMs)} \xB7 Total ${formatUsageDuration(usage.totalMs)}`;
  }
  function startUsageTracking() {
    ensureUsageStats();
    if (!document.hidden && !appUsageStats.lastActiveAt) {
      appUsageStats.lastActiveAt = Date.now();
    }
    if (!usageVisibilityBound) {
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          const now = Date.now();
          accumulateUsageTime(now);
          finalizeStudySession(now);
          appUsageStats.lastActiveAt = 0;
          updateUsageMeta();
          saveState();
        } else {
          appUsageStats.lastActiveAt = Date.now();
          updateUsageMeta();
        }
      });
      window.addEventListener("pagehide", () => {
        const now = Date.now();
        accumulateUsageTime(now);
        finalizeStudySession(now);
        appUsageStats.lastActiveAt = 0;
        saveState();
      });
      usageVisibilityBound = true;
    }
    if (!usageTickHandle) {
      usageTickHandle = window.setInterval(() => {
        if (document.hidden) return;
        const now = Date.now();
        const delta = accumulateUsageTime(now);
        const activeDelta = accumulateActiveStudyTime(now);
        if (delta > 0 || activeDelta > 0) {
          updateUsageMeta();
          if (isAnalyticsModalOpen()) renderAnalyticsOverlay();
          usageTickCounter += 1;
          if (usageTickCounter >= 4) {
            usageTickCounter = 0;
            saveState();
          }
        }
      }, 15e3);
    }
  }
  function resetUnspacedCycleState() {
    unspacedCycleState = {};
  }
  function getUnspacedCycleEntry(cardId) {
    if (!unspacedCycleState[cardId] || typeof unspacedCycleState[cardId] !== "object") {
      unspacedCycleState[cardId] = { wrongThisCycle: false, correctCount: 0, lastOutcome: null };
    }
    return unspacedCycleState[cardId];
  }
  function applyUnspacedSharedSchedule(card, outcome, reviewedAt = Date.now()) {
    const progress = getWordProgress(card.id);
    const cycleEntry = getUnspacedCycleEntry(card.id);
    const normalizedOutcome = outcome === "easy" ? "easy" : outcome === "pass" ? "pass" : "again";
    if (normalizedOutcome === "again") {
      cycleEntry.wrongThisCycle = true;
      cycleEntry.lastOutcome = "again";
      setProgressDelay(progress, SRS_AGAIN_MS, reviewedAt);
      return progress;
    }
    const recoveringFromMiss = cycleEntry.wrongThisCycle;
    const minimumDelayMs = normalizedOutcome === "pass" || recoveringFromMiss ? SRS_UNCERTAIN_MIN_MS : SRS_DAY_MS;
    cycleEntry.correctCount += 1;
    cycleEntry.lastOutcome = normalizedOutcome;
    setMinimumProgressDelay(progress, minimumDelayMs, reviewedAt);
    return progress;
  }
  function getSelectedCards(keys) {
    if (isMorphologyMode()) {
      return getSelectedGrammarCards(keys);
    }
    return getSelectedVocabCards(keys, false);
  }
  function advanceScheduledCards(cards = originalDeck, advanceMs = SRS_CYCLE_ADVANCE_MS) {
    const now = Date.now();
    (cards || []).forEach((card) => {
      const progress = getWordProgress(card.id);
      if (progress.dueAt && progress.dueAt > now) {
        progress.dueAt = Math.max(now, progress.dueAt - advanceMs);
        progress.intervalDays = Math.max(0, (progress.dueAt - now) / (24 * 60 * 60 * 1e3));
      }
    });
  }
  function getWordProgress(cardId) {
    const progressStore = getDirectionalProgressStore();
    const existing = progressStore[cardId];
    if (existing && typeof existing === "object") {
      existing.seenCount = Number.isFinite(existing.seenCount) ? Math.max(0, existing.seenCount) : 0;
      existing.passCount = Number.isFinite(existing.passCount) ? Math.max(0, existing.passCount) : 0;
      existing.failCount = Number.isFinite(existing.failCount) ? Math.max(0, existing.failCount) : 0;
      existing.streak = Number.isFinite(existing.streak) ? Math.max(0, existing.streak) : 0;
      existing.easyStreak = Number.isFinite(existing.easyStreak) ? Math.max(0, existing.easyStreak) : 0;
      existing.srsStage = Number.isFinite(existing.srsStage) ? Math.max(0, Math.floor(existing.srsStage)) : 0;
      existing.ease = clamp(Number.isFinite(existing.ease) ? existing.ease : 2.3, 1.3, 3);
      existing.intervalDays = Number.isFinite(existing.intervalDays) ? Math.max(0, existing.intervalDays) : 0;
      existing.lastEasyIntervalDays = Number.isFinite(existing.lastEasyIntervalDays) ? Math.max(0, existing.lastEasyIntervalDays) : 0;
      existing.dueAt = Number.isFinite(existing.dueAt) ? Math.max(0, existing.dueAt) : 0;
      existing.lastReviewedAt = Number.isFinite(existing.lastReviewedAt) ? Math.max(0, existing.lastReviewedAt) : 0;
      existing.firstSeenAt = Number.isFinite(existing.firstSeenAt) ? Math.max(0, existing.firstSeenAt) : 0;
      existing.firstConfirmedAt = Number.isFinite(existing.firstConfirmedAt) ? Math.max(0, existing.firstConfirmedAt) : 0;
      existing.confidence = Number.isFinite(existing.confidence) ? Math.max(0, existing.confidence) : 0;
      existing.confidenceHistory = Array.isArray(existing.confidenceHistory) ? existing.confidenceHistory.filter((value) => Number.isFinite(value)).slice(-4) : [];
      return existing;
    }
    const fresh = {
      seenCount: 0,
      passCount: 0,
      failCount: 0,
      streak: 0,
      easyStreak: 0,
      srsStage: 0,
      ease: 2.3,
      intervalDays: 0,
      lastEasyIntervalDays: 0,
      dueAt: 0,
      lastReviewedAt: 0,
      firstSeenAt: 0,
      firstConfirmedAt: 0,
      confidence: 0,
      confidenceHistory: []
    };
    progressStore[cardId] = fresh;
    return fresh;
  }
  function isCardDue(card) {
    if (!spacedRepetition) return true;
    const progress = getWordProgress(card.id);
    return !progress.dueAt || progress.dueAt <= Date.now();
  }
  function sortCardsByDue(cards) {
    return [...cards].sort((a, b) => {
      const aDue = getWordProgress(a.id).dueAt || 0;
      const bDue = getWordProgress(b.id).dueAt || 0;
      if (aDue !== bDue) return aDue - bDue;
      return a.id.localeCompare(b.id);
    });
  }
  function clearSpacedUndoSnapshot() {
    spacedUndoSnapshot = null;
  }
  function captureSpacedUndoSnapshot() {
    if (!spacedRepetition || !selectedKeys.length || isMorphologyMode() || currentIdx >= activeDeckCount || !deck[currentIdx]) {
      clearSpacedUndoSnapshot();
      return;
    }
    spacedUndoSnapshot = {
      selectedKeys: cloneForUndo(selectedKeys),
      currentSessionId: currentSession ? currentSession.id : null,
      studyMode,
      directionToGreek,
      requiredOnly,
      shuffled,
      spacedRepetition,
      currentIdx,
      activeDeckCount,
      isFlipped,
      unspacedPendingRecycle,
      deck: cloneForUndo(deck),
      originalDeck: cloneForUndo(originalDeck),
      marksStore: cloneForUndo(getDirectionalMarksStore()),
      progressStore: cloneForUndo(getDirectionalProgressStore()),
      appUsageStats: cloneForUndo(appUsageStats),
      appGamification: cloneForUndo(appGamification)
    };
  }
  function restoreSpacedUndo() {
    if (!spacedUndoSnapshot || !spacedUndoSnapshot.spacedRepetition) return;
    if (studyMode !== spacedUndoSnapshot.studyMode) return;
    if (directionToGreek !== spacedUndoSnapshot.directionToGreek) return;
    if (requiredOnly !== spacedUndoSnapshot.requiredOnly) return;
    if (shuffled !== spacedUndoSnapshot.shuffled) return;
    if (JSON.stringify(selectedKeys) !== JSON.stringify(spacedUndoSnapshot.selectedKeys || [])) return;
    if ((currentSession ? currentSession.id : null) !== (spacedUndoSnapshot.currentSessionId || null)) return;
    const marksStore = getDirectionalMarksStore();
    Object.keys(marksStore).forEach((key) => delete marksStore[key]);
    Object.assign(marksStore, cloneForUndo(spacedUndoSnapshot.marksStore) || {});
    const progressStore = getDirectionalProgressStore();
    Object.keys(progressStore).forEach((key) => delete progressStore[key]);
    Object.assign(progressStore, cloneForUndo(spacedUndoSnapshot.progressStore) || {});
    marks = marksStore;
    originalDeck = cloneForUndo(spacedUndoSnapshot.originalDeck) || [];
    deck = cloneForUndo(spacedUndoSnapshot.deck) || [];
    appUsageStats = ensureUsageStats(cloneForUndo(spacedUndoSnapshot.appUsageStats));
    appGamification = sanitizeGamificationState(cloneForUndo(spacedUndoSnapshot.appGamification));
    const restoredLevel = computeXpAndLevel(appUsageStats).currentLevel.level;
    if (!Number.isFinite(appGamification.lastCelebratedLevel) || appGamification.lastCelebratedLevel < 1 || appGamification.lastCelebratedLevel > restoredLevel) {
      appGamification.lastCelebratedLevel = restoredLevel;
    }
    currentIdx = Math.max(0, Math.min(spacedUndoSnapshot.currentIdx || 0, deck.length ? deck.length - 1 : 0));
    activeDeckCount = Math.max(0, spacedUndoSnapshot.activeDeckCount || 0);
    isFlipped = !!spacedUndoSnapshot.isFlipped;
    unspacedPendingRecycle = !!spacedUndoSnapshot.unspacedPendingRecycle;
    clearSpacedUndoSnapshot();
    resetMorphAnswerState();
    renderCard();
    renderReview();
    renderProgress();
    syncLayoutVisibility();
    saveState();
  }
  function buildStudyDeck(cards, options = {}) {
    if (!spacedRepetition) {
      activeDeckCount = cards.filter((card) => marks[card.id] !== "known").length;
      return shuffled ? shuffleArray([...cards]) : [...cards];
    }
    const forceShuffle = !!options.forceShuffle;
    let promotedNearCards = false;
    let dueCards = cards.filter(isCardDue);
    if (!dueCards.length) {
      const now = Date.now();
      const nearCards = cards.filter((card) => {
        const p = getWordProgress(card.id);
        return p.dueAt && p.dueAt > now && p.dueAt <= now + SRS_NEAR_WINDOW_MS;
      });
      if (nearCards.length) {
        nearCards.forEach((card) => {
          const progress = getWordProgress(card.id);
          progress.dueAt = now;
          progress.intervalDays = 0;
        });
        promotedNearCards = true;
        dueCards = cards.filter(isCardDue);
      }
    }
    const deferredCards = cards.filter((card) => !isCardDue(card));
    const prevDueIds = new Set(
      (deck || []).slice(0, activeDeckCount || 0).filter((card) => card && dueCards.some((d) => d.id === card.id)).map((card) => card.id)
    );
    const existingInOrder = [];
    (deck || []).forEach((card) => {
      if (card && prevDueIds.has(card.id)) {
        const match = dueCards.find((d) => d.id === card.id);
        if (match) existingInOrder.push(match);
      }
    });
    const newlyDue = dueCards.filter((card) => !prevDueIds.has(card.id));
    let orderedDue;
    if (forceShuffle || promotedNearCards) {
      orderedDue = shuffleArray([...dueCards]);
    } else if (!existingInOrder.length) {
      orderedDue = shuffled ? shuffleArray([...dueCards]) : sortCardsByDue(dueCards);
    } else {
      orderedDue = [...existingInOrder, ...newlyDue];
    }
    const orderedDeferred = sortCardsByDue(deferredCards);
    activeDeckCount = orderedDue.length;
    return [...orderedDue, ...orderedDeferred];
  }
  function recordStudyOutcome(cardId, outcome, reviewedAt = Date.now()) {
    const progress = getWordProgress(cardId);
    const isFirstConfirmation = !progress.firstConfirmedAt;
    const xpAward = computeCardXpAward(outcome, isFirstConfirmation, spacedRepetition);
    const usage = ensureUsageStats();
    if (usage.cardXpEarned < 0) migrateLegacyXp(usage);
    usage.cardXpEarned = (usage.cardXpEarned || 0) + xpAward;
    progress.seenCount += 1;
    progress.lastReviewedAt = reviewedAt;
    progress.firstSeenAt = progress.firstSeenAt || reviewedAt;
    recordConfidenceSample(progress, outcome);
    if (outcome === "easy" || outcome === "known") {
      progress.passCount += 1;
      progress.firstConfirmedAt = progress.firstConfirmedAt || reviewedAt;
    } else {
      progress.failCount += 1;
    }
    return progress;
  }
  function getDeckAggregateStats(cards = originalDeck) {
    return (cards || []).reduce((totals, card) => {
      const progress = getWordProgress(card.id);
      totals.seenCount += progress.seenCount || 0;
      totals.passCount += progress.passCount || 0;
      totals.failCount += progress.failCount || 0;
      return totals;
    }, { seenCount: 0, passCount: 0, failCount: 0 });
  }
  function applySpacedReview(card, outcome) {
    const now = Date.now();
    const normalizedOutcome = outcome === "pass" ? "pass" : outcome === "easy" ? "easy" : "again";
    const progress = recordStudyOutcome(card.id, normalizedOutcome, now);
    if (normalizedOutcome === "easy") {
      const nextIntervalDays = getNextEasyIntervalDays(progress);
      progress.streak += 1;
      progress.easyStreak = (progress.easyStreak || 0) + 1;
      progress.srsStage = getSrsStage(progress) + 1;
      progress.ease = clamp(getSrsEase(progress) + 0.08, 1.3, 3);
      progress.lastEasyIntervalDays = nextIntervalDays;
      progress.firstConfirmedAt = progress.firstConfirmedAt || now;
      setProgressDelay(progress, msFromDays(nextIntervalDays), now);
      getDirectionalMarksStore()[card.id] = "known";
    } else if (normalizedOutcome === "pass") {
      progress.streak += 1;
      progress.easyStreak = 0;
      progress.ease = clamp(getSrsEase(progress) - 0.05, 1.3, 3);
      progress.lastEasyIntervalDays = Math.max(getLastEasyIntervalDays(progress), progress.intervalDays || 0);
      setProgressDelay(progress, getUncertainDelayMs(progress), now);
      getDirectionalMarksStore()[card.id] = "unsure";
    } else {
      progress.streak = 0;
      progress.easyStreak = 0;
      progress.srsStage = Math.max(0, getSrsStage(progress) - 1);
      progress.ease = clamp(getSrsEase(progress) - 0.2, 1.3, 3);
      progress.lastEasyIntervalDays = Math.max(getLastEasyIntervalDays(progress), progress.intervalDays || 0);
      setProgressDelay(progress, SRS_AGAIN_MS, now);
      getDirectionalMarksStore()[card.id] = "unsure";
    }
    progress.lastSpacedOutcome = normalizedOutcome;
    marks = getDirectionalMarksStore();
  }
  function getDueCount(cards = originalDeck) {
    return (cards || []).filter(isCardDue).length;
  }
  function getMorphSpacedOutcome(card, isCorrect) {
    if (!isCorrect) return "again";
    const progress = getWordProgress(card.id);
    return progress.lastSpacedOutcome === "again" ? "pass" : "easy";
  }
  function answerMorphologyChoice(choiceIndex) {
    if (!isMorphologyMode()) return;
    noteStudyInteraction();
    const card = deck[currentIdx];
    if (!card || !Array.isArray(card.choices) || morphAnswerState.answered) return;
    const selected = card.choices[choiceIndex];
    const isCorrect = selected === card.answer;
    morphAnswerState = {
      answered: true,
      revealed: true,
      selfRated: true,
      selectedIndex: choiceIndex,
      isCorrect
    };
    if (spacedRepetition) {
      applySpacedReview(card, getMorphSpacedOutcome(card, isCorrect));
      morphPendingAdvance = true;
    } else {
      const mark = isCorrect ? "known" : "unsure";
      const reviewedAt = Date.now();
      recordStudyOutcome(card.id, isCorrect ? "known" : "review", reviewedAt);
      applyUnspacedSharedSchedule(card, isCorrect ? "easy" : "again", reviewedAt);
      getDirectionalMarksStore()[card.id] = mark;
      marks = getDirectionalMarksStore();
    }
    renderCard();
    renderProgress();
    renderReview();
    saveState();
  }
  function revealMorphologyAnswer() {
    if (!isMorphologyMode()) return;
    noteStudyInteraction();
    const card = deck[currentIdx];
    if (!card || morphAnswerState.revealed) return;
    morphAnswerState = {
      ...morphAnswerState,
      revealed: true
    };
    renderCard();
  }
  function rateMorphologySelfCheck(isCorrect) {
    if (!isMorphologyMode()) return;
    noteStudyInteraction();
    const card = deck[currentIdx];
    if (!card || !morphAnswerState.revealed || morphAnswerState.answered) return;
    morphAnswerState = {
      answered: true,
      revealed: true,
      selfRated: true,
      selectedIndex: -1,
      isCorrect: !!isCorrect
    };
    if (spacedRepetition) {
      applySpacedReview(card, getMorphSpacedOutcome(card, isCorrect));
      morphPendingAdvance = true;
    } else {
      const mark = isCorrect ? "known" : "unsure";
      const reviewedAt = Date.now();
      recordStudyOutcome(card.id, isCorrect ? "known" : "review", reviewedAt);
      applyUnspacedSharedSchedule(card, isCorrect ? "easy" : "again", reviewedAt);
      getDirectionalMarksStore()[card.id] = mark;
      marks = getDirectionalMarksStore();
    }
    renderCard();
    renderProgress();
    renderReview();
    saveState();
  }
  function getKnownCount() {
    return originalDeck.filter((card) => marks[card.id] === "known").length;
  }
  function getRemainingCards() {
    if (spacedRepetition) {
      return deck.slice(0, activeDeckCount);
    }
    return deck.filter((card) => marks[card.id] !== "known");
  }
  function buildPersistedStatePayload() {
    saveCurrentDeckStateToBank();
    const usage = ensureUsageStats();
    return {
      currentSessionId: currentSession ? currentSession.id : null,
      selectedKeys: [...selectedKeys],
      shuffled,
      requiredOnly,
      directionToGreek,
      spacedRepetition,
      studyMode,
      appProfile,
      morphSelfCheck,
      gamification: sanitizeGamificationState(appGamification),
      deckStates,
      globalWordMarks,
      globalWordProgress,
      appUsageStats: {
        totalMs: usage.totalMs,
        dailyMs: usage.dailyMs,
        activeStudyMs: usage.activeStudyMs,
        activeDailyMs: usage.activeDailyMs,
        firstStudyAt: usage.firstStudyAt,
        studySessionHistory: usage.studySessionHistory,
        cardXpEarned: usage.cardXpEarned,
        lastActiveAt: 0,
        lastStudyInteractionAt: 0,
        lastStudyCountedAt: 0,
        currentStudySession: null
      }
    };
  }
  function sanitizeImportedState(candidate) {
    if (!isPlainObject(candidate)) return null;
    const hasRecognizedStateShape = ["selectedKeys", "deckStates", "globalWordMarks", "globalWordProgress", "appUsageStats"].some((key) => key in candidate);
    if (!hasRecognizedStateShape) return null;
    const state = { ...candidate };
    state.selectedKeys = Array.isArray(candidate.selectedKeys) ? candidate.selectedKeys.map(String) : [];
    state.deckStates = isPlainObject(candidate.deckStates) ? candidate.deckStates : {};
    state.globalWordMarks = isPlainObject(candidate.globalWordMarks) ? candidate.globalWordMarks : {};
    state.globalWordProgress = isPlainObject(candidate.globalWordProgress) ? candidate.globalWordProgress : {};
    state.studyMode = candidate.studyMode === "morph" ? "morph" : "vocab";
    state.appProfile = candidate.appProfile === "vocab_only" || candidate.appProfile === "vocab_grammar" ? candidate.appProfile : "vocab_only";
    state.gamification = sanitizeGamificationState(candidate.gamification);
    state.shuffled = candidate.shuffled !== false;
    state.requiredOnly = !!candidate.requiredOnly;
    state.directionToGreek = !!candidate.directionToGreek;
    state.spacedRepetition = candidate.spacedRepetition !== false;
    state.morphSelfCheck = !!candidate.morphSelfCheck;
    const usage = ensureUsageStats(candidate.appUsageStats);
    state.appUsageStats = {
      totalMs: usage.totalMs,
      dailyMs: usage.dailyMs,
      activeStudyMs: usage.activeStudyMs,
      activeDailyMs: usage.activeDailyMs,
      firstStudyAt: usage.firstStudyAt,
      studySessionHistory: usage.studySessionHistory,
      cardXpEarned: usage.cardXpEarned,
      lastActiveAt: 0,
      lastStudyInteractionAt: 0,
      lastStudyCountedAt: 0,
      currentStudySession: null
    };
    return state;
  }
  function applyImportedState(state, options = {}) {
    const storage = getStorage();
    if (!storage) return false;
    const sanitized = sanitizeImportedState(state);
    if (!sanitized) return false;
    storage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
    if (options.disclaimerAccepted) {
      storage.setItem(CONSENT_STORAGE_KEY, "accepted");
      hasAcceptedDisclaimer = true;
    }
    const restored = restoreState();
    if (!restored) {
      currentSession = null;
      selectedKeys = [];
      deck = [];
      originalDeck = [];
      currentIdx = 0;
      isFlipped = false;
      marks = getDirectionalMarksStore();
      resetMorphAnswerState();
      resetUnspacedCycleState();
      unspacedPendingRecycle = false;
      activeDeckCount = 0;
      setActiveSessionButton();
      setActiveSetButtons();
      syncToggleButtons();
      syncLayoutVisibility();
      renderCard();
      renderProgress();
      renderReview();
    } else {
      syncLayoutVisibility();
    }
    saveState();
    return true;
  }
  function buildProgressExportPayload() {
    const storage = getStorage();
    if (!storage) return null;
    accumulateUsageTime();
    accumulateActiveStudyTime();
    const appState = buildPersistedStatePayload();
    const liveSession = appUsageStats.currentStudySession;
    if (liveSession && liveSession.startedAt && liveSession.durationMs > 0) {
      const sessionSnapshot = {
        startedAt: liveSession.startedAt,
        endedAt: appUsageStats.lastStudyCountedAt || Date.now(),
        durationMs: liveSession.durationMs,
        interactionCount: liveSession.interactionCount || 0
      };
      if (!appState.appUsageStats.studySessionHistory) appState.appUsageStats.studySessionHistory = [];
      appState.appUsageStats.studySessionHistory.push(sessionSnapshot);
    }
    return {
      format: PROGRESS_EXPORT_FORMAT,
      version: PROGRESS_EXPORT_VERSION,
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      disclaimerAccepted: storage.getItem(CONSENT_STORAGE_KEY) === "accepted",
      summary: summarizePersistedState(appState),
      appState
    };
  }
  function createProgressExportBundle() {
    const payload = buildProgressExportPayload();
    if (!payload) return null;
    const jsonText = JSON.stringify(payload, null, 2);
    const stamp = payload.exportedAt.slice(0, 19).replace(/[:T]/g, "-");
    return {
      payload,
      jsonText,
      filename: `greek-flashcards-progress-${stamp}.json`
    };
  }
  async function copyTextToClipboard(text) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
    }
    return false;
  }
  function setTransferModalContent({ label = "Progress tools", title = "", copy = "", textareaValue = "", textareaPlaceholder = "", primaryText = "Close", secondaryText = "", showTextarea = false }) {
    const labelEl = document.getElementById("transferLabel");
    const titleEl = document.getElementById("transferTitle");
    const copyEl = document.getElementById("transferCopy");
    const textarea = document.getElementById("transferTextarea");
    const primaryBtn = document.getElementById("transferPrimaryBtn");
    const secondaryBtn = document.getElementById("transferSecondaryBtn");
    if (labelEl) labelEl.textContent = label;
    if (titleEl) titleEl.textContent = title;
    if (copyEl) copyEl.textContent = copy;
    if (textarea) {
      textarea.value = textareaValue;
      textarea.placeholder = textareaPlaceholder;
      textarea.style.display = showTextarea ? "block" : "none";
    }
    if (primaryBtn) {
      primaryBtn.textContent = primaryText;
      primaryBtn.style.display = primaryText ? "inline-flex" : "none";
    }
    if (secondaryBtn) {
      secondaryBtn.textContent = secondaryText;
      secondaryBtn.style.display = secondaryText ? "inline-flex" : "none";
    }
  }
  function openTransferModal(config) {
    const overlay = document.getElementById("transferOverlay");
    if (!overlay) return;
    transferModalMode = config?.mode || "";
    transferPrimaryAction = typeof config?.primaryAction === "function" ? config.primaryAction : null;
    transferSecondaryAction = typeof config?.secondaryAction === "function" ? config.secondaryAction : null;
    setTransferModalContent(config || {});
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    const textarea = document.getElementById("transferTextarea");
    if (config?.showTextarea && textarea) {
      setTimeout(() => textarea.focus(), 0);
    }
  }
  function closeTransferModal() {
    const overlay = document.getElementById("transferOverlay");
    if (!overlay) return;
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    transferModalMode = "";
    transferPrimaryAction = null;
    transferSecondaryAction = null;
    if (!isDisclaimerModalOpen() && !isAnalyticsModalOpen()) document.body.classList.remove("modal-open");
  }
  function handleTransferPrimaryAction() {
    if (typeof transferPrimaryAction === "function") transferPrimaryAction();
  }
  function handleTransferSecondaryAction() {
    if (typeof transferSecondaryAction === "function") transferSecondaryAction();
  }
  function tryDownloadProgressJsonFile(jsonText, filename) {
    if (isLikelyIOS()) return false;
    try {
      const blob = new Blob([jsonText], { type: "application/json" });
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      link.rel = "noopener";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1e3);
      return true;
    } catch (err) {
      return false;
    }
  }
  async function tryShareProgressJsonFile(jsonText, filename) {
    if (!navigator.share || typeof File === "undefined") return false;
    try {
      const file = new File([jsonText], filename, { type: "application/json" });
      if (navigator.canShare && !navigator.canShare({ files: [file] })) return false;
      await navigator.share({
        title: "Greek flashcards progress export",
        text: "Progress backup exported from the Greek flashcards app.",
        files: [file]
      });
      return true;
    } catch (err) {
      return err?.name === "AbortError" ? true : false;
    }
  }
  function showExportFallbackModal(jsonText, filename) {
    openTransferModal({
      mode: "export",
      label: "Progress export",
      title: "Save your progress JSON",
      copy: "iPhone Safari and standalone web apps are temperamental about file downloads. Use the button below to copy the JSON, then paste it into a new plain-text file in Files, Notes, or another app.",
      textareaValue: jsonText,
      primaryText: "Copy JSON",
      secondaryText: "",
      showTextarea: true,
      primaryAction: async () => {
        const textarea = document.getElementById("transferTextarea");
        const text = textarea?.value || jsonText;
        let copied = await copyTextToClipboard(text);
        if (!copied && textarea) {
          textarea.focus();
          textarea.select();
          textarea.setSelectionRange(0, textarea.value.length);
          try {
            copied = document.execCommand("copy");
          } catch (err) {
          }
        }
        window.alert(copied ? `JSON copied. Save it as ${filename} somewhere you can reach from your iPhone.` : "Copy did not complete automatically. The JSON is shown in the box so you can select and copy it manually.");
      }
    });
  }
  async function exportProgressJson() {
    const storage = getStorage();
    if (!storage) {
      window.alert("Local storage is unavailable, so progress export cannot run on this device.");
      return;
    }
    const bundle = createProgressExportBundle();
    if (!bundle) {
      window.alert("Progress export could not be prepared on this device.");
      return;
    }
    const { jsonText, filename } = bundle;
    if (await tryShareProgressJsonFile(jsonText, filename)) return;
    if (tryDownloadProgressJsonFile(jsonText, filename)) return;
    showExportFallbackModal(jsonText, filename);
  }
  function importProgressFromJsonText(rawText, options = {}) {
    const parsed = JSON.parse(String(rawText || "{}"));
    const wrappedState = parsed?.format === PROGRESS_EXPORT_FORMAT && isPlainObject(parsed.appState) ? parsed.appState : parsed;
    const disclaimerAccepted = parsed?.format === PROGRESS_EXPORT_FORMAT ? !!parsed.disclaimerAccepted : !!options.disclaimerAccepted;
    const summary = parsed?.format === PROGRESS_EXPORT_FORMAT && isPlainObject(parsed.summary) ? parsed.summary : summarizePersistedState(wrappedState);
    const success = applyImportedState(wrappedState, { disclaimerAccepted });
    if (!success) throw new Error("Invalid progress file shape.");
    return summary;
  }
  function openNativeImportPicker() {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json,application/json";
      input.style.position = "fixed";
      input.style.left = "-9999px";
      input.style.width = "1px";
      input.style.height = "1px";
      input.style.opacity = "0";
      const cleanup = () => {
        if (input.parentNode) input.parentNode.removeChild(input);
      };
      input.addEventListener("change", (event) => {
        handleImportedProgressFile(event);
        setTimeout(cleanup, 0);
      }, { once: true });
      document.body.appendChild(input);
      if (typeof input.showPicker === "function") {
        input.showPicker();
      } else {
        input.click();
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  function triggerImportProgress() {
    openTransferModal({
      mode: "import",
      label: "Progress import",
      title: "Import saved progress",
      copy: "Choose a progress JSON file. If your iPhone does not open the file picker, paste the exported JSON into the box below instead.",
      textareaValue: "",
      textareaPlaceholder: "Paste exported progress JSON here\u2026",
      primaryText: "Import pasted JSON",
      secondaryText: "Choose JSON file",
      showTextarea: true,
      primaryAction: () => {
        const textarea = document.getElementById("transferTextarea");
        const rawText = textarea?.value?.trim() || "";
        if (!rawText) {
          window.alert("Paste the exported JSON into the box first, or use \u201CChoose JSON file.\u201D");
          return;
        }
        try {
          const summary = importProgressFromJsonText(rawText);
          closeTransferModal();
          window.alert(`Progress imported successfully. ${formatPersistedStateSummary(summary)}`);
        } catch (err) {
          window.alert("Import failed. Please paste a valid progress JSON exported from this app.");
        }
      },
      secondaryAction: () => {
        const opened = openNativeImportPicker();
        if (!opened) {
          window.alert("This device would not open the file picker. Please paste the exported JSON into the box instead.");
        }
      }
    });
  }
  function handleImportedProgressFile(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const summary = importProgressFromJsonText(reader.result);
        closeTransferModal();
        window.alert(`Progress imported successfully. ${formatPersistedStateSummary(summary)}`);
      } catch (err) {
        window.alert("Import failed. Please choose a valid progress JSON exported from this app.");
      } finally {
        if (event?.target) event.target.value = "";
      }
    };
    reader.onerror = () => {
      window.alert("Import failed because the selected file could not be read.");
      if (event?.target) event.target.value = "";
    };
    reader.readAsText(file);
  }
  function getDeckStateKey(keys = selectedKeys, requiredFlag = requiredOnly, spacedFlag = spacedRepetition) {
    const normalizedKeys = sortSetKeys((keys || []).map(String));
    return JSON.stringify({
      keys: normalizedKeys,
      requiredOnly: !!requiredFlag,
      spacedRepetition: !!spacedFlag,
      direction: getStudyStoreKey(),
      mode: studyMode
    });
  }
  function saveCurrentDeckStateToBank() {
    if (!selectedKeys.length) return;
    const deckKey = getDeckStateKey(selectedKeys, requiredOnly);
    deckStates[deckKey] = {
      currentSessionId: currentSession ? currentSession.id : null,
      selectedKeys: [...selectedKeys],
      deckIds: deck.map((card) => card.id),
      currentIdx,
      unspacedPendingRecycle: !spacedRepetition && !!unspacedPendingRecycle
    };
  }
  function saveState() {
    const storage = getStorage();
    if (!storage) return;
    maybeCelebrateLevelUp();
    maybeCelebrateAchievements();
    storage.setItem(STORAGE_KEY, JSON.stringify(buildPersistedStatePayload()));
  }
  function clearSavedState() {
    const storage = getStorage();
    if (!storage) return;
    storage.removeItem(STORAGE_KEY);
  }
  function reorderDeckFromIds(cards, deckIds) {
    if (!Array.isArray(deckIds) || !deckIds.length) return null;
    const byId = new Map(cards.map((card) => [card.id, card]));
    const ordered = [];
    deckIds.forEach((id) => {
      const match = byId.get(id);
      if (match) {
        ordered.push(match);
        byId.delete(id);
      }
    });
    ordered.push(...byId.values());
    return ordered;
  }
  function restoreState() {
    const storage = getStorage();
    if (!storage) return false;
    let raw = storage.getItem(STORAGE_KEY);
    if (!raw) {
      const legacyV17 = storage.getItem("greekFlashcardsStateV17");
      if (legacyV17) raw = legacyV17;
    }
    if (!raw) {
      const legacyV15 = storage.getItem("greekFlashcardsStateV15");
      if (legacyV15) raw = legacyV15;
    }
    if (!raw) {
      const legacyV14 = storage.getItem("greekFlashcardsStateV14");
      if (legacyV14) raw = legacyV14;
    }
    if (!raw) {
      const legacyV12 = storage.getItem("greekFlashcardsStateV12");
      if (legacyV12) raw = legacyV12;
    }
    if (!raw) {
      const legacyV11 = storage.getItem("greekFlashcardsStateV11");
      if (legacyV11) raw = legacyV11;
    }
    if (!raw) {
      const legacyV10 = storage.getItem("greekFlashcardsStateV10");
      if (legacyV10) raw = legacyV10;
    }
    if (!raw) return false;
    try {
      let saved = JSON.parse(raw);
      for (const migration of STATE_MIGRATIONS) {
        try {
          if (migration.match(saved)) saved = migration.migrate(saved);
        } catch (err) {
          console.warn(`Migration "${migration.name}" failed:`, err);
        }
      }
      selectedKeys = Array.isArray(saved.selectedKeys) ? sortSetKeys(saved.selectedKeys.map(String)) : [];
      requiredOnly = !!saved.requiredOnly;
      directionToGreek = !!saved.directionToGreek;
      spacedRepetition = saved.spacedRepetition !== false;
      appProfile = saved.appProfile === "vocab_only" || saved.appProfile === "vocab_grammar" ? saved.appProfile : "vocab_only";
      const hadSavedAchievementSnapshot = Array.isArray(saved?.gamification?.lastEarnedAchievementIds);
      appGamification = sanitizeGamificationState(saved.gamification);
      studyMode = saved.studyMode === "morph" && appProfile === "vocab_grammar" ? "morph" : "vocab";
      morphSelfCheck = !!saved.morphSelfCheck;
      shuffled = saved.shuffled !== false;
      deckStates = saved.deckStates && typeof saved.deckStates === "object" ? saved.deckStates : {};
      globalWordMarks = saved.globalWordMarks && typeof saved.globalWordMarks === "object" ? saved.globalWordMarks : {};
      globalWordProgress = saved.globalWordProgress && typeof saved.globalWordProgress === "object" ? saved.globalWordProgress : {};
      appUsageStats = ensureUsageStats(saved.appUsageStats);
      appUsageStats.lastActiveAt = 0;
      const restoredLevel = computeXpAndLevel(appUsageStats).currentLevel.level;
      if (!Number.isFinite(appGamification.lastCelebratedLevel) || appGamification.lastCelebratedLevel < 1 || appGamification.lastCelebratedLevel > restoredLevel) {
        appGamification.lastCelebratedLevel = restoredLevel;
      }
      if (appGamification.lastCelebratedBadgeDay && !/^\d{4}-\d{2}-\d{2}$/.test(appGamification.lastCelebratedBadgeDay)) {
        appGamification.lastCelebratedBadgeDay = null;
      }
      ensureDirectionalStores();
      if (hadSavedAchievementSnapshot && !Array.isArray(appGamification.lastEarnedAchievementIds)) {
        appGamification.lastEarnedAchievementIds = [];
      }
      if (!selectedKeys.length) {
        clearSpacedUndoSnapshot();
        syncToggleButtons();
        return false;
      }
      currentSession = saved.currentSessionId ? window.SESSIONS.find((s) => s.id === saved.currentSessionId) || null : null;
      const selectedCards = getSelectedCards(selectedKeys);
      originalDeck = requiredOnly ? selectedCards.filter((card) => card.required) : selectedCards;
      resetMorphAnswerState();
      const savedDeckState = deckStates[getDeckStateKey(selectedKeys, requiredOnly)] || null;
      marks = getDirectionalMarksStore();
      const restoredDeck = savedDeckState ? reorderDeckFromIds(originalDeck, savedDeckState.deckIds) : null;
      deck = restoredDeck || buildStudyDeck(originalDeck);
      resetUnspacedCycleState();
      activeDeckCount = spacedRepetition ? getDueCount(originalDeck) : originalDeck.filter((card) => marks[card.id] !== "known").length;
      currentIdx = savedDeckState && Number.isInteger(savedDeckState.currentIdx) ? Math.min(Math.max(savedDeckState.currentIdx, 0), spacedRepetition ? activeDeckCount : deck.length) : 0;
      unspacedPendingRecycle = !spacedRepetition && !!(savedDeckState && savedDeckState.unspacedPendingRecycle);
      isFlipped = false;
      clearSpacedUndoSnapshot();
      setActiveSessionButton();
      setActiveSetButtons();
      syncToggleButtons();
      renderCard();
      renderProgress();
      renderReview();
      return true;
    } catch (err) {
      clearSavedState();
      return false;
    }
  }
  function startNextCycle(mode = "remaining") {
    if (mode === "full") {
      const directionalMarks = getDirectionalMarksStore();
      (originalDeck || []).forEach((card) => {
        delete directionalMarks[card.id];
      });
      marks = directionalMarks;
      const fullDeck = shuffleArray([...originalDeck || []]);
      deck = fullDeck;
      currentIdx = fullDeck.length ? 0 : deck.length;
    } else {
      const remaining = shuffleArray([...getRemainingCards()]);
      const known = (originalDeck || []).filter((card) => marks[card.id] === "known");
      deck = [...remaining, ...known];
      currentIdx = remaining.length ? 0 : deck.length;
    }
    resetUnspacedCycleState();
    unspacedPendingRecycle = false;
    saveState();
  }
  function resetStudyState() {
    marks = getDirectionalMarksStore();
    currentIdx = 0;
    activeDeckCount = spacedRepetition ? getDueCount(originalDeck) : originalDeck.filter((card) => marks[card.id] !== "known").length;
    resetUnspacedCycleState();
    unspacedPendingRecycle = false;
    isFlipped = false;
  }
  function isSessionFullySelected(session, keys = selectedKeys) {
    const sessionKeys = expandSessionSets(session);
    return sessionKeys.length > 0 && sessionKeys.every((key) => keys.includes(String(key)));
  }
  function findExactSessionMatch(keys = selectedKeys) {
    const normalizedKeys = sortSetKeys((keys || []).map(String));
    return window.SESSIONS.find((session) => {
      const sessionKeys = expandSessionSets(session);
      return sessionKeys.length === normalizedKeys.length && sessionKeys.every((key, idx) => key === normalizedKeys[idx]);
    }) || null;
  }
  function setActiveSessionButton() {
    document.querySelectorAll(".session-btn").forEach((btn) => {
      const session = window.SESSIONS.find((s) => s.id === btn.dataset.sessionId);
      btn.classList.toggle("active", !!session && isSessionFullySelected(session));
    });
  }
  function setActiveSetButtons() {
    document.querySelectorAll(".chapter-btn").forEach((btn) => {
      const key = btn.dataset.key;
      btn.classList.toggle("active", selectedKeys.includes(key));
    });
  }
  function buildSessions() {
    const grid = document.getElementById("sessionsGrid");
    grid.innerHTML = "";
    (window.SESSIONS || []).forEach((s) => {
      const btn = document.createElement("button");
      btn.className = "session-btn" + (s.special ? " special" : "");
      btn.id = "sess-" + s.id;
      btn.dataset.sessionId = s.id;
      const summaryHtml = canAccessGrammarUi() ? `<br><span class="session-chapters">${s.summary}</span>` : "";
      btn.innerHTML = `<span class="session-tag">${s.tag}</span>${s.label}${summaryHtml}`;
      btn.onclick = () => toggleSession(s);
      grid.appendChild(btn);
    });
    setActiveSessionButton();
  }
  function buildChapterSelector() {
    const grid = document.getElementById("chaptersGrid");
    if (!grid) return;
    grid.innerHTML = "";
    grid.classList.add("chapters-grid");
    const sets = window.SETS && typeof window.SETS === "object" ? window.SETS : {};
    const chapterKeys = Object.keys(sets).filter(isChapterKey).sort((a, b) => Number(a) - Number(b));
    const otherKeys = sortSetKeys(Object.keys(sets).filter((k) => !isChapterKey(k)));
    [...chapterKeys, ...otherKeys].forEach((key) => {
      const set = sets[key];
      if (!set) return;
      const morphCount = window.getMorphologyCountForKey ? window.getMorphologyCountForKey(key) : 0;
      const grammarCount = window.getGrammarCountForKey ? window.getGrammarCountForKey(key) : 0;
      const studyCount = morphCount + grammarCount;
      const vocabCount = Array.isArray(set.cards) ? set.cards.length : 0;
      if (!vocabCount && !studyCount) return;
      if (!canAccessGrammarUi() && !vocabCount) return;
      const btn = document.createElement("button");
      btn.className = "chapter-btn";
      btn.dataset.key = key;
      const countLabel = canAccessGrammarUi() ? `${vocabCount} vocab${studyCount ? ` \xB7 ${studyCount} grammar` : ""}` : `${vocabCount} vocab`;
      btn.innerHTML = `${set.label}<span class="chapter-count">${countLabel}</span>`;
      btn.onclick = () => toggleSet(key);
      grid.appendChild(btn);
    });
    setActiveSetButtons();
  }
  function loadDeckFromKeys(keys, sessionId = null) {
    saveCurrentDeckStateToBank();
    clearSpacedUndoSnapshot();
    selectedKeys = sortSetKeys(keys.map(String));
    currentSession = sessionId ? window.SESSIONS.find((s) => s.id === sessionId) || findExactSessionMatch(selectedKeys) : findExactSessionMatch(selectedKeys);
    const selectedCards = getSelectedCards(selectedKeys);
    originalDeck = requiredOnly ? selectedCards.filter((card) => card.required) : selectedCards;
    resetMorphAnswerState();
    const savedDeckState = deckStates[getDeckStateKey(selectedKeys, requiredOnly)] || null;
    marks = getDirectionalMarksStore();
    if (savedDeckState) {
      const restoredDeck = reorderDeckFromIds(originalDeck, savedDeckState.deckIds);
      deck = restoredDeck || buildStudyDeck(originalDeck);
      activeDeckCount = spacedRepetition ? getDueCount(originalDeck) : originalDeck.filter((card) => marks[card.id] !== "known").length;
      currentIdx = Number.isInteger(savedDeckState.currentIdx) ? Math.min(Math.max(savedDeckState.currentIdx, 0), spacedRepetition ? activeDeckCount : deck.length) : 0;
      unspacedPendingRecycle = !spacedRepetition && !!savedDeckState.unspacedPendingRecycle;
      resetUnspacedCycleState();
      isFlipped = false;
    } else {
      resetStudyState();
      deck = buildStudyDeck(originalDeck);
    }
    setActiveSessionButton();
    setActiveSetButtons();
    syncToggleButtons();
    resetMorphAnswerState();
    renderCard();
    renderProgress();
    renderReview();
    saveState();
  }
  function toggleSession(session) {
    saveCurrentDeckStateToBank();
    const sessionKeys = expandSessionSets(session);
    if (!sessionKeys.length) return;
    const alreadySelected = isSessionFullySelected(session);
    const nextKeys = alreadySelected ? selectedKeys.filter((key) => !sessionKeys.includes(key)) : sortSetKeys([.../* @__PURE__ */ new Set([...selectedKeys, ...sessionKeys])]);
    currentSession = null;
    if (!nextKeys.length) {
      selectedKeys = [];
      setActiveSessionButton();
      setActiveSetButtons();
      deck = [];
      originalDeck = [];
      marks = getDirectionalMarksStore();
      currentIdx = 0;
      document.getElementById("cardArea").innerHTML = '<div class="empty-state"><div class="big">\u03B1\u03B2\u03B3</div>Select a study session above to begin.</div>';
      clearSpacedUndoSnapshot();
      syncToggleButtons();
      renderReview();
      saveState();
      return;
    }
    loadDeckFromKeys(nextKeys, null);
  }
  function toggleSet(key) {
    saveCurrentDeckStateToBank();
    currentSession = null;
    const raw = String(key);
    if (selectedKeys.includes(raw)) {
      selectedKeys = selectedKeys.filter((k) => k !== raw);
    } else {
      selectedKeys = [...selectedKeys, raw];
    }
    if (!selectedKeys.length) {
      setActiveSessionButton();
      setActiveSetButtons();
      deck = [];
      originalDeck = [];
      marks = {};
      currentIdx = 0;
      document.getElementById("cardArea").innerHTML = '<div class="empty-state"><div class="big">\u03B1\u03B2\u03B3</div>Select a study session above to begin.</div>';
      clearSpacedUndoSnapshot();
      syncToggleButtons();
      renderReview();
      saveState();
      return;
    }
    loadDeckFromKeys(selectedKeys, null);
  }
  function renderCard() {
    const area = document.getElementById("cardArea");
    saveState();
    syncLayoutVisibility();
    if (!deck.length) {
      const emptyMessage = isMorphologyMode() ? "No grammar quiz material is available yet for this selection." : requiredOnly ? "No required-vocabulary cards match this selection." : "No cards in this deck.";
      area.innerHTML = `<div class="empty-state"><div class="big">\u2014</div>${emptyMessage}</div>`;
      return;
    }
    if (!spacedRepetition && currentIdx >= deck.length && unspacedPendingRecycle) {
      startNextCycle("remaining");
      resetMorphAnswerState();
      renderCard();
      renderReview();
      renderProgress();
      return;
    }
    if (!spacedRepetition && currentIdx >= deck.length || spacedRepetition && currentIdx >= activeDeckCount) {
      const doneTitle = spacedRepetition ? "No cards currently due \u2726" : isMorphologyMode() ? "Grammar pass complete \u2726" : "Session Confirmed \u{1F389}";
      const doneSub = spacedRepetition ? "Everything in this selection is scheduled ahead. Press next to advance the review clock by 1 hour and pull the next near-due cards back in." : isMorphologyMode() ? "Everything in this grammar selection is currently marked correct. Press next to reshuffle the full selected set and run it again." : 'Every card in this deck is currently marked \u201CI know this.\u201D<br><span style="color:var(--muted);font-size:13px">Press next to reshuffle the full selected set for another unspaced pass.</span>';
      area.innerHTML = `
      <div class="done-card show">
        <div class="done-title">${doneTitle}</div>
        <div class="done-sub">${doneSub}</div>
      </div>`;
      document.getElementById("markRow").style.display = "none";
      return;
    }
    document.getElementById("markRow").style.display = isMorphologyMode() ? "none" : "flex";
    const card = deck[currentIdx];
    if (isMorphCard3(card)) {
      const noteHtml = card.note ? `<div class="morph-note">${card.note}</div>` : "";
      const contextHtml = card.context ? `<div class="morph-context"><span class="morph-context-label">Context:</span> ${card.context}</div>` : "";
      let interactionHtml = "";
      let resultHtml = "";
      if (morphSelfCheck) {
        if (!morphAnswerState.revealed) {
          interactionHtml = `<div class="morph-selfcheck-actions"><button class="ctrl-btn morph-reveal-btn" type="button" onclick="revealMorphologyAnswer()">Reveal answer</button></div>`;
          resultHtml = `<div class="morph-result pending">Parse it yourself first, then reveal the answer.</div>`;
        } else {
          const resultClass = morphAnswerState.answered ? morphAnswerState.isCorrect ? "correct" : "incorrect" : "pending";
          const resultTitle = morphAnswerState.answered ? morphAnswerState.isCorrect ? "You had it" : "Needs more review" : "Answer";
          const ratingHtml = morphAnswerState.answered ? "" : `<div class="morph-selfcheck-actions">
               <button class="choice-btn selfcheck-good" type="button" onclick="rateMorphologySelfCheck(true)">I had it</button>
               <button class="choice-btn selfcheck-bad" type="button" onclick="rateMorphologySelfCheck(false)">Needs review</button>
             </div>`;
          resultHtml = `<div class="morph-result ${resultClass}">
            <div class="morph-result-title">${resultTitle}</div>
            <div class="morph-result-body">${card.form} = ${card.answer}</div>
            <div class="morph-result-meta">${card.lemma}${card.gloss ? ` \xB7 \u201C${card.gloss}\u201D` : ""}${card.family ? ` \xB7 ${card.family}` : ""}</div>
            ${buildGrammarSupportHtml(card)}
            ${noteHtml}
          </div>${ratingHtml}`;
        }
      } else {
        const choiceButtons = (card.choices || []).map((choice, idx) => {
          const classes = ["choice-btn"];
          if (morphAnswerState.answered) {
            if (choice === card.answer) classes.push("correct");
            if (idx === morphAnswerState.selectedIndex && choice !== card.answer) classes.push("incorrect");
          }
          return `<button class="${classes.join(" ")}" type="button" ${morphAnswerState.answered ? "disabled" : ""} onclick="answerMorphologyChoice(${idx})">${choice}</button>`;
        }).join("");
        interactionHtml = `<div class="morph-choices">${choiceButtons}</div>`;
        const wrongChoice = morphAnswerState.answered && !morphAnswerState.isCorrect && morphAnswerState.selectedIndex >= 0 ? card.choices[morphAnswerState.selectedIndex] : null;
        resultHtml = morphAnswerState.answered ? `<div class="morph-result ${morphAnswerState.isCorrect ? "correct" : "incorrect"}">
            <div class="morph-result-title">${morphAnswerState.isCorrect ? "Correct" : "Not quite"}</div>
            <div class="morph-result-body">${card.form} = ${card.answer}</div>
            <div class="morph-result-meta">${card.lemma}${card.gloss ? ` \xB7 \u201C${card.gloss}\u201D` : ""}${card.family ? ` \xB7 ${card.family}` : ""}</div>
            ${buildGrammarSupportHtml(card, wrongChoice)}
            ${noteHtml}
          </div>` : `<div class="morph-result pending">Choose the best parsing option.</div>`;
      }
      area.innerHTML = `
      <div class="morph-card">
        <div class="morph-label">Grammar</div>
        <div class="morph-prompt">${card.prompt || "Parse this form."}</div>
        ${card.gloss ? `<div class="morph-gloss">Gloss: \u201C${card.gloss}\u201D</div>` : ""}
        <div class="morph-form">${card.form}</div>
        ${contextHtml}
        <div class="morph-hint">${card.lemma}</div>
        <div class="morph-source">${card.sourceLabel}${card.family ? ` \xB7 ${card.family}` : ""}${morphSelfCheck ? " \xB7 Self-check" : ""}</div>
        ${interactionHtml}
        ${resultHtml}
      </div>`;
      isFlipped = false;
      renderProgress();
      return;
    }
    let frontHTML, backHTML;
    if (!directionToGreek) {
      frontHTML = `
        <div class="card-face card-front">
          <span class="card-label">Greek</span>
          <div class="card-greek">${formatGreekHeadword(card.g)}</div>
          <div class="card-hint">${card.sourceLabel}</div>
          <div class="flip-hint">click to reveal \u2192</div>
        </div>`;
      backHTML = `
        <div class="card-face card-back">
          <span class="card-label">English</span>
          <div class="card-english">${card.e || "\u2014"}</div>
          <div class="card-greek-small">${formatGreekHeadword(card.g)}</div>
          <div class="card-hint">${transliterateGreek(formatGreekHeadword(card.g))}</div>
          <div class="card-pos">${detectPartOfSpeech(card)}</div>
        </div>`;
    } else {
      frontHTML = `
        <div class="card-face card-front">
          <span class="card-label">English</span>
          <div class="card-english">${card.e || "\u2014"}</div>
          <div class="card-hint">${card.sourceLabel}</div>
          <div class="flip-hint">click to reveal \u2192</div>
        </div>`;
      backHTML = `
        <div class="card-face card-back">
          <span class="card-label">Greek</span>
          <div class="card-greek">${formatGreekHeadword(card.g)}</div>
          <div class="card-hint">${transliterateGreek(formatGreekHeadword(card.g))}</div>
          <div class="card-pos">${detectPartOfSpeech(card)}</div>
        </div>`;
    }
    area.innerHTML = `
    <div class="card-wrapper" id="cardWrapper" onclick="flipCard()">
      <div class="card-inner" id="cardInner">
        ${frontHTML}
        ${backHTML}
      </div>
    </div>`;
    isFlipped = false;
    renderProgress();
  }
  function flipCard() {
    const wrapper = document.getElementById("cardWrapper");
    if (!wrapper) return;
    noteStudyInteraction();
    isFlipped = !isFlipped;
    wrapper.classList.toggle("flipped", isFlipped);
  }
  function navigate(dir, options = {}) {
    if (!deck.length) return;
    noteStudyInteraction();
    if (dir < 0) {
      currentIdx = Math.max(0, currentIdx - 1);
      resetMorphAnswerState();
      renderCard();
      return;
    }
    if (!spacedRepetition && currentIdx >= deck.length) {
      if (unspacedPendingRecycle) {
        startNextCycle("remaining");
        resetMorphAnswerState();
        renderCard();
        renderReview();
        renderProgress();
        saveState();
      } else if (getKnownCount() === originalDeck.length) {
        startNextCycle("full");
        resetMorphAnswerState();
        renderCard();
        renderReview();
        renderProgress();
        saveState();
      }
      return;
    }
    if (spacedRepetition && currentIdx >= activeDeckCount) {
      advanceScheduledCards(originalDeck, SRS_CYCLE_ADVANCE_MS);
      deck = buildStudyDeck(originalDeck);
      currentIdx = 0;
      resetMorphAnswerState();
      renderCard();
      renderReview();
      renderProgress();
      saveState();
      return;
    }
    if (spacedRepetition && currentIdx < activeDeckCount && !options.skipAutoReview && !isMorphologyMode()) {
      captureSpacedUndoSnapshot();
      applySpacedReview(deck[currentIdx], "again");
      deck = buildStudyDeck(originalDeck);
    }
    if (spacedRepetition) {
      if (isMorphologyMode()) {
        if (morphPendingAdvance) {
          deck = buildStudyDeck(originalDeck);
          currentIdx = Math.min(currentIdx, activeDeckCount);
        } else {
          currentIdx = Math.min(currentIdx + 1, activeDeckCount);
        }
      } else {
        currentIdx = Math.min(currentIdx, activeDeckCount);
      }
      resetMorphAnswerState();
      renderCard();
      renderReview();
      renderProgress();
      saveState();
      return;
    }
    if (isMorphologyMode()) {
      const nextIdx = currentIdx + 1;
      if (nextIdx >= deck.length) {
        if (getKnownCount() === originalDeck.length) {
          currentIdx = deck.length;
          unspacedPendingRecycle = false;
        } else {
          currentIdx = deck.length;
          unspacedPendingRecycle = true;
        }
      } else {
        currentIdx = nextIdx;
        unspacedPendingRecycle = false;
      }
      resetMorphAnswerState();
      renderCard();
      renderReview();
      renderProgress();
      saveState();
      return;
    }
    for (let i = currentIdx + 1; i < deck.length; i++) {
      if (marks[deck[i].id] !== "known") {
        currentIdx = i;
        renderCard();
        return;
      }
    }
    if (getKnownCount() === originalDeck.length) {
      currentIdx = deck.length;
      unspacedPendingRecycle = false;
    } else {
      currentIdx = deck.length;
      unspacedPendingRecycle = true;
    }
    resetMorphAnswerState();
    renderCard();
  }
  function markCard(outcome) {
    if (isMorphologyMode()) return;
    noteStudyInteraction();
    if (!spacedRepetition && currentIdx >= deck.length || spacedRepetition && currentIdx >= activeDeckCount) return;
    const currentCard = deck[currentIdx];
    if (spacedRepetition) {
      captureSpacedUndoSnapshot();
      applySpacedReview(currentCard, outcome);
      deck = buildStudyDeck(originalDeck);
      if (activeDeckCount <= 0) {
        currentIdx = activeDeckCount;
        resetMorphAnswerState();
        renderCard();
      } else {
        navigate(1, { skipAutoReview: true });
      }
    } else {
      const mark = outcome === "easy" ? "known" : "unsure";
      const recordedOutcome = outcome === "easy" ? "known" : outcome === "pass" ? "pass" : "review";
      const reviewedAt = Date.now();
      recordStudyOutcome(currentCard.id, recordedOutcome, reviewedAt);
      applyUnspacedSharedSchedule(currentCard, outcome, reviewedAt);
      getDirectionalMarksStore()[currentCard.id] = mark;
      marks = getDirectionalMarksStore();
      navigate(1);
    }
    renderReview();
    renderProgress();
    saveState();
  }
  function setStudyMode(mode) {
    const nextMode = mode === "morph" && canAccessGrammarUi() ? "morph" : "vocab";
    if (studyMode === nextMode) return;
    saveCurrentDeckStateToBank();
    studyMode = nextMode;
    clearSpacedUndoSnapshot();
    resetMorphAnswerState();
    ensureDirectionalStores();
    marks = getDirectionalMarksStore();
    syncToggleButtons();
    if (!selectedKeys.length) {
      saveState();
      renderCard();
      renderProgress();
      renderReview();
      return;
    }
    const keysToLoad = currentSession ? expandSessionSets(currentSession) : selectedKeys;
    loadDeckFromKeys(keysToLoad, currentSession ? currentSession.id : null);
  }
  function setAppProfile(profile) {
    const nextProfile = profile === "vocab_grammar" ? "vocab_grammar" : "vocab_only";
    if (appProfile === nextProfile) return;
    saveCurrentDeckStateToBank();
    appProfile = nextProfile;
    clearSpacedUndoSnapshot();
    if (!canAccessGrammarUi() && studyMode === "morph") {
      studyMode = "vocab";
      resetMorphAnswerState();
    }
    ensureDirectionalStores();
    marks = getDirectionalMarksStore();
    buildSessions();
    buildChapterSelector();
    syncToggleButtons();
    if (!selectedKeys.length) {
      renderCard();
      renderProgress();
      renderReview();
      saveState();
      return;
    }
    const keysToLoad = currentSession ? expandSessionSets(currentSession) : selectedKeys;
    loadDeckFromKeys(keysToLoad, currentSession ? currentSession.id : null);
  }
  function toggleMorphSelfCheck() {
    if (!isMorphologyMode()) return;
    morphSelfCheck = !morphSelfCheck;
    resetMorphAnswerState();
    syncToggleButtons();
    renderCard();
    saveState();
  }
  function toggleShuffle() {
    shuffled = !shuffled;
    syncToggleButtons();
    if (spacedRepetition) {
      deck = buildStudyDeck(originalDeck);
      currentIdx = Math.min(currentIdx, activeDeckCount);
    } else {
      const activeCards = getRemainingCards();
      const knownCards = deck.filter((card) => marks[card.id] === "known");
      deck = shuffled ? [...shuffleArray([...activeCards]), ...knownCards] : [...activeCards, ...knownCards];
      if (currentIdx >= activeCards.length) {
        currentIdx = activeCards.length ? 0 : deck.length;
      }
    }
    isFlipped = false;
    renderCard();
    renderProgress();
    renderReview();
    saveState();
  }
  function toggleRequiredOnly() {
    requiredOnly = !requiredOnly;
    syncToggleButtons();
    if (!selectedKeys.length) {
      saveState();
      return;
    }
    const keysToLoad = currentSession ? expandSessionSets(currentSession) : selectedKeys;
    loadDeckFromKeys(keysToLoad, currentSession ? currentSession.id : null);
  }
  function toggleDirection() {
    if (isMorphologyMode()) return;
    directionToGreek = !directionToGreek;
    clearSpacedUndoSnapshot();
    ensureDirectionalStores();
    marks = getDirectionalMarksStore();
    syncToggleButtons();
    if (selectedKeys.length) {
      const keysToLoad = currentSession ? expandSessionSets(currentSession) : selectedKeys;
      loadDeckFromKeys(keysToLoad, currentSession ? currentSession.id : null);
      return;
    }
    isFlipped = false;
    renderCard();
    renderProgress();
    renderReview();
    saveState();
  }
  function toggleSpacedRepetition() {
    spacedRepetition = !spacedRepetition;
    clearSpacedUndoSnapshot();
    resetUnspacedCycleState();
    syncToggleButtons();
    if (!selectedKeys.length) {
      saveState();
      return;
    }
    deck = buildStudyDeck(originalDeck);
    currentIdx = 0;
    resetMorphAnswerState();
    isFlipped = false;
    renderCard();
    renderProgress();
    renderReview();
    saveState();
  }
  function reshuffleEligible() {
    if (!selectedKeys.length) return;
    if (spacedRepetition) {
      deck = buildStudyDeck(originalDeck, { forceShuffle: true });
      currentIdx = activeDeckCount ? 0 : currentIdx;
    } else {
      const activeCards = getRemainingCards();
      const knownCards = deck.filter((card) => marks[card.id] === "known");
      deck = [...shuffleArray([...activeCards]), ...knownCards];
      currentIdx = activeCards.length ? 0 : deck.length;
    }
    isFlipped = false;
    renderCard();
    renderProgress();
    renderReview();
    saveState();
  }
  function resetCurrentDeck() {
    clearSpacedUndoSnapshot();
    if (!selectedKeys.length) {
      clearSavedState();
      return;
    }
    const confirmed = window.confirm(
      spacedRepetition ? "Reset spaced-review scheduling for this deck only? This keeps your unspaced marks and pass history." : "Reset unspaced marks for this deck only? This keeps your spaced-review scheduling and intervals."
    );
    if (!confirmed) return;
    const deckKey = getDeckStateKey(selectedKeys, requiredOnly, spacedRepetition);
    delete deckStates[deckKey];
    const directionalMarks = getDirectionalMarksStore();
    const directionalProgress = getDirectionalProgressStore();
    if (spacedRepetition) {
      originalDeck.forEach((card) => {
        const p = directionalProgress[card.id];
        if (p && typeof p === "object") {
          p.dueAt = 0;
          p.intervalDays = 0;
          p.streak = 0;
          p.easyStreak = 0;
          p.srsStage = 0;
          p.ease = 2.3;
          p.lastEasyIntervalDays = 0;
          p.confidence = 0;
          p.confidenceHistory = [];
        }
      });
    } else {
      originalDeck.forEach((card) => {
        delete directionalMarks[card.id];
      });
    }
    marks = directionalMarks;
    resetUnspacedCycleState();
    currentIdx = 0;
    isFlipped = false;
    resetMorphAnswerState();
    deck = [];
    activeDeckCount = 0;
    deck = buildStudyDeck(originalDeck);
    renderCard();
    renderProgress();
    renderReview();
    saveState();
  }
  function resetAllStats() {
    clearSpacedUndoSnapshot();
    const confirmed = window.confirm("Reset all saved study stats, marks, and spaced-review scheduling for both directions?");
    if (!confirmed) return;
    globalWordMarks = { g2e: {}, e2g: {}, morph: {} };
    globalWordProgress = { g2e: {}, e2g: {}, morph: {} };
    deckStates = {};
    appUsageStats = {
      totalMs: 0,
      dailyMs: {},
      activeStudyMs: 0,
      activeDailyMs: {},
      lastActiveAt: document.hidden ? 0 : Date.now(),
      lastStudyInteractionAt: 0,
      lastStudyCountedAt: 0,
      firstStudyAt: 0,
      studySessionHistory: [],
      currentStudySession: null
    };
    appGamification = sanitizeGamificationState({});
    ensureDirectionalStores();
    resetUnspacedCycleState();
    marks = getDirectionalMarksStore();
    if (selectedKeys.length) {
      currentIdx = 0;
      isFlipped = false;
      deck = [];
      activeDeckCount = 0;
      deck = buildStudyDeck(originalDeck);
      renderCard();
      renderProgress();
      renderReview();
    } else {
      renderReview();
      renderProgress();
    }
    saveState();
  }
  function renderProgress() {
    if (!document.hidden) {
      accumulateUsageTime();
      accumulateActiveStudyTime();
    }
    const total = originalDeck.length || deck.length;
    const confirmed = getKnownCount();
    const remaining = Math.max(total - confirmed, 0);
    const progressPercentEl = document.getElementById("progressPercent");
    updateUsageMeta();
    if (spacedRepetition) {
      const dueCount = getDueCount(originalDeck);
      const nextCard2 = dueCount && currentIdx < dueCount ? currentIdx + 1 : dueCount;
      document.getElementById("progressText").textContent = total ? `${nextCard2} / ${dueCount} due \xB7 Confirmed ${confirmed} \xB7 Scheduled ${Math.max(total - dueCount, 0)}` : "0 / 0";
      const pct2 = total ? Math.round((total - dueCount) / total * 100) : 0;
      document.getElementById("progressFill").style.width = pct2 + "%";
      if (progressPercentEl) progressPercentEl.textContent = `${pct2}%`;
      if (isAnalyticsModalOpen()) renderAnalyticsOverlay();
      return;
    }
    const cycleSize = isMorphologyMode() ? total : getRemainingCards().length || total;
    const nextCard = total && currentIdx < deck.length ? Math.min(currentIdx + 1, cycleSize) : total;
    document.getElementById("progressText").textContent = total ? `${nextCard} / ${cycleSize} \xB7 Confirmed ${confirmed} \xB7 Remaining ${remaining}${isMorphologyMode() ? " \xB7 Grammar" : ""}` : "0 / 0";
    const pct = total ? Math.round(confirmed / total * 100) : 0;
    document.getElementById("progressFill").style.width = pct + "%";
    if (progressPercentEl) progressPercentEl.textContent = `${pct}%`;
    if (isAnalyticsModalOpen()) renderAnalyticsOverlay();
  }
  function renderReview() {
    const panel = document.getElementById("reviewPanel");
    panel.classList.add("show");
    const knownCount = getKnownCount();
    const unsureCount = originalDeck.filter((card) => marks[card.id] === "unsure").length;
    const remainingCount = Math.max(originalDeck.length - knownCount, 0);
    const aggregateStats = getDeckAggregateStats(originalDeck);
    if (spacedRepetition) {
      const dueCount = getDueCount(originalDeck);
      document.getElementById("reviewStats").innerHTML = `
      <span class="stat-known">\u2713 Known: ${knownCount}</span>
      <span class="stat-unsure">\u25CB Due now: ${dueCount}</span>
      <span class="stat-total">\xB7 Scheduled ahead: ${Math.max(originalDeck.length - dueCount, 0)}</span>
      <span class="stat-total">\xB7 Seen \xD7${aggregateStats.seenCount}</span>
      <span class="stat-total">\xB7 ${isMorphologyMode() ? "Grammar deck" : requiredOnly ? "Required-only deck" : "Full deck"}</span>`;
    } else {
      document.getElementById("reviewStats").innerHTML = `
      <span class="stat-known">\u2713 Known: ${knownCount}</span>
      <span class="stat-unsure">\u25CB Not yet known: ${unsureCount}</span>
      <span class="stat-total">\xB7 ${remainingCount} still to confirm</span>
      <span class="stat-total">\xB7 Seen \xD7${aggregateStats.seenCount}</span>
      <span class="stat-total">\xB7 ${isMorphologyMode() ? "Grammar deck" : requiredOnly ? "Required-only deck" : "Full deck"}</span>`;
    }
    let listHtml = "";
    originalDeck.map((card, idx) => ({ card, idx })).filter(({ card }) => {
      const status = marks[card.id];
      const progress = getWordProgress(card.id);
      return status || progress.seenCount;
    }).sort((a, b) => compareGreekAlphabetical(a.card, b.card)).forEach(({ card }) => {
      const status = marks[card.id];
      const progress = getWordProgress(card.id);
      const confidencePct = getConfidencePct(progress);
      const confidenceMeta = confidencePct === null ? "confidence \u2014" : `confidence ${confidencePct}%`;
      const srsMeta = spacedRepetition ? `<span style="display:block;color:var(--muted);font-size:12px">${progress.dueAt && progress.dueAt > Date.now() ? `due in ${formatRemainingForTable(progress.dueAt)}` : "due now"} \xB7 seen \xD7${progress.seenCount || 0} \xB7 ${confidenceMeta}</span>` : progress.seenCount || progress.passCount || progress.failCount ? `<span style="display:block;color:var(--muted);font-size:12px">seen \xD7${progress.seenCount || 0} \xB7 ${confidenceMeta}</span>` : "";
      const returnBtn = `<button class="return-btn" title="Return this card to circulation now" onclick="returnSeenCardToDeck('${encodeURIComponent(card.id)}')">\u2715</button>`;
      listHtml += `<div class="review-item">
        <span class="rg">${getCardReviewLeft(card)}${srsMeta}</span>
        <span class="re">${getCardReviewRight(card)}<span style="display:block;color:var(--muted);font-size:12px">${getCardMetaLine(card)}</span></span>
        <span class="rb ${status || "unsure"}">${status === "known" ? "\u2713" : "\u25CB"}</span>
        ${returnBtn}
      </div>`;
    });
    document.getElementById("reviewList").innerHTML = listHtml || '<span style="color:var(--muted);font-size:14px;font-style:italic">Mark cards as you study to track your progress in this direction.</span>';
  }
  function returnSeenCardToDeck(encodedId) {
    const cardId = decodeURIComponent(encodedId);
    const card = originalDeck.find((c) => c.id === cardId);
    if (!card) return;
    const directionalMarks = getDirectionalMarksStore();
    directionalMarks[cardId] = "unsure";
    marks = directionalMarks;
    const progress = getWordProgress(cardId);
    progress.dueAt = Date.now();
    progress.intervalDays = 0;
    progress.streak = 0;
    progress.easyStreak = 0;
    progress.srsStage = Math.max(0, getSrsStage(progress) - 1);
    if (spacedRepetition) {
      deck = buildStudyDeck(originalDeck);
      const dueIdx = deck.findIndex((c) => c.id === cardId);
      if (dueIdx >= 0 && dueIdx < activeDeckCount) {
        currentIdx = dueIdx;
        isFlipped = false;
      } else if (activeDeckCount > 0) {
        currentIdx = Math.min(currentIdx, activeDeckCount - 1);
      }
    } else {
      deck = deck.filter((c) => c.id !== cardId);
      const splitAt = deck.findIndex((c) => marks[c.id] === "known");
      const insertAt = splitAt === -1 ? deck.length : splitAt;
      deck.splice(insertAt, 0, card);
      currentIdx = Math.min(insertAt, Math.max(deck.length - 1, 0));
      isFlipped = false;
    }
    renderCard();
    renderProgress();
    renderReview();
    saveState();
  }
  function updateConsentButtonState() {
    const checkbox = document.getElementById("consentCheckbox");
    const btn = document.getElementById("consentContinueBtn");
    if (!btn) return;
    if (!disclaimerModalRequiresAgreement) {
      btn.disabled = false;
      btn.textContent = "Close";
      return;
    }
    btn.textContent = "Agree and continue";
    btn.disabled = !(checkbox && checkbox.checked);
  }
  function openDisclaimerModal(requireAgreement = !hasAcceptedDisclaimer) {
    const overlay = document.getElementById("consentOverlay");
    const checkRow = document.getElementById("consentCheckRow");
    const checkbox = document.getElementById("consentCheckbox");
    if (!overlay) return;
    disclaimerModalRequiresAgreement = !!requireAgreement;
    if (checkRow) checkRow.style.display = disclaimerModalRequiresAgreement ? "flex" : "none";
    if (checkbox) checkbox.checked = false;
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    updateConsentButtonState();
  }
  function closeDisclaimerModal() {
    const overlay = document.getElementById("consentOverlay");
    if (!overlay) return;
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    if (!isTransferModalOpen() && !isAnalyticsModalOpen()) document.body.classList.remove("modal-open");
  }
  function handleConsentAction() {
    if (!disclaimerModalRequiresAgreement) {
      closeDisclaimerModal();
      return;
    }
    const checkbox = document.getElementById("consentCheckbox");
    if (!checkbox || !checkbox.checked) return;
    hasAcceptedDisclaimer = true;
    const storage = getStorage();
    if (storage) storage.setItem(CONSENT_STORAGE_KEY, "accepted");
    closeDisclaimerModal();
  }
  function initializeConsentGate() {
    const storage = getStorage();
    hasAcceptedDisclaimer = storage ? storage.getItem(CONSENT_STORAGE_KEY) === "accepted" : false;
    const checkbox = document.getElementById("consentCheckbox");
    if (checkbox) checkbox.addEventListener("change", updateConsentButtonState);
    if (!hasAcceptedDisclaimer) {
      openDisclaimerModal(true);
    } else {
      updateConsentButtonState();
    }
  }
  function showDisclaimerModal() {
    openDisclaimerModal(false);
  }
  function isDisclaimerModalOpen() {
    return !!document.getElementById("consentOverlay")?.classList.contains("show");
  }
  function isTransferModalOpen() {
    return !!document.getElementById("transferOverlay")?.classList.contains("show");
  }
  function isAnalyticsModalOpen() {
    const overlay = document.getElementById("analyticsOverlay");
    return !!overlay && overlay.classList.contains("show");
  }
  function openAnalyticsOverlay() {
    const overlay = document.getElementById("analyticsOverlay");
    if (!overlay) return;
    renderAnalyticsOverlay();
    overlay.classList.add("show");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }
  function closeAnalyticsOverlay() {
    const overlay = document.getElementById("analyticsOverlay");
    if (!overlay) return;
    overlay.classList.remove("show");
    overlay.setAttribute("aria-hidden", "true");
    if (!isDisclaimerModalOpen() && !isTransferModalOpen()) document.body.classList.remove("modal-open");
  }
  function installTouchSafeTapBridge() {
    const TOUCH_TAP_SELECTOR = [
      "button",
      '[role="button"]',
      '[role="switch"]',
      ".card-wrapper",
      "[onclick]"
    ].join(",");
    const MAX_TAP_MOVEMENT_PX = 14;
    const MAX_TAP_SCROLL_PX = 8;
    let lastTouchTriggeredEl = null;
    let lastTouchTriggeredAt = 0;
    let syntheticTapDispatchDepth = 0;
    let activeTouchGesture = null;
    let activePointerGesture = null;
    function getTapTarget(startEl) {
      if (!startEl || !startEl.closest) return null;
      const el = startEl.closest(TOUCH_TAP_SELECTOR);
      if (!el) return null;
      if (el.closest("label") && !el.matches('button,[role="button"],[role="switch"],.card-wrapper,[onclick]')) return null;
      return el;
    }
    function isDisabledTapTarget(el) {
      return !el || el.disabled || el.getAttribute("aria-disabled") === "true";
    }
    function shouldIgnoreTouchEvent(event) {
      if (event.type === "pointerup" || event.type === "pointerdown" || event.type === "pointermove" || event.type === "pointercancel") {
        return event.pointerType && event.pointerType !== "touch" && event.pointerType !== "pen";
      }
      return false;
    }
    function getEventPoint(event) {
      const touch = event.changedTouches && event.changedTouches[0] || event.touches && event.touches[0];
      if (touch) {
        return { id: touch.identifier, x: touch.clientX, y: touch.clientY };
      }
      if (typeof event.clientX === "number" && typeof event.clientY === "number") {
        return { id: event.pointerId || "pointer", x: event.clientX, y: event.clientY };
      }
      return null;
    }
    function getScrollSnapshots(el) {
      const snapshots = [];
      let node = el instanceof Element ? el.parentElement : null;
      while (node) {
        const style = window.getComputedStyle(node);
        const overflowY = style.overflowY || "";
        const overflowX = style.overflowX || "";
        const isScrollable = /(auto|scroll|overlay)/.test(`${overflowY} ${overflowX}`) && (node.scrollHeight > node.clientHeight + 1 || node.scrollWidth > node.clientWidth + 1);
        if (isScrollable) {
          snapshots.push({ el: node, top: node.scrollTop, left: node.scrollLeft });
        }
        node = node.parentElement;
      }
      snapshots.push({
        el: window,
        top: window.scrollY || window.pageYOffset || 0,
        left: window.scrollX || window.pageXOffset || 0
      });
      return snapshots;
    }
    function hasScrollGesture(snapshots) {
      return snapshots.some(({ el, top, left }) => {
        const currentTop = el === window ? window.scrollY || window.pageYOffset || 0 : el.scrollTop;
        const currentLeft = el === window ? window.scrollX || window.pageXOffset || 0 : el.scrollLeft;
        return Math.abs(currentTop - top) > MAX_TAP_SCROLL_PX || Math.abs(currentLeft - left) > MAX_TAP_SCROLL_PX;
      });
    }
    function createGesture(event, target) {
      const point = getEventPoint(event);
      if (!point || !target) return null;
      return {
        id: point.id,
        target,
        startX: point.x,
        startY: point.y,
        moved: false,
        scrolled: false,
        scrollSnapshots: getScrollSnapshots(target)
      };
    }
    function updateGesture(gesture, event) {
      if (!gesture) return gesture;
      const point = getEventPoint(event);
      if (point && point.id === gesture.id) {
        if (Math.abs(point.x - gesture.startX) > MAX_TAP_MOVEMENT_PX || Math.abs(point.y - gesture.startY) > MAX_TAP_MOVEMENT_PX) {
          gesture.moved = true;
        }
      }
      if (!gesture.scrolled && gesture.scrollSnapshots && gesture.scrollSnapshots.length) {
        gesture.scrolled = hasScrollGesture(gesture.scrollSnapshots);
      }
      return gesture;
    }
    function clearGestureForEvent(event) {
      if (event.type.startsWith("pointer")) {
        activePointerGesture = null;
      } else {
        activeTouchGesture = null;
      }
    }
    function dispatchSyntheticClick(el) {
      syntheticTapDispatchDepth += 1;
      try {
        el.dispatchEvent(new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window
        }));
      } finally {
        syntheticTapDispatchDepth = Math.max(0, syntheticTapDispatchDepth - 1);
      }
    }
    function onTouchLikeStart(event) {
      if (shouldIgnoreTouchEvent(event)) return;
      if (event.defaultPrevented) return;
      if (event.touches && event.touches.length > 1) {
        activeTouchGesture = null;
        return;
      }
      const el = getTapTarget(event.target);
      if (isDisabledTapTarget(el)) return;
      const gesture = createGesture(event, el);
      if (event.type === "pointerdown") activePointerGesture = gesture;
      else activeTouchGesture = gesture;
    }
    function onTouchLikeMove(event) {
      if (shouldIgnoreTouchEvent(event)) return;
      if (event.type === "pointermove") updateGesture(activePointerGesture, event);
      else updateGesture(activeTouchGesture, event);
    }
    function onTouchLikeTap(event) {
      if (shouldIgnoreTouchEvent(event)) return;
      const gesture = event.type === "pointerup" ? activePointerGesture : activeTouchGesture;
      updateGesture(gesture, event);
      if (!gesture) return;
      const el = getTapTarget(event.target) || gesture.target;
      const gestureTarget = gesture.target;
      clearGestureForEvent(event);
      if (event.defaultPrevented) return;
      if (isDisabledTapTarget(gestureTarget) || !el || el !== gestureTarget) return;
      if (gesture.moved || gesture.scrolled) return;
      const now = Date.now();
      if (lastTouchTriggeredEl === gestureTarget && now - lastTouchTriggeredAt < 700) {
        event.preventDefault();
        return;
      }
      lastTouchTriggeredEl = gestureTarget;
      lastTouchTriggeredAt = now;
      event.preventDefault();
      dispatchSyntheticClick(gestureTarget);
    }
    function onTouchLikeCancel(event) {
      if (shouldIgnoreTouchEvent(event)) return;
      clearGestureForEvent(event);
    }
    function suppressNativeFollowupClick(event) {
      if (syntheticTapDispatchDepth > 0) return;
      const el = getTapTarget(event.target);
      if (!el) return;
      if (lastTouchTriggeredEl === el && Date.now() - lastTouchTriggeredAt < 700) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }
    }
    document.addEventListener("touchstart", onTouchLikeStart, true);
    document.addEventListener("touchmove", onTouchLikeMove, true);
    document.addEventListener("touchend", onTouchLikeTap, true);
    document.addEventListener("touchcancel", onTouchLikeCancel, true);
    document.addEventListener("pointerdown", onTouchLikeStart, true);
    document.addEventListener("pointermove", onTouchLikeMove, true);
    document.addEventListener("pointerup", onTouchLikeTap, true);
    document.addEventListener("pointercancel", onTouchLikeCancel, true);
    document.addEventListener("click", suppressNativeFollowupClick, true);
  }
  function backfillConfirmedMilestones(cards, marksStore) {
    (cards || []).forEach((card) => {
      const progress = getWordProgress(card.id);
      if (!progress.firstSeenAt && progress.lastReviewedAt) progress.firstSeenAt = progress.lastReviewedAt;
      if (!progress.firstConfirmedAt && marksStore?.[card.id] === "known" && progress.lastReviewedAt) progress.firstConfirmedAt = progress.lastReviewedAt;
    });
  }
  function buildDailyCumulativeSeriesFromMap(dailyMap, startTs = 0) {
    const entries = Object.entries(dailyMap || {}).filter(([, value]) => Number.isFinite(value) && value > 0);
    if (!entries.length) return [];
    entries.sort((a, b) => a[0].localeCompare(b[0]));
    const firstKey = startTs ? getUsageDayKey(startTs) : entries[0][0];
    const lastKey = getUsageDayKey();
    let cursor = /* @__PURE__ */ new Date(`${firstKey}T00:00:00`);
    const last = /* @__PURE__ */ new Date(`${lastKey}T00:00:00`);
    let cumulative = 0;
    const series = [];
    while (cursor <= last) {
      const key = getUsageDayKey(cursor.getTime());
      cumulative += dailyMap[key] || 0;
      series.push({ key, ts: cursor.getTime(), value: cumulative / (60 * 60 * 1e3) });
      cursor.setDate(cursor.getDate() + 1);
    }
    return series;
  }
  function buildCumulativeConfirmationSeries(cards, marksStore) {
    const total = (cards || []).length;
    if (!total) return { total: 0, currentConfirmed: 0, weeklyPct: 0, series: [] };
    backfillConfirmedMilestones(cards, marksStore);
    const confirmedTimes = cards.map((card) => getWordProgress(card.id).firstConfirmedAt || 0).filter(Boolean).sort((a, b) => a - b);
    const currentConfirmed = (cards || []).filter((card) => marksStore?.[card.id] === "known").length;
    if (!confirmedTimes.length) return { total, currentConfirmed, weeklyPct: 0, series: [] };
    const dailyAdds = {};
    confirmedTimes.forEach((ts) => {
      const key = getUsageDayKey(ts);
      dailyAdds[key] = (dailyAdds[key] || 0) + 1;
    });
    const firstKey = Object.keys(dailyAdds).sort()[0];
    const lastKey = getUsageDayKey();
    let cursor = /* @__PURE__ */ new Date(`${firstKey}T00:00:00`);
    const last = /* @__PURE__ */ new Date(`${lastKey}T00:00:00`);
    let cumulative = 0;
    const series = [];
    while (cursor <= last) {
      const key = getUsageDayKey(cursor.getTime());
      cumulative += dailyAdds[key] || 0;
      series.push({ key, ts: cursor.getTime(), value: cumulative / total, count: cumulative });
      cursor.setDate(cursor.getDate() + 1);
    }
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1e3;
    const recentCount = confirmedTimes.filter((ts) => ts >= cutoff).length;
    const weeklyPct = total ? recentCount / total * 100 : 0;
    return { total, currentConfirmed, weeklyPct, series };
  }
  function getRegressionProjection(series, currentCount, totalCount) {
    if (!Array.isArray(series) || series.length < 2 || !totalCount || currentCount >= totalCount) return null;
    const recent = series.slice(-28);
    if (recent.length < 2) return null;
    const x0 = recent[0].ts;
    const points = recent.map((point) => ({ x: (point.ts - x0) / (24 * 60 * 60 * 1e3), y: point.count }));
    const n = points.length;
    const sumX = points.reduce((sum, p) => sum + p.x, 0);
    const sumY = points.reduce((sum, p) => sum + p.y, 0);
    const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumXX = points.reduce((sum, p) => sum + p.x * p.x, 0);
    const denom = n * sumXX - sumX * sumX;
    if (!denom) return null;
    const slope = (n * sumXY - sumX * sumY) / denom;
    const intercept = (sumY - slope * sumX) / n;
    if (!(slope > 0.01)) return null;
    const projectedX = (totalCount - intercept) / slope;
    if (!Number.isFinite(projectedX)) return null;
    const projectedTs = x0 + projectedX * 24 * 60 * 60 * 1e3;
    return projectedTs >= Date.now() ? { cardsPerDay: slope, projectedTs } : null;
  }
  function getCertaintyBucketForCard(card, marksStore) {
    const progress = getWordProgress(card.id);
    const confidence = getConfidencePct(progress);
    if (!progress.seenCount && confidence === null && marksStore?.[card.id] !== "known") return "unseen";
    if (marksStore?.[card.id] === "known") return "100";
    if (confidence === null) return progress.seenCount ? "0" : "unseen";
    if (confidence >= 75) return "100";
    if (confidence >= 25) return "50";
    return "0";
  }
  function buildCertaintyBuckets(cards, marksStore) {
    const buckets = { unseen: 0, "0": 0, "50": 0, "100": 0 };
    (cards || []).forEach((card) => {
      buckets[getCertaintyBucketForCard(card, marksStore)] += 1;
    });
    return buckets;
  }
  function buildLineChartSvg(series, options = {}) {
    const width = options.width || 860;
    const height = options.height || 220;
    const padLeft = 36;
    const padRight = 14;
    const padTop = 12;
    const padBottom = 24;
    const values = (series || []).map((point) => Number(point.value) || 0);
    if (!values.length) return `<div class="analytics-empty">Not enough data yet.</div>`;
    const maxValue = Math.max(...values, options.maxValue || 0);
    const safeMax = maxValue > 0 ? maxValue : 1;
    const minTs = series[0].ts;
    const maxTs = series[series.length - 1].ts || minTs + 1;
    const span = Math.max(1, maxTs - minTs);
    const toX = (ts) => padLeft + (ts - minTs) / span * (width - padLeft - padRight);
    const toY = (value) => height - padBottom - value / safeMax * (height - padTop - padBottom);
    const path = series.map((point, idx) => `${idx ? "L" : "M"} ${toX(point.ts).toFixed(1)} ${toY(point.value).toFixed(1)}`).join(" ");
    const lastPoint = series[series.length - 1];
    const midPoint = series[Math.max(0, Math.floor(series.length / 2) - 1)];
    const axisLabels = [{ x: toX(series[0].ts), label: formatAnalyticsDate(series[0].ts) }, { x: toX(midPoint.ts), label: formatAnalyticsDate(midPoint.ts) }, { x: toX(lastPoint.ts), label: formatAnalyticsDate(lastPoint.ts) }];
    const yLabels = [0, safeMax / 2, safeMax];
    return `
    <svg class="analytics-chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${escapeHtml(options.title || "Chart")}">
      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${height - padBottom}" class="analytics-axis-line"></line>
      <line x1="${padLeft}" y1="${height - padBottom}" x2="${width - padRight}" y2="${height - padBottom}" class="analytics-axis-line"></line>
      ${yLabels.map((value) => {
      const y = toY(value);
      return `
          <line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" class="analytics-grid-line"></line>
          <text x="${padLeft - 8}" y="${y + 4}" text-anchor="end" class="analytics-axis-text">${options.percent ? `${Math.round(value * 100)}%` : value.toFixed(value >= 10 ? 0 : 1)}</text>
        `;
    }).join("")}
      <path d="${path}" class="analytics-line-path"></path>
      <circle cx="${toX(lastPoint.ts)}" cy="${toY(lastPoint.value)}" r="4" class="analytics-line-point"></circle>
      ${axisLabels.map((item) => `<text x="${item.x}" y="${height - 6}" text-anchor="middle" class="analytics-axis-text">${escapeHtml(item.label)}</text>`).join("")}
    </svg>
  `;
  }
  function buildBarChartSvg(buckets, options = {}) {
    const segments = [
      { key: "100", label: "Easy", className: "stacked-seg-100" },
      { key: "50", label: "Uncertain", className: "stacked-seg-50" },
      { key: "0", label: "Hard", className: "stacked-seg-0" },
      { key: "unseen", label: "Unseen", className: "stacked-seg-unseen" }
    ];
    const total = segments.reduce((sum, s) => sum + (Number(buckets?.[s.key]) || 0), 0);
    if (!total) return `<div class="analytics-empty">No cards in this selection yet.</div>`;
    const segs = segments.map((s) => {
      const count = Number(buckets?.[s.key]) || 0;
      const pct = count / total * 100;
      return { ...s, count, pct };
    }).filter((s) => s.count > 0);
    const barHtml = segs.map(
      (s) => `<div class="stacked-seg ${s.className}" style="width:${s.pct.toFixed(2)}%" title="${s.label}: ${s.count} (${Math.round(s.pct)}%)"></div>`
    ).join("");
    const legendHtml = segs.map(
      (s) => `<span class="stacked-legend-item"><span class="stacked-legend-dot ${s.className}"></span>${s.label} ${s.count} <span class="stacked-legend-pct">${Math.round(s.pct)}%</span></span>`
    ).join("");
    return `
    <div class="stacked-bar-wrap">
      <div class="stacked-bar">${barHtml}</div>
      <div class="stacked-legend">${legendHtml}</div>
    </div>
  `;
  }
  function renderAnalyticsSection(containerId, config) {
    const el = document.getElementById(containerId);
    if (!el) return;
    if (!config || !config.total) {
      el.innerHTML = `<div class="analytics-section"><div class="analytics-empty">Select a study set to see this chart.</div></div>`;
      return;
    }
    const metrics = config.metrics || [];
    el.innerHTML = `
    <section class="analytics-section">
      <div class="analytics-section-head"><div><h3>${escapeHtml(config.title || "Analytics")}</h3><p>${escapeHtml(config.subtitle || "")}</p></div></div>
      <div class="analytics-chart-card"><div class="analytics-chart-title">${escapeHtml(config.barTitle)}</div>${config.barSvg}</div>
      <div class="analytics-metrics-grid">${metrics.map((metric) => `
          <div class="analytics-metric-card">
            <div class="analytics-metric-label">${escapeHtml(metric.label)}</div>
            <div class="analytics-metric-value">${escapeHtml(metric.value)}</div>
            ${metric.note ? `<div class="analytics-metric-note">${escapeHtml(metric.note)}</div>` : ""}
          </div>
        `).join("")}</div>
      <div class="analytics-chart-card"><div class="analytics-chart-title">${escapeHtml(config.lineTitle)}</div>${config.lineSvg}</div>
    </section>
  `;
  }
  function ensureLevelToastElement() {
    let host = document.getElementById("levelToastHost");
    if (host) return host;
    host = document.createElement("div");
    host.id = "levelToastHost";
    host.className = "level-toast-host";
    document.body.appendChild(host);
    return host;
  }
  function clearToastTimers() {
    if (levelToastHideTimer) {
      window.clearTimeout(levelToastHideTimer);
      levelToastHideTimer = null;
    }
    if (levelToastRemoveTimer) {
      window.clearTimeout(levelToastRemoveTimer);
      levelToastRemoveTimer = null;
    }
  }
  function dismissLevelToast() {
    const host = document.getElementById("levelToastHost");
    if (!host) return;
    host.classList.remove("show");
    clearToastTimers();
    levelToastRemoveTimer = window.setTimeout(() => {
      host.innerHTML = "";
      levelToastRemoveTimer = null;
      toastActive = false;
      showNextToast();
    }, 220);
  }
  function renderToast(toast) {
    if (!toast) return;
    const host = ensureLevelToastElement();
    const badgeHtml = toast.badgeHtml || escapeHtml(toast.badgeText || "\u2605");
    host.innerHTML = `
    <button class="level-toast ${toast.variant === "badge" ? "level-toast-achievement" : ""}" type="button" aria-label="Dismiss notification">
      <span class="level-toast-badge">${badgeHtml}</span>
      <span class="level-toast-copy">
        <span class="level-toast-title">${escapeHtml(toast.title || "Well done")}</span>
        <span class="level-toast-sub">${escapeHtml(toast.sub || "Tap to dismiss")}</span>
      </span>
      <span class="level-toast-close" aria-hidden="true">\xD7</span>
    </button>
  `;
    const button = host.querySelector(".level-toast");
    if (button) {
      button.addEventListener("click", dismissLevelToast);
      button.addEventListener("keydown", (event) => {
        if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          dismissLevelToast();
        }
      });
    }
    clearToastTimers();
    requestAnimationFrame(() => host.classList.add("show"));
    toastActive = true;
    levelToastHideTimer = window.setTimeout(() => {
      levelToastHideTimer = null;
      dismissLevelToast();
    }, 1800);
  }
  function enqueueToast(toast) {
    if (!toast) return;
    toastQueue.push(toast);
    if (!toastActive) showNextToast();
  }
  function showNextToast() {
    if (toastActive || !toastQueue.length) return;
    const nextToast = toastQueue.shift();
    renderToast(nextToast);
  }
  function showLevelToast(levelData, totalXp) {
    if (!levelData || !levelData.level) return;
    enqueueToast({
      variant: "level",
      badgeText: `Lv. ${levelData.level}`,
      title: `Congratulations \u2014 you have earned ${levelData.title}`,
      sub: `${levelData.flav || "Well done."} \xB7 ${Number(totalXp || 0).toLocaleString()} XP \xB7 Tap to dismiss`
    });
  }
  function showBadgeToast(achievement) {
    if (!achievement || !achievement.id) return;
    enqueueToast({
      variant: "badge",
      badgeHtml: `<span class="toast-achievement-icon">${achievement.icon || "\u2605"}</span><span class="toast-achievement-label">Badge</span>`,
      title: `Congratulations \u2014 you have earned ${achievement.name}`,
      sub: `${achievement.desc || "Badge earned"} \xB7 Tap to dismiss`
    });
  }
  function buildGamificationSnapshot() {
    const usage = ensureUsageStats();
    const sessionHistory = [...usage.studySessionHistory];
    if (usage.currentStudySession && usage.currentStudySession.startedAt) {
      sessionHistory.push({
        startedAt: usage.currentStudySession.startedAt,
        endedAt: usage.lastStudyCountedAt || Date.now(),
        durationMs: usage.currentStudySession.durationMs || 0,
        interactionCount: usage.currentStudySession.interactionCount || 0
      });
    }
    const streaks = computeStudyStreaks(usage.activeDailyMs);
    const courseData = computeCourseWideData();
    const g2eProgressStore = globalWordProgress.g2e || {};
    const e2gProgressStore = globalWordProgress.e2g || {};
    const morphProgressStore = globalWordProgress.morph || {};
    const mergedProgressStore = {};
    [g2eProgressStore, e2gProgressStore, morphProgressStore].forEach((store) => {
      Object.entries(store).forEach(([cardId, entry]) => {
        const existing = mergedProgressStore[cardId] || {};
        mergedProgressStore[cardId] = {
          ...existing,
          ...entry,
          lastReviewedAt: Math.max(Number(existing.lastReviewedAt) || 0, Number(entry?.lastReviewedAt) || 0),
          firstConfirmedAt: Math.max(Number(existing.firstConfirmedAt) || 0, Number(entry?.firstConfirmedAt) || 0)
        };
      });
    });
    const allCourseCards = [...courseData.allVocabCards, ...courseData.allGrammarCards];
    const mergedMarks = { ...globalWordMarks.g2e || {}, ...globalWordMarks.e2g || {}, ...globalWordMarks.morph || {} };
    const todayStats = computeTodayStats(usage.activeDailyMs, allCourseCards, mergedMarks, mergedProgressStore);
    const achievements = computeAchievements(usage, courseData, streaks, sessionHistory.length, todayStats);
    return { usage, sessionHistory, streaks, courseData, todayStats, achievements };
  }
  function maybeCelebrateLevelUp() {
    const usage = ensureUsageStats();
    const xpData = computeXpAndLevel(usage);
    const currentLevel = xpData.currentLevel?.level || 1;
    const previousLevel = Number.isFinite(appGamification.lastCelebratedLevel) && appGamification.lastCelebratedLevel >= 1 ? appGamification.lastCelebratedLevel : currentLevel;
    if (currentLevel < previousLevel) {
      appGamification.lastCelebratedLevel = currentLevel;
      return;
    }
    if (currentLevel > previousLevel) {
      showLevelToast(xpData.currentLevel, xpData.totalXp);
    }
    appGamification.lastCelebratedLevel = currentLevel;
  }
  function maybeCelebrateAchievements() {
    const todayKey = getUsageDayKey();
    if (appGamification.lastCelebratedBadgeDay && appGamification.lastCelebratedBadgeDay !== todayKey) {
      appGamification.lastEarnedAchievementIds = (appGamification.lastEarnedAchievementIds || []).filter((id) => id !== "daily_first_card");
    }
    const snapshot = buildGamificationSnapshot();
    const earnedAchievements = snapshot.achievements.filter((a) => a.earned);
    const priorEarnedIds = new Set(Array.isArray(appGamification.lastEarnedAchievementIds) ? appGamification.lastEarnedAchievementIds : []);
    const newlyEarned = earnedAchievements.filter((a) => !priorEarnedIds.has(a.id));
    newlyEarned.forEach(showBadgeToast);
    appGamification.lastEarnedAchievementIds = earnedAchievements.map((a) => a.id);
    appGamification.lastCelebratedBadgeDay = todayKey;
  }
  function migrateLegacyXp(usage) {
    let legacyCardXp = 0;
    ["g2e", "e2g", "morph"].forEach((bucket) => {
      const store = globalWordProgress[bucket];
      if (!store || typeof store !== "object") return;
      const keys = Object.keys(store);
      for (let k = 0; k < keys.length; k++) {
        const entry = store[keys[k]];
        if (!entry || typeof entry !== "object") continue;
        const seen = Math.max(0, entry.seenCount || 0);
        for (let i = 0; i < seen; i++) {
          legacyCardXp += i < REVIEW_XP_SCHEDULE.length ? REVIEW_XP_SCHEDULE[i] : 1;
        }
      }
    });
    usage.cardXpEarned = legacyCardXp;
  }
  function computeTotalXp(usage) {
    if (usage.cardXpEarned < 0) migrateLegacyXp(usage);
    const cardXp = Math.max(0, usage.cardXpEarned || 0);
    const timeXp = Math.floor((usage.activeStudyMs || 0) / (60 * 1e3)) * 2;
    return cardXp + timeXp;
  }
  function computeStudyStreaks(activeDailyMs) {
    const map = activeDailyMs || {};
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    let current = 0;
    let cursor = new Date(today);
    if (!map[getUsageDayKey(cursor.getTime())]) {
      cursor.setDate(cursor.getDate() - 1);
    }
    while (map[getUsageDayKey(cursor.getTime())] > 0) {
      current++;
      cursor.setDate(cursor.getDate() - 1);
    }
    const keys = Object.keys(map).filter((k) => map[k] > 0).sort();
    let longest = 0;
    let run = 0;
    let prev = null;
    for (const key of keys) {
      const d = /* @__PURE__ */ new Date(key + "T00:00:00");
      if (prev) {
        const diff = Math.round((d - prev) / (24 * 60 * 60 * 1e3));
        run = diff === 1 ? run + 1 : 1;
      } else {
        run = 1;
      }
      if (run > longest) longest = run;
      prev = d;
    }
    return { current, longest };
  }
  function computeXpAndLevel(usage) {
    const totalXp = computeTotalXp(usage);
    let currentLevel = XP_LEVELS[0];
    let nextLevel = XP_LEVELS[1] || null;
    for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
      if (totalXp >= XP_LEVELS[i].threshold) {
        currentLevel = XP_LEVELS[i];
        nextLevel = XP_LEVELS[i + 1] || null;
        break;
      }
    }
    const levelProgress = nextLevel ? (totalXp - currentLevel.threshold) / (nextLevel.threshold - currentLevel.threshold) : 1;
    return { totalXp, currentLevel, nextLevel, levelProgress: Math.min(1, Math.max(0, levelProgress)) };
  }
  function computeTodayStats(activeDailyMs, cards, marksStore, progressStore) {
    const todayKey = getUsageDayKey();
    const todayMs = (activeDailyMs || {})[todayKey] || 0;
    let reviewedToday = 0;
    let newToday = 0;
    const todayStart = /* @__PURE__ */ new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayTs = todayStart.getTime();
    const seenIds = /* @__PURE__ */ new Set();
    const sourceEntries = progressStore && typeof progressStore === "object" ? Object.entries(progressStore) : [];
    if (sourceEntries.length) {
      sourceEntries.forEach(([cardId, p]) => {
        if (!p) return;
        if (p.lastReviewedAt && p.lastReviewedAt >= todayTs) {
          reviewedToday++;
          seenIds.add(cardId);
        }
        if (p.firstConfirmedAt && p.firstConfirmedAt >= todayTs) {
          newToday++;
          seenIds.add(cardId);
        }
      });
    } else {
      (cards || []).forEach((card) => {
        const p = progressStore?.[card.id];
        if (!p) return;
        if (p.lastReviewedAt && p.lastReviewedAt >= todayTs) reviewedToday++;
        if (p.firstConfirmedAt && p.firstConfirmedAt >= todayTs) newToday++;
      });
    }
    const firstCardTodayEarned = reviewedToday > 0 || newToday > 0 || todayMs > 0 || seenIds.size > 0;
    return { todayMs, reviewedToday, newToday, firstCardTodayEarned };
  }
  function computeAchievements(usage, courseData, streaks, sessionCount, todayStats = null) {
    const earned = [];
    const check = (id, icon, name, desc, condition, group) => {
      earned.push({ id, icon, name, desc, earned: !!condition, group: group || "milestone" });
    };
    const totalConfirmed = courseData.allVocabConfirmed + courseData.allGrammarConfirmed;
    const reviewedToday = Number(todayStats?.reviewedToday) || 0;
    const newToday = Number(todayStats?.newToday) || 0;
    const firstCardTodayEarned = !!todayStats?.firstCardTodayEarned;
    check("daily_first_card", "\u2605", "First Card Today", "Review your first card today", firstCardTodayEarned || reviewedToday > 0 || newToday > 0, "daily");
    check("first_card", "\u2726", "First Light", "Confirm your first card", totalConfirmed >= 1);
    check("ten_cards", "\u2605", "Kindled", "Confirm 10 cards", totalConfirmed >= 10);
    check("fifty_cards", "\u2662", "Diligent", "Confirm 50 cards", totalConfirmed >= 50);
    check("hundred_cards", "\u2736", "Centurion", "Confirm 100 cards", totalConfirmed >= 100);
    check("twofifty", "\u2741", "Quarter-master", "Confirm 250 cards", totalConfirmed >= 250);
    check("five_hundred", "\u2743", "Half a Thousand", "Confirm 500 cards", totalConfirmed >= 500);
    check("streak_3", "\u2668", "Three-fold Cord", "3-day study streak", streaks.current >= 3 || streaks.longest >= 3);
    check("streak_7", "\u2604", "Weekly Flame", "7-day study streak", streaks.current >= 7 || streaks.longest >= 7);
    check("streak_14", "\u269D", "Fortnight", "14-day study streak", streaks.current >= 14 || streaks.longest >= 14);
    check("streak_30", "\u2600", "Monthly Devotion", "30-day study streak", streaks.current >= 30 || streaks.longest >= 30);
    check("hour_one", "\u231B", "First Hour", "Reach 1 hour of active study", (usage.activeStudyMs || 0) >= 60 * 60 * 1e3);
    check("hour_five", "\u23F3", "Five Hours", "Reach 5 hours of active study", (usage.activeStudyMs || 0) >= 5 * 60 * 60 * 1e3);
    check("hour_ten", "\u2316", "Ten Hours", "Reach 10 hours of active study", (usage.activeStudyMs || 0) >= 10 * 60 * 60 * 1e3);
    check("sessions_10", "\u2692", "Seasoned", "Log 10 study sessions", sessionCount >= 10);
    check("sessions_50", "\u2694", "Veteran", "Log 50 study sessions", sessionCount >= 50);
    check("req_vocab", "\u2655", "Required Lexicon", "Confirm all required vocabulary", courseData.reqVocabConfirmed >= courseData.reqVocabTotal && courseData.reqVocabTotal > 0);
    check("all_vocab", "\u265B", "Full Lexicon", "Confirm every vocabulary card", courseData.allVocabConfirmed >= courseData.allVocabTotal && courseData.allVocabTotal > 0);
    check("all_grammar", "\u2654", "Grammar Master", "Confirm all grammar cards", courseData.allGrammarConfirmed >= courseData.allGrammarTotal && courseData.allGrammarTotal > 0);
    const chapterKeys = getAllChapterKeys();
    chapterKeys.forEach((chKey) => {
      const chNum = Number(chKey);
      const chCards = getChapterVocabCards(chKey, false);
      if (!chCards.length) return;
      const g2eMarks = globalWordMarks.g2e || {};
      const confirmed = chCards.filter((c) => g2eMarks[c.id] === "known").length;
      check(
        `ch_${chNum}`,
        "\u2720",
        `Ch. ${chNum}`,
        `Confirm all Ch. ${chNum} vocabulary (${chCards.length} cards)`,
        confirmed >= chCards.length,
        "chapter"
      );
    });
    return earned;
  }
  function computeCourseWideData() {
    const allVocab = getAllVocabCards(false);
    const reqVocab = getAllVocabCards(true);
    const allGrammar = getAllGrammarCards();
    const g2eMarks = globalWordMarks.g2e || {};
    const morphMarks = globalWordMarks.morph || {};
    const allVocabConfirmed = allVocab.filter((c) => g2eMarks[c.id] === "known").length;
    const reqVocabConfirmed = reqVocab.filter((c) => g2eMarks[c.id] === "known").length;
    const allGrammarConfirmed = allGrammar.filter((c) => morphMarks[c.id] === "known").length;
    return {
      allVocabTotal: allVocab.length,
      allVocabConfirmed,
      allVocabCards: allVocab,
      reqVocabTotal: reqVocab.length,
      reqVocabConfirmed,
      reqVocabCards: reqVocab,
      allGrammarTotal: allGrammar.length,
      allGrammarConfirmed,
      allGrammarCards: allGrammar
    };
  }
  function buildHeatmapSvg(activeDailyMs) {
    const weeks = 15;
    const cellSize = 13;
    const cellGap = 3;
    const totalDays = weeks * 7;
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - (totalDays - 1) - dayOfWeek);
    const cells = [];
    let maxVal = 0;
    const cursor = new Date(startDate);
    for (let i = 0; i < totalDays + dayOfWeek + 1; i++) {
      const key = getUsageDayKey(cursor.getTime());
      const val = (activeDailyMs || {})[key] || 0;
      const msVal = val / (60 * 1e3);
      if (msVal > maxVal) maxVal = msVal;
      cells.push({ key, val: msVal, date: new Date(cursor), dow: cursor.getDay() });
      cursor.setDate(cursor.getDate() + 1);
    }
    const dayLabels = ["", "M", "", "W", "", "F", ""];
    const labelWidth = 20;
    const gridWidth = (weeks + 1) * (cellSize + cellGap);
    const gridHeight = 7 * (cellSize + cellGap);
    const svgW = labelWidth + gridWidth + 10;
    const svgH = gridHeight + 28;
    const monthLabels = [];
    let lastMonth = -1;
    cells.forEach((cell, i) => {
      const m = cell.date.getMonth();
      if (m !== lastMonth && cell.dow === 0) {
        const week = Math.floor(i / 7);
        monthLabels.push({ label: cell.date.toLocaleDateString(void 0, { month: "short" }), x: labelWidth + week * (cellSize + cellGap) });
        lastMonth = m;
      }
    });
    const safeMax = maxVal > 0 ? maxVal : 1;
    const rects = cells.map((cell, i) => {
      const week = Math.floor(i / 7);
      const dow = i % 7;
      const x = labelWidth + week * (cellSize + cellGap);
      const y = 18 + dow * (cellSize + cellGap);
      const isFuture = cell.date > today;
      let fill;
      if (isFuture) {
        fill = "rgba(255,255,255,0.02)";
      } else if (cell.val === 0) {
        fill = "rgba(255,255,255,0.05)";
      } else {
        const intensity = Math.min(1, cell.val / safeMax);
        const alpha = 0.2 + intensity * 0.7;
        fill = `rgba(201,168,76,${alpha.toFixed(2)})`;
      }
      const title = `${cell.key}: ${Math.round(cell.val)}m`;
      return `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="3" fill="${fill}"><title>${escapeHtml(title)}</title></rect>`;
    }).join("");
    const dayLabelsSvg = dayLabels.map((label, i) => {
      if (!label) return "";
      const y = 18 + i * (cellSize + cellGap) + cellSize - 2;
      return `<text x="0" y="${y}" class="analytics-axis-text heatmap-day-label">${label}</text>`;
    }).join("");
    const monthLabelsSvg = monthLabels.map((m) => `<text x="${m.x}" y="12" class="analytics-axis-text">${escapeHtml(m.label)}</text>`).join("");
    return `<svg class="heatmap-svg" viewBox="0 0 ${svgW} ${svgH}" preserveAspectRatio="xMinYMin meet" role="img" aria-label="Study activity heatmap">${monthLabelsSvg}${dayLabelsSvg}${rects}</svg>`;
  }
  function buildCircularProgressSvg(fraction, label, sublabel) {
    const size = 100;
    const stroke = 7;
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const offset = circ * (1 - Math.min(1, Math.max(0, fraction)));
    const pct = Math.round(fraction * 100);
    return `
    <svg class="ring-svg" viewBox="0 0 ${size} ${size}" role="img" aria-label="${escapeHtml(label)}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${stroke}"/>
      <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--gold)" stroke-width="${stroke}"
        stroke-dasharray="${circ}" stroke-dashoffset="${offset}" stroke-linecap="round"
        transform="rotate(-90 ${size / 2} ${size / 2})" class="ring-progress"/>
      <text x="${size / 2}" y="${size / 2 - 4}" text-anchor="middle" class="ring-value">${pct}%</text>
      <text x="${size / 2}" y="${size / 2 + 12}" text-anchor="middle" class="ring-label">${escapeHtml(sublabel)}</text>
    </svg>
  `;
  }
  function buildLevelBarHtml(xpData) {
    const pct = Math.round(xpData.levelProgress * 100);
    const nextLabel = xpData.nextLevel ? `${xpData.nextLevel.threshold - xpData.totalXp} XP to ${xpData.nextLevel.title}` : "Max level reached";
    return `
    <div class="level-bar-wrap">
      <div class="level-bar-track">
        <div class="level-bar-fill" style="width:${pct}%"></div>
      </div>
      <div class="level-bar-caption">${escapeHtml(nextLabel)}</div>
    </div>
  `;
  }
  function buildTitleLadderHtml(xpData) {
    const totalXp = Number(xpData?.totalXp || 0);
    const currentLevel = Number(xpData?.currentLevel?.level || 1);
    const items = XP_LEVELS.map((level) => {
      const earned = totalXp >= level.threshold;
      const isCurrent = currentLevel === level.level;
      const star = earned ? '<span class="title-ladder-star" aria-hidden="true">\u2605</span>' : '<span class="title-ladder-star muted" aria-hidden="true">\u2606</span>';
      return `
      <div class="title-ladder-row ${earned ? "earned" : "locked"} ${isCurrent ? "current" : ""}">
        <div class="title-ladder-main">
          <div class="title-ladder-name-wrap">${star}<span class="title-ladder-name">${escapeHtml(level.title)}</span>${isCurrent ? '<span class="title-ladder-current">Current</span>' : ""}</div>
          <div class="title-ladder-note">Level ${level.level}${level.flav ? ` \xB7 ${escapeHtml(level.flav)}` : ""}</div>
        </div>
        <div class="title-ladder-xp">${level.threshold.toLocaleString()} XP</div>
      </div>
    `;
    }).join("");
    return `
    <div class="analytics-chart-card title-ladder-card">
      <div class="analytics-chart-title">Titles and XP required</div>
      <div class="title-ladder-list">${items}</div>
    </div>
  `;
  }
  function renderAnalyticsOverlay() {
    const overlay = document.getElementById("analyticsOverlay");
    if (!overlay) return;
    accumulateActiveStudyTime();
    const usage = ensureUsageStats();
    const usageSeries = buildDailyCumulativeSeriesFromMap(usage.activeDailyMs, usage.firstStudyAt || 0);
    const sessionHistory = [...usage.studySessionHistory];
    if (usage.currentStudySession && usage.currentStudySession.startedAt) sessionHistory.push({ startedAt: usage.currentStudySession.startedAt, endedAt: usage.lastStudyCountedAt || Date.now(), durationMs: usage.currentStudySession.durationMs || 0, interactionCount: usage.currentStudySession.interactionCount || 0 });
    const latestSession = sessionHistory[sessionHistory.length - 1] || null;
    const vocabCards = selectedKeys.length ? getSelectedVocabCards(selectedKeys, requiredOnly) : [];
    const vocabMarks = directionToGreek ? globalWordMarks.e2g : globalWordMarks.g2e;
    const vocabProgress = buildCumulativeConfirmationSeries(vocabCards, vocabMarks);
    const vocabProjection = getRegressionProjection(vocabProgress.series, vocabProgress.currentConfirmed, vocabProgress.total);
    const vocabBuckets = buildCertaintyBuckets(vocabCards, vocabMarks);
    const activePerConfirmed = vocabProgress.currentConfirmed ? usage.activeStudyMs / vocabProgress.currentConfirmed : 0;
    const grammarCards = canAccessGrammarUi() && selectedKeys.length ? getSelectedGrammarCards(selectedKeys) : [];
    const grammarMarks = globalWordMarks.morph;
    const grammarProgress = buildCumulativeConfirmationSeries(grammarCards, grammarMarks);
    const grammarProjection = getRegressionProjection(grammarProgress.series, grammarProgress.currentConfirmed, grammarProgress.total);
    const grammarBuckets = buildCertaintyBuckets(grammarCards, grammarMarks);
    const courseData = computeCourseWideData();
    const streaks = computeStudyStreaks(usage.activeDailyMs);
    const xpData = computeXpAndLevel(usage);
    const g2eProgressStore = globalWordProgress.g2e || {};
    const e2gProgressStore = globalWordProgress.e2g || {};
    const morphProgressStore = globalWordProgress.morph || {};
    const mergedProgressStore = {};
    [g2eProgressStore, e2gProgressStore, morphProgressStore].forEach((store) => {
      Object.entries(store).forEach(([cardId, entry]) => {
        const existing = mergedProgressStore[cardId] || {};
        mergedProgressStore[cardId] = {
          ...existing,
          ...entry,
          lastReviewedAt: Math.max(Number(existing.lastReviewedAt) || 0, Number(entry?.lastReviewedAt) || 0),
          firstConfirmedAt: Math.max(Number(existing.firstConfirmedAt) || 0, Number(entry?.firstConfirmedAt) || 0)
        };
      });
    });
    const allCourseCards = [...courseData.allVocabCards, ...courseData.allGrammarCards];
    const mergedMarks = { ...globalWordMarks.g2e || {}, ...globalWordMarks.e2g || {}, ...globalWordMarks.morph || {} };
    const todayStats = computeTodayStats(usage.activeDailyMs, allCourseCards, mergedMarks, mergedProgressStore);
    const achievements = computeAchievements(usage, courseData, streaks, sessionHistory.length, todayStats);
    const dailyAwards = achievements.filter((a) => a.group === "daily");
    const milestones = achievements.filter((a) => a.group !== "chapter" && a.group !== "daily");
    const chapterAwards = achievements.filter((a) => a.group === "chapter");
    const earnedDaily = dailyAwards.filter((a) => a.earned).length;
    const earnedMilestones = milestones.filter((a) => a.earned).length;
    const earnedChapters = chapterAwards.filter((a) => a.earned).length;
    const heroEl = document.getElementById("analyticsHero");
    if (heroEl) {
      const streakLabel = streaks.current === 1 ? "1 day" : `${streaks.current} days`;
      const streakFlame = streaks.current >= 7 ? "\u{1F525}" : streaks.current >= 3 ? "\u2668\uFE0F" : "\u2727";
      const todayGoalFraction = Math.min(1, todayStats.todayMs / (15 * 60 * 1e3));
      heroEl.innerHTML = `
      <div class="hero-grid">
        <div class="hero-card hero-streak">
          <div class="hero-icon">${streakFlame}</div>
          <div class="hero-big">${streakLabel}</div>
          <div class="hero-sub">Current streak${streaks.longest > streaks.current ? ` \xB7 Best: ${streaks.longest}d` : ""}</div>
        </div>
        <div class="hero-card hero-level">
          <div class="hero-rank-badge">Lv. ${xpData.currentLevel.level}</div>
          <div class="hero-big">${escapeHtml(xpData.currentLevel.title)}</div>
          <div class="hero-sub">${xpData.totalXp.toLocaleString()} XP${xpData.currentLevel.flav ? " \xB7 " + escapeHtml(xpData.currentLevel.flav) : ""}</div>
          ${buildLevelBarHtml(xpData)}
        </div>
        <div class="hero-card hero-today">
          ${buildCircularProgressSvg(todayGoalFraction, "Today progress", formatUsageDuration(todayStats.todayMs))}
          <div class="hero-today-stats">
            <span>${todayStats.reviewedToday} reviewed</span>
            <span>${todayStats.newToday} new</span>
          </div>
        </div>
      </div>
    `;
    }
    const titlesEl = document.getElementById("analyticsTitles");
    if (titlesEl) {
      titlesEl.innerHTML = buildTitleLadderHtml(xpData);
    }
    const courseEl = document.getElementById("analyticsCourseCompletion");
    if (courseEl) {
      const g2eMarks = globalWordMarks.g2e || {};
      const morphMarksAll = globalWordMarks.morph || {};
      const courseVocabBuckets = buildCertaintyBuckets(courseData.allVocabCards, g2eMarks);
      const showGrammar = canAccessGrammarUi();
      let courseGrammarHtml = "";
      if (showGrammar) {
        const courseGrammarBuckets = buildCertaintyBuckets(courseData.allGrammarCards, morphMarksAll);
        courseGrammarHtml = `
        <div class="analytics-chart-card" style="margin-top:10px">
          <div class="analytics-chart-title">Grammar \u2014 ${courseData.allGrammarConfirmed} / ${courseData.allGrammarTotal} confirmed</div>
          ${buildBarChartSvg(courseGrammarBuckets, { title: "Course grammar certainty" })}
        </div>`;
      }
      courseEl.innerHTML = `
      <div class="analytics-chart-card">
        <div class="analytics-chart-title">Vocabulary \u2014 ${courseData.allVocabConfirmed} / ${courseData.allVocabTotal} confirmed (${courseData.reqVocabConfirmed} / ${courseData.reqVocabTotal} required)</div>
        ${buildBarChartSvg(courseVocabBuckets, { title: "Course vocabulary certainty" })}
      </div>
      ${courseGrammarHtml}
    `;
    }
    const heatmapEl = document.getElementById("analyticsHeatmap");
    if (heatmapEl) {
      const hasData = Object.keys(usage.activeDailyMs || {}).some((k) => usage.activeDailyMs[k] > 0);
      heatmapEl.innerHTML = hasData ? `<div class="analytics-chart-card heatmap-card">
           <div class="analytics-chart-title">Study activity</div>
           ${buildHeatmapSvg(usage.activeDailyMs)}
           <div class="heatmap-legend">
             <span class="heatmap-legend-label">Less</span>
             <span class="heatmap-swatch" style="background:rgba(255,255,255,0.05)"></span>
             <span class="heatmap-swatch" style="background:rgba(201,168,76,0.25)"></span>
             <span class="heatmap-swatch" style="background:rgba(201,168,76,0.50)"></span>
             <span class="heatmap-swatch" style="background:rgba(201,168,76,0.75)"></span>
             <span class="heatmap-swatch" style="background:rgba(201,168,76,0.90)"></span>
             <span class="heatmap-legend-label">More</span>
           </div>
         </div>` : "";
    }
    const achieveEl = document.getElementById("analyticsAchievements");
    if (achieveEl) {
      const dailyHtml = dailyAwards.length ? `
      <div class="achieve-group-label">Daily <span class="achieve-counter">${earnedDaily} / ${dailyAwards.length}</span></div>
      <div class="achieve-grid">${dailyAwards.map((a) => `
        <div class="achieve-badge ${a.earned ? "earned" : "locked"}" title="${escapeHtml(a.desc)}">
          <div class="achieve-icon">${a.icon}</div>
          <div class="achieve-name">${escapeHtml(a.name)}</div>
        </div>
      `).join("")}</div>
    ` : "";
      const chapterHtml = chapterAwards.length ? `
      <div class="achieve-group-label">Chapters <span class="achieve-counter">${earnedChapters} / ${chapterAwards.length}</span></div>
      <div class="achieve-grid achieve-grid-chapters">${chapterAwards.map((a) => `
        <div class="achieve-badge ${a.earned ? "earned" : "locked"}" title="${escapeHtml(a.desc)}">
          <div class="achieve-icon">${a.icon}</div>
          <div class="achieve-name">${escapeHtml(a.name)}</div>
        </div>
      `).join("")}</div>
    ` : "";
      achieveEl.innerHTML = `
      <div class="analytics-chart-card achieve-card">
        <div class="analytics-chart-title">Achievements</div>
        ${dailyHtml}
        <div class="achieve-group-label">Milestones <span class="achieve-counter">${earnedMilestones} / ${milestones.length}</span></div>
        <div class="achieve-grid">${milestones.map((a) => `
          <div class="achieve-badge ${a.earned ? "earned" : "locked"}" title="${escapeHtml(a.desc)}">
            <div class="achieve-icon">${a.icon}</div>
            <div class="achieve-name">${escapeHtml(a.name)}</div>
          </div>
        `).join("")}</div>
        ${chapterHtml}
      </div>
    `;
    }
    const overallMetricsEl = document.getElementById("analyticsOverallMetrics");
    const overallChartEl = document.getElementById("analyticsTimeChart");
    const sessionEl = document.getElementById("analyticsSessionSummary");
    if (overallMetricsEl) overallMetricsEl.innerHTML = `
      <div class="analytics-metric-card"><div class="analytics-metric-label">Active study time</div><div class="analytics-metric-value">${escapeHtml(formatUsageDuration(usage.activeStudyMs))}</div><div class="analytics-metric-note">Stricter interaction-based timer</div></div>
      <div class="analytics-metric-card"><div class="analytics-metric-label">Foreground time</div><div class="analytics-metric-value">${escapeHtml(formatUsageDuration(usage.totalMs))}</div><div class="analytics-metric-note">App visible on screen</div></div>
      <div class="analytics-metric-card"><div class="analytics-metric-label">Study sessions logged</div><div class="analytics-metric-value">${sessionHistory.length}</div><div class="analytics-metric-note">${latestSession ? `Latest ${formatAnalyticsDateTime(latestSession.startedAt)}` : "No completed sessions yet"}</div></div>
      <div class="analytics-metric-card"><div class="analytics-metric-label">Average session length</div><div class="analytics-metric-value">${escapeHtml(formatUsageDuration(sessionHistory.length ? sessionHistory.reduce((sum, entry) => sum + (entry.durationMs || 0), 0) / sessionHistory.length : 0))}</div><div class="analytics-metric-note">Across saved study sessions</div></div>`;
    if (overallChartEl) overallChartEl.innerHTML = usageSeries.length ? buildLineChartSvg(usageSeries, { title: "Cumulative active study time" }) : `<div class="analytics-empty">Start studying and this cumulative time chart will wake up.</div>`;
    if (sessionEl) sessionEl.textContent = latestSession ? `Latest session: ${formatAnalyticsDateTime(latestSession.startedAt)} \u2192 ${formatAnalyticsDateTime(latestSession.endedAt)} \xB7 ${formatUsageDuration(latestSession.durationMs)} \xB7 ${latestSession.interactionCount || 0} study actions` : "No study session history yet.";
    renderAnalyticsSection("analyticsVocabSection", { title: "Vocabulary progress", subtitle: selectedKeys.length ? `${requiredOnly ? "Required-only" : "All selected"} vocabulary for the current selection` : "Choose one or more vocabulary sets to populate this view.", total: vocabProgress.total, metrics: [{ label: "Confirmed now", value: `${vocabProgress.currentConfirmed} / ${vocabProgress.total || 0}`, note: "Current selected vocabulary" }, { label: "Weekly progress", value: `${vocabProgress.weeklyPct.toFixed(1)}%`, note: "Share of selected vocabulary first confirmed in the last 7 days" }, { label: "Avg active time / confirmed word", value: vocabProgress.currentConfirmed ? formatUsageDuration(activePerConfirmed) : "\u2014", note: "Based on total active study time" }, { label: "Projected completion", value: vocabProgress.currentConfirmed >= vocabProgress.total && vocabProgress.total ? "Complete" : vocabProjection ? formatAnalyticsDate(vocabProjection.projectedTs) : "\u2014", note: vocabProjection ? `${vocabProjection.cardsPerDay.toFixed(2)} words/day regression` : "Needs more recent progress data" }], lineTitle: "Cumulative confirmed vocabulary fraction", lineSvg: vocabProgress.series.length ? buildLineChartSvg(vocabProgress.series, { title: "Vocabulary progress", percent: true, maxValue: 1 }) : `<div class="analytics-empty">No confirmed vocabulary history yet for this selection.</div>`, barTitle: "Current vocabulary certainty buckets", barSvg: buildBarChartSvg(vocabBuckets, { title: "Vocabulary certainty buckets" }) });
    renderAnalyticsSection("analyticsGrammarSection", { title: "Grammar progress", subtitle: canAccessGrammarUi() ? "Morphology and grammar items in the current selection" : "Switch to the full vocabulary + grammar layout to track grammar progress here.", total: grammarProgress.total, metrics: [{ label: "Confirmed now", value: `${grammarProgress.currentConfirmed} / ${grammarProgress.total || 0}`, note: "Current selected grammar items" }, { label: "Weekly progress", value: `${grammarProgress.weeklyPct.toFixed(1)}%`, note: "Share first confirmed in the last 7 days" }, { label: "Projected completion", value: grammarProgress.currentConfirmed >= grammarProgress.total && grammarProgress.total ? "Complete" : grammarProjection ? formatAnalyticsDate(grammarProjection.projectedTs) : "\u2014", note: grammarProjection ? `${grammarProjection.cardsPerDay.toFixed(2)} items/day regression` : "Needs more recent progress data" }, { label: "Required toggle", value: requiredOnly ? "Vocabulary only" : "All vocabulary", note: "Grammar totals are not filtered by required-only" }], lineTitle: "Cumulative confirmed grammar fraction", lineSvg: grammarProgress.series.length ? buildLineChartSvg(grammarProgress.series, { title: "Grammar progress", percent: true, maxValue: 1 }) : `<div class="analytics-empty">No confirmed grammar history yet for this selection.</div>`, barTitle: "Current grammar certainty buckets", barSvg: buildBarChartSvg(grammarBuckets, { title: "Grammar certainty buckets" }) });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isAnalyticsModalOpen()) {
      closeAnalyticsOverlay();
      return;
    }
    if (isDisclaimerModalOpen() || isTransferModalOpen() || isAnalyticsModalOpen()) return;
    if (!selectedKeys.length) return;
    if (isMorphologyMode()) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigate(-1);
      if (/^[1-4]$/.test(e.key)) {
        const idx = Number(e.key) - 1;
        answerMorphologyChoice(idx);
      }
      return;
    }
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      flipCard();
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") navigate(1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigate(-1);
    if (e.key === "1") markCard("again");
    if (e.key === "2") markCard("pass");
    if (e.key === "3") markCard("easy");
    if (e.key === "k" || e.key === "K") markCard("easy");
    if (e.key === "r" || e.key === "R") markCard("again");
  });
  var GLOBAL_CLICK_HANDLERS = {
    flipCard,
    navigate,
    markCard,
    answerMorphologyChoice,
    revealMorphologyAnswer,
    rateMorphologySelfCheck,
    returnSeenCardToDeck,
    closeAnalyticsOverlay,
    closeTransferModal,
    exportProgressJson,
    handleConsentAction,
    handleTransferPrimaryAction,
    handleTransferSecondaryAction,
    openAnalyticsOverlay,
    resetAllStats,
    resetCurrentDeck,
    reshuffleEligible,
    restoreSpacedUndo,
    setAppProfile,
    setStudyMode,
    setThemeMode,
    showDisclaimerModal,
    toggleDirection,
    toggleMorphSelfCheck,
    toggleRequiredOnly,
    toggleShuffle,
    toggleSpacedRepetition,
    triggerImportProgress
  };
  if (typeof globalThis !== "undefined") Object.assign(globalThis, GLOBAL_CLICK_HANDLERS);
  if (typeof window !== "undefined" && window !== globalThis) Object.assign(window, GLOBAL_CLICK_HANDLERS);
  initializeThemeMode();
  buildSessions();
  buildChapterSelector();
  if (!restoreState()) {
    syncToggleButtons();
  }
  buildSessions();
  buildChapterSelector();
  initializeConsentGate();
  startUsageTracking();
  syncLayoutVisibility();
  renderProgress();
  installTouchSafeTapBridge();
  function preventDoubleTapZoom(el) {
    let lastTouchEnd = 0;
    el.addEventListener("touchend", function(event) {
      const now = (/* @__PURE__ */ new Date()).getTime();
      if (now - lastTouchEnd <= 300) event.preventDefault();
      lastTouchEnd = now;
    }, false);
  }
  ["shuffleToggle", "requiredToggle", "directionToggle", "spacedToggle", "selfCheckToggle", "modeVocabBtn", "modeMorphBtn", "themeSystemBtn", "themeDarkBtn", "themeLightBtn", "profileVocabOnlyBtn", "profileVocabGrammarBtn"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) preventDoubleTapZoom(el);
  });
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" }).then((reg) => {
        try {
          reg.update();
        } catch (_) {
        }
      }).catch(() => {
      });
    });
  }
})();
