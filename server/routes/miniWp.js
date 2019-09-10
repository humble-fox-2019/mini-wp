const routes = require('express').Router();
const miniWP = require('../controllers/miniWp')
const authorization = require('../middlewares/authorization')

routes.get('/', miniWP.getAll);
routes.get('/myArticle', miniWP.getMyArticle);
routes.post('/', miniWP.createArticle);
routes.post('/search', miniWP.getArticle);
routes.delete('/:id', miniWP.deleteArticle);
routes.patch('/:id', miniWP.updateArticle);

module.exports = routes