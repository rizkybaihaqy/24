import { generate24 } from "./24.js";

export const State = {
  secret: generate24(),
  grid: Array(6)
    .fill()
    .map(() => Array(13).fill("")),
  currentRow: 0,
  currentCol: 0,
};

/**
 *
 * @param {State} state
 * @param {string} character
 * @returns {State}
 */
export function addCharacter(state, character) {
  state.grid[state.currentRow][state.currentCol] = character;
  state.currentCol++;

  return state;
}

/**
 *
 * @param {State} state
 * @returns {State}
 */
export function removeNumber(state) {
  state.grid[state.currentRow][state.currentCol - 1] = "";
  state.currentCol--;

  return state;
}

/**
 *
 * @param {State} state
 * @returns {string}
 */
export function getCurrentNums(state) {
  return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);
}
