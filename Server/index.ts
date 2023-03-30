import { sequelize } from './Sequelize';
import { app } from './app';

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server started'));
})