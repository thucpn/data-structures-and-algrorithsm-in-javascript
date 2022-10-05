import './App.css';
import { useState } from 'react';
import Rating from './components/Rating';
import Dropdown from './components/Dropdown';

// Games Tic-tac-toe
// Photo Gallery -> click vô hiện full
// Search Autocomplete
// New Feed
// Slider component

// star rating: https://www.algochurn.com/frontend/feedback-stars
// dropdown component
// folder struc: https://www.algochurn.com/frontend/folder-structure
// toast and notifi: https://www.algochurn.com/frontend/toasts-and-notifications
// tooltip component
// countdown-timer: https://www.algochurn.com/frontend/countdown-timer

const projectType = {
	rating: 'rating',
	dropdown: 'dropdown',
	folder: 'folder',
	toast: 'toast',
	tooltip: 'tooltip',
	countdown: 'countdown',
};

function App() {
	const [type, setType] = useState(projectType.rating);

	console.log(type);
	return (
		<div>
			<h1>List of components</h1>
			<div style={{ display: 'flex' }}>
				<ul
					style={{
						borderRight: 1,
						borderRightColor: 'black',
						borderRightStyle: 'solid',
						width: 150,
					}}
				>
					{Object.keys(projectType).map((key) => (
						<li key={key}>
							<button
								style={{
									background: type === projectType[key] ? 'yellow' : 'white',
									textTransform: 'capitalize',
									marginBottom: 5,
								}}
								onClick={() => setType(projectType[key])}
							>
								{key}
							</button>
						</li>
					))}
				</ul>
				<main style={{ padding: 20 }}>
					{type === projectType.rating && <Rating />}
					{type === projectType.dropdown && <Dropdown />}
				</main>
			</div>
		</div>
	);
}

export default App;
