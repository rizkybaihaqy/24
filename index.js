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
    }
    if (key === "Backspace") {
      removeNumber();
    }
    if (isNumber(key)) {
      addNumber(key);
    }

    updateGrid();
  };
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

function generate24() {
  const candidates = Array.from({ length: 4 }, () =>
    Math.floor(1 + Math.random() * 9)
  );
  if (judgePoint24(candidates)) {
    return candidates;
  } else {
    return generate24();
  }
}

function judgePoint24(nums) {
  function generate(a, b) {
    return [
      a * b,
      b === 0 ? Infinity : a / b,
      a === 0 ? Infinity : b / a,
      a + b,
      a - b,
      b - a,
    ];
  }

  function dfs(nums) {
    if (nums.length === 1) {
      return Math.abs(nums[0] - 24.0) < 0.001;
    }

    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        const generated = generate(nums[i], nums[j]);
        for (const num of generated) {
          const nextRound = [num];
          for (let k = 0; k < nums.length; k++) {
            if (k === i || k === j) {
              continue;
            }
            nextRound.push(nums[k]);
          }
          if (dfs(nextRound)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  return dfs(nums);
}
