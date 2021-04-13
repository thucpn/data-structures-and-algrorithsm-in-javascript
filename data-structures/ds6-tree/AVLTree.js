/**
 * Hiện thực cây nhị phân tìm kiếm cân bằng (cây AVL) trong JS
 */

class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
    this.height = 1;
  }
}

/**
 * Cân bằng cây AVL
 *
 *  > TH1: Left Left
 *
 *             z                                      y
 *            / \                                   /   \
 *           y   T4      Right Rotate (z)          x      z
 *          / \          - - - - - - - - ->      /  \    /  \
 *         x   T3                               T1  T2  T3  T4
 *        / \
 *      T1   T2
 *
 *  > TH2: Left Right
 *
 *             z                                  z                                x
 *            / \                               /   \                           /     \
 *           y   T4      Left Rotate (y)       x    T4    Right Rotate(z)      y       z
 *          / \         - - - - - - - - ->    /  \        - - - - - - - ->    / \     / \
 *        T1   x                             y    T3                        T1   T2  T3  T4
 *            / \                           / \
 *          T2   T3                       T1   T2
 *
 *  > TH3: Right Right
 *              z                                y
 *             /  \                            /   \
 *            T1   y     Left Rotate(z)       z      x
 *                /  \   - - - - - - - ->    / \    / \
 *              T2    x                     T1  T2 T3  T4
 *                   / \
 *                  T3  T4
 *
 *  > TH4: Right Left
 *                z                                 z                                  x
 *               / \                               / \                              /    \
 *             T1   y      Right Rotate (y)      T1   x     Left Rotate(z)         z      y
 *                 / \     - - - - - - - - ->        / \    - - - - - - - ->      / \    / \
 *               x   T4                            T2   y                       T1  T2  T3  T4
 *              / \                                   /  \
 *            T2   T3                                T3   T4
 */
class AVLTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  add(value) {
    /*** Step1: Normal insert ***/
    const newNode = new Node(value); // init newNode
    const ancestors = []; // init array to contain ancestors of newNode

    if (!this.root) {
      this.root = newNode;
      this.size++;
      return;
    }

    let curNode = this.root;
    while (true) {
      ancestors.push(curNode);

      if (value < curNode.value) {
        if (!curNode.left) {
          curNode.left = newNode;
          this.size++;
          break;
        }
        curNode = curNode.left;
      } else if (value > curNode.value) {
        if (!curNode.right) {
          curNode.right = newNode;
          this.size++;
          break;
        }
        curNode = curNode.right;
      } else {
        return; // return when input duplicate
      }
    }

    /*** Step2: Update height of ancestors ***/
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const cur = ancestors[i];
      cur.height = this._max(this._getHeight(cur.left), this._getHeight(cur.right)) + 1;
    }

    /*** Step3: Rotate  ***/
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const parent = ancestors[i - 1];
      const cur = ancestors[i];
      const balanceFactor = this._getBalanceFactor(cur);

      // left left case
      if (balanceFactor > 1 && value < cur.left.value) {
        const z = cur;
        const y = z.left;

        this._rightRotate(z);
        parent.left = y;

        return;
      }

      // left right case
      if (balanceFactor > 1 && value > cur.left.value) {
        const z = cur;
        const y = z.left;
        const x = y.right;

        this._leftRotate(y);
        z.left = x;

        this._rightRotate(z);
        parent.left = x;

        return;
      }

      // right right case
      if (balanceFactor < -1 && value > cur.right.value) {
        const z = cur;
        const y = z.right;

        this._leftRotate(z);
        parent.right = y;
        return;
      }

      // right left case
      if (balanceFactor < -1 && value < cur.right.value) {
        const z = cur;
        const y = z.right;
        const x = y.left;

        this._rightRotate(y);
        z.right = x;

        this._leftRotate(z);
        parent.right = x;

        return;
      }
    }
  } // O(logn)

  /**
   * Right Rotation (tại y)
   *
   *           y                       x
   *          / \                     / \
   *         x   T3    ---R(y)-->   T1   y
   *        / \                         / \
   *      T1   T2                     T2   T3
   *
   *  - Right Rotation được sử dụng khi muốn làm cho cây từ "nghiêng qua trái" thành "nghiêng qua phải"
   *  - Các step:
   *      + Step 1: y xoay sang phải và trở thành right child của x
   *      + Step 2: right child hiện tại của x (T2) trở thành left child của y
   *  - Lưu ý: T1, T2, T3 là các cây con
   */
  _rightRotate(node, parentNode) {
    const y = node;
    const x = y.left;
    const T1 = x.left;
    const T2 = x.right;
    const T3 = y.right;

    // rotate
    x.right = y;
    y.left = T2;

    // update height
    y.height = this._max(this._getHeight(T2), this._getHeight(T3)) + 1;
    x.height = this._max(this._getHeight(T1), this._getHeight(y)) + 1;

    // return new top node (x)
    return x;
  } // O(1)

  /**
   * Left Rotation (tại y)
   *
   *           y                           x
   *          / \                         / \
   *        T1   x      ---L(y)-->       y   T3
   *            / \                     / \
   *          T2   T3                 T1   T2
   *
   *  - Left Rotation được sử dụng khi muốn làm cho cây từ "nghiêng qua phải" thành "nghiêng qua trái"
   *  - Các step:
   *      + Step 1: y xoay sang trái và trở thành left child của x
   *      + Step 2: left child hiện tại của x (T2) trở thành right child của y
   *  - Lưu ý: T1, T2, T3 là các cây con
   */
  _leftRotate(node) {
    const y = node;
    const x = y.right;
    const T1 = y.left;
    const T2 = x.left;
    const T3 = x.right;

    // rotate
    x.left = y;
    y.right = T2;

    // update height
    y.height = this._max(this._getHeight(T1), this._getHeight(T2)) + 1;
    x.height = this._max(this._getHeight(y), this._getHeight(T3)) + 1;

    // return new top node (x)
    return x;
  } // O(1)

  _getHeight(node) {
    return node ? node.height : 0;
  } // O(1)

  _getBalanceFactor(node) {
    return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
  } // O(1)

  _max(a, b) {
    return a > b ? a : b;
  } // O(1)

  _traversal(node) {
    if (!node) return;

    console.log(node.value);
    this._traversal(node.left);
    this._traversal(node.right);
  } // O(n)
}

const myAVLTree = new AVLTree();

myAVLTree.add(10);
myAVLTree.add(15);
myAVLTree.add(5);
myAVLTree.add(3);
myAVLTree.add(4);

myAVLTree._traversal(myAVLTree.root);
