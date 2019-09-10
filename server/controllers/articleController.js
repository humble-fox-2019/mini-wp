const Article = require('../models/article')

class ArticleController {
  static create(req, res, next) {
    console.log(req.decoded);
    const UserId = req.decoded._id
    const { title, content } = req.body
    Article.create({
      title,
      content,
      UserId
    })
      .then(data => {
        res.status(200).json({
          message: "Success Create Article",
          article: data
        })
      })
      .catch(err => {
        next({
          status: 400,
          error: err
        })
      })
  }
  static getAll(req, res, next) {
    Article.find({})
      .then(data => {
        res.status(200).json({
          message: 'List Articles',
          articles: data
        })
      })
      .catch(err =>{
        next()
      })
  }
  static getOne(req, res, next){
    Article.find({_id : req.params.id})
    .then(data =>{
      res.status(200).json({
        message : 'Here is the article',
        article : data
      })
    })
    .catch(err =>{
      next()
    })
  }
  static updatePut(req, res, next) {
    let change = {}
    for (let k in req.body) {
      change[k] = req.body[k]
    }
    Article.updateOne(
      { _id: req.params.id },
      change)
      .then(data =>{
        res.status(200).json({
          messange : 'Success Updated',
        })
      })
      .catch(err =>{
        console.log(err, '<<<');
        next({
          status : 400,
          message : err
        })
      })
  }
  static destroy(req, res, next){
    Article.deleteOne(
      {_id : req.params.id}
    )
    .then(data =>{
      res.status(200).json({
        message : 'Success Deleted'
      })
    })
    .catch(err=>{
      next()
    })
  }
}

module.exports = ArticleController