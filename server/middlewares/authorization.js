const Article = require('../models/article')

module.exports = (req, res, next) => {
    Article.findById(req.params.id)
        .then(article => {
            if (article.author == req.decode.id) {
                next()
            } else {
                next({
                    status: 403,
                    message: `you don't have the authority to do this action`
                })
            }
        })
        .catch(next)
}