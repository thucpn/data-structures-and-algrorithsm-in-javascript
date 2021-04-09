/**
 * Hiện thực Heap từ array
 */

class Heap {
  constructor(initArray, heapType) {
    this.heapType = heapType || 'maxHeap'; // default is maxHeap
    this.data = this._buildHeap(initArray);
  }

  top() {
    return this.data[0];
  } // O(1)

  get(index) {
    return this.data[index];
  } // O(1)

  search(value) {
    return this.data.indexOf(value);
  } // O(n)

  remove(index) {
    const result = this.data[index];

    // đổi thèn ở cuối mảng lên vị trí xoá
    this.data[index] = this.data[this.data.length - 1];
    this.data.pop();

    // dịch chuyển nó xuống dưới từ từ cho đúng thứ tự trong heap
    this._shiftDown(index);

    return result;
  } // O(logn)

  enqueue(value) {
    // thêm dữ liệu mới vào cuối mảng
    this.data.push(value);

    // dịch chuyển nó lên trên cho đúng thứ tự trong heap
    this._shiftUp(this.data.length - 1);

    return value;
  } // O(logn)

  dequeue() {
    return this.remove(0);
  } // O(logn)

  // thay đổi giá trị tại 1 vị trí
  update(index, newValue) {
    const oldValue = this.data[index];
    this.data[index] = newValue;

    // TH1: Trong max heap, ta ưu tiên phần tử có giá trị càng lớn càng tốt
    // Nếu giá trị mới lớn hơn giá trị cũ thì shiftUp lên trên
    // Nếu giá trị mới nhỏ hơn giá trị cũ thì shiftDown xuống dưới
    if (this.heapType === 'maxHeap') {
      if (newValue > oldValue) this._shiftUp(index);
      else this._shiftDown(index);
    }
    // TH2: Trong min heap, ta ưu tiên phần tử có giá trị càng nhỏ càng tốt
    // Nếu giá trị mới nhỏ hơn giá trị cũ thì shiftUp lên trên
    // Nếu giá trị mới lớn hơn giá trị cũ thì shiftDown xuống dưới
    else {
      if (newValue < oldValue) this._shiftUp(index);
      else this._shiftDown(index);
    }

    return newValue;
  } // O(logn)

  heapSort() {
    const temp = [...this.data];
    const newArray = [];

    while (this.data.length > 0) newArray.push(this.dequeue());

    this.data = temp;

    return newArray;
  } // O(nlogn)

  _buildHeap(array) {
    /**
     * PHÂN TÍCH
     *
     * Ta giả sử đầu vào là 1 array ngẫu nhiên: [7, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17]
     * Ta giả định đang xây dựng 1 maxHeap
     * Từ array trên ta vẽ được 1 Complete Binary Tree như sau
     *
     *               7
     *            /     \
     *          3         5
     *        /   \     /   \
     *       4     6   13   10
     *      / \   / \
     *     9   8 15 17
     *
     * - Ý tưởng của thuật toán là đi từ node cuối cùng lên node root (bottom up), tại mỗi node ta sẽ heapify cây con
     *    có root là node đó
     * - Heapify 1 cây con là việc chúng ta biến cây con thành 1 heap con bằng cách thực hiện các hoán đổi sao cho phần tử
     *    giá trị lớn nhất trong cây con lên làm root của cây con đó. Quá trình được đệ quy liên tục xuống các cây con của
     *    cây con đó.
     * - Chẳng hạn tại node 4, ta chuyển cây con tại đó thành 1 heap con như sau:
     *
     *         4                        9
     *       /   \        ==>         /   \
     *      9     8                  4     8
     *
     * - Ta nhận thấy, vì các leaf sẽ không có cây con nên ta không nhất thiết phải lặp hết từ cuối tới root mà chỉ
     *    cần loop từ internal node cuối cùng tới root
     *
     * - Một điều đặc biệt trong Complete Binary Tree: leaf cuối cùng sẽ có cha là internal node cuối cùng. Chẳng hạn,
     *    đối với tree trên thì leaf cuối cùng(17) có cha là internal node cuối cùng(6). Mặc khác, trong array, leaf
     *    cuối cùng có index: lastLeftIndex = n - 1. Từ đó theo công thức parent(index) = (index - 1) / 2 ta có index
     *    của internal node cuối cùng là: lastInternalNodeIndex = lastLeftIndex - 1 / 2 = (n-2)/2 = n/2 - 1. Đối với
     *    tree trên, lastLeftIndex = n - 1 = 11 - 1 = 10 -> lastInternalNodeIndex = 4
     *
     * 🏹 Tóm lại ta sẽ loop từ cuối lên đầu(từ lastInternalNode là 6 tới node root là 7). Tại mỗi node, ta sẽ heapify
     *      cây con có root là node đó. Chi phí lặp là O(n) và chi phí của 1 lần heapify là O(logn) -> chi phí của việc
     *      build heap từ array là O(nlogn)
     *
     * - Ngoài cách bottom up, ta cũng có thể top down. Tức là, đi từ root đầu tới cuối. Tại mỗi node, ta sẽ shiftUp
     *    (đẩy các node có giá trị lớn hơn lên trên)
     *
     * 🌟 Xem thêm về cách hiện thực heap tại: geeksforgeeks.org/building-heap-from-array
     */

    // Xác định vị trí của internal node cuối cùng
    const lastInternalNodeIndex = Math.floor(array.length / 2) - 1;

    // Loop từ lastInternalNodeIndex tới root và heapify tại mỗi node
    for (let i = lastInternalNodeIndex; i >= 0; i--) {
      if (this.heapType === 'minHeap') {
        this._heapifyMin(array, i);
      } else {
        this._heapifyMax(array, i);
      }
    }

    return array;
  } // O(nlogn)

