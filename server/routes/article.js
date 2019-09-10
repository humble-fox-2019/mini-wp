const ArticleController = require('../controllers/article')
const router = require('express').Router()

router.get('/', ArticleController.readArticle)
router.post('/', ArticleController.createArticle)
router.patch('/:_id', ArticleController.updateArticle)
router.delete('/:_id', ArticleController.removeArticle)

module.exports = router