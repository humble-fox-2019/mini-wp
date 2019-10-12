const express = require('express');
const UserController = require('../controllers/userController');
const userCheck = require('../middlewares/userCheck');

const router = express.Router();

router.get('/search', UserController.search);
router.get('/:id', UserController.findOne);

router.use("/:id", userCheck);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;