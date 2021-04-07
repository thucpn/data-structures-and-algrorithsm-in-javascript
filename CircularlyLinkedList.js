/**
 * Hiện thực hoá Circularly Linked List bằng Object trong JS
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class CircularlyLinkedList {
  constructor() {
    this.tail = null;
    this.length = 0;
  }

  get(index) {
    if (this._isEmpty() || index > this.length - 1 || index < 0) return null;

    let curNode = this.tail.next;
    let count = index;
    while (count > 0) {
      curNode = curNode.next;
      count--;
    }

    return curNode;
  } // O(n)

  getFirst() {
    if (this._isEmpty()) return null;
    return this.tail.next;
  } // O(1)

  getLast() {
    if (this._isEmpty()) return null;
    return this.tail;
  } // O(1)

  traversal() {
    let result = [];

    let curNode = this.tail.next;
    let count = this.length - 1;
    while (count >= 0) {
      result.push(curNode.value);
      curNode = curNode.next;
      count--;
    }

    return result;
  } // O(n)

  search(value) {
    let curNode = this.tail.next;
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
    beforeNode.next = newNode;

    this.length++;
  } // O(n)

  addFirst(value) {
    const newNode = new Node(value);

    if (this._isEmpty()) {
      this.tail = newNode;
      this.tail.next = this.tail;
    } else {
      newNode.next = this.tail.next;
      this.tail.next = newNode;
    }

    this.length++;
  } // O(1)

  addLast(value) {
    this.addFirst(value);

    if (!this._isEmpty() && this.length > 1) {
      this.tail = this.tail.next;
    }
  } // O(1)

  remove(index) {
    if (this._isEmpty() || index > this.length - 1 || index < 0) return;
    if (this.length === 1) {
      this.tail = null;
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
    beforeNode.next = removeNode.next;

    this.length--;
  } // O(n)

  removeFirst() {
    if (this._isEmpty()) return;
    if (this.length === 1) {
      this.tail = null;
      return;
    }

    this.tail.next = this.tail.next.next;
    this.length--;
  } // O(1)

  removeLast() {
    if (this._isEmpty()) return;
    if (this.length === 1) {
      this.tail = null;
      return;
    }

    const almostLastNode = this.get(this.length - 2);
    almostLastNode.next = this.tail.next;
    this.tail = almostLastNode;
    this.length--;
  } // O(n)

  rotate() {
    if (!this._isEmpty() && this.length > 1) {
      this.tail = this.tail.next;
    }
  } // O(1)

  _isEmpty() {
    return this.length === 0;
  } // O(1)
}

const myCLL = new CircularlyLinkedList();
myCLL.addLast('a');
myCLL.addLast('b');
myCLL.addLast('c');

console.log(myCLL);
console.log(myCLL.search('c'));
