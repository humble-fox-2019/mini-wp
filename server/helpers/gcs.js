const { Storage } = require('@google-cloud/storage');

const GOOGLE_CLOUD_BUCKET = process.env.GOOGLE_CLOUD_BUCKET

const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE
})
const bucket = storage.bucket(GOOGLE_CLOUD_BUCKET)

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${GOOGLE_CLOUD_BUCKET}/${filename}`
}

const getGsUri = (filename) => {
    return `gs://${GOOGLE_CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
    if (!req.file) {
        next()
    } else {
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
                req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
                req.file.cloudStorageGsUri = getGsUri(gcsname);
                next()
            })
        })

        stream.end(req.file.buffer)
    }
}

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