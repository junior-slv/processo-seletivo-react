"use strict";
import { Model } from "sequelize";

interface SalasAttributes {
  id: number;
  nome: string;
  capacidadeMesas: number;
  bloqueada: boolean;
  professores: string[];
  gradeAulas: string | null;
  protocolo: Buffer | null;
}


module.exports = (sequelize: any, DataTypes: any) => {
  class Salas extends Model<SalasAttributes> 
  implements SalasAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    nome!: string;
    capacidadeMesas!: number;
    bloqueada!: boolean;
    professores!: string[];
    gradeAulas!: string | null;
    protocolo!: Buffer | null;
  
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    static associate(models: any) {
      // define association here

    }
  }
  Salas.init(
    {
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
    },
    {
      modelName: 'Salas',
      sequelize,
    }
  );
  return Salas;
};
