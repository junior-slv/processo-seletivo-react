import path from 'path';
const colegioController =  require('../controllers/colegioController');
const colegioRouter = require('express').Router();

colegioRouter.post('/addcolegio',colegioController.addColegio)

colegioRouter.get('/allcolegios', colegioController.getAllColegios)

colegioRouter.get('/:id', colegioController.getColegio)

colegioRouter.put('/:id', colegioController.updateColegio)

colegioRouter.delete('/:id', colegioController.deleteColegio)

colegioRouter.post('/upload', colegioController.uploadSimbolo);

colegioRouter.get('/download/:filename', (req:any, res:any) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../uploads/colegio', filename);
    res.download(filepath);
  });

module.exports = colegioRouter;


