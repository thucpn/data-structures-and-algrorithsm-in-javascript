/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * https://leetcode.com/problems/symmetric-tree/
 *
 * @param {TreeNode} root
 * @return {boolean}
 *
 * Time: O(n)
 * Space: O(n)
 */
var isSymmetric = function (root) {
  const isMirror = (t1, t2) => {
    if (!t1 && !t2) return true;
    if (!t1 || !t2) return false;

    return t1.val === t2.val && isMirror(t1.right, t2.left) && isMirror(t1.left, t2.right);
  };

  return isMirror(root, root);
};
