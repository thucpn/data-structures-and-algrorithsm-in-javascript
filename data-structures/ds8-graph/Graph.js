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

  /**
   * - Ý tưởng của thuật toán: muốn tìm đường đi ngắn nhất từ m -> n, ta tìm đường đi ngắn nhất từ
   *    m đến n - 1 rồi cộng với đường ngắn nhất từ n - 1 tới m (m -> n - 1 -> n)
   * - Do đó, thuật toán sẽ duyệt và cập nhật các giá trị khoảng cách sao cho khoảng cách từ node đó đến
   *    node start là nhỏ nhất
   * - Lưu ý: graph truyền vào là 1 đồ thị có trọng số được biểu diễn dưới dạng matrix
   * - Tham khảo luồng đi của thuật toán: geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/
   */
  dijkstra(graph, start) {
    // tìm node đang có giá trị khoảng cách nhỏ nhất trong đồ thị
    const nearestSiblingIndex = (distances, visited) => {
      let min = Infinity;
      let minIndex = -1;

      for (let i = 0; i < distances.length; i++) {
        if (!visited[i] && distances[i] <= min) {
          min = distances[i];
          minIndex = i;
        }
      }

      return minIndex;
    };

    // init value
    const length = graph.length;
    const distances = [];
    const visited = [];

    for (let i = 0; i < length; i++) {
      distances[i] = Infinity;
      visited[i] = false;
    }

    distances[start] = 0;

    // lặp length - 1 lần, mỗi lần lặp cập nhật lại khoảng cách của các node
    for (let count = 0; count < length - 1; count++) {
      // tìm node gần nhất mà chưa nằm trong danh sách
      const nearestIndex = nearestSiblingIndex(distances, visited);

      // visit node đó
      visited[nearestIndex] = true;

      // update giá trị khoảng cách cho các node siblings của node vừa visit.
      // lưu ý: chỉ update nếu :
      //          + node đó là sibling với node vừa visit
      //          + node đó chưa visited
      //          + giá trị cập nhật nhỏ hơn giá trị khoảng cách tại node đó
      for (let v = 0; v < length; v++) {
        if (
          graph[nearestIndex][v] !== 0 &&
          !visited[v] &&
          distances[nearestIndex] + graph[nearestIndex][v] < distances[v]
        ) {
          distances[v] = distances[nearestIndex] + graph[nearestIndex][v];
        }
      }
    }

    // Print solution
    distances.forEach((dist, index) => console.log(index + ' \t\t ' + dist));
  } // O(V^2) [tuy nhiên, nếu dùng adjacent list thì BigO = O(ElogV)]

  /**
   * - Ý tưởng thuật toán là lặp qua hết tất cả trường hợp để cập nhật lại độ dài
   *    + Giả sử Min là độ dài nhỏ nhất từ I->J
   *    + Nếu ta tìm được 1 điểm K sao cho I->K + K->J < Min thì ta sẽ cập nhật lại Min = IK + KJ
   * - Tham khảo luồng đi của thuật toán: geeksforgeeks.org/floyd-warshall-algorithm-dp-16/
   */
  floyd(graph) {
    const length = graph.length;
    const distances = [];

    // clone data từ graph -> distances
    for (let i = 0; i < length; i++) {
      distances.push([]);
      for (let j = 0; j < length; j++) {
        distances[i].push(graph[i][j]);
      }
    }

    // lặp cập nhật lại khoảng cách nhỏ nhất
    for (let k = 0; k < length; k++) {
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          // nếu độ dài đường gấp khúc IKJ < khoảng cách hiện tại từ I đến J hay không
          // nếu có thì cập nhật lại khoảng cách từ I->J
          if (distances[i][k] + distances[k][j] < distances[i][j])
            distances[i][j] = distances[i][k] + distances[k][j];
        }
      }
    }

    // print solution
    console.log(distances);
  }

  /**
   * Ý tưởng của thuật toán: Để tìm cây khung nhỏ nhất, ta cần tìm 1 cây khung sao cho tổng độ dài các cạnh
   *  nhỏ nhất. Muốn vậy thì độ dài của từng cạnh phải nhỏ nhất có thể. Độ dài của 1 cạnh nhỏ nhất khi nó là
   *  nhánh có độ dài nhỏ nhất trong các nhánh nối với node đó.
   */
  primMST(graph) {
    // Tìm index của node có label nhỏ nhất mà vẫn chưa visited
    const minLabelIndex = (labels, visited) => {
      let min = Infinity;
      let minIndex = -1;

      for (let i = 0; i < labels.length; i++) {
        if (!visited[i] && labels[i] <= min) {
          min = labels[i];
          minIndex = i;
        }
      }

      return minIndex;
    };

    // length of matrix
    const length = graph.length;

    // chứa thông tin của node cha nối với node hiện tại
    // chẳng hạn parent[1] = 0 tức là trong cây khung, node 1 được nối với node 0
    // parent[0] = -1 (vì node liền trước của node0 tồn tại)
    const parent = [];

    // chứa thông tin của các chỉ số của các node
    const labels = [];

    // chứa thông tin visited của các node
    const visited = [];

    // init value
    for (let i = 0; i < length; i++) {
      labels[i] = Infinity;
      visited[i] = false;
    }

    parent[0] = -1;
    labels[0] = 0;

    // lặp và cập nhật thông tin label tại mỗi node
    for (let count = 0; count < length - 1; count++) {
      const minIndex = minLabelIndex(labels, visited);
      visited[minIndex] = true;

      for (let v = 0; v < length; v++) {
        if (graph[minIndex][v] !== 0 && !visited[v] && graph[minIndex][v] < labels[v]) {
          parent[v] = minIndex;
          labels[v] = graph[minIndex][v];
        }
      }
    }

    // print solution
    for (let i = 1; i < length; i++) {
      const x = parent[i];
      const y = i;
      const d = graph[x][y];

      console.log(x + ' -> ' + y + '\t: distance = ' + d);
    }
  } // O(V^2)

  kruskalMST(graph) {
    // Util class to check cyclic
    class UnionFind {
      constructor(elements) {
        // Number of disconnected components
        this.count = elements.length;

        // Keep Track of connected components
        this.parent = {};

        // Initialize the data structure such that all
        // elements have themselves as parents
        elements.forEach((e) => (this.parent[e] = e));
      }

      union(a, b) {
        let rootA = this.find(a);
        let rootB = this.find(b);

        // Roots are same so these are already connected.
        if (rootA === rootB) return;

        // Always make the element with smaller root the parent.
        if (rootA < rootB) {
          if (this.parent[b] != b) this.union(this.parent[b], a);
          this.parent[b] = this.parent[a];
        } else {
          if (this.parent[a] != a) this.union(this.parent[a], b);
          this.parent[a] = this.parent[b];
        }
      }

      // Returns final parent of a node
      find(a) {
        while (this.parent[a] !== a) {
          a = this.parent[a];
        }
        return a;
      }

      // Checks connectivity of the 2 nodes
      connected(a, b) {
        return this.find(a) === this.find(b);
      }
    }

    // modified input
    const newGraph = [];

    for (let i = 0; i < graph.length; i++) {
      for (let j = i + 1; j < graph.length; j++) {
        if (graph[i][j] !== 0 && graph[i][j] !== Infinity) {
          newGraph.push({ src: i, dest: j, weight: graph[i][j] });
        }
      }
    }

    newGraph.sort((a, b) => a.weight - b.weight);

    // init
    const result = [];
    const vertexs = [];
    while (vertexs.length < graph.length) vertexs.push(vertexs.length); // [0,1,2,3,4,5,6,7,8]
    const uf = new UnionFind(vertexs);

    // loop và thêm cạnh sao cho không tạo cycle
    newGraph.forEach((el) => {
      if (!uf.connected(el.src, el.dest)) {
        uf.union(el.src, el.dest);
        result.push(el);
      }
    });

    // print result
    console.log(result);
  } // O(ELogV)
}

