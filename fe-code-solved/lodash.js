const debounce = function (callback, delay) {
	let timer;

	return function (...args) {
		let context = this;
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(context, args);
		}, delay);
	};
};

const throttle = function (callback, delay) {
	let lastTime = 0;

	return function (...args) {
		let context = this;
		let now = Date.now();
		if (now - lastTime > delay) {
			callback.apply(context, args);
			lastTime = now;
		}
	};
};

const flatten = (array) => {
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
};
