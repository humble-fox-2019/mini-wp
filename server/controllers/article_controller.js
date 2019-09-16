const { Article } = require('../models')
const { TokenVerify } = require('../helpers/token')

class ArticleController {
    static addArticle(req, res, next) { 
        const image = req.file ? req.file.cloudStoragePublicUrl : ''
        let { title , content , tempTag } = req.body
        console.log(content , ' PENTING YOK AN')
        console.log(req.body , ' PODO')
        Article.create({
            title , content ,featured_image : image , tagList : tempTag ,  author : req.decode.data._id
        })
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static ShowAllArticle(req,res,next){
        Article.find({
        }).sort({created_at: -1})
        .then(Article=>{
            res.json(Article)
        })
        .catch(err=>{
            next(err)
        })
    }

    static getOne (req,res,next){
        Article.findOne({
            _id : req.params.id,
            author : req.decode.data._id
        })
        .then(data=>{
            res.json(data)
        })
        .catch(next)
    }

    static ShowArticle(req,res,next){
        Article.find({
            User : req.decode.data._id
        }).sort({created_at: -1})
        .then(Article=>{
            res.json(Article)
        })
        .catch(err=>{
            next(err)
        })
    }

    static Delete(req,res,next){
        Article.deleteOne({
            _id : req.params.id,
            User : req.decode.data._id
        })
        .then(user=>{
            res.status(201).json({
                message : 'Berhasil menghapus'
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static editArticle(req,res,next){
        Article.updateOne({
            _id : req.params.id,
            User : req.decode.data._id
        },{
            status : true
        })
        .then(user=>{
            res.status(201).json({
                message : 'Berhasil Update',
                user
            })
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ArticleController