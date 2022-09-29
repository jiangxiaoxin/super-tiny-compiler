

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