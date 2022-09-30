import { tokenizer } from "./tokenizer";
import { transformer } from "./transformer";
import {parser} from "./parser"
import { codegen } from "./codegen";


export function compile(code: string): string {
  let tokens = tokenizer(code)
  let ast = parser(tokens!)
  let transfomedAST = transformer(ast)
  let result = codegen(transfomedAST)
  return result
}