const router = require('express').Router()
const { articleController } = require('../controllers/')
const { multer, sendUploadToGCS } = require('../helpers/gcl')

router.get('/', articleController.getAll)
router.post('/', articleController.create)
router.put('/:id', articleController.update)
router.get('/:id', articleController.getOne)
router.delete('/:id', articleController.delete)
router.post('/upload', multer.single('image'), sendUploadToGCS, articleController.upload)

module.exports = router