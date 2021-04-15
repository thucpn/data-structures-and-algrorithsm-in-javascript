/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * https://leetcode.com/problems/maximum-depth-of-binary-tree/
 *
 * @param {TreeNode} root
 * @return {number}
 *
 * Time: O(n)
 * Space: O(n)
 */
var maxDepth = function (root) {
  if (!root) return 0;
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  const depth = (leftDepth > rightDepth ? leftDepth : rightDepth) + 1;
  return depth;
};
