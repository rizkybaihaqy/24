import { ANIMATION_DURATION, NUMBER, OPERATOR } from "./const.js";
import {
  getNumOfOccurrencesInExpression,
  getPositionOfOccurrence,
} from "./utils.js";

/**
 *
 * @param {number} row
 * @param {number} col
 * @param {string} content
 * @returns {HTMLDivElement}
 */
function drawBox(row, col, content = "") {
  const box = document.createElement("div");
  box.className = "box";
  box.textContent = content;
  box.id = `box${row}${col}`;

  return box;
}

/**
 *
 * @returns {HTMLDivElement}
 */
export function drawGrid() {
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 11; j++) {
      grid.appendChild(drawBox(i, j));
    }
  }

  return grid;
}

/**
 *
 * @param {string} content
 * @returns {HTMLDivElement}
 */
function drawKey(content) {
  const key = document.createElement("button");
  key.className = "key";
  key.textContent = content;

  return key;
}

/**
 *
 * @returns {HTMLDivElement}
 */
export function drawKeyboard() {
  const keys = [...NUMBER, ...OPERATOR, "⌫", "⏎"];
  const keyboard = document.createElement("div");
  keyboard.className = "board";
  for (let i = 0; i < keys.length; i++) {
    keyboard.appendChild(drawKey(keys[i]));
  }

  return keyboard;
}

/**
 *
 * @param {State} state
 */
export function updateGrid(state) {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

/**
 *
 * @param {State} state
 * @param {string} guess
 */
export function revealGrid(state, guess) {
  const row = state.currentRow;

  for (let i = 0; i < 11; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const character = box.textContent;
    const numOfOccurrencesSecret = getNumOfOccurrencesInExpression(
      state.secret,
      character
    );
    const numOfOccurrencesGuess = getNumOfOccurrencesInExpression(
      guess,
      character
    );
    const numberPosition = getPositionOfOccurrence(guess, character, i);
    setTimeout(() => {
      if (
        numOfOccurrencesGuess > numOfOccurrencesSecret &&
        numberPosition > numOfOccurrencesSecret
      ) {
        box.classList.add("empty");
      } else {
        if (character === state.secret[i]) {
          box.classList.add("right");
        } else if (state.secret.includes(character)) {
          box.classList.add("wrong");
        } else {
          box.classList.add("empty");
        }
      }
    }, ((i + 1) * ANIMATION_DURATION) / 2);

    box.classList.add("animated");
    box.style.animationDelay = `${(i * ANIMATION_DURATION) / 2}ms`;
  }
}
