const Article = require('../models/article')

class ArticleController {
  static create(req, res, next) {
    const author = req.decoded._id
    const { title, content, featured_image } = req.body
    Article.create({
      title,
      content,
      author,
      featured_image
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
  static getMyArticle(req, res, next){
    Article.find({
      author : req.decoded._id
    })
    .populate('author')
    .then(data =>{
      // console.log(data);
      res.status(200).json({
        message: 'List of Your Article',
        articles: data
      })
    })
    .catch(next)
  }
  static getAll(req, res, next) {
    Article.find({})
      .populate('author')
      .then(data => {
        // console.log(data);
        res.status(200).json({
          message: 'List Articles',
          articles: data
        })
      })
      .catch(next)
  }
  static getOne(req, res, next) {
    Article.findById(req.params.id)
      .then(data => {
        res.status(200).json({
          message: 'Here is the article',
          article: data
        })
      })
      .catch(next)
  }
  static getByTitle(req, res, next){
    let search = req.params.search
    Article.find({
      author : req.decoded._id
    })
    .then(data =>{
      let articles = []
      data.forEach(el =>{
        if (el.title.includes(search)){
          articles.push(el)
        }
        // console.log(articles);
        res.status(200).json({
          message: `Here's your result`,
          articles : articles
        })
      })
    })
    .catch(next)
  }
  static updatePut(req, res, next) {
    const {title ,content, featured_image} = req.body 
    Article.updateOne(
      { _id: req.params.id },{
        title,
        content, 
        featured_image
      }
      )
      .then(data => {
        res.status(200).json({
          messange: 'Success Updated',
        })
      })
      .catch(err => {

        next({
          status: 400,
          message: err
        })
      })
  }
  static destroy(req, res, next) {
    Article.deleteOne(
      { _id: req.params.id }
    )
      .then(data => {
        res.status(200).json({
          message: 'Success Deleted',
          _id : req.params.id
        })
      })
      .catch(next)
  }

}

module.exports = ArticleController