import { loadQuestions } from "./data.js";
import { createRound, resetRound } from "./game-state.js";
import { pickQuestion } from "./selection.js";
import { submitAnswer } from "./scoring.js";
import { renderBoard, renderFeedback, renderQuestion, renderResults, renderStart } from "./render.js";

const root = document.querySelector("#app");
const state = createRound();
let questions = [];
let musicEnabled = true;

function render() {
  if (state.phase === "start") renderStart(root);
  if (state.phase === "board") renderBoard(root, state, questions);
  if (state.phase === "question") renderQuestion(root, state);
  if (state.phase === "feedback") renderFeedback(root, state);
  if (state.phase === "results") renderResults(root, state);
}

function chooseTile(category, difficulty) {
  const question = pickQuestion(questions, category, difficulty, state.usedQuestionIds);
  if (!question) return;
  state.selectedTile = { category, difficulty, value: difficulty * 100 };
  state.currentQuestion = question;
  state.submitted = false;
  state.phase = "question";
  render();
}

function handleAction(action, target) {
  if (action === "start") {
    state.phase = "board";
    render();
  }
  if (action === "restart") {
    resetRound(state);
    state.phase = "board";
    render();
  }
  if (action === "continue") {
    const noTilesLeft = state.answeredCount >= 20 || questions.every(question => state.usedQuestionIds.has(question.id));
    state.phase = noTilesLeft ? "results" : "board";
    state.currentQuestion = null;
    state.selectedTile = null;
    render();
  }
  if (action === "sound") {
    musicEnabled = !musicEnabled;
    target.querySelector("span").textContent = musicEnabled ? "Music on" : "Music off";
  }
}

root.addEventListener("click", event => {
  const actionTarget = event.target.closest("[data-action]");
  if (actionTarget) handleAction(actionTarget.dataset.action, actionTarget);
  const tile = event.target.closest("[data-category]");
  if (tile && !tile.disabled) chooseTile(tile.dataset.category, Number(tile.dataset.difficulty));
  const answer = event.target.closest("[data-option]");
  if (answer && state.phase === "question") {
    submitAnswer(state, decodeURIComponent(answer.dataset.option));
    render();
  }
});

loadQuestions().then(loadedQuestions => {
  questions = loadedQuestions;
  render();
}).catch(error => {
  root.innerHTML = `<section class="error-screen"><p class="eyebrow">DATA ERROR</p><h1>Question pool offline.</h1><p>${error.message}</p><p>Serve this folder from a local static server or open it through GitHub Pages.</p></section>`;
});