import { find24Expressions } from "./24.js";

/**
 *
 * @param {string} key
 * @returns {boolean}
 */
export function isNumber(key) {
  return key.length === 1 && key.match(/[1-9]/i);
}

/**
 *
 * @param {string} nums
 * @returns {boolean}
 */
export function isNumsValid(nums) {
  return find24Expressions(Array.from(String(nums), Number)) !== [];
}

/**
 *
 * @param {string} nums
 * @param {string} number
 * @returns {number}
 */
export function getNumOfOccurrencesInWord(nums, number) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === number) {
      result++;
    }
  }
  return result;
}

/**
 *
 * @param {string} nums
 * @param {string} number
 * @param {number} position
 * @returns {number}
 */
export function getPositionOfOccurrence(nums, number, position) {
  let result = 0;
  for (let i = 0; i <= position; i++) {
    if (nums[i] === number) {
      result++;
    }
  }
  return result;
}
