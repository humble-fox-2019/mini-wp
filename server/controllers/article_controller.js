const { Article } = require('../models')
const { TokenVerify } = require('../helpers/token')
const deleteImage = require('../helpers/gcs')
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
            _id : req.params.id
        }).populate('tagList')
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
            _id : req.params.id
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
        let {  content , title , tempTag} = req.body
        console.log(tempTag , ' ?????????????????????????????????????????????????????????????')
        const image = req.file ? req.file.cloudStoragePublicUrl : ''
        let featured_image = image
        let obj = {}
        let resultTag;
        Article.findById(req.params.id)
        .then(data=>{
            // resultTag =  data.tagList.concat(tempTag)
            if(!image){
                featured_image = data.featured_image
            }
            return Article.updateOne({
                _id : req.params.id,
            },{
                featured_image , content , title , tagList : tempTag
            },{
                runValidators : true
            })
        })
        .then(user=>{
            res.status(201).json({
                message : 'Berhasil Update !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',
                user
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static getByTag (req,res,next){
        let { tag } = req.query
        let result = []
        Article.find({}).populate('tagList')
        .then(data=>{
            console.log(data)
            data.forEach(el=>{
                el.tagList.forEach(al=>{
                    console.log(al.name.split(' ')[0] ==  tag )
                    if(al.name.split(' ')[0] == tag ){
                        result.push(el)
                    }
                })
            })
            console.log(result , tag)
            res.json(result)
        })
        .catch(next)
    }
}

module.exports = ArticleController