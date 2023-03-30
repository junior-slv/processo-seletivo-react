import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { sequelize } from '../Sequelize';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ where: { login } });
  if (!user) {
    return res.status(401).send({ error: 'Invalid login or password' });
  }
  const passwordIsValid = await user.validatePassword(password);
  if (!passwordIsValid) {
    return res.status(401).send({ error: 'Invalid login or password' });
  }
  const token = jwt.sign({ id: user.id }, 'my_secret_key', { expiresIn: '1h' });
  res.send({ token });
});

export { router };