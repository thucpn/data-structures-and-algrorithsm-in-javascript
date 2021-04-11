function move(n, x, y) {
  if (n === 1) return console.log('Chuyển 1 đĩa từ cọc ' + x + ' sang cọc ' + y);

  // chuyển n-1 đĩa từ cọc x sang cọc trung gian
  move(n - 1, x, 6 - x - y);

  // chuyển đĩa to nhất từ cọc x sang cọc y
  move(1, x, y);

  // chuyển n-1 đĩa từ cọc trung gian sang cọc y
  move(n - 1, 6 - x - y, y);
} // O(2^n)

move(10, 1, 2);
