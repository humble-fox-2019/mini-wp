const Article = require('../model/article')
class ArticleController {

    static create(req, res, next) {
        const { title, content } = req.body
         console.log(req.body);
        
        let created = new Date()
        Article.create({ title, content, created:created })
            .then(data => {
                console.log('broo');
                res.status(201).json(data)
            }).catch(err => {
                next(err)
            })
    }
    static find(req, res, next) {
        Article.find()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static filterByTitle(req, res, next) {
        const title = req.body.title_search
        console.log(req.body);
        Article.find({'title': new RegExp(title,'i')})
        .then(data =>{
            res.status(200).json(data)
            console.log(data);
        })
        .catch(err => {
            next(err)
        })
    }
    static findOne(req, res, next) {

    }
    static update(req, res, next) {
        const id = req.params.id
        let newData = {}
        req.body.title && (newData.title = req.body.title)
        req.body.content && (newData.content = req.body.content)
        Article.findOneAndUpdate({ _id: id }, newData, { new: true })
        .then(data => {
            res.status(200).json('article succesfully deleted')
        }).catch(err => {
            next(err)
        })
    }
    static delete(req, res, next) {
        console.log('deeelete');
        
        Article.findByIdAndDelete(id)
            .then(data => {
                res.status(200).json('article succesfully deleted')
            }).catch(err => {
                next(err)
            })
    }


}
module.exports = ArticleController