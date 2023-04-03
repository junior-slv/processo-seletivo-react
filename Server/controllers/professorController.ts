import db from "../models";


const Professor: any = db.professores;

//adicionar colegio
const addProfessor = async (req: any, res: any) => {
  try { 
  let info = {
    nome: req.body.nome,
    email: req.body.email,
    idade: req.body.idade
  };
  const professor = await db.Professor.create(info);
  res.status(200).send(professor);
} catch (ex) {
  console.error(ex);
  res.status(412);
}
};
//mostrar todos os colegios
const getAllProfessores = async (req: any, res: any) => {
  let professores = await db.Professor.findAll({});
  res.status(200).send(professores);
};

//mostrar um colegio especifico
const getProfessor = async (req: any, res: any) => {
  let id = req.params.id;
  let professor = await db.Professor.findOne({ where: { id: id } });
  res.status(200).send(professor);
};

//atualizar colegio
const updateProfessor = async (req: any, res: any) => {
  let id = req.params.id;
  const professor = await db.Professor.update(req.body, { where: { id: id } });
  res.status(200).send(professor);
};

//deletar colegio
const deleteProfessor = async (req: any, res: any) => {
    let id = req.params.id;
    await db.Professor.destroy({ where: {id: id}})
    res.status(200).send("Professor removido!");
  };

module.exports = {
    addProfessor,
    getAllProfessores,
    getProfessor,
    updateProfessor,
    deleteProfessor,
}