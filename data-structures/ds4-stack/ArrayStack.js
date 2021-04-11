/**
 * Hiện thực hoá Stack bằng Array
 */

class ArrayStack {
  constructor() {
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  top() {
    return this.data[this.data.length - 1];
  }

  push(value) {
    this.data.push(value);
    return value;
  }

  pop() {
    const result = this.top();
    this.data.pop();

    return result;
  }
}

const myArrayStack = new ArrayStack();
myArrayStack.push('a');
myArrayStack.push('b');
myArrayStack.push('c');

// console.log(myArrayStack);

module.exports = ArrayStack;
