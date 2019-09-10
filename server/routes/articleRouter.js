const express = require ('express')
const router = express.Router()
const ArticleController = require('../controllers/articleController')
const authentication = require('../middlewares/authentication')


router.get('/', authentication, ArticleController.getAll)
router.get('/:id', authentication, ArticleController.getOne)
router.post('/create', authentication, ArticleController.create)
router.put('/:id', authentication, authentication, ArticleController.updatePut)

module.exports = router