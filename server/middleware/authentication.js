// const {
//     verifyToken
// } = require('../helper/jwt')

// module.exports = {
//     authentication(req, res, next) {
//         if (req.headers.token) {
//             try {
//                 let payload = verifyToken(req.headers.token)
//                 // REQ DECODE DARI SINI
//                 req.payload = payload
//                 next()
//             } catch (err) {
//                 next({
//                     status: 401,
//                     message: "invalid token",
//                     err: err
//                 })
//             }
//         } else {
//             next({
//                 status: 401,
//                 message: "please login first"
//             })
//         }
//     }
// }

const {
    verifyToken
} = require('../helper/jwt')
module.exports =
    function authenticate(req, res, next) {
        // console.log(req.headers.token)
        try {
            let payload = verifyToken(req.headers.token)
            req.payload = payload
            console.log('lancar di authentication')
            next()
        } catch {
            next({
                code: 401,
                message: 'Unauthenticate User'
            })
        }
    }