'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Salas', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      capacidadeMesas: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      bloqueada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      professores: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      gradeAulas: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      protocolo: {
        type: DataTypes.STRING(128),
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Salas');
  }
};