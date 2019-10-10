const Post = require('../models/post')

function authorization(req,res,next){
    Post.findById(req.params.id)
    .then((post)=>{
        if(post){
            if (post.author.toString() === req.decode.id){
                next()
            } else {
                throw {
                    name : "AuthorizationError",
                    customMessage : "Owner access required"
                }
            }
        } else {
            throw {
                name : "NotFound",
                customMessage : "Post not found"
            }
        }
    })
    .catch (next)
}

module.exports = authorization