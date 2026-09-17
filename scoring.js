export const HEROES = ["Sonic", "Tails", "Knuckles", "Amy", "Shadow", "Big", "Silver", "Cream", "Cheese"];

export function scoreAnswer(score, value, isCorrect) {
  return isCorrect ? score + value : score - value;
}

export function submitAnswer(state, option) {
  if (!state.currentQuestion || state.submitted) return null;
  const question = state.currentQuestion;
  const value = state.selectedTile.value;
  const isCorrect = option === question.answer;
  const tileKey = `${state.selectedTile.category}:${state.selectedTile.difficulty}`;
  state.submitted = true;
  state.usedQuestionIds.add(question.id);
  state.score = scoreAnswer(state.score, value, isCorrect);
  state.answeredCount += 1;
  state.correctCount += isCorrect ? 1 : 0;
  state.wrongCount += isCorrect ? 0 : 1;
  state.lastResult = isCorrect ? "correct" : "wrong";
  state.tileResults[tileKey] = isCorrect ? "correct" : "wrong";
  state.celebrationCharacter = isCorrect ? HEROES[Math.floor(Math.random() * HEROES.length)] : null;
  state.feedback = { selected: option, correctAnswer: question.answer };
  state.phase = "feedback";
  return isCorrect;
}

export function accuracy(state) {
  return state.answeredCount ? Math.round((state.correctCount / state.answeredCount) * 100) : 0;
}