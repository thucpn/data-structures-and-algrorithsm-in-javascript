import { useState } from 'react';

const data = [
	'https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
	'https://images.unsplash.com/photo-1664993981856-2076348ed8f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
	'https://plus.unsplash.com/premium_photo-1663100073042-155bddf1c931?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
];

export default function Slider() {
	const [cur, setCur] = useState(0);

	const toRight = () => setCur((cur) => (cur + 1) % data.length);
	const toLeft = () => setCur((cur) => (cur - 1 + data.length) % data.length);

	return (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<button onClick={toLeft}>Left</button>
			<div style={{ width: 400, margin: '0 20px' }}>
				{data.map((img, index) => {
					if (index === cur)
						return (
							<img
								key={index}
								src={img}
								alt=''
								style={{ objectFit: 'cover', width: '100%' }}
								loading='lazy'
							/>
						);
					return null;
				})}
			</div>
			<button onClick={toRight}>Right</button>
		</div>
	);
}
