import { addCharacter, getCurrentExpression, removeCharacter } from "./data.js";
import { revealGrid, updateGrid } from "./dom.js";
import { isExpressionValid, isKeyValid } from "./utils.js";
import { ANIMATION_DURATION } from "./const.js";

/**
 *
 * @param {State} state
 */
function onEnter(state) {
  if (state.currentCol === 11) {
    const expression = getCurrentExpression(state);

    if (!isExpressionValid(expression)) {
      alert("Invalid expression!");
      return;
    }

    revealGrid(state, expression);

    setTimeout(() => {
      if (state.secret === expression) {
        alert("Congratulations!");
      } else if (state.currentRow === 5) {
        alert(`Better luck next time! The expresion was ${state.secret}.`);
      }

      state.currentRow++;
      state.currentCol = 0;
    }, 3 * ANIMATION_DURATION);
  }
}

/**
 * @param {State} state
 */
function onBackspace(state) {
  if (state.currentCol === 0) return;
  updateGrid(removeCharacter(state));
}

/**
 *
 * @param {State} state
 * @param {string} character
 */
function onCharacter(state, character) {
  if (state.currentCol === 11) return;
  updateGrid(addCharacter(state, character));
}

/**
 * @param {State} state
 */
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
      if (isKeyValid(buttonValue)) {
        onCharacter(state, buttonValue);
      }
    });
  }
}

/**
 * @param {State} state
 */
export function registerKeyboardEvents(state) {
  document.body.onkeydown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      onEnter(state);
    }
    if (key === "Backspace") {
      onBackspace(state);
    }
    if (isKeyValid(key)) {
      onCharacter(state, key);
    }
  };
}
