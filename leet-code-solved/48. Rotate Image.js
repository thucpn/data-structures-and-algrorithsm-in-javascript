/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
	let n = matrix.length;
	for (let i = 0; i < n; i++) {
		for (let j = i; j < n; j++) {
			let temp = matrix[i][j];
			matrix[i][j] = matrix[j][i];
			matrix[j][i] = temp;
		}
	}
	console.log(matrix);
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n / 2; j++) {
			console.log(i, j);
			let temp = matrix[i][j];
			matrix[i][j] = matrix[i][n - j - 1];
			matrix[i][n - j - 1] = temp;
		}
	}
};

rotate([
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
]);
