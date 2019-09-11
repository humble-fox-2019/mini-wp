require('dotenv').config()

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage')

// Creates a client
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
});

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const bucket = storage.bucket(CLOUD_BUCKET)
// console.log(bucket);

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

// .then(bucket => {
//   console.log(bucket)
// })
// .catch(err => {
//   console.log(err)
// })

// function createBucket() {
//   // Creates the new bucket
//   storage.createBucket(CLOUD_BUCKET)
//     .then(test => {
//       console.log(test);
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   // console.log(`Bucket ${CLOUD_BUCKET} created.`);
// }

// createBucket()

const Multer = require('multer'),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024
    }
    // dest: '../images'
  })

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}