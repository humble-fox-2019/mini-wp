const Article = require('../models/articles')
class ArticleController {
    static createArticle(req, res, next){
        const { title, content, publish } = req.body
        Article.create({
            title,
            content,
            publish,
            userId: req.decode._id,
            author: req.decode.username
        })
        .then(response =>{
            res.status(201).json(response)
        })
        .catch(next)
    } 
    static publishArticle(req, res, next){
        const { _id } = req.params
        Article.updateOne({
            _id
        }, {
            published: true
        })
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(next)
    }
    static updateArticle(req, res, next){
        const { title, content } = req.body
        const { _id } = req.params
        Article.updateOne({
            _id
        }, {
            title, content
        })
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(next)
    }
    static removeArticle(req, res, next){
        const { _id } = req.params
        Article.deleteOne({
            _id
        })
        .then(response =>{
            res.status(200).json(response)
        })
        .catch(next)
    }
    static readArticle(req, res, next){
        console.log(req.body)
        const { publish } = req.body
        Article.find({
            publish,
            userId: req.decode._id
        }).then(response=>{
            res.status(200).json(response)
        })
        .catch(next)
    }
    static readAllArticle(req, res, next){
        Article.find({
            publish: true
        }).then(response =>{
            res.status(200).json(response)
        })
        .catch(next)
    }
}
module.exports = ArticleController