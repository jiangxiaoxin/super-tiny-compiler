const formulas = [
  "@002@*@003@-(-7)+(@004@+@005@)",
  "(@001@+@002@)-(@003@-@004@)",
  "(@001@+@002@)-(@003@-@004@)/(-10)",
  "(-7)+@005@",
  "@006@-7",
  "-7+@006@",
  "@006@-(-7)",
  "7+@001",
];
const NUMBER = /[0-9]/;
const tokenizer = (code) => {
  let current = 0;
  let n = code.length;
  let tokens = [];
  let char;

  while (current < n) {
    char = code[current];
    if (char === "(") {
      tokens.push({
        type: "paren",
        value: char,
      });
      current++;
      continue;
    }
    if (char === ")") {
      tokens.push({
        type: "paren",
        value: char,
      });
      current++;
      continue;
    }
    if (char === "@") {
      let value = char;
      current++;
      while (current < n && code[current] !== "@") {
        value += code[current];
        current++;
      }
      // 要么 current 超界了，要么终于找到匹配的 @了

      if (current === n) {
        // 这里按照规则，是不会发生这种情况的
        throw new Error(`查找@符超界:前一个@符index ${current - value.length}`);
        return;
      }
      value += "@";
      tokens.push({
        type: "node",
        value: value,
      });
      current++;
      continue;
    }
    if (char === "+" || char === "*" || char === "/") {
      tokens.push({
        type: "operator",
        value: char,
      });
      current++;
      continue;
    }
    if (char === "-") {
      let prevToken = tokens[tokens.length - 1];
      if (!prevToken) {
        // 如果前面没有 token，那这个-一定是最开始，那就固定认为是个减号
        // 因为如果是表示 -7的话,存的时候一定会添加 (-7),所以正常情况下-前面一定会有个prevToken的
        tokens.push({
          type: "operator",
          value: char,
        });
        current++;
      } else if (prevToken.type === "paren" && prevToken.value === "(") {
        // 如果前面是个 （，那这就是 负数。强制在负数的前后加一对括号
        // 配置公式的时候，依然是可以用（、-、7、）配置成(-7)这种方式的，而解字符串时就认为是负数 -7.这是因为配置的不合理。公式配置也是有规则要求的
        // !原本即使这样配置触发误解，也可以通过在操作符 - 和 7 之间添加空格来确定是个减号，但有要求不允许出现空格
        let value = char; // -
        current++;
        while (
          current < n &&
          (NUMBER.test(code[current]) || code[current] === ".")
        ) {
          value += code[current];
          current++;
        }
        // 要么超界了，要么碰到不是数字了
        if (current === n) {
          // 超界了。其实不会走到超界，因为这里是在解析负数，而负数是生成字符串时，前后加的括号，那一定不会还没找完数字就已经超界
          throw new Error("找数字时超界，一定是code有问题");
        } else {
          tokens.pop();
          tokens.push({
            type: "number",
            value: Number(value),
          });
          // 其实后面一定是个 ), 要么就是code格式有问题
          // 包围负数的括号是自己加的，所以回显时要去掉
          current++;
        }
      } else {
        tokens.push({
          type: "operator",
          value: char,
        });
        current++;
      }
      continue;
    }
    if (NUMBER.test(char)) {
      // 发现独立数字
      let value = "";
      while (
        current < n &&
        (NUMBER.test(code[current]) || code[current] === ".")
      ) {
        value += code[current];
        current++;
      }
      // 到最后了 或者找个数字解析完了
      tokens.push({
        type: "number",
        value: Number(value),
      });

      // 直接继续就可以了
      // 如果越界了,那外层的while循环就停了.如果只是遇到了别的字符,那继续执行循环就行了
      continue;
    }
  }

  return tokens;
};

// let tokens = tokenizer(formulas[7]);
// console.log(tokens);

const encoder = (nodes) => {
  let output = "";
  let node;
  for (let i = 0; i < nodes.length; i++) {
    node = nodes[i];
    if (node.type === "node") {
      let next = i + 1;
      if (next < nodes.length) {
        let nextNode = nodes[next];
        if (nextNode.type === "node") {
          throw new Error("不能连续两个点位");
        }
      }
    }
    if (node.type === "number" && node.value < 0) {
      output += `(${node.value})`;
    } else {
      output += node.value;
    }
  }

  return output;
};

// const str = encoder(tokens);
// console.log(str);

let tokens = [
  { type: "node", value: "@002@" },
  { type: "node", value: "@002@" },
];
const str = encoder(tokens);
