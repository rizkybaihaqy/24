import { NUMBER, OPERATOR } from "./const.js";

/**
 *
 * @param {string} key
 * @returns {boolean}
 */
export function isKeyValid(key) {
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
export function isExpressionValid(nums) {
  return eval(nums) === 24 && /\(\d{1}\*\d{1}\)\/\(\d{1}\+\d{1}\)/.test(nums);
}

/**
 *
 * @param {string} expression
 * @param {string} character
 * @returns {number}
 */
export function getNumOfOccurrencesInExpression(expression, character) {
  let result = 0;
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === character) {
      result++;
    }
  }
  return result;
}

/**
 *
 * @param {string} expression
 * @param {string} character
 * @param {number} position
 * @returns {number}
 */
export function getPositionOfOccurrence(expression, character, position) {
  let result = 0;
  for (let i = 0; i <= position; i++) {
    if (expression[i] === character) {
      result++;
    }
  }
  return result;
}
