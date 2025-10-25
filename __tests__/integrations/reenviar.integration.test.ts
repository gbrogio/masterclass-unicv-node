import { App } from "@/app";
import { enviarTechnospeed } from "@/modules/webhook/util/enviar-technospeed";
import { validarHeaders } from "@/modules/webhook/util/validar-headers";
import { WebhookReprocessado } from "@/sequelize/models/webhook-reprocessado.model";
import request from "supertest";

jest.mock("@/modules/webhook/util/validar-headers", () => {
  return {
    validarHeaders: jest.fn(),
  };
});

jest.mock("@/modules/webhook/util/enviar-technospeed", () => {
  return {
    enviarTechnospeed: jest.fn(),
  };
});

describe("/reenviar - integração", () => {
  const app = new App();

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("Validar ser as Headers quando invalidas retornam um erro 401.", async () => {
    const response = await request(app.server).post("/reenviar");

    expect(response.status).toBe(401);
  });

  it("Validar se quando o corpo da requisição (body) é invalido retorna um erro 400.", async () => {
    (validarHeaders as jest.Mock).mockResolvedValue(true);

    const response = await request(app.server).post("/reenviar");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Parâmetro inválido",
      field: "body",
    });

    const responseInvalidData = await request(app.server)
      .post("/reenviar")
      .send({
        product: "boleto",
        id: ["1", "2", "3"],
        kind: "invalid",
        type: "disponível",
      });

    expect(responseInvalidData.status).toBe(400);
    expect(responseInvalidData.body).toEqual({
      message: "Parâmetro inválido",
      field: "body.kind",
    });

    const responseInvalidId = await request(app.server)
      .post("/reenviar")
      .send({
        product: "boleto",
        id: ["1", "2", "3", "invalid"],
        kind: "webhook",
        type: "disponível",
      });

    expect(responseInvalidId.status).toBe(400);
    expect(responseInvalidId.body).toEqual({
      message: "Parâmetro inválido",
      field: "body.id.3",
    });
  });

  it("Validar se o payload correto esta sendo enviado para a API da Technopeed.", async () => {
    const webhookReprocessadoID = "123e4567-e89b-12d3-a456-426614174000";

    jest.mock("uuid", () => {
      return jest.fn().mockReturnValue("123e4567-e89b-12d3-a456-426614174000");
    });

    (validarHeaders as jest.Mock).mockResolvedValue(true);
    const payload = {
      product: "boleto",
      id: ["1", "2", "3"],
      kind: "webhook",
      type: "disponível",
    };

    const response = await request(app.server).post("/reenviar").send(payload);

    expect(enviarTechnospeed).toHaveBeenCalledTimes(1);
    expect(enviarTechnospeed).toHaveBeenCalledWith({
      notificacoes: [
        {
          type: "webhook",
          produto: "boleto",
          situacao: "disponível",
          servico_id: 1,
          webhook_reprocessado: webhookReprocessadoID,
        },
        {
          type: "webhook",
          produto: "boleto",
          situacao: "disponível",
          servico_id: 2,
          webhook_reprocessado: webhookReprocessadoID,
        },
        {
          type: "webhook",
          produto: "boleto",
          situacao: "disponível",
          servico_id: 3,
          webhook_reprocessado: webhookReprocessadoID,
        },
      ],
    });
  });

  it("Validar se quando a API da Technopeed retorna um erro requisição é retornada com um erro 400 ou 500.", async () => {
    (validarHeaders as jest.Mock).mockResolvedValue(true);
    (enviarTechnospeed as jest.Mock).mockRejectedValue({
      status: 500,
      message: "Erro ao enviar notificação para a API da Technopeed",
    });

    const response = await request(app.server)
      .post("/reenviar")
      .send({
        product: "boleto",
        id: ["1", "2", "3"],
        kind: "webhook",
        type: "disponível",
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "Erro ao enviar notificação para a API da Technopeed",
    });

    (enviarTechnospeed as jest.Mock).mockRejectedValue({
      status: 400,
      message: "Erro ao enviar notificação para a API da Technopeed",
    });

    const response400 = await request(app.server)
      .post("/reenviar")
      .send({
        product: "boleto",
        id: ["1", "2", "3"],
        kind: "webhook",
        type: "disponível",
      });

    expect(response400.status).toBe(400);
    expect(response400.body).toEqual({
      message: "Erro ao enviar notificação para a API da Technopeed",
    });
  });

  it("Validar se o retorno da API junto com o body da requisição é enviado para a criação da tabela WebhookReprocessado.", async () => {
    const webhookReprocessadoID = "123e4567-e89b-12d3-a456-426614174000";
    const protocolo = "123e4567-e89b-12d3-a456-426614174000";

    jest.mock("uuid", () => {
      return jest.fn().mockReturnValue("123e4567-e89b-12d3-a456-426614174000");
    });

    (validarHeaders as jest.Mock).mockResolvedValue(true);
    (enviarTechnospeed as jest.Mock).mockResolvedValue(protocolo);

    const response = await request(app.server)
      .post("/reenviar")
      .send({
        product: "boleto",
        id: ["1", "2", "3"],
        kind: "webhook",
        type: "disponível",
      });

    expect(WebhookReprocessado.create).toHaveBeenCalledTimes(1);
    expect(WebhookReprocessado.create).toHaveBeenCalledWith({
      id: webhookReprocessadoID,
      protocolo: protocolo,
      data: {
        request: {
          product: "boleto",
          id: ["1", "2", "3"],
          kind: "webhook",
          type: "disponível",
        },
      },
    });
  });

  it("Validar se tudo estiver correto, então a requisição é retornada com um sucesso status 200.", async () => {
    const protocolo = "123e4567-e89b-12d3-a456-426614174000";
    (validarHeaders as jest.Mock).mockResolvedValue(true);
    (enviarTechnospeed as jest.Mock).mockResolvedValue(protocolo);

    const response = await request(app.server)
      .post("/reenviar")
      .send({
        product: "boleto",
        id: ["1", "2", "3"],
        kind: "webhook",
        type: "disponível",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Notificação enviada com sucesso",
    });
  });
});
