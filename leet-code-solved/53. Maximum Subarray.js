/**
 * https://leetcode.com/problems/maximum-subarray/
 *
 * @param {number[]} nums
 * @return {number}
 *
 * Time: O(n)
 * Space: O(1)
 */
var maxSubArray = function (nums) {
  let result = -Infinity;
  let curMax = 0;

  nums.forEach((num) => {
    curMax += num;

    if (result < curMax) result = curMax;
    if (curMax < 0) curMax = 0;
  });

  return result;
};
