import { Tokens, TokenizerResult, Token, TokenTypes } from "./types";

const WHITESPACE = /\s/;
const NUMBER = /[0-9]/;
const LETTERS = /[a-z]/i; // i不分大小写

function createToken(type: TokenTypes, value: string): Token {
  return {
    type,
    value,
  };
}

/**
 * code string => token[]
 * @param code string
 * @returns tokens
 */
export function tokenizer(code: string): TokenizerResult {
  if (!code) {
    return null;
  }
  let tokens: Tokens = [];

  let current = 0;
  let char: string;
  let currenToken: Token|null;

  let n = code.length;

  while (current < n) {
    char = code[current];

    // 空格全部跳过，不计入最后的token
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (char == "(") {
      tokens.push(createToken(TokenTypes.PAREN, char));
      current++;
      continue;
    }

    if (char == ")") {
      tokens.push(createToken(TokenTypes.PAREN, char));
      current++;
      continue;
    }

    if (LETTERS.test(char)) {
      // 遇到了字母，那要看字母到哪里结束
      let value = "";
      while (LETTERS.test(char)) {
        value += char;
        current++;
        /**
         * 这里就有个问题：current只管加1，然后去char，并没有顾及越界的问题。
         * 之所以不顾及，是因为代码输入本身就是有一定规范的。出现越界的情况 ....adddddd 这种是不允许的.所以也就没考虑了
         */
        char = code[current];
      }

      // 把一个name都找出来了 
      tokens.push(createToken(TokenTypes.NAME, value))
      continue
    }

    if(NUMBER.test(char)) {
      // 发现数字。但并不知道数字是在哪结束的，并且数字有可能中间有小数点
      
      currenToken = createToken(TokenTypes.NUMBER, "")
      while(NUMBER.test(char) || char==".") {
        currenToken.value+=char
        current++
        // 这里还是一样，按照规则，最后面起码会有一个）存在，所以不会越界
        char = code[current]
      }
      tokens.push(currenToken)
      currenToken = null
      continue
    }

    throw new Error(`遇到无法解析的字符:char: ${char} current: ${current}`)

  }

  return tokens;
}
