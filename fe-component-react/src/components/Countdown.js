import { useEffect, useState } from 'react';
const SECOND = 10;

let interval;
export default function Countdown() {
	const [cur, setCur] = useState(SECOND);

	useEffect(() => {
		interval = setInterval(() => {
			setCur((cur) => cur - 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		if (cur === 0) {
			clearInterval(interval);
		}
	}, [cur]);

	return <div>{cur}</div>;
}
