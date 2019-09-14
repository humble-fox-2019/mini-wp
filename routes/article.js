const router = require('express').Router()
const { ArticleController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const images = require('../middlewares/images')

router.use(authentication)
router.get('/', ArticleController.getAll)
router.post('/', images.multer.single('image'), images.sendUploadToGCS, ArticleController.create)

router.use('/:id', authorization)
router.get('/:id', ArticleController.getOne)
router.put('/:id', ArticleController.update)
router.delete('/:id', ArticleController.delete)

module.exports = router