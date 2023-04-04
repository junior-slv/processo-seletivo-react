const professorController =  require('../controllers/professorController');
const professorRouter = require('express').Router();

professorRouter.post('/addprofessor',professorController.addProfessor)

professorRouter.get('/allprofessor', professorController.getAllProfessores)

professorRouter.get('/:id', professorController.getProfessor)

professorRouter.put('/:id', professorController.updateProfessor)

professorRouter.delete('/:id', professorController.deleteProfessor)

module.exports = professorRouter;


