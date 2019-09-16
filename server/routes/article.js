const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')
const authenticaton = require('../middlewares/authentication')
const authotization = require('../middlewares/authorization')

router.use(authenticaton)
router.get('/', articleController.findAll)
router.get('/userId', articleController.findUserId)
router.post('/', articleController.write)
router.put('/:id', authotization, articleController.update)
router.delete('/:id', authotization, articleController.remove)

module.exports = router