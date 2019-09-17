const bcryptjs = require('bcryptjs')

module.exports = {
    hashPassword : (password) => {
        let salt = bcryptjs.genSaltSync(10)
        return bcryptjs.hashSync(password, salt)
    },
    comparePassword : (password, hash) => {
        return bcryptjs.compareSync(password, hash)
    }
}