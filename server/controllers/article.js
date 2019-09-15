const Article = require('../models/articles')
class ArticleController {
    static createArticle(req, res, next){
        const { title, content, publish } = req.body
        const featuredImage = req.file.cloudStoragePublicUrl
        console.log(featuredImage);
        Article.create({
            title,
            content,
            publish,
            userId: req.decode._id,
            author: req.decode.username,
            featured_image: featuredImage
        })
        .then(response =>{
            res.status(201).json(response)
        })
        .catch(next)
    } 
    static updateArticle(req, res, next){
        const { title, content, publish } = req.body
        const { _id } = req.params
        Article.updateOne({
            _id
        }, {
            title, content, publish
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
            publish: req.headers.publish,
            userId: req.decode._id
        }).sort({updatedAt: 'desc'}).then(response=>{
            res.status(200).json(response)
        })
        .catch(next)
    }

}
module.exports = ArticleController