const Multer = require('multer')
const MulterGoogleStorage = require('multer-google-storage')

const accepted_extensions = ['jpg', 'png']

const upload = Multer({
  storage : MulterGoogleStorage.storageEngine({
    projectId : process.env.GOOGLE_PROJECT_ID,
    keyFilename : process.env.GOOGLE_APPLICATION_CREDENTIALS,
    bucket : 'josprima-mini-wp-image',
    acl : 'publicread'
  }),
  limits: {
    fileSize: 1 * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (accepted_extensions.some(ext => file.originalname.endsWith("." + ext))) {
        return cb(null, true)
    }
    cb('Only jpg or png files are allowed!');
  }
}).single('image')

function uploadFile(req, res, next) {
  upload(req, res, function(err) {
    console.log('masuk')
    if(err instanceof Multer.MulterError) {
      console.log('5')
      next({
        status : 400,
        message : err.message
      })
    }else if(err){
      console.log('4')
      next({
        status : 400,
        message : err
      })
    }else{
      console.log('3')
      next()
    }
  })
}


module.exports = upload