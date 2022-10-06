function Dropdown() {
	// state
	let isOpen = false;

	function _setIsOpen(newState) {
		isOpen = newState;
		render();
	}

	// dom
	const dropdownContainer = document.querySelector('.dropdown-container');
	const dropdownBtn = document.querySelector('button');

	// handler
	const toggle = () => _setIsOpen(!isOpen);

	// event
	dropdownBtn.addEventListener('click', function () {
		toggle();
	});

	dropdownContainer.addEventListener('click', function (e) {
		if (e.target.classList.contains('dropdown-item')) {
			toggle();
		}
	});

	const render = () => {
		dropdownContainer.classList = `dropdown-container ${isOpen ? 'show' : 'hide'}`;
	};

	render();
}

Dropdown();
