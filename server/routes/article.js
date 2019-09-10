const router = require('express').Router()

const articleController = require('../controller/article')

router.get('/', articleController.findAll)
router.post('/', articleController.create)
router.put('/:id', articleController.update)
router.delete('/:id', articleController.delete)




module.exports = router