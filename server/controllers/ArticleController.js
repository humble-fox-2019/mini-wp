const Article = require('../models/Article')
const vision = require('@google-cloud/vision')

class ArticleController {

  static create(req, res, next) {
    const { title, content } = req.body

    const client = new vision.ImageAnnotatorClient()

    client.labelDetection(req.file.cloudStoragePublicUrl)
      .then(result => {
        const { labelAnnotations } = result[0]
        console.log('Labels :')
        labelAnnotations.forEach(label => {
          console.log(label.description)
        })
        

      })
      .catch(err => {
        console.log(err)
      })
    

    Article.create({ title, content, image: req.file.cloudStoragePublicUrl })
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
