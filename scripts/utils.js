import { judgePoint24 } from "./24.js";

export function isNumber(key) {
  return key.length === 1 && key.match(/[1-9]/i);
}

export function isNumsValid(nums) {
  return judgePoint24(nums);
}

export function getNumOfOccurrencesInWord(nums, number) {
  let result = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === number) {
      result++;
    }
  }
  return result;
}

export function getPositionOfOccurrence(nums, number, position) {
  let result = 0;
  for (let i = 0; i <= position; i++) {
    if (nums[i] === number) {
      result++;
    }
  }
  return result;
}
