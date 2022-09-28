const debounce = function (callback, delay) {
	let timer;

	return function () {
		let context = this;
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(context, arguments);
		}, delay);
	};
};

console.log(debounce(console.log, 2000)('abc'));