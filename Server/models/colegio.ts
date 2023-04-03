import { Model } from "sequelize";

interface ColegioAttributes{
  id: number,
  nome:string,
  estado:string,
  cidade:string,
  simbolo:string,
  
}


module.exports = (sequelize: any, DataTypes: any) => {
  class Colegio extends Model<ColegioAttributes> 
  implements ColegioAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    nome!:string;
    estado!:string;
    cidade!:string;
    simbolo!:string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    static associate(models: any) {
      // define association here

    }
  }
  Colegio.init(
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
      estado: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      cidade: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      simbolo: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Colegio',
    }
  );
  return Colegio;
};
