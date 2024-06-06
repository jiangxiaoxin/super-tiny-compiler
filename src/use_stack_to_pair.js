// [] ()

import { Stack } from "./structure/stack";
export function isPair(code) {
  let stack = new Stack();
  let current = 0;
  let n = code.length;
  let char;
  let top;
  while (current < n) {
    char = code[current];
    if (char === "(") {
      stack.push(char);
      current++;
      continue;
    }
    if (char === "[") {
      stack.push(char);
      current++;
      continue;
    }
    if (char === ")") {
      top = stack.top();
      if (top !== "(") {
        console.log(`${current}位置的字符：${char} 不匹配`);
        return false;
      }
      stack.pop();
      current++;
      continue;
    }
    if (char === "]") {
      top = stack.top();
      if (top !== "[") {
        console.log(`${current}位置的字符：${char} 不匹配`);
        return false;
      }
      stack.pop();
      current++;
      continue;
    }
  }
  if (stack.size() !== 0) {
    return false;
  }

  return true;
}
