const router = require('express').Router()
const { articleController } = require('../controllers/')

router.get('/', articleController.getAll)
router.post('/', articleController.create)
router.put('/:id', articleController.update)
router.get('/:id', articleController.getOne)
router.delete('/:id', articleController.delete)

module.exports = router