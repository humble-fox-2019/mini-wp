const { Storage } = require('@google-cloud/storage')
const CLOUD_BUCKET = process.env.CLOUD_BUCKET
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
})

module.exports = async function deleteFile(fileName) {
    console.log(fileName , ' DI HELPER GCS')
    let filename = fileName
    filename = urlToFileName(filename)
   
    try{
     await storage
     .bucket(CLOUD_BUCKET)
     .file(filename)
     .delete();
    } 
    catch{
        next({ status : 500 })
    }
   
}
   