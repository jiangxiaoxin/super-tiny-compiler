import { tokenizer } from "../src/tokenizer";
import { Tokens, TokenizerResult, TokenTypes } from "../src/types";

describe("tokenizer module", () => {
  test("空代码", () => {
    let code = "";
    let tokens: TokenizerResult = null;
    expect(tokenizer(code)).toEqual(tokens);
  });

  test("只有括号", () => {
    let code = "()";
    let tokens = [
      {
        type: TokenTypes.PAREN,
        value: "(",
      },
      {
        type: TokenTypes.PAREN,
        value: ")",
      },
    ];
    expect(tokenizer(code)).toEqual(tokens);
  });

  // 只有数字是允许的
  test("只有个整数", () => {
    let code = "(2222)";
    let tokens = [
      {
        type: TokenTypes.PAREN,
        value: "(",
      },
      {
        type: TokenTypes.NUMBER,
        value: "2222",
      },
      {
        type: TokenTypes.PAREN,
        value: ")",
      },
    ];

    expect(tokenizer(code)).toEqual(tokens);
  });

  test("只有个小数", () => {
    let code = "(22.22)";
    let tokens = [
      {
        type: TokenTypes.PAREN,
        value: "(",
      },
      {
        type: TokenTypes.NUMBER,
        value: "22.22",
      },
      {
        type: TokenTypes.PAREN,
        value: ")",
      },
    ];

    expect(tokenizer(code)).toEqual(tokens);
  });

  test("完整的表达式", () => {
    let code = "(add 2 (subtract 4.1 2.1))";
    let tokens = [
      { type: TokenTypes.PAREN, value: "(" },
      { type: TokenTypes.NAME, value: "add" },
      { type: TokenTypes.NUMBER, value: "2" },
      { type: TokenTypes.PAREN, value: "(" },
      { type: TokenTypes.NAME, value: "subtract" },
      { type: TokenTypes.NUMBER, value: "4.1" },
      { type: TokenTypes.NUMBER, value: "2.1" },
      { type: TokenTypes.PAREN, value: ")" },
      { type: TokenTypes.PAREN, value: ")" },
    ];
    expect(tokenizer(code)).toEqual(tokens);
  });
});
