// function Tooltip() {
// 	// dom
// 	const hovers = document.querySelectorAll('[data-tooltip]');

// 	// handler
// 	const showTooltip = (node) => {
// 		const clone = node.cloneNode(true);
// 		const container = document.createElement('div');
// 		container.classList.add('tooltip-wrapper');
// 		container.append(clone);
// 		node.replaceWith(container);

// 		const tooltip = document.createElement('div');
// 		tooltip.classList.add('tooltip');
// 		tooltip.textContent = 'Sample text';
// 		container.append(tooltip);
// 	};

// 	const hideTooltip = (node) => {
// 		const clone = node.cloneNode(true);
// 		const container = document.createElement('div');
// 		container.classList.add('tooltip-wrapper');
// 		container.append(clone);
// 		node.replaceWith(container);

// 		const tooltip = document.createElement('div');
// 		tooltip.classList.add('tooltip');
// 		tooltip.textContent = 'Sample text';
// 		container.append(tooltip);
// 	};

// 	hovers.forEach((hover) => {
// 		hover.addEventListener('mouseover', function () {
// 			showTooltip(hover);
// 		});
// 		// hover.addEventListener('mouseleave', function () {
// 		// 	hideTooltip(hover);
// 		// });
// 	});
// }

// Tooltip();
