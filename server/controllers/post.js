const Post = require('../models/post')

class PostController {

    static create(req,res){
        Post.create({
            title : req.body.title,
            description : req.body.description,
            createdAt : req.body.createdAt
        }).then((post)=>{
            res.status(200).json({
                message : "success adding post",
                post
            })
        }).catch((error)=>{
            message : "failed adding post",
            error
        })
    }

    static patch(req,res){
        let updateObject = {
            title : req.body.title,
            description : req.body.description
        }

        let options = {
            new : true,
            omitUndefined : false
        }
        Post.findByIdAndUpdate({_id : req.params.id}, updateObject, options).then((post)=>{
            res.status(200).json({
                message : "success updating the post",
                newPost : post
            })
        }).catch((error)=>{
            res.status(400).json({
                message : "failed to update the post",
                error
            })
        })
    }

    static read(req,res){
        Post.find().then((posts)=>{
            res.json(posts)
        }).catch((err)=>{
            console.log(err)
        })
    }

    static delete(req,res){
        Post.findByIdAndDelete({_id : req.params.id}).then(()=>{
            res.status(200).json({
                message : "post deleted"
            })
        }). catch((error)=>{
            res.status(400).json({
                message : "failed to update the post",
                error
            })
        })
    }
}

module.exports = PostController