import { add } from "../src/add"

// const {add} = require("../src/add")

describe("add module", () => {
  test("add", () => {
    expect(add(1,2)).toBe(3)
  })
})
