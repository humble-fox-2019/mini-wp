const express = require('express');
const PostController = require('../controllers/post');
const router = express.Router();
const Multer = require('multer');
const sendUploadToGCS = require('../middlewares/uploadImage')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
  });
  

router.post('/upload-file', multer.single('file'), sendUploadToGCS)

router.use(authentication)

router.get('/',PostController.read)
router.post('/', PostController.create)
router.patch('/:id',authorization,PostController.patch)
router.delete('/:id', authorization, PostController.delete)


  	
/*   router.post(
    '/upload',
    multer.single('file'),
    sendUploadToGCS,
    (req, res, next) => {
      if (req.file && req.file.gcsUrl) {
        return res.send(req.file.gcsUrl);
      }
  
      return res.status(500).send('Unable to upload');
    },
  );
   */
module.exports = router;


