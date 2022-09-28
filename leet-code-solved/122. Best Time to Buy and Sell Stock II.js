/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // có thể bán và mua trong ngày
  // lợi nhuận lớn nhất bằng tổng các hiệu mỗi lần bán mua
  // [1, 3, 5] -> 5 - 1 = (3 - 1) + (5 - 3)

	let maxProfit = 0;
	for (let i = 1; i < prices.length; i++) {
		if (prices[i] > prices[i - 1]) {
			maxProfit += prices[i] - prices[i - 1];
		}
	}
	return maxProfit;
};
