import { traverse } from "../src/traverser";
import {
  AstCallExpressionNode,
  AstNode,
  AstNumberLiteralNode,
  AstParentNode,
  AstRootNode,
  AstTypes,
  Visitor,
} from "../src/types";

function padding(count: number) {
  return " ".repeat(count * 3);
}

let level = 0;

const visitor: Visitor = {
  [AstTypes.Program]: {
    enter(node: AstNode, parent: AstParentNode) {
      level++;
      console.log(`${padding(level)} ${node!.type} enter`);
    },
    exit(node: AstNode, parent: AstParentNode) {
      console.log(`${padding(level)} ${node!.type} exit`);
      level--;
    },
  },
  [AstTypes.CallExpression]: {
    enter(node: AstNode, parent) {
      level++;
      console.log(
        `${padding(level)} ${node!.type} enter:${
          (node as AstCallExpressionNode).name
        }`
      );
    },
    exit(node, parent) {
      console.log(
        `${padding(level)} ${node!.type} exit:${
          (node as AstCallExpressionNode).name
        }`
      );
      level--;
    },
  },
  [AstTypes.NumberLiteral]: {
    enter(node, parent) {
      level++;
      console.log(
        `${padding(level)} ${node!.type} enter:${
          (node as AstNumberLiteralNode).value
        }`
      );
    },
    exit(node, parent) {
      console.log(
        `${padding(level)} ${node!.type} exit:${
          (node as AstNumberLiteralNode).value
        }`
      );
      level--;
    },
  },
};

let ast: AstRootNode = {
  type: AstTypes.Program,
  body: [
    {
      type: AstTypes.CallExpression,
      name: "add",
      params: [
        {
          type: AstTypes.NumberLiteral,
          value: "2",
        },
        {
          type: AstTypes.CallExpression,
          name: "subtract",
          params: [
            {
              type: AstTypes.NumberLiteral,
              value: "4.1",
            },
            {
              type: AstTypes.NumberLiteral,
              value: "2.1",
            },
          ],
        },
      ],
    },
  ],
};


// run code
traverse(ast, visitor);