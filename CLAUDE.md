# Repository notes for Claude

## Navigation

- **`index.html` structure:** see `docs/index-structure.md` before scanning
  the file. It maps the in-flow `.app` shell, the overlay siblings, and the
  script groups by line range and `id`.

## Maintenance rules

- **Keep `docs/index-structure.md` in sync.** If you edit `index.html` and
  any of the following change, update the doc in the same commit:
  - a section in `.app` is added, removed, reordered, or renamed
  - an overlay (`consent-overlay`) is added or removed
  - an `id` referenced by JS is added, removed, or renamed
  - the script load order / grouping changes
  - the `?v=NNN` cache-bust scheme changes
- Line numbers in the doc are approximate — don't chase a few lines of drift,
  but do refresh them when a section moves significantly.

## Cache-bust

Every asset URL in `index.html` ends in `?v=NNN`. The same number lives in
`sw.js` (`CACHE_NAME` + precache list). Bump both together on release.

## Changelog

The user guide's inline changelog (`#shortcutsOverlay` in `index.html`) is a
short, high-level summary for users — **not** a per-commit or per-day log:

- Keep it to a handful (~1–5) of **major release notes**, grouped by theme/era,
  newest first. Don't add a new entry per change or per day — fold edits into
  the most relevant existing entry (and re-consolidate if it's growing too fine).
- Bullets are **short and skimmable**: headline features only. Skip minor
  changes, bug fixes, and internal refactors.
- Only the newest entry carries the `open` attribute.
