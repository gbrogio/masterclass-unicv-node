export function foo(bar: string) {
  if (bar === "bar") {
    throw new Error("bar is not allowed");
  }
  return `foo ${bar}`;
}