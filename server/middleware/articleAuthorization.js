const Article = require('../models/Article')


function articleAuthorization(req, res, next) {
  Article.findById(req.params.id)
    .then(article => {
      if(article) {
        if(article.owner == req.decode.id) {
          next()
        }else {
          next({
            status: 401,
            message: 'Unauthorized action'
          })
        }
      }else {
        next({
          status: 404,
          message: 'Article not found'
        })
      }
    })
}


module.exports = articleAuthorization
