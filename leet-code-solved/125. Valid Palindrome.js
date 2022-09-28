/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
	const formatedString = removeNonAlphaNumeric(s);
	const reversedString = formatedString.split('').reverse().join('');
	return formatedString === reversedString;
};

const removeNonAlphaNumeric = (s) => {
	let result = '';
	for (let i = 0; i < s.length; i++) {
		const c = s.charAt(i);
		if (c.match(/[a-zA-Z0-9]/)) {
			result += c.toLowerCase();
		}
	}
	return result;
};
