/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
	// loop từ 1 tới cuối
	// nếu gặp trùng lặp -> bỏ qua
	// nếu không gặp trùng lặp -> tiến hàng thay thế và cập nhật lại vị trí có thể bị thay thế

	let point = 1;
	for (let i = 1; i < nums.length; i++) {
		if (nums[i] !== nums[i - 1]) {
			nums[point] = nums[i];
			point++;
		}
	}

	console.log(nums);
	return point;
};

console.log(removeDuplicates([1, 1, 2, 2, 2, 3]));
