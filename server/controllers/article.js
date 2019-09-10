const Article = require('../models/article');
class ArticleController {
    static getAll ( req, res , next ) {
        Article.find().populate('userId')
        .then ( articles => {
            res.status(200).json({ status: 200 , articles });
        })
        .catch( next )
    }

    static getById ( req , res ,next ) {
        const id = req.params.id
        Article.findById( id ).populate('userId')
        .then( article => {
            res.status(200).json({ status: 200 , article })
        })
        .catch( next )
    }


    static create( req , res , next ){
        const userId = req.decode.id
        const { title, content, image , tags } = req.body;
        Article.create({
            title, content, image , tags , userId
        })
        .then ( createdArticle => {
            res.status(201).json({ status : 201 , createdArticle });
        })
        .catch( next );
    }
    static searchByTitle( req, res , next ) {
        const title =  req.query.title;
        Article.find({ title : { $regex : title , $options: 'i'}})
        .then( articles => {
            res.status(200).json({ status : 200  , articles  })
        })
        .catch( next )
    }
    static searchUserArticle ( req ,res , next ) {
        const userId = req.decode.id;
        Article.find({ userId }).populate('userId')
        .then ( articles => {
            res.status(200).json({ status: 200 , articles })
        })
        .catch( next )
    }
    static update( req , res ,next ){
        const userId = req.decode.id;
        const articleId = req.params.id
        let { title , content , image , tags } = req.body;
        if ( !image ) {
            image = "https://i.pinimg.com/originals/15/51/69/1551696c66b26f200c3ba94641316780.jpg"
        }
        Article.updateOne(
            { _id : articleId , userId },
            {title, content , image , tags },
            { runValidators: true }
        )
        .then ( updated => {
            res.status(200).json({ status : 200 , message :"Updated", updatedCount : updated.n })
        })
        .catch(next)
    }
    static delete ( req ,res , next ) {
        const articleId = req.params.id;
        Article.deleteOne({ _id : articleId })
        .then( deleted => {
            res.status(200).json({ status : 200 , message :"Deleted", deletedCount : deleted.n })
        })
        .catch( next )
    }
}

module.exports = ArticleController;