
const Article = require('../models/article')

class ArticleController {
    
    static getArticles(req, res, next) {
        const { userId } = req.decode

        Article.find({ userId }).populate('userId', 'email').sort({ createdAt: -1 })
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const { title, content, tags } = req.body
        const { userId } = req.decode

        Article.create({ title, content, tags, userId })
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static getArticle(req, res, next) {
        const { id } = req.params

        Article.findById(id)
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const { title, content } = req.body
        const { id } = req.params

        Article.updateOne({ _id: id }, { title, content })
            .then(changes => {
                res.status(200).json({message : `Success update an article`})
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const { id } = req.params

        Article.deleteOne({ _id: id })
            .then(changes => {
                res.status(200).json({ message: `Success delete an article` })
            })
            .catch(next)
    }

    static searchByTag(req, res, next) {
        const tag = (req.params.tag).toLowerCase()
        const { userId } = req.decode
        
        Article.find({ userId, tags: { $regex: tag, $options: 'i'} }).populate('userId', 'email')
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }
}

module.exports = ArticleController