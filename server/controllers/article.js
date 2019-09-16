const Article = require('../models/article')
const User = require('../models/user')

class ArticleController {
    static findAll(req, res, next) {
        Article.find().sort([
                ['createdAt', -1]
            ])
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static findUserId(req, res, next) {
        let Author = null
        User.findById(req.decode.id)
            .then(user => {
                Author = user.name
                return Article.find({
                    author: req.decode.id
                }).sort([
                    ['createdAt', -1]
                ])
            })
            .then(articles => {
                res.status(200).json({
                    articles,
                    Author
                })
            })
            .catch(next)
    }

    static write(req, res, next) {
        const {
            title,
            author,
            content,
            tags,
            published,
            photo
        } = req.body
        Article.create({
                title,
                author,
                content,
                tags,
                published,
                photo
            })
            .then(article => {
                res.status(201).json(article)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const {
            title,
            content
        } = req.body
        Article.findByIdAndUpdate({
                _id: req.params.id
            }, {
                title,
                content
            })
            .then(() => {
                res.status(201).json({
                    message: `Update Success`
                })
            })
            .catch(next)
    }

    static remove(req, res, next) {
        Article.findByIdAndDelete({
                _id: req.params.id
            })
            .then(() => {
                res.status(200).json(`Delete Success`)
            })
            .catch(next)
    }
}

module.exports = ArticleController