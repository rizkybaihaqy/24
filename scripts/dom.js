import { AnimationDuration } from "./const.js";
import { getNumOfOccurrencesInWord, getPositionOfOccurrence } from "./utils.js";

function drawBox(row, col, content = "") {
  const box = document.createElement("div");
  box.className = "box";
  box.textContent = content;
  box.id = `box${row}${col}`;

  return box;
}

export function drawGrid() {
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      grid.appendChild(drawBox(i, j));
    }
  }

  return grid;
}

export function updateGrid(state) {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

export function revealGrid(state, guess) {
  const row = state.currentRow;

  for (let i = 0; i < 4; i++) {
    const box = document.getElementById(`box${row}${i}`);
    const number = box.textContent;
    const numOfOccurrencesSecret = getNumOfOccurrencesInWord(
      state.secret,
      number
    );
    const numOfOccurrencesGuess = getNumOfOccurrencesInWord(guess, number);
    const numberPosition = getPositionOfOccurrence(guess, number, i);

    setTimeout(() => {
      if (
        numOfOccurrencesGuess > numOfOccurrencesSecret &&
        numberPosition > numOfOccurrencesSecret
      ) {
        box.classList.add("empty");
      } else {
        if (number === state.secret[i]) {
          box.classList.add("right");
        } else if (state.secret.includes(number)) {
          box.classList.add("wrong");
        } else {
          box.classList.add("empty");
        }
      }
    }, ((i + 1) * AnimationDuration) / 2);

    box.classList.add("animated");
    box.style.animationDelay = `${(i * AnimationDuration) / 2}ms`;
  }
}
