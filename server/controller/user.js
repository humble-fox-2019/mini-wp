const User = require('../models/user')
const {
    checkHash
} = require('../helper/hashPassword')
const {
    generateToken
} = require('../helper/jwt')
const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



class UserController {

    static register(req, res, next) {
        console.log('masuk ke register broooo')
        console.log('masuk register', req.body)
        let {
            email,
            name,
            password
        } = req.body

        console.log(email, name, password, '<<<<<< INI DATANYA    ')
        User.create({
                email,
                name,
                password
            })
            .then((user) => {
                console.log('berhasil dibuat datanya')
                res.status(201).json(user)
                console.log(user)
            })
            .catch(next)
    }

    static login(req, res, next) {
        console.log("masuk login normal", req.body)
        User.findOne({
                email: req.body.email
            })
            .then((user) => {
                // console.log({
                //     user
                // })
                if (user) {
                    if (checkHash(req.body.password, user.password)) {
                        console.log('masuk')
                        let payload = {
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        }

                        let token = generateToken(payload)

                        console.log(token, '<<<<<')
                        res.status(200).json({
                            token,
                            _id: user._id,
                            name: user.name,
                            email: user.email
                        })

                    } else {
                        throw {
                            code: 404,
                            message: "wrong email/password"
                        }
                    }
                } else {
                    throw {
                        code: 404,
                        message: "wrong email/password"
                    }
                }
            })
            .catch(next)
    }

    static loginGoogle(req, res, next) {

        console.log('masuk ke login google')
        client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(data => {
                console.log('berhasil masuk ke tahap 1 google')
                let payload = data.payload
                let userOne = User.findOne({
                    email: payload.email
                })
                return Promise.all([payload, userOne])
            })
            .then(arr => {
                console.log('berhasil masuk ke tahap 2 google')
                console.log(arr)
                if (!arr[1]) {
                    // console.log(c, '<<<< INI PASSWORDNYA BROOOH')
                    return User.create({
                        name: arr[0].name,
                        email: arr[0].email,
                        password: process.env.PASSWORD
                    })
                } else {
                    return arr[1]
                }
            })
            .then(data1 => {
                let obj = {
                    _id: data1._id,
                    name: data1.name,
                    email: data1.email
                }
                res.status(201).json({
                    token: generateToken(obj)
                })
            })
            .catch(err => {
                console.log(err, '<<<< INI ERRONYA DARI GOOGLE')
            })
    }
}

module.exports = UserController