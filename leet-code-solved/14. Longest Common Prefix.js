/**
 * https://leetcode.com/problems/longest-common-prefix/
 *
 * @param {string[]} strs
 * @return {string}
 *
 * Time: O(n)
 * Space: O(1)
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return '';

  let shortest = strs[0];

  for (let i = 1; i < strs.length; i++) {
    const str = strs[i];
    if (str.length < shortest.length) shortest = str;
  }

  let result = '';
  for (let i = 0; i < [...shortest].length; i++) {
    const char = [...shortest][i];

    for (let j = 0; j < strs.length; j++) {
      const str = strs[j];
      if (str.charAt(i) !== char) return result;
    }

    result += char;
  }

  return result;
};
