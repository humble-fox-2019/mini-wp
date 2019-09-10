const express = require ('express')
const router = express.Router()
const ArticleController = require('../controllers/articleController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.get('/', authentication, ArticleController.getAll)
router.get('/:id', authentication, ArticleController.getOne)
router.post('/create', authentication, ArticleController.create)
router.get('/own', authentication, ArticleController.findMyArticle )
router.put('/:id', authentication, authorization, ArticleController.updatePut)
router.delete('/:id', authentication, authorization, ArticleController.destroy)

module.exports = router