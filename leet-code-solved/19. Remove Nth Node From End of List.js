/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
	const prevNode = findPrevNode(head, n);
	if (prevNode) {
		prevNode.next = prevNode.next.next;
	} else {
		head = head.next;
	}

	return head;
};

const findPrevNode = (head, n) => {
	const length = getLength(head);
	const index = length - n - 1;

	if (index < 0) return undefined;

	let current = head;
	let i = 0;
	while (i < index) {
		current = current.next;
		i++;
	}

	return current;
};

const getLength = (head) => {
	let length = 0;
	let current = head;
	while (current) {
		length++;
		current = current.next;
	}
	return length;
};
