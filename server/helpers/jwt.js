const jwt = require('jsonwebtoken')
const secret = process.env.JWT_KEY

function getToken(payload) {
  return jwt.sign(payload, secret)
}

function verifyToken(payload) {
  // console.log(payload);
  return jwt.verify(payload, secret)
}

module.exports = {
  getToken,
  verifyToken
}