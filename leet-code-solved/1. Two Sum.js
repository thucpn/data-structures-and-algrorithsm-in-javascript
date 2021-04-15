/**
 * https://leetcode.com/problems/two-sum/
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 *
 * Time: O(n)
 * Space: O(n)
 */
var twoSum = function (nums, target) {
  const hashtable = {};

  nums.forEach((num, index) => {
    if (hashtable[num]) {
      hashtable[num].push(index);
    } else {
      hashtable[num] = [index];
    }
  });

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (hashtable[target - num]) {
      if (target - num !== num) return [hashtable[num][0], hashtable[target - num][0]];

      if (hashtable[num].length > 1) return [hashtable[num][0], hashtable[num][1]];
    }
  }

  return [];
};
