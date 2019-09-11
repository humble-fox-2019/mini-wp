const jwt = require('jsonwebtoken')
const JWT_SECRET = `sdjaskdjjsakdsad` //process.env.JWT_SECRET

module.exports = {
    tokenGenerate : (payload) => {
        return jwt.sign(payload, JWT_SECRET)
    },
    varify : (token) => {
        return jwt.verify(token, JWT_SECRET)  
    }
}