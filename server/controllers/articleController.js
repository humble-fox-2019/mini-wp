const Article = require('../models/article');

class ArticleController {
    static myArticle(req, res, next) {

        Article.find({
            createdBy: req.decode.id
        }).populate('createdBy')
            .then(articles => {
                if (articles.length > 0) {
                    res.status(200).json(articles);
                } else {
                    next({ statusCode: 404 });
                }
            }).catch(next);
    }

    static store(req, res, next) {
        const { title, content, isPublished } = req.body;
        const createdBy = req.decode.id;
        const image = req.file.cloudStoragePublicUrl;

        Article.create(
            { title, content, createdBy, isPublished, image }
        ).then(article => {
            res.status(201).json(article)
        }).catch(next);
    }

    static findOne(req, res, next) {
        Article.findOne({
            _id: req.params.id
        })
            .populate('createdBy')
            .then(article => {
                if (article) {
                    res.status(200).json(article);
                } else {
                    next({ statusCode: 404 });
                }
            }).catch(next);
    }

    static update(req, res, next) {
        const { title, content, isPublished } = req.body;
        const data = { title, content, isPublished };

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