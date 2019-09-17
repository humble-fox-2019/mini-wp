const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')
const authenticaton = require('../middlewares/authentication')
const authotization = require('../middlewares/authorization')
const {
    multer,
    sendUploadToGCS
} = require('../middlewares/multer')

router.use(authenticaton)
router.get('/', articleController.findAll)
router.get('/userId', articleController.findUserId)
router.get('/:id', articleController.findById)
router.post('/', multer.single('image'), sendUploadToGCS, articleController.write)
router.put('/:id', authotization, articleController.update)
router.delete('/:id', authotization, articleController.remove)

module.exports = router