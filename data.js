const BOARD_CATEGORIES = ["Games", "Characters", "TV & Movies", "Comics", "Development"];
const DIFFICULTIES = [1, 2, 3, 4, 5];
const VALUES = [100, 200, 300, 400, 500];

const categoryMap = {
  "Classic Games": "Games",
  "Sonic 2": "Games",
  "Sonic CD": "Games",
  "Sonic 3": "Games",
  "Sonic & Knuckles": "Games",
  "Sonic Adventure": "Games",
  "Sonic Adventure 2": "Games",
  "Sonic Heroes": "Games",
  "Sonic Rush": "Games",
  "Sonic Advance": "Games",
  "Sonic Advance 2": "Games",
  "Sonic Advance 3": "Games",
  "Sonic Battle": "Games",
  "Sonic Riders": "Games",
  "Sonic R": "Games",
  "Sonic 3D Blast": "Games",
  "Sonic Spinball": "Games",
  "Sonic Colors": "Games",
  "Sonic Lost World": "Games",
  "Sonic Generations": "Games",
  "Sonic Mania": "Games",
  "Sonic Frontiers": "Games",
  "Sonic Unleashed": "Games",
  "Sonic 06": "Games",
  "Characters": "Characters",
  "Shadow": "Characters",
  "Silver": "Characters",
  "Blaze": "Characters",
  "Rouge": "Characters",
  "Chao": "Characters",
  "Dr. Robotnik": "Characters",
  "Sonic X": "TV & Movies",
  "Sonic Prime": "TV & Movies",
  "Sonic Movie": "TV & Movies",
  "Sonic Comics": "Comics",
  "Sonic Development": "Development",
  "Game History": "Development",
  "Sonic Music": "Development"
};

function normalizeDifficulty(difficulty) {
  if (typeof difficulty === "number") return Math.min(5, Math.max(1, difficulty));
  if (difficulty === "easy") return 1;
  if (difficulty === "medium") return 3;
  return 5;
}

function normalizeQuestion(question) {
  const difficulty = normalizeDifficulty(question.difficulty);
  return {
    id: question.id,
    category: categoryMap[question.category] || "Development",
    originalCategory: question.category,
    difficulty,
    value: difficulty * 100,
    prompt: question.prompt || question.question,
    options: question.options,
    answer: question.answer,
    explanation: question.explanation || "A well-earned Sonic fact.",
    source: question.source
  };
}

export async function loadQuestions() {
  const response = await fetch("trivia-pool.json");
  if (!response.ok) throw new Error("Question pool could not be loaded.");
  const payload = await response.json();
  const questions = payload.questions.map(normalizeQuestion);
  const ids = new Set();
  for (const question of questions) {
    if (!question.id || ids.has(question.id) || question.options.length !== 4 || !question.options.includes(question.answer)) {
      throw new Error(`Invalid question data near ${question.id || "an unknown question"}.`);
    }
    ids.add(question.id);
  }
  return questions;
}

export { BOARD_CATEGORIES, DIFFICULTIES, VALUES };