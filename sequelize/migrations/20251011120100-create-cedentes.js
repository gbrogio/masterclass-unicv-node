"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cedentes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      software_house_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "software_houses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      cnpj: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("ativo", "inativo"),
        allowNull: false,
        defaultValue: "ativo",
      },
      configuracao_notificacao: {
        type: Sequelize.JSONB,
        allowNull: true,
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
    await queryInterface.dropTable("cedentes");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_cedentes_status";',
    );
  },
};
