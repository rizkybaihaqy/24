import { NUMBER, OPERATOR } from "./const.js";

/**
 *
 * @param {string} key
 * @returns {boolean}
 */
export function isValidKey(key) {
  return (
    key.length === 1 &&
    key.match(
      new RegExp([...NUMBER, ...OPERATOR.map((char) => "\\" + char)].join("|"))
    )
  );
}

/**
 *
 * @param {string} nums
 * @returns {boolean}
 */
export function isGuessValid(nums) {
  return eval(nums) === 24 && /\(\d{1}\*\d{1}\)\/\(\d{1}\+\d{1}\)/.test(nums);
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
