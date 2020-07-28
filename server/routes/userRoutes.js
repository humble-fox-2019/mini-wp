const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.get('/', function(req, res, next){
    res.status(200).json("masuk ke user routes")
})

router.post('/login',UserController.login)
router.post('/signIn',UserController.signIn)
router.post('/register', UserController.create)







module.exports = router
