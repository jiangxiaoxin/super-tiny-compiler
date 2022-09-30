import { AstCallExpressionNode, AstNumberLiteralNode, AstRootNode, AstTypes, Visitor } from "./types";
import { traverse } from "./traverser"

/**
 * 借助 traverse 的力量将 ast 转换成另一个 ast
 * @param ast 
 */
export function transformer(ast: AstRootNode) {
  let transformedAST = {
    type: "Program",
    body: []
  }

  // @ts-ignore
  ast._context = transformedAST.body

  const visitor: Visitor = {
    [AstTypes.NumberLiteral]: {
      enter(node, parent) {
        (parent as any)._context.push({
          type: AstTypes.NumberLiteral,
          value: (node as AstNumberLiteralNode).value
        })
      }
    },
    [AstTypes.CallExpression]: {
      enter(node, parent) {
        let expression: any = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: (node as AstCallExpressionNode).name,
          },
          arguments: [],
        };

        (node as any)._context = expression.arguments

        if(parent?.type != AstTypes.CallExpression) {
          expression = {
            type: 'ExpressionStatement',
            expression: expression,
          }
        }

        (parent as any)._context.push(expression);
      }
    }
  }

  
  traverse(ast, visitor);



  return transformedAST
}