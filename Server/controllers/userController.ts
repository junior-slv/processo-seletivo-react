import db from "../models";

const User: any = db.users;

//adicionar usuario
const addUser = async (req: any, res: any) => {
  let info = {
    userLogin: req.body.userLogin,
    userPassword: req.body.userPassword,
  };
  const user = await db.User.create(info);
  res.status(200).send(user);
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

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}