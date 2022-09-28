/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
	const MAX = Math.pow(2, 31) - 1;
	const MIN = -Math.pow(2, 31);
	let result = 0;
	let sign = 1;
	let i = 0;
	while (s.charAt(i) === ' ') {
		i++;
	}
	if (s.charAt(i) === '-') {
		sign = -1;
		i++;
	} else if (s.charAt(i) === '+') {
		i++;
	}
	for (; i < s.length; i++) {
		const c = s.charAt(i);
		if (c.match(/[0-9]/)) {
			result = result * 10 + parseInt(c);
		} else {
			break;
		}
	}
	result = result * sign;
	if (result > MAX) {
		return MAX;
	} else if (result < MIN) {
		return MIN;
	}
	return result;
};
