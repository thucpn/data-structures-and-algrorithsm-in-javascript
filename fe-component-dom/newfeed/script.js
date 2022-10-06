const getNewPost = async () => {
	const res = await fetch('https://baconipsum.com/api/?type=meat-and-filler');
	const data = await res.json();
	return {
		content: data[0],
		time: new Date(),
	};
};

function Newfeed() {
	// dom
	const container = document.getElementById('container');
	const bottom = document.getElementById('bottom');
	const loading = document.getElementById('loading');

	// render
	const load = async () => {
		loading.classList.remove('hide');
		for (let i = 0; i < 3; i++) {
			const newPost = await getNewPost();
			const newPostNode = document.createElement('div');
			const time = document.createElement('h3');
			time.textContent = newPost.time.toString();
			const content = document.createElement('p');
			content.textContent = newPost.content;
			newPostNode.append(time, content);
			container.append(newPostNode);
		}
		loading.classList.add('hide');
	};

	const render = async () => {
		await load();

		const bottomObserver = new IntersectionObserver(load, {
			root: null,
			threshold: 0.5,
			rootMargin: '0px',
		});
		bottomObserver.observe(bottom);
	};

	render();
}

Newfeed();
