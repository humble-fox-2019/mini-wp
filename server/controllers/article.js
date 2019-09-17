const Article = require('../models/article')
const User = require('../models/user')
const {
    Storage
} = require('@google-cloud/storage')

const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE
})

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

    static findById(req, res, next) {
        Article.findById(req.params.id)
            .then(user => {
                res.status(200).json(user)
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
            published
        } = req.body
        let featuredImage = null
        console.log(tags)
        if (req.file) {
            featuredImage = req.file.cloudStoragePublicUrl
        }
        Article.create({
                title,
                author,
                content,
                tags: tags.split(','),
                published,
                featured_image: featuredImage
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
        const {
            _id
        } = req.params
        Article.findByIdAndDelete({
                _id
            })
            .then(response => {
                let filename = response.featured_image.replace(/(https:\/\/storage.googleapis.com\/miniwp_images\/)/, '')
                storage.bucket(process.env.GOOGLE_CLOUD_BUCKET)
                    .file(filename).delete()
                res.status(200).json(`Delete Success`)
            })
            .catch(next)
    }
}

module.exports = ArticleController