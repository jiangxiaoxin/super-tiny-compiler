const formulas = [
  "@002@*@003@-(-7)+(@004@+@005@)/@006@",
  "(@001@+@002@)-(@003@-@004@)",
  "(@001@+@002@)-(@003@-@004@)/(-10)",
  "(-7)+@005@",
  "@006@-7",
  "-7+@006@",
  "@006@-(-7)",
  "7+@001@",
];
const chinese = ["2号节点*3号节点-(-7)+(4号节点+5号节点)/6号节点"];
const NUMBER = /[0-9]/;
const tokenizer = (code, cstr) => {
  let current = 0;
  let n = code.length;
  let tokens = [];
  let char;

  let map = {};
  let nodeName;
  let posInCStr = 0;

  while (current < n) {
    char = code[current];
    if (char === "(") {
      tokens.push({
        type: "paren",
        value: char,
      });
      current++;
      posInCStr++;
      continue;
    }
    if (char === ")") {
      tokens.push({
        type: "paren",
        value: char,
      });
      current++;
      posInCStr++;
      continue;
    }
    if (char === "@") {
      // 碰到个节点的起始位置了
      let value = char;
      current++;
      while (current < n && code[current] !== "@") {
        value += code[current];
        current++;
      }
      // 要么 current 超界了，要么终于找到匹配的 @了
      //   可以不考虑超界问题，按规则公式一定是对的

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

      if (current < n) {
        // 上面current++ 是有可能超界了的
        // 找出下一个字符，然后在汉字公式里找到同样的下一个字符
        char = code[current];
        let newIndex = cstr.indexOf(char, posInCStr);
        let nodeName = cstr.substring(posInCStr, newIndex);
        map[value] = nodeName;
        posInCStr = newIndex;
      } else {
        let nodeName = cstr.substring(posInCStr);
        map[value] = nodeName;
        posInCStr += nodeName.length;
      }

      continue;
    }
    if (char === "+" || char === "*" || char === "/") {
      tokens.push({
        type: "operator",
        value: char,
      });
      current++;
      posInCStr++;
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
        posInCStr++;
      } else if (prevToken.type === "paren" && prevToken.value === "(") {
        // 如果前面是个 （，那这就是 负数。强制在负数的前后加一对括号
        //! 其实这里不对：它完全可以配一个（，再配一个-，再配一个7，再配一个).如果是这样，那这就是4个元素。而这里会把它解成一个元素 -7，那这就怪它不好好配公式了
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

          posInCStr = posInCStr + value.length + 1;
        }
      } else {
        tokens.push({
          type: "operator",
          value: char,
        });
        current++;
        posInCStr++;
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

      posInCStr += value.length; // 在字母的公式里，有一个数字，那同样的在汉字的公式里，也是同样位置，有个同样长度的数字

      // 直接继续就可以了
      // 如果越界了,那外层的while循环就停了.如果只是遇到了别的字符,那继续执行循环就行了
      continue;
    }
  }

  return [tokens, map];
};

let [tokens, map] = tokenizer(formulas[0], chinese[0]);
console.log(tokens);
console.log(map);
