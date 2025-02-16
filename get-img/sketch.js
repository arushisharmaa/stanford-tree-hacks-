```javascript
let nodes = [];
let edges = [];

function setup() {
  createCanvas(800, 400);
  textSize(16);
  
  // Initial linked list: A -> B -> C -> D
  nodes.push(new Node('A', 100, 200));
  nodes.push(new Node('B', 200, 200));
  nodes.push(new Node('C', 300, 200));
  nodes.push(new Node('D', 400, 200, true)); // Tail node

  // Edges for initial linked list
  edges.push(new Edge(nodes[0], nodes[1]));
  edges.push(new Edge(nodes[1], nodes[2]));
  edges.push(new Edge(nodes[2], nodes[3]));

  // Insert E after C
  let nodeE = new Node('E', 350, 250);
  nodes.push(nodeE);
  edges.push(new Edge(nodes[2], nodeE)); // C -> E
  edges.push(new Edge(nodeE, nodes[3])); // E -> D
}

function draw() {
  background(255);
  
  // Draw edges
  for (let edge of edges) {
    edge.display();
  }
  
  // Draw nodes
  for (let node of nodes) {
    node.display();
  }
}

class Node {
  constructor(value, x, y, isTail = false) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.isTail = isTail;
  }
  
  display() {
    stroke(0);
    fill(255);
    if (this.isTail) {
      strokeWeight(1);
      stroke(0, 0, 0, 100);
      drawingContext.setLineDash([5, 5]);
    } else {
      strokeWeight(2);
      drawingContext.setLineDash([]);
    }
    ellipse(this.x, this.y, 40, 40);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(this.value, this.x, this.y);
  }
}

class Edge {
  constructor(fromNode, toNode) {
    this.fromNode = fromNode;
    this.toNode = toNode;
  }
  
  display() {
    stroke(0);
    strokeWeight(2);
    drawingContext.setLineDash([]);
    line(this.fromNode.x, this.fromNode.y, this.toNode.x, this.toNode.y);
    // Draw arrowhead
    let angle = atan2(this.toNode.y - this.fromNode.y, this.toNode.x - this.fromNode.x);
    push();
    translate(this.toNode.x, this.toNode.y);
    rotate(angle - HALF_PI);
    fill(0);
    noStroke();
    triangle(-5, 0, 5, 0, 0, 10);
    pop();
  }
}
```
