const Article = require('../models/articles')
class ArticleController {
    static createArticle(req, res, next){
        const { title, content } = req.body
        //masih kurang user id nya
        Article.create({
            title,
            content,
            userId: req.decode._id,
            author: req.decode.username
        })
        .then(response =>{
            res.status(201).json(response)
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
        Article.find({
            userId: req.decode._id
        }).then(response=>{
            res.status(200).json(response)
        })
        .catch(next)
    }
}
module.exports = ArticleController