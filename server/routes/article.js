const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')
const images = require('../helpers/images')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

//router.use(authentication)
router.get('/getAll', articleController.findArticles)
router.get('/filter/:id', articleController.findOne)
router.post('/create',images.multer.single('featured_image'), 
images.sendUploadToGCS, articleController.create)
router.patch('/update/:id',authorization,images.multer.single('featured_image'), 
images.sendUploadToGCS, articleController.update)
router.delete('/delete/:id',authorization, articleController.delete)
router.get('/myArticles', articleController.findMine)
router.get('/tags/:tag', articleController.tagsbyName)


module.exports = router;