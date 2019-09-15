
const Article = require('../models/article')
const { Storage } = require('@google-cloud/storage')

class ArticleController {
    
    static getArticles(req, res, next) {
        const { userId } = req.decode

        Article.find({ userId }).populate('userId', 'email').sort({ updatedAt: -1 })
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static create(req, res, next) {
        const { title, content, tags } = req.body
        const { userId } = req.decode
        const url = req.file.cloudStoragePublicUrl

        Article.create({ title, content, tags, userId, url })
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
        const { title, content, tags } = req.body
        const url = req.file.cloudStoragePublicUrl
        const { id } = req.params

        Article.findById(id)
            .then(article => {
                const CLOUD_BUCKET = process.env.CLOUD_BUCKET

                const storage = new Storage({
                    projectId: process.env.GCLOUD_PROJECT,
                    keyFilename: process.env.KEYFILE_PATH
                })

                if (req.file) {
                    let deleteFile = article.url

                    // set image in db with a new uploaded image
                    article.url = url
                    let filename = deleteFile.replace(/(https:\/\/storage.googleapis.com\/storage-mini-wp.zakiarsyad.com\/)/, '')

                    storage
                        .bucket(CLOUD_BUCKET)
                        .file(filename)
                        .delete()

                    article.title = title
                    article.content = content
                    article.tags = tags
                    article.save()
                        .then(article => {
                            res.status(200).json(article)
                        })
                        .catch(next)
                }
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const { id } = req.params

        Article.findById(id)
            .then(article => {
                const CLOUD_BUCKET = process.env.CLOUD_BUCKET

                const storage = new Storage({
                    projectId: process.env.GCLOUD_PROJECT,
                    keyFilename: process.env.KEYFILE_PATH
                })

                let deleteFile = article.url
                let filename = deleteFile.replace(/(https:\/\/storage.googleapis.com\/storage-mini-wp.zakiarsyad.com\/)/, '')

                storage
                    .bucket(CLOUD_BUCKET)
                    .file(filename)
                    .delete()
                
                article.delete()
                    .then(article => {
                        res.status(200).json(article)
                    })
                    .catch(next)
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