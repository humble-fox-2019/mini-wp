const router = require('express').Router()
const articleController = require('../controllers/ArticleController')
const uploadHandler = require('../middleware/uploadHandler')

router.post('/', uploadHandler, articleController.create)


module.exports = router

