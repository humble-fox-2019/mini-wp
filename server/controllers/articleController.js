const Article = require('../models/article');
const deleteFile = require('../helpers/deleteFileGcs')

class ArticleController {
    static myArticle(req, res, next) {
        let where = {
            author: req.decode.id
        };

        if (req.query.title) {
            where.title = { $regex: '.*' + req.query.title + '.*', $options: 'i' }
        }

        if (req.query.isPublished) {
            where.isPublished = req.query.isPublished
        }

        if (req.query.tag) {
            where.tags = { $regex: '.*' + req.query.tag + '.*', $options: 'i' }
        }

        Article.find(where).sort({ createdAt: -1 })
            .populate('author')
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
        const author = req.decode.id;
        let featured_image = null;

        if (req.file) {
            featured_image = req.file.cloudStoragePublicUrl;
            let tags;

            if (req.body.tags) {
                tags = req.body.tags.split(',');
            }

            Article.create(
                { title, content, tags, author, isPublished, featured_image }
            ).then(article => {
                res.status(201).json(article)
            }).catch(next);
        } else {
            next({ statusCode: 400, msg: 'featured_image is required' })
        }
    }

    static findOne(req, res, next) {
        Article.findOne({
            _id: req.params.id
        })
            .populate('author')
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

        let tags;

        if (req.body.tags) {
            tags = req.body.tags.split(',');
        }

        const data = { title, content, tags, isPublished };

        if (req.file) {
            data.featured_image = req.file.cloudStoragePublicUrl;
        }

        Article.findOneAndUpdate({ _id: req.params.id }, data, { omitUndefined: true })
            .then((data) => {

                if (req.file) {
                    let file = data.featured_image.split('/')
                    let fileName = file[file.length - 1];

                    deleteFile(fileName)
                }

                res.status(200).json({ message: 'successfully updated', data });
            })
            .catch(next);
    }

    static delete(req, res, next) {
        Article.findByIdAndDelete(req.params.id)
            .then(data => {
                let file = data.featured_image.split('/')
                let fileName = file[file.length - 1];

                deleteFile(fileName)

                res.status(200).json({ message: 'successfully deleted', data });
            })
            .catch(next);
    }
}

module.exports = ArticleController