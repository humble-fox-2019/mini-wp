function errorHandler (err, req, res, next) {
    console.log('Error Start======>\n', err, '\n<======== Error End')
    
    let status = err.status || 500
    let message = err.message || 'internal server error'

    

    res.status(status).json({
        message
    })
}

module.exports = errorHandler