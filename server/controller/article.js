const articleModel = require('../models/article')

class ArticleController {

    static create(req, res, next) {
        console.log('Berhasil Masuk ke Create')
        const {
            title,
            content,
            createdAt
        } = req.body
        // console.log(title, '<<<< INI TITLE', content, '<<<< INI CONTENT')
        articleModel.create({
                title,
                content
            })
            .then(data => {
                console.log(`Berhasil Masuk dan Datanya jadi >>> ${data}`)
                res.status(201).json({
                    data
                })
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        console.log('Berhasil Masuk ke Find All')
        articleModel.find()
            .then(data => {
                res.status(201).json({
                    data
                })

            })
            .catch(next)
    }

    static update(req, res, next) {
        console.log('Masuk ke update')

        const {
            title,
            content
        } = req.body

        articleModel.updateOne({
                _id: req.params.id
            }, {
                title,
                content
            })
            .then(data => {
                console.log('Data Berhasil Terbuat')
                res.status(201).json({
                    data
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static delete(req, res, next) {

        console.log('Berhasil Masuk Ke Delete')

        articleModel.deleteOne({
                _id: req.params.id
            })
            .then(data => {
                res.status(201).json({
                    data
                })
            })
            .catch(next)
    }
    // static findByName()


}

module.exports = ArticleController