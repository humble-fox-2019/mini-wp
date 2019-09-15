const Article = require('../models/article');
class ArticleController {
    static getAll ( req, res , next ) {
        Article.find().populate('userId')
        .then ( articles => {
            res.status(200).json({ status: 200 , articles });
        })
        .catch( next )
    }

    static create( req , res , next ){
        const userId = req.decode.id

        const { url } = req.file
        const { title, content , tags } = req.body;

        Article.create({
            title, content, image: url , tags , userId
        })
        .then ( createdArticle => {
            res.status(201).json({ status : 201 , createdArticle });
        })
        .catch( next );
    }
    // View one Article by ID 
    static getOne ( req, res ,next ) {
        
        const articleId = req.params.id;
        Article.findById( articleId ).populate('userId')
        .then( article => {
            res.status(200).json({ status: 200 , article })
        })
        .catch( next )
    }

    // Cari berdasarkan tag [SEMUA ARTICLE]
    static searchByTag ( req, res , next ) {
        const tags  = req.body.tags
        Article.find({ tags : { $in :tags } }).populate('userId')
        .then( articles => {
            console.log( articles );
            res.status(200).json({ status : 200 , articles });
        })
        .catch( next )
    } 

    // Semua Article [SEMUA ARTICLE]
    static searchByTitle( req, res , next ) {
        const title =  req.query.title;
        Article.find({ title : { $regex : title , $options: 'i'}}).populate('userId')
        .then( articles => {
            res.status(200).json({ status : 200  , articles  })
        })
        .catch( next )
    }

    // Cari dari Article user by Title
    static searchByTitleUser( req, res,next ) {
        const title = req.query.title;

        const userId = req.decode.id;

        Article.find({ 
            title : { 
                $regex : title , $options: 'i'
            },
            userId
        })
        .populate('userId')
        .then( articles => {
            res.status(200).json({ status : 200  , articles  })
        })
        .catch( next )
    }


    // Semua Article User
    static userArticle ( req ,res , next ) {
        const userId = req.decode.id;
        Article.find({ userId }).populate('userId')
        .then ( articles => {
            res.status(200).json({ status: 200 , articles })
        })
        .catch( next )
    }

    // update article user
    static update( req , res ,next ){
        const userId = req.decode.id;
        const articleId = req.params.id
        let { title , content , tags } = req.body;
        const { url } = req.file


        Article.updateOne(
            { _id : articleId , userId },
            { title, content , tags , image: url },
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