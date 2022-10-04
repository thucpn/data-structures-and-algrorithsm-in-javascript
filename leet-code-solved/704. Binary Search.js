/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
	let left = 0;
	let right = nums.length - 1;

	while (left <= right) {
		let middle = Math.floor((left + right) / 2);

		if (nums[middle] === target) return middle;
		if (target > nums[middle]) {
			left = middle + 1;
		} else {
			right = middle - 1;
		}
	}

	return -1;
};

const nums = [-1, 0, 3, 5, 9, 12];
const target = 2;

console.log(search(nums, target));
