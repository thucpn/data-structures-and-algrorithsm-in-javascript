/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  const str = n.toString(2).padStart(32, '0');
	return parseInt(str.split('').reverse().join(''), 2);
};
