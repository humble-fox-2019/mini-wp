const router = require('express').Router();
const ArticleController = require('../controllers/articleController');
const { Authentication, Authorization } = require('../middlewares/authentication');
const { multer, sendUploadToGCS, getPublicUrl } = require('../middlewares/image');

router.use(Authentication);
// router.post('/', multer.single('file'), sendUploadToGCS, ArticleController.create);
// router.get('/', ArticleController.findAll);
// router.get('/find', ArticleController.findByKey);
// router.get('/tag', ArticleController.findByTag);
// router.get('/:id', Authorization, ArticleController.findOne);
router.patch('/:id', Authorization, multer.single('file'), sendUploadToGCS, ArticleController.edit);
// router.delete('/:id', Authorization, ArticleController.delete);

module.exports = router;