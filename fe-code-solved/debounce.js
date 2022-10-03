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

console.log(debounce(console.log, 2000)('abc'));