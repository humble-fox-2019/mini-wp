'use strict'

const router = require('express').Router()
const { ArticleController } = require('../controllers')
const { authorization } = require('../middlewares/authorization')

router.get('/', ArticleController.findAll)
// router.get('/:id', ArticleController.findOne)
router.get('/user', ArticleController.findAllUserArticle)
router.post('/', ArticleController.create)
router.post('/search', ArticleController.search)

router.patch('/:id', ArticleController.edit)
router.delete('/:id', authorization, ArticleController.remove)

module.exports = router
