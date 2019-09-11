const models = require('../models')

class Blog {
    static index (req, res, next){
        models.Blog.find({})
            .then(blogs => {
                res.status(200).json(blogs)
            })
            .catch(next)
    }

    static store(req, res, next) {
        const { title, content } = req.body
        models.Blog.create({
            title, content
        })
        .then(blog => {
            res.status(201).json(blog)
        })
        .catch(next)
    }
}

module.exports = Blog