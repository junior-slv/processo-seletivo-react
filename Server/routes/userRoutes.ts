const userController =  require('../controllers/userController');
const userRouter = require('express').Router();

userRouter.post('/adduser', userController.addUser)

userRouter.get('/allusers', userController.getAllUsers)

userRouter.get('/:id', userController.getUser)

userRouter.put('/:id', userController.updateUser)

userRouter.delete('/:id', userController.deleteUser)

userRouter.post('/login', userController.logarUser)

module.exports = userRouter;