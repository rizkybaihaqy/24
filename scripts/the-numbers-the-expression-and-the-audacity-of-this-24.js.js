import { find24Expressions } from "./24.js";

/**
 *
 * @returns {number[]}
 */
export function theNumbersTheExpressionAndTheAudacityOfThis24() {
  const nums = Array.from({ length: 4 }, () =>
    Math.floor(1 + Math.random() * 9)
  );
  const candidates = find24Expressions(nums);
  if (candidates.length > 0) {
    return [
      nums,
      candidates[Math.floor(Math.random() * candidates.length)].slice(1, -1),
    ];
  } else {
    return theNumbersTheExpressionAndTheAudacityOfThis24();
  }
}
