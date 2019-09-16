const router = require('express').Router();
const ArticleController = require('../controllers/article');
const { authentication } = require('../middlewares/authentication');
const { isOwner } = require('../middlewares/authorization');
const gcs = require('../middlewares/gcs');
const upload = require('../middlewares/upload');

router.use(authentication);

// untuk coba upload saja
// router.post('/upload', gcs.multer.single('image'), gcs.sendUploadToGCS, (req, res, next) => {
//     res.status(201).json({
//         link: req.file.publicUrl
//     })
// });

router.get('/', ArticleController.findAll);

router.post('/', upload, gcs.sendUploadToGCS, ArticleController.create);

router.put('/:id', isOwner, upload, gcs.sendUploadToGCS, ArticleController.update);

router.delete('/:id', isOwner, ArticleController.delete);

module.exports = router;