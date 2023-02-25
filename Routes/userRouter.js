const userController = require('../controllers/userController.js')
const router = require('express').Router()


router.post('/addUser', userController.addUser)
router.get('/allusers', userController.getAllusers)
router.get('/:id', userController.login)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router