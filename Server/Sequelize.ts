import { Sequelize } from 'sequelize-typescript';
import { User } from './models/User';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'colegio',
  username: 'root',
  password: '',
  host: 'localhost',
  port: 3306,
  models: [User],
});