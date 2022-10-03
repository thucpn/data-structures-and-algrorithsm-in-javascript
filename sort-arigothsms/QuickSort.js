function quickSort(array) {
	if (array.length < 2) return array;
	let pivotIndex = Math.floor(array.length / 2);
	let pivot = array[pivotIndex];
	let less = [];
	let greater = [];

	for (let i in array) {
		if (Number(i) !== pivotIndex) {
			array[i] > pivot ? greater.push(array[i]) : less.push(array[i]);
		}
	}

	return [...quickSort(less), pivot, ...quickSort(greater)];
}

// DEMO EXECUTION
const arr = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

console.log(quickSort(arr));