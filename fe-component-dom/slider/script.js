const images = [
	'https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
	'https://images.unsplash.com/photo-1664993981856-2076348ed8f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
	'https://plus.unsplash.com/premium_photo-1663100073042-155bddf1c931?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
];

function Slider() {
	// dom
	const root = document.getElementById('root');
	const container = document.getElementById('container');
	const left = document.getElementById('left');
	const right = document.getElementById('right');

	// state
	let cur = 0;
	function setCur(index) {
		cur = index;
		reRender();
	}

	// render
	const render = () => {
		images.forEach((img, index) => {
			const imgItem = document.createElement('img');
			imgItem.src = img;
			if (index !== 0) {
				imgItem.classList.add('hide');
			}
			container.append(imgItem);
		});
	};

	const reRender = () => {
		container.childNodes.forEach((img, index) => {
			img.classList.add('hide');
			if (index === cur) {
				img.classList.remove('hide');
			}
		});
	};

	render();

	// event

	left.addEventListener('click', function () {
		setCur((cur - 1 + images.length) % images.length);
	});
	right.addEventListener('click', function () {
		setCur((cur + 1) % images.length);
	});
}

Slider();
