
const Article = require('../models/articles')
module.exports = (req, res, next)=>{
    Article.findOne({
        _id: req.params._id
    })
    .then(article =>{
        console.log(article)
        if(article.userId == req.decode._id) next()
        else next({status: 403, message: "you don't have the authority to do this action"})
    })
    .catch(err =>{
        next(err)
    })
}