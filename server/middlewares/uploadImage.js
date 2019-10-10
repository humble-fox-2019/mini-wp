	
  const gcsHelpers = require('../helpers/google-cloud-storage');
  
  const { storage } = gcsHelpers;

  function sendUploadToGCS (req, res, next) {
    if (!req.file) {
      next({
        name : 'Bad Request',
        msg :'invalid file'
      });
    }

    if (req.file.mimetype.split('/')[0] !== 'image') {
      next({
        name : 'Bad Request',
        msg :'invalid file'
      });
    }
  
    const bucketName = req.body.bucketName || process.env.GOOGLE_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    const gcsFileName = `${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(gcsFileName);
  
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });
  
    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      next(err);
    });
  
    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsFileName;
  
      return file.makePublic()
        .then(() => {
          res.status(200).json(gcsHelpers.getPublicUrl(bucketName, gcsFileName))
          //req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
          //next();
        })
        .catch(next)
    });
  
    stream.end(req.file.buffer);
  };

  module.exports = sendUploadToGCS



