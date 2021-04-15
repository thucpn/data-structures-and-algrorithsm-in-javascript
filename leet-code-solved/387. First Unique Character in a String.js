/**
 * https://leetcode.com/problems/first-unique-character-in-a-string/
 *
 * @param {string} s
 * @return {number}
 *
 * Time: O(n)
 * Space: O(n)
 */
var firstUniqChar = function (s) {
  const hashtable = {};

  [...s].forEach((el) => {
    hashtable[el] = hashtable[el] ? hashtable[el] + 1 : 1;
  });

  for (const key in hashtable) if (hashtable[key] === 1) return s.indexOf(key);

  return -1;
};
