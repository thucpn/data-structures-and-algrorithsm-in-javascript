/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
	let current1 = list1;
	let current2 = list2;
	let head = null,
		tail = null;

	while (true) {
		const nextInsertNode = getNextInsertNode(current1, current2);
		if (nextInsertNode == null) break;

		const [newHead, newTail] = addLast(head, tail, nextInsertNode);
		head = newHead;
		tail = newTail;

		if (nextInsertNode === current1) {
			current1 = current1.next;
		} else {
			current2 = current2.next;
		}
	}

	return head;
};

const getNextInsertNode = (current1, current2) => {
	if (current1 == null && current2 == null) return null;

	if (current1 == null) {
		return current2;
	} else if (current2 == null) {
		return current1;
	} else if (current1.val <= current2.val) {
		return current1;
	} else {
		return current2;
	}
};

const addLast = (head, tail, node) => {
	if (head == null) {
		head = node;
	} else {
		tail.next = node;
	}
	tail = node;

	return [head, tail];
};
