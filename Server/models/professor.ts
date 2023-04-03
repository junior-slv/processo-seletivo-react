import { Model } from "sequelize";

interface ProfessorAttributes {
  id: number,
  nome: string,
  email: string,
  idade: number,
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Professor extends Model<ProfessorAttributes>
  implements ProfessorAttributes{
    id!: number;
    nome!: string;
    email!: string;
    idade!: number;
    salario!: number;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    static associate(models: any) {
      // define association here
    }
  }
  Professor.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      idade: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Professor',
    }
  );
  return Professor;
};
