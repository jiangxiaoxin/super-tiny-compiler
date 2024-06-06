export class Stack {
  constructor() {
    this.stack = [];
  }

  size() {
    return this.stack.length;
  }

  top() {
    let n = this.size();
    if (n === 0) {
      return null;
    }
    return this.stack[n - 1];
  }

  push(item) {
    this.stack.push(item);
  }

  pop() {
    let top = this.top();
    if (top) {
      this.stack.pop();
    }
    return top;
  }

  clear() {
    this.stack.length = 0;
  }
}
