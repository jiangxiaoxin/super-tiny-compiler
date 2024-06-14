// 中缀转后缀，转之后移除括号

const NUM = /[a-z]/;

const priorityMap = {
  "+": ["+", "-", "*", "/"], // 同级或者更高级
  "-": ["+", "-", "*", "/"],
  "*": ["*", "/"],
  "/": ["*", "/"],
};

const transform = (code) => {
  let current = 0;
  let n = code.length;
  let output = "";
  let opeStack = [];
  let char;
  while (current < n) {
    // console.log("current:" + current, opeStack);
    char = code[current];
    if (NUM.test(char)) {
      output += char;
      current++;
      continue;
    }
    if (char === "(") {
      opeStack.push("(");
      current++;
      continue;
    }
    if (char === ")") {
      while (opeStack.length > 0) {
        let top = opeStack.pop();
        if (top !== "(") {
          output += top;
        } else {
          // 已经到左括号了
          break;
        }
      }
      current++;
      continue;
    }
    if (char === "+" || char === "*" || char === "/") {
      while (opeStack.length > 0) {
        let top = opeStack[opeStack.length - 1];
        if (priorityMap[char].includes(top)) {
          opeStack.pop();
          output += top;
        } else {
          break;
        }
      }
      opeStack.push(char);
      current++;
      continue;
    }
    if (char === "-") {
      while (opeStack.length > 0) {
        let top = opeStack[opeStack.length - 1];
        if (priorityMap[char].includes(top)) {
          opeStack.pop();
          output += top;
        } else {
          break;
        }
      }
      opeStack.push(char);
      current++;
      continue;
    }
  }

  //   console.log("outtttt", opeStack);
  while (opeStack.length > 0) {
    output += opeStack.pop();
  }
  return output;
};

const testSuits = {
  "a+b-c+d": "ab+c-d+",
  "a*(b-c-d)*e": "abc-d-*e*",
  "a-b*c+d": "abc*-d+",
  "a+b*c+(d*e+f)*(g-h)+e": "abc*+de*f+gh-*+e+",
};

// for (let key in testSuits) {
//   const afterTransform = testSuits[key];
//   console.log(afterTransform === transform(key));
// }

// console.log(transform("a+b*c+(d*e+f)*(g-h)+e"));

console.log(transform("a+(b-(c-d)*e)/f-g"));
