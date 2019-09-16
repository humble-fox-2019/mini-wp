const Article = require('../models/Article')
const User = require('../models/User')
const vision = require('@google-cloud/vision')

class ArticleController {

  static create(req, res, next) {
    const { title, content } = req.body

    const client = new vision.ImageAnnotatorClient()

    client.labelDetection(req.file.cloudStoragePublicUrl)
      .then(result => {
        const { labelAnnotations } = result[0]

        let tags = []
        labelAnnotations.forEach(label => {
          tags.push(label.description)
        })
        return Article.create({
          title,
          content,
          owner: req.decode.id,
          image: req.file.cloudStoragePublicUrl,
          tags })
      })
      .then(article => {
        res.status(201).json({
          message: 'Success create article'
        })
      })
      .catch(next)
  }

  static getAll(req, res, next) {
    Article.find({
      owner: req.decode.id
    }, {}, {
      sort: {
        updatedAt: -1
      }
    })
      .then(articles => {
        res.json(articles)
      })
      .catch(next)
  }

  static deleteArticle(req, res, next) {
    Article.findByIdAndDelete(req.params.id)
      .then(data => {
        res.json({
          message: 'Success delete article'
        })
      })
      .catch(next)
  }

  static updateArticle(req, res, next) {

    const { title, content } = req.body

    Article.findById(req.params.id)
      .then(article => {
        let image = null
        if(req.file) {
          image = req.file.cloudStoragePublicUrl
        }else {
          image = article.image
        }
        return Article.findByIdAndUpdate(req.params.id, {
          $set: {
            title,
            content,
            image
          }
        }, {
          new: true
        })
      })
      .then(article => {
        res.json({ article })
      })
      .catch(next)

  }

  static getOne(req, res, next) {
    Article.findById(req.params.id)
      .then(article => {
        if(!article) {
          next({
            status: 404,
            message: 'Article not found'
          })
        }else{
          res.json({
            article
          })
        }
      })
      .catch(next)
  }

}


module.exports = ArticleController
