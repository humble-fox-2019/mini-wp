const Article = require('../models/article');

class ArticleController {
    static findAll(req, res, next) {
        Article.find()
            .then(articles => {
                res.status(200).json(articles);
            })
            .catch(next);
    }

    static create(req, res, next) {
        const { title, content } = req.body;
        Article.create({ title, content })
            .then(article => {
                res.status(201).json(article);
            })
            .catch(next);
    }

    static update(req, res, next) {
        const _id = req.params.id;
        const { title, content } = req.body;
        Article.updateOne({_id}, { title, content })
            .then(article => {
                res.status(200).json(article);
            })
            .catch(next);
    }

    static delete(req, res, next) {
        const _id = req.params.id;
        Article.deleteOne({_id})
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(next);
    }
}

module.exports = ArticleController;