// solider ranks

const arr = [4, 4, 3, 3, 1, 0];

const constructHashtable = (arr) => {
	const hashtable = {};
	arr.forEach((el) => {
		hashtable[el] = hashtable[el] ? hashtable[el] + 1 : 1;
	});
	return hashtable;
};

const solution = (arr) => {
	const hashtable = constructHashtable(arr);
	let result = 0;
	for (el in hashtable) {
		const lowerRank = hashtable[el - 1];
		if (lowerRank != null) {
			result += lowerRank;
		}
	}

	return result;
};

console.log(solution(arr));
