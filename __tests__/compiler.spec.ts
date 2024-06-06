import { compile } from "../src/compiler";

describe("compiler", () => {
  // test("完整的编译", () => {
  //   let code = "(add 2 (subtract 4 2))";
  //   // body 编译后是个数组，所以取[0]
  //   // 在codegen-callExpression时，","后面直接连接了，所以有点不一样
  //   expect(compile(code)[0]).toBe("add(2,subtract(4,2));");
  // }),
  test("更复杂的", () => {
    let code = "(add (add 2 4) (subtract 4 3))";
    expect(compile(code)[0]).toBe("add(add(2,4),subtract(4,3));");
  });
});
