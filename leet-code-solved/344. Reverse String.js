/**
 * https://leetcode.com/problems/reverse-string/
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 *
 * Time: O(n) ~ O(n/2)
 * Space: O(1)
 */
var reverseString = function (s) {
	// let left = 0;
	// let right = s.length - 1;

	// while (left < right) {
	//   const temp = s[left];
	//   s[left] = s[right];
	//   s[right] = temp;

	//   left++;
	//   right--;
	// }

	for (let i = 0; i < Math.round(s.length / 2); i++) {
		const temp = s[i];
		s[i] = s[s.length - 1 - i];
		s[s.length - 1 - i] = temp;
	}
};
