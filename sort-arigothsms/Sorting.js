/**
 * Hiện thực hoá các giải thuật sort:
 * > Bubble sort
 * > Selection sort
 * > Insertion sort
 * > Merge sort
 * > Quick sort
 * > Heap sort
 */

const swap = (array, x, y) => {
  const temp = array[x];
  array[x] = array[y];
  array[y] = temp;
}; // O(1)

////////////////////////
// BUBBLE SORT

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    // đi từ đầu tới cuối, nếu 2 phần tử kề nhau bị ngược thứ tự thì đổi chỗ của chúng cho nhau
    // sau lần lặp đầu tiên, phần tử lớn nhất sẽ về cuối
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) swap(array, j, j + 1);
    }
  }
}; // O(n^2)

////////////////////////
// SELECTION SORT

const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    // mỗi lần lặp, chọn ra phần tử có giá trị nhỏ nhất và đưa lên đầu
    let minIndex = i;
    let min = arr[i];

    for (let j = i + 1; j < array.length; j++) {
      if (arr[j] < min) {
        minIndex = j;
        min = arr[j];
      }
    }

    swap(array, minIndex, i);
  }
}; // O(n^2)

////////////////////////
// INSERTION SORT

const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const cur = array[i];
    let curIndex = i;
    // tìm vị trí thích hợp để chèn phần tử vào
    while (cur < array[curIndex - 1]) {
      swap(array, curIndex, curIndex - 1);
      curIndex--;
    }
  }
};

////////////////////////
// MERGE SORT

// gộp 2 mảng có thứ tự thành 1 mảng lớn có thứ tự
const merge = (arr1, arr2) => {
  const result = [];
  let curIndex1 = 0;
  let curIndex2 = 0;

  while (curIndex1 < arr1.length && curIndex2 < arr2.length) {
    const minArr1 = arr1[curIndex1];
    const minArr2 = arr2[curIndex2];

    if (minArr1 < minArr2) {
      result.push(minArr1);
      curIndex1++;
    } else {
      result.push(minArr2);
      curIndex2++;
    }
  }

  return result.concat(arr1.slice(curIndex1)).concat(arr2.slice(curIndex2));
}; // O(a + b)

const mergeSortRecursion = (array) => {
  if (array.length === 1) return array;

  // Chia array làm 2 phần
  const middle = Math.floor(array.length / 2);
  const leftArray = array.slice(0, middle);
  const rightArray = array.slice(middle);

  return merge(mergeSortRecursion(leftArray), mergeSortRecursion(rightArray));
}; // O(nlogn) [Có logn levels. Ở mỗi level, thao tác merge có bigO là n]

const mergeSort = (array) => {
  const newArray = mergeSortRecursion(array);
  for (let i = 0; i < array.length; i++) {
    array[i] = newArray[i];
  }
}; // O(nlogn)

////////////////////////
// QUICK SORT

const partition = (array, start, end) => {
  const pivot = array[end];

  // vị trí biên giới của bên nhỏ hơn, tiếp giáp với bên lớn hơn
  // ví dụ arr = [10, 30, 80, 90, 100, 70] và pivot = 70 thì border là 30 (borderIndex = 2)
  let borderIndex = start - 1;

  for (let curIndex = start; curIndex < end; curIndex++) {
    // nếu 1 phần tử nhỏ hơn pivot, bổ sung nó vào bên nhỏ và cập nhật lại chỉ số của borderIndex
    if (array[curIndex] < pivot) {
      borderIndex++;
      swap(array, borderIndex, curIndex);
    }
  }

  swap(array, borderIndex + 1, end);

  return borderIndex + 1;
}; // O(n)

const quickSortRecursion = (array, start, end) => {
  if (start >= end) return;

  const partitionIndex = partition(array, start, end);

  quickSortRecursion(array, start, partitionIndex - 1);
  quickSortRecursion(array, partitionIndex + 1, end);
}; // O(nlogn)

const quickSort = (array) => quickSortRecursion(array, 0, array.length - 1); // O(nlogn)

////////////////////////
// HEAP SORT

const heapifyMax = (arr, n, i) => {
  // xác định vị trí của node hiện tại và các node trái phải của node trong mảng
  let largestIndex = i;
  let leftIndex = i * 2 + 1;
  let rightIndex = i * 2 + 2;

  // xác định vị trí của node có giá trị lớn nhất trong 3 node
  if (leftIndex < n && arr[largestIndex] < arr[leftIndex]) largestIndex = leftIndex;
  if (rightIndex < n && arr[largestIndex] < arr[rightIndex]) largestIndex = rightIndex;

  // Điểm dừng: nếu node có giá trị lớn nhất là node hiện tại rồi thì end
  if (i === largestIndex) return;

  // Hoán đổi node hiện tại với node có giá trị lớn nhất
  swap(arr, i, largestIndex);

  // Đệ quy xuống các cây con bên dưới
  heapifyMax(arr, n, largestIndex);
}; // O(logn)

const buildHeap = (array) => {
  const lastInternalNodeIndex = Math.floor(array.length / 2) - 1;

  // Loop từ lastInternalNodeIndex tới root và heapify tại mỗi node
  for (let i = lastInternalNodeIndex; i >= 0; i--) {
    heapifyMax(array, array.length, i);
  }

  return array;
}; // O(nlogn)

const heapSort = (array) => {
  let newArray = buildHeap(array);

  for (let i = newArray.length - 1; i > 0; i--) {
    swap(newArray, i, 0);
    heapifyMax(newArray, i, 0);
  }
}; // O(nlogn)

// DEMO EXECUTION
const arr = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

// bubbleSort(arr);
// selectionSort(arr);
// insertionSort(arr);
// heapSort(arr);
// mergeSort(arr);
quickSort(arr);

console.log(arr);
