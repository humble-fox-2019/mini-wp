const ArticleController = require('../controllers/article')
const router = require('express').Router()
const authenticate = require('../middlewares/authenticate')
const authorizeArticle = require('../middlewares/authorizeArticle')
router.use(authenticate)
router.get('/', ArticleController.readArticle)
router.post('/', ArticleController.createArticle)
router.use(authorizeArticle)
router.patch('/:_id', ArticleController.updateArticle)
router.delete('/:_id', ArticleController.removeArticle)

module.exports = router