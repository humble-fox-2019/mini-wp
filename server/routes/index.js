const express = require('express')
const router = express.Router()
const miniWp = require('../routes/miniWp')
const user = require('../routes/user')
const authentication = require('../middlewares/authentication')

router.use('/user', user)
router.use(authentication)
router.use('/miniWp',miniWp)



module.exports = router