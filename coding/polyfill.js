Array.prototype.myMap = function (callback) {
	const arr = [];

	for (let i = 0; i < this.length; i++) {
		const element = callback(this[i], i, this);
		arr.push(element);
	}

	return arr;
};

Array.prototype.myFilter = function (callback) {
	const arr = [];

	for (let i = 0; i < this.length; i++) {
		const element = this[i];
		if (callback(element, i, this)) {
			arr.push(element);
		}
	}

	return arr;
};

console.log([1, 2, 3].myMap((el, index, currentArr) => el * 2));
console.log([1, 2, 3].myFilter((el, index, currentArr) => el > 2));
