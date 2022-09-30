import { AstRootNode, AstNode, AstTypes, Token, Tokens, TokenTypes, AstChildNode, AstNumberLiteralNode, AstCallExpressionNode } from "./types";


function createAstNumberLiterialNode(value: string): AstNumberLiteralNode {
  return {
    type: AstTypes.NumberLiteral,
    value
  }
}

function createAstCallExpressionNode(name: string): AstCallExpressionNode {
  return {
    type: AstTypes.CallExpression,
    name,
    params: []
  }
}

/**
 * tokens => ast
 * @param tokens token[]
 */
export function parser(tokens: Tokens): AstRootNode {
  let current = 0
  let n = tokens.length;
  let ast:AstRootNode = {
    type: AstTypes.Program,
    body: []
  }


  let token: Token
  // 解出具体的节点
  function helper(): AstChildNode {
    token = tokens[current]


    if(token.type == TokenTypes.NUMBER) {
      current++
      return createAstNumberLiterialNode(token.value)
    }

    if(token.type == TokenTypes.PAREN && token.value == "(") {
      // 开启新的 callexpression
      current++
      token = tokens[current]
      let node = createAstCallExpressionNode(token.value)

      current++
      token = tokens[current]
      while(token.type != TokenTypes.PAREN || (token.type == TokenTypes.PAREN && token.value != ")")) {
        // 只要没结束就要一直走
        // 如果中间又碰到了 （，会再开启一个新的 callexpression 节点
        node.params!.push(helper())

        token = tokens[current]
      }

      // 循环完毕了，那就是遇到）了
      current++ // 这里不用更新token，因为return node之后，就会走下一次的helper，会立马更新token的
      return node;
    }

    throw new Error("解析token失败")
  }

  while(current < n) {
    ast.body.push(helper())
  }

  return ast;
}