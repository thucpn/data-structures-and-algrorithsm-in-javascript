/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
	const hashtable = {};
	hashtable[0] = nums[0];
	hashtable[1] = Math.max(nums[0], nums[1]);
	return maxRob(nums, nums.length - 1, hashtable);
};

const maxRob = (nums, index, hashtable) => {
	if (index in hashtable) return hashtable[index];
	const result = Math.max(
		maxRob(nums, index - 1, hashtable),
		maxRob(nums, index - 2, hashtable) + nums[index]
	);
	if (hashtable[index] == null) {
		hashtable[index] = result;
	}
	return result;
};

console.log(rob([1, 2, 3, 10, 7, 9]));
