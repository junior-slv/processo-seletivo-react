import { Model } from "sequelize";

interface UserAttributes{
  id: number,
  userLogin: string,
  userPassword: string,
}


module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> 
  implements UserAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    userLogin!: string;
    userPassword!: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    static associate(models: any) {
      // define association here

    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userLogin: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
      userPassword: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
