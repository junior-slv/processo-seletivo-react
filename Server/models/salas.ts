import { Model } from "sequelize";

interface SalaAttributes{
  id: number,
  nome: string,
  capacidadeMesas: number,
  bloqueada: Boolean,
  gradeAulas: string,
  protocolo: string
}


module.exports = (sequelize: any, DataTypes: any) => {
  class Sala extends Model<SalaAttributes> 
  implements SalaAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    nome!: string;
    capacidadeMesas!: number;
    bloqueada!: Boolean;
    gradeAulas!: string;
    protocolo!: string

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    static associate(models: any) {
      // define association here

    }

  }
  Sala.init(
    {
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
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      bloqueada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      gradeAulas: {
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      protocolo: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Sala',
    }
  );
  
  return Sala;
};
