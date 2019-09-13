
const router = require('express').Router()
const ArticleController = require('../controllers/article')

router.get('/', ArticleController.getArticles)
router.post('/', ArticleController.create)
router.get('/:id', ArticleController.getArticle)
router.patch('/:id', ArticleController.update)
router.delete('/:id', ArticleController.delete)
router.get('/search/:tag', ArticleController.searchByTag)

module.exports = router