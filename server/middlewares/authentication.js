const { varify } = require('../helpers/jwt')
module.exports = (req, res, next) => {
    try{
        let decode = varify(req.headers.token)
        req.decode = decode
        next()
    } catch(err) {
        next(err)
    }
}