// 逆波兰表达式==》正常的可阅读表达
// 后缀式改成中缀式
// 前提：格式正确

// const a = "a+b*c+(d*e-f)*g";
// const b = "abc*+de*f-g*+";
const a = "a+b*c+(d*e+f)*(g-h)+e";
const b = "abc*+de*f+gh-*+e+";

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
        // ! 这里考虑优先级对于算式的影响是对的，但这种处理方法并不全对。
        // 这里直接就加了括号，虽然从最后计算结果一定是对的，因为加多少层括号都不影响实际计算值。
        // 但这个添加括号的判断是不对的
        // 比如 当前操作符是*, y操作数已经是 (5+3)*2, x 操作数就是1，那表达式 1 * (5+3)*2 是没问题的，
        // 但 这里 y因为里面有了 +号， 就会外层整个包裹一个 括号。最后得出的是 1 * ((5+3)*2). 计算的结果是没问题的，但并不符合预期
        // 实际上应该判断 y 中所有的不再括号里的操作符，也就是第一层操作符，是不是有优先级低的，如果有，就需要添加括号。如果没有就不需要。
        // 对x的处理同样

        // ! 是我多虑了？多种测试下来，中缀转出的后缀，再转回去，并没有出现多余空格！
        let value = "";
        if (y.includes("+") || y.includes("-")) {
          // 前面的两个操作数中，有优先级更低的，那添加上char之后，就会改变计算顺序，所以要添加括号
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

// console.log(transform(b));

// console.log(transform("abcd-e*-f/+g-"));

console.log(transform("ab*cd+*"));
