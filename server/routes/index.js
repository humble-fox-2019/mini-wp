const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const articleRouter = require('./article')

router.use('/articles', articleRouter)
router.use('/users', userRouter)

module.exports = router