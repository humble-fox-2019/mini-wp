const express = require('express');
const ArticleControler = require('../controllers/article')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const image = require('../helpers/image')

const router = express.Router();


router.use( authentication )

// Dapetin semua article [DONE]
router.get('/' , ArticleControler.getAll )
// Cari semua article berdasarkan title [/search?title=...]  [Done]
router.get('/search' , ArticleControler.searchByTitle )
// Cari semua article berdasarkan tag [Done]
router.post('/tag' , ArticleControler.searchByTag )
// Dapetin 1 Article by ID 
router.get('/search/:id' ,ArticleControler.getOne )

/* 
    header => token 

    body
    =====
    title , content, image 
    tags , userId [required]
*/

// Create new article [DONE]
router.post('/' , image.multer.single('file'), image.sendUploadToGCS , ArticleControler.create )

// Dapetin semua article yang dibuat user [Done ]
router.get('/user' , ArticleControler.userArticle )

// Cari article user berdasarkan title [/search?title=...]  [DONE]
router.get('/user/search' , ArticleControler.searchByTitleUser )


router.use( '/:id' , authorization )
// Update article user berdasarkan ID [DONE]
router.put('/:id' ,image.multer.single('file'), image.sendUploadToGCS , ArticleControler.update )
// Delete article user berdasarkan ID [DONE]
router.delete('/:id' , ArticleControler.delete )


module.exports = router;