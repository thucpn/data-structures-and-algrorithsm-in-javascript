/**
 * https://leetcode.com/problems/intersection-of-two-arrays-ii/
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *
 * Time: O(n)
 * Space: O(n)
 */
var intersect = function (nums1, nums2) {
  const min = (a, b) => (a < b ? a : b);

  const ht1 = {};
  const ht2 = {};

  nums1.forEach((num) => {
    ht1[num] = ht1[num] ? ht1[num] + 1 : 1;
  });

  nums2.forEach((num) => {
    ht2[num] = ht2[num] ? ht2[num] + 1 : 1;
  });

  const result = [];
  for (const key in ht1) {
    if (ht2[key]) {
      let dupNum = min(ht1[key], ht2[key]);
      while (dupNum > 0) {
        keyInt = parseInt(key);
        result.push(keyInt);
        dupNum--;
      }
    }
  }

  return result;
};

console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4]));
