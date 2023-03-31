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
        type: DataTypes.STRING,
        allowNull: false
      },
      capacidadeMesas: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      bloqueada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      professores: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
      gradeAulas: {
        type: DataTypes.TEXT('long'),
        allowNull: true
      },
      protocolo: {
        type: DataTypes.BLOB('long'),
        allowNull: true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Salas');
  }
};