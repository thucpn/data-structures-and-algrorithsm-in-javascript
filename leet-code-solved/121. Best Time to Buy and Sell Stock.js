/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
	let maxProfit = 0;
	let min = prices[0];

	let index = 1;
	while (index < prices.length) {
		const price = prices[index];
		if (price < min) {
			min = price;
		} else {
			maxProfit = Math.max(maxProfit, price - min);
		}
		index++;
	}

	return maxProfit;
};
