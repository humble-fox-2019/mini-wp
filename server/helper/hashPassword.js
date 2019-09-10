const bycrpyt = require('bycriptjs')

function hashPassowrd(params) {
    var hash = bcrypt.hashSync(params, process.env.PASSWORD_SALT)
    return hash
}

function syncPassword(params) {
    bcrypt.compareSync(params, process.env.PASSWORD_SALT)
}

module.exports = {
    hashPassowrd,
    syncPassword
}