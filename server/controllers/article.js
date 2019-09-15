const { Article } = require('../models')

class ArticleController {
  // need authentication only
  static getAll(req, res, next) {
    const userId = req.decode.id
    Article.find({ userId })
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  }

  static create(req, res, next) {
    const userId = req.decode.id
    const author = req.decode.name
    const { title, content } = req.body
    const featured_image = req.file ? req.file.cloudStoragePublicUrl : ''

    Article.create({ title, content, author, featured_image, userId })
      .then(article => {
        res.status(201).json(article)
      })
      .catch(next)
  }

  // need authentication and authorization
  static getOne(req, res, next) {
    const { id } = req.params

    Article.findById(id)
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static update(req, res, next) {
    const { id } = req.params
    const { title, content } = req.body

    Article.findByIdAndUpdate(id, { title, content })
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    const { id } = req.params

    Article.findByIdAndDelete(id)
      .then(article => {
        res.status(200).json(article)
      })
      .catch(next)
  }
}

module.exports = ArticleController