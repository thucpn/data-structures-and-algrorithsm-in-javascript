/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
	const hashtable = {};
	let couple = 0;

	[...s].forEach((char) => {
		if (char in hashtable) {
			couple++;
			delete hashtable[char];
		} else {
			hashtable[char] = true;
		}
	});

	if (couple * 2 < s.length) {
		return couple * 2 + 1;
	} else {
		return couple * 2;
	}
};
