/**
 * Hiện thực hoá Queue bằng Array
 */

class ArrayStack {
  constructor(capacity) {
    this.data = new Array(capacity);
    this.capacity = capacity;
    this.size = 0;
    this.topIndex = 0; // index of current front element
  }

  top() {
    return this.data[this.topIndex];
  }

  enqueue(value) {
    if (this._isFull()) return;

    const nextIndex = (this.topIndex + this.size) % this.capacity;
    this.data[nextIndex] = value;
    this.size++;

    return value;
  }

  dequeue() {
    if (this._isEmpty()) return;

    const result = this.top();

    this.data[this.topIndex] = null;
    this.topIndex = (this.topIndex + 1) % this.capacity;
    this.size--;

    return result;
  }

  _isEmpty() {
    return this.size === 0;
  }

  _isFull() {
    return this.size === this.capacity;
  }
}

const myArrayStack = new ArrayStack(10);
myArrayStack.enqueue('a');
myArrayStack.enqueue('b');
myArrayStack.enqueue('c');
myArrayStack.enqueue('d');

myArrayStack.dequeue();
myArrayStack.dequeue();

myArrayStack.enqueue('x');
myArrayStack.enqueue('y');

myArrayStack.dequeue();

console.log(myArrayStack);
console.log(myArrayStack.top());
