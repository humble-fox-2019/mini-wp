const routes = require('express').Router();
const miniWP = require('../controllers/miniWp')
const images = require('../helpers/images')
const checker = require('../helpers/imagechecker')
const authorization = require('../middlewares/authorization')

routes.get('/', miniWP.getAll);
routes.get('/myArticle', miniWP.getMyArticle);
routes.post('/', images.multer.single('featured_image'), checker, images.sendUploadToGCS, miniWP.createArticle);
routes.post('/search', miniWP.getArticle);
routes.delete('/:id', miniWP.deleteArticle);
routes.patch('/:id', images.multer.single('featured_image'), checker, images.sendUploadToGCS, miniWP.updateArticle);

module.exports = routes