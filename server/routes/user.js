const router = require('express').Router()

const userController = require('../controller/user')

router.post('/', userController.register)
router.post('/login', userController.login)
router.post('/signInGoogle', userController.loginGoogle)



module.exports = router