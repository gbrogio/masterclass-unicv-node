"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("servicos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      conta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "contas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      produto: {
        type: Sequelize.ENUM("boleto", "pagamento", "pix"),
        allowNull: false,
      },
      situacao: {
        type: Sequelize.ENUM("disponivel", "cancelado", "pago"),
        allowNull: false,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("servicos");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_servicos_produto";',
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_servicos_situacao";',
    );
  },
};
