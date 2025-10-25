import { Cedente } from "@/sequelize/models/cedente.model";
import { SoftwareHouse } from "@/sequelize/models/software-house.model";
import { validarHeaders } from "./validar-headers";
import { foo } from "./foo";

describe("/reenviar - validarHeaders", () => {
  const mockHeaders = new Headers({
    "x-api-cnpj-sh": "1234567890",
    "x-api-token-sh": "1234567890",
    "x-api-cnpj-cedente": "1234567890",
    "x-api-token-cedente": "1234567890",
  });

  it("deve retornar false se algum dos headers não forem enviados", async () => {
    const HeaderEnviadaComoNull = await validarHeaders(
      null,
    );
    expect(HeaderEnviadaComoNull).toBe(false);
    
    const headersNenhumaHeaderEnviada = new Headers();
    const nenhumaHeaderEnviada = await validarHeaders(
      headersNenhumaHeaderEnviada,
    );
    expect(nenhumaHeaderEnviada).toBe(false);

    const headersCnpjShEnviado = new Headers();
    headersCnpjShEnviado.set("x-api-cnpj-sh", "1234567890");
    const cnpjShEnviado = await validarHeaders(headersCnpjShEnviado);
    expect(cnpjShEnviado).toBe(false);

    const headersTokenShEnviado = new Headers();
    headersTokenShEnviado.set("x-api-token-sh", "1234567890");
    const tokenShEnviado = await validarHeaders(headersTokenShEnviado);
    expect(tokenShEnviado).toBe(false);

    const headersCnpjCedenteEnviado = new Headers();
    headersCnpjCedenteEnviado.set("x-api-cnpj-cedente", "1234567890");
    const cnpjCedenteEnviado = await validarHeaders(headersCnpjCedenteEnviado);
    expect(cnpjCedenteEnviado).toBe(false);

    const headersTokenCedenteEnviado = new Headers();
    headersTokenCedenteEnviado.set("x-api-token-cedente", "1234567890");
    const tokenCedenteEnviado = await validarHeaders(
      headersTokenCedenteEnviado,
    );
    expect(tokenCedenteEnviado).toBe(false);
  });

  it("deve retornar false se o cnpj e token da sh não estiver cadastrado", async () => {
    jest.spyOn(SoftwareHouse, "findOne").mockResolvedValue(null);

    const headers = new Headers(mockHeaders);
    const isValid = await validarHeaders(headers);
    expect(isValid).toBe(false);
  });

  it("deve retornar false se a software house estiver inativa", async () => {
    jest.spyOn(SoftwareHouse, "findOne").mockResolvedValue({
      dataValues: {
        status: "inativo",
      },
    } as SoftwareHouse);

    const headers = new Headers(mockHeaders);
    const isValid = await validarHeaders(headers);
    expect(isValid).toBe(false);
  });

  it("deve lançar se o foo for chamado com o valor 'bar'", async () => {
    expect(() => foo("bar")).toThrow("bar is not allowed");
  });

  it("deve retornar false se o cnpj e token do cedente não estiver cadastrado", async () => {
    jest.spyOn(SoftwareHouse, "findOne").mockResolvedValue({
      dataValues: {
        id: 1,
        status: "ativo",
      },
    } as SoftwareHouse);
    jest.spyOn(Cedente, "findOne").mockResolvedValue(null);

    const headers = new Headers(mockHeaders);
    const isValid = await validarHeaders(headers);
    expect(isValid).toBe(false);
  });

  it("deve retornar false se o cnpj do cedente não estiver cadastrado", async () => {
    jest.spyOn(SoftwareHouse, "findOne").mockResolvedValue({
      dataValues: {
        id: 1,
        status: "ativo",
      },
    } as SoftwareHouse);
    jest.spyOn(Cedente, "findOne").mockResolvedValue({
      dataValues: {
        id: 1,
        status: "inativo",
      },
    } as Cedente);

    const headers = new Headers(mockHeaders);
    const isValid = await validarHeaders(headers);
    expect(isValid).toBe(false);
  });

  it("deve retornar false se o cedente não estiver vinculado à software house", async () => {
    jest.spyOn(SoftwareHouse, "findOne").mockResolvedValue({
      dataValues: {
        id: 1,
        status: "ativo",
      },
    } as SoftwareHouse);

    jest.spyOn(Cedente, "findOne").mockResolvedValue({
      dataValues: {
        id: 1,
        status: "ativo",
        software_house_id: 2,
      },
    } as Cedente);

    const headers = new Headers(mockHeaders);
    const isValid = await validarHeaders(headers);
    expect(isValid).toBe(false);
  });

  it("deve retornar true se todos os headers forem enviados e válidos", async () => {
    jest.spyOn(SoftwareHouse, "findOne").mockResolvedValue({
      dataValues: {
        id: 1,
        status: "ativo",
      },
    } as SoftwareHouse);
    jest.spyOn(Cedente, "findOne").mockResolvedValue({
      dataValues: {
        id: 1,
        status: "ativo",
        software_house_id: 1,
      },
    } as Cedente);

    const headers = new Headers(mockHeaders);
    const isValid = await validarHeaders(headers);
    expect(isValid).toBe(true);
  });
});
