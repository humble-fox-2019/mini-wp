const { decode } = require('../helpers/jwt');

// Check if the user bring token; if not let user know they must login 
function authentication ( req ,res , next ) {
    try {
        // kalo dikasi token di header
        const token = req.headers.token;
        const decoded = decode( token );
        req.decode = decoded;
        next()
    } catch ( err ){
        next({ status : 401 , message :"Need Token"})
    }
} 

module.exports = authentication;