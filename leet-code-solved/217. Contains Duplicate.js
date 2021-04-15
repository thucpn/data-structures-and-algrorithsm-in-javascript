/**
 * https://leetcode.com/problems/contains-duplicate/
 *
 * @param {number[]} nums
 * @return {boolean}
 *
 * Time: O(n)
 * Space: O(n)
 */
var containsDuplicate = function (nums) {
  return nums.length !== new Set(nums).size;
};
