"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("webhook_reprocessados", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
      },
      protocolo: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      software_house_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "software_houses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      cedente_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "cedentes", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      conta_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "contas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      data: {
        type: Sequelize.JSONB,
        allowNull: false,
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
    await queryInterface.dropTable("webhook_reprocessados");
  },
};
