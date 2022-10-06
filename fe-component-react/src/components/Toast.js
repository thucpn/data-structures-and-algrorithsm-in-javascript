export default function Toast() {
	const showToast = () => {
		const toastContainer = document.getElementById('toast-container');
		const toastPanel = document.createElement('div');
		toastPanel.classList.add('toast');
		toastPanel.textContent = 'Toast content';
		toastContainer.append(toastPanel);

		setTimeout(() => {
			toastPanel.remove();
		}, 500);
	};

	return (
		<div>
			<button onClick={showToast}>Show toast</button>
		</div>
	);
}
