const { Storage } = require('@google-cloud/storage');

function deletFile(fileName) {
    const storage = new Storage({
        projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
        keyFilename: process.env.GOOGLE_CLOUD_KEYFILE
    })

    const CLOUD_BUCKET = process.env.GOOGLE_CLOUD_BUCKET

    storage
        .bucket(CLOUD_BUCKET)
        .file(fileName)
        .delete()
}

module.exports = deletFile