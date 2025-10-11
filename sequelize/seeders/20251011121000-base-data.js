"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // SH id = 1
    await queryInterface.bulkInsert("software_houses", [
      {
        id: 1,
        cnpj: "11111111111111",
        token: "sh-token-1",
        status: "ativo",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Cedente id = 1 vinculado à SH 1
    await queryInterface.bulkInsert("cedentes", [
      {
        id: 1,
        software_house_id: 1,
        cnpj: "22222222222222",
        token: "cedente-token-1",
        status: "ativo",
        configuracao_notificacao: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Contas id = 1 e 2 vinculadas ao Cedente 1
    await queryInterface.bulkInsert("contas", [
      {
        id: 1,
        cedente_id: 1,
        status: "ativo",
        configuracao_notificacao: JSON.stringify({
          prioridade: "conta",
          url: "https://webhook.conta1",
        }),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        cedente_id: 1,
        status: "ativo",
        configuracao_notificacao: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Servicos 1..4 divididos entre contas conforme exemplo
    await queryInterface.bulkInsert("servicos", [
      {
        id: 1,
        conta_id: 1,
        produto: "boleto",
        situacao: "disponivel",
        ativo: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        conta_id: 1,
        produto: "boleto",
        situacao: "disponivel",
        ativo: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        conta_id: 2,
        produto: "boleto",
        situacao: "disponivel",
        ativo: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        conta_id: 2,
        produto: "boleto",
        situacao: "disponivel",
        ativo: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("webhook_reprocessados", null, {});
    await queryInterface.bulkDelete("servicos", null, {});
    await queryInterface.bulkDelete("contas", null, {});
    await queryInterface.bulkDelete("cedentes", null, {});
    await queryInterface.bulkDelete("software_houses", null, {});
  },
};
