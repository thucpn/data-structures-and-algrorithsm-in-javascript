import './App.css';
import { useState } from 'react';
import Rating from './components/Rating';
import Dropdown from './components/Dropdown';
import Folder from './components/Folder';
import Countdown from './components/Countdown';
import Toast from './components/Toast';
import Tooltip from './components/Tooltip';
import Slider from './components/Slider';
import Newfeed from './components/Newfeed';

const projectType = {
	rating: 'rating',
	dropdown: 'dropdown',
	folder: 'folder',
	countdown: 'countdown',
	toast: 'toast',
	tooltip: 'tooltip',
	slider: 'slider',
	newfeed: 'newfeed',
};

function App() {
	const [type, setType] = useState(projectType.rating);

	console.log(type);
	return (
		<div id='toast-container'>
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
						{type === projectType.folder && <Folder />}
						{type === projectType.countdown && <Countdown />}
						{type === projectType.toast && <Toast />}
						{type === projectType.tooltip && <Tooltip />}
						{type === projectType.slider && <Slider />}
						{type === projectType.newfeed && <Newfeed />}
					</main>
				</div>
			</div>
		</div>
	);
}

export default App;
