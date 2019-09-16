const router = require('express').Router()
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

const articleController = require('../controller/article')
const multer = require('multer')({

    limits: {
        fileSize: 5 * 1024 * 1024
    }

})
const gcs = require('../middleware/uploadImage')

router.use(authentication)

router.get('/', articleController.findAll)
router.post('/', multer.single('picture'), gcs, articleController.create)
router.put('/:id', authorization, articleController.update)
router.delete('/:id', authorization, articleController.delete)
router.get('/:title', articleController.findOne)
router.get('/all/thread', articleController.findAllPublish)
// router.get('/all', articleController.findThread)




module.exports = router