import db from "../models";


const Sala: any = db.salas;

//adicionar sala
const addSala = async (req: any, res: any) => {
  let info = {
    nome: req.body.nome,
    capacidadeMesas: req.body.capacidadeMesas,
    bloqueada: req.body.bloqueada,
    professores: req.body.professores,
    gradeAulas: req.body.gradeAulas,
    protocolo: req.body.protocolo,
  };
  const sala = await db.Sala.create(info);
  res.status(200).send(sala);
};
//mostrar todos os colegios
const getAllSalas = async (req: any, res: any) => {
  let salas = await db.Sala.findAll({});
  res.status(200).send(salas);
};

//mostrar uma sala especifica
const getSala = async (req: any, res: any) => {
  let id = req.params.id;
  let sala = await db.Sala.findOne({ where: { id: id } });
  res.status(200).send(sala);
};

//atualizar sala
const updateSala = async (req: any, res: any) => {
  let id = req.params.id;
  const sala = await db.Sala.update(req.body, { where: { id: id } });
  res.status(200).send(sala);
};

//deletar sala
const deleteSala = async (req: any, res: any) => {
    let id = req.params.id;
    await db.Sala.destroy({ where: {id: id}})
    res.status(200).send("Sala removida!");
  };

module.exports = {
    addSala,
    getAllSalas,
    getSala,
    updateSala,
    deleteSala,
}