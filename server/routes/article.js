const express = require('express');
const ArticleControler = require('../controllers/article')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

const router = express.Router();

// Must login first
router.use( authentication )

router.get('/' , ArticleControler.getAll )
router.get('/search' , ArticleControler.searchByTitle )

// header => token 

// body
// title , content, image 
// tags , userId [required]
router.post('/' , ArticleControler.create )
router.get('/user' , ArticleControler.searchUserArticle )
router.get('/:id' , ArticleControler.getById )
router.use( '/:id' ,authorization )
router.put('/:id' , ArticleControler.update )
router.delete('/:id' , ArticleControler.delete )
module.exports = router;