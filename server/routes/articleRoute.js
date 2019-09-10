const express = require('express');
const ArticleController = require('../controllers/articleController');
const router = express.Router();

const authentication = require('../middlewares/authentication');

router.use(authentication);
router.get('/', ArticleController.findAll);
router.post('/', ArticleController.store);

router.get('/:id', ArticleController.findOne);
router.patch('/:id', ArticleController.update);
router.delete('/:id', ArticleController.delete);

module.exports = router;