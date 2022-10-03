/**
 * @param {Array<*|Array>} array
 * @return {Array}
 */
export default function flatten(array) {
	const res = [];

	while (array.length) {
		const item = array.shift();
		if (Array.isArray(item)) {
			array.unshift(...item);
		} else {
			res.push(item);
		}
	}

	return res;
}

flatten([1, [2, [3, [4, [5]]]]]); // [1, 2, 3, 4, 5]