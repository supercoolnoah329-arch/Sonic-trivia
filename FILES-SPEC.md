# Required Files Specification

## Current source and documentation

| File | Purpose |
| --- | --- |
| `trivia-pool.json` | Sourced question pool. |
| `GAME-SPEC.md` | High-level product and gameplay rules. |
| `QUESTION-DATA-SPEC.md` | Question schema, migration, and selection rules. |
| `SCREENS-SPEC.md` | Screen content and interaction behavior. |
| `SCORING-SPEC.md` | Round state, scoring, and end conditions. |
| `BUILD-SPEC.md` | Architecture and implementation order. |
| `FILES-SPEC.md` | Project file contract. |
| `assets/README.md` | Art licenses and attribution records. |
| `AUDIO-SPEC.md` | Question music behavior and licensing requirements. |
| `assets/` | Permissively licensed UI and platformer art previews. |

## Files needed for the first playable build

The first build must contain only directly browser-runnable HTML, CSS, JavaScript, JSON, and static assets. No generated `dist/` folder or dependency directory is required.

```text
Sonic-trivia/
  index.html
  styles.css
  app.js
  data.js
  game-state.js
  selection.js
  scoring.js
  render.js
  trivia-pool.json
  assets/
    README.md
    ORIGINAL-MASCOTS.md
    original-raccoon.png
    original-score-raider.png
    audio/
      thinking-loop.ogg
    kenney-ui-pack-preview.png
    kenney-ui-pack-sample.png
    platformer-tileset-preview.png
```

## Optional later files

```text
  package.json
  README.md
  assets/characters/
  assets/audio/
  tests/game-state.test.js
  tests/scoring.test.js
  tests/question-data.test.js
```

Character images for the hero celebration and Eggman attack are intentionally not included yet. Add them only after their permission or license is documented in `assets/README.md`.
