const data = [
	{
		text: 'Documents',
		childs: [
			{
				text: 'Tech',
				childs: [
					{ text: 'csd.txt', childs: [] },
					{ text: 'app.js', childs: [] },
				],
			},
			{ text: 'Business', childs: [] },
		],
	},
	{
		text: 'Picture',
		childs: [
			{
				text: 'Captures',
				childs: [
					{ text: '1.png', childs: [] },
					{ text: '2.png', childs: [] },
				],
			},
			{ text: 'ScreenShots', childs: [] },
		],
	},
];

function Folder() {
	// dom
	const root = document.querySelector('.root');

	// render
	const _buildTree = (parentNode, folderData) => {
		const hasChilds = folderData.childs.length > 0;

		const folderNode = document.createElement('div');
		folderNode.classList.add('indent');
		parentNode.append(folderNode);

		const titleNode = document.createElement('h5');
		titleNode.textContent = (hasChilds ? '► ' : '') + folderData.text;
		folderNode.append(titleNode);

		const childContainer = document.createElement('div');
		childContainer.classList.add('collapsed');
		folderNode.append(childContainer);

		titleNode.addEventListener('click', function () {
			const isCollapsed = childContainer.classList.contains('collapsed');
			if (isCollapsed) {
				childContainer.classList.remove('collapsed');
			} else {
				childContainer.classList.add('collapsed');
			}
		});

		folderData.childs.forEach((child) => {
			_buildTree(childContainer, child);
		});
	};

	const render = () => {
		root.innerHTML = null;
		data.forEach((folder) => {
			_buildTree(root, folder);
		});
	};

	render();
}

Folder();
