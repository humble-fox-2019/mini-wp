const Article = require('../models/article');

class ArticleController {

    static findAll(req, res, next) {
        const UserId = req.decode._id;
        Article.find({ UserId }, null, { sort: { createdAt: 'DESC' } })
            .then(function (articles) {
                res.status(200).json(articles);
            })
            .catch(next)
    }

    static create(req, res, next) {
        const { cloudStoragePublicUrl } = req.file;
        const UserId = req.decode._id;
        const { title, content, tag } = req.body;
        const tagArr = tag.split(' ');
        Article.create({
            title,
            img: cloudStoragePublicUrl,
            content,
            UserId,
            tag: tagArr
        })
            .then(function (articles) {
                res.status(201).json(articles);
            })
            .catch(next);
    }

    static findOne(req, res, next) {
        const _id = req.params.id;
        Article.findOne({
            _id
        }, null, { sort: { createdAt: 'DESC' } })
            .then(function (artcile) {
                res.status(200).json(artcile);
            })
            .catch(next)
    }

    static edit(req, res, next) {
        console.log(`ini di edit`);
        const { cloudStoragePublicUrl } = req.file;
        const { title, content, tag } = req.body;
        const tagArr = tag.split(' ');
        const _id = req.params.id;
        Article.findByIdAndUpdate({
            _id
        }, {
                title,
                content,
                tag: tagArr,
                img: cloudStoragePublicUrl,
            }, {
                new: true
            })
            .then(function (article) {
                console.log(article);
                res.status(201).json(article);
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const _id = req.params.id;
        Article.findByIdAndDelete({
            _id
        })
            .then(function () {
                res.status(200).json({
                    message: `Delete Successful`
                });
            })
            .catch(next)
    }

    static findByTag(req, res, next) {
        const { key } = req.query;
        Article.find({
            tag: key
        })
            .then(articles => {
                res.status(200).json(articles);
            })
            .catch(next)
    }

    static findByKey(req, res, next) {
        const UserId = req.decode._id;
        const { key } = req.query;
        Article.find({
            UserId
        })
            .then(allArticles => {
                console.log(allArticles);
                let articles = [];
                for (let i in allArticles) {
                    if (allArticles[i].title.toLowerCase().includes(key.toLowerCase())) {
                        articles.push(allArticles[i]);
                    }
                }
                console.log(articles);
                res.status(200).json(articles);
            })
            .catch(next)
    }
}

module.exports = ArticleController;