import { useState } from 'react';

const searchUser = async (value) => {
	const res = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await res.json();
	const filter = data.filter((item) => item.name.toLowerCase().includes(value.toLocaleLowerCase()));
	return filter;
};

export default function Autocomplete() {
	const [input, setInput] = useState('');
	const [result, setResult] = useState([]);

	const onChangeInput = async (e) => {
		const value = e.target.value;
		setInput(value);
		if (value.trim().length === 0) {
			setResult([]);
		} else {
			const filter = await searchUser(value);
			console.log(filter);
			setResult(filter);
		}
	};

	const debounceOnChangeInput = debounce(onChangeInput, 400);

	return (
		<div style={{ position: 'absolute' }}>
			<div>Search name:</div>
			<input type='text' className='input-search' onChange={debounceOnChangeInput} />

			{input.trim().length > 0 && (
				<div className='dropdown-search'>
					{result.length > 0 ? (
						result.map((res, index) => <div key={index}>{res.name}</div>)
					) : (
						<span>No result</span>
					)}
				</div>
			)}
		</div>
	);
}

function debounce(callback, delay) {
	let timer = null;

	return function (...arg) {
		let context = this;
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback.apply(context, arg);
		}, delay);
	};
}

// function throttle(callback, delay) {
// 	let lastTime = 0;

// 	return function (...arg) {
// 		let context = this;
// 		let now = Date.now();
// 		if (now - lastTime > delay) {
// 			callback.apply(context, arg);
// 			lastTime = now;
// 		}
// 	};
// }
