const express = require('express');
const PostController = require('../controllers/post');
const router = express.Router();

router.get('/',PostController.read)
router.post('/',PostController.create)
router.patch('/:id',PostController.patch)
router.delete('/:id',PostController.delete)

module.exports = router;


