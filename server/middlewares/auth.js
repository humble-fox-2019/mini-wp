
const { verifyToken } = require('../helpers/jwt')
const Article = require('../models/article')

function authentication(req, res, next) {
    const { token } = req.headers

    try {
        req.decode = verifyToken(token)
        next()
    } catch (err) { next({ status: 403, message: `Please login first` }) }
}

function authorization(req, res, next) {
    const articleId = req.params.id
    const userId = req.decode.userId
    Article.findOne({ _id: articleId })
        .then(article => {
            if (article) {
                if (article.userId._id == userId) next()
                else next({ status: 403, message: `You are not authorized` })
            } else next({ status: 404, message: `article id is invalid` })
        })
        .catch(next)
}

module.exports = { authentication, authorization }