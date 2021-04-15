/**
 * https://leetcode.com/problems/single-number/
 *
 * @param {number[]} nums
 * @return {number}
 *
 * Time: O(n)
 * Space: O(n)
 */
var singleNumber = function (nums) {
  const hashtable = {};

  nums.forEach((el) => {
    hashtable[el] = hashtable[el] ? hashtable[el] + 1 : 1;
  });

  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    if (hashtable[element] === 1) return nums[i];
  }

  return -1;
};
