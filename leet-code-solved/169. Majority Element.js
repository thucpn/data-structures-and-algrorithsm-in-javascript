/**
 * https://leetcode.com/problems/majority-element/
 *
 * @param {number[]} nums
 * @return {number}
 *
 * Time:
 * Space:
 */
var majorityElement = function (nums) {
  const hashtable = {};

  nums.forEach((el) => {
    hashtable[el] = hashtable[el] ? hashtable[el] + 1 : 1;
  });

  for (key in hashtable) {
    if (hashtable[key] > Math.floor(nums.length / 2)) {
      return key;
    }
  }

  return -1;
};
