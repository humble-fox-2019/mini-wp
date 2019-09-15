const Article = require('../models/Article')


function authorization(req,res,next){
    
    // console.log('authorization')
    let id = req.params.id
    let UserId = req.decode.id
    // console.log(req.decode.id)
    // console.log(req.params.id ,"id article")
    Article.findById(id)
    .then(article=>{
        if(!article){
            
            next({status:404,message : "article not found"})
        }
        else{
            // console.log(article)

            if (article.UserId == UserId){
                console.log("ini article UserId", article.UserId)
                console.log("ini dari login", UserId)
                next()
            }
            else {
                next({status:401, message : "You are not authorized"})
            }
        }
    })
    .catch(next)

}

module.exports = authorization
