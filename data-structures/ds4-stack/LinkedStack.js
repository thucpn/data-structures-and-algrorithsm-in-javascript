/**
 * Hiện thực hoá Stack bằng LinkedList
 */

 const SinglyLinkedList = require('../ds3-linkedlist/SinglyLinkedList');

 class LinkedStack {
   constructor() {
     this.data = new SinglyLinkedList();
   }
 
   top() {
     return this.data.head.value;
   }
 
   push(value) {
     this.data.addFirst(value);
     return value;
   }
 
   pop() {
     const result = this.top();

     this.data.removeFirst();

     return result;
   }
 }
 
 const myLinkedStack = new LinkedStack();
 myLinkedStack.push('a');
 myLinkedStack.push('b');
 myLinkedStack.push('c');
 
 console.log(myLinkedStack);
 