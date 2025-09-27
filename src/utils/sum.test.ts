// sum.test.ts
import { sum } from "./sum";

describe("sum", () => {
  it("should sum two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("should verica se os parametros sao numeros", () => {
    expect(() => sum("1", 2)).toThrow("Os parametros devem ser números");
    expect(() => sum(1, "2")).toThrow("Os parametros devem ser números");
    expect(() => sum("1", "2")).toThrow("Os parametros devem ser números");
  });

  it("should verica se os numeros não sao infinitos", () => {
    expect(() => sum(Infinity, 2)).toThrow(
      "Os parametros devem ser números não infinitos",
    );
    expect(() => sum(1, Infinity)).toThrow(
      "Os parametros devem ser números não infinitos",
    );
    expect(() => sum(Infinity, Infinity)).toThrow(
      "Os parametros devem ser números não infinitos",
    );
  });
});
