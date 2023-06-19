export function generate24() {
  const candidates = Array.from({ length: 4 }, () =>
    Math.floor(1 + Math.random() * 9)
  );
  if (judgePoint24(candidates)) {
    return candidates;
  } else {
    return generate24();
  }
}

export function judgePoint24(nums) {
  function generate(a, b) {
    return [
      a * b,
      b === 0 ? Infinity : a / b,
      a === 0 ? Infinity : b / a,
      a + b,
      a - b,
      b - a,
    ];
  }

  function dfs(nums) {
    if (nums.length === 1) {
      return Math.abs(nums[0] - 24.0) < 0.001;
    }

    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        const generated = generate(nums[i], nums[j]);
        for (const num of generated) {
          const nextRound = [num];
          for (let k = 0; k < nums.length; k++) {
            if (k === i || k === j) {
              continue;
            }
            nextRound.push(nums[k]);
          }
          if (dfs(nextRound)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  return dfs(nums);
}
