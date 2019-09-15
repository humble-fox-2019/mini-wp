const Article = require('../models/article')

function authorization(req, res, next) {
    let {
        id
    } = req.params
    let UserId = req.decode.id
    Article.find({
        UserId,
        _id: id
    }).then(data => {
        if (data.length !== 0) {
            next()
        } else {
            throw err
        }
    }).catch(err => {
        next(err)
    })

}

module.exports = authorization;