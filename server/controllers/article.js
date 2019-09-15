'use strict'

const { Article } = require('../models')

class ArticleController {
  static search (req, res, next) {
    const searchInput = req.body.searchInput
    Article.find({ title: new RegExp(searchInput, 'i') })
      .then((result) => {
        res.status(200).json(result)
      }).catch(next)
  }

  static create (req, res, next) {
    const { title, content, isPublished } = req.body
    const author = req.decoded.id
    // const featured_image = req.file.cloudStoragePublicUrl
    Article.create({ title, content, author, isPublished, featured_image: null })
      .then((article) => {
        res.status(201).json(article)
      }).catch(next)
  }

  static findAll (req, res, next) {
    console.log('Successfully read all articles')
    Article.find({ author: req.decoded.id }).populate('author')
      .then(todos => {
        console.log(todos)
        res.status(200).json(todos)
      })
      .catch(next)
  }

  static remove (req, res, next) {
    console.log(req.params.id)
    Article.findByIdAndDelete({
      _id: req.params.id
    })
      .then(result => {
        res.status(200).json({ message: 'Article successfully deleted', result })
      })
      .catch(next)
  }

  static edit (req, res, next) {
    const id = req.params.id
    const input = req.body
    const update = {}
    for (const keys in input) {
      update[keys] = req.body[keys]
    }
    Article.findByIdAndUpdate(id,
      { $set: update },
      { new: true })
      .then((result) => {
        res.status(201).json(result)
      })
      .catch(next)
  }
}

module.exports = ArticleController
