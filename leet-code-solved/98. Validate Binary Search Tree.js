/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
	let current = -Infinity;
	let flag = true;

	const inorderTraversal = (node) => {
		if (!node) return;

		inorderTraversal(node.left);
		console.log(node.val);
		if (node.val <= current) {
			flag = false;
		} else {
			current = node.val;
		}
		inorderTraversal(node.right);
	};

	inorderTraversal(root);

	return flag;
};
