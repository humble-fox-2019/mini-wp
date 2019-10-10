const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')
const emailDuplicateChecker = require('../middlewares/emailDuplicateChecker')


router.post('/register', emailDuplicateChecker, UserController.create)
router.post('/login', UserController.login)
router.get('/',UserController.findAll)

module.exports = router
