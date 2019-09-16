const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/:id', userController.findOne)
router.post('/', userController.register)
router.post('/login', userController.login)
router.post('/signin', userController.signin)
router.patch('/:id', userController.changePassword)

module.exports = router