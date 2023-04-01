import db from "../models";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User: any = db.users;

//adicionar usuario
const addUser = async (req: any, res: any) => {
  try {
    let info = {
      userLogin: req.body.userLogin,
      userPassword: req.body.userPassword,
    };
    const user = await db.User.create(info);
    res.status(200).send(user);
  } catch (ex) {
    console.error(ex);
    res.status(412);
  }
};
//mostrar todos os usuarios
const getAllUsers = async (req: any, res: any) => {
  let users = await db.User.findAll({});
  res.status(200).send(users);
};

//mostrar usuario especifico
const getUser = async (req: any, res: any) => {
  let id = req.params.id;
  let user = await db.User.findOne({ where: { id: id } });
  res.status(200).send(user);
};

//atualizar usuario
const updateUser = async (req: any, res: any) => {
  let id = req.params.id;
  const user = await User.update(req.body, { where: { id: id } });
  res.status(200).send(user);
};

//deletar usuario
const deleteUser = async (req: any, res: any) => {
    let id = req.params.id;
    await db.User.destroy({ where: {id: id}})
    res.status(200).send("Usuário removido!");
  };
//logar
const logarUser = async (req: any, res: any) => {
  
  const { userLogin, userPassword } = req.body;
  const user = await db.User.findOne({ where: { userLogin } });
  
  if (!user) {
    console.log("true");
    return res.status(401).json({ message: 'Usuário não encontrado' });
  }
  
  const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Senha incorreta' });

    
  }
  // res.status(200).send("Usuário encontrado!");
  const token = jwt.sign({ userId: user.id }, 'chave_secreta');

  res.status(200).json({ token });
};
module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    logarUser
}