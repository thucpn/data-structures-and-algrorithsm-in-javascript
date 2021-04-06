/**
 * Hiện thực HashTable (tích hợp Array để giải quyết Collision)
 */
class MyHashTable {
  constructor(size) {
    this.size = size;
    this.data = new Array(size);
  }

  // hash function
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }

  set(key, value) {
    const address = this._hash(key);
    if (!this.data[address]) {
      this.data[address] = [];
    }
    this.data[address].push([key, value]);
  } // O(1)

  get(key) {
    const address = this._hash(key);
    const bucket = this.data[address];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] == key) {
          return bucket[i][1];
        }
      }
    }
    return undefined;
  } // O(1) nếu không có collistion

  delete(key) {
    const address = this._hash(key);
    const bucket = this.data[address];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] == key) {
          bucket.splice(i, 1);
        }
      }
    }
  } // O(1) nếu không có collistion

  keys() {
    const keysArray = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] && this.data[i].length > 0) {
        keysArray.push(this.data[i][0][0]);
      }
    }
    return keysArray;
  } // O(n)
}

const myHashTable = new MyHashTable(50);
myHashTable.set('apples', 9);
myHashTable.set('apples', 10);
myHashTable.set('grapes', 10000);
myHashTable.set('abc', 1);

myHashTable.delete('grapes');

console.log(myHashTable.data);
console.log(myHashTable.keys());
