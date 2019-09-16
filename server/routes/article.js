const ArticleController = require('../controllers/article')
const router = require('express').Router()
const authenticate = require('../middlewares/authenticate')
const authorizeArticle = require('../middlewares/authorizeArticle')
const { multer, sendUploadToGCS } = require('../middlewares/multer')
router.use(authenticate)
router.get('/', ArticleController.readArticle)
router.post('/', multer.single('image'), sendUploadToGCS, ArticleController.createArticle)
router.patch('/:_id', multer.single('image'), sendUploadToGCS, authorizeArticle, ArticleController.updateArticle)
router.delete('/:_id', authorizeArticle, ArticleController.removeArticle)

module.exports = router