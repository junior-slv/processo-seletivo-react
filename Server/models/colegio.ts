import { Model } from 'sequelize';

interface ColegiosAttributes {
  id: number;
  nome: string;
  estado: string;
  cidade: string;
  simbolo: string | null;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Colegios extends Model<ColegiosAttributes> implements ColegiosAttributes {
    id!: number;
    nome!: string;
    estado!: string;
    cidade!: string;
    simbolo!: string | null;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here
    }
  }
  Colegios.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cidade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      simbolo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Colegios',
    }
  );
  return Colegios;
};
