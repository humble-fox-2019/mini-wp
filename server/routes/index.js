const router = require('express').Router();
const article = require('./article');
const images = require('../middlewares/image')


 router.use('/article', article);

// router.get('/', (req, res, next) => {
//     res.send({ message: 'Welcome Buddy!' })
//   })

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


module.exports = router;