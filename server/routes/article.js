const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')

router.get('/', articleController.findAll)
router.post('/', articleController.write)
// router.put('/:id'. articleController.update)
router.delete('/:id', articleController.remove)

module.exports = router