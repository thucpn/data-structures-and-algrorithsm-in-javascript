/**
 * https://leetcode.com/problems/pascals-triangle/
 *
 * @param {number} numRows
 * @return {number[][]}
 *
 * Time: O(n^2)
 * Space: O(n)
 */
var generate = function (numRows) {
  const factorial = (n) => {
    let fac = 1;
    let count = 1;
    while (count <= n) {
      fac *= count;
      count++;
    }
    return fac;
  };

  const C = (n, k) => factorial(n) / factorial(k) / factorial(n - k);

  const getRow = (n) => {
    let row = [];
    for (let i = 0; i <= n; i++) {
      row.push(C(n, i));
    }
    return row;
  };

  const result = [];
  for (let i = 1; i <= numRows; i++) {
    result.push(getRow(i - 1));
  }

  return result;
};
