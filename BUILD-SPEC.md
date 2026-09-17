# Build Specification

## Required platform rule

The game must remain plain browser code:

- Use HTML, CSS, and standard browser JavaScript only.
- Use no build step: do not add React, TypeScript, a bundler, a compiler, or generated output.
- Do not require Node.js or a package install to play the game.
- Use relative asset and data paths so the repository works from a GitHub Pages project site.
- The published site must run by serving `index.html` directly from the repository root.
- A local preview may use any simple static file server, but it must not transform the files.

GitHub Pages should be able to host the project by serving the repository contents as static files.

## Recommended implementation

Build a small client-side web app using plain HTML, CSS, and JavaScript. The trivia game has no server requirement because the question pool is static and the round state can live in memory.

The app should load the normalized question data, create the board, manage round state, and render the current phase without page reloads.

## Application flow

```text
Start screen
    -> initializeRound()
    -> board screen
    -> select tile
    -> choose answer
    -> calculate score
    -> feedback overlay
    -> board screen
    -> results screen when the round ends
```

## Main modules

- `data.js`: load and normalize `trivia-pool.json`.
- `game-state.js`: create and update round state.
- `selection.js`: build tiles and select unused questions.
- `scoring.js`: calculate points and round statistics.
- `render.js`: render start, board, question, feedback, and results phases.
- `app.js`: wire events and coordinate the modules.
- `styles.css`: layout, colors, typography, animation, responsive rules.

## Build order

1. Create the static app shell and local development command.
2. Load and validate the question JSON.
3. Normalize category and difficulty fields.
4. Implement round state and tile generation.
5. Render the board with five categories and four rows.
6. Implement question selection and answer submission.
7. Implement scoring and used-question protection.
8. Add correct character feedback and wrong Eggman feedback.
9. Add results and Play Again behavior.
10. Add responsive styling, keyboard support, and reduced-motion support.
11. Test the complete round flow.

## Validation requirements

- JSON loading fails with a visible error if the pool is malformed.
- Every rendered tile has at least one unused matching question.
- A question can be answered only once.
- A used tile cannot be selected.
- Correct and wrong scoring are exact.
- The 20-question limit is enforced.
- The results screen always reports consistent totals.
