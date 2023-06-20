import { STATE } from "./data.js";
import { drawGrid } from "./dom.js";
import {
  registerKeyboardEvents,
  registerOnScreenKeyboardEvents,
} from "./event.js";

(function () {
  const game = document.getElementById("game");
  game.appendChild(drawGrid());

  registerKeyboardEvents(STATE);
  registerOnScreenKeyboardEvents(STATE);
})();
