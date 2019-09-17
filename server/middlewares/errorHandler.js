module.exports = (err, req, res, next) => {
    console.log(err)

    let status = err.status || 500
    let message = err.message || "Internal Server Eror"

    if(err.name == 'ValidationError'){
        if(err.errors.email.kind){
            status = 400
            message = `Email has been registered`
        } else {
            status = 400
            message = err.errors.email.message
        }
    } else if(err.name == 'JsonWebTokenError') {
        if(err.message == 'jwt malformed'){
            status = 403
            message = "you don't have the authority to do this action"
        } else if(err.message == 'invalid signature'){
            status = 403
            message = "signatured not valid"
        } else {
            status = 401
            message = "you must logged in firts"
        }
    }

    res.status(status).json({message})
}