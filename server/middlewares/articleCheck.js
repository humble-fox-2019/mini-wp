const { jwt } = require("../helpers")
const Article = require("../models/article")

function articleCheck(req, res, next) {
    try {
        const token = req.headers.token
        const decode = jwt.decodeToken(token)

        req.decode = decode

        Article.findById({
            _id: req.params.id,
            createdBy: req.decode.id
        }).then(article => {
            if (article) {
                next()
            } else {
                next({ statusCode: 403, msg: "You do not have access to data article" })
            }
        }).catch(next)
    }
    catch{
        next({ statusCode: 403, msg: "You do not have access to data article" })
    }
}

module.exports = articleCheck
