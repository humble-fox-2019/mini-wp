const { verifyToken } = require('../helpers/jwt');
const Article = require('../models/article');

module.exports = {
    Authentication: (req, res, next) => {
        if (req.headers.token) {
            try {
                let decode = verifyToken(req.headers.token)
                req.decode = decode
                next()
            }
            catch{
                throw new Error({ status: 403, message: "invalid token", err: err })
            }
        }
        else {
            throw new Error({ status: 403, message: "please login first" })
        }
    }
    ,
    Authorization: (req, res, next) => {
        const _id = req.params.id;
        const id = req.decode._id;

        Article.findById({
            _id
        })
            .then(function (article) {
                if(article){
                    if (article.UserId == id) {
                        next()
                    } else {
                        next({ status: 403, message: "Unauthorized action!" })
                    }
                }else{
                    next({ status: 404, message: "Article not found!" })
                }
            })
            .catch(next)
    }
}