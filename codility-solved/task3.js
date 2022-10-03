const str = '111';

const solution = (arr) => {
	let count = 0;

	let decimal = parseInt(arr, 2);
	while (decimal > 0) {
		if (decimal % 2 === 0) {
			decimal = decimal / 2;
		} else {
			decimal--;
		}
		count++;
	}

	return count;
};

console.log(solution(str));
