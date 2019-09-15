'use strict'

const router = require('express').Router()
const { ArticleController } = require('../controllers')
const { authorization } = require('../middlewares/authorization')
// const { multer, sendUploadToGCS } = require('../middlewares/gcs')

router.get('/', ArticleController.findAll)
router.post('/', ArticleController.create)
router.post('/search', ArticleController.search)
router.patch('/:id', authorization, ArticleController.edit)
router.delete('/:id', authorization, ArticleController.remove)

module.exports = router

//  multer.single('image'), sendUploadToGCS,
