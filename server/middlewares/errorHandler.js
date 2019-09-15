
module.exports = (err, req, res, next) => {
    let status
    let message

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        status = 401
        message = err.message
    } else if (err.name === 'ValidationError') {
        status = 400
        message = err.message
        // message = []
        // for (error in err.errors) message.push(err.errors[error].message)

    } else {
        status = err.status || 500
        message = err.message || `Internal server error`
    }

    console.log(status, message)
    res.status(status).json({message})
}