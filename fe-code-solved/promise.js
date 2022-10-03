const fakePromise = () => {
	const promise = new Promise((resolve, reject) => {
		const data = [1, 2, 3, 4];

		if (data.length > 0) {
			setTimeout(() => resolve(data), 1000);
		} else {
			setTimeout(() => reject('Not found'), 1000);
		}
	});

	return promise;
};

function promiseAll(iterable) {
	return new Promise((resolve, reject) => {
		const results = new Array(iterable.length);
		let unresolved = iterable.length;

		if (unresolved === 0) {
			resolve(results);
			return;
		}

		iterable.forEach(async (item, index) => {
			try {
				const value = await item;
				results[index] = value;
				unresolved -= 1;

				if (unresolved === 0) {
					resolve(results);
				}
			} catch (err) {
				reject(err);
			}
		});
	});
}
