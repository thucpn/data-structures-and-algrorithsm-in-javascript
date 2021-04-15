/**
 * https://leetcode.com/problems/climbing-stairs/
 *
 * @param {number} n
 * @return {number}
 *
 * Time: O(n^2)
 * Space: O(1)
 */
var climbStairs = function (n) {
  const factorial = (n) => {
    let fac = 1;
    let count = 1;
    while (count <= n) {
      fac *= count;
      count++;
    }
    return fac;
  };

  // hoan vi lap
  const HVL = (a, b) => factorial(a + b) / factorial(a) / factorial(b);

  let result = 0;
  let a = n;
  let b = 0;

  while (a >= 0) {
    result += HVL(a, b);
    b++;
    a = n - 2 * b;
  }

  return result;
};