const BinaryTree = require('./BinaryTree');

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree extends BinaryTree {
  constructor() {
    super();
    this.size = 0;
  }

  // tận dụng thứ tự có sẵn của BinarySearchTree để tiếp cận node cần tìm nhanh chóng
  search(value) {
    if (!this.root) return;

    let curNode = this.root;
    while (curNode) {
      if (value < curNode.value) {
        curNode = curNode.left;
      } else if (value > curNode.value) {
        curNode = curNode.right;
      } else {
        return curNode;
      }
    }

    return null;
  } // O(logn)

  add(value) {
    this.size++;

    const newNode = new Node(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let curNode = this.root;
    while (true) {
      if (value < curNode.value) {
        if (!curNode.left) {
          curNode.left = newNode;
          newNode.parent = curNode;
          return;
        }
        curNode = curNode.left;
      } else {
        if (!curNode.right) {
          curNode.right = newNode;
          newNode.parent = curNode;
          return;
        }
        curNode = curNode.right;
      }
    }
  } // O(logn)

  /**
   * Xoá 1 node ra khỏi BinarySearchTree thực chất là thay thế node bị xoá bằng 1 node descendant của nó
   * Lưu ý: removeNode.left < [removeNode] < removeNode.right.left < removeNode.right
   * Gọi node sẽ bị xoá là removeNode. Ta chia ra 3 trường hợp:
   * TH1: removeNode không có con bên phải
   *
   *    Ex: removeNode = 5 không có con bên phải
   *
   *             10
   *            /
   *          [5]
   *         /
   *        1
   *       / \
   *     ... ...
   *
   *  -> removeNode = 5 sẽ được thay thế bằng removeNode.left = 1
   *
   * TH2: removeNode có con bên phải và con bên phải không có con bên trái
   *
   *    Ex: removeNode = 5 có con bên phải là node9 và node này không có con bên trái
   *
   *             10
   *            /
   *          [5]
   *         /   \
   *        1     9
   *       / \     \
   *     ... ...   ...
   *
   *  -> removeNode = 5 sẽ được thay thế bằng removeNode.right = 9
   *
   * TH3: removeNode có con bên phải và con bên phải có con bên trái
   *
   *    Ex: removeNode = 5 có con bên phải là node9 và node này có con bên trái là node8
   *
   *             10
   *            /
   *          [5]
   *        /     \
   *       1       9
   *      / \     / \
   *    ... ...  8  ...
   *            /
   *           6
   *
   *  -> removeNode = 5 sẽ được thay thế bằng removeNode.right.mostLeft = 6
   *      (mostLeft là node nằm bên trái nhất của cây con có root là node9)
   *
   *  >> Sau khi xác định được replaceNode, xoá các liên kết tới removeNode và thành lập các liên kết cho replaceNode
   */

  remove(value) {
    let removeNode = this.search(value);
    if (!removeNode) return;

    this.size--;

    // parent of removeNode
    const parentNode = removeNode.parent;

    // check to see position of removeNode is right of parentNode or left of parentNode
    const rmNodePos = removeNode.value > parentNode.value ? 'right' : 'left';

    // find replaceNode
    let replaceNode;

    // TH1: removeNode không có con bên phải
    if (!removeNode.right) replaceNode = removeNode.left;
    // TH2: removeNode có con bên phải và con bên phải không có con bên trái
    else if (removeNode.right && !removeNode.right.left) {
      replaceNode = removeNode.right;

      const removeNode_left = removeNode.left;
      if (removeNode_left) {
        replaceNode.left = removeNode_left;
        removeNode_left.parent = replaceNode;
      }
    }
    // TH3: removeNode có con bên phải và con bên phải có con bên trái
    else if (removeNode.right && removeNode.right.left) {
      replaceNode = this._leftMost(removeNode);

      const removeNode_left = removeNode.left;
      if (removeNode_left) {
        replaceNode.left = removeNode_left;
        removeNode_left.parent = replaceNode;
      }

      const removeNode_right = removeNode.right;
      if (removeNode_right) {
        replaceNode.right = removeNode_right;
        removeNode_right.parent = replaceNode;
      }

      replaceNode.parent.left = null;
    }

    if (!parentNode) {
      this.root = replaceNode;
    } else {
      parentNode[rmNodePos] = replaceNode;
      replaceNode.parent = removeNode.parent;
    }

    removeNode = null;

    return replaceNode;
  } // O(logn)

  // node nằm bên trái nhất của cây
  _leftMost(root) {
    let curNode = root;
    while (curNode.left) {
      curNode = curNode.left;
    }
    return curNode;
  }
}

const bst = new BinarySearchTree();
bst.add(10);
bst.add(5);
bst.add(1);
bst.add(8);
bst.add(9);
bst.add(7);
bst.add(6);

bst.remove(5);

// console.log(bst.root.left);
// console.log(JSON.stringify(bst))
// bst.breadthFirstTraversal();
// bst.preorderTraversal(bst.root);
// bst.inorderTraversal(bst.root);
// bst.postorderTraversal(bst.root);
// console.log(bst.search(100))

bst.inorderTraversal(bst.root);
