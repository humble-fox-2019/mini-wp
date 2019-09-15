const articleModel = require('../models/article')
const deleteFile = require('../helpers/images').deleteFile
class Article {
    static getAll(req,res,next){
        articleModel.find()
        .then(datas=>{
            res.status(200).json(datas)
        })
        .catch(next)
    }

    static getArticle(req,res,next){
        articleModel.find({
            title : new RegExp(req.body.search,'i')
        })
        .then(data=>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(next)
    }

    static getMyArticle(req,res,next){
        articleModel.find({
            user : req.decode.id
        })
        .then(data=>{
            console.log(data)
            res.status(200).json(data)
        })
        .catch(next)
    }

    static createArticle(req,res,next){
        console.log("masuk ke controller create")
        let {
            id,
            name
        } = req.decode
        const {title,content, tagku} = req.body
        console.log(title)
        console.log(content)
        console.log(tagku)
        let featured_image = req.file.cloudStoragePublicUrl
        let myTags = tagku.split(',')
        console.log(name)
        console.log(featured_image)
        articleModel.create({title,content, user: id, author:name, featured_image})
        .then(data => {
            console.log("success create")
            let myId = data._id
            console.log(myId)
            return articleModel.findOneAndUpdate({
                _id: myId
                }, {
                    $addToSet: {
                        articletags: {
                            $each: myTags
                        }
                    }
                }, {
                    new: true
                })
                .then(dataafterupdate => {
                    res.status(201).json({
                        dataafterupdate
                    })
                })
        })
        .catch(next)
    }

    static deleteArticle(req,res,next){
        articleModel.findOneAndDelete({
            _id : req.params.id
        })
        .then(data=>{
            console.log(data.featured_image)
            if (data.featured_image) {
                deleteFile(req, res, next, data.featured_image)
            } else {
                res.status(200).json({
                    data
                })
            }
        })
        .catch(next)        
    }

    static updateArticle(req,res,next){
        console.log("masuk ke update controller")
        console.log(req.body)
        let updatedData = {}
        req.body.title && (updatedData.title = req.body.title)
        req.body.content && (updatedData.content = req.body.content)
        req.body.title && (updatedData.title = req.body.title)
        req.body.content && (updatedData.content = req.body.content)
        articleModel.findOneAndUpdate({_id : req.params.id}, updatedData)
        .then(data=>{
            if(data!==null){
                res.status(200).json({
                    message: "Success Update"
                })
            } else {
                res.status(404).json({
                    message: "Data is not found"
                })
            }
        })
        .catch(next)
    }
}

module.exports = Article
