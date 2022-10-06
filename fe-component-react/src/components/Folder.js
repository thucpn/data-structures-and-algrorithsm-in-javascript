import { useState } from 'react';

const isLeaf = (childs) => childs.length === 0;

function FolderItem({ text, children, childs }) {
	const [collapse, setCollapse] = useState(true);

	return (
		<div>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{!isLeaf(childs) && (
					<span onClick={() => setCollapse((prev) => !prev)} style={{ cursor: 'pointer' }}>
						{collapse ? '►' : '▼'}
					</span>
				)}
				<h5 style={{ margin: 5 }}>{text}</h5>
			</div>
			<div>{!collapse && children}</div>
		</div>
	);
}

function renderFolder(folder) {
	const { text, childs } = folder;

	if (isLeaf(childs)) {
		return <FolderItem text={text} childs={childs} />;
	}

	return (
		<FolderItem text={text} childs={childs}>
			<div style={{ marginLeft: 20 }}>{childs.map((child) => renderFolder(child))}</div>
		</FolderItem>
	);
}

export default function Folder() {
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
	return <div>{data.map((folder) => renderFolder(folder))}</div>;
}
