export function createRound() {
  return {
    score: 0,
    answeredCount: 0,
    correctCount: 0,
    wrongCount: 0,
    usedQuestionIds: new Set(),
    currentQuestion: null,
    selectedTile: null,
    tileResults: {},
    phase: "start",
    lastResult: null,
    celebrationCharacter: null,
    submitted: false,
    feedback: null
  };
}

export function resetRound(state) {
  Object.assign(state, createRound());
}