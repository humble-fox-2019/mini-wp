const Storage = require('@google-cloud/storage')
const Multer = require('multer')

const storage = new Storage.Storage({
    projectId : process.env.GOOGLE_PROJECT_ID,
    keyFilename : process.env.GOOGLE_APPLICATION_CREDENTIALS,
})
const CLOUD_BUCKET = 'josprima-mini-wp-image'
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
    if(!req.file) {
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

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
        fileSize: 1 * 1024 * 1024,
        files: 1
    }
})

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer
}
