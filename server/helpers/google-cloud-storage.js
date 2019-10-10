const { Storage } = require('@google-cloud/storage')
  
/* const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = process.env.GOOGLE_CLOUD_KEYFILE; // Replace with the path to the downloaded private key */



const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE
})

function getPublicUrl (bucketName, fileName) {
    return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}

module.exports = {storage, getPublicUrl}