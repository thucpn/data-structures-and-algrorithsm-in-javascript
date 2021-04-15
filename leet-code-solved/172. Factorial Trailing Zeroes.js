/**
 * https://leetcode.com/problems/factorial-trailing-zeroes/
 *
 * @param {number} n
 * @return {number}
 *
 * Time: O(logn)
 * Space: O(1)
 */
var trailingZeroes = function (n) {
  if (n === 0) return 0;

  let k = 1;
  let result = 0;

  while (n >= 5 ** k) {
    result += Math.floor(n / 5 ** k);
    if (result) k++;
  }

  return result;
};