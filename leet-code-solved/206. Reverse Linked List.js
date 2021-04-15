/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * https://leetcode.com/problems/reverse-linked-list/
 *
 * @param {ListNode} head
 * @return {ListNode}
 *
 * Time: O(n)
 * Space: O(1)
 */
var reverseList = function (head) {
  if (!head || !head.next) return head;

  const tail = head;

  let n1 = head;
  let n2 = n1.next;
  let temp;

  while (n2) {
    temp = n2.next;
    n2.next = n1;
    n1 = n2;
    n2 = temp;
  }

  head = n1;
  tail.next = null;

  return head;
};
