# Question Data Specification

## Source file

The source question pool is `trivia-pool.json` at the project root.

## Runtime question shape

The build should normalize every source question into this shape before the game starts:

```ts
type Question = {
  id: string;
  category: string;
  originalCategory?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  value: 100 | 200 | 300 | 400 | 500;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
  source: string;
};
```

## Rules

- `id` must be unique.
- `category` must match a visible board category.
- `difficulty` is numeric from 1 to 5.
- `value` is calculated from difficulty: `1 -> 100`, `2 -> 200`, `3 -> 300`, `4 -> 400`, `5 -> 500`.
- `options` must contain exactly four unique strings.
- `answer` must exactly match one option.
- `prompt`, `answer`, and `explanation` must be non-empty.
- `source` must be a valid web URL.
- Questions already answered in the current round must not be selected again.

## Category normalization

Normalize source categories into the board categories below. Preserve the original value in `originalCategory` when it is changed.

| Board category | Example source categories |
| --- | --- |
| Games | Classic Games, Sonic 2, Sonic CD, Sonic Adventure, Sonic Mania |
| Characters | Characters, Shadow, Silver, Blaze, Rouge, Chao |
| TV & Movies | Sonic X, Sonic Prime, Sonic Movie |
| Comics | Sonic Comics |
| Lore | Sonic Frontiers, Sonic Unleashed, story questions |
| Development | Sonic Development, Game History |
| Music | Sonic Music |

## Difficulty migration

Existing text difficulty values are migrated as follows:

- `easy` becomes `1`.
- `medium` becomes `3`.
- `hard` becomes `5`.
- New questions may use `2` or `4` for in-between difficulty.

The board may use all five values, but it must never show a tile whose normalized question pool is empty.

## Selection algorithm

```ts
function selectQuestion(
  questions: Question[],
  category: string,
  difficulty: number,
  usedIds: Set<string>
): Question {
  const candidates = questions.filter(
    question =>
      question.category === category &&
      question.difficulty === difficulty &&
      !usedIds.has(question.id)
  );

  if (candidates.length === 0) {
    throw new Error("No unused question is available for this tile.");
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}
```
