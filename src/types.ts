

export enum TokenTypes {
  PAREN = "paren",
  NAME = "name",
  NUMBER = "number"
}

export interface Token {
  type: TokenTypes
  value: string
}

export type Tokens = Token[]

export type TokenizerResult = Tokens | null


export enum AstTypes {
  Program = "Program",
  NumberLiteral = "NumberLiteral",
  CallExpression = "CallExpression"
}


export interface AST {
  type: AstTypes.Program,
  body: AstNode[]
}


export type AstNodeType = AstTypes.NumberLiteral | AstTypes.CallExpression

export interface AstNode {
  type: AstNodeType,
  name?: string,
  params?: AstNode[],
  value?: string
}