const router = require('express').Router()
const { UserController } = require('../controllers')

router.get('/', (req, res, next) => res.send('from user'))
router.post('/register',  UserController.register)
router.post('/login', UserController.login)

module.exports = router