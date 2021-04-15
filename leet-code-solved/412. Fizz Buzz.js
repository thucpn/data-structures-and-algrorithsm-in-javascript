/**
 *
 * https://leetcode.com/problems/fizz-buzz/
 *
 * @param {number} n
 * @return {string[]}
 *
 * Time: O(n)
 * Space: O(1)
 */
var fizzBuzz = function (n) {
  const result = [];

  for (let index = 1; index <= n; index++) {
    if (index % 15 === 0) result.push('FizzBuzz');
    else if (index % 5 === 0) result.push('Buzz');
    else if (index % 3 === 0) result.push('Fizz');
    else result.push(index + '');
  }

  return result;
};
