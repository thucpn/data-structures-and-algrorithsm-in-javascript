/**
 * Implement BinaryTree
 */

const LinkedQueue = require('../ds5-queue/LinkedQueue');

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;

    // 1 tham chiếu phụ đến node cha để tiện cho việc xoá sau này
    this.parent = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // sử dụng đệ quy để tìm kiếm height
  // height = Max(left-tree's height, right-tree's height) + 1
  getHeight(node) {
    if (node == null) return 0;

    let leftDepth = this.getHeight(node.left);
    let rightDepth = this.getHeight(node.right);

    if (leftDepth > rightDepth) return leftDepth + 1;
    return rightDepth + 1;
  } // O(n)

  addRoot(value) {
    this.root = new Node(value);
    return this.root;
  } // O(1)

  // Breadth First Traversal using Queue
  // Đưa các internal node vào hàng đợi theo thứ tự từ trên xuống dưới, từ trái qua phải
  breadthFirstTraversal() {
    const myQueue = new LinkedQueue();
    myQueue.enqueue(this.root);

    while (myQueue.size() > 0) {
      const node = myQueue.dequeue();

      if (node.left) myQueue.enqueue(node.left);
      if (node.right) myQueue.enqueue(node.right);

      this._visit(node);
    }
  } // O(n)

  // Preorder Traversal using recursion
  // Print thông tin của node cha trước khi đào sâu xuống các node con
  preorderTraversal(node) {
    if (!node) return;

    this._visit(node);
    this.preorderTraversal(node.left);
    this.preorderTraversal(node.right);
  } // O(n)

  // Inorder Traversal using recursion
  // Đào sâu bên trái -> Print thông tin node -> Đào sâu bên phải
  inorderTraversal(node) {
    if (!node) return;

    this.inorderTraversal(node.left);
    this._visit(node);
    this.inorderTraversal(node.right);
  } // O(n)

  // Postorder Traversal using recursion
  // Đào sâu xuống các node con rồi mới print thông tin của Node cha
  postorderTraversal(node) {
    if (!node) return;

    this.postorderTraversal(node.left);
    this.postorderTraversal(node.right);
    this._visit(node);
  } // O(n)

  _visit(node) {
    console.log(node.value);
  }
}

const myBinaryTree = new BinaryTree();
myBinaryTree.addRoot('A');

const root = myBinaryTree.root;
const nodeB = new Node('B');
const nodeC = new Node('C');
const nodeD = new Node('D');
const nodeE = new Node('E');
const nodeG = new Node('G');

// add nodeB to left of root
root.left = nodeB;
nodeB.parent = root;

// add nodeC to right of root
root.right = nodeC;
nodeC.parent = root;

// add nodeD to left of nodeB
nodeB.left = nodeD;
nodeD.parent = nodeB;

// add nodeE to right of nodeB
nodeB.right = nodeE;
nodeE.parent = nodeB;

// add nodeG to left of nodeC
nodeC.left = nodeG;
nodeG.parent = nodeC;

// console.log(myBinaryTree);
// console.log(myBinaryTree.getHeight(myBinaryTree.root));
// myBinaryTree.breadthFirstTraversal();
// myBinaryTree.preorderTraversal(myBinaryTree.root);
// myBinaryTree.inorderTraversal(myBinaryTree.root);
// myBinaryTree.postorderTraversal(myBinaryTree.root);

module.exports = BinaryTree;
