const express = require('express')
const router = express.Router()
const article = require('../routes/article')
const user = require('../routes/user')
const authentication = require('../middlewares/authentication')


router.use('/', user)
//router.use(authentication)
router.use('/articles', article)



module.exports = router