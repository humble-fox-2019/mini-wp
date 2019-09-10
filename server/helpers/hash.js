'use strict'

const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

function encrypt (password) {
  return bcrypt.hashSync(password, salt)
}

function decrypt (password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword)
}

module.exports = {
    encrypt,
    decrypt
}
