/**
 * https://leetcode.com/problems/valid-anagram/
 *
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 *
 * Time: O(n)
 * Space: O(n)
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const ht1 = {};
  const ht2 = {};

  for (let i = 0; i < s.length; i++) {
    const c1 = s.charAt(i);
    const c2 = t.charAt(i);

    ht1[c1] = ht1[c1] ? ht1[c1] + 1 : 1;
    ht2[c2] = ht2[c2] ? ht2[c2] + 1 : 1;
  }

  for (const key in ht1) {
    if (ht1[key] !== ht2[key]) {
      return false;
    }
  }

  for (const key in ht2) {
    if (ht2[key] !== ht1[key]) {
      return false;
    }
  }

  return true;
};
