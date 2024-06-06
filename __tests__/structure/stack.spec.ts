import { Stack } from "../../src/structure/stack";
import { isPair } from "../../src/use_stack_to_pair";

describe("compiler", () => {
  test("stack的基础验证", () => {
    let stack = new Stack();
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
    let top = stack.top();
    expect(top).toBe(2);
    let pop = stack.pop();
    expect(pop).toBe(2);
    expect(stack.size()).toBe(1);
  });

  test("判断是否括号匹配", () => {
    let code = "[()]";
    expect(isPair(code)).toBe(true);
    code = "[]()";
    expect(isPair(code)).toBe(true);
    code = "[(])";
    expect(isPair(code)).toBe(false);
  });
});
