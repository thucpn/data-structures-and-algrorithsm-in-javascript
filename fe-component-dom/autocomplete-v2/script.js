const data = [
	{
		name: 'Andrei Negoi',
		email: 'andrei@gmail.com',
	},
	{
		name: 'Jonas Negoi',
		email: 'jonas@gmail.com',
	},
	{
		name: 'Thien Pham',
		email: 'thien@gmail.com',
	},
	{
		name: 'Thu Vo',
		email: 'thu@gmail.com',
	},
	{
		name: 'Thinh Tran',
		email: 'thinh@gmail.com',
	},
	{
		name: 'Thuc Pham',
		email: 'thucpham@gmail.com',
	},
];

const searchUser = async (input) => {
	return new Promise((resolve, reject) => {
		let result = [];
		if (input.trim().length > 0) {
			result = data.filter(
				(user) =>
					user.name.toLocaleLowerCase().includes(input.toLocaleLowerCase()) ||
					user.email.toLocaleLowerCase().includes(input.toLocaleLowerCase())
			);
		}

		setTimeout(() => {
			resolve(result);
		}, 500);
	});
};

function AutoComplete() {
	// DOM
	const input = document.getElementById('input');
	const tagsContainer = document.getElementById('tags-container');
	const dropdown = document.getElementById('dropdown-container');

	// State
	let currentFocus = -1;
	let tagResult = [];
	let searchResult = [];

	// Handler
	const addNewTag = (userDetail) => {
		const span = document.createElement('span');
		span.textContent = userDetail.email;
		span.title = `${userDetail.name} - Click to remove`;
		tagsContainer.append(span);
	};

	const onInputChange = async function (e) {
		const input = e.target.value;
		const users = await searchUser(input);
		searchResult = users;
		renderDropdown();
	};

	const onInputKeyDown = function (e) {
		if (searchResult.length === 0) return;

		if (e.key === 'ArrowDown') {
			currentFocus = (currentFocus + 1) % searchResult.length;
			updateActive(currentFocus);
		} else if (e.key === 'ArrowUp') {
			currentFocus = (currentFocus - 1 + searchResult.length) % searchResult.length;
			updateActive(currentFocus);
		} else if (e.key === 'Enter') {
			const clicked = dropdown.childNodes[currentFocus];
			if (clicked != null) {
				clicked.click();
			}
		}
	};

	const onUserClick = function (detailUser) {
		const arr = detailUser.split(' (');
		const name = arr[0];
		const email = arr[1].substring(0, arr[1].length - 1);

		const isChoosedTag = tagResult.some((tag) => tag.email === email);
		if (isChoosedTag) return;

		addNewTag({ name, email });
		tagResult.push({ name, email });

		// reset dropdown
		dropdown.classList.add('hide');
		currentFocus = -1;
	};

	const updateActive = function (index) {
		dropdown.childNodes.forEach((child) => {
			child.classList.remove('active');
		});
		const dropdownItem = dropdown.childNodes[index];
		if (dropdownItem != null) {
			dropdownItem.classList.add('active');
		}
	};

	// Event
	input.addEventListener('input', debounce(onInputChange, 200));
	input.addEventListener('keydown', onInputKeyDown);

	dropdown.addEventListener('click', function (e) {
		if (e.target.tagName === 'P') {
			const detailUser = e.target.textContent;
			onUserClick(detailUser);
		}
	});
	tagsContainer.addEventListener('click', function (e) {
		if (e.target.tagName === 'SPAN') {
			const email = e.target.textContent;
			tagResult = tagResult.filter((user) => user.email !== email);
			renderTags();
		}
	});

	// Render
	function renderDropdown() {
		dropdown.innerHTML = null;
		dropdown.classList.remove('hide');

		searchResult.forEach((user) => {
			const isChoosedTag = tagResult.some((tag) => tag.email === user.email);
			if (!isChoosedTag) {
				const itemNode = document.createElement('p');
				itemNode.textContent = `${user.name} (${user.email})`;
				dropdown.append(itemNode);
			}
		});
	}

	function renderTags() {
		tagsContainer.innerHTML = null;

		tagResult.forEach((userDetail) => {
			const span = document.createElement('span');
			span.textContent = userDetail.email;
			span.title = `${userDetail.name} - Click to remove`;
			tagsContainer.append(span);
		});
	}
}

function debounce(callback, delay) {
	let timer = null;

	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(this, args);
		}, delay);
	};
}

AutoComplete();
