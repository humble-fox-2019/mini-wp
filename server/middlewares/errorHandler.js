let validationExtractor = require('../helpers/validationExtractor')
module.exports = (err, req, res, next) =>{
    let status = err.status || 500
    let message = err.message || "internal server error"
    console.log(err)
    if(err.name === "ValidationError"){
        message = validationExtractor(err)
        status = 400
    }else if(err.name === "TokenExpiredError" || "JsonWebTokenError"){
        status = 401
        message = "You need to login first"
    }
    console.log(err.response)
    res.status(status).json({message})
}

