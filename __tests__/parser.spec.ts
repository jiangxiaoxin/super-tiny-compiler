
import { parser } from "../src/parser";
import { AstTypes, TokenTypes } from "../src/types";

describe("parser", () => {
  test("token->ast", () => {
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
    let ast = {
      type: AstTypes.Program,
      body: [{
        type: AstTypes.CallExpression,
        name: 'add',
        params: [{
          type: AstTypes.NumberLiteral,
          value: '2'
        }, {
          type: AstTypes.CallExpression,
          name: 'subtract',
          params: [{
            type: AstTypes.NumberLiteral,
            value: '4.1'
          }, {
            type: AstTypes.NumberLiteral,
            value: '2.1'
          }]
        }]
      }]
    }

    expect(parser(tokens)).toEqual(ast)
  })
})