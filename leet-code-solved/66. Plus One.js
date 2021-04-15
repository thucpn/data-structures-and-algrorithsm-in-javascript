/**
 * https://leetcode.com/problems/plus-one/
 *
 * @param {number[]} digits
 * @return {number[]}
 *
 * Time: O(n)
 * Space: O(1)
 */
var plusOne = function (digits) {
  let count = 1;
  while (true) {
    digits[digits.length - count] += 1;

    if (digits[digits.length - count] === 10) {
      digits[digits.length - count] = 0;

      if (count !== digits.length) {
        count++;
      } else {
        digits.unshift(1);
        break;
      }
    } else {
      break;
    }
  }
  return digits;
};
