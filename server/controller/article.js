const articleModel = require('../models/article')

class ArticleController {

    static create(req, res, next) {
        console.log('Berhasil Masuk ke Create')
        const {
            title,
            content,
            url
        } = req.body

        console.log(req.body, '<<<< INI REQ BODY')
        // console.log(req.file, '<<<<<< INI FILENYA BRO')
        console.log(req.payload)



        articleModel.create({
                userId: req.payload._id,
                title,
                content,
                url: req.body.imageUrl
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
        // console.log(req.payload, '<<<<< INI PAYLOAD DARI FIND ALL')
        // console.log(req.body)
        articleModel.find({
                userId: req.payload._id
            })
            .then(data => {
                res.status(201).json({
                    data
                })
            })
            .catch(next)
    }

    static findAllPublish(req, res, next) {
        console.log('masuk ke all publish')
        articleModel.find()
            .then(data => {
                res.status(201).json({
                    data
                })
            })
            .catch(next)
    }

    static findThread(req, res, next) {
        console.log('masuk ke all thread')
        articleModel.find()
            .then(data => {
                res.status(201).json({
                    data
                })
            })
            .catch(err => {
                console.log('disini errornya >>>', err)
            })
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
        console.log(req.params.id, '<<<<< ini datanya')

        articleModel.deleteOne({
                _id: req.params.id
            })
            .then(data => {
                console.log('BERHASIL BROH! KEDELETE')
                res.status(201).json({
                    data
                })
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        console.log('masuk ke find one')

        articleModel.findOne({
                title: req.params.title
            })
            .then(data => {

                let obj = {
                    _id: data._id,
                    userId: data.userId,
                    title: data.title,
                    content: data.content,
                    picUrl: data.url
                }

                res.status(201).json({
                    obj
                })


                console.log(obj, '<<< BERHASIL DATANYA BERIKUT')
            })
            .catch(next)

    }


}

module.exports = ArticleController