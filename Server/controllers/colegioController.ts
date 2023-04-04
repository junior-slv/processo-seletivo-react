import path from "path";
import db from "../models";
const multer = require('multer');

const Colegio: any = db.colegios;

//adicionar colegio
const addColegio = async (req: any, res: any) => {
  try { 
  let info = {
    nome: req.body.nome,
    estado: req.body.estado,
    cidade: req.body.cidade,
    simbolo: req.body.simbolo
  };
  const colegio = await db.Colegio.create(info);
  res.status(200).send(colegio);
} catch (ex) {
  console.error(ex);
  res.status(412);
}
};
//mostrar todos os colegios
const getAllColegios = async (req: any, res: any) => {
  let colegios = await db.Colegio.findAll({});
  res.status(200).send(colegios);
};

//mostrar um colegio especifico
const getColegio = async (req: any, res: any) => {
  let id = req.params.id;
  let colegio = await db.Colegio.findOne({ where: { id: id } });
  res.status(200).send(colegio);
};

//atualizar colegio
const updateColegio = async (req: any, res: any) => {
  let id = req.params.id;
  const colegio = await db.Colegio.update(req.body, { where: { id: id } });
  res.status(200).send(colegio);
};

//deletar colegio
const deleteColegio = async (req: any, res: any) => {
    let id = req.params.id;
    await db.Colegio.destroy({ where: {id: id}})
    res.status(200).send("Colégio removido!");
  };



  const storage = multer.diskStorage({

    destination: function (req:any, file:any, cb:any) {
      cb(null, 'uploads/colegio/')
    },
    filename: function  (req:any, file:any, cb:any) {
      cb(null, file.originalname)
    }
  });
  
  export const upload = multer({ storage: storage });



  function uploadSimbolo(req:any, res:any) {
    try{
      upload.single('file')(req, res, function(err:any) {
        return res.status(200).send('Arquivo enviado com sucesso!');
        })
    } catch (ex) {
      console.error(ex);
      res.status(412);
    }
  ;
  }


  module.exports = {
    addColegio,
    getAllColegios,
    getColegio,
    updateColegio,
    deleteColegio,
    uploadSimbolo,
}