const {Storage} = require('@google-cloud/storage');
  
const GOOGLE_CLOUD_PROJECT_ID = 'iconic-flare-249802'; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = '/My First Project-d7047c49abfd.json'; // Replace with the path to the downloaded private key

const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
});

exports.getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;