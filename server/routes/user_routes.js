const express = require('express');
const router = express.Router();

const {  user_controller } = require('../controllers')

router.post('/register' , user_controller.Register )
router.post('/login' , user_controller.Login)
router.post('/google' , user_controller.RegisterGoogle )

module.exports = router