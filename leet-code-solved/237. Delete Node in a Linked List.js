/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function (node) {
	node.val = node.next.val;
	node.next = node.next.next;

	// // Since we know input node is not last node, so nextNode will not be null
	// nextNode = node.next;
	// // Step 2
	// node.val = nextNode.val;
	// // Step 3
	// node.next = nextNode.next;
	// nextNode.next = null;
	// delete nextNode;
};
