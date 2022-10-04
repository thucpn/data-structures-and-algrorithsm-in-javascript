/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
	let max = 0;
	let str = '';
	let index = 0;
	while (index < s.length) {
		const char = s.charAt(index);
		const position = str.indexOf(char);

		if (position >= 0) str = str.substring(position + 1);

		str += char;
		max = Math.max(max, str.length);
		index++;
	}

	return max;
};

console.log(lengthOfLongestSubstring('bbtablud'));
