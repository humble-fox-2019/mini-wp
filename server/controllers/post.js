const Post = require('../models/post')

class PostController {

    static create(req,res,next){
        Post.create({
            title : req.body.title,
            description : req.body.description,
            createdAt : new Date(),
            //imageUrl : req.file.gcsUrl,
            author : req.decode.id
        }).then((post)=>{
            res.status(200).json({
                post
            })
        }).catch(next)
    }

    static patch(req,res,next){
        if (!req.body.title && !req.body.description){
            throw {
                name : 'Bad Request',
                customMessage : 'Title and description cannot both be blank'
            }
        }
        let updateObject = {
            title : req.body.title,
            description : req.body.description
        }
        console.log(updateObject)
        let options = {
            new : true,
            omitUndefined : true
        }
        Post.findByIdAndUpdate({ _id : req.params.id}, updateObject, options).then((post)=>{
            res.status(200).json({
                post
            })
        }).catch(err=>{
            if (err.name === 'CastError') {
                err.customMessage = 'Post not found'
            }
            next(err)
        })
    }

    static read(req,res,next){
        Post.find({author : req.decode.id}).then((posts)=>{
            res.json({
                posts
            })
        }).catch(next)
    }

    static delete(req,res,next){
        Post.findByIdAndDelete(req.params.id).then(()=>{
            res.status(200).json({
                message : "post deleted"
            })
        }).catch(err=>{
            console.log(err)
            console.log('jayy')
            next(err)
        })
    }
}

module.exports = PostController