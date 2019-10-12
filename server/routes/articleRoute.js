const express = require('express');
const ArticleController = require('../controllers/articleController');
const router = express.Router();
const gcs = require('../helpers/gcs');

const authentication = require('../middlewares/authentication');
const articleCheck = require('../middlewares/articleCheck');

router.use(authentication);
router.get('/', ArticleController.myArticle);
router.post('/', gcs.multer.single('featured_image'), gcs.sendUploadToGCS, ArticleController.store);

router.use("/:id", articleCheck);
router.get('/:id', ArticleController.findOne);
router.patch('/:id', gcs.multer.single('featured_image'), gcs.sendUploadToGCS, ArticleController.update);
router.delete('/:id', ArticleController.delete);

module.exports = router;