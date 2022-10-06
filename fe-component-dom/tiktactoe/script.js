function Tiktactoe() {
	// state
	let turn = 'X';
	let board = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];

	// handler
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

	const updateBoard = (row, col) => {
		board[row][col] = turn;
		const result = checkEnd(board);
		if (result !== '') {
			return alert(`${result} Win!`);
		}

		if (turn === 'O') {
			turn = 'X';
		} else if (turn === 'X') {
			turn = 'O';
		}
	};

	// dom
	const squares = document.querySelectorAll('.square');
	squares.forEach((square) => {
		square.addEventListener('click', function () {
			const { row, col } = square.dataset;
			if (!this.textContent) {
				this.textContent = turn;
				updateBoard(row, col);
			}
		});
	});
}

Tiktactoe();
