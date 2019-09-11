const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')

router.get('/', articleController.findAll)
router.post('/', articleController.write)
router.put('/'. articleController.update)
router.delete('/', articleController.remove)

module.exports = router