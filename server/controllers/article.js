const { Article } = require('../models/')
// const { multer } = require('../helpers/gcl')

class ArticleController {
  static getAll(req, res, next) {
    Article.find()
      .then(articles => {
        if (articles) {
          res.status(200).json({ articles })
        }
      })
      .catch(next)
  }

  static getOne(req, res, next) {
    const { id } = req.params
    Article.findById(id)
      .then(article => {
        console.log(article);
        if (article) {
          res.status(200).json({ article })
        }
      })
      .catch(next)
  }

  static create(req, res, next) {
    const { title, content } = req.body
    Article.create({ title, content })
      .then(article => {
        if (article) {
          res.status(200).json({ article })
        }
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { id } = req.params
    const { title, content } = req.body
    Article.findByIdAndUpdate(id, { title, content })
      .then(updated => {
        if (updated) {
          console.log(updated);
          res.status(200).json({ updated })
        }
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const { id } = req.params
    Article.findByIdAndDelete(id)
      .then(deleted => {
        if (deleted) {
          res.status(200).json({ deleted })
        }
      })
      .catch(next)
  }

  static upload(req, res, next) {
    res.send('yes')
  }
}

module.exports = ArticleController