const ArticleController = require('../controllers/article')
const router = require('express').Router()
const authenticate = require('../middlewares/authenticate')
const authorizeArticle = require('../middlewares/authorizeArticle')
app.use(authenticate)
router.get('/', ArticleController.readArticle)
router.post('/', ArticleController.createArticle)
router.patch('/:_id', authorizeArticle, authoArticleController.updateArticle)
router.delete('/:_id', authorizeArticle, ArticleController.removeArticle)

module.exports = router