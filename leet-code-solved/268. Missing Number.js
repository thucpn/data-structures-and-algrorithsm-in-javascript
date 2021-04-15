/**
 * https://leetcode.com/problems/missing-number/
 *
 * @param {number[]} nums
 * @return {number}
 *
 * Time: O(n)
 * Space: O(1)
 */
var missingNumber = function (nums) {
  const sum = nums.reduce((acc, cur) => acc + cur, 0);
  const properSum = (nums.length * (nums.length + 1)) / 2;
  return properSum - sum;
};
