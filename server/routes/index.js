
const router = require('express').Router()
const articleRouter = require('./article')
const images = require('../helpers/image')

router.get('/', (req, res) => {
    res.status(200).json({
        message: `app is running`
    })
})

router.post('/upload',
    images.multer.single('image'),
    images.sendUploadToGCS,
    (req, res) => {
        res.send({
            status: 200,
            message: 'Your file is successfully uploaded',
            link: req.file.cloudStoragePublicUrl
        })
    })

router.use('/articles', articleRouter)

module.exports = router