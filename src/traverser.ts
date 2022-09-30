import {
  AstTypes,
  AstParentNode,
  Visitor,
  AstRootNode,
  AstChildNode,
} from "./types";

/**
 * 遍历传入的ast树
 * @param ast AST Object
 */
export function traverse(ast: AstRootNode, visitor: Visitor) {
  function traverseArray(array: AstChildNode[], parent: AstParentNode) {
    array.forEach(item => {
      traverseNode(item, parent)
    })
  }

  function traverseNode(
    node: AstRootNode | AstChildNode,
    parent?: AstParentNode
  ) {
    const options = visitor[node.type]!; // 这里强制它有，
    if (options && options.enter) {
      options.enter(node, parent);
    }

    switch (node.type) {
      case AstTypes.Program:
        traverseArray(node.body, node);
        break;
      case AstTypes.NumberLiteral:
        break;
      case AstTypes.CallExpression:
        traverseArray(node.params, node);
        break;
      default:
        break;
    }

    if (options && options.exit) {
      options.exit(node, parent);
    }
  }

  traverseNode(ast, null);
}
