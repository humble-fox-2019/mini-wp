const router = require('express').Router();
const ArticleController = require('../controllers/article');
const { authentication } = require('../middlewares/authentication');
const { isOwner } = require('../middlewares/authorization');

router.use(authentication);

router.get('/', ArticleController.findAll);

router.post('/', ArticleController.create);

router.put('/:id', isOwner, ArticleController.update);

router.delete('/:id', isOwner, ArticleController.delete);

module.exports = router;