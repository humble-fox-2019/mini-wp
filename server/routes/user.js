const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

console.log('regis');

router.post('/login', userController.signIn)
router.post('/Gsignin', userController.GsignIn)
router.post('/register', userController.register)


module.exports = router;