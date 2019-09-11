const jwt = require('jsonwebtoken')


function sign(payload) {
  return jwt.sign(payload, process.env.JWT_PRIVATE_KEY)
}

module.exports = {
  sign
}
