import { generate24, judgePoint24 } from "./24.js";

const state = {
  secret: generate24().join(""),
  grid: Array(6)
    .fill()
    .map(() => Array(4).fill("")),
  currentRow: 0,
  currentCol: 0,
};

function drawGrid(container) {
  const grid = document.createElement("div");
  grid.className = "grid";

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      drawBox(grid, i, j);
    }
  }

  container.appendChild(grid);
}

function updateGrid() {
  for (let i = 0; i < state.grid.length; i++) {
    for (let j = 0; j < state.grid[i].length; j++) {
      const box = document.getElementById(`box${i}${j}`);
      box.textContent = state.grid[i][j];
    }
  }
}

function drawBox(container, row, col, letter = "") {
  const box = document.createElement("div");
  box.className = "box";
  box.textContent = letter;
  box.id = `box${row}${col}`;

  container.appendChild(box);
  return box;
}

function registerKeyboardEvents() {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      onEnter();
    }
    if (key === "Backspace") {
      onBackspace();
    }
    if (isNumber(key)) {
      onNumber(key);
    }
  };

  const buttons = document.getElementsByClassName("key");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      const buttonValue = buttons[i].textContent;

      if (buttonValue === "⏎") {
        onEnter();
      }
      if (buttonValue === "⌫") {
        onBackspace();
      }
      if (!isNaN(parseInt(buttonValue))) {
        onNumber(buttonValue);
      }
    });
  }
}

function onEnter() {
  if (state.currentCol === 4) {
    const nums = getCurrentNums();
    if (isNumsValid(nums)) {
      revealNums(nums);
      state.currentRow++;
      state.currentCol = 0;
    } else {
      alert("Not 24!");
    }
  }
  updateGrid();
}

function onBackspace() {
  removeNumber();
  updateGrid();
}

function onNumber(number) {
  addNumber(number);
  updateGrid();
}

function getCurrentNums() {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}

function isNumsValid(nums) {
  return judgePoint24(nums);
}

function getNumOfOccurrencesInWord(nums, number) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === number) {
      result++;
    }
  }
  return result;
}

function getPositionOfOccurrence(nums, number, position) {
  let result = 0;
  for (let i = 0; i <= position; i++) {
    if (nums[i] === number) {
      result++;
    }
  }
  return result;
}

function revealNums(guess) {
  const row = state.currentRow;
  const animation_duration = 500; // ms

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
    }, ((i + 1) * animation_duration) / 2);

    box.classList.add("animated");
    box.style.animationDelay = `${(i * animation_duration) / 2}ms`;
  }

  const isWinner = state.secret === guess;
  const isGameOver = state.currentRow === 5;

  setTimeout(() => {
    if (isWinner) {
      alert("Congratulations!");
    } else if (isGameOver) {
      alert(`Better luck next time! The numbers was ${state.secret}.`);
    }
  }, 3 * animation_duration);
}

function isNumber(key) {
  return key.length === 1 && key.match(/[1-9]/i);
}

function addNumber(number) {
  if (state.currentCol === 4) return;
  state.grid[state.currentRow][state.currentCol] = number;
  state.currentCol++;
}

function removeNumber() {
  if (state.currentCol === 0) return;
  state.grid[state.currentRow][state.currentCol - 1] = "";
  state.currentCol--;
}

(function () {
  const game = document.getElementById("game");
  drawGrid(game);

  registerKeyboardEvents();
})();
