let validationExtractor = require('../helpers/validationExtractor')
module.exports = (err, req, res, next) =>{
    let status = err.status || 500
    let message = err.message || "internal server error"
    if(err.name === "ValidationError"){
        message = validationExtractor(err)
        status = 400
    }
    console.log(err)
    res.status(status).json({message})
}