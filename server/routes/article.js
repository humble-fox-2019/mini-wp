'use strict'

const router = require('express').Router()
const { ArticleController } = require('../controllers')
const { authorization } = require('../middlewares/authorization')

router.get('/', ArticleController.findAll)
router.get('/:id', ArticleController.findOne)
router.get('/user', ArticleController.findAllUserArticle)
router.post('/', ArticleController.create)

// authorization
router.use(authorization)
router.patch('/:id', ArticleController.updateOne)
router.delete('/:id', ArticleController.deleteOne)

module.exports = router
