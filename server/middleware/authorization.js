const Article = require('../models/article')
// Check if the user can proceed or not;
function authorization ( req, res ,next ) {
    // If Already authentication  that means you already have token , 
    // then check if the token can be used to process the next step;
    if ( req.decode ) {
        const articleId = req.params.id;
        const userId = req.decode.id
        console.log( articleId , userId )
        Article.findOne({ _id : articleId })
        .then ( found => {
            if ( found ) {
                console.log( found )
                if ( found.userId == userId ) 
                    next()
                else 
                    next({ status : 401 , message : "Not Authorized"})

            } else {
                next({ status : 404 , message : "Not Found"})
            }  
        })
        .catch(next)

    } else {
        next({ status : 401 , message : "Not Authorized"})
    }
}

module.exports = authorization;