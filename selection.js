export function getCandidates(questions, category, difficulty, usedIds) {
  const unused = questions.filter(question => question.category === category && !usedIds.has(question.id));
  const exact = unused.filter(question => question.difficulty === difficulty);
  if (exact.length) return exact;
  return unused.sort((a, b) => Math.abs(a.difficulty - difficulty) - Math.abs(b.difficulty - difficulty));
}

export function pickQuestion(questions, category, difficulty, usedIds) {
  const candidates = getCandidates(questions, category, difficulty, usedIds);
  if (!candidates.length) return null;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function tileHasQuestion(questions, category, difficulty, usedIds) {
  return getCandidates(questions, category, difficulty, usedIds).length > 0;
}