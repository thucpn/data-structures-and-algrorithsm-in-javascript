/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
	this.nums = nums;
	this.shuffled = nums.slice();
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function () {
	this.shuffled = this.nums.slice();
	return this.shuffled;
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
	for (let i = 0; i < this.shuffled.length; i++) {
		const randomIndex = Math.floor(Math.random() * this.shuffled.length);
		const temp = this.shuffled[i];
		this.shuffled[i] = this.shuffled[randomIndex];
		this.shuffled[randomIndex] = temp;
	}
	return this.shuffled;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
