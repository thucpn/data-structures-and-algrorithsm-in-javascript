const searchUser = async (value) => {
	const res = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await res.json();
	const filter = data.filter((item) => item.name.toLowerCase().includes(value.toLocaleLowerCase()));
	return filter;
};

function Autocomplete() {
	// dom
	const input = document.querySelector('input');
	const dropdown = document.querySelector('.dropdown-search');

	// handler
	const handler = async function (e) {
		const value = e.target.value;

		if (value.trim().length === 0) {
			dropdown.classList.add('hide');
			return;
		}

		dropdown.classList.remove('hide');
		const data = await searchUser(value);

		if (data.length === 0) {
			dropdown.innerHTML = 'No result';
		} else {
			dropdown.innerHTML = null;
			data.forEach((user) => {
				const userNode = document.createElement('div');
				userNode.textContent = user.name;
				dropdown.append(userNode);
			});
		}
	};

	const debounceHandler = debounce(handler, 400);

	// state
	input.addEventListener('input', debounceHandler);
}

Autocomplete();

function debounce(callback, delay) {
	let timer = null;

	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(this, args);
		}, delay);
	};
}
