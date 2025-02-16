let nodes = [];
let nodeWidth = 60;
let spacing = 100;

function setup() {
  createCanvas(600, 200);
  let values = ['A', 'B', 'C', 'D'];
  
  for (let i = 0; i < values.length; i++) {
    let x = 50 + i * spacing;
    let node = new ListNode(values[i], x, height / 2);
    nodes.push(node);
  }
  
  for (let i = 0; i < nodes.length; i++) {
    if (i > 0) {
      nodes[i].prev = nodes[i - 1];
    }
    if (i < nodes.length - 1) {
      nodes[i].next = nodes[i + 1];
    }
  }
  
  let eNode = new ListNode('E', nodes[2].x + spacing / 2, height / 2 + 50);
  eNode.next = nodes[2].next;
  nodes[2].next = eNode;
  nodes.splice(3, 0, eNode);
}

function draw() {
  background(240);
  
  for (let node of nodes) {
    node.show();
  }
}

class ListNode {
  constructor(value, x, y) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.prev = null;
    this.next = null;
  }
  
  show() {
    fill(255);
    stroke(0);
    if (this.next === null) {
      stroke(0, 0, 0, 100);
      strokeWeight(2);
      drawingContext.setLineDash([5, 5]);
    }
    rect(this.x, this.y - 20, nodeWidth, 40, 10);
    drawingContext.setLineDash([]);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(this.value, this.x + nodeWidth / 2, this.y);
    
    if (this.next) {
      stroke(0);
      line(this.x + nodeWidth, this.y, this.next.x, this.next.y);
      push();
      fill(0);
      triangle(this.next.x - 5, this.next.y - 5, this.next.x - 5, this.next.y + 5, this.next.x, this.next.y);
      pop();
    }
    
    if (this.prev) {
      stroke(0);
      line(this.x, this.y, this.prev.x + nodeWidth, this.prev.y);
      push();
      fill(0);
      triangle(this.x + 5, this.y - 5, this.x + 5, this.y + 5, this.x, this.y);
      pop();
    }
  }
}
