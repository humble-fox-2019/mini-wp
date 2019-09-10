const { Article } = require('../models/')

class ArticleController {
  static getAll(req, res, next) {
    Article.find()
      .then(articles => {
        if (articles) console.log(articles)
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    const { id } = req.params
    Article.findById(id)
      .then(article => {
        if (article) console.log(article)
      })
      .catch(next)
  }

  static create(req, res, next) {
    const { title, content } = req.body
    Article.create({ title, content })
      .then(article => {
        if (article) console.log(article)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { title, content } = req.body
    Article.update({ title, content })
      .then(updated => {
        if (updated) console.log(updated)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Article.findByIdAndDelete()
      .then(deleted => {
        if (deleted) console.log(deleted)
      })
      .catch(next)
  }
}

module.exports = ArticleController