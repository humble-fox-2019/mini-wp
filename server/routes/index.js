'use strict'

const express = require('express')
const userRouter = require('./user')
const articleRouter = require('./article')
const { authentication } = require('../middlewares/authentication')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json({ page: 'Home', message: 'Connected to Mini WP Apps!' })
})

// Routing
router.use('/users', userRouter)
router.use(authentication)
router.use('/articles', articleRouter)

module.exports = router
