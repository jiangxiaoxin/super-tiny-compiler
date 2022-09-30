import { AstTypes } from "./types";

// transformed ast
export function codegen(node: any): string {
   switch (node.type) {
    case AstTypes.Program:
      return node.body.map(codegen)
      break;
    case AstTypes.ExpressionStatement:
      return codegen(node.expression) + ";"
      break;
    case AstTypes.CallExpression:

      return node.callee.name + "(" + node.arguments.map(codegen).join(",") + ')'
    break;
    case AstTypes.NumberLiteral:
      return node.value
    break;
   
    default:
      throw new Error("生成代码错误")
      break;
   }
}