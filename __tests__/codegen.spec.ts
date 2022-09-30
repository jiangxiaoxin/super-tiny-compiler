import { codegen } from "../src/codegen"

describe("codegen", () => {
  test("完整的表达式", () => {
    let ast =  {
      type: "Program",
      body: [
        {
          type: "ExpressionStatement",
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'add'
            },
            arguments: [
              {
                type: "NumberLiteral",
                value: '2'
              },
              {
                type: "CallExpression",
                callee: {
                  type: "Identifier",
                  name: "subtract"
                },
                arguments: [
                  {
                    type: "NumberLiteral",
                    value: '4',
                  },
                  {
                    type: "NumberLiteral",
                    value: '2'
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  
    let code = codegen(ast)
  
    expect(code[0]).toBe("add(2,subtract(4,2));")
  })
})


