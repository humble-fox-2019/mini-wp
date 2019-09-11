'use strict'

const multer = require('multer')
const multerGoogleStorage = require('multer-google-storage')

const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine({
    // isi configuration .... cek dokumentasi multer
    projectId: process.env.GOOGLE_PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIAL
    // bucket	string	"mybucketname
  })
})

module.exports = {

}
