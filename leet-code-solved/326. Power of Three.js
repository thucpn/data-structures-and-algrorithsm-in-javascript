/**
 * https://leetcode.com/problems/power-of-three/
 *
 * @param {number} n
 * @return {boolean}
 *
 * Time: O(logn)
 * Space: O(1)
 */
var isPowerOfThree = function (n) {
  if (n < 1) return false;

  while (n > 1) {
    if (n % 3 !== 0) return false;
    n /= 3;
  }

  return true;
};
