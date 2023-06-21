/**
 *
 * @param {number[]} nums
 * @returns {string[]}
 */
export function find24Expressions(nums) {
  function generateExpression(a, b) {
    return [
      { expr: `(${a.expr}*${b.expr})`, value: a.value * b.value },
      { expr: `(${a.expr}/${b.expr})`, value: a.value / b.value },
      { expr: `(${b.expr}/${a.expr})`, value: b.value / a.value },
      { expr: `(${a.expr}+${b.expr})`, value: a.value + b.value },
      { expr: `(${a.expr}-${b.expr})`, value: a.value - b.value },
      { expr: `(${b.expr}-${a.expr})`, value: b.value - a.value },
    ];
  }

  function exploreExpressions(nums) {
    if (nums.length === 1) {
      if (Math.abs(nums[0].value - 24.0) < 0.001) {
        return [nums[0].expr];
      }
      return [];
    }

    const validExpressions = [];

    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        const generated = generateExpression(nums[i], nums[j]);
        for (const result of generated) {
          const nextRound = [{ expr: result.expr, value: result.value }];
          for (let k = 0; k < nums.length; k++) {
            if (k === i || k === j) {
              continue;
            }
            nextRound.push(nums[k]);
          }
          const expressions = exploreExpressions(nextRound);
          for (const expression of expressions) {
            validExpressions.push(expression);
          }
        }
      }
    }

    return validExpressions;
  }

  return exploreExpressions(
    nums.map((num) => ({ expr: num.toString(), value: num }))
  );
}
