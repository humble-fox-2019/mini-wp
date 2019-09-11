const Article = require('../models/Article')

class ArticleController {

  static create(req, res, next) {
    const { title, content } = req.body
    Article.create({ title, content, image: req.file.path })
      .then(data => {
        res.json(data)
      })
      .catch(next)
  }

  static getAll(req, res, next) {
    Article.find(null, null, {
      sort: {
        updatedAt: -1
      }
    })
      .then(articles => {
        res.json(articles)
      })
      .catch(next)
  }

}


module.exports = ArticleController
