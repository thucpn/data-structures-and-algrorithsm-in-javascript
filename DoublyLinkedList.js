/**
 * Hiện thực hoá Doubly Linked List bằng Object trong JS
 */

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  get(index) {
    if (this._isEmpty() || index > this.length - 1 || index < 0) return null;

    if (index < this.length / 2) {
      let curNode = this.head;
      let count = index;
      while (count > 0) {
        curNode = curNode.next;
        count--;
      }

      return curNode;
    } else {
      let curNode = this.tail;
      let count = this.length - 1 - index;
      while (count > 0) {
        curNode = curNode.prev;
        count--;
      }

      return curNode;
    }
  } // O(n) (<= O(n/2))

  getFirst() {
    if (this._isEmpty()) return null;
    return this.head;
  } // O(1)

  getLast() {
    if (this._isEmpty()) return null;
    return this.tail;
  } // O(1)

  traversal() {
    let result = [];

    let curNode = this.head;
    let count = this.length - 1;
    while (count >= 0) {
      result.push(curNode.value);
      curNode = curNode.next;
      count--;
    }

    return result;
  } // O(n)

  search(value) {
    let curNode = this.head;
    let count = this.length - 1;
    while (count >= 0) {
      if (curNode.value === value) return curNode;
      curNode = curNode.next;
      count--;
    }

    return null;
  } // O(n)

  add(value, index) {
    if (index > this.length || index < 0) return;
    if (this._isEmpty() || index === 0) {
      this.addFirst(value);
      return;
    }
    if (index === this.length) {
      this.addLast(value);
      return;
    }

    const newNode = new Node(value);
    const beforeNode = this.get(index - 1);
    const curNode = beforeNode.next;

    newNode.next = curNode;
    curNode.prev = newNode;
    beforeNode.next = newNode;
    newNode.prev = beforeNode;

    this.length++;
  } // O(n) (<= O(n/2))

  addFirst(value) {
    const newNode = new Node(value);

    if (this._isEmpty()) {
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
    }

    this.head = newNode;
    this.length++;
  } // O(1)

  addLast(value) {
    const newNode = new Node(value);

    if (this._isEmpty()) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    }

    this.tail = newNode;
    this.length++;
  } // O(1)

  remove(index) {
    if (this._isEmpty() || index > this.length - 1 || index < 0) return;
    if (this.length === 1) {
      this.head = this.tail = null;
      return;
    }
    if (index === 0) {
      this.removeFirst();
      return;
    }
    if (index === this.length - 1) {
      this.removeLast();
      return;
    }

    const beforeNode = this.get(index - 1);
    const removeNode = beforeNode.next;
    const afterNode = removeNode.next;

    beforeNode.next = removeNode.next;
    afterNode.prev = removeNode.prev;

    this.length--;
  } // O(n) (<= O(n/2))

  removeFirst() {
    if (this._isEmpty()) return;
    if (this.length === 1) {
      this.head = this.tail = null;
      return;
    }

    this.head.next.prev = null;
    this.head = this.head.next;
    this.length--;
  } // O(1)

  removeLast() {
    if (this._isEmpty()) return;
    if (this.length === 1) {
      this.head = this.tail = null;
      return;
    }

    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    this.length--;
  } // O(1)

  _isEmpty() {
    return this.length === 0;
  } // O(1)
}

const myDLL = new DoublyLinkedList();
myDLL.addLast('a');
myDLL.addLast('b');
myDLL.addLast('c');

console.log(myDLL);
