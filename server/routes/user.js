const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/:id', userController.findOne)
router.post('/', userController.register)
router.post('/login', userController.login)
router.post('/signin', userController.signin)
router.put('/:id', userController.update)
router.patch('/:id', userController.changePassword)
router.delete(':id', userController.remove)

module.exports = router