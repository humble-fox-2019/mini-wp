const router = require('express').Router()
const articleController = require('../controllers/ArticleController')
const images = require('../helpers/images')
const userAuthentication = require('../middleware/userAuthentication')
const articleAuthorization = require('../middleware/articleAuthorization')


router.use('/', userAuthentication)
router.post('/', images.multer.single('image'), images.sendUploadToGCS,  articleController.create)
router.get('/', articleController.getAll)

router.use('/:id', articleAuthorization)
router.get('/:id', articleController.getOne)
router.delete('/:id', articleController.deleteArticle)
router.put('/:id', images.multer.single('image'), images.sendUploadToGCS, articleController.updateArticle)



module.exports = router

