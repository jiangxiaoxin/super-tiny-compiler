// 逆波兰表达式==》正常的可阅读表达
// 前提：格式正确

const a = "a+b*c+(d*e-f)*g";
const b = "abc*+de*f-g*+";

const operator = ["+", "-", "*", "/"];
const paren = ["(", ")"];

const transform = (input) => {
  let stack = [];
  let n = input.length;
  let current = 0;
  let char;
  while (current < n) {
    char = input[current];
    if (operator.includes(char)) {
      const x = stack.pop();
      const y = stack.pop();
      if (char === "+" || char === "-") {
        stack.push(`${y}${char}${x}`);
      } else {
        let value = "";
        if (y.includes("+") || y.includes("-")) {
          // 优先级低
          value = "(" + y + ")";
        } else {
          value = y;
        }
        value += char;
        if (x.includes("+") || x.includes("-")) {
          // 优先级低
          value += "(" + x + ")";
        } else {
          value += x;
        }
        stack.push(value);
      }

      current++;
      continue;
    }
    // 操作数
    stack.push(char);
    current++;
  }
  return stack.pop();
};

console.log(transform(b));
