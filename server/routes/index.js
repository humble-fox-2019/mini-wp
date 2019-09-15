const express = require ('express')
const router = express.Router()
const user= require('./userRouter')
const article = require('./articleRouter')
const images = require("../helpers/image.js");

router.use('/users', user)
router.use('/articles', article)


module.exports = router