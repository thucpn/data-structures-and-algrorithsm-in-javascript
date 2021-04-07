/**
 * Hiện thực hoá Stack bằng Array
 */

class ArrayStack {
  constructor() {
    this.data = [];
  }

  top() {
    return this.data[this.data.length - 1];
  }

  push(value) {
    this.data.push(value);
  }

  pop() {
    this.data.pop();
  }
}

const myArrayStack = new ArrayStack();
myArrayStack.push('a');
myArrayStack.push('b');
myArrayStack.push('c');

console.log(myArrayStack);
