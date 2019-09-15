const Article = require('../models/article')
const deleteFile = require('../helpers/images').deleteFile

class articleController {

    static findArticles(req, res, next) {
        let {
            name
        } = req.decode
        Article.find().sort({
                createdAt: -1
            })
            .then(data => {
                res.status(200).json({
                    name,
                    data,
                })
            }).catch(err => {
                res.status(404)
                next(err)
            })

    }
    static findOne(req, res, next) {
        let {
            id
        } = req.params
        Article.findById(id)
            .then(data => {
                res.status(200).json({
                    data,
                    message: 'found your article'
                })
            }).catch(err => {
                res.status(404)
                next(err)
            })
    }
    static create(req, res, next) {
        let {
            id,
            name
        } = req.decode
        let featured_image = req.file.cloudStoragePublicUrl
        let {
            title,
            content,
            tagku
        } = req.body
        let myTags = tagku.split(',')
        Article.create({
            title,
            content,
            featured_image,
            UserId: id,
            author: name,
        }).then(data => {
            let myId = data._id
            return Article.findByIdAndUpdate(myId, {
                    $addToSet: {
                        tags: {
                            $each: myTags
                        }
                    }
                }, {
                    new: true,
                    runValidators: true
                })
                .then(data1 => {
                    res.status(201).json({
                        data1
                    })
                })
        }).catch(next)
    }
    static update(req, res, next) {
        let {
            id
        } = req.params
        let updatedData = {}
        if (req.file) {
            req.body.title && (updatedData.title = req.body.title)
            req.body.content && (updatedData.content = req.body.content)
            req.file.cloudStoragePublicUrl && (updatedData.featured_image = req.cloudStoragePublicUrl)
        } else {
            req.body.title && (updatedData.title = req.body.title)
            req.body.content && (updatedData.content = req.body.content)
            req.body.featured_image && (updatedData.featured_image = req.body.featured_image)
        }
        Article.findByIdAndUpdate(
            id,
            updatedData, {
                new: true,
                runValidators: true
            }
        ).then(data => {
            if (req.body.tagku) {
                let myTags = req.body.tagku.split(',')
                updatedData.tags = myTags
                return Article.findByIdAndUpdate(id, {
                        $addToSet: {
                            tags: {
                                $each: myTags
                            }
                        }
                    })
                    .then(data2 => {
                        res.status(200).json({
                            data2
                        })
                    })
            } else {
                res.status(200).json({
                    data
                })
            }
        }).catch(next)
    }
    static delete(req, res, next) {
        let {
            id
        } = req.params
        Article.findByIdAndDelete(id)
            .then(data => {
                if (data.featured_image) {
                    deleteFile(req, res, next, data.featured_image)
                } else {
                    res.status(200).json({
                        data
                    })
                }
            }).catch(next)
    }
    static findMine(req, res, next) {
        let {
            id
        } = req.decode
        Article.find({
                UserId: id
            }).sort({
                createdAt: -1
            })
            .then(data => {
                res.status(200).json({
                    data,
                    message: 'found your articles'
                })
            }).catch(next)
    }
    static tagsbyName(req, res, next) {
        let tagku = req.params.tag
        Article.find()
            .then(data => {
                let filtered = data.filter(el => {
                    return el.tags.includes(tagku)
                })
                res.status(200).json({
                    filtered
                })
            }).catch(next)
    }




}

module.exports = articleController;