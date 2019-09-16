
const { Storage } = require('@google-cloud/storage')
const Article = require('../models/articles')

const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: process.env.GOOGLE_CLOUD_KEYFILE
  })

class ArticleController {
    static createArticle(req, res, next){
        const { title, content, publish } = req.body
        let featuredImage = null
        if(req.file){
            featuredImage = req.file.cloudStoragePublicUrl
        }
        Article.create({
            title,
            content,
            publish,
            userId: req.decode._id,
            author: req.decode.username,
            featured_image: featuredImage
        })
        .then(response =>{
            res.status(201).json(response)
        })
        .catch(next)
    } 
    static updateArticle(req, res, next){
        const { title, content, publish } = req.body
        const { _id } = req.params
        let featuredImage = null
        if(req.file){
            featuredImage = req.file.cloudStoragePublicUrl
        }
        Article.findByIdAndUpdate({
            _id
        }, {
            title, content, publish, featured_image: featuredImage
        })
        .then(response =>{
            let filename = response.featured_image.replace(/(https:\/\/storage.googleapis.com\/miniwp_images\/)/, '')
            storage.bucket(process.env.GOOGLE_CLOUD_BUCKET)
            .file(filename).delete()
            res.status(200).json(response)
        })
        .catch(next)
    }
    static removeArticle(req, res, next){
        const { _id } = req.params
        Article.findByIdAndDelete({
            _id
        })
        .then(response =>{
            let filename = response.featured_image.replace(/(https:\/\/storage.googleapis.com\/miniwp_images\/)/, '')
            storage.bucket(process.env.GOOGLE_CLOUD_BUCKET)
            .file(filename).delete()
            res.status(200).json(response)
        })
        .catch(next)
    }
    static readArticle(req, res, next){
       
        Article.find({
            publish: req.headers.publish,
            userId: req.decode._id
        }).sort({updatedAt: 'desc'}).then(response=>{
            res.status(200).json(response)
        })
        .catch(next)
    }

}
module.exports = ArticleController