  _heapifyMax(arr, i) {
    // xác định vị trí của node hiện tại và các node trái phải của node trong mảng
    let largestIndex = i;
    let leftIndex = this._leftIndex(i);
    let rightIndex = this._rightIndex(i);

    // xác định vị trí của node có giá trị lớn nhất trong 3 node
    if (leftIndex < arr.length && arr[largestIndex] < arr[leftIndex]) largestIndex = leftIndex;
    if (rightIndex < arr.length && arr[largestIndex] < arr[rightIndex]) largestIndex = rightIndex;

    // Điểm dừng: nếu node có giá trị lớn nhất là node hiện tại rồi thì end
    if (i === largestIndex) return;

    // Hoán đổi node hiện tại với node có giá trị lớn nhất
    this._swap(arr, i, largestIndex);

    // Đệ quy xuống các cây con bên dưới
    this._heapifyMax(arr, largestIndex);
  } // O(logn)

  _heapifyMin(arr, i) {
    // xác định vị trí của node hiện tại và các node trái phải của node trong mảng
    let smallestIndex = i;
    let leftIndex = this._leftIndex(i);
    let rightIndex = this._rightIndex(i);

    // xác định vị trí của node có giá trị nhỏ nhất trong 3 node
    if (leftIndex < arr.length && arr[smallestIndex] > arr[leftIndex]) smallestIndex = leftIndex;
    if (rightIndex < arr.length && arr[smallestIndex] > arr[rightIndex]) smallestIndex = rightIndex;

    // Điểm dừng: nếu node có giá trị nhỏ nhất là node hiện tại rồi thì end
    if (i === smallestIndex) return;

    // Hoán đổi node hiện tại với node có giá trị nhỏ nhất
    this._swap(arr, i, smallestIndex);

    // Đệ quy xuống các cây con bên dưới
    this._heapifyMin(arr, smallestIndex);
  } // O(logn)

  // dịch chuyển phần ở vị trí index lên trên
  // đối với maxHeap, ta đẩy lên trên khi cha nhỏ hơn con
  // đối với minHeap, ta đẩy lên trên khi cha lớn hơn con
  // bản chất của shiftUp cũng chính là 1 cách heapify (khi phối hợp với việc loop từ trên xuống - top down)
  _shiftUp(index) {
    // TH1: heap là max heap
    if (this.heapType === 'maxHeap') {
      while (index > 0 && this.data[this._parentIndex(index)] < this.data[index]) {
        this._swap(this.data, index, this._parentIndex(index));
        index = this._parentIndex(index);
      }
    }
    // TH2: heap là min heap
    else {
      while (index > 0 && this.data[this._parentIndex(index)] > this.data[index]) {
        this._swap(this.data, index, this._parentIndex(index));
        index = this._parentIndex(index);
      }
    }
  } // O(logn)

  // shiftDown đẩy 1 node xuống vị trí phù hợp
  // bản chất của hàm shiftDown chính là cách heapify (khi phối hợp với việc loop từ dưới lên - bottom up)
  _shiftDown(index) {
    // TH1: heap là max heap
    if (this.heapType === 'maxHeap') {
      this._heapifyMax(this.data, index);
    }
    // TH2: heap là min heap
    else {
      this._heapifyMin(this.data, index);
    }
  } // O(logn)

  // trả về index của cha
  _parentIndex(index) {
    return Math.floor((index - 1) / 2);
  } // O(1);

  // trả về index của con bên trái
  _leftIndex(index) {
    return index * 2 + 1;
  } // O(1);

  // trả về index của con bên phải
  _rightIndex(index) {
    return index * 2 + 2;
  } // O(1);

  _swap(arr, oldIndex, newIndex) {
    const temp = arr[oldIndex];
    arr[oldIndex] = arr[newIndex];
    arr[newIndex] = temp;
  } // O(1)
}

const myHeap = new Heap([7, 3, 5, 4, 6, 13, 10, 9, 8, 15, 17], 'maxHeap');
console.log(myHeap.data);

myHeap.remove(2);

console.log(myHeap.data);
