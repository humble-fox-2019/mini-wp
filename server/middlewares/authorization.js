const Article = require('../models/article')

function authorization(req, res, next){
  Article.findById(req.params.id)
  .then(isFound =>{
      if (isFound.author === req.decoded._id){
        next()
      }
      else {
        next({
          status : 401,
          message : 'Unathorized'
        })
      }
  })
  .catch(() =>{
    next({
      status: 404,
      message: 'Not Found'
    })
  })
}

module.exports = authorization