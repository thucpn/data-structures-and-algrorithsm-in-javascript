const SECOND = 5;

function CountDown() {
	// state
	let cur = SECOND;

	// dom
	const time = document.getElementById('time');
	time.textContent = cur;

	// render
	const render = () => {
		const interval = setInterval(() => {
			cur--;
			if (cur < 0) return clearInterval(interval);
			time.textContent = cur;
		}, 1000);
	};

	render();
}

CountDown();