var myGraph = new Graph();

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
// console.log(myGraph);

// myGraph.breadFirstTraversal('A');
// myGraph.depthFirstTraversal('A');

////////////////////////////////////////
// test dijkstra & floyd & primMST

// input graph in matrix
// 0 là khoảng cách từ 1 điểm tới nó
// Infinity là giữa 2 vertex không có cạnh nối
const graphDemo = [
  [0, 4, Infinity, Infinity, Infinity, Infinity, Infinity, 8, Infinity],
  [4, 0, 8, Infinity, Infinity, Infinity, Infinity, 11, Infinity],
  [Infinity, 8, 0, 7, Infinity, 4, Infinity, Infinity, 2],
  [Infinity, Infinity, 7, 0, 9, 14, Infinity, Infinity, Infinity],
  [Infinity, Infinity, Infinity, 9, 0, 10, Infinity, Infinity, Infinity],
  [Infinity, Infinity, 4, 14, 10, 0, 2, Infinity, Infinity],
  [Infinity, Infinity, Infinity, Infinity, Infinity, 2, 0, 1, 6],
  [8, 11, Infinity, Infinity, Infinity, Infinity, 1, 0, 7],
  [Infinity, Infinity, 2, Infinity, Infinity, Infinity, 6, 7, 0],
];

// myGraph.dijkstra(graphDemo, 0);
// myGraph.floyd(graphDemo);
// myGraph.primMST(graphDemo);
// myGraph.kruskalMST(graphDemo);
