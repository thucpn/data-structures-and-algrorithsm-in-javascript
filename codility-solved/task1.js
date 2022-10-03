// find subsequence slice with max sum

const arr = [-12, -1, 1, 2, -3, 4, 2, -6];

const solution = (arr) => {
	let result = 0;
	let currentMax = 0;

	for (let i = 0; i < arr.length; i++) {
		const el = arr[i];
		if (el > 0) {
			currentMax += el;
		} else {
			currentMax = 0;
		}
		result = Math.max(result, currentMax);
	}

	return result;
};

console.log(solution(arr));
