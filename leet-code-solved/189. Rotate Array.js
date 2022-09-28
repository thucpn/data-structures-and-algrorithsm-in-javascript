/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
	const length = nums.length;
	const n = k % length;

	const temp = nums.slice(length - n);
	nums.splice(length - n, n);
	nums.unshift(...temp);

	return nums;
};

console.log(rotate([1, 2, 3, 4, 5, 6], 3));
