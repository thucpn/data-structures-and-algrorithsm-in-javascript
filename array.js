/**
 * Hiện thực hoá array bằng object trong js
 */
class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  /* main methods */
  get(index) {
    return this.data[index];
  } // O(1)

  search(value) {
    for (let i = 0; i <= this.length - 1; i++) {
      if (this.data[i] === value) {
        return i;
      }
    }
    return -1;
  } // O(n)

  add(value, index) {
    if (index < 0 || index > this.length) return;

    this._shiftRight(index);
    this.data[index] = value;
  } // O(n)

  remove(index) {
    if (index < 0 || index > this.length) return;

    this._shiftLeft(index);
    delete this.data[this.length];
  } // O(n)

  addFirst(value) {
    this.add(value, 0);
  }

  addLast(value) {
    this.length++;
    this.data[this.length - 1] = value;
  }

  removeFirst() {
    this.remove(0);
  }

  removeLast() {
    delete this.data[this.length - 1];
    this.length--;
  }

  /* helper methods */
  _shiftRight(index) {
    this.length++;
    for (let i = this.length - 1; i >= index; i--) {
      this.data[i] = this.data[i - 1];
    }
  } // O(n)

  _shiftLeft(index) {
    this.length--;
    for (let i = index; i <= this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
  } // O(n)
}

// demo execution
const myArray = new MyArray();
myArray.add('a', 0);
myArray.add('b', 1);
myArray.add('c', 2);
myArray.add('d', 3);
myArray.add('e', 4);

myArray.removeLast();

console.log(myArray);
