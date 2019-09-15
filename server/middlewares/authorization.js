const { Article } = require('../models')

module.exports = (req, res, next) => {
  const { id } = req.params
  Article.findById(id)
    .then(article => {
      if (article) {
        if (article.userId == req.decode.id) {
          next()
        } else {
          next({ status: 400, message: 'Unauthorized' })
        }
      } else next({ status: 400, message: 'Unauthorized' })
    })
}