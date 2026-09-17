import { BOARD_CATEGORIES, DIFFICULTIES, VALUES } from "./data.js";
import { accuracy } from "./scoring.js";
import { tileHasQuestion } from "./selection.js";

const heroColors = { Sonic: "#1d7df2", Tails: "#f0a72e", Knuckles: "#e94b4b", Amy: "#e66aa8", Shadow: "#392f4f", Big: "#7e9fbb", Silver: "#93c6dc", Cream: "#f3c992", Cheese: "#e8bd35" };

function shell(content) {
  return `<div class="noise"></div><div class="topbar"><span class="brand-mark">ST</span><span class="brand-name">SONIC TRIVIA SPRINT</span><span class="topbar-note">FAN-MADE QUIZ BOARD</span></div><section class="page-content">${content}</section>`;
}

function header(state) {
  return `<header class="game-header"><div><p class="eyebrow">ZONE KNOWLEDGE RUN</p><h1>Choose your challenge.</h1></div><div class="score-panel"><span>SCORE</span><strong>${state.score}</strong><small>${state.answeredCount} / 20 ANSWERED</small></div></header>`;
}

export function renderStart(root) {
  root.innerHTML = shell(`<section class="start-layout"><div class="start-copy"><p class="eyebrow">A FAN-MADE SONIC TRIVIA BOARD</p><h1>How much do you know about the blue blur?</h1><p class="lead">Pick a category and point value. Nail it to sprint ahead. Miss it and Eggman raids your score.</p><button class="primary-button" data-action="start">START THE RUN <span>→</span></button></div><div class="start-art" aria-hidden="true"><div class="sun-disc"></div><div class="ring ring-one">O</div><div class="ring ring-two">O</div><div class="checker-field"></div><div class="speed-card"><span>+500</span><small>OBSCURE MODE</small></div></div></section>`);
}

export function renderBoard(root, state, questions) {
  const columns = BOARD_CATEGORIES.map(category => `<div class="category-column"><h2>${category}</h2>${DIFFICULTIES.map((difficulty, index) => {
    const result = state.tileResults[`${category}:${difficulty}`];
    const available = !result && tileHasQuestion(questions, category, difficulty, state.usedQuestionIds);
    const used = Boolean(result) || !available;
    return `<button class="value-tile${available ? "" : " is-used"}${result ? ` result-${result}` : ""}" data-category="${category}" data-difficulty="${difficulty}" ${available ? "" : "disabled"} aria-label="${category}, ${VALUES[index]} points${result ? `, ${result}` : ""}"><span>${used ? (result === "correct" ? "+ POINT" : "- POINT") : `+${VALUES[index]}`}</span><small>${used ? (result === "correct" ? "CLEARED RIGHT" : "CLEARED WRONG") : ["WARM-UP", "CRUISE", "TURBO", "EXPERT", "OBSCURE"][index]}</small></button>`;
  }).join("")}</div>`).join("");
  root.innerHTML = shell(`${header(state)}<div class="board-intro"><span>SELECT A TILE TO DEPLOY A QUESTION</span><span>RIGHT: + POINTS &nbsp; WRONG: - POINTS</span></div><section class="board" aria-label="Trivia categories">${columns}</section><p class="board-foot">Every tile hides one question. Clear the board or reach 20 answers to see your final run.</p>`);
}

export function renderQuestion(root, state) {
  const question = state.currentQuestion;
  root.innerHTML = shell(`${header(state)}<section class="question-layout"><div class="question-meta"><span>${question.category}</span><strong>+${state.selectedTile.value}</strong><button class="sound-toggle" data-action="sound" aria-label="Toggle question music">♪ <span>Music on</span></button></div><article class="question-card"><p class="eyebrow">QUESTION ${state.answeredCount + 1}</p><h2>${question.prompt}</h2><div class="answers">${question.options.map((option, index) => `<button class="answer-button" data-option="${encodeURIComponent(option)}"><span>${String.fromCharCode(65 + index)}</span>${option}</button>`).join("")}</div></article></section>`);
}

export function renderFeedback(root, state) {
  const question = state.currentQuestion;
  const correct = state.lastResult === "correct";
  const character = correct ? "Green raccoon mechanic" : "Original score raider";
  const color = correct ? "#3eae69" : "#d33b32";
  const title = correct ? "NICE RUN!" : "SCORE RAID!";
  const message = correct ? `${character} approves. Keep the streak alive.` : "The score raider hacked your meter. The correct answer was:";
  const mascot = correct ? "original-raccoon.png" : "original-score-raider.png";
  const mascotName = correct ? "Original green raccoon mechanic" : "Original score raider";
  root.innerHTML = shell(`${header(state)}<section class="feedback-layout"><div class="character-burst ${correct ? "is-correct" : "is-wrong"}" style="--character-color:${color}"><img class="mascot-image" src="assets/${mascot}" alt="${mascotName}"><p class="eyebrow">${correct ? "MECHANIC BOOST" : "SCORE RAID"}</p><h1>${title}</h1><strong>${correct ? `+${state.selectedTile.value}` : `-${state.selectedTile.value}`} POINTS</strong></div><article class="feedback-card"><p class="feedback-message">${message}</p><h2>${correct ? question.explanation : question.answer}</h2><p class="explanation">${question.explanation}</p><button class="primary-button" data-action="continue">${state.answeredCount >= 20 ? "SEE RESULTS" : "RETURN TO BOARD"} <span>→</span></button></article></section>`);
}

export function renderResults(root, state) {
  root.innerHTML = shell(`<section class="results-layout"><p class="eyebrow">RUN COMPLETE</p><h1>Final score</h1><div class="final-score">${state.score}</div><div class="stats-grid"><div><strong>${state.answeredCount}</strong><span>QUESTIONS</span></div><div><strong>${state.correctCount}</strong><span>CORRECT</span></div><div><strong>${state.wrongCount}</strong><span>WRONG</span></div><div><strong>${accuracy(state)}%</strong><span>ACCURACY</span></div></div><p class="lead">The board is cleared. Ready to make another run?</p><button class="primary-button" data-action="restart">PLAY AGAIN <span>↻</span></button></section>`);
}