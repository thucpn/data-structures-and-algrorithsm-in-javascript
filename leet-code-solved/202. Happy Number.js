/**
 * https://leetcode.com/problems/happy-number/
 *
 * @param {number} n
 * @return {boolean}
 *
 * Time: O(1)
 * Space: O(n)
 */
var isHappy = function (n) {
  const sumQuadratic = (n) => [...(n + '')].reduce((acc, cur, index) => acc + cur ** 2, 0);

  const cache = {};

  while (true) {
    if (cache[n]) return false;

    const newSum = sumQuadratic(n);
    if (newSum === 1) return true;

    cache[n] = newSum;
    n = newSum;
  }
};
