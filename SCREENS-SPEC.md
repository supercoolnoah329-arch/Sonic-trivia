# Screen Specification

## 1. Start screen

Purpose: explain the round and begin play.

Required content:

- Game title.
- Short instruction: choose a category and value, then answer one question.
- Scoring reminder: correct answers add points; wrong answers subtract points.
- Start button.

Action: Start initializes a new round and opens the board.

## 2. Game board

Purpose: provide the category-and-value selection surface.

Required content:

- Five visible category columns.
- Four value buttons per category.
- Current score.
- Questions answered counter, shown as `0 / 20` through `20 / 20`.
- A small round status message.

Board behavior:

- Each tile represents one category and difficulty.
- Available tiles are keyboard focusable and clickable.
- Used tiles are disabled and visibly marked as used.
- Selecting a tile opens exactly one question screen.
- No tile may open a question that has already been answered.

## 3. Question screen

Purpose: present exactly one question.

Required content:

- Category name.
- Point value.
- Question prompt.
- Four answer buttons.
- Current score.
- Loop the licensed 16-bit-inspired thinking music after the player has started the game.
- Show a mute/unmute control.
- Board or back navigation must be disabled until an answer is selected.

Answer behavior:

- Disable all answer buttons after the first selection.
- Mark the selected answer correct or incorrect.
- Reveal the correct answer.
- Show the explanation.
- Update the score before showing the next action.
- Fade or stop the thinking music before showing feedback.
- Show a Continue button.

## 4. Correct feedback overlay

Shown after a correct answer.

- Randomly choose Sonic, Tails, Knuckles, Amy, Shadow, Big, Silver, Cream, or Cheese.
- Show the character name.
- Show `+value points`.
- Show a short positive message.
- Use licensed or original character art only.
- Continue returns to the board.

## 5. Wrong feedback overlay

Shown after an incorrect answer.

- Show Eggman's attack event using licensed or original art only.
- Show `-value points`.
- Reveal the correct answer and explanation.
- Use a short, non-threatening joke or taunt.
- Continue returns to the board.

## 6. Final results screen

Shown when 20 questions have been answered or all usable tiles are exhausted.

Required content:

- Final score.
- Total questions answered.
- Correct answer count.
- Wrong answer count.
- Accuracy percentage.
- Play Again button.
- Optional category breakdown.

## Responsive requirements

- Desktop: five-column board with four rows.
- Tablet: columns may scroll horizontally or use a compact grid.
- Mobile: categories remain readable and tiles have touch targets at least 44px high.
- Feedback overlays must fit without covering the score or answer result.
- Respect `prefers-reduced-motion`.
