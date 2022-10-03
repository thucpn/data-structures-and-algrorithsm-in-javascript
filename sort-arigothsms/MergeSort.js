function merge(left, right) {
	const sorted = [];

	while (left.length && right.length) {
		if (left[0] <= right[0]) {
			sorted.push(left.shift());
		} else {
			sorted.push(right.shift());
		}
	}

	return [...sorted, ...left, ...right];
}

function mergeSort(arr) {
	if (arr.length < 2) return arr;

	const middle = Math.floor(arr.length / 2);
	const left = arr.slice(0, middle);
	const right = arr.slice(middle);
	return merge(mergeSort(left), mergeSort(right));
}

// DEMO EXECUTION
const arr = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

console.log(mergeSort(arr));
