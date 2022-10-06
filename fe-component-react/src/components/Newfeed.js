import { useCallback, useEffect, useRef, useState } from 'react';

export default function Newfeed() {
	const [data, setData] = useState([]);
	const [load, setLoad] = useState(false);
	const containerRef = useRef(null);

	const getNewPost = async () => {
		const res = await fetch('https://baconipsum.com/api/?type=meat-and-filler');
		const data = await res.json();
		return {
			content: data[0],
			time: new Date(),
		};
	};

	const fetchNews = useCallback(async () => {
		setLoad(true);
		let news = [];
		for (let i = 0; i < 5; i++) {
			const newPost = await getNewPost();
			news.push(newPost);
		}
		setLoad(false);
		setData((prev) => [...prev, ...news]);
	}, []);

	useEffect(() => {
		fetchNews();
	}, [fetchNews]);

	useEffect(() => {
		const observer = new IntersectionObserver(fetchNews, {
			root: null,
			rootMargin: '0px',
			threshold: 1.0,
		});

		if (containerRef.current) observer.observe(containerRef.current);
	}, [fetchNews]);

	return (
		<div>
			{data.map((post, index) => (
				<div key={index} style={{ width: 400 }}>
					<h3>{post.time.toString()}</h3>
					<p>{post.content}</p>
				</div>
			))}
			<div ref={containerRef}></div>
			{load && <div style={{ marginTop: 20 }}>🔃🔃🔃🔃 Loading...........</div>}
		</div>
	);
}
