function RatingComponent() {
	// dom
	const container = document.getElementById('container');

	// state
	let curHover = -1;

	function _setCurHover(index) {
		curHover = index;
		render();
	}

	// handler
	const isLight = (index) => {
		let point = -1;
		if (curHover >= 0) {
			point = curHover;
		}
		return index <= point;
	};

	const render = () => {
		container.innerHTML = null;
		for (let i = 0; i < 5; i++) {
			const span = document.createElement('span');
			span.textContent = isLight(i) ? '⭐' : '✰';
			span.dataset.index = i;
			container.append(span);
		}
	};

	container.addEventListener('mouseover', function (e) {
		if (e.target.tagName === 'SPAN') {
			const starIndex = e.target.dataset.index;
			_setCurHover(starIndex);
		}
	});

	// first render
	render();
}

RatingComponent();
