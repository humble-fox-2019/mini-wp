const Article = require('../models/Article')
const deleteFile = require("../helpers/images").deleteFile

class ArticleController{


    static create(req, res, next){

        let tags= req.body.tags
        console.log(tags)
        tags = tags.split(",")
        let UserId = req.decode.id
        let featured_image=null
        if (req.file){
            featured_image = req.file.cloudStoragePublicUrl
        }
        let {title,content} = req.body
        // content = filter.clean(content)
        Article.create({UserId,title,content,featured_image,tags})
        .then(success=>{
            res.status(201).json(success)
        })
        .catch(next)
    }

    static delete(req, res, next){

        const id = req.params.id
        
        Article.findByIdAndDelete(id)
        .then(thearticle=>{
            // res.status(200).json(success)
            if (thearticle.featured_image){
                // console.log("masuk ke function delete article")
                deleteFile(req,res,next,thearticle.featured_image)
            }
            else {
                res.status(200).json(thearticle)
            }
            
        })
        .catch(next) 
    }

    static update(req, res, next){

        let id = req.params.id
        let updatedData = {}
        
        if (req.file){
            req.file.cloudStoragePublicUrl && (updatedData.featured_image=req.file.cloudStoragePublicUrl)
        }
        if(req.body.tags){
            let tags= req.body.tags
            tags = tags.split(",")
            updatedData.tags=tags
        }

        req.body.title && (updatedData.title =req.body.title)
        req.body.content && (updatedData.content =req.body.content)

        Article.findByIdAndUpdate(id, updatedData, {new:true, runValidators: true})
        .then(success=>{
            res.status(200).json(success)
        })
        .catch(next)
    }

    static getAll(req, res, next){
        

        Article.find().sort({createdAt:"desc"}).populate("UserId")
        .then(allArticle=>{
            // console.log("masuk ke get all article")
            res.status(200).json(allArticle)
        })
        .catch(next)
    }

    static getAllUserArticle(req, res, next){

        let UserId = req.decode.id

        Article.find({UserId}).sort({createdAt:"desc"}).populate("UserId")
        .then(allUserArticle=>{
            res.status(200).json(allUserArticle)
        })
        .catch(next)
    }
    static getArticleByTag(req, res, next){

        let tag = req.params.id
        let filteredArticles = []
        Article.find().sort({createdAt:"desc"}).populate("UserId")
        .then(articles=>{
            
            for (let article of articles){
                if (article.tags.includes(tag)){
                    filteredArticles.push(article)
                }
            }

            res.status(200).json(filteredArticles)
        })
        .catch(next)
    }

    static addView(req, res,next){

        console.log("masuk ke addView")
        let id = req.params.id  
        console.log(id)
        Article.findById(id)
        .then(article=>{
            let view = article.views + 1
            article.views = view
            article.save()
            res.status(200).json(article) 
        })
        .catch(next)
    }
}

module.exports = ArticleController



