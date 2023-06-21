import { State } from "./data.js";
import { drawGrid, drawKeyboard } from "./dom.js";
import {
  registerKeyboardEvents,
  registerOnScreenKeyboardEvents,
} from "./event.js";

(function () {
  const game = document.getElementById("game");
  const keyboard = document.getElementById("keyboard");
  game.appendChild(drawGrid());
  keyboard.appendChild(drawKeyboard());

  registerKeyboardEvents(State);
  registerOnScreenKeyboardEvents(State);
  console.log(State);
})();
