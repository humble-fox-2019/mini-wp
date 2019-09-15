
const router = require('express').Router()
const ArticleController = require('../controllers/article')
const { authorization } = require('../middlewares/auth')
const gcs = require('../helpers/gcs')

router.get('/', ArticleController.getArticles)
router.post('/', gcs.multer.single('image'), gcs.sendUploadToGCS, ArticleController.create)

router.get('/search/:tag', ArticleController.searchByTag)

router.use('/:id', authorization)
router.get('/:id', ArticleController.getArticle)
router.patch('/:id', gcs.multer.single('image'), gcs.sendUploadToGCS, ArticleController.update)
router.delete('/:id', ArticleController.delete)

module.exports = router