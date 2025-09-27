// sum.ts
export function sum(
  num1: any,
  num2: any,
) {
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    throw new Error("Os parametros devem ser números");
  }

  if (num1 === Infinity || num2 === Infinity) {
    throw new Error("Os parametros devem ser números não infinitos");
  }

  return num1 + num2;
}