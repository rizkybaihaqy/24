import { generate24 } from "./24.js";

export const State = {
  secret: generate24().join(""),
  grid: Array(6)
    .fill()
    .map(() => Array(4).fill("")),
  currentRow: 0,
  currentCol: 0,
};

/**
 *
 * @param {State} state
 * @param {string} number
 * @returns {State}
 */
export function addNumber(state, number) {
  if (state.currentCol === 4) return;
  state.grid[state.currentRow][state.currentCol] = number;
  state.currentCol++;

  return state;
}

/**
 *
 * @param {State} state
 * @returns {State}
 */
export function removeNumber(state) {
  if (state.currentCol === 0) return;
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
