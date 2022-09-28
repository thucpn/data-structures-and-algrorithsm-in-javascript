const fakeAPI = () => {
	const promise = new Promise((resolve, reject) => {
		// const data = [1, 2, 3, 4];
		const data = [];

		if (data.length > 0) {
			setTimeout(() => resolve(data), 1000);
		} else {
			setTimeout(() => reject('Not found'), 1000);
		}
	});

	return promise;
};

fakeAPI()
	.then((data) => {
		console.log(data);
	})
	.catch((err) => console.log(err));
