/**
 * Hiện thực hoá Dequeue bằng DoublyLinkedList
 */

const DoublyLinkedList = require('./DoublyLinkedList');

class Dequeue {
  constructor() {
    this.data = new DoublyLinkedList();
  }

  addFirst(value) {
    this.data.addFirst(value);
    return value;
  }

  addLast(value) {
    this.data.addLast(value);
    return value;
  }

  removeFirst() {
    const result = this.data.getFirst();
    this.data.removeFirst();
    return result;
  }

  removeLast() {
    const result = this.data.getLast();
    this.data.removeLast();
    return result;
  }
}

const myDequeue = new Dequeue();
myDequeue.addLast('a');
myDequeue.addLast('b');
myDequeue.addLast('c');

console.log(myDequeue);
