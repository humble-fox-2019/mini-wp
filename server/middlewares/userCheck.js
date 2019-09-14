const { jwt } = require("../helpers")
const User = require("../models/user")

function userCheck(req, res, next) {
    try {
        const token = req.headers.token
        const decode = jwt.decodeToken(token)

        req.decode = decode
        let _id = req.decode.id

        if (_id != req.params.id) {
            next({ statusCode: 403, msg: "You do not have access to data user" });
        } else {
            User.findById(_id)
                .then(user => {
                    if (user) {
                        next()
                    } else {
                        next({ statusCode: 403, msg: "You do not have access to data user" })
                    }
                })
                .catch(next)
        }
    }
    catch{
        next({ statusCode: 403, msg: "You do not have access to data user" })
    }
}

module.exports = userCheck
