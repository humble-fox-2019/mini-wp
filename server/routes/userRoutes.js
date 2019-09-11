const router = require('express').Router()
const userController = require('../controllers/UserController')

router.post('/signin', userController.signin)
router.post('/signup', userController.signup)

module.exports = router
