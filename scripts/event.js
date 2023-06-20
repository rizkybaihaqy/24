import { addNumber, getCurrentNums, removeNumber } from "./data";
import { revealGrid, updateGrid } from "./dom";
import { isNumsValid } from "./utils";

function onEnter(state) {
  if (state.currentCol === 4) {
    const nums = getCurrentNums(state);

    if (!isNumsValid(nums)) {
      alert("Not 24!");
      return;
    }

    revealGrid(state, nums);

    setTimeout(() => {
      if (state.secret === nums) {
        alert("Congratulations!");
      } else if (state.currentRow === 5) {
        console.log(state.currentRow);
        alert(`Better luck next time! The numbers was ${state.secret}.`);
      }

      state.currentRow++;
      state.currentCol = 0;
    }, 3 * AnimationDuration);
  }
}

function onBackspace(state) {
  updateGrid(removeNumber(state));
}

function onNumber(state, number) {
  updateGrid(addNumber(state, number));
}

export function registerOnScreenKeyboardEvents(state) {
  const buttons = document.getElementsByClassName("key");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {
      const buttonValue = buttons[i].textContent;

      if (buttonValue === "⏎") {
        onEnter(state);
      }
      if (buttonValue === "⌫") {
        onBackspace(state);
      }
      if (!isNaN(parseInt(buttonValue))) {
        onNumber(state, buttonValue);
      }
    });
  }
}

export function registerKeyboardEvents(state) {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      onEnter(state);
    }
    if (key === "Backspace") {
      onBackspace(state);
    }
    if (isNumber(key)) {
      onNumber(state, key);
    }
  };
}
