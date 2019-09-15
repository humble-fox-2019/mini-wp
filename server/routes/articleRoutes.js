const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/ArticleController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const {sendUploadToGCS,multer} = require('../helpers/images')
const translateToIna = require('../middleware/translate')
const filterBadWord = require('../middleware/badWords')

router.use(authentication)
router.get('/', ArticleController.getAll)
router.get('/user', ArticleController.getAllUserArticle)
router.get('/:id', ArticleController.getArticleByTag)
router.post('/', multer.single('image'),sendUploadToGCS,filterBadWord, translateToIna,ArticleController.create)
router.delete('/:id',authorization,ArticleController.delete)
router.patch('/:id',authorization,multer.single('image'),filterBadWord, sendUploadToGCS,ArticleController.update)
router.patch('/:id/addView', ArticleController.addView)


module.exports = router


