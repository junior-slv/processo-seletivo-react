const userController =  require('../controllers/userController');
const router = require('express').Router();

router.post('/adduser', userController.addUser)

router.get('/allusers', userController.getAllUsers)

router.get('/:id', userController.getUser)

router.put('/:id', userController.updateUser)

router.delete(':id', userController.deleteUser)

router.post('/login', userController.logarUser)

module.exports = router;