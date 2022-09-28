/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
	// Check rows
	for (let i = 0; i < 9; i++) {
		let row = board[i];
		if (!isValid(row)) {
			return false;
		}
	}

	// Check columns
	for (let i = 0; i < 9; i++) {
		let column = [];
		for (let j = 0; j < 9; j++) {
			column.push(board[j][i]);
		}
		if (!isValid(column)) {
			return false;
		}
	}

	// Check 3x3 boxes
	for (let i = 0; i < 9; i += 3) {
		for (let j = 0; j < 9; j += 3) {
			let box = [];
			for (let k = i; k < i + 3; k++) {
				for (let l = j; l < j + 3; l++) {
					box.push(board[k][l]);
				}
			}
			if (!isValid(box)) {
				return false;
			}
		}
	}

	return true;
};

const isValid = (arr) => {
	let set = new Set();
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== '.') {
			if (set.has(arr[i])) {
				return false;
			}
			set.add(arr[i]);
		}
	}
	return true;
};
