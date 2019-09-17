const express = require('express');
const router = express.Router();
const { article_controller   } = require('../controllers');
const { multer , sendUploadToGCS, validate_format , deleteFile } = require('../middelware/gcs');
const { Authenthication , Authorized } = require('../middelware');
const tagMiddleware = require('../middelware/tag')
const tagMiddleware2 = require('../middelware/tag2')

router.use(Authenthication);

router.post('/'  , multer.single('image') , sendUploadToGCS ,  validate_format , tagMiddleware , article_controller.addArticle);
router.get('/' , article_controller.ShowAllArticle );
router.get('/tag' , article_controller.getByTag)
router.get('/:id' ,  article_controller.getOne)
router.put('/:id' ,  Authorized , multer.single('image') , sendUploadToGCS ,  validate_format , tagMiddleware , deleteFile , article_controller.editArticle)
router.delete('/:id' , Authorized  ,  article_controller.Delete)


module.exports = router