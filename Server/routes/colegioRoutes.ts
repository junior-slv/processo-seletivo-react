const colegioController =  require('../controllers/colegioController');
const colegioRouter = require('express').Router();

colegioRouter.post('/addcolegio', colegioController.addColegio)

colegioRouter.get('/allcolegios', colegioController.getAllColegios)

colegioRouter.get('/:id', colegioController.getColegio)

colegioRouter.put('/:id', colegioController.updateColegio)

colegioRouter.delete(':id', colegioController.deleteColegio)

module.exports = colegioRouter;


