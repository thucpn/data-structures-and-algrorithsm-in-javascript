/**
 * Hiện thực hoá undirected graph theo phương pháp adjacent list
 */

const LinkedQueue = require('../ds5-queue/LinkedQueue');
const ArrayStack = require('../ds4-stack/ArrayStack');

class Graph {
  constructor() {
    this.numberOfNodes = 0;
    this.adjacentList = {};
  }

  addVertex(node) {
    this.adjacentList[node] = [];
    this.numberOfNodes++;
  }

  addEdge(node1, node2) {
    this.adjacentList[node1].push(node2);
    this.adjacentList[node2].push(node1);
  }

  showConnections() {
    const allNodes = Object.keys(this.adjacentList);
    for (let node of allNodes) {
      let nodeConnections = this.adjacentList[node];
      let connections = '';
      let vertex;
      for (vertex of nodeConnections) {
        connections += vertex + ' ';
      }
      console.log(node + '-->' + connections);
    }
  }

  /**
   * Phân tích độ phức tạp
   * 1> kiểm tra queue      : if(myQueue.size() > 0)
   *  + số lần kiểm tra queue tương ứng với kích thước tối đa của queue
   *  + mà kích thước tối đa của queue là V (số đỉnh)
   *  + vậy số thao tác ~ V
   * 2> kiểm tra visited    : if(!visited[el])
   *  + số lần kiểm tra visited bằng tổng số siblings của tất cả các đỉnh
   *  + mà tổng số siblings của tất cả các đỉnh chính là 2 tổng số cạnh của đồ thị
   *  + vậy số thao tác ~ 2E
   *
   * ===> Từ đó suy ra BigO ~ O(V+2E) = O(V+E)
   */
  breadFirstTraversal(start) {
    const myQueue = new LinkedQueue();
    const visited = {};

    myQueue.enqueue(start);

    while (myQueue.size() > 0) {
      const visit = myQueue.dequeue();
      console.log(visit);
      visited[visit] = true;

      const siblings = this.adjacentList[visit];

      siblings.forEach((el) => {
        if (!visited[el]) {
          visited[el] = true;
          myQueue.enqueue(el);
        }
      });
    }

    return null;
  } // O(V + E)

  /**
   * Phân tích độ phức tạp
   * 1> kiểm tra stack      : if(myStack.size() > 0)
   *  + số lần kiểm tra stack tương ứng với kích thước tối đa của stack
   *  + mà kích thước tối đa của stack là V (số đỉnh)
   *  + vậy số thao tác ~ V
   * 2> kiểm tra visited    : if(!visited[el])
   *  + số lần kiểm tra visited bằng tổng số childrens của tất cả các đỉnh
   *  + mà tổng số childrens của tất cả các đỉnh chính là 2 tổng số cạnh của đồ thị
   *  + vậy số thao tác ~ 2E
   *
   * ===> Từ đó suy ra BigO ~ O(V+2E) = O(V+E)
   */
  depthFirstTraversal(start) {
    const myStack = new ArrayStack();
    const visited = {};

    myStack.push(start);

    while (myStack.size() > 0) {
      const visit = myStack.pop();
      console.log(visit);
      visited[visit] = true;

      const childrens = this.adjacentList[visit];

      for (let i = childrens.length - 1; i >= 0; i--) {
        const el = childrens[i];

        if (!visited[el]) {
          visited[el] = true;
          myStack.push(el);
        }
      }
    } 

    return null;
  } // O(V+E)
}

var myGraph = new Graph();
// myGraph.addVertex('0');
// myGraph.addVertex('1');
// myGraph.addVertex('2');
// myGraph.addVertex('3');
// myGraph.addVertex('4');
// myGraph.addVertex('5');
// myGraph.addVertex('6');
// myGraph.addEdge('3', '1');
// myGraph.addEdge('3', '4');
// myGraph.addEdge('4', '2');
// myGraph.addEdge('4', '5');
// myGraph.addEdge('1', '2');
// myGraph.addEdge('1', '0');
// myGraph.addEdge('0', '2');
// myGraph.addEdge('6', '5');

myGraph.addVertex('A');
myGraph.addVertex('B');
myGraph.addVertex('C');
myGraph.addVertex('D');
myGraph.addVertex('E');
myGraph.addVertex('F');
myGraph.addVertex('G');
myGraph.addVertex('H');
myGraph.addVertex('I');
myGraph.addEdge('A', 'B');
myGraph.addEdge('A', 'C');
myGraph.addEdge('B', 'E');
myGraph.addEdge('B', 'G');
myGraph.addEdge('C', 'G');
myGraph.addEdge('C', 'D');
myGraph.addEdge('C', 'F');
myGraph.addEdge('H', 'F');
myGraph.addEdge('I', 'F');

// myGraph.showConnections();
console.log(myGraph);

// myGraph.breadFirstTraversal(1);
myGraph.depthFirstTraversal('A');
