Array.prototype.myMap = function (callbackFn) {
	const arr = new Array(this.length);

	for (let i = 0; i < arr.length; i++) {
		// Ignore index if value is not defined for index (e.g. in sparse arrays [1, 2 x empty, 5]).
		if (this.hasOwnProperty(i)) {
			arr[i] = callbackFn(this[i], i, this);
		}
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

Array.prototype.myReduce = function (callback, initialValue) {
	let result = initialValue;

	for (let i = 0; i < this.length; i++) {
		const element = this[i];
		result = callback(result, element, i, this);
	}

	return result;
};

Array.prototype.myBind = function (refObject, ...args) {
	const fn = this;
	return function () {
		fn.call(refObject, args);
	};
};
