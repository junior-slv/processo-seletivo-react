import path from "path";
import db from "../models";
const multer = require('multer');

const Sala: any = db.salas;

//adicionar sala
const addSala = async (req: any, res: any) => {
  try {
  let info = {
    nome: req.body.nome,
    capacidadeMesas: req.body.capacidadeMesas,
    bloqueada: req.body.bloqueada,
    gradeAulas: req.body.gradeAulas,
    protocolo: req.body.protocolo,
  };
  
  const sala = await db.Sala.create(info);
  res.status(200).send(sala);
} catch (ex) {
  console.error(ex);
  res.status(412);
}
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



  const storage = multer.diskStorage({

    destination: function (req:any, file:any, cb:any) {
      cb(null, 'uploads/sala')
    },
    filename: function  (req:any, file:any, cb:any) {
      cb(null, file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });



  function uploadProtocolo(req:any, res:any) {
    upload.single('file')(req, res, function(err:any) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send('Arquivo enviado com sucesso!');
    });
  }


module.exports = {
    addSala,
    getAllSalas,
    getSala,
    updateSala,
    deleteSala,
    uploadProtocolo,
}