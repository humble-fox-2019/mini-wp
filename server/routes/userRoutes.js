const router = require('express').Router()
const userController = require('../controllers/UserController')

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)
router.post('/signinGoogle', userController.signinGoogle)

module.exports = router
