const express = require('express');
const router = express.Router();
const { article_controller   } = require('../controllers');
const { multer , sendUploadToGCS, validate_format } = require('../middelware/gcs');
const { Authenthication } = require('../middelware');
const tagMiddleware = require('../middelware/tag')

router.use(Authenthication);

router.post('/'  , multer.single('image') , sendUploadToGCS ,  validate_format , tagMiddleware , article_controller.addArticle);
router.get('/' , article_controller.ShowAllArticle );
router.get('/:id' ,  article_controller.getOne)


module.exports = router