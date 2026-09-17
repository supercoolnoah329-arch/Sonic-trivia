# Scoring and Game State Specification

## Round state

```ts
type RoundState = {
  score: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  usedQuestionIds: Set<string>;
  currentQuestion: Question | null;
  selectedTile: Tile | null;
  phase: "start" | "board" | "question" | "feedback" | "results";
  lastResult: "correct" | "wrong" | null;
  celebrationCharacter: CharacterName | null;
};

type Tile = {
  category: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  value: 100 | 200 | 300 | 400 | 500;
  used: boolean;
};

type CharacterName =
  | "Sonic"
  | "Tails"
  | "Knuckles"
  | "Amy"
  | "Shadow"
  | "Big"
  | "Silver"
  | "Cream"
  | "Cheese";
```

## Scoring rules

For a tile with value `V`:

- Correct answer: `score = score + V`.
- Wrong answer: `score = score - V`.
- There is no lower score limit.
- The score is updated once per submitted answer.
- Double clicks or repeated submissions must not score twice.

```ts
function scoreAnswer(score: number, value: number, isCorrect: boolean): number {
  return isCorrect ? score + value : score - value;
}
```

## Answer transition

1. Confirm a question and tile are active.
2. Ignore submission if the question is already answered.
3. Compare the selected option with `question.answer`.
4. Add the question ID to `usedQuestionIds`.
5. Mark the selected tile used.
6. Update `score`, `answeredCount`, `correctCount`, or `wrongCount`.
7. Select a celebration character only when correct.
8. Set `phase` to `feedback`.
9. Continue returns to `board`, unless the round is over.

## End conditions

The round ends when either condition is true:

```ts
const roundIsOver =
  state.answeredCount >= 20 || availableTileCount === 0;
```

The results screen must appear after the last feedback event, not before the player sees the outcome.

## Accuracy

```ts
const accuracy = state.answeredCount === 0
  ? 0
  : Math.round((state.correctCount / state.answeredCount) * 100);
```

## Reset behavior

Play Again must create a fresh round:

- score: `0`
- answeredCount: `0`
- correctCount: `0`
- wrongCount: `0`
- usedQuestionIds: empty set
- all tiles: unused
- phase: `board` or `start`, depending on product choice
