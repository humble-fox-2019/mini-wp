const { verifyToken } = require('../helpers/jwt');

module.exports = {
    authentication(req, res, next) {
        const { token } = req.headers;

        try {
            let decoded = verifyToken(token);
            req.decoded = decoded;
            // console.log(decoded)
            next();
        } catch (err) {
            next({status: 403, message: 'You must login first!'});
        }
    }
}