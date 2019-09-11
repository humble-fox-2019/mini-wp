const Article = require('../models/article');

module.exports = {
    isOwner(req, res, next) {
        const _id = req.params.id;
        const { UserId } = req.decoded;

        Article.findOne({_id, UserId})
            .then(user => {
                if (user) {
                    next();
                } else {
                    next({status: 401, message: `You haven't authorized!`})
                }
            })
            .catch(next)
    }
}