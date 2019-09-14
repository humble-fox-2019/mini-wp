const express = require('express')
const router = express.Router()
const article = require('../routes/article')
const user = require('../routes/user')
const authentication = require('../middleware/authentication')

router.use('/users', user)
router.use(authentication)
router.use('/articles', article)



module.exports = router