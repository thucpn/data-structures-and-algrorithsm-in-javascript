/**
 * Hiện thực hoá Queue bằng LinkedList
 */

const SinglyLinkedList = require('./SinglyLinkedList');

class LinkedQueue {
  constructor() {
    this.data = new SinglyLinkedList();
  }

  size() {
    return this.data.length;
  }

  top() {
    return this.data.head.value;
  }

  enqueue(value) {
    this.data.addLast(value);
    return value;
  }

  dequeue() {
    const result = this.top();

    this.data.removeFirst();

    return result;
  }
}

const myLinkedQueue = new LinkedQueue();
myLinkedQueue.enqueue('a');
myLinkedQueue.enqueue('b');
myLinkedQueue.enqueue('c');

// console.log(myLinkedQueue);

module.exports = LinkedQueue;
