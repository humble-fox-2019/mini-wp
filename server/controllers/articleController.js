const Article = require('../models/article');

class ArticleController {
    static findAll(req, res, next) {
        let where = {};
        if (req.query.title) {
            where = { "title": { $regex: '.*' + req.query.title + '.*' } }
        }
        Article.find(where)
            .then(articles => {
                if (articles.length > 0) {
                    res.status(200).json(articles);
                } else {
                    next({ statusCode: 404 });
                }
            }).catch(next);
    }

    static store(req, res, next) {
        const { title, content } = req.body;
        Article.create(
            { title, content }
        ).then(article => {
            res.status(201).json(article)
        }).catch(next);
    }

    static findOne(req, res, next) {
        Article.findOne({
            _id: req.params.id
        }).then(article => {
            if (article) {
                res.status(200).json(article);
            } else {
                next({ statusCode: 404 });
            }
        }).catch(next);
    }

    static update(req, res, next) {
        const { title, content } = req.body;
        const data = { title, content };

        Article.updateOne({ _id: req.params.id }, data, { omitUndefined: true })
            .then((info) => {
                res.status(200).json({ message: 'successfully updated', data: info });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Article.findByIdAndDelete(req.params.id)
            .then(data => {
                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }
}

module.exports = ArticleController