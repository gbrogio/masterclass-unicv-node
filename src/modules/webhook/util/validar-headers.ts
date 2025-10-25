import { foo } from "./foo";

export async function validarHeaders(headers: Headers | null): Promise<boolean> {
  if (!headers) return false;
  foo(headers.get("x-api-cnpj-sh") ?? "");
  return true;
}
