import { Model } from "sequelize";
import bcrypt from 'bcrypt';
import { HookReturn } from "sequelize/types/hooks";
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
    static async hashPassword(user: User): Promise<void> {
      const saltRounds = 10;
      if (user.changed('userPassword')) {
        user.userPassword = await bcrypt.hash(user.userPassword, saltRounds);
      }
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
  User.beforeSave(User.hashPassword);
  
  return User;
};
