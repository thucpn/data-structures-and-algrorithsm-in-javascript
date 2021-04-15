/**
 * https://leetcode.com/problems/excel-sheet-column-number/
 *
 * @param {string} columnTitle
 * @return {number}
 *
 * Time:
 * Space:
 */
var titleToNumber = function (columnTitle) {
  let result = 0;
  let count = 0;

  while (count <= columnTitle.length - 1) {
    result += (columnTitle.charCodeAt(columnTitle.length - count - 1) - 64) * 26 ** count;
    count++;
  }

  return result;
};
