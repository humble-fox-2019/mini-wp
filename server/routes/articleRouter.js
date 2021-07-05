const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/articleController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const images = require("../helpers/image.js");

router.post("/upload", images.multer.single("image"),
images.sendUploadToGCS,
(req, res) => {
    // console.log(req.file.cloudStoragePublicUrl, '<<<<<<<<<< !!);
    res.send({
        status: 200,
        gcsName: req.body.fileName,
        message: "Your file is successfully uploaded",
        link: req.file.cloudStoragePublicUrl
    });
}
);
router.use(authentication)
router.post('/create', ArticleController.create)
router.get('/myarticle', ArticleController.getMyArticle)
router.get('/:id', ArticleController.getOne)
// router.get('/search/:search', ArticleController.getByTitle)
router.put('/:id', authorization, images.multer.single("featured_image"), images.sendUploadToGCS, ArticleController.updatePut)
router.delete('/:id', authorization, ArticleController.destroy)

module.exports = router