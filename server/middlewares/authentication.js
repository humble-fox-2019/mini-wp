const { verifyToken } = require('../helpers/jwt')

function authentication(req,res,next){
    try{
        const decode = verifyToken(req.headers.token);
        req.decode = decode;
        console.log(req.decode)
        next();
    } catch (err){
        next({
            name:"AuthorizationError",
            customMessage : "Member access required"
        })
    }
}

module.exports = authentication
