const jwt = require('jsonwebtoken')
const SECRET_JWT = process.env.JWT
function generateJWTToken(data){
    return jwt.sign({ data }, SECRET_JWT, { expiresIn: 60*60 })
}
module.exports = {
    generateJWTToken
}