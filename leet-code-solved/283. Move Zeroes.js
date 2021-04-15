/**
 * https://leetcode.com/problems/move-zeroes/
 *
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 *
 * Time: O(n)
 * Space: O(1)
 */
var moveZeroes = function (nums) {
  let lastNoneZeroIndex = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[lastNoneZeroIndex] = nums[i];
      lastNoneZeroIndex++;
    }
  }

  for (let i = lastNoneZeroIndex; i < nums.length; i++) {
    nums[i] = 0;
  }
};
