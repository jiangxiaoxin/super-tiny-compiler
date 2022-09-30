export enum TokenTypes {
  PAREN = "paren",
  NAME = "name",
  NUMBER = "number",
}

export interface Token {
  type: TokenTypes;
  value: string;
}

export type Tokens = Token[];

export type TokenizerResult = Tokens | null;

export enum AstTypes {
  Program = "Program",
  NumberLiteral = "NumberLiteral",
  CallExpression = "CallExpression",
}

export interface AstBasicNode {
  type: AstTypes;
}

export interface AstRootNode extends AstBasicNode {
  type: AstTypes.Program;
  body: AstChildNode[];
}

export interface AstNumberLiteralNode extends AstBasicNode {
  type: AstTypes.NumberLiteral;
  value: string;
}

export interface AstCallExpressionNode extends AstBasicNode {
  type: AstTypes.CallExpression;
  name: string;
  params: AstChildNode[];
}

export type AstChildNode = AstNumberLiteralNode | AstCallExpressionNode;

export type AstParentNode = AstRootNode | AstCallExpressionNode | null | undefined;

export type AstNode = AstParentNode|AstChildNode

export type VisitorFn = (node: AstNode, parent: AstParentNode) => void;

export interface VisitorOption {
  enter: VisitorFn;
  exit: VisitorFn;
}


export interface Visitor {
  [AstTypes.Program]?: VisitorOption;
  [AstTypes.CallExpression]?: VisitorOption;
  [AstTypes.NumberLiteral]?: VisitorOption;
}


