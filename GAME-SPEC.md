# Sonic Trivia Game Spec

## Game concept

A Sonic fan trivia board inspired by category-and-value quiz shows. The player chooses an available tile from the board, answers one question, then returns to the board until the round ends.

The game uses original styling and terminology rather than copying Jeopardy branding, graphics, or audio.

## Board

- Five categories are shown at once.
- Each category has four selectable question tiles.
- Tile values are `100`, `200`, `300`, and `400` points.
- Values represent difficulty: `100` is easiest and `400` is most obscure.
- A category can be games, TV, comics, lore, development, characters, music, movies, or another Sonic theme.
- The board supports up to 20 answered questions per round.
- A used tile becomes disabled and cannot be selected again.
- A round ends after 20 answered questions or when every available tile is used.

## Question flow

1. The player selects an unused category tile.
2. One question is selected from that category and difficulty.
3. The question screen shows the prompt and four answer choices.
4. The player chooses one answer.
5. The game immediately shows whether the answer was correct and updates the score.
6. A Continue button returns the player to the board.
7. Only one question is active at a time.

## Scoring

- Correct answer: add the tile value.
- Wrong answer: subtract the tile value.
- Scores may fall below zero during a round.
- The score display updates immediately after each answer.
- The final screen shows the total score, questions answered, correct answers, wrong answers, and accuracy.

## Correct answer celebration

After a correct answer, show a short character celebration overlay. Select randomly from:

- Sonic
- Tails
- Knuckles
- Amy
- Shadow
- Big
- Silver
- Cream
- Cheese

The overlay should include the character name, a positive line of feedback, the points earned, and a brief animation. Character art must be original, commissioned, or separately licensed before use.

## Wrong answer event

After a wrong answer, show Eggman attacking the player's score.

- Eggman appears in a short attack animation.
- Show the correct answer after the attack.
- Subtract the tile value from the score.
- Display the points lost prominently.
- Include a humorous but non-threatening line of feedback.

Eggman art and audio must be original, commissioned, or separately licensed before use. The current permissively licensed assets can be used for panels, buttons, and backgrounds, but they are not Sonic character art.

## Data requirements

Each question should eventually have this shape:

```json
{
  "id": "sonic-obscure-036",
  "category": "Games",
  "difficulty": 3,
  "value": 300,
  "question": "Which shield allows Sonic to pass through enemy attacks with perfect timing?",
  "options": ["Flame Shield", "Aqua Shield", "Insta-Shield", "Magnetic Shield"],
  "answer": "Insta-Shield",
  "explanation": "The Insta-Shield briefly extends Sonic's attack range and can help him pass through hazards with precise timing.",
  "source": "https://example.com/source"
}
```

The existing question pool uses text difficulty values and mixed category names. During the build preparation step, migrate each entry to numeric difficulty and normalize categories while preserving the source and original category as needed.

## Required game state

- `score`: current score, starting at zero
- `answeredCount`: number of completed questions
- `correctCount`: number of correct answers
- `usedQuestionIds`: questions already answered this round
- `selectedTile`: current category/value tile
- `currentQuestion`: active question, or null on the board
- `lastResult`: correct or wrong result shown by the feedback overlay
- `celebrationCharacter`: selected only for correct answers
- `roundOver`: whether the final screen should be shown

## Accessibility and interaction

- Use keyboard-focusable category tiles and answer buttons.
- Make the selected question, score change, and correct answer clear without relying only on color.
- Provide visible focus states and readable contrast.
- Respect reduced-motion preferences by shortening or disabling attack and celebration animations.
- Keep the board usable on mobile with a responsive grid and large touch targets.

## Build acceptance criteria

- The board displays categories and four values per category.
- Selecting a tile opens exactly one unused question.
- Correct answers add the tile's value and show a random listed hero character.
- Wrong answers subtract the tile's value and show Eggman's attack event.
- Used tiles cannot be selected again.
- The round stops at 20 answered questions or when no tiles remain.
- The final screen reports the total score and round statistics.
- All character art used by the finished game has documented permission or a compatible license.