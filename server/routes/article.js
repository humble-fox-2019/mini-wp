
const router = require('express').Router()
const ArticleController = require('../controllers/article')

router.get('/', ArticleController.getArticles)
router.post('/', ArticleController.create)
router.patch('/:id', ArticleController.update)
router.delete('/:id', ArticleController.delete)

module.exports = router