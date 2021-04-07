/**
 * Hiện thực hoá Stack bằng LinkedList
 */

const SinglyLinkedList = require('./SinglyLinkedList');

class LinkedStack {
  constructor() {
    this.data = new SinglyLinkedList();
  }

  top() {
    return this.data.head.value;
  }

  push(value) {
    this.data.addFirst(value);
  }

  pop() {
    this.data.removeFirst();
  }
}

const myLinkedStack = new LinkedStack();
myLinkedStack.push('a');
myLinkedStack.push('b');
myLinkedStack.push('c');

console.log(myLinkedStack);
