/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
	const tail = buildDoubleLinkedList(head);
	let left = head;
	let right = tail;
	while (left != null && right != null) {
		if (left.val !== right.val) {
			return false;
		}
		left = left.next;
		right = right.prev;
	}
	return true;
};

const buildDoubleLinkedList = (head) => {
	let current = head;
	let prev = null;
	while (current != null) {
		current.prev = prev;
		prev = current;
		current = current.next;
	}
	const tail = prev;
	return tail;
};
