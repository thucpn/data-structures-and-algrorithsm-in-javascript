function Toast() {
	const toastContainer = document.getElementById('toast-container');
	const btn = document.getElementById('btn');

	const showToast = () => {
		const toastPanel = document.createElement('div');
		toastPanel.classList.add('toast');
		toastPanel.textContent = 'Toast content';
		toastContainer.append(toastPanel);

		setTimeout(() => {
			toastPanel.remove();
		}, 500);
	};

	btn.addEventListener('click', function () {
		showToast();
	});
}

Toast();
