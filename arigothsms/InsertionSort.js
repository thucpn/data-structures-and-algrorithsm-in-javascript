function insertionSort(arr) {
	for (let i = 1; i < arr.length; i++) {
		for (let j = 0; j < i; j++) {
			if (arr[i] < arr[j]) {
				const [item] = arr.splice(i, 1);
				arr.splice(j, 0, item);
			}
		}
	}
	return arr;
}

// DEMO EXECUTION
const arr = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

console.log(insertionSort(arr));
