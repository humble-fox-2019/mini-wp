module.exports = (err, req, res, next) => {
    console.log(err)

    switch (err.name) {
        case 'ValidationError':
            let arr = []
            for (const key in err.errors) { arr.push(err.errors[key].message) }
            res.status(400).json({
                msg : arr
            })
            break;
        case 'Bad Request':
            res.status(400).json({
                msg : err.customMessage || err.message
            })
            break;
        case 'AuthorizationError':
            res.status(401).json({
                msg : err.customMessage || err.message
            })
            break;
        case 'JsonWebTokenError':
            res.status(400).json({
                msg : err.customMessage || "You are not logged in."
            })
            break;
        case 'NotFound':
            res.status(404).json({
                msg : err.customMessage || err.msg
            })
            break;
        case 'CastError':
            res.status(404).json({
                msg : err.customMessage || err.message
            })
            break;
        default:
            res.status(500).json({
                msg : err.customMessage || err.message || err.msg || 'Internal Server Error'
            })
            break;
    }
}
