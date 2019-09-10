
const Article = require('../models/article')

class ArticleController {
    static create(req, res, next) {
        const { title, content } = req.body

        Article.create({ title, content })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    
    static getArticles(req, res, next) {
        Article.find()
            .then(datas => {
                res.status(200).json(datas)
            })
            .catch(next)
    }

    static update(req, res, next) {
        const { title, content } = req.body
        const { id } = req.params

        Article.updateOne({ _id: id }, { title, content })
            .then(() => {
                res.status(200).json({
                    message: `edit success`
                })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const { id } = req.params

        Article.deleteOne({ _id: id })
            .then(() => {
                res.status(200).json({
                    message: `delete success`
                })
            })
            .catch(next)
    }
}

module.exports = ArticleController