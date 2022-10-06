import { useState } from 'react';

const defaultValue = [
	['', '', ''],
	['', '', ''],
	['', '', ''],
];

export default function Tiktactoe() {
	const [turn, setTurn] = useState('O');

	const [board, setBoard] = useState(defaultValue);

	const checkLine = (line) => {
		if (line.every((item) => item === 'O')) return 'O';
		if (line.every((item) => item === 'X')) return 'X';
		return '';
	};

	const checkEnd = () => {
		let result = '';

		const row1 = board[0];
		const row2 = board[1];
		const row3 = board[2];
		const col1 = [board[0][0], board[1][0], board[2][0]];
		const col2 = [board[0][1], board[1][1], board[2][1]];
		const col3 = [board[0][2], board[1][2], board[2][2]];
		const cross1 = [board[0][0], board[1][1], board[2][2]];
		const cross2 = [board[0][2], board[1][1], board[2][0]];

		const arr = [row1, row2, row3, col1, col2, col3, cross1, cross2];
		arr.forEach((line) => {
			const res = checkLine(line);
			if (res !== '') {
				result = res;
			}
		});

		return result;
	};

	const choose = (rowIndex, colIndex) => {
		const value = board[rowIndex][colIndex];
		if (value !== '') return;

		const copy = [...board];
		copy[rowIndex][colIndex] = turn;
		setBoard(copy);
		if (turn === 'O') setTurn('X');
		if (turn === 'X') setTurn('O');

		const result = checkEnd();
		if (result !== '') {
			setTimeout(() => {
				alert(`${result} Win!`);
			}, 1);
		}
	};

	return (
		<div style={{ display: 'flex' }}>
			{board.map((row, rowIndex) => (
				<div key={rowIndex} style={{ marginRight: 3 }}>
					{row.map((item, colIndex) => (
						<div className='square' onClick={() => choose(rowIndex, colIndex)} key={colIndex}>
							{item}
						</div>
					))}
				</div>
			))}
		</div>
	);
}
