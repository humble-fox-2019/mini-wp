const router = require('express').Router()
const articleController = require('../controllers/ArticleController')
const images = require('../helpers/images')

router.post('/', images.multer.single('image'), images.sendUploadToGCS,  articleController.create)
router.get('/', articleController.getAll)


module.exports = router